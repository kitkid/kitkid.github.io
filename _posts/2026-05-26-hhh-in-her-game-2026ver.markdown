---
layout: post
title:  "游戏h的小结 2026Ver."
tags: play game
lang: zh-Hans
toc: true
driveId1: 1CyD5qh-bEqrbBSxKYrRZaNwtUq2_3Klo/preview
driveId2: 1a0I_NtIraSiIHPHPuss58s6rZ1vcnMfx/preview
driveId3: 128Zjawa2aVMpVexbrzopHd0ybNjREgA2/preview
show_on_homepage: true
---
><font size=2>总结一下2025-2026年参与制作的项目
><font size=2>仅面试申请用

## 本篇定位

我是偏互动体验与叙事系统方向的游戏策划，关注“玩家行为如何影响角色、环境与故事”。

我的项目大多围绕一个核心问题展开：

**如何让游戏世界不只是展示内容，而是能对玩家行为产生反馈？**

我曾参与TPS射击项目（已上线）的系统策划，也参与过AI叙事Demo与个人原型开发。我的兴趣集中在将系统规则、叙事语境、交互反馈连接起来，设计有沉浸感、有反馈、有生活感的互动体验。

## 项目一：AI叙事游戏

> 如何让AI叙事从“对话”变成“可互动的生活空间”？

项目： 《The Nightcap》


`AI叙事` / `开放世界` / `酒吧经营` / `互动反馈`

**负责内容**

负责叙事体验与城市探索交互设计，重点解决“AI对话容易停留在聊天框”的问题。通过环境交互、NPC反馈和行为记录，让玩家行为进入游戏世界，形成“玩家行动 → 世界状态 → NPC回应 → 叙事推进”的反馈循环，并加深沉浸感。

**设计问题**

AI叙事项目容易停留在“玩家和NPC聊天”的层面。如果场景只是背景、NPC只回应文本输入，玩家会缺少“我在这个世界中行动”的感觉。因此，本项目重点尝试将玩家的环境操作、探索行为和NPC反馈连接起来，让AI对话成为游戏世界反馈的一部分。

**核心设计**

1. 环境交互：设计酒吧与城市中的可交互对象，让玩家在对话之外也能主动探索空间。
2. 行为记录：将玩家操作转化为系统可识别的事件，例如触发物件、靠近区域、完成探索等。
3. NPC反馈：让NPC基于玩家行为产生回应，使对话不再孤立，而是与世界状态和玩家行动相关。

**设计逻辑**

```mermaid
flowchart LR
    A[玩家行为] --> B[世界状态变化]
    B --> C[NPC回应]
    C --> D[叙事推进]
```

**反思**

这个项目再次验证AI叙事的重点是让AI在明确的规则和状态边界中回应玩家，并保持一致性。后续如果继续优化，我会优先建立更稳定的行为标签和状态机，例如玩家与NPC的熟悉度、触发过的事件、场景状态变化等，再让AI基于这些状态生成更可控的反馈。


**官方宣传视频**

{% include videoplayer.html id=page.driveId1 %}

## 项目二：可玩Demo

> 如何用轻量谜题建立荒诞但自洽的游戏体验？

项目介绍：《面包狗会梦到电烤箱吗？》，轻度解谜游戏，Gamejam 三人小队产物

负责内容：主要负责玩法设计、开发、配置

实机视频：

{% include videoplayer.html id=page.driveId2 %}

Taptap上可下载demo体验。[^1]

## 项目三：AI Demo

> 如何让“专注行为”从工具记录，变成角色可感知、可反馈、可积累的互动事件？

项目介绍：《IdleIdol》，结合桌宠+专注工具的AVG游戏

负责内容：独自一周内利用AI工具（Tripo，Codex，Gemini）设计并完成Demo

实机视频：

{% include videoplayer.html id=page.driveId3 %}

## 小结
本人：保持好奇，保持对新事物的探究；保持对细节和体验的敏感；学习和实践沉浸式体验设计。

<!---
接下来，希望能参与制作更多好玩的内容，设计传达更多独特的体验。
--->
...

hhh（it's my initials)

注释：

[^1]:[《面包狗会梦到电烤箱吗？》Taptap页](https://www.taptap.cn/app/780535?utm_medium=&utm_source=copy&share_id=&os=pc)

[2025年前项目的总结](https://kitkid.github.io/2024/09/22/hhh-in-her-game-short.html)


