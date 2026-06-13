// ============================================================
// Bilingual content for the homepage.
// Edit the placeholder publications / projects / posts / links
// below with your real content — copy can differ between zh and
// en, but keep the same shape so the layout stays identical.
// ============================================================

export type ThemeKey = 'A' | 'B';
export type LangKey = 'zh' | 'en';
/** Audience version, selected by URL path (/work, /school). */
export type Version = 'work' | 'school';

export interface EduItem {
  label: string;
  title: string;
  sub: string;
  /** CSS custom property, e.g. 'var(--pku)' */
  color: string;
}
export interface Inquiry {
  no: string;
  title: string;
  desc: string;
}
export interface Focus {
  label: string;
  title: string;
  sub: string;
}
export interface PubLink {
  label: string;
  href?: string;
}
export interface Publication {
  year: string;
  title: string;
  authors: string;
  venue: string;
  links: PubLink[];
}
export interface Project {
  name: string;
  desc: string;
}
export interface Post {
  date: string;
  title: string;
  excerpt: string;
  href?: string;
}
export interface ContactLink {
  label: string;
  value: string;
  href: string;
}
export interface NavLabels {
  home: string;
  about: string;
  pubs: string;
  projects: string;
  blog: string;
  contact: string;
}

export interface Content {
  nav: NavLabels;
  /** top-left wordmark: main name + italic accent word (logoAlt) */
  logoMain: string;
  logoAlt: string;
  heroLine1: string;
  heroLine2: string;
  heroIntro: string;
  eduStack: EduItem[];
  inqTitle: string;
  inqNote: string;
  inquiries: Inquiry[];
  /** RESEARCH FOCUS varies by audience version */
  focus: { work: Focus; school: Focus };
  pubTitle: string;
  pubNote: string;
  pubs: Publication[];
  projTitle: string;
  projects: Project[];
  blogTitle: string;
  posts: Post[];
  contactTitle: string;
  contactBody: string;
  links: ContactLink[];
  footer: string;
}

