---
title: "解决FASTBOOT模式出现press any key to shutdown"
description: "在给那台破烂Mi8刷机的时候，每当MiFlash加载设备，FASTBOOT就会奔溃，我一度以为被我之前刷坏了，因为以前没有出现过这种情况。在我Google后发现了解决方法，所以在这里分享一下。"
date: "2023-05-07 08:49:00"
image: "https://assets.moedev.cn/blog/photo/images/2023/O0W9.jpg!webp"
slug: "fix-fastboot-press-any-key-to-shutdown"
categories: "tech"
tags: ["BUG", "FASTBOOT", "小米"]
---

> [!NOTE]  
> 此文章恢复自过去的博客站点，仅作纪念保留。  
> 原文发布于 2023-05-07 08:49:00  
> 原始地址：[https://justmyblog.net/1102.html](https://justmyblog.net/1102.html)  
> Web Archive：[https://web.archive.org/web/20231201062854/https://justmyblog.net/1102.html](https://web.archive.org/web/20231201062854/https://justmyblog.net/1102.html)  

在给那台破烂Mi8刷机的时候，每当MiFlash加载设备，FASTBOOT就会奔溃，我一度以为被我之前刷坏了，因为以前没有出现过这种情况。在我Google后发现了解决方法，所以在这里分享一下。

直接下载bat文件并右键以管理员身份运行：[点击下载](https://share.moeblog.vip/d/%E8%87%AA%E7%94%A8%E9%9B%86/%E6%94%B6%E8%97%8F%E9%9B%86/%E8%84%9A%E6%9C%AC%E9%9B%86/press%20any%20key%20to%20shutdown%20amd%20fix.bat?sign=oqVNkZm1yOzsfQD5YfbWkL-SP6F6iP5jjBF_qEl0L54=:0)

脚本来源：[https://youtu.be/TJNVxUYdRe4](https://youtu.be/TJNVxUYdRe4)

也可在CMD**管理员身份**下执行以下命令：

```bash
@echo off
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\usbflags\18D1D00D0100" /v "osvc" /t REG_BINARY /d "0000" /f
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\usbflags\18D1D00D0100" /v "SkipContainerIdQuery" /t REG_BINARY /d "01000000" /f
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\usbflags\18D1D00D0100" /v "SkipBOSDescriptorQuery" /t REG_BINARY /d "01000000" /f

pause
```

脚本解析：

命令在注册表中添加了三个键值对，对应的注册表路径为"HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\usbflags\18D1D00D0100"。

这些键值对的含义如下：

```
"osvc"，它的值为"0000"，这个键值对可以禁用MTP协议中的“安装驱动”功能。

"SkipContainerIdQuery"，它的值为"01000000"，这个键值对可以禁用MTP协议中的“获取容器ID”功能。

"SkipBOSDescriptorQuery"，它的值为"01000000"，这个键值对可以禁用MTP协议中的“获取BOS描述符”功能。
```

这些修改是针对特定的USB设备的（使用的是18D1D00D0100作为设备标识符），目的是为了修改设备的默认行为，以满足特定的需求。

执行上述脚本可以禁用MTP协议中的一些功能，这可能会改善某些特定设备在Fastboot模式下的稳定性和兼容性。但是，这个脚本并不是通用的解决方案，其作用范围仅限于特定的USB设备，并且需要根据具体情况谨慎使用。如果设备在Fastboot模式下仍然无法正常工作，建议检查设备的驱动程序和连接状态。
