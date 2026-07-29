# 设计文档 — 首页交互作品展示区（Playground）

**日期：** 2026-07-28
**分支：** `playground-interactive`（基于 `gh-pages`）
**状态：** 设计已确认，待实现

---

## 1. 目标与背景

在 `kitkid.github.io` 首页增加一个可交互作品展示区，点进去是作品卡片列表，
再点单张卡片进入对应的小游戏或视频页面。

这个站是求职作品集（About 页写明在找 2026 年游戏策划的工作），所以展示区放在
首页最上方——招聘方第一眼看到的应该是「能玩的东西」，而不是文章列表。

**基线分支是 `gh-pages`。** 这是 GitHub Pages 实际部署的分支；`main` 是只剩 8 篇文章
的旧副本，不要在那里改。本次所有改动落在从 `gh-pages` 切出的 `playground-interactive`
分支上，不直接改 `gh-pages`。

### 约束

- GitHub Pages 不允许自定义 Jekyll 插件，方案必须用原生功能实现。
- 不引入任何新的前端依赖。不用 GSAP、不用滚动库。
- 视觉必须**克制**。现有排版（Crimson Text + 宋体、680px 单栏、all-petite-caps
  导航、`#3c3c3c`）本身就是作品的一部分，突然塞一堆特效反而削弱它。全站目前唯一
  的动效是文章封面图 hover 时 3%→15% 的淡入。「可玩」这件事由 demo 本身承担，
  不需要靠页面特效来表达。
- 游戏 HTML 还没有。三个项目全部以占位状态交付，用户之后自己上传。

---

## 2. 结构与路由

三层结构：

```
/                             首页：INTERACTIVE 区（3 张卡）+ 22 篇文章列表
  │                                      └──────────────┐
  ↓ 点卡片                                              ↓ 点 and more →
/playground/<slug>/           详情页               /playground/
  游戏 iframe + 说明                                全部作品卡片列表
                                                        │
                                                        └─ 点卡片 → 详情页
```

实际产出的 5 个 URL：

| URL | 内容 |
|---|---|
| `/` | 展示区（3 张卡）+ 文章列表 |
| `/playground/` | 全部卡片列表 |
| `/playground/hide-and-seek/` | 找猫猫详情页 |
| `/playground/dress-up-clawd/` | 换装详情页 |
| `/playground/shoot/` | 射击详情页 |

### 导航栏

导航加一项 `Playground`，从 3 项变 4 项。对这种极简导航是可感知的重量增加，但值得：
招聘方可能从搜索直接落在某篇文章页上，那时导航是他唯一能发现「这儿有能玩的 demo」
的入口。不加的话列表页只能从首页那个 `and more →` 进——而那个按钮在只有 3 个项目时
是隐藏的（见 §5），等于没有入口。

**位置：`Posts / tags / Playground / About`。**

这里要说清楚机制，因为它决定了 Playground 只能插在 tags 后面。`_includes/site-nav.html`
用 `site.pages | sort: "position"` 排序，而现状是：

| 页面 | `position` |
|---|---|
| `posts.md` | 无 |
| `tags.md` | 无 |
| `about.md` | `100` |

没有 `position` 的页面排在有值的前面（线上顺序 Posts / tags / About 就是这么来的）。
所以给 `playground.md` 任何小于 100 的值，它都会落在两个无 `position` 的页面**之后**、
About 之前 —— 即 `Posts / tags / Playground / About`。用 `position: 50`。

想让它插在 Posts 和 tags 之间，必须给 `posts.md` 和 `tags.md` 也补上 `position`，那就
要多改两个现有文件。不值得为一个词的位置去动导航的现有配置，所以采用上面的顺序。

### 返回路径

详情页有两个出口：顶部站点标题 `Kits Blog` 链回首页（`header.html` 的现有行为），
游戏框下方加一个 `← Playground` 回列表页。不会让人困在游戏页里。

---

## 3. 数据模型

### 方案选择

采用 **Jekyll collection**，每个项目一个 `_playground/<slug>.md` 文件。

考虑过并否决的两个方案：

- **`_data/projects.yml` + 每项目 stub。** 最初的想法，但站不住：GitHub Pages 不允许
  自定义生成器插件，光有 yml 生不出详情页，必然还要每个项目一个 stub 文件。于是
  变成加一个项目要动两个文件，且两边 slug 不一致时会**静默**出错。collection 才是
  诚实的单一数据源。
- **卡片直接链到 `assets/games/*/index.html`。** 最省事，但游戏会全屏顶掉整个站：
  没有返回链接、没有站点导航、没有项目说明、`wip` 状态也没地方显示。对求职作品集
  来说，丢掉「解释你为什么做这个」的位置是很大的损失。

