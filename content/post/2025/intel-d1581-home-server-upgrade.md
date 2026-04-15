---
title: 低功耗家里云升级记
description: Intel D-1581 寨板使用体验与性能测试
date: 2025-01-22 17:37:00+0000
image: https://assets.moedev.cn/blog/photo/images/2025/20250122114505511.png!webp
slug: intel-d1581-home-server-upgrade
categories: tech
---

## 缘由

![](https://assets.moedev.cn/blog/photo/images/2025/20250122114505511.png!webp_white_sign)
↑上图是博主家里云早期形态，咱自己知道很抽象，就别吐槽了（QAQ）

在最近一次断电后，家里的老服务器便未能再次成功启动。此前家里的软路由、HA和咱自用的容器服务器等设施都运行在这上面。于是购置一台新的服务器就成了需要马上解决的问题。


老服务器是博主在高中的时候用可怜的预算组的，由一块退役X8DTL-3F主板搭配双路X5680和混插的32G内存组成，硬盘在后期也只有一块英睿达MX500，电源在搬出准系统后用的是一款捡废品的不知名老电源，待机功耗达到了相当恐怖的100-110w。（一年下来电费都够买一台全新的服务器了）

有了之前的经验，这次选购新平台的时候博主就非常注重能耗问题，毕竟博主身处19线小县城，当地私人电力公司从国网购电后再销售给当地居民，电价>0.6/度。可惜当前arm洋垃圾价格仍然不够便宜，在群友的建议下，咱准备从d1581和d-2143it中选择一套。

## 采购

### 板U + 内存

逛了两天咸鱼后博主选择了火神革命D-1581 Q3板U套装，虽然知道寨板问题挺多的，但是它胜在便宜啊。主板+U套装咸鱼二手只要300出头，而且还有2.5G网口x2，并且D-1581拥有16核32线程，采用14nm工艺，TDP仅仅只有65w，相比之前老平台上单颗130w的X5680能耗不知道甩了几条街，完美符合咱对家里云的想象。

内存是咸鱼卖家一起打包出售的4根16GB DDR3L低压1666Mhz三星内存条。

![](https://assets.moedev.cn/blog/photo/images/2025/2968d579479463334834d2f67b7ec886.jpeg!webp_white_sign)

![D-1581 Q3板U](https://assets.moedev.cn/blog/photo/images/2025/20250122112601528.png!webp_white_sign)
![4根16GB DDR3L低压1666Mhz三星内存条](https://assets.moedev.cn/blog/photo/images/2025/20250122112620502.png!webp_white_sign)

### 硬盘

硬盘方面系统盘依旧使用原有的英睿达MX500，在此基础上咱又从淘宝店家“上海浦东服务器”购买了一块店保1年的6TB SAS盘作为数据写入盘。

![](https://assets.moedev.cn/blog/photo/images/2025/bb2104a889575a48dcb691c455fc5259.jpeg!webp_white_sign)

![](https://assets.moedev.cn/blog/photo/images/2025/c2d803ccdaf0c6767ed4337364b0e8bd.jpeg!webp_white_sign)
![](https://assets.moedev.cn/blog/photo/images/2025/ee80a0c4774359b1cc2df8e886b65280.jpeg!webp_white_sign)

### 电源&机箱

一开始咱用的老服务器上捡垃圾来的杂牌电源，结果加上新硬盘后硬盘供电线不够了，索性直接把家里闲置的直出线长城电源换上了。机箱也是用的之前买的航嘉￥99机箱。

![](https://assets.moedev.cn/blog/photo/images/2025/a787d34687b762780c2e9c2ce424dd01.jpeg!webp_white_sign)

## 部署

拆掉旧主板，然后水洗散热器里的灰尘，不停歇的跑了整整两三年还是积了不少灰。

![](https://assets.moedev.cn/blog/photo/images/2025/20250122164632909.png!webp_white_sign)
![](https://assets.moedev.cn/blog/photo/images/2025/20250122164600246.png!webp_white_sign)

### 寨板内存问题

安装散热器到新主板测试一次点亮进入BIOS，但是一进入Ventoy引导的WinPE就死机重启，数显管故障码42。插上原来的系统盘进入PVE系统的时候也出现了问题，在启动过程中PVE会卡死机在Loading initial ramdisk，重启后问题稳定复现。

通过在网上对这块寨板的搜索，最终在v2ex论坛找到一个有用的答复。

>V2EX  ›  问与答  https://www.v2ex.com/t/908551#;
>zeze0556      2023-01-13 16:29:59 +08:00
@xuxuxu123 我目前在用的是这个方案。感觉不稳定。头一次，vmware 中开鲁大师跑分，到 cpu 测试的某一项，3/10 的概率整台电脑（不是单独虚拟机）定屏死机。后来换了主板，就是目前在用的，vmware 中跑鲁大师无问题了，然后发现，有时候正常关机后，再次开机鼠标+键盘可能就失效了（连电都不供的那种），重启无效，除非把电源断开 10 秒以上，然后开机就又回来了，这个问题只是一个使用麻烦的问题，另外一个问题就实在太无语了，我内存加满到 4x16G,有时候几天都不出问题，有时候突然来个定屏死机，不频繁+我自己太忙，就先凑活着。前几天稍闲，决定看看到底是什么问题，根据 windows 的日志，有很多内存相关的错误，但定屏死机没有错误日志，这个真的靠猜测了。联系客服，反馈内存问题，然后沟通测试单条，看是否内存的问题。这两天我晚上一回家就测试，一个晚上多加一根内存，目前测试到第三根内存，结果都没有出现死机。但昨天完场发现另外一个问题，==四个内存槽，从 cpu 侧往电源侧数，1-3 内存槽，如果插了的话，电脑开机就是黑的，连 bios 自检画面都不出来，如果隔开第 3 个内存槽，则正常开机。==但目前还没发现死机，因为死机无规律，只能看运气。理论上将，可能 4 根内存插上也可以开机，毕竟之前就这么用的，只是会死机。目前过年要回老家了，注定要年后去骚扰客服了。

博主按照这位网页的插法去掉一根内存果然顺利进入系统，并且后续测试稳定不死机，不过这样很可惜的就是白白浪费掉一根内存条，总内存从64G下降到48G，心里在滴血。

随后装入机箱，并加装SAS直通卡和硬盘，通过显示器上的终端修改PVE网卡绑定。

![](https://assets.moedev.cn/blog/photo/images/2025/20250122165137765.png!webp_white_sign)

![](https://assets.moedev.cn/blog/photo/images/2025/20250122164813597.png!webp_white_sign)
![](https://assets.moedev.cn/blog/photo/images/2025/b7f78dee4d1961936b4fdcc19024413e.jpeg!webp_white_sign)

### 内存问题分析

博主咨询了卖家此前的运行情况，了解到原主人安装ESXI 8U3的时候内存插满运行正常，也就是说这块板子一开始是正常的，同时网上另一家D-1581主板厂子（米多贝克）的主板不存在内存插满死机问题，因此也可以排除设计缺陷。

博主猜测由于主板走线设计问题，内存插槽可能在运输途中受损所以出现了工作不稳定的情况。

## 测试

### 来电自启测试

好在该寨板本就为AIO（All in one，all in boom）设计，所以板载了来电开机跳线，经过几次人为意外断电测试，机器均能稳定启动并进入PVE。

为了避免以外发生，咱又在咸鱼购入一台Pikvm（基于onekvm的ipmi系统，能通过网络远程控制主机，可连接被控显示器输出和鼠标输入，并模拟usb设备插入和控制开机重启跳线），目前已经下单在途还未收到货。

### Geekbench 6测试

测试结果：https://browser.geekbench.com/v6/cpu/10055850

被测主机信息：

![](https://assets.moedev.cn/blog/photo/images/2025/7d022cb87046bc32c6b281bd733b59fc.png!webp_white_sign)

单核&多核测试结果：

![](https://assets.moedev.cn/blog/photo/images/2025/20250122172921849.png!webp_white_sign)
![](https://assets.moedev.cn/blog/photo/images/2025/20250122172939377.png!webp_white_sign)

单核可以说是惨不忍睹，但是家里云这种场景来说，完全够用了。希望这台机器能够稳定使用5个年头吧，到时候估计就能玩上arm洋垃圾了。

完结撒花，感谢阅读🌸
