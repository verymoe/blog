---
title: "wamp升级mysql,php,apache的完美解决方案"
description: "wampsever是一个十分好用的网站环境搭建程序，但是官方提供的版本中安装的mysql,php和apache一般都不是最新的版本，一般我们升级都是自己下程序包然后解压安装，虽然网上有很多自己升级的教程，但是对于新手来说十分麻烦并且容易出错，以至于wamp一直无法启动。 但其实官方有提供升级程序的……"
date: "2019-07-08 00:00:00"
slug: "wamp-upgrade-mysql-php-apache"
categories: "tech"
tags: ["apache", "mysql", "php", "wamp"]
---

> [!NOTE]  
> 此文章恢复自过去的博客站点，仅作纪念保留。  
> 原文发布于 2019-07-08  
> 原始地址：[https://www.milorette.vip/archives/29.html](https://www.milorette.vip/archives/29.html)  
> Web Archive：[https://web.archive.org/web/20191206015355/https://www.milorette.vip/archives/29.html](https://web.archive.org/web/20191206015355/https://www.milorette.vip/archives/29.html)  

wampsever是一个十分好用的网站环境搭建程序，但是官方提供的版本中安装的mysql,php和apache一般都不是最新的版本，一般我们升级都是自己下程序包然后解压安装，虽然网上有很多自己升级的教程，但是对于新手来说十分麻烦并且容易出错，以至于wamp一直无法启动。

但其实官方有提供升级程序的，只不过绝大多数人没有看到而已

下面是针对各版本的升级程序（截至2019年7月8日）

注意升级到mysql,php和apache最新版本之前请确认你的wampsever版本也是最新的！

（目前wamp最新版本是3.1.9）

由于下载链接是指向国外因此部分用户可能无法下载，所以本站提供部分升级包的百度云下载链接（链接请见文章末尾）

wamp3.1.9下载

下载32位：[Wampserver 3.1.9 32 bit x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/wampserver3.1.9_x86.exe/download)

下载64位：[Wampserver 3.1.9 64 bit x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/wampserver3.1.9_x64.exe/download)

官方apache升级扩展包

下载32位：[Apache 2.2.34 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Apache/wampserver3_x86_addon_apache2.2.34.exe/download)/[Apache 2.4.39 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Apache/wampserver3_x86_addon_apache2.4.39.exe/download)

下载64位：[Apache 2.4.39 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Apache/wampserver3_x64_addon_apache2.4.39.exe/download)

官方php升级扩展包

下载32位：[PHP 5.3.29 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x86_addon_php5.3.29.exe/download)/[PHP 5.4.45 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x86_addon_php5.4.45.exe/download)/[PHP 5.5.38 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x86_addon_php5.5.38.exe/download)/[PHP 5.6.40 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x86_addon_php5.6.40.exe/download) /[PHP 7.0.33 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x86_addon_php7.0.33.exe/download)/[PHP 7.1.30 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x86_addon_php7.1.30.exe/download)/[PHP 7.2.20 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x86_addon_php7.2.20.exe/download)/[PHP 7.3.7 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x86_addon_php7.3.7.exe/download)

下载64位：[PHP 7.0.33 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x64_addon_php7.0.33.exe/download)/[PHP 7.1.30 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x64_addon_php7.1.30.exe/download)/[PHP 7.2.20 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x64_addon_php7.2.20.exe/download)/[PHP 7.3.7 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x64_addon_php7.3.7.exe/download)

官方mysql升级扩展包

重要提示：不同版本的MariaDB或MySQL之间的数据库传输只能通过SQL文件的EXPORT / IMPORT来完成。千万不要在不同版本之间复制数据文件。

下载32位：[MySQL 5.5.62 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Mysql/wampserver3_x86_addon_mysql5.5.62.exe/download)/[MySQL 5.6.44 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Mysql/wampserver3_x86_addon_mysql5.6.44.exe/download)/[MySQL 5.7.26 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Mysql/wampserver3_x86_addon_mysql5.7.26.exe/download)

下载64位：[MySQL 5.5.62 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Mysql/wampserver3_x64_addon_mysql5.5.62.exe/download)/[MySQL 5.6.44 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Mysql/wampserver3_x64_addon_mysql5.6.44.exe/download)/[MySQL 5.7.26 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Mysql/wampserver3_x64_addon_mysql5.7.26.exe/download)/[MySQL 8.0.16 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Mysql/wampserver3_x64_addon_mysql8.0.16.exe/download)

官方mariaDB升级扩展包

重要提示：不同版本的MariaDB或MySQL之间的数据库传输只能通过SQL文件的EXPORT / IMPORT来完成。千万不要在不同版本之间复制数据文件。

下载32位：[MariaDB 5.5.54 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/MariaDB/wampserver3_x86_addon_mariadb5.5.54.exe/download)/[MariaDB 10.1.39 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/MariaDB/wampserver3_x86_addon_mariadb10.1.39.exe/download)/[MariaDB 10.2.25 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/MariaDB/wampserver3_x86_addon_mariadb10.2.25.exe/download)/[MariaDB 10.3.16 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/MariaDB/wampserver3_x86_addon_mariadb10.3.16.exe/download)/[MariaDB 10.4.6 x86](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/MariaDB/wampserver3_x86_addon_mariadb10.4.6.exe/download)

下载64位：[MariaDB 5.5.54 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/MariaDB/wampserver3_x64_addon_mariadb5.5.54.exe/download)/[MariaDB 10.1.39 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/MariaDB/wampserver3_x64_addon_mariadb10.1.39.exe/download)/[MariaDB 10.2.25 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/MariaDB/wampserver3_x64_addon_mariadb10.2.25.exe/download)/[MariaDB 10.3.16 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/MariaDB/wampserver3_x64_addon_mariadb10.3.16.exe/download)/[MariaDB 10.4.6 x64](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/MariaDB/wampserver3_x64_addon_mariadb10.4.6.exe/download)

其它官方工具升级扩展包

[PhpSysInfo 3.3.1](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Applications/wampserver3_phpsysinfo3.3.1.exe/download)

[PhpMyAdmin 4.9.0.1 (x86 et x64)](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Applications/wampserver3_x86_x64_phpmyadmin4.9.0.1.exe/download)

[Adminer 4.7.1](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Applications/wampserver3_x86_x64_adminer4.7.1.exe/download)

最新版本升级扩展包均可在官方论坛中找到

[论坛传送门](http://forum.wampserver.com/list.php?1)

百度云下载仅提供wamp3.1.9+mysql8.0.16+apache2.4.39（内附vc整合包）

为防止请求过多导致链接失效，建议优先采用官方链接下载

[云盘下载](https://pan.baidu.com/s/12DSKNrPQGLzI9LefXBOvKQ)

提取码：pkzl
