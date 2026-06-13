---
title: "打开宝塔服务器上隐藏的Nginx的Lua-Waf防火墙"
description: "宝塔面板其实自带Nginx防火墙的但是很多人都没有启用,因为这个功能默认是关闭的并且需要手动修改配置来启用,那么既然不花钱就能够提高自己网站的安全性那么谁不愿意开启呢？ 防火墙有什么用？ 1.可以有效拦截部分非法参数 2.可以智能封禁非法访问（需修改防火墙规则） 3.等你探索~~~ 防火墙启用效果如……"
date: "2019-10-06 00:00:00"
slug: "bt-panel-nginx-lua-waf-firewall"
categories: "tech"
tags: ["宝塔", "防火墙"]
---

> [!NOTE]  
> 此文章恢复自过去的博客站点，仅作纪念保留。  
> 原文发布于 2019-10-06  
> 原始地址：[https://www.milorette.vip/archives/63.html](https://www.milorette.vip/archives/63.html)  
> Web Archive：[https://web.archive.org/web/20191016024707/https://www.milorette.vip/archives/63.html](https://web.archive.org/web/20191016024707/https://www.milorette.vip/archives/63.html)  

> [!WARNING]
> 本教程暂时仅适用于使用Nginx的宝塔服务器

宝塔面板其实自带Nginx防火墙的但是很多人都没有启用,因为这个功能默认是关闭的并且需要手动修改配置来启用,那么既然不花钱就能够提高自己网站的安全性那么谁不愿意开启呢？

防火墙有什么用？

1. 可以有效拦截部分非法参数

2. 可以智能封禁非法访问（需修改防火墙规则）

3. 等你探索~~~

防火墙启用效果如图:

![宝塔lua_waf防火墙](https://assets.moedev.cn/blog/photo/images/2019/H51ad8758167c4830aad45ed71e9a1de9b.png!webp)

下面是启用宝塔防火墙的教程

1. 进入你的宝塔后台,进入Nginx管理

![宝塔后台](https://assets.moedev.cn/blog/photo/images/2019/Hfae5514f97e24fbc8d160f224734d14di.png!webp)

在软件中选择Nginx管理

![宝塔的nginx服务](https://assets.moedev.cn/blog/photo/images/2019/H505fae90ba9547cea1565356e0687747D.png!webp)

2. 在Nginx管理中找到配置修改

![宝塔nginx配置修改](https://assets.moedev.cn/blog/photo/images/2019/Ha5d565ab78e94f5e8faaa90f57e02abd9.png!webp)

在大概17行的位置找到#include luawaf.conf

![修改宝塔nginx配置](https://assets.moedev.cn/blog/photo/images/2019/Hca9908253e214dd09b455c7294a151b1t.png!webp)

去掉符号#

![在配置中去掉#](https://assets.moedev.cn/blog/photo/images/2019/Hf5df22ed70c94a009791dc5bb78149b0i.png!webp)

3. 重启Nginx服务,享受你的防火墙之力吧!

![重启Nginx服务](https://assets.moedev.cn/blog/photo/images/2019/H18695005fc604632883c4c5fc959884bC.png!webp)

> [!WARNING]
> 测试你的防火墙是否有效

在浏览器中打开http://你的网址/?id=../etc/passwd

如果出现拦截页面,就证明防火墙成功开启了

等等?这就完了?这么简单？(问号三连击)

不,没有

还有许多高阶功能等你探索

比如前面提到的动态封禁非法访问(详细请见文章:[宝塔面板Nginx的Lua-Waf防火墙终极改进 动态封禁IP](https://www.mmuaa.com/post/85bcbf20569cacfc.html))

萌新写篇文章试试水,有问题还请多多指教,大佬勿喷！谢谢