const zh: Content = {
  nav: { home: '首页', about: '探索', pubs: '论文', projects: '项目', blog: '随笔', contact: '联系' },
  logoMain: '区睿哲',
  logoAlt: '- Ruizhe',
  heroLine1: '区睿哲 — Ruizhe',
  heroLine2: '',
  heroIntro:
    '\"We\'re all boys before tonight\"， 怀着炙热而明亮的心，探索无限可能。',
  eduStack: [
    {
      label: '博士',
      title: '北京大学',
      sub: '遥感科学与技术· 2026 - 至今',
      color: 'var(--pku)',
    },
    {
      label: '硕士',
      title: '北京邮电大学',
      sub: '人工智能 · 导师 张闯 · 2023 - 2026',
      color: 'var(--accent)',
    },
    {
      label: '本科',
      title: '北京邮电大学 x Queen Mary University of London',
      sub: '优秀毕业生 一等学位 · 2019 - 2023',
      color: 'var(--bupt)',
    },
  ],
  inqTitle: 'Inquiries',
  inqNote: '我正在探索的方向',
  inquiries: [
    { no: '01', title: '遥感基础模型', desc: '能否让大模型真正「读懂」地球观测数据？' },
    { no: '02', title: '物理引导的学习', desc: '把物理先验嵌入网络，换取可解释与外推能力。' },
    { no: '03', title: '多源传感融合', desc: '光学、雷达、时序——如何对齐与互补。' },
    { no: '04', title: '从像素到决策', desc: '让模型输出成为科学与治理可用的结论。' },
  ],
  focus: {
    school: {
      label: '研究方向',
      title: 'AI for Science · 城市视觉智能',
      sub: '人工智能不仅是技术更是工具， 是我们去探索世界的工具，Look Deeply with AI',
    },
    // 占位 — 替换为工作向（面向 HR）的内容
    work: {
      label: '工作方向',
      title: 'AI for Science · 城市视觉智能',
      sub: '人工智能不仅是技术更是工具， 是我们去探索世界的工具，Look Deeply with AI',
    },
  },
  pubTitle: '论文发表',
  pubNote: '占位内容 — 替换为你的真实论文',
  pubs: [
    {
      year: '2025',
      title: 'GeoPix: A Multimodal Large Language Model for Pixel-level Image Understanding in Remote Sensing',
      authors: 'Ruizhe Ou, Yuan Hu, Fang Zhang, Jiaxin Chen, Yu Liu',
      venue: 'IEEE Geoscience and Remote Sensing Magazine, pp. 2–16',
      links: [
        { label: 'PDF', href: 'https://ieeexplore.ieee.org/document/10994415' },
        { label: 'CODE',  href: 'https://github.com/Norman-Ou/GeoPix' },
      ],
    },
    {
      year: '2025',
      title: '示例论文标题：面向无线通信的轻量神经网络',
      authors: 'R. Ou, C. Coauthor',
      venue: 'IEEE TWC（占位）',
      links: [{ label: 'PDF' }, { label: 'CODE' }],
    },
    {
      year: '2024',
      title: '示例论文标题：联合培养背景下的系统研究综述',
      authors: 'R. Ou, D. Coauthor',
      venue: 'Workshop（占位）',
      links: [{ label: 'PDF' }],
    },
  ],
  projTitle: '项目',
  projects: [
    { name: '项目一', desc: '一句话描述项目目标、方法与你承担的角色，替换为真实内容。' },
    { name: '项目二', desc: '一句话描述项目目标、方法与你承担的角色，替换为真实内容。' },
    { name: '项目三', desc: '一句话描述项目目标、方法与你承担的角色，替换为真实内容。' },
    { name: '项目四', desc: '一句话描述项目目标、方法与你承担的角色，替换为真实内容。' },
    { name: '项目五', desc: '一句话描述项目目标、方法与你承担的角色，替换为真实内容。' },
    { name: '项目六', desc: '一句话描述项目目标、方法与你承担的角色，替换为真实内容。' },
  ],
  blogTitle: '随笔',
  posts: [
    { date: '2026.05', title: '文章标题占位', excerpt: '一句话摘要，介绍这篇随笔的主题与要点。' },
    { date: '2026.02', title: '文章标题占位', excerpt: '一句话摘要，介绍这篇随笔的主题与要点。' },
    { date: '2025.11', title: '文章标题占位', excerpt: '一句话摘要，介绍这篇随笔的主题与要点。' },
  ],
  contactTitle: '联系',
  contactBody: '欢迎就研究合作、读博交流或任何有意思的想法与我联系。',
  links: [
    { label: 'Email', value: 'ruizhe@example.com', href: 'mailto:ruizhe@example.com' },
    { label: 'Google Scholar', value: 'scholar.google.com/...', href: '#' },
    { label: 'GitHub', value: 'github.com/username', href: '#' },
  ],
  footer: '区睿哲 · OU RUIZHE · 2026',
};