选 collection 的另一个理由：它和仓库现有惯例同构。`tags/*.md` 每个都是只有 front
matter 的 4 行 stub，共用一个 `layout: post-list`。这正是这里该走的路子。

### `_config.yml` 增加

```yaml
collections:
  playground:
    output: true
    permalink: /playground/:name/
```

这是唯一改动 config 的地方。

### 字段定义

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✓ | 卡片与详情页标题 |
| `kind` | ✓ | `game` / `video`。决定详情页用 iframe 还是视频 embed |
| `status` | ✓ | `wip` / `live`。`wip` → 卡片盖印施工中、详情页出占位屏而非空 iframe |
| `description` | ✓ | 卡片上那一句话 |
| `order` | ✓ | 手动排序，小的在前 |
| `featured` |  | `true` 才进首页候选 |
| `entry` | `live` 时必填 | 游戏 HTML 路径，如 `/assets/games/hide-and-seek/index.html` |
| `embed` | `video` 时必填 | 视频 embed URL |
| `thumb` |  | 卡片缩略图。缺省时出 CSS 占位块，不破版 |
| `ratio` |  | iframe 宽高比，默认 `16:9` |
| `controls` |  | 一行操作说明，如「方向键移动，空格跳」，显示在游戏框下方 |
| `desktop_only` |  | `true` 时框上方提示需要键盘。不自动猜，手动标 |
| `needs_storage` |  | `true` 时才给 iframe `allow-same-origin`（见 §6） |
| 正文 |  | 可选的设计自述，显示在游戏下方 |

**为什么用 `order` 而不是日期或文件名：** 作品集的顺序是策展决定，不是时间决定。
collection 默认按文件名字母序，那样 `dress-up-clawd` 会排到 `hide-and-seek` 前面，
而用户给的顺序是找猫猫第一。

### 三个初始项目

全部 `status: wip`、`featured: true`：

| slug | title | order |
|---|---|---|
| `hide-and-seek` | Hide and Seek 找猫猫 | 1 |
| `dress-up-clawd` | 给 Clawd 换装 | 2 |
| `shoot` | Shoot 跑跳射击 | 3 |

三个都是自己写的 HTML 小游戏。上线单个项目 = 把 HTML 放到
`assets/games/<slug>/index.html`，然后改两处：`status: wip` → `live`，填上 `entry`。

---

## 4. 页面与布局

| 路径 | 类型 | 作用 |
|---|---|---|
| `playground.md` | 新增 stub | 列表页，`permalink: /playground/`，`navbar: true` + `position: 50`（落在 tags 之后、About 之前，见 §2） |
| `_layouts/playground-list.html` | 新增 | 列表页布局：沿用 `site-nav` + `header`，下面一个卡片网格 |
| `_layouts/playground-item.html` | 新增 | 详情页布局：标题 / 游戏框 / 操作说明 / 正文自述 / 返回链接 |
| `_includes/playground-card.html` | 新增 | 单张卡片，首页和列表页共用同一份，参数化 `include.item` |
| `_includes/playground-featured.html` | 新增 | 首页展示区，含 3 张上限与 `and more` 逻辑 |
| `_layouts/post-list.html` | 改 | 仅当 `page.url == "/"` 时，在 `<ul class="post-list">` 之前插入展示区 |

改 `post-list.html` 而不是新写一个 home 布局：`_layouts/home.html` 现在只是
`layout: post-list` 的空壳，而「是否首页」的判断逻辑（`page.url == "/"`）已经在
`post-list.html` 里了。在同一处收口，不制造第二套分支。

`post-list.html` 里只多这 3 行：

```liquid
{% if page.url == "/" %}
  {% include playground-featured.html %}
{% endif %}
```

---

## 5. 首页展示区

### 固定 3 张

取 `featured: true` 中 `order` 最小的 3 个，标多了也只取 3。680px 单栏下每张约
200px 宽，正好是方形缩略图 + 一行标题。

首页那块的高度**永远不变**——以后加到 15 个游戏，首页也还是 3 张 + 一个入口。想换
展示哪 3 个，就在 front matter 里挪 `featured` 标记。

### `and more →`

放在三张卡下方**右对齐**。**没有第 4 个项目时自动隐藏。**

连带结果，需要明确记住：现在正好 3 个项目，**所以这个按钮当前不会出现**，列表页只
能从导航栏 `Playground` 进。这是预期行为，不是 bug。等放上第 4 个项目，按钮自己就
冒出来了。

