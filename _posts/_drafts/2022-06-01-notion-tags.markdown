---
layout: post
title:  "Notion/tags笔记"
tags: play
lang: zh-Hans
---
><font size=2>教师节故事素材？

> 又名关于某些人对观影记录的过度重视

在[Notion一战](/2022/05/22/notion-noday.html)中，提到的目标还剩下：
1. 导入自定义的标签
2. 导入电影信息-制片国家/地区

此篇为解放大脑的最后一战！首先写导入标签。

### 思路
数据处理依次是：
1. 从rss feed里分离出来有用的feeddata
2. 接着处理成itemData，准备加入notion
3. 最后addtoNotion

依旧懒人关键词，观察RSS中的观影记录标签：

`<p>标签: 电影 动画</p>`

判断是和备注类似的思路：先定位到`标签：`，提取后面有用的信息。

所以第一层加上了：
{% highlight ruby %}
  let tags = contents.filter(el => el.textContent.startsWith('标签'));
  if (tags.length) {
    tags = tags[0].textContent.replace(/^标签: /, '').trim();
  }
{% endhighlight %}

后面也加上。

恶战开始。

### 过程
**阶段一，util-is-utility**
坑A：在sync-rss里做改动后，没有在util增加标签目的地的相应字段。

标点遗忘星人大危机：空格和逗号！
{:.side-note}

知道需要目的地，但是猪子迷路了- -之前去update-to-notion里添加了，后来发现：干的不是一件事哦。
在[util.js]()加上列的名称： `TAGS: '标签',`，以及该列数据的属性：`TAGS: 'multi_select',`

**阶段二，valuetype-is-valuable**
坑B：关于multi-select的数据类型其实是数组。

情况：首先原作对multi-select做了分类，那是不是直接在rating后面加上tags的条件就好了？
{% highlight ruby %}
  case 'multi_select':
  +  res = key === DB_PROPERTIES.RATING ? {
  -  res = (key === DB_PROPERTIES.RATING)||(key === DB_PROPERTIES.TAGS) ? {
      'multi_select': value ? [
        {
          name: value.toString(),
        },
      ] : [],
    } : {
      'multi_select': (value || []).map(g => ({
        name: g, // @Q: if the option is not created before, can not use it directly here?
      })),
    };
    break;
{% endhighlight %}

![screenshot](/assets/images/posts/220530/02.png)
{:.side-note}

结果：当观影记录里出现两个以上的标签时，导入时也会被记成一个。

然后我回忆了豆坟csv导入的数据样式，是：`a,b,c`，一拍脑袋：

{% highlight ruby %}
  let tags = contents.filter(el => el.textContent.startsWith('标签'));
  if (tags.length) {
  -  tags = tags[0].textContent.replace(/^标签: /, '').trim();
  +  tags = tags[0].textContent.replace(/^标签: /, '').trim().replace(/ /, ',').;
    console.log(tags);
  }
{% endhighlight %}

报错：
> TypeError: (value || []).map is not a function

显然哪里不对。

开始翻阅Notion 文档，找到：
![screenshot](/assets/images/posts/220530/03.png)

是数组：`"a","b","c"`

**阶段三，undefined-ones-need-to-be-defined**
怎么改呢？抄板书：

{% highlight ruby %}
  let tags = contents.filter(el => el.textContent.startsWith('标签'));
  let tags_options = [];
  if (tags.length) {
    tags = tags[0].textContent.replace(/^标签: /, '').trim();
    tags_options = tags.split(' ');
    console.log(tags_options);
  }
{% endhighlight %}

以及：
{% highlight ruby %}
  const result = {
    id,
    link: item.link,
    rating: typeof rating === 'number' ? rating : null,
    comment: typeof comment === 'string' ? comment : null, // 备注：XXX -> 短评
    tags: tags_options.length > 0 ? tags_options : null, // 标签：XXX -> 标签
    time: item.isoDate, // '2021-05-30T06:49:34.000Z'
  };
{% endhighlight %}

- 首先**定义**子数组
- 将拆出来的标签字符本体按' '拆分成子数组
- 然后正常

感谢徐老师！


### 课后练习

虽然不同类型，但就强行算是练习题吧：自动导入制片国家。
首先，这个信息来自电影的豆瓣页面"movie item page"
![screenshot](/assets/images/posts/220530/04.png)

找同类，决定和imdbInfo差不多的处理方式：

首先，sync-rss：

{% highlight ruby %}
  const countryInfo = [...dom.window.document.querySelectorAll('#info span.pl')].filter(i => i.textContent.startsWith('制片国家/地区:'));
  if (countryInfo.length) {
    itemData[DB_PROPERTIES.COUNTRYINFO] = countryInfo[0].nextSibling.textContent.trim();
    }
{% endhighlight %}

接着，util：

加上列名和类型：是简单的rich_text

就行了。

![screenshot](/assets/images/posts/220530/01.png)

Notion作战结束！

...

游戏随记仍然咕咕的鸽子h


注释：

[^1]:
