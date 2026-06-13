---
title: "【安装器】使用第三方安装器接管系统安装组件"
description: "使用第三方安装器接管系统自带安装器，解决安装时提示风险应用无法安装的问题"
date: "2023-08-13 04:00:00"
image: "https://assets.moedev.cn/blog/photo/images/2023/oAMn.png!webp"
slug: "third-party-installer-replace-system-installer"
categories: "tech"
---

> [!NOTE]  
> 此文章恢复自过去的博客站点，仅作纪念保留。  
> 原文发布于 2023-08-13 04:00:00  
> 原始地址：[https://justmyblog.net/1188.html](https://justmyblog.net/1188.html)  
> Web Archive：[https://web.archive.org/web/20231201062854/https://justmyblog.net/1188.html](https://web.archive.org/web/20231201062854/https://justmyblog.net/1188.html)  

#### 好早之前，因为MIUI自带安装器安装速度慢，默认还有广告，安全检测，我就出过一个教程分享R安装组件。

#### 现在又要搞啥APP审核，借此给大家分享下几个好用的第三方安装器

---

#### 3个软件蓝凑云下载地址：https://1812z.lanzoub.com/b02exkyba

#### 密码:eogb

---

## 一.InstallerX

![配置界面](https://assets.moedev.cn/blog/photo/images/2023/o2uI.jpg!webp)
![配置界面](https://assets.moedev.cn/blog/photo/images/2023/oRcT.jpg!webp)
- 授权：ROOT，Shizuku，Dhizuku，自定义
- 接管：支持
- 静默安装：需在软件内手动添加软件
- 其它功能：多用户安装，允许测试包，允许降级，自动删除安装包，分享安装
- 备注：特别好用，界面美观，但是作者最近把仓库achieved了，希望后续能更新吧..... 下载地址: [官方Github](https://github.com/iamr0s/InstallerX)

---

## 二.R安装组件

点这里----->  [教程&介绍](https://justmyblog.net/761.html)

- 授权：ROOT，Shizuku，system【hook】
- 接管：支持
- 静默安装：一键管理
- 其它功能：自动删除安装包，安装Magisk/KSU模块，锁定桌面，隐藏图标，阻止卸载，分享安装
- 备注：使用方便，不用配置包名，但是界面设计还有进步空间 下载地址：[官方Telegram群](https://t.me/joinchat/Icjq7QpNBStjMDU1)

---

## 三.爱玩机工具箱

![配置界面](https://assets.moedev.cn/blog/photo/images/2023/oLkV.jpg!webp)
![配置界面](https://assets.moedev.cn/blog/photo/images/2023/oTs9.jpg!webp)
- 授权：ROOT
- 接管：支持[]
- 静默安装：一键管理
- 其它功能：自动删除安装包
- 备注：适合原生系统使用【比如手表？】，MIUI等定制系统无法接管安装，已停止更新 下载地址: [https://www.coolapk.com/apk/com.byyoung.setting](https://www.coolapk.com/apk/com.byyoung.setting)

## 四.安装狮

![安装界面](https://assets.moedev.cn/blog/photo/images/2023/ohxQ.png!webp)
- 授权：ROOT，Shizuku，冰箱，DPM，自定义
- 接管：仅仅支持接管apk文件，不支持接管安装
- 静默安装：一键管理
- 其它功能：自动删除安装包
- 备注：适合原生系统使用【比如手表？】，MIUI等定制系统无法接管安装，已停止更新 下载地址： [官方Github](http://https://github.com/dadaewq/Install-Lion)

---

## 五.系统安装器解决办法

![手机管家](https://assets.moedev.cn/blog/photo/images/2023/os4s.png!webp)

试着关闭“安装监控”和“自动更新” ，“云端杀毒”。以及禁用安装包组件的联网权限。

不过不知道后面会不会强制扫描
