---
layout: post
title:  "Notion/date二战"
tags: play
lang: zh-Hans
---
><font size=2>玩心过重，游戏随记：还在吗？

上回书说到，从豆坟导入的时区在GMT；从rss自动导入的没有时间。

### 目标：

1. 加入时间节点
2. 正确时区：CST('Asia/Shanghai')


### 思路：

懒人阅读理解，第一步寻找关键词：搜索「RATING_DATE」。

找到：
{% highlight ruby %}
  itemData[DB_PROPERTIES.RATING_DATE] = dayjs(item.time).format('YYYY-MM-DD');
{% endhighlight %}

理解：
1. 和时间格式有关：加上HH:mm
2. 和时间格式有关：在哪里加时区呢

### 过程：
感觉还是得配个本地调试，有些忘记之前踩到的坑，记录不准确，无法做控制变量的复原实验。只记得聪明的我解决了问题，尴尬=）
{:.side-note}

**阶段一：加入时间**

首先解决时间节点。

{% highlight ruby %}
  format('YYYY-MM-DD HH:mm');
{% endhighlight %}

坑A：时间格式没写对。

情况：LOG里出现ISO 8601 date string[^1]相关报错，例如：
> body failed validation: body.properties.打分日期.date.start should be a valid ISO 8601 date string, instead was `"2022-05-26 22:06 +08:00"`. （这里是06和加号之间应没有空格）

加入时间是简单的。但加入后「惊喜」地发现：

![screenshot](/assets/images/posts/220528/01.png)
~~啊哈我在清早看电影！~~

情况：时间直接被换算成UTC时区 （一级警告：和之前时间值不变、时区有误的情况不同：这次时间值被换算了）。我：措手不及，突然时区开战。


**阶段二：时区恶战**

坑B：没细想，直接加时区，可以吗？

结果：
![screenshot](/assets/images/posts/220528/02.png)

情况：时间被换算成UTC时区，但notion时区被设置成+8。我：傻眼。

猪子开始研读dayjs关于timezone的文档[^2]，发现：哦，默认了UTC，更改需要Timezone插件！


然后加入：

首先，加载插件（utc是爸爸，再有的timezone ~~doesn't make sense~~)，将默认时区改成自定义时区。

{% highlight ruby %}
 const utc = require('dayjs/plugin/utc');
 const timezone = require('dayjs/plugin/timezone');
 const tz = require('dayjs/plugin/timezone');
 dayjs.extend(utc);
 dayjs.extend(timezone);
 dayjs.tz.setDefault('Asia/Shanghai');
{% endhighlight %}

然后在RATING_DATE加入时区：这是上海时间。

{% highlight ruby %}
  dayjs(item.time).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm+08:00');
{% endhighlight %}


此处存疑的是前面setDefault之后，RATING_DATE这行代码还需不需要加tz()。后面没加+08的话，时间值是对的，但是显示时区还是UTC（- - ~~doesn't make sense~~）

最后结果是：

![screenshot](/assets/images/posts/220528/03.png)

ギリギリ完成了。

明天再写tags的导入。

...

鸽子h


注释：

[^1]:[ISO-8601相关规则](https://www.ionos.com/digitalguide/websites/web-development/iso-8601/)
[^2]:[dayjs.timezone](https://day.js.org/docs/zh-CN/timezone/timezone)