### 明确否决：hover 自动横向滚动

考虑过用横向滚动列表承接第 4 个及以后的项目，否决理由：

- 悬浮就自己动的横向列表，是这个站里最不克制的那种交互。用户没表达意图它就开始
  运动，而且滚动速度永远不合某个人的手感。
- 键盘不可达、触屏没有 hover、`prefers-reduced-motion` 下还得另写一套降级。为 3 个
  卡片引入这些成本不划算。
- 它没真正解决问题。横向列表能塞 20 个，但招聘方只会看前 2 个，剩下 18 个藏在一个
  需要「发现」的手势后面。

### `POSTS` 栏目标签

文章列表上方加一个 `POSTS` 标签，和 `INTERACTIVE` 对等。

只给上面那块加标签、下面裸着，会显得展示区是硬插进去的。加了之后首页变成两个对等
的栏目，结构才立得住。

**首页文章列表保持全部 22 篇**，不砍到最近 6 篇（用户明确拒绝了）。

---

## 6. 视觉与交互

沿用站上已有的手法，不新增动效语汇。

### 卡片 hover

缩略图上浮一层 `#3c3c3c` 薄底，透明度 `0` → `0.08`，`0.5s ease-out`。这跟文章列表
`.post-item-cover` 那个 3%→15% 是同一套路、同一条时间曲线，只是方向相反（文章是底
图变清晰，卡片是上面压暗一点）。标题同时 `#3c3c3c` → `#000`。

**不做**缩放、位移、阴影、边框变色。`.social-link` 的 `translateY(-0.25em)` 是全站唯
一的位移动效，留给页脚点睛，卡片这里不重复用。

`prefers-reduced-motion: reduce` 下 transition 时长归零——状态变化仍然发生，只是瞬间
完成。

### WIP 标记与占位

- **WIP 标记：** 左上角小黑块，`Press Start 2P` 6px 白字。这个像素字体全站只在
  `.cover-meta` 用过一次，正好是「游戏感」的既有出口，不算引入新东西。
- **缺 `thumb` 时：** `#f4f4f7` 灰块 + 居中 `NO IMG`（同样像素字体）。不留空白、不撑
  破网格。**三个项目现在都没有缩略图，所以这是当前的默认样子。**
- **`GAME` / `VIDEO` 标签：** 现在就加。三个全是 game 时它确实多余，但以后放视频就
  用得上，且不值得为此做二次改动。

### 点击区域与响应式

整张卡（图 + 标题 + 描述）是同一个 `<a>`，不是只有标题可点。

- `>680px`：三列
- `≤680px`：单列，缩略图从 1:1 变 16:9（竖屏下方卡太占高度）

### 详情页游戏框宽度

**破开 680px 栏宽，最宽 1100px。**

站上文章封面图本来就是全宽的，这个手法已有先例。守住 680px 能让版式绝对统一，但
射击游戏挤在 680px 里可能真不好玩，那内嵌就白做了。

---

## 7. iframe 承载与安全

```html
<iframe src="/assets/games/hide-and-seek/index.html"
        title="Hide and Seek 找猫猫"
        loading="lazy"
        sandbox="allow-scripts allow-pointer-lock"></iframe>
```

- **`allow-scripts` 给，`allow-same-origin` 不给。** 游戏因此拿不到主站的
  localStorage / cookie / DOM。用户自己写的游戏当然不会干坏事，但这个约束顺手就能
  加，代价只是**游戏存不了进度**——用户已确认三个小游戏都不需要存档。
  哪个项目真需要存档，就在 front matter 加 `needs_storage: true`，那一项才放开
  `allow-same-origin`。默认收紧、按需放开。
- **`allow-pointer-lock`** 给射击类可能要的鼠标锁定。
- **不给 `allow-top-navigation`** —— 游戏没法把整个页面跳走。
- **`loading="lazy"`** —— 游戏在视口外时不加载，首屏不被拖慢。
- **宽高比**由外层 `div` 的 `aspect-ratio` 框住，iframe 绝对定位撑满。不用 JS 算高度。
- **「新标签打开 ↗」链接始终存在**（指向游戏 HTML 本身），iframe 里玩不舒服时有出路。

### 降级路径

| 情况 | 表现 |
|---|---|
| `status: wip` | 不渲染 iframe，出 UNDER CONSTRUCTION 占位屏。不会有空白框或 404 |
| `status: live` 但 `entry` 忘填 | Liquid 判空，同样退回占位屏，并在构建产物里留一行 HTML 注释便于排查 |
| `desktop_only: true` 且窄屏 | 框上方一行提示「需要键盘，建议用电脑玩」。仍然渲染 iframe，不拦人 |
| 用户禁用 JS | 占位屏 + 新标签打开链接照常可见（纯 HTML/CSS） |

