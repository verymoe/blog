---
title: "破解电信光猫HS8145V超级密码(图文教程)"
description: "家里有一台电信的HS8145V光猫,但是普通账号(useradmin)的权限实在是太少了,而超级账号(telecomadmin)多了许多实用的功能,比如DDNS(动态域名)和QoS功能以及其它实用功能(破解后自己慢慢玩吧),下面开始破解! 破解效果:破解后普通账号登录即为超级账号页面,密码不会被更新……"
date: "2020-02-02 00:00:00"
slug: "crack-telecom-modem-hs8145v-super-password"
categories: "tech"
tags: ["HS8145V", "电信光猫", "超级密码"]
---

> [!NOTE]  
> 此文章恢复自过去的博客站点，仅作纪念保留。  
> 原文发布于 2020-02-02  
> 原始地址：[https://justmyblog.net/post/105.html](https://justmyblog.net/post/105.html)  
> Web Archive：[https://web.archive.org/web/20210509214415/https://justmyblog.net/post/105.html](https://web.archive.org/web/20210509214415/https://justmyblog.net/post/105.html)  

家里有一台电信的HS8145V光猫,但是普通账号(useradmin)的权限实在是太少了,而超级账号(telecomadmin)多了许多实用的功能,比如DDNS(动态域名)和QoS功能以及其它实用功能(破解后自己慢慢玩吧),下面开始破解!

> [!WARNING]
> 破解效果:破解后普通账号登录即为超级账号页面,密码不会被更新!

![光猫HS8145V](https://assets.moedev.cn/blog/photo/images/2020/IK7g.jpg!webp)
> [!CAUTION]
> 参考文章链接和工具链接均在文章下方,超级密码不适合所以用户使用,还请自行判断,在破解开始前请先完整阅读本文章,如果破解失败请自行检查,确认方法无误,实在不行在下发评论留言说明问题

## 破解步骤:

1. 备份(记下loid即可)
2. 重置
3. 选择地区
4. 下载配置
5. 解密和修改配置
6. 上传配置
7. 配置网络

## 第一步(记下loid)

记录下自己的loid信息以及自己的宽带账号和密码(宽带账号和密码不知道的找电信营业厅查询)

![登录网关](https://assets.moedev.cn/blog/photo/images/2020/IpHC.jpg!webp)
![记录loid](https://assets.moedev.cn/blog/photo/images/2020/IG2N.jpg!webp)

宽带账号密码在后期网络配置需要用到,请自行登录营业厅查询!

## 重置光猫(恢复默认超级密码)

> [!WARNING]
> 提示一:先拔下光纤！！！不然下发配置后超级密码就变了

然后长按光猫背面reset键,直到所有灯亮起并熄灭!!!(也就是所以灯亮起后再熄灭才松手!大概10秒钟,否则无法完全重置,后期修改地区时光猫会提示注册过无法修改地区)

![重置光猫](https://assets.moedev.cn/blog/photo/images/2020/IIz1.jpg!webp)

等待光猫重置后进入网关管理页面[传送门](http://192.168.1.1/)

因为配置重置了所以这个时候会要求填写loid和密码,不用管。

现在已经能够进入超级账号并修改设置了,但是网络配置好后,电信一旦下发配置默认超级密码就会被修改,所以还没有弄完,还要继续。

## 修改地区

打开浏览器(接下来示范用的谷歌浏览器)进入http://192.168.1.1:8080/loidchoosearea.asp ([传送门](http://192.168.1.1:8080/loidchoosearea.asp))

![地区修改](https://assets.moedev.cn/blog/photo/images/2020/IJNx.jpg!webp)

这个时候会要求输入密码,让我们忽略这个密码当它不存在

![:huaji15:](https://assets.moedev.cn/blog/photo/images/2020/huaji15.png!webp)

接下来的操作看好了

光标移动到密码框的位置然后右键

![选择检查](https://assets.moedev.cn/blog/photo/images/2020/IX6X.jpg!webp)

找到“ChooseAreaModule”

![搜索“ChooseAreaModule”](https://assets.moedev.cn/blog/photo/images/2020/IZB4.jpg!webp)

删除“display:none;”

![删除“display:none;”](https://assets.moedev.cn/blog/photo/images/2020/IwI8.jpg!webp)

然后回到地区选择页面就可以看到效果了

![选择地区](https://assets.moedev.cn/blog/photo/images/2020/IN5G.jpg!webp)

现在就可以选择地区了

选择地区,然后等待光猫自动配置然后重启,再继续下面的步骤

> [!WARNING]
> 提示二:部分地区可能会卡在0%,如果卡在0%超过5分钟,可能是你的光猫无需配置地区,就忽略选择地区这个步骤

## 下载配置

在光猫后面插入一个U盘

然后登录网关管理页面输入默认超级账号和超级密码并登录(超级账号:telecomadmin 超级密码:nE7jA%5m >)

> [!WARNING]
> 提示三:因为还没有配置网络,所以输入192.168.1.1会自动导向loid配置(设备注册页面)直接忽略就行了,右上角有返回登录页面的链接

选择管理>设备管理>选择u盘分区>再点击备份配置(别选中快速恢复和覆盖备份文件)

(我这里示范没有插入U盘,所以显示没有存储分区)

![备份配置](https://assets.moedev.cn/blog/photo/images/2020/IU7A.jpg!webp)

备份成功后拔下U盘插到电脑上并打开然后准备好华为二次密码破解工具(文章末尾有工具下载链接)

## 解密和修改配置

进入U盘里面名为e8_Config_Backup的文件夹,会有一个后缀为.cfg文件,这就是配置文件,但是现在还无法打开,因为被加密了

![CFG文件](https://assets.moedev.cn/blog/photo/images/2020/IeKt.jpg!webp)

打开华为二次密码破解工具,选择配置文件,然后解密

![](https://assets.moedev.cn/blog/photo/images/2020/IgmK.jpg!webp)

现在回到U盘里的文件夹,会有两个文件,删掉前面有old_的不管

然后打开另一个文件(可以用万能的记事本打开)

搜索X_HW_WebUserInfoInstance InstanceID="1"，将后面的UserLevel修改为0,就可以将useradmin改为超级用户

![修改权限](https://assets.moedev.cn/blog/photo/images/2020/Ii2W.jpg!webp)

修改后保存再打开华为二次密码破解工具并加密

![加密配置文件](https://assets.moedev.cn/blog/photo/images/2020/ImzH.jpg!webp)

再打开U盘里的文件夹,删掉前面有old_的不管,然后把U盘插回光猫

## 上传配置

用超级账号登录光猫后台

选择管理>设备管理>选中快速恢复再选择u盘分区>再点击恢复默认配置

(记得选中快速恢复再点击恢复默认配置,这个时候从U盘里的配置文件恢复)

然后等待光猫恢复后重启,等能够连接后再拔下U盘

然后再用普通账号(useradmin)登录光猫,这个时候普通账号登录进去就是超级管理页面了!(如果进去不是的话就失败了,请自行复读教程检查错误,实在不行再在文章下评论留言问题 & 192.168.1.1会被自动导向参见提示三)拥有所有修改权限,破解到此就完成一半了!

## 配置网络

进入loid配置页面(设备注册)http://192.168.1.1:8080/loidgregsuccess.asp ([传送门](http://192.168.1.1:8080/loidgregsuccess.asp))

输入你的loid,密码留空,然后点击确定等待设备注册完毕!

![注册设备](https://assets.moedev.cn/blog/photo/images/2020/InUD.jpg!webp)

设备注册完后登录光猫,完毕!(注册完后默认为桥接模式,需要电脑拨号上网,下面是修改为光猫做路由器的教程)

> [!NOTE]
> 下面给使用光猫拨号的人看(路由模式配置)

选择网络>网络设置

1.连接名称选有internet那个

2.连接模式选路由

3.用户名和密码分别输入宽带账号和宽带密码

4.拨号方式选自动

5.保存

![网络配置](https://assets.moedev.cn/blog/photo/images/2020/Ir6u.jpg!webp)
> [!NOTE]
> 终于写完了剩下的设置自己慢慢尝试吧

> **工具下载**
> 蓝奏云:
[云盘下载](https://www.lanzous.com/i906cah)

> **参考文章**

[http://www.chinadsl.net/forum.php?mod=viewthread&tid=150832&fromuid=96316](http://www.chinadsl.net/forum.php?mod=viewthread&tid=150832&fromuid=96316)

[http://www.shawze.com/2018/07/02/%E5%8D%8E%E4%B8%BA%E5%85%89%E7%8C%ABHS8145V%E8%8E%B7%E5%8F%96%E8%B6%85%E7%BA%A7%E5%AF%86%E7%A0%81-%E9%85%8D%E7%BD%AE%E7%BD%91%E7%BB%9C/](http://www.shawze.com/2018/07/02/%E5%8D%8E%E4%B8%BA%E5%85%89%E7%8C%ABHS8145V%E8%8E%B7%E5%8F%96%E8%B6%85%E7%BA%A7%E5%AF%86%E7%A0%81-%E9%85%8D%E7%BD%AE%E7%BD%91%E7%BB%9C/)
