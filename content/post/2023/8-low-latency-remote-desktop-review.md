---
title: "【评测】8款低延迟远程桌面评测"
description: "如何正确的用远程桌面来游戏/办公"
date: "2023-08-26 06:51:00"
image: "https://assets.moedev.cn/blog/photo/images/2023/EGNH.png!webp"
slug: "8-low-latency-remote-desktop-review"
categories: "tech"
---

> [!NOTE]  
> 此文章恢复自过去的博客站点，仅作纪念保留。  
> 原文发布于 2023-08-26 06:51:00  
> 原始地址：[https://justmyblog.net/1199.html](https://justmyblog.net/1199.html)  
> Web Archive：[https://web.archive.org/web/20231201062854/https://justmyblog.net/1199.html](https://web.archive.org/web/20231201062854/https://justmyblog.net/1199.html)  

## 前言

大学不准备买笔记本，直接用平板+远程台式来代替。

这篇文章就来测试几款低延迟的远程桌面软件

会从以下几点评测

1. 画面
2. 控制方式支持情况
3. 连接易用性
4. 额外功能

**测试环境：WIFI6的小米平板6pro+有线台式机**

### 一.Parsec
  ![·](https://assets.moedev.cn/blog/photo/images/2023/EM6D.png!webp)

应该是家喻户晓的软件了，这也是我最常用的远控软件，首推

![·](https://assets.moedev.cn/blog/photo/images/2023/EYN1.png!webp)
- 画面延迟低支持自定义分辨率，刷新率，码率，支持多显示器

![·](https://assets.moedev.cn/blog/photo/images/2023/E1jN.jpg!webp)
- 仅模拟鼠标触控，支持键鼠，支持手柄，支持笔【收费】
- p2p连接方便快速，但登陆有可能失败【需要梯子】

### 二.微软远程桌面【RDP】

系统自带的远程桌面，使用方便

- 简单操作延迟低，画面复杂时卡顿严重，支持自定义分辨率
- 原生触控，支持键盘，支持鼠标【游戏无法转视角】，支持笔【有兼容问题】
- 需要自己配置远程访问方式【ipv6或内网穿透等】
- 麦克风，相机，储存，自动旋转屏幕

### 三.闪门

国产的一款远程软件，可以当parsec的替代品

![·](https://assets.moedev.cn/blog/photo/images/2023/E3M4.jpg!webp)
- 画面延迟还行，支持自定义分辨率，刷新率，码率，支持屏幕扩展模式

![·](https://assets.moedev.cn/blog/photo/images/2023/EjBX.md.jpg!webp)
- 仅模拟鼠标触控，支持键鼠，不支持笔，支持手柄
- p2p连接方便快速
- 虚拟手柄，麦克风

### 四.Moonlight【n卡用】

![·](https://assets.moedev.cn/blog/photo/images/2023/EKHt.jpg!webp)

N卡的串流软件，拿来当远程也不是不行

- 延迟极低，支持自定义分辨率，刷新率，码率，支持HDR
  ![·](https://assets.moedev.cn/blog/photo/images/2023/EDk8.jpg!webp)
- 仅模拟鼠标触控，支持键盘，支持鼠标【能转视角，但是有点小问题】，，，支持手柄
- 需要自己配置远程访问方式【ipv6或内网穿透等】
- 虚拟手柄

### 五.AMD link

emmm，我的hd7850烧了，没法测试

只知道延迟极低，有虚拟手柄，但是连接挺蛋疼的...

### 六.Steam Link

![·](https://assets.moedev.cn/blog/photo/images/2023/EpjW.jpg!webp)

Steam的游戏串流软件，对很多游戏有专门优化，打游戏体验不错

- 画面延迟低，支持自定义分辨率，码率，帧率
  ![·](https://assets.moedev.cn/blog/photo/images/2023/EP2K.jpg!webp)
- 仅模拟鼠标触控，不支持支持键鼠，老老实实打游戏，没其它功能...
- 需要自己配置远程访问方式【ipv6或内网穿透等】
- Steam里的游戏很多适配完美

### 七.ToDesk

国产远程桌面软件，免费的功能也足够使用，不过真要用不推荐，卡卡的

- 画面延迟有点高，可能是因为免费的只有30fps原因吧,只能自定义画质【高清收费】
  ![·](https://assets.moedev.cn/blog/photo/images/2023/ES7G.jpg!webp)
- 仅模拟鼠标触控，支持键盘，支持鼠标【游戏无法转视角】，不支持笔，支持手柄【收费】
- 自动p2p，不支持也能服务器中转，连接成功率高
- 都要收费的，测不起0..0

### 八.Spacedesk

本来是局域网扩展屏幕的软件，但是太好用了，就拿来说说吧，这也是里面唯一免费支持手写笔的了...

![·](https://assets.moedev.cn/blog/photo/images/2023/EffA.jpg!webp)
- 画面延迟低，支持自定义分辨率，刷新率【30/60】，位深
- 支持原生触控，键盘，不支持鼠标【什么鬼】，支持笔，手柄不知道【我没有啊】
- 需要自己配置远程访问方式【ipv6或内网穿透等】
- 自动旋转屏幕

### 总结：不同情况用不同软件，平板当笔记本用完全可以，至于竞技游戏还是老老实实本地运行吧

**TIPS：平板用键盘鼠标不适应，很大概率是蓝牙延迟问题，有条件还是有线或者2.4g吧，另外一般鼠标只有125hz刷新率，手感也不行**
