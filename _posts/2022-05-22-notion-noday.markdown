---
layout: post
title:  "Notion/date一战"
tags: play
lang: zh-Hans
---
><font size=2>关于游戏随记难产的周边记录

赛博难民的宝贝，豆瓣记录备份进行时。

### 目标：

1. 备份所有重要记录，包括（以观影记录为例）：
    - 标题
    - 评分
    - 短评
    - 自己的标签
    - 打分时间

2. 如果可以，非重要记录，包括：
    - 对应的海报（其实很想要- -）
    - 电影信息：上映年份、主创信息


### 方案：

在网络海洋里，我搜索到竹子这篇[《豆瓣标记导出到 Notion 并同步》](https://zhuzi.dev/2021/06/05/douban-backup-sync-notion/)[^1]（并且意外发现同款主题hhh），试试发现简单快捷，很不错。~~跟着文档走，走豆闯no不伤脑~~


但有个问题（准确两个，因为挺想拥有海报的）：

**打分的时间显示。**

上面文章里提及的油猴脚本抓取的打分时间为日期，即年月日，YYYY-MM-DD，就结束了。

![screenshot](/assets/images/posts/220522/no0.png)<font size=2>读书记录到日子就够了，不需要时间- -因为不怎么看书bushi

菜狗不满足。因为对于量大的观影记录，特殊情况有很多，比如一天内看了很多、分时间标记，或者特殊的时间点（深夜emo之类的）等，需要时间来区分。总之的总之，我还是想保留一些时间细节。


### 对策：

此时，我想起了豆瓣搬家知名工具，豆坟，抓取的信息很全（除了海报），并且有导出数据表的功能。于是，我尝试导出-转制csv-再导入到notion。获得时间！

![screenshot](/assets/images/posts/220522/no2.png)<font size=2>为什么是GMT！

![screenshot](/assets/images/posts/220522/no1-1.png)
{:.side-note}

这个时候，无知的我轻敌了。我从notion导出表格后，观察了数据格式。

「害，简单，把GMT替换成CST？」

然后我获得了日期没有正常显示，只能以文本显示时间的表格：）

![screenshot](/assets/images/posts/220522/no1.png)

![screenshot](/assets/images/posts/220522/no1-3.png)<font size=2>找不同

「那把(GMT)去掉呢？」

![screenshot](/assets/images/posts/220522/no1-2.png)<font size=2>哈哈

![screenshot](/assets/images/posts/220522/no3.png)
{:.side-note}

此时我不服，为什么豆坟的表格就能成功导入？看了一下单元格格式，常规，但我导出的都是自定义格式。那我在常规基础上直接加(CST)会有用吗？

结果：无，Excel背刺。而且，离谱的是，GMT时间导出的csv再导回也无法正确显示日期。Notion：我不知道、我没有。（我攥紧了馒头）

下次再战，先活在GMT时区吧。


### 关于自动化

自动更新也用了竹子那篇文章，RSS真棒，科技改变生活=）

...

想在草地上打滚的苏格兰高地犬h


注释：

[^1]:[豆瓣标记导出到Notion并同步](https://zhuzi.dev/2021/06/05/douban-backup-sync-notion/)
