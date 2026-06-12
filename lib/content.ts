// ============================================================
// Bilingual content for the homepage.
// Edit the placeholder publications / projects / posts / links
// below with your real content — copy can differ between zh and
// en, but keep the same shape so the layout stays identical.
// ============================================================

export type ThemeKey = 'A' | 'B';
export type LangKey = 'zh' | 'en';

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
  tags: string[];
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
  /** theme toggle labels: tA = Deep, tB = Tide */
  tA: string;
  tB: string;
  skills: string[];
  nav: NavLabels;
  photoLabel: string;
  photoSub: string;
  heroLine1: string;
  heroLine2: string;
  heroIntro: string;
  eduStack: EduItem[];
  inqTitle: string;
  inqNote: string;
  inquiries: Inquiry[];
  focus: Focus;
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
  tA: '深流',
  tB: '潮线',
  skills: ['AI for Science', '机器学习', '遥感', '地球观测'],
  nav: { home: '首页', about: '探索', pubs: '论文', projects: '项目', blog: '随笔', contact: '联系' },
  photoLabel: '拖入你的照片',
  photoSub: '或 点击浏览',
  heroLine1: '区睿哲 —',
  heroLine2: '也可以叫我 Richie。',
  heroIntro:
    '我研究面向科学的人工智能（AI for Science）——把机器学习带进遥感与地球观测，探索 AI 能否帮我们看得更清楚。',
  eduStack: [
    {
      label: '现在',
      title: '博士 · 遥感科学与技术',
      sub: '北京大学 · 2026 秋入学 —— 研究 AI for Science。',
      color: 'var(--pku)',
    },
    {
      label: '硕士',
      title: '人工智能 · 硕士',
      sub: 'MSc Artificial Intelligence · 2023 – 2026',
      color: 'var(--accent)',
    },
    {
      label: '本科',
      title: '电信工程与管理 · 工学学士',
      sub: '北京邮电大学 × 伦敦玛丽女王大学 · 联合培养 · 2019 – 2023',
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
    label: '研究方向',
    title: 'AI for Science · 遥感',
    sub: '用机器学习读懂地球观测数据，为科学与治理问题寻找新的解法。',
  },
  pubTitle: '论文发表',
  pubNote: '占位内容 — 替换为你的真实论文',
  pubs: [
    {
      year: '2026',
      title: '示例论文标题：一种用于多模态感知的高效方法',
      authors: 'R. Ou, A. Collaborator, B. Advisor',
      venue: 'NeurIPS 2026（占位）',
      links: [{ label: 'PDF' }, { label: 'CODE' }, { label: 'BIBTEX' }],
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
    { name: '项目一', desc: '一句话描述项目目标、方法与你承担的角色，替换为真实内容。', tags: ['Python', 'PyTorch'] },
    { name: '项目二', desc: '一句话描述项目目标、方法与你承担的角色，替换为真实内容。', tags: ['CUDA', 'C++'] },
    { name: '项目三', desc: '一句话描述项目目标、方法与你承担的角色，替换为真实内容。', tags: ['React', 'D3'] },
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
  tA: 'Deep',
  tB: 'Tide',
  skills: ['AI for Science', 'Machine Learning', 'Remote Sensing', 'Earth Observation'],
  nav: { home: 'Home', about: 'Inquiries', pubs: 'Publications', projects: 'Projects', blog: 'Blog', contact: 'Contact' },
  photoLabel: 'Drop your photo',
  photoSub: 'or browse files',
  heroLine1: 'OU Ruizhe —',
  heroLine2: 'just call me Richie.',
  heroIntro:
    'I work on AI for science — bringing machine learning to remote sensing and Earth observation, exploring whether AI can help us see more clearly.',
  eduStack: [
    {
      label: 'NOW',
      title: 'PhD · Remote Sensing Sci. & Tech.',
      sub: 'Peking University · Fall 2026 — working on AI for science.',
      color: 'var(--pku)',
    },
    {
      label: 'MASTER',
      title: 'MSc · Artificial Intelligence',
      sub: 'Master of Science · 2023 – 2026',
      color: 'var(--accent)',
    },
    {
      label: 'UNDERGRAD',
      title: 'BEng · Telecom Eng. with Management',
      sub: 'BUPT × Queen Mary University of London · 2019 – 2023',
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
    label: 'RESEARCH FOCUS',
    title: 'AI for Science · Remote Sensing',
    sub: 'Using machine learning to read Earth-observation data and find new approaches to scientific and policy questions.',
  },
  pubTitle: 'Publications',
  pubNote: 'PLACEHOLDER — replace with your real papers',
  pubs: [
    {
      year: '2026',
      title: 'Sample title: An efficient method for multimodal sensing',
      authors: 'R. Ou, A. Collaborator, B. Advisor',
      venue: 'NeurIPS 2026 (placeholder)',
      links: [{ label: 'PDF' }, { label: 'CODE' }, { label: 'BIBTEX' }],
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
    { name: 'Project One', desc: 'One line on the goal, approach and your role. Replace with real content.', tags: ['Python', 'PyTorch'] },
    { name: 'Project Two', desc: 'One line on the goal, approach and your role. Replace with real content.', tags: ['CUDA', 'C++'] },
    { name: 'Project Three', desc: 'One line on the goal, approach and your role. Replace with real content.', tags: ['React', 'D3'] },
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
