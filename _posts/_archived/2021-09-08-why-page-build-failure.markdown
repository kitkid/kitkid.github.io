---
layout: post
title:  "Why page build failure"
tags: play
lang: zh-Hans
---
因为pdf这个tag

{% highlight ruby %}
  pdf_file: "/assets/pdf/Huahui_CV.pdf"
{% endhighlight %}
或者是

{% highlight ruby %}
 % pdf {{ page.pdf_file }} no_link% /* '' */
{% endhighlight %}

现在删掉了 会成功吗？
