---
title: "MacOS设置Yubikey GPG签名Git Commit"
description: "本文并非从入门到入土教程，而是你已经准备且配置好了有 GPG 智能卡的 Yubikey，现在要拿到 MacOS 上使用，却不知道怎么用 Yubikey 里的 GPG 给 Commit 和 Tag 签名。 假定你 MacOS 上已经安装有 Git 和 HomeBrew 了……"
date: "2023-10-15 08:27:00"
image: "https://assets.moedev.cn/blog/photo/images/2023/EuA8.md.jpg!webp"
slug: "macos-yubikey-gpg-sign-git-commit"
categories: "tech"
tags: ["Git", "GPG", "Yubikey", "安全"]
---

> [!NOTE]  
> 此文章恢复自过去的博客站点，仅作纪念保留。  
> 原文发布于 2023-10-15 08:27:00  
> 原始地址：[https://justmyblog.net/1226.html](https://justmyblog.net/1226.html)  
> Web Archive：[https://web.archive.org/web/20231201062854/https://justmyblog.net/1226.html](https://web.archive.org/web/20231201062854/https://justmyblog.net/1226.html)  

本文并非从入门到入土教程，而是你已经准备且配置好了有 GPG 智能卡的 Yubikey，现在要拿到 MacOS 上使用，却不知道怎么用 Yubikey 里的 GPG 给 Commit 和 Tag 签名。

假定你 MacOS 上已经安装有 Git 和 HomeBrew 了，不会请参考知乎文章 [Homebrew国内如何自动安装（国内地址）（Mac & Linux）](https://zhuanlan.zhihu.com/p/111014448)。

---

先通过 brew 安装以下工具便于管理 Yubikey 上的 GPG智能卡。

```shell
brew tap homebrew/versions
brew install gnupg21 pinentry-mac
```

接下来插入你的 Yubikey （我使用的是Yubikey 5，其他型号类同），然后打开终端键入

gpg --card-edit

即可看到卡上的 GPG 数据，记录你要用于签名的密钥的后几位，例如我的是

5C05964A

。

![GPG Card](https://assets.moedev.cn/blog/photo/images/2023/Evax.png!webp)

配置 Git 全局签名用密钥并默认启用签名。

```shell
git config --global user.signingkey "密钥HASH"
git config --global commit.gpgsign true
```

不出意外的话，现在你 Git 签名依然会出意外。

![Git 找不到私钥](https://assets.moedev.cn/blog/photo/images/2023/ECJX.png!webp)

Git 没有找到你的私钥！？？？ 等等这是为什么呢？ 其实熟悉终端或者 Linux 的朋友应该发现了 Git bash 有一套自己的环境变量，它在调用 gpg 时调用的是 Git 安装时自带的，所以现在要让 Git 调用我们自己通过 brew 安装的。

配置 Git 使用我们自己的 GPG 程序。

```shell
git config --global gpg.program "/usr/local/MacGPG2/bin/gpg2" //如果你使用别的 GPG 管理工具请自行替换
```

好，现在当你再次 git commit 时，就会弹出 Yubikey PIN 验证界面了，push 完我们也终于能看到提交有小绿标了喵。

![结果](https://assets.moedev.cn/blog/photo/images/2023/El54.png!webp)
