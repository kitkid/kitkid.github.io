---
layout: post
title:  "游戏h的小结 2024ConVer."
tags: play game
lang: zh-Hans
toc: true
driveId1: 1ASeMFEwGHwECxtiOhGxdXyHtSXiDl2ZE/preview
driveId2: 1eAiGAYSG14aAv7UL5F8Ex1sTVha1qG72/preview
show_on_homepage: true
---
><font size=2>总结一下和游戏相关的123

><font size=2>实例中的游戏截图均在项目已公开内容范围中

[PDF版本请看](/assets/pdf/Huahui_2024.pdf)


关键词

`好奇心`
`敏感`
`美`

## 工作
首先，关于工作项目的简单介绍：
- 游戏类型：3D、TPS
- 游玩平台：移动、PC
- 开发引擎：Unity
- 开发状态：在研，23年12月获得版号；持续小范围内测中，预计2024年末公测。[^1]

#### 1 系统向：模块设计

> 深入思考自身项目特点，撰写策划设计案，内容包括设计目标、模块内相关功能规则、程序实现框架

实例一：【图鉴】系统的诞生

  **背景**
  - 游戏可收集内容丰富
  - 【图鉴】可引导驱动玩家收集

  **任务**
  - 确定系统内的基础功能

  **行动**
  - 参考游戏：以同类（Warframe）为主、主流二次元手游（原神、深空之眼）
  - 结合项目特点，设定系统结构、界面原型

  **结果**

[![Sample0-0](/assets/images/posts/240922/Sample0-0.png){:.image-hover}](/assets/images/posts/240922/Sample0-0.png){: target="_blank" }

  例1：主菜单

![Sample0-1](/assets/images/posts/240922/Sample0-1.png)

  同：
  - 各分类单独入口
  - 首页展示收集进度

  异：
  - 增加玩家等级的展示

  例2：装备列表

![Sample0-2](/assets/images/posts/240922/Sample0-2.png)  

  同：
  - 搜索功能
  - 筛选功能

  异：
  - 详情页层级较Warframe减少一层

  体验反馈：
  - 段位展示建立长期目标，鼓励收集和探索
  - 界面层级减少，更便利，操作时间减少


更多小例：

增加剧情梗概功能：当玩家点击跳过对话的时候，展示当前剧情段落的梗概
- 项目剧情特点是长篇大论，前期为了尽快体验更多游戏内容，很多玩家都会想跳过；
- 但是多次跳过后，后期想看剧情时就很难接上了；
- 增加该功能后，想要跳过的玩家也能快速掌握剧情发展。

![Sample3](/assets/images/posts/240922/Sample3.png)


#### 2 交互向：UIUX
> 学习并理解其它游戏的设计，通过**Figma**设计界面交互原型，Unity内搭建预制体，和UI美术沟通产出高保真效果图，及最终配置

实例二：交互设计

  **背景**
  - 玩家间的交易系统【市场】反馈难用，需要优化更迭

  **任务**
  - 如何变好用

  **行动**

  进一步解析交互问题：
  - 入口不清晰、没拆分，所以玩家不理解哪里买、哪里卖
  - 商品列表因为下拉菜单叠加、滑动难
  - 商品列表页信息不直观，都在二级详情页

  决定针对性地改进了交互界面

  **结果**

  改造结果[^4]：

  [![Sample2-1](/assets/images/posts/240922/Sample2-1.png){:.image-hover}](/assets/images/posts/240922/Sample2-1.png){: target="_blank" }

  1. 整理首页标签栏，明确【买方】入口，归纳常用标签页
  2. 调整界面布局，将常用的【搜索】居中
  3. 加入单独的【筛选】功能，取消列表内的下拉菜单，避免滑动区域重叠
  4. 商品列表内加入订单数量信息
  5. 明确【卖方】入口

  体验反馈：
  - 功能模块更加直观和易用
  - 玩家负面反馈减少
  - 【交易】使用度提升


更多例子：

- 调整布局，强调升级的仪式和成就感

  [![Sample4](/assets/images/posts/240922/Sample4.png){:.image-hover}](/assets/images/posts/240922/Sample4.png){: target="_blank" }

- 调整元素，更美观精致；弱化UI存在，沉浸体验

  [![Sample5](/assets/images/posts/240922/Sample5.png){:.image-hover}](/assets/images/posts/240922/Sample5.png){: target="_blank" }


#### 3 剧情向：演出

> 剧情方面，负责剧情系统的功能设计、开发实现、实际配置及优化：利用电影专业知识，参与演出分镜设计，利用Inky和Timeline编辑器配置演出资源，利用Wwise调试音效音乐，产出流畅体验

实例三：剧情镜头

  **背景**
  - 玩家目标缺失
  - 新手关里有个解谜装置，玩家卡住概率很大

  **任务**
  - 如何改善体验

  **行动**

  解析问题：
  - 卡住的原因有找不到、不会解
  - 关卡引导线、介绍都有，但是还是有人找不到也不会解

  决定
  - 剧情增加演出形式：配合对话文本，用镜头引导

  **结果**
  - 提出功能需求，和程序实现通过Inky指令调用Timeline资源、呈现实时渲染的演出功能

  - 为解谜任务设计镜头特写，通过Timeline加入控制Virtual Camera的动画，最后在Inky配置演出段落出现的时机

{% include videoplayer.html id=page.driveId1 %}

  体验反馈：
  - 玩家更多注意到装置
  - 剧情表现更丰富

另个例子：

利用ChatGPT产出运镜功能原型，耗时半个工作日
- 借助AI提供的C#脚本，多次调试后，基本满足需求
- 为了更好的展示预期效果和给程序提供一些实现思路

{% include videoplayer.html id=page.driveId2 %}


## 玩家
这个部分就简单写一下游戏经历[^5]。

游戏喜好：射击、解谜、叙事

平台倾向：Switch > PC >= iOS > Xbox

时长最长：Apex Legends（800小时+）、动物森友会（300小时+）、塞尔达-旷野之息/Noita/Warframe（100小时+）

关于猛兽派对：
- 时长：PC 30小时+；
- 最爱地图：团体踢球、赛车；
- 上线频率最高：夏日通行证阶段，肝到30级左右。


## 小结
简单来说，在近三年的探索中，保持好奇，保持对细节和体验的敏感，并在成品中传达美和理解。

<!---
接下来，希望能参与制作更多好玩的内容，设计传达更多独特的体验。
--->
...

hhh（it's my initials)


注释：

[^1]:[不清楚能说项目名称吗？会被当成广告吗。](https://www.bilibili.com/video/BV1Er42187P8/?share_source=copy_web&vd_source=08129e78b458c450e14d6cf2c55ea84e)


[^4]:改造后
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/design/EY6UlzJWOJ4lQDxIuluCFY/Market?node-id=2177-2214&embed-host=share" allowfullscreen></iframe>

[^5]:[游戏经历](https://shimo.im/sheets/xtyqJdHt8dWYdRyt/E84d2/)
