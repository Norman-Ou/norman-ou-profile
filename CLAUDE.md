# CLAUDE.md

个人主页（区睿哲 / OU Ruizhe）。给 AI 助手的工作指南——读这份就够，通常**不需要再 explore 整个代码库**。

## 回复约定
- 始终用**简体中文**回复（用户全局偏好）。

## 技术栈 & 命令
- Next.js (App Router) 14.2 · React 18 · TypeScript · **纯原生 CSS（无 Tailwind、无 CSS Modules）**。
- 部署：Vercel（前置 Cloudflare 做 DNS/CDN）。纯前端，无服务端数据。
- `npm run dev` → http://localhost:3000 ｜ `npm run build` ｜ `npm run lint` ｜ 类型检查 `npx tsc --noEmit`

## 文件地图（几乎所有逻辑都在这几个文件）
- `components/Home.tsx` —— 整个单页 UI（client component）：Hero + 5 个 `.scene` 板块 + 顶栏 + 右侧圆点导航 + 主题/语言切换 + 照片上传。**绝大多数改动在这里。**
- `app/globals.css` —— **所有样式**，约 450 行，用 CSS 变量做主题。改样式只动这里。
- `lib/content.ts` —— **所有中英文案与列表**，导出 `CONTENT = { zh, en }`。改文字只动这里，别在组件里硬编码文案。
- `lib/sceneArt.ts` —— 各板块的装饰性 SVG 背景（小王子场景），导出 `SCENE_ART`，经 `dangerouslySetInnerHTML` 注入。
- `app/page.tsx` 渲染 `<Home/>`；`app/layout.tsx` 站点元信息 + 字体（`<link>` 引入）。
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

## 主题 / 语言 / 布局
- 主题：`.root` 上的 `data-theme="A"|"B"`，A=深流(钢蓝)、B=潮线(冷瓷白)。**默认 B (Tide)**。调色在 globals.css 的 `.root[data-theme=...]` 变量。
- 语言：`lang` = `'en'|'zh'`，**默认 'en'**。
- 持久化（localStorage）：`hp-theme` / `hp-lang` / `hp-photo`（上传的照片压成 WebP 存本地，不上服务器）。默认值仅在本地无记录时生效——本机调试若看不到默认 EN/Tide，多半是 localStorage 里存了旧值。
- 内容列宽：顶栏 `.header-inner`、Hero `.hero-inner`、板块 `.scene-inner` 统一 `width: 80%; max-width: 1600px` + 侧边 padding `clamp(18px,4vw,40px)`，三者左右对齐。移动端（≤768px）→ `width: 100%`。
- `.scene` 内容**顶部对齐**（`align-items: flex-start`），装饰（小王子+玫瑰）在底部 padding 带里。

## 约定
- 文案改 `lib/content.ts`；**zh 与 en 的 `Content` 结构必须保持一致**（字段一一对应）。
- 样式改 `app/globals.css`（原生 CSS + CSS 变量）。
- `prefers-reduced-motion` 已统一关闭动画与吸附，新增动画时沿用该 media query。
