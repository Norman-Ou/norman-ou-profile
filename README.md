# 区睿哲 · OU Ruizhe — 个人主页

热带海洋风格的学术 / 作品集个人主页，三校（北邮 / QMUL / 北大）配色。基于 **Next.js (App Router) + TypeScript**，部署到 **Vercel**，前置 **Cloudflare** 做 DNS / CDN。

## 特性

- **双主题**：`潮线 Tide`（冷瓷白，默认）/ `深流 Deep`（钢蓝），右上角切换
- **中英双语**：`中 / EN`，文案可不同、排版一致
- **整页吸附**：每个板块占满一屏，温和 scroll-snap（也能自由滑动），顶栏固定
- **右侧圆点导航**：6 个圆点对应各板块，滚动高亮当前所在、点击跳转
- **黄昏 / 月色氛围**：Hero 顶部暖阳/冷月光晕 + 海平线 + 波浪（Tide 暖、Deep 冷）
- **照片占位框**：点击或拖拽上传，自动压缩为 WebP 存入 `localStorage`（不会上传到服务器）
- 主题 / 语言 / 照片选择记忆在浏览器本地
- 响应式布局、`prefers-reduced-motion` 友好（关闭动画与吸附）

## 本地开发

```bash
npm install
npm run dev      # http://localhost:3000
```

构建与本地预览生产版本：

```bash
npm run build
npm run start
```

## 修改内容

所有文案与列表集中在 **`lib/content.ts`**（`zh` / `en` 两份）。替换其中的占位论文、项目、随笔、联系方式即可——保持字段结构不变，版式会自动一致。

- 配色 / 主题变量：`app/globals.css` 中的 `.root[data-theme="A"]`（深流·钢蓝）与 `.root[data-theme="B"]`（潮线·冷瓷白）
- 页面结构与交互：`components/Home.tsx`
- 站点元信息 / 字体：`app/layout.tsx`

> 想把某张照片作为默认头像（而非每次拖拽），可在 `Home.tsx` 中给 `photo` 设初始值，或放一张图到 `public/` 并在 `.photo-slot` 上设 `backgroundImage`。

## 部署到 Vercel

1. 把仓库推到 GitHub / GitLab。
2. 在 [vercel.com](https://vercel.com) 选 **New Project → Import**，Vercel 会自动识别 Next.js（无需额外配置）。
3. 部署后会得到 `*.vercel.app` 域名。

或用 CLI：

```bash
npm i -g vercel
vercel          # 预览部署
vercel --prod   # 生产部署
```

## 前置 Cloudflare（DNS + CDN）

把自定义域名（如 `ruizhe.dev`）放在 Cloudflare，回源到 Vercel：

1. 在 Vercel 项目 **Settings → Domains** 添加你的域名，Vercel 会给出一条 `CNAME`（通常指向 `cname.vercel-dns.com`）。
2. 在 Cloudflare **DNS** 里添加该 `CNAME` 记录（根域用 `@`，Cloudflare 支持 CNAME flattening）。
3. 代理状态（橙色云朵）：
   - 想用 Cloudflare 的 CDN/缓存：保持 **Proxied（橙色）**，SSL/TLS 模式设为 **Full (strict)**。
   - 想让 Vercel 直接处理（更简单、避免双层缓存与证书问题）：设为 **DNS only（灰色）**。
4. 在 Cloudflare **SSL/TLS → Edge Certificates** 确认证书已签发。

> Cloudflare 与 Vercel 都会做边缘缓存。若出现缓存不一致，可在 Cloudflare 加一条 Cache Rule 跳过 `/_next/data` 之类的动态路径，或直接用 **DNS only**。

### 备选：直接部署到 Cloudflare Pages

本项目是纯前端（无服务端数据），也可改为静态导出后托管在 Cloudflare Pages：

1. 在 `next.config.mjs` 加 `output: 'export'`。
2. 运行 `npm run build`，产物在 `out/`。
3. Cloudflare Pages 构建命令 `npm run build`，输出目录 `out`。

（默认仓库走 Vercel，不强制开启 `output: 'export'`，以便保留 Next.js 的服务端能力。）

## 设计来源

实现自 Claude Design 导出的设计稿 `个人主页.dc.html`：冷瓷白「潮线」为默认主题、钢蓝「深流」为深色，整页吸附 + 右侧圆点导航 + 黄昏/月色 Hero 氛围。

> 内容容器宽度沿用了你之前要求的「页面宽度 80%」（上限 1600px，手机端满宽）；设计稿原始宽度为 1200/920，若想完全照搬把 `app/globals.css` 里 `.header-inner / .hero-inner / .main` 的 `width: 80%; max-width: 1600px` 改回即可。
