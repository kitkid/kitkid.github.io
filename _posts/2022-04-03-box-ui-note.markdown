---
layout: post
title:  "包里的UI"
tags: game ux
lang: zh-Hans
---
><font size=2>不会吧不会吧，上次写随记是3月吗？微弱辩解每周都有在敲键盘- -

>又名热门二次元手游的背包系统UI小合集。

叫法N：背包、仓库...
为什么射击类的背包案例展示占比最低：
~~因为和平精英被卸载？~~
射击类的背包设计（脑补了Tarkov）似乎是战局内的更重要：局内玩法有拾取、资源有内外循环。
{:.side-note}

正在参与的游戏项目（目前）标签是（跑跳）射击（TPS）、多角色、手游（移动端和其他平台上的UIUX，可以是明年的flag =p）。第一项任务是关于背包界面的交互，找了一些参考，在此简短写写，做个小合集。

找参考设定前的已知背景有：
- 游戏战斗内获得的东西不会带出（比如：Hades在房间内获得的技能如果要带出局外，或许是什么爱神技能书碎片1？- -）
- 战斗的时候也不会打开背包
- 背包内会展示mod、武器和材料（还有道具），mod、武器需要升级之类的下一步操作

已知问题有：
1. 背包里怎么展示物品（1.5 物品有无排序）
2. 点物品下一步会发生什么（2.5 物品详情在哪里、怎么展示）

### 合呵呵集

##### 背包入口

![screenshot](/assets/images/posts/220403/arksentry.png)<font size=2>明日方舟，塔防；圣光妹妹( ˊᵕˋ* )

![screenshot](/assets/images/posts/220403/psentry.png)<font size=2>战双，ACT

![screenshot](/assets/images/posts/220403/gsentry.png)<font size=2>原神，A开放世界

![screenshot](/assets/images/posts/220403/hottasentry.png)<font size=2>幻塔，开放世界；二级菜单

![screenshot](/assets/images/posts/220403/wsentry.png)<font size=2>王牌战士，唯一射击游戏，本来不想放但是还是觉得需要点射击元素- -；二级菜单

其实，主界面的排列组合还没开始具体的想，也不是这次的问题。不过还是先记入。按背包入口的层级来分，第一种是一级——明日、战双、原神；第二种是二级——幻塔、王牌战士。尽管还没思考为什么幻塔的背包做成二级，但是如果，展示页中被收进二级的按钮的重要性（优先级）相对低，按这个点来说，仓库在明日中的重要也要比战双和原神低（图标小、位置角落、排序最下）。

##### 背包界面

![screenshot](/assets/images/posts/220403/arks.png)<font size=2>明日方舟

![screenshot](/assets/images/posts/220403/ps.png)<font size=2>战双；截图的时候就...没怎么玩（狗子无语.gif）不过现在快速开荒了背包物有

![screenshot](/assets/images/posts/220403/gs.png)<font size=2>原神

![screenshot](/assets/images/posts/220403/hottas.png)<font size=2>幻塔

![screenshot](/assets/images/posts/220403/ws.png)<font size=2>王牌战士

进入背包后，（我）直观感到最简洁的是明日，接着王牌>战双>原神/>幻塔。明日：（返回+主界面）物品+4个标签，其中3个子标签；没有排序；没有其他功能。王牌和原神在进入背包后会自动选中列表内第一个物品，并显示该物品的详情。这个点接着下面的详情再继续吧。

##### 物品详情

![screenshot](/assets/images/posts/220403/arksinfo.png)
![screenshot](/assets/images/posts/220403/arksinfo1.png)
![screenshot](/assets/images/posts/220403/arksinfo2.png)<font size=2>明日方舟；点击物品弹出详情界面，可使用的物品会显示使用按钮；有可跳转的来源的物品会显示来源跳转按钮

![screenshot](/assets/images/posts/220403/psinfo1.png)
![screenshot](/assets/images/posts/220403/psinfo2.png)<font size=2>战双；点击武器等特殊物品会跳转独立界面，待下一步操作；一般材料则和明日方舟一样

![screenshot](/assets/images/posts/220403/gs.png)
![screenshot](/assets/images/posts/220403/gsinfo.png)<font size=2>原神；进入背包后，自动选中列表内第一个物品并显示详情和快捷操作；点击武器等特殊物品会跳转独立界面

![screenshot](/assets/images/posts/220403/hottasinfo.png)<font size=2>幻塔；好复杂(  ˙-˙ ; )不过注意到点击展示按钮后，有世界、频道的选择，这大概是和原神ARPG不同的侧重——MMO

![screenshot](/assets/images/posts/220403/ws.png)<font size=2>王牌战士=p

到这里，大概感受到了因为游戏类型不同，各自背包的定位不同。背包系统的大头是展示和使用，明日方舟和王牌是一类：没什么重要的（bushi），简简单单作展示，能用的加个使用键；重点还是战斗（明日：来源跳转至相应关卡），每次进游戏会不会打开背包都是个问题（应该会说概率低didididi）；总结：不用花太多心思（暴言）。

林克打开背包好像会被伤害吧，记忆模糊
以及所以幻塔为什么是二级呢，可能是玩法流程（我也不知道是什么），他们的背包也不会太常看？
{:.side-note}
动作类——战双、原神、幻塔——的大头更多是引导跳转：有了武器等属性多多、需要玩家交互多多
~~付费点多多~~
的东西，势必需要一个独立界面来展示（此处类比明日的干员，塔防武器——棋子）。于是，点击此类特殊物品会跳转界面，所展示的信息将更集中。回到详情展示的问题，和战双不同的是，原神在背包内会显示关键信息（以及快速装备等快捷键），当玩家再点详情时会进入（沉浸式）升级界面。这个设计或许和背包使用频度以及开放世界的设定有关：在探索的过程中，收获新物品时会想要知道是什么、怎么用；此时除了立刻上手或者吃来揣测变化，另种方式就是打开背包，快速获取关键信息。

### 小笑笑结

要素都得有，如何排列组合是关键。

或者说，如何在前人的基础中做出些优化是当下的关键。背包的地位决定了设计方向。没想好怎么优化，也不必强求？有的背包体验可能只是因为想和别人做的不同的才出生的（也可能我还没感受到设计意图）。

...

在知识的海洋里潜泳的卡比h
