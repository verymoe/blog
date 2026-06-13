---
title: "小米手表/手环 复制NFC卡片(超详细图文教程)"
description: "前言：早先有出过一篇教程，但由于不够详细就删除了打算重写，结果一直拖到了换上小米手表都还没写，前几天在b站上的相关评论被点赞后，有b站网友要求出一篇教程，正巧五一节那就折腾吧！"
date: "2021-05-03 00:00:00"
slug: "xiaomi-watch-band-copy-nfc-card"
categories: "tech"
tags: ["NFC", "PN532", "小米手环", "小米手表"]
---

> [!NOTE]  
> 此文章恢复自过去的博客站点，仅作纪念保留。  
> 原文发布于 2021-05-03  
> 原始地址：[https://justmyblog.net/post/178.html](https://justmyblog.net/post/178.html)  
> Web Archive：[https://web.archive.org/web/20210509214415/https://justmyblog.net/post/178.html](https://web.archive.org/web/20210509214415/https://justmyblog.net/post/178.html)  

> **引言：**

起初买小米手环就是为了复制门禁卡、饭卡和公交卡，之前折腾了一段时间后写过一篇教程，但由于不够详细就删除了打算重写，结果一直拖到了现在，前几天碰巧遇到b站网友要求出一篇教程，那就趁五一节放假写吧！

> [!WARNING]
> 本文章尚处于施工期，如有错误请在评论区提出！任何平台不得未经许可转载！！！图文版权所有©shiro@332.email

## 准备工作

> **物料清单**
  - 设备： 小米手环 或 小米手表
  - 读卡器： PN532一套(某宝有售,成品25左右包邮)
  - 环境： win os电脑一台
  - 软件： MifareOneTool
  - 其他： ||手一双||


PS：相关程序和驱动已打包放在文末

## ①准备读卡器

![某宝买的，焊点挺好看的](https://assets.moedev.cn/blog/photo/images/2021/X4k8.webp!webp)

先接线，某宝上卖的PN532 USB串口芯片主要有两种，PL2303和CH340g，不影响使用，只是前者需要单独装驱动而已(驱动文件放文末了)

> **接线图**

接口简单说明（不严谨）

GND：电源的负极
VCC：电源的正极
TXD：发送数据
RXD：接收数据
注意：发送端和接收端要对应，一发一收，别把电源接错，可能会烧坏

![pn532](https://assets.moedev.cn/blog/photo/images/2021/ZZaQ.webp!webp)

然后把pn532接在电脑上(PL2303可能需要装驱动)
在设备管理器中确定设备正常工作无感叹号(有感叹号说明驱动可能有问题)

检查方法：

右键此电脑>管理>设备管理器>端口

![](https://assets.moedev.cn/blog/photo/images/2021/ZUAV.webp!webp)

##### 如果有叹号就安装驱动：(点击展开)

PL2303驱动安装界面

![PL2303驱动安装界面](https://assets.moedev.cn/blog/photo/images/2021/ZwIs.webp!webp)

CH340g驱动安装界面

![CH340g驱动安装界面](https://assets.moedev.cn/blog/photo/images/2021/ZN5n.webp!webp)

确保设备状态正常

## ②打开软件测试连接读卡器

解压好MifareOneTool后双击打开
PS：官方项目地址：https://github.com/xcicode/MifareOneTool

![](https://assets.moedev.cn/blog/photo/images/2021/OalK.png!webp)

点击检测连接后出现以下信息即为成功检测到读卡器！

![](https://assets.moedev.cn/blog/photo/images/2021/w1YW.png!webp)

### 那么设备准备工作到此就完成了！进入下一步吧

## ③开始解卡&读卡

![](https://assets.moedev.cn/blog/photo/images/2021/Zgmg.webp!webp)

将卡片放在读卡器上并用夹子或皮筋固定好然后点击一键解原卡

![](https://assets.moedev.cn/blog/photo/images/2021/wYOH.png!webp)

解密需要时间，休息等待一下吧！

（解密所需时间不定，我遇到过最短40秒，最长3分钟多甚至更长，偶尔还会解密失败，可能是因为pn532温度过高了？再点几次试试就行了）

待解密完毕，命名好，保存下来（请务必复制几份以防操作失误！！！）

![](https://assets.moedev.cn/blog/photo/images/2021/wcED.png!webp)

## ④制作无密钥卡数据

### 先看完整步骤(此处是GIF可能加载较慢)

![](https://assets.moedev.cn/blog/photo/images/2021/wfVO.gif!webp)

解释一下这一步，把原卡的ID复制到一份完全无密钥的卡数据中，这样只有ID而不含密钥的数据就可以被米环和米表模拟下来

### 下面是分步操作

点击MifareOneTool程序的高级操作模式，启动两个Hex编辑器

![](https://assets.moedev.cn/blog/photo/images/2021/wShv.webp!webp)

在左边的编辑器上打开之前保存的数据，右边的编辑器上选择新建

(编辑器中显示的数据需要点一下别的扇区再点回上一个扇区才会刷新)

![](https://assets.moedev.cn/blog/photo/images/2021/wKga.webp!webp)

复制左边编辑器扇区0的第0块(即卡ID)中的数据到右边的编辑器中

![](https://assets.moedev.cn/blog/photo/images/2021/wPlo.webp!webp)

确保右边的编辑器中扇区0的第0块数据值和左边的编辑器一样

在复制完成后请务必点击修改扇区，不然刚才的修改就不会被保存

点击修改扇区后，点编辑器左上角的文件，选择另存为，并备注好以防混淆

## ⑤把无密钥数据写入卡中

把卡放在读卡器上，然后点击MifareOneTool的高级操作模式，点击普通卡操作中的选择key.mfd，然后选择先前解密出来的数据(注意是原数据，不是后来准备的无密钥数据)

(如果没有显示出之前保存的原数据请尝试切换右下角的文件格式，有dump和mfd可选)

![](https://assets.moedev.cn/blog/photo/images/2021/wpcI.webp!webp)

然后点击写M1，选择后来准备的无密钥数据开始写入

请务必固定好卡和读卡器！！！不然可能无法完整写入！！！修复比较麻烦

> [!WARNING]
> 修复方法：（点击展开）①移动一下卡片的位置或者重新固定好卡和读卡器，尝试再次写入②如果只成功写入部分数据，请尝试重新解密原卡并固定好卡和读卡器，再选择刚刚解密出来的数据作为密钥再写入修改后的数据，因为部分密钥可能已经被修改到了，但是请注意最初解密的数据一定不要删除！！总之务必固定好！

写入成功的信息，一般来说M1卡可以成功写入63块数据，因为第1块有厂商码和卡ID一般是不能够被修改到的

![](https://assets.moedev.cn/blog/photo/images/2021/wGOT.webp!webp)

## ⑥模拟卡

把卡放在米环/米表上，打开小米运动或者小米穿戴，选择模拟卡，不出意外的话这次就可以模拟上了

![](https://assets.moedev.cn/blog/photo/images/2021/Z554.webp!webp)
![](https://assets.moedev.cn/blog/photo/images/2021/ZkJX.webp!webp)

开卡用时大概在半分钟左右，耐心等待一下就好了，如果出现错误提示请仔细阅读上文确定操作无误!

## ⑦恢复原卡以及复制原卡数据到米环/米表上

#### 恢复原卡的数据：

把卡片放读卡器上，点MifareOneTool工具中的高级操作模式，密钥选择无密钥数据，然后点击写M1选择最初解密出来的数据，待写入完成后这张卡就和修改前一模一样了

记得依然要注意固定好卡和读卡器！

(由于这一步和第⑤步的图一一样这里就不再放图片了，参考上面)

#### 把卡数据复制到米环/米表上：

在米环/米表上设置默认卡为刚才模拟出的卡，然后将米环/米表放读卡器上，重复上面复制原数据到原卡的步骤

注意看写入信息是不是成功写入63块数据，如果是，那么恭喜你，你已经成功完成了模拟！

## ⑧实地测试

带上原来的卡以防万一，因为可能有少部分刷卡机可能会校验厂商码，据我所知只有米环3的某个固件版本之前支持模拟厂商码，但大概率是可以成功用米环/米表刷上的

根据我本人的测试：

米环基本可以胜任大部分刷卡机，除验证和防火墙特别严格的以外

米表在部分刷卡机上的表现不太好，经常会出现刷不上的情况，可能是芯片距离或者工作频率的问题

## 尾言和提醒

> **务必注意**

部分设备的校验程序可能设计的十分简陋，因为早期很少有人折腾NFC卡片，但就比如我的学校用的是n年前由联通定制的管理系统(目前好像是放弃维护的状态)，我这边的卡机只校验卡数据后的校验码，不和服务器上存储的数据进行比对，所以我在推出校验码公式后成功修改了名字和金额，当然我是把金额改少了而非增加，然后告诉了学校的相关负责人，后来因为本来就很少有人折腾，然后就没有然后了(记住如果你想向校方反应，请一定是改少而非增加，否则容易造成误会！)

总而言之，就是有的系统不会对账，导致可以修改金额，所以请务必注意数据的唯一性，因为我国有一套完整的法律，网上已经可以查到前车之鉴了

最后晒一下我的米表和米环

![](https://assets.moedev.cn/blog/photo/images/2021/Z1Ht.webp!webp)
![](https://assets.moedev.cn/blog/photo/images/2021/wMEk.webp!webp)
> **参考文献及附件下载链接**

驱动和工具:

私有云：[云盘下载](https://tcs.moeblog.vip/#/list/shiro/71399113240308762)比蓝奏更快？试试呗(最近可能偶尔抽风)

蓝奏云：[云盘下载](https://shiro332.lanzous.com/inGCDorso0d)
