---
title: "Fences3开机启动慢怎么办"
description: "前些天入了个 Fences3 五设备版，荔枝数码卖的33软妹币，比Steam便宜几块。一开始感觉还行，然而开机才发觉这玩意启动贼慢，得10秒左右，于是就有了这篇文章，记录了我折腾Fences3自启动的过程。"
date: "2022-07-30 08:54:00"
image: "https://assets.moedev.cn/blog/photo/images/2022/eydN.png!webp"
slug: "fences3-slow-boot-fix"
categories: "tech"
tags: ["Fences3"]
---

> [!NOTE]  
> 此文章恢复自过去的博客站点，仅作纪念保留。  
> 原文发布于 2022-07-30 08:54:00  
> 原始地址：[https://justmyblog.net/899.html](https://justmyblog.net/899.html)  
> Web Archive：[https://web.archive.org/web/20230605202317/https://justmyblog.net/899.html](https://web.archive.org/web/20230605202317/https://justmyblog.net/899.html)  

![封面](https://assets.moedev.cn/blog/photo/images/2022/eydN.png!webp)

## 缘由

前几天通过[@Clam](https://www.puresys.net/)的 aff 入了个 Fences3 五设备版，荔枝数码卖的33软妹币，比Steam的37便宜几块，一开始感觉还行，结果开机的时候发现，这玩意启动贼慢，在咕噜咕噜搜索了下，发现普遍存在这个问题，自2016年就有人在官方论坛反应，Steam评论区也不少，但官方始终没解决。

## 解决思路

我知道的自启动方法有以下几种：

1. 开机启动文件夹 `%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`
2. 服务 （Wallpaper Engine就采用的这种方法）
3. 用户Run键 `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run` 系统Run键 （最常见的方法） `HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\RunMRU`
4. 任务计划程序

### 分析：

**Fences3**官方的启动方案是同时添加**用户Run键**和**系统Run键**，这也就是为什么你会看到有两个Fences启动项。

但为什么启动这么慢？如果细心你就会发现，**Fences**是在等待**Windows资源管理器**加载完后才开始启动，那么解决方法就应该是去掉这段等待时间。

附Fences默认启动命令：`%ProgramFiles(x86)%\Stardock\Fences\Fences.exe /startup`

### 方案：

最先我尝试了与**Wallpaper Engine**相同的服务启动方案，但实践下来却不行，因为官方**没有兼容**，结果导致服务**启动失败**。

随后我尝试通过修改注册表关闭了启动项等待 Windows资源管理器 加载的时间，即随资源管理器同步启动，不再等待其加载完成，结果是这个方案有效，但我依然不满足于此.

作为桌面美化应用，我希望它能够即时启动，于是我尝试添加进任务计划程序来启动，结果发现启动速度非常不错。

### 效果：

进入桌面Fences就已经启动完成，注销后再登入有时候甚至比Wallpaper Engine还快。

## 解决方法

1. 搜索并打开**任务计划程序**
  ![打开任务计划程序](https://assets.moedev.cn/blog/photo/images/2023/esns.png!webp)
2. 点击任务计划程序库，创建任务
  ![创建任务](https://assets.moedev.cn/blog/photo/images/2023/eq0g.png!webp)
3. 添加触发器
  ![添加触发器](https://assets.moedev.cn/blog/photo/images/2023/eTb9.png!webp)
4. 新建操作
  ![新建操作](https://assets.moedev.cn/blog/photo/images/2023/eLDV.png!webp)
5. 修改条件
  ![设置条件](https://assets.moedev.cn/blog/photo/images/2023/e7Rn.png!webp)
6. 修改设置并保存
  ![修改设置](https://assets.moedev.cn/blog/photo/images/2023/eB1z.png!webp)
7. 任务创建成功后重启开机即可见效
  ![任务列表](https://assets.moedev.cn/blog/photo/images/2023/eaXC.png!webp)

### 总结

借这个机会学习了下Win普通的自启动设置方法，同时我也要吐槽Fences这个软件，明明是美化软件，却连启动速度这个基本问题都没有解决。

~~水了篇文章~~，好耶！
