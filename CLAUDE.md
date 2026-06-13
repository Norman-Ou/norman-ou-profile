# CLAUDE.md

个人主页（区睿哲 / OU Ruizhe）。给 AI 助手的工作指南——读这份就够，通常**不需要再 explore 整个代码库**。

## 回复约定
- 始终用**简体中文**回复（用户全局偏好）。

## 技术栈 & 命令
- Next.js (App Router) 14.2 · React 18 · TypeScript · **纯原生 CSS（无 Tailwind、无 CSS Modules）**。
- 部署：Vercel（前置 Cloudflare 做 DNS/CDN）。纯前端，无服务端数据。
- `npm run dev` → http://localhost:3000 ｜ `npm run build` ｜ `npm run lint` ｜ 类型检查 `npx tsc --noEmit`

## 文件地图（几乎所有逻辑都在这几个文件）
- `components/Home.tsx` —— 整个单页 UI（client component），接收 `version: 'work'|'school'` prop：开屏动画 + Hero + 5 个 `.scene` 板块 + 顶栏 + 右侧圆点导航 + 语言切换 + 固定头像。**绝大多数改动在这里。**
- `app/globals.css` —— **所有样式**，用 CSS 变量做主题。改样式只动这里。
- `lib/content.ts` —— **所有中英文案与列表**，导出 `CONTENT = { zh, en }`。改文字只动这里，别在组件里硬编码文案。
- `lib/sceneArt.ts` —— 各板块的装饰性 SVG 背景（小王子场景），导出 `SCENE_ART`，经 `dangerouslySetInnerHTML` 注入。
- 路由：`app/page.tsx`(=school 默认) / `app/work/page.tsx` / `app/school/page.tsx`，各自渲染 `<Home version=.../>`（静态预渲染 `/`、`/work`、`/school`）。`app/layout.tsx` 站点元信息 + 字体（Google `<link>` + 本地 `@font-face`）。
- `public/`：`work_avatar.jpg` / `school_avatar.jpg`（均 725×1024，~200KB）、`fonts/kaushan-script-latin.woff2`（自托管签名体）。
- `README.md` 是面向人的部署/使用文档（注：其「温和 snap / 未注明默认语言」的描述略旧，以本文件与代码为准）。

## 板块 & 整页吸附（关键架构 + 易错点）
- 板块顺序：`SECTION_IDS = ['top','inquiries','pubs','projects','blog','contact']`（Home.tsx 顶部）。`top` 是 Hero，其余是 `.scene`。
- 滚动的是 **window/document**（不是嵌套容器）。
- 整页吸附：`html { scroll-snap-type: y mandatory; scroll-padding-top: 58px }`，每个板块 `scroll-snap-align: start; scroll-snap-stop: always`。
- **板块高度 = `min-height: calc(100vh - 58px)`**：58px 是固定顶栏高度；吸附到顶时板块顶边在顶栏下方，用满高 100vh 会让底部多出 58px 掉到屏外、装不下一屏。
- **`.root` 必须用 `overflow-x: clip`，不能用 `hidden`**：`hidden` 会把 `overflow-y` 计算成 `auto`，使 `.root` 变成滚动容器、夺走吸附点，导致整页 snap 失效、停在两屏中间。（本会话踩过的坑，勿改回。）
- 改顶栏高度时，`scroll-padding-top` / `.root` 的 `padding-top` / `.scene` 的 `min-height: calc(...)` 这三处的 58px 要一起改。

## 当前所在板块高亮（active）
- Home.tsx 里一个 scroll 监听计算「中心最接近视口中心」的板块 → `active` state。
- `active` 同时驱动**右侧圆点导航**和**顶栏导航高亮**（CSS `.nav a.active`）。
- **滚动不改 URL**：active 逻辑只调 `setActive`，不碰 `location/history`。URL 的 `#hash` 只在**点击**顶栏/圆点（`<a href="#id">` 锚点）时由浏览器默认行为改变。

## 版本 / 受众（URL 路由）+ 主题 / 语言 / 布局
- **版本由 URL 路径决定（不是界面按钮）**：`/work`=工作版(给 HR)、`/school` 与裸 `/`=学校版(默认)。版本经 `version` prop 传入 `Home`，**渲染时即已知**(首屏无闪烁、无客户端 URL 解析)。
- 一个版本**同时决定三样**：**主题**(work→`A`深流 / school→`B`潮线)、**头像**(`HERO_PHOTO[version]`)、**RESEARCH FOCUS**(`c.focus[version]`；`focus` 在 content.ts 里按 `{ work, school }` 分，且各有 zh/en)。
- 主题 = `.root` 的 `data-theme="A"|"B"`(A 钢蓝 / B 冷瓷白)，**由 version 派生、无切换按钮**；调色在 globals.css 的 `.root[data-theme=...]` 变量。
- 语言：`lang`=`'en'|'zh'`，**默认 'en'**，顶栏 中/EN 可切换并记忆在 `localStorage['hp-lang']`（**唯一持久化项**）。语言与版本相互独立。
- 头像：每版本一张固定图(无上传)，相框 `.photo-frame` 锁定 `aspect-ratio: 725/1024`，`.photo-img` 用 `object-fit: cover`。
- 内容列宽：`.header-inner`/`.hero-inner`/`.scene-inner` 统一 `width:80%; max-width:1600px` + 侧 padding `clamp(18px,4vw,40px)`，三者左右对齐；移动端(≤768px)→100%。
- `.scene` 内容**顶部对齐**(`align-items: flex-start`)，装饰(小王子+玫瑰)在底部 padding 带里。

## 开屏动画
- 进站全屏 overlay `.intro`：签名体「Ruizhe」用 `clip-path` 从左到右"写"出 + 漂浮光晕，停留后淡出揭页。约 3.3s，**任意交互或超时跳过**，`prefers-reduced-motion` 不显示。
- 字体 **Kaushan Script 自托管**：`public/fonts/kaushan-script-latin.woff2` + globals.css `@font-face` + layout.tsx `<link rel=preload>`（不实时请求 Google）。其余正文字体仍走 Google `<link>`。

## 约定
- 文案改 `lib/content.ts`；**zh 与 en 的 `Content` 结构必须保持一致**（字段一一对应）。
- 样式改 `app/globals.css`（原生 CSS + CSS 变量）。
- `prefers-reduced-motion` 已统一关闭动画与吸附，新增动画时沿用该 media query。
