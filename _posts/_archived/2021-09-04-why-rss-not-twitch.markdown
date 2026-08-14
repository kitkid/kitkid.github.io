---
layout: post
title:  "Why RSS icon not Twitch"
date:   2021-09-04 14:59:36 +0800
tags: play
---
update
从导入的icon数据库可以注释掉源码- -
:

{% highlight ruby %}
.icon-rss:before { content: '\f09e'; } /* '' */
{% endhighlight %}

问题来了 想要替换成twitch icon 为什么不能
:
{% highlight ruby %}
<a class="social-link social-twitch" href="{...}">
  <i class="icon-twitch"></i>
</a>
{% endhighlight %}

救命了🆘
