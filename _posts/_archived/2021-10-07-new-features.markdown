---
layout: post
title:  "New features"
tags: play
lang: zh-Hans
---
修改了一些原主题的设定

1. 在layout里加上了文段的两端对齐：
        `text-align: justify`
2. 在sidenote里暂时加上了鼠标悬浮放大的设定
{% highlight ruby %}
    img: {
    width: 100%;
    transform: scale(1);
    transition: transform 1s ease 0s;
    }

    img:hover {
    transform: scale(2);}
{% endhighlight %}    
问题：想要放在边上的图片有点迷你，不易读

解决思路：放大图片

想法：鼠标悬浮放大 或者/和 点击跳转新标签页打开图片

搜索了主题制作者的博客，发现ta采取了第二种方案，即点击跳转。比如：查阅了[这篇文章](https://banana.moe/posts/2018-07-21-review-of-netflix)里小图的源代码，发现——

`<a href="link" onclick="openImageInNewTab(this);"`

但问题：这段代码该改加在哪里呢=P 是需要在_includes里面加一份js？

在还没找到实际解决方案，先加上了易操作的鼠标悬浮放大kk

关爱老年人 从我做起
