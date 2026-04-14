---
title: Nginx单端口HTTP自动跳转HTTPS
description: 通过 Nginx 的 497 错误响应实现 HTTP 请求自动重定向到 HTTPS。
date: 2024-12-06 21:04:00+0000
categories: tech
---

## 场景分析

通常情况下，HTTP 和 HTTPS 无法共用同一个端口，因为两者使用不同的协议，无法在同一端口上完成握手通信，除非 Web 服务器能够根据协议类型进行智能分流。然而，为了提升用户体验，我们应该实现当用户使用 HTTP 协议访问网站时，自动跳转到 HTTPS 协议。例如，当用户访问 `http://192.168.1.1:2233` 时，服务器自动重定向到 `https://192.168.1.1:2233`。

PS：起初我认为 Nginx 是做不到的，需要基于 HAProxy 实现协议分流，但实际情况是，Nginx 已经内置支持了，只需要我们合理利用 Nginx 的 497 错误响应。

常见的一些平台，例如 **Proxmox VE (PVE)**、 **VMware ESXi Web Client**都采用了单端口跳转机制，既确保了管理界面的安全性，又提供了无需手动输入协议头的良好用户体验。

效果如下：

![](https://assets.moedev.cn/blog/photo/article/2024/nginx-single-port-http-https-redirect/curl.png!webp)

## 实验测试

为了验证上述场景，基于 Nginx 配置一个纯 HTTPS 网站，并使用`curl`工具分别通过 HTTP 和 HTTPS 协议进行请求。

### 初始配置（未配置 `error_page 497`）

#### Nginx 配置文件

```nginx
server {
    listen 2233 ssl;
    server_name 192.168.1.1;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        root /var/www/html;
        index index.html;
    }
}
```

#### 测试结果

1. **HTTP 请求**

    使用`curl`发送 HTTP 请求：
    ```bash
    curl -v http://192.168.1.1:2233
    ```
    服务器响应：
    ```
    HTTP/1.1 400 Bad Request
    ```
    说明：由于未配置 HTTP 处理，Nginx 在接收到 HTTP 请求时返回了 400 错误。

2. **HTTPS 请求**

    使用`curl`发送 HTTPS 请求：
    ```bash
    curl -v https://192.168.1.1:2233
    ```
    服务器正常响应网站内容。

### 配置 `error_page 497` 实现自动重定向

为了实现 HTTP 请求自动重定向到 HTTPS，我们需要配置 Nginx 处理错误码 497，并返回 302 重定向。

#### 修改后的 Nginx 配置文件

```nginx
server {
    listen 2233 ssl;
    server_name 192.168.1.1;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        root /var/www/html;
        index index.html;
    }

    # 捕获HTTP请求发送到HTTPS端口的错误497，并重定向到HTTPS
    error_page 497 = @redirect_to_https;

    location @redirect_to_https {
        return 302 https://$host:$server_port$request_uri;
    }
}
```

#### 测试结果

1. **HTTP 请求**

    使用`curl`发送 HTTP 请求：
    ```bash
    curl -v http://192.168.1.1:2233
    ```
    服务器响应：
    ```
    HTTP/1.1 302 Found
    Location: https://192.168.1.1:2233/
    ```
    说明：配置`error_page 497`后，Nginx 检测到 HTTP 请求发送到 HTTPS 端口，返回了 302 重定向，自动将请求引导至 HTTPS。

2. **HTTPS 请求**

    使用`curl`发送 HTTPS 请求：
    ```bash
    curl -v https://192.168.1.1:2233
    ```
    服务器正常响应网站内容。

## 利用 497 响应

### 1. 什么是 HTTP 状态码 497？

HTTP 状态码 497，“HTTP 请求发送到 HTTPS 端口”，是 Nginx 特有的错误代码。当客户端尝试使用 HTTP 协议连接到预期为 HTTPS 的端口时，Nginx 会返回此错误。此错误表示协议不匹配，服务器拒绝了该请求。

理解 497 错误有助于诊断协议不匹配的问题，并确保 Nginx 正确配置和强制执行 HTTPS 连接。

### 2. 497 错误码的常见原因

1. **URL 协议错误**：客户端使用 HTTP 而非 HTTPS 协议，可能由于书签过时或链接错误导致。
2. **服务器配置问题**：服务器在特定端口上配置为处理 HTTPS 请求，但误收到 HTTP 请求。
3. **手动输入错误**：用户在手动输入 URL 时，忘记添加“https://”，默认使用“http://”导致协议不匹配。

## 结论

通过上述配置，当用户通过 HTTP 协议访问 `http://192.168.1.1:2233` 时，Nginx 服务器会响应一个 302 重定向，将用户自动引导至 `https://192.168.1.1:2233`。这种配置不仅提升了安全性，确保所有通信都通过加密的 HTTPS 进行，还优化了用户体验，避免了因协议不匹配而产生的错误。

## 参考资料

[1. Understanding and Steps to Resolve the 497 Error Code][1]

[1]: https://error404.atomseo.com/blog/status-code-497 "Understanding and Steps to Resolve the 497 Error Code"