const en: Content = {
  nav: { home: 'Home', about: 'Inquiries', pubs: 'Publications', projects: 'Projects', blog: 'Blog', contact: 'Contact' },
  logoMain: 'OU Ruizhe',
  logoAlt: '- Richie',
  heroLine1: 'OU Ruizhe - Richie',
  heroLine2: '',
  heroIntro:
    "\"We're all boys before tonight\". Be creative, optimistic, and passionate.",
  eduStack: [
    {
      label: 'PhD',
      title: 'Peking University',
      sub: 'Remote Sensing Science and Technology · Fall 2026',
      color: 'var(--pku)',
    },
    {
      label: 'MEng',
      title: 'Beijing University of Posts and Telecommunications',
      sub: 'Artificial Intelligence · Advisor Prof. Zhang Chuang · 2023-2026',
      color: 'var(--accent)',
    },
    {
      label: 'BEng',
      title: 'BUPT x Queen Mary University of London',
      sub: 'Telecom Engineering with Management · First Class Honours · 2019-2023',
      color: 'var(--bupt)',
    },
  ],
  inqTitle: 'Inquiries',
  inqNote: 'What I am currently exploring',
  inquiries: [
    { no: '01', title: 'Foundation models for Earth', desc: 'Can large models truly read Earth-observation data?' },
    { no: '02', title: 'Physics-guided learning', desc: 'Embedding physical priors for interpretability and extrapolation.' },
    { no: '03', title: 'Multimodal sensor fusion', desc: 'Aligning optical, radar and temporal signals.' },
    { no: '04', title: 'From pixels to decisions', desc: 'Turning model outputs into usable science and policy.' },
  ],
  focus: {
    school: {
      label: 'RESEARCH FOCUS',
      title: 'AI for Science · Urban Sensing',
      sub: "AI has become a tool for discovery. I'm drawn to how AI can help us explore the world.",
    },
    // 占位 — 替换为工作向（面向 HR）的内容
    work: {
      label: 'FOCUS',
      title: 'AI for Science · Urban Sensing',
      sub: "AI has become a tool for discovery. I'm drawn to how AI can help us explore the world.",
    },
  },
  pubTitle: 'Publications',
  pubNote: 'PLACEHOLDER — replace with your real papers',
  pubs: [
    {
      year: '2025',
      title: 'GeoPix: A multimodal large language model for pixel-level image understanding in remote sensing',
      authors: 'R. Ou, Y. Hu, F. Zhang, J. Chen, Y. Liu',
      venue: 'IEEE Geoscience and Remote Sensing Magazine, pp. 2–16',
      links: [
        { label: 'arXiv', href: 'https://arxiv.org/pdf/2501.06828' },
        { label: 'IEEE', href: 'https://ieeexplore.ieee.org/document/10994415' },
        { label: 'Code', href: 'https://github.com/Norman-Ou/GeoPix' },
      ],
    },
    {
      year: '2025',
      title: 'Sample title: Lightweight neural networks for wireless communication',
      authors: 'R. Ou, C. Coauthor',
      venue: 'IEEE TWC (placeholder)',
      links: [{ label: 'PDF' }, { label: 'CODE' }],
    },
    {
      year: '2024',
      title: 'Sample title: A survey of systems in joint-programme research',
      authors: 'R. Ou, D. Coauthor',
      venue: 'Workshop (placeholder)',
      links: [{ label: 'PDF' }],
    },
  ],
  projTitle: 'Projects',
  projects: [
    { name: 'Project One', desc: 'One line on the goal, approach and your role. Replace with real content.' },
    { name: 'Project Two', desc: 'One line on the goal, approach and your role. Replace with real content.' },
    { name: 'Project Three', desc: 'One line on the goal, approach and your role. Replace with real content.' },
    { name: 'Project Four', desc: 'One line on the goal, approach and your role. Replace with real content.' },
    { name: 'Project Five', desc: 'One line on the goal, approach and your role. Replace with real content.' },
    { name: 'Project Six', desc: 'One line on the goal, approach and your role. Replace with real content.' },
  ],
  blogTitle: 'Blog',
  posts: [
    { date: '2026.05', title: 'Post title placeholder', excerpt: 'One-line summary introducing the topic and key points.' },
    { date: '2026.02', title: 'Post title placeholder', excerpt: 'One-line summary introducing the topic and key points.' },
    { date: '2025.11', title: 'Post title placeholder', excerpt: 'One-line summary introducing the topic and key points.' },
  ],
  contactTitle: 'Contact',
  contactBody: 'Reach out about research collaboration, PhD topics, or any interesting idea.',
  links: [
    { label: 'Email', value: 'ruizhe@example.com', href: 'mailto:ruizhe@example.com' },
    { label: 'Google Scholar', value: 'scholar.google.com/...', href: '#' },
    { label: 'GitHub', value: 'github.com/username', href: '#' },
  ],
  footer: 'OU RUIZHE · 区睿哲 · 2026',
};

export const CONTENT: Record<LangKey, Content> = { zh, en };
