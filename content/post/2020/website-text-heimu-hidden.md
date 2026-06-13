---
title: "给你的网站文字添加黑幕-隐藏文字"
description: "在萌娘百科上无意闲逛看到了一些有趣的网页效果,比如网页弹幕和文字黑幕,便决定添加到自己的博客上来。 开始前请注意本文基于知识共享 署名-非商业性使用-相同方式共享 3.0 (CC BY-NC-SA 3.0) 许可协议发布 源码引自萌娘百科,万物皆可萌的百科全书! 源码地址:传送门 转载请在开头保留本……"
date: "2020-02-17 00:00:00"
slug: "website-text-heimu-hidden"
categories: "tech"
tags: ["CSS", "css heimu", "代码", "网站隐藏文字"]
---

> [!NOTE]  
> 此文章恢复自过去的博客站点，仅作纪念保留。  
> 原文发布于 2020-02-17  
> 原始地址：[https://justmyblog.net/post/116.html](https://justmyblog.net/post/116.html)  
> Web Archive：[https://web.archive.org/web/20210509214415/https://justmyblog.net/post/116.html](https://web.archive.org/web/20210509214415/https://justmyblog.net/post/116.html)  

在萌娘百科上无意闲逛看到了一些有趣的网页效果,比如网页弹幕和文字黑幕,便决定添加到自己的博客上来。

> **开始前请注意**
> 本文基于
[知识共享 署名-非商业性使用-相同方式共享 3.0 (CC BY-NC-SA 3.0) 许可协议](https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh)
> 发布
> 源码引自
[萌娘百科,万物皆可萌的百科全书!](https://zh.moegirl.org/Mainpage)
> 源码地址:
[传送门](http://zh.moegirl.org/MediaWiki:Common.css)
> 转载请在开头保留本文链接以及源码链接,并遵循相关协议
> 内容不可商用!

## 原理分析

文字背景和字体都设置为黑色，当鼠标选中时高亮
`<span style="color:#66ccff; background-color:#66ccff;">黑幕下的文字<span>`
然后再弄个自动高亮就ok了

## 直接放CSS源码

```css

/*
 * 请尊重萌娘百科版权，以下代码除非注明均是管理员手敲出来的！！！复制需要注明源自萌娘百科，并且附上URL地址http://zh.moegirl.org/MediaWiki:Common.css
 * 版权协定：知识共享 署名-非商业性使用-相同方式共享 3.0
 * 复制之后请把图片换成自己网站上URL地址！
 */
span.heimu a.external,
span.heimu a.external:visited,
span.heimu a.extiw,
span.heimu a.extiw:visited {
    color: #252525;
}
.heimu,
.heimu a,
a .heimu,
.heimu a.new {
    background-color: #252525;
    color: #252525;
    text-shadow: none;
}
body:not(.heimu_toggle_on) .heimu:hover,
body:not(.heimu_toggle_on) .heimu:active,
body:not(.heimu_toggle_on) .heimu.off {
    transition: color .13s linear;
    color: white;
}
body:not(.heimu_toggle_on) .heimu:hover a,
body:not(.heimu_toggle_on) a:hover .heimu,
body:not(.heimu_toggle_on) .heimu.off a,
body:not(.heimu_toggle_on) a:hover .heimu.off {
    transition: color .13s linear;
    color: lightblue;
}
body:not(.heimu_toggle_on) .heimu.off .new,
body:not(.heimu_toggle_on) .heimu.off .new:hover,
body:not(.heimu_toggle_on) .new:hover .heimu.off,
body:not(.heimu_toggle_on) .heimu.off .new,
body:not(.heimu_toggle_on) .heimu.off .new:hover,
body:not(.heimu_toggle_on) .new:hover .heimu.off {
    transition: color .13s linear;
    color: #BA0000;
}
```

膜拜大佬的源码

> [!NOTE]
> 把上面的内容添加到网站CSS即可

## 基本食用方法

方法很简单
`<span class="heimu" title="光标显示内容">黑幕内容</span>`
举个栗子
`<span class="heimu" title="你知道的太多了">嘿嘿嘿</span>`
效果:||嘿嘿嘿||
此CSS支持评论区使用(采用Markdown评论的主题不支持,因为不支持html)

## 高级食用方法

基本食用方法够用了所以其它高级用法请参见萌娘百科黑幕相关内容
萌娘百科:[黑幕模板](https://zh.moegirl.org/zh-hans/Template:%E9%BB%91%E5%B9%95)
萌娘百科:[模板讨论:黑幕](https://zh.moegirl.org/zh-hans/Template_talk:%E9%BB%91%E5%B9%95)
欢迎在评论区分享更高级的食用方法

> [!NOTE]
> 欢迎在本文章评论区测试效果!
