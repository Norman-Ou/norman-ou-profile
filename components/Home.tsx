'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CONTENT, type LangKey, type ThemeKey } from '@/lib/content';

const THEME_KEY = 'hp-theme';
const LANG_KEY = 'hp-lang';
const PHOTO_KEY = 'hp-photo';
const MAX_DIM = 1200;

const SECTION_IDS = ['top', 'inquiries', 'pubs', 'projects', 'blog', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

/**
 * Re-encode a dropped image through a canvas so localStorage carries a small,
 * retina-sharp WebP instead of the raw multi-MB upload. Falls back to a plain
 * data URL where createImageBitmap / canvas encoding is unavailable.
 */
async function downscale(file: File, max = MAX_DIM): Promise<string> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bmp = await createImageBitmap(file);
      const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
      const w = Math.max(1, Math.round(bmp.width * scale));
      const h = Math.max(1, Math.round(bmp.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(bmp, 0, 0, w, h);
        bmp.close?.();
        return canvas.toDataURL('image/webp', 0.85);
      }
      bmp.close?.();
    } catch {
      /* fall through to FileReader */
    }
  }
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function PhotoIcon() {
  return (
    <svg
      className="ps-icon"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

/** Faint starfield used by the "群星 · Stars" publications scene. */
const SCENE_STARS: [number, number, number][] = [
  [150, 70, 2.4], [270, 52, 1.8], [360, 96, 2.6], [470, 64, 2], [580, 44, 2.4],
  [690, 90, 1.8], [780, 58, 2.6], [900, 80, 2], [1010, 54, 2.4], [1090, 104, 1.8],
  [230, 150, 2], [520, 134, 2.6], [660, 168, 1.8], [840, 150, 2.4], [980, 186, 2],
  [1060, 150, 2.6], [330, 210, 1.8], [600, 220, 2.2], [760, 250, 1.8], [160, 240, 2.4], [1120, 200, 2],
];

type SceneVariant = 'elephant' | 'stars' | 'lamplighter' | 'fox' | 'well';

/**
 * Full-bleed silhouette backdrop for each section — one stop on the Little
 * Prince's journey. Drawn in faint ink so foreground copy stays legible; the
 * recurring red dot/flower (北大红 / PKU red) is the thread tying the scenes.
 */
function SceneArt({ variant }: { variant: SceneVariant }) {
  return (
    <div className="scene-art" aria-hidden="true">
      <svg className="scene-svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice">
        {variant === 'elephant' && (
          <>
            <path className="ink" d="M150,460 C430,460 420,300 600,300 C780,300 770,460 1050,460 Z" />
            <path className="line" d="M150,460 C430,460 420,300 600,300 C780,300 770,460 1050,460" />
            <circle className="rose" cx="548" cy="362" r="7" />
          </>
        )}

        {variant === 'stars' && (
          <>
            {SCENE_STARS.map(([x, y, r], i) => (
              <circle className="star" cx={x} cy={y} r={r} key={i} />
            ))}
            <path className="ground" d="M40,460 Q220,418 400,460 L400,470 L40,470 Z" />
            <g transform="translate(190,310) scale(2.5)">
              <circle className="ink" cx="20" cy="13" r="7.5" />
              <path className="ink" d="M8,60 L20,28 L32,60 Z" />
            </g>
            <g transform="translate(250,248) scale(3)">
              <path className="rose" d="M6,0 L7,5 L12,6 L7,7 L6,12 L5,7 L0,6 L5,5 Z" />
            </g>
          </>
        )}

        {variant === 'lamplighter' && (
          <>
            <defs>
              <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--sc-glow)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <path className="ground" d="M0,460 Q600,380 1200,460 L1200,600 L0,600 Z" />
            <path className="line" d="M0,460 Q600,380 1200,460" />
            <circle cx="820" cy="300" r="52" fill="url(#lampGlow)" />
            <line className="line" x1="820" y1="300" x2="820" y2="425" />
            <rect className="ink" x="809" y="278" width="22" height="18" rx="2" />
            <g transform="translate(405,250) scale(2.9)">
              <circle className="ink" cx="20" cy="13" r="7.5" />
              <path className="ink" d="M8,60 L20,28 L32,60 Z" />
            </g>
            <path className="line" d="M286,412 a16,18 0 0 1 32,0" />
            <circle className="rose" cx="302" cy="408" r="7" />
          </>
        )}

        {variant === 'fox' && (
          <>
            {[70, 116, 162, 208, 254, 300, 980, 1026, 1072, 1118, 1150].map((x, i) => (
              <path
                className="stem"
                d={`M${x},460 Q${x + (i % 2 ? 5 : -5)},400 ${x},356`}
                key={i}
              />
            ))}
            <g transform="translate(540,310) scale(3)">
              <path className="ink" d="M10,50 Q6,22 18,16 L12,4 L22,14 Q30,12 38,14 L48,4 L42,16 Q54,24 50,50 Z" />
            </g>
            <line className="stem" x1="850" y1="460" x2="850" y2="382" />
            <ellipse className="leaf" cx="838" cy="410" rx="11" ry="4.5" transform="rotate(-24 838 410)" />
            <circle className="rose" cx="850" cy="374" r="8" />
          </>
        )}

        {variant === 'well' && (
          <>
            <path className="ground" d="M0,470 Q300,430 600,452 Q900,474 1200,440 L1200,600 L0,600 Z" />
            <path className="line" d="M0,470 Q300,430 600,452 Q900,474 1200,440" />
            <rect className="line" x="596" y="392" width="64" height="44" rx="4" />
            <line className="line" x1="596" y1="372" x2="660" y2="372" />
            <line className="line" x1="603" y1="372" x2="610" y2="392" />
            <line className="line" x1="653" y1="372" x2="646" y2="392" />
            <line className="line" x1="628" y1="372" x2="628" y2="386" />
            <rect className="ink" x="622" y="386" width="12" height="9" rx="1" />
            <g transform="translate(430,280) scale(2.9)">
              <circle className="ink" cx="22" cy="12" r="7" />
              <path className="ink" d="M11,62 L22,30 L33,62 Z" />
              <path className="line" d="M22,34 L43,42" />
            </g>
            <line className="stem" x1="566" y1="452" x2="566" y2="404" />
            <circle className="rose" cx="566" cy="396" r="7" />
          </>
        )}
      </svg>
    </div>
  );
}

/** Golden-hour / moonlit ambience layered behind the hero. */
function HeroMood() {
  return (
    <div className="hero-mood" aria-hidden="true">
      <div className="hero-sky" />
      <div className="hero-orb" />
      <div className="hero-sea" />
      <div className="hero-horizon" />
      <svg className="hero-waves" viewBox="0 0 1200 80" preserveAspectRatio="none">
        <path
          d="M0 30 Q 75 18 150 30 T 300 30 T 450 30 T 600 30 T 750 30 T 900 30 T 1050 30 T 1200 30"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.4"
        />
        <path
          d="M0 52 Q 75 40 150 52 T 300 52 T 450 52 T 600 52 T 750 52 T 900 52 T 1050 52 T 1200 52"
          fill="none"
          stroke="var(--warm)"
          strokeWidth="1.1"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

export default function Home() {
  // Server + first client render use the defaults (Tide / 中) so hydration
  // matches; stored preferences are applied right after mount.
  const [theme, setTheme] = useState<ThemeKey>('B');
  const [lang, setLang] = useState<LangKey>('zh');
  const [photo, setPhoto] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [active, setActive] = useState<SectionId>('top');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const t = localStorage.getItem(THEME_KEY);
      if (t === 'A' || t === 'B') setTheme(t);
      const l = localStorage.getItem(LANG_KEY);
      if (l === 'zh' || l === 'en') setLang(l);
      const p = localStorage.getItem(PHOTO_KEY);
      if (p && /^data:image\//i.test(p)) setPhoto(p);
    } catch {
      /* ignore unavailable storage */
    }
  }, []);

  useEffect(() => {
    document.body.style.background = theme === 'A' ? '#16222e' : '#eef1f1';
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Track the section nearest the viewport centre and light its dot.
  useEffect(() => {
    const compute = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const mid = y + window.innerHeight / 2;
      let best: SectionId = SECTION_IDS[0];
      let bestD = Infinity;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const center = el.getBoundingClientRect().top + y + el.offsetHeight / 2;
        const d = Math.abs(center - mid);
        if (d < bestD) {
          bestD = d;
          best = id;
        }
      }
      setActive((prev) => (prev === best ? prev : best));
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

  const applyTheme = (t: ThemeKey) => {
    setTheme(t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {
      /* ignore */
    }
  };

  const applyLang = (l: LangKey) => {
    setLang(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      /* ignore */
    }
  };

  const ingest = useCallback(async (file: File | undefined | null) => {
    if (!file || !file.type.startsWith('image/')) return;
    try {
      const url = await downscale(file);
      setPhoto(url);
      try {
        localStorage.setItem(PHOTO_KEY, url);
      } catch {
        /* quota or unavailable — image still shows for the session */
      }
    } catch {
      /* decode failed — leave the slot as-is */
    }
  }, []);

  const removePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhoto(null);
    try {
      localStorage.removeItem(PHOTO_KEY);
    } catch {
      /* ignore */
    }
  };

  const c = CONTENT[lang];
  const fable =
    lang === 'zh'
      ? { inq: '看不见的大象', pub: '群星', proj: '点灯人', blog: '狐狸与麦田', contact: '沙漠之井' }
      : {
          inq: 'The Invisible Elephant',
          pub: 'The Stars',
          proj: 'The Lamplighter',
          blog: 'The Fox & the Wheat',
          contact: 'The Well in the Desert',
        };
  const navLabels: Record<SectionId, string> = {
    top: c.nav.home,
    inquiries: c.nav.about,
    pubs: c.nav.pubs,
    projects: c.nav.projects,
    blog: c.nav.blog,
    contact: c.nav.contact,
  };

  return (
    <div className="root" data-theme={theme} data-scroll-root>
      <div className="bg-layers" aria-hidden="true">
        <div className="caustics" />
        <div className="sheen" />
      </div>

      {/* ===== TOP BAR ===== */}
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="logo">
            区睿哲 <i>Richie</i>
          </a>
          <div className="header-spacer" />
          <nav className="nav">
            <a href="#top" className="home">
              {c.nav.home}
            </a>
            <a href="#inquiries">{c.nav.about}</a>
            <a href="#pubs">{c.nav.pubs}</a>
            <a href="#projects">{c.nav.projects}</a>
            <a href="#blog">{c.nav.blog}</a>
            <a href="#contact">{c.nav.contact}</a>
          </nav>
          <div className="v-divider" />
          <div className="tab-group">
            <button className={`tab${theme === 'A' ? ' active' : ''}`} onClick={() => applyTheme('A')}>
              {c.tA}
            </button>
            <button className={`tab${theme === 'B' ? ' active' : ''}`} onClick={() => applyTheme('B')}>
              {c.tB}
            </button>
          </div>
          <div className="tab-group">
            <button className={`tab${lang === 'zh' ? ' active' : ''}`} onClick={() => applyLang('zh')}>
              中
            </button>
            <button className={`tab${lang === 'en' ? ' active' : ''}`} onClick={() => applyLang('en')}>
              EN
            </button>
          </div>
        </div>
      </header>

      {/* ===== RIGHT-SIDE CIRCLE NAV ===== */}
      <nav className="dot-nav" aria-label="sections">
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            title={navLabels[id]}
            className={`dot-nav-item${active === id ? ' active' : ''}`}
            aria-current={active === id ? 'true' : undefined}
          >
            <span className="dot-nav-label">{navLabels[id]}</span>
            <span className="dot-nav-dot" />
          </a>
        ))}
      </nav>

      {/* ===== FULL-PAGE PERSONAL INFO ===== */}
      <section id="top" className="hero">
        <HeroMood />
        <div className="hero-inner">
          <div className="photo-wrap">
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="photo-frame">
              <div
                className={`photo-slot${photo ? ' filled' : ''}${dragOver ? ' drag-over' : ''}`}
                style={photo ? { backgroundImage: `url(${photo})` } : undefined}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  ingest(e.dataTransfer.files?.[0]);
                }}
                role="button"
                tabIndex={0}
                aria-label={c.photoLabel}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    inputRef.current?.click();
                  }
                }}
              >
                <PhotoIcon />
                <div className="ps-cap">{c.photoLabel}</div>
                <div className="ps-sub">
                  <u>{c.photoSub}</u>
                </div>
                <button className="photo-remove" onClick={removePhoto} aria-label="Remove photo">
                  ✕
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    ingest(e.target.files?.[0]);
                    e.currentTarget.value = '';
                  }}
                />
              </div>
            </div>
          </div>

          <div className="hero-info">
            <h1 className="hero-name">
              <span className="hero-line1">{c.heroLine1}</span>
              <span className="hero-line2">{c.heroLine2}</span>
            </h1>
            <p className="hero-intro">{c.heroIntro}</p>

            <div className="edu-stack">
              {c.eduStack.map((e) => (
                <div className="edu-item" key={e.label}>
                  <div className="edu-bar" style={{ background: e.color }} />
                  <div className="edu-label">{e.label}</div>
                  <div className="edu-body">
                    <div className="edu-title">{e.title}</div>
                    <div className="edu-sub">{e.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="focus-box">
              <div className="focus-label">
                <span className="focus-line" />
                {c.focus.label}
              </div>
              <div className="focus-body">
                <div className="focus-title">{c.focus.title}</div>
                <div className="focus-sub">{c.focus.sub}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        {/* ===== 01 INQUIRIES · 看不见的大象 ===== */}
        <section id="inquiries" className="snap-section scene scene--inquiries">
          <SceneArt variant="elephant" />
          <div className="scene-inner">
            <div className="sec-head">
              <span className="sec-num">01</span>
              <h2 className="sec-title">{c.inqTitle}</h2>
              <span className="sec-fable">{fable.inq}</span>
            </div>
            <div className="sec-note">{c.inqNote}</div>
            <div className="inq-grid">
              {c.inquiries.map((iq) => (
                <div className="inq-card" key={iq.no}>
                  <div className="inq-no">{iq.no}</div>
                  <h3 className="inq-title">{iq.title}</h3>
                  <p className="inq-desc">{iq.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 02 PUBLICATIONS · 群星 ===== */}
        <section id="pubs" className="snap-section scene scene--pubs">
          <SceneArt variant="stars" />
          <div className="scene-inner">
            <div className="sec-head">
              <span className="sec-num">02</span>
              <h2 className="sec-title">{c.pubTitle}</h2>
              <span className="sec-fable">{fable.pub}</span>
            </div>
            <div className="pub-note">{c.pubNote}</div>
            <div className="pub-list">
              {c.pubs.map((p, i) => (
                <article className="pub-item" key={`${p.year}-${i}`}>
                  <div className="pub-year">{p.year}</div>
                  <div className="pub-body">
                    <h3 className="pub-title">{p.title}</h3>
                    <div className="pub-authors">{p.authors}</div>
                    <div className="pub-venue">{p.venue}</div>
                    <div className="pub-links">
                      {p.links.map((l) => {
                        const ext = !!l.href && /^https?:/i.test(l.href);
                        return (
                          <a
                            className="pub-link"
                            href={l.href ?? '#'}
                            key={l.label}
                            target={ext ? '_blank' : undefined}
                            rel={ext ? 'noopener noreferrer' : undefined}
                          >
                            {l.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 03 PROJECTS · 点灯人 ===== */}
        <section id="projects" className="snap-section scene scene--projects">
          <SceneArt variant="lamplighter" />
          <div className="scene-inner">
            <div className="sec-head sec-head--lg">
              <span className="sec-num">03</span>
              <h2 className="sec-title">{c.projTitle}</h2>
              <span className="sec-fable">{fable.proj}</span>
            </div>
            <div className="proj-grid">
              {c.projects.map((pr) => (
                <article className="proj-card" key={pr.name}>
                  <div className="proj-head">
                    <span className="proj-dot" />
                    <h3 className="proj-name">{pr.name}</h3>
                  </div>
                  <p className="proj-desc">{pr.desc}</p>
                  <div className="proj-tags">
                    {pr.tags.map((tg) => (
                      <span className="proj-tag" key={tg}>
                        {tg}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 04 BLOG · 狐狸与麦田 ===== */}
        <section id="blog" className="snap-section scene scene--blog">
          <SceneArt variant="fox" />
          <div className="scene-inner">
            <div className="sec-head sec-head--lg">
              <span className="sec-num">04</span>
              <h2 className="sec-title">{c.blogTitle}</h2>
              <span className="sec-fable">{fable.blog}</span>
            </div>
            <div className="blog-list">
              {c.posts.map((po, i) => (
                <a className="post" href={po.href ?? '#'} key={`${po.date}-${i}`}>
                  <div className="post-date">{po.date}</div>
                  <div className="post-body">
                    <h3 className="post-title">{po.title}</h3>
                    <p className="post-excerpt">{po.excerpt}</p>
                  </div>
                  <span className="post-arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 05 CONTACT · 沙漠之井 ===== */}
        <section id="contact" className="snap-section scene scene--contact">
          <SceneArt variant="well" />
          <div className="scene-inner">
            <div className="contact-card">
              <div className="sec-head sec-head--sm">
                <span className="sec-num">05</span>
                <h2 className="sec-title">{c.contactTitle}</h2>
                <span className="sec-fable">{fable.contact}</span>
              </div>
              <p className="contact-body">{c.contactBody}</p>
              <div className="link-list">
                {c.links.map((lk) => (
                  <a className="link-row" href={lk.href} key={lk.label}>
                    <span className="link-label">{lk.label}</span>
                    <span className="link-value">{lk.value}</span>
                    <span className="link-ext">↗</span>
                  </a>
                ))}
              </div>
            </div>
            <footer className="site-footer">{c.footer}</footer>
          </div>
        </section>
      </main>
    </div>
  );
}
