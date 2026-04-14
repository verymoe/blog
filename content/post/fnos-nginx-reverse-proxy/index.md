---
title: 修复Nginx反代飞牛相册卡顿、视频无法加载
description: 
date: 2025-12-08 18:53:00+0000
categories: tech
---

## 问题分析

最近在使用飞牛的时候遇到了一个很奇怪的问题，通过域名可以正常进入飞牛首页，文件管理也正常，但是一旦访问飞牛相册，只有一开始加载正常，稍微刷一下瀑布流加载就会卡住，F12 打开控制台发现很多请求卡在了`Pending`。

<!--more-->

![飞牛相册发起了大量请求](https://assets.moedev.cn/blog/photo/images/2025/20251208184125.png!webp)

一开始以为是服务器性能跟不上，预览图没来得及生成，但是想了想也不对，普通的相册列表请求不应该卡成这个样子，于是我绕过 Nginx 通过 Tailscale 直接访问飞牛，这时候相册加载就是正常的，同时我发现飞牛相册的请求量非常大，那么既然直接访问没问题，那问题就出在公网服务器上的反代配置了。

下面是博主简化后的网络架构。

![](https://assets.moedev.cn/blog/photo/images/2025/20260222135956.png!webp)

##  解决问题

### 解决相册加载卡顿

Nginx 在进行反向代理时，默认使用`HTTP/1.0`协议连接后端服务器，并发送`Connection: close`头。这意味着 Nginx 与 NAS 之间无法复用 TCP 连接，导致大量 TIME_WAIT 状态和握手开销。不仅仅是浏览器端的限制，Nginx 到后端也是瓶颈。

解决办法：

1. 清空`Connection`头，强制长连接
```
map $http_upgrade $connection_upgrade {
    default upgrade; # 如果是 WebSocket 请求，Connection 值为 upgrade
    ''      '';      # 如果是普通请求，Connection 值为空（保留 HTTP/1.1 默认的 keep-alive）
}
```

2. 设置长连接池
```
upstream backend {
    # 替换为你的飞牛 IP:端口
    server 192.168.x.x:5666;

    # 核心配置：保持与后端的长连接数量，减少 TCP 握手开销
    keepalive 64;
}
```

3. 在反代中添加配置
```
location / {
    proxy_pass http://backend;

    # 强制使用 HTTP/1.1 并清除 Connection 头，从而激活长连接
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;

    # 优化：上传/下载不启用 Nginx 缓冲，直接转发数据
    proxy_request_buffering off;
    proxy_buffering off;
}
```

按照以上设置即可解决Nginx反代飞牛相册后瀑布流加载卡住的问题。

### 解决视频无法加载

视频播放卡住无法点播通常是忘记了配置 Nginx 当中的`Range`。如果反代不传递`Range`，后端会发送整个文件，反代服务器会尝试把整个文件缓存下来再发给客户端，这就会导致看起来无法加载。

> [!TIP]
> Nginx中的Range（范围）请求是HTTP协议允许客户端（如浏览器、下载器）指定只获取文件的一部分内容，主要用于实现断点续传、多线程下载、视频流媒体、实现视频播放进度条等功能；当服务器支持Range请求时，会在响应头中包含Accept-Ranges:bytes，Nginx通过处理客户端的Range头部来发送指定字节范围数据，并返回206 Partial Content状态码。 

所以在反代部分中加入Range即可（非完整配置）

```
location / {
    # ...其他配置...

    # 支持视频流拖拽与断点续传
    proxy_set_header Range $http_range;
    proxy_set_header If-Range $http_if_range;

    # 关闭缓冲，让数据流实时通过
    proxy_request_buffering off;
    proxy_buffering off;
}
```

## 完整配置参考

下面是基于修改后的完整 Nginx 配置，博主已经测试，欢迎评论区反馈。

```
# WebSocket和长连接配置
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      '';
}

# 后端服务器配置
upstream backend {
    # 替换为你的飞牛IP:端口（因为我流量全程在隧道，所以这里默认http）
    server 192.168.x.x:5666;

    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name example.com;  # 替换为你的域名
    
    # HTTP 自动跳转 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com;  # 替换为你的域名
    
    # ========== SSL 证书配置 ==========
    ssl_certificate     /path/to/fullchain.pem;   # 替换证书路径
    ssl_certificate_key /path/to/privkey.pem;     # 替换密钥路径
    
    # SSL 安全配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # ========== 反向代理配置 ==========
    location / {
        proxy_pass http://backend;
        
        # 传递客户端真实信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # http1.1提供长连接和WebSocket支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        
        # 视频流支持 (解决视频无法点播的问题)
        proxy_set_header Range $http_range;
        proxy_set_header If-Range $http_if_range;
        
        # 大文件上传/下载优化
        proxy_request_buffering off;  # 上传不缓冲
        proxy_buffering off;          # 下载不缓冲
        
        # 超时配置
        proxy_connect_timeout 600s;
        proxy_send_timeout 600s;
        proxy_read_timeout 600s;
        
        # 上传大小限制 (0为无限)
        client_max_body_size 0;
    }
}
```