### 无障碍

- 卡片是真 `<a>`，键盘 Tab 可达、回车可进。不用 `div + onclick`。
- iframe 有 `title`，读屏器能念出这是什么。
- 缩略图 `alt` 用项目标题；纯装饰的占位灰块 `aria-hidden`。
- **焦点态不删 outline。** 现有 CSS 没动过 `:focus`，这次也不动。
- WIP 状态除了黑标，卡片描述里也带文字「施工中」——不靠颜色或图形单独传达信息。

---

## 8. 文件清单

### 新增（11 个）

```
_playground/hide-and-seek.md          三个项目定义，全部 status: wip
_playground/dress-up-clawd.md
_playground/shoot.md
playground.md                          列表页 stub，permalink: /playground/
_layouts/playground-list.html          列表页布局
_layouts/playground-item.html          详情页布局
_includes/playground-card.html         单张卡片，首页 / 列表页共用
_includes/playground-featured.html     首页展示区，含 3 张上限与 and more 逻辑
_sass/kagami/_playground.scss          全部新样式，独立文件
assets/games/.gitkeep                  用户放游戏 HTML 的地方
assets/images/playground/.gitkeep      用户放缩略图的地方
```

### 改动（4 个现有文件，约 10 行）

```
_config.yml                  加 collections.playground（4 行）
_sass/kagami.scss            @import 新的 _playground（1 行）
_layouts/post-list.html      首页插展示区（3 行）
_layouts/post-list.html      文章列表上方加 POSTS 栏目标签（2 行）
.gitignore                   加 .superpowers / vendor/bundle / .bundle / .sass-cache
```

**不碰**任何文章、不碰 `post.html`、不动现有 SCSS 里已有的规则。

---

## 9. 验证方式

1. `jekyll build` 必须**零报错、零警告**。基线已确认可用（1.6 秒，22 篇，导航三项）。
2. 核对产出：`/playground/` 存在、三个详情页存在且 URL 正确、首页展示区在文章列表
   **之前**、导航栏四项、`and more` 因为只有 3 个项目而**不出现**。
3. 起本地服务，浏览器逐页看过：首页、列表页、三个详情页，宽屏 + 窄屏各一遍。
4. 塞一个临时写的最小 HTML 游戏进 `assets/games/`，把其中一项改成 `live`，确认 iframe
   真的能加载和交互，**然后把这个临时游戏和改动撤掉**——交付时仍是三个 wip。这一步
   是为了证明 live 路径真的通，而不是等用户传游戏才发现是坏的。
5. 不动 `main` 分支。改动提交到 `playground-interactive`，不 push、不合并，除非用户
   明确同意。

### 明确不做（YAGNI）

标签筛选、搜索、分页、缩略图懒加载动画、游戏进度存档、评论、分享按钮。三个项目不
需要这些。

---

## 10. 交付后用户要做的事

1. 把游戏 HTML 放到 `assets/games/<slug>/index.html`。
2. 在对应的 `_playground/<slug>.md` 里把 `status: wip` 改成 `live`，填上 `entry`。
3. 可选：缩略图放 `assets/images/playground/`，填 `thumb`。不放也不会破版。

---

## 附录：环境与遗留问题

**本地构建**（Ruby 3.1.7 + Jekyll 3.9.5 已装在 `C:\Ruby31-x64`）：

```
JEKYLL_NO_BUNDLER_REQUIRE=true jekyll build
```

不要用 `bundle exec`。Gemfile 钉死 `wdm ~> 0.1.1`（2014 年的 Windows 目录监听库），
原生扩展在 Ruby 3.x 上编不过。`wdm` 只服务 `jekyll serve --watch` 的热重载，对构建产
物无影响，所以绕过 bundler 而不是改仓库的 Gemfile。

**视觉稿**（自包含 HTML，可直接用浏览器打开）：
`.superpowers/brainstorm/1035-1785204798/content/` —— `card-style-v2.html`（首页展示
区）、`list-page.html`、`detail-page.html`、`fallback-states.html`（四种降级态）、
`section-label.html`。同样的六个文件在 `861-1785132926/` 下也有一份。

**遗留安全问题（与本次无关，未处理）：** `_config.yml` 里 `gitalk.secret` 是明文提交的
GitHub OAuth app secret，且已在 git 历史里。唯一有效的修复是去 GitHub 重置那个 app 的
secret，改文件没用。本次不动它。
