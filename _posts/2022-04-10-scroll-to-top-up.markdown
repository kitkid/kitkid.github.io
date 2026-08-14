---
layout: post
title:  "New Feature - ScrollToTop"
tags: play
lang: zh-Hans
---
><font size=2>小聪明.jpg

修改了原主题的一个设定：

增加一个点击回到页面顶部（头部？）的按钮。

起因：
1. 裹脚布越写越长
2. 但TOC一直难产（懒惰）

问题来了：看到最后想再看一遍怎么办？（猪脸皮）

解决方案：加入一个ScrollToTop的按钮。

设想是：
1. 进入随记页面后，不会看到这个按钮
2. 随着阅读进度，会逐渐出现（动效1）
3. 点击按钮回到头顶
4. 回到的时候，会逐渐小事（动效2）
5. 鼠标悬停的时候，图标有变化（动效3）

过程：首先在知识的海洋里淘宝，决定按着这位好心人的[教程](https://jun711.github.io/web/adding-scroll-to-top-button-to-a-website/)来做。

### 阶段一，又名愚人节礼物开发成功
意思就是，有了按钮，有了动效，但没有实际功能——点击没有反应。

![screenshot](/assets/images/posts/220410/v1.gif)<font size=2>不是截图

一开始理解是，此处是不是需要一个跳转链接（事实上不是）？然后在海洋里找偏方，对症下药。

找到了[这个简单向上滚的教程](https://simplescrollup.programadorwebvalencia.com/)。

### 阶段二，又名半摊子菜狗的胜负欲
不满意。一开始发现点击回到顶部后，网址会加上/#up。原因：

`<a href="#up">`

那么直接去掉呢？

`<a href="">`

![screenshot](/assets/images/posts/220410/v2.gif)<font size=2>致歉，需要放大镜了

也就是回到顶部变成了刷新网页。不满意！
（而且因为加上了链接，按钮下方会出现下划线，啊！）

### 阶段三，又名小聪明坚持就是胜利
但在这个简单教程里，盲生发现了花点：
需要在网页主体布局（layout）中调用js
{% highlight ruby %}
  <body>
    <!-- Your HTML content -->
    <script src="scroll-to-top.js"></script>
  </body>
{% endhighlight %}  

okkkkkk！可以了！<font size=2>弱弱：教程教程，是得一步一步，啥都不能跳过啊。</font>

![screenshot](/assets/images/posts/220410/v3.gif)<font size=2>用大图标，应该不用放大镜了

但但为什么一开始就显示这个图标呢？

![screenshot](/assets/images/posts/220410/last.gif)

布局css文件里的`display: hidden;`不是关于这个的吗？

最后灵光一现，调整了`opacity: 0;`

嘻嘻，现在好像正常了。

### 最后
一时半会决定不好用什么样的图标，于是打算暂时用（不搞笑）文字代替。
阅读愉快！

···

兴奋小葱h
