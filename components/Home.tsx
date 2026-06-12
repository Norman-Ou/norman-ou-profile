'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CONTENT, type LangKey, type ThemeKey } from '@/lib/content';

const THEME_KEY = 'hp-theme';
const LANG_KEY = 'hp-lang';
const PHOTO_KEY = 'hp-photo';
const MAX_DIM = 1200;

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

function Wave() {
  return (
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true" className="wave">
      <path
        d="M0 22 Q 75 8 150 22 T 300 22 T 450 22 T 600 22 T 750 22 T 900 22 T 1050 22 T 1200 22"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
      />
      <path
        d="M0 30 Q 75 16 150 30 T 300 30 T 450 30 T 600 30 T 750 30 T 900 30 T 1050 30 T 1200 30"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

export default function Home() {
  // Server + first client render use the defaults (Tide / 中) so hydration
  // matches; stored preferences are applied right after mount.
  const [theme, setTheme] = useState<ThemeKey>('B');
  const [lang, setLang] = useState<LangKey>('zh');
  const [photo, setPhoto] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
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
    document.body.style.background = theme === 'A' ? '#0a2733' : '#f5f0e4';
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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

  return (
    <div className="root" data-theme={theme}>
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

      {/* ===== FULL-PAGE PERSONAL INFO ===== */}
      <section id="top" className="hero">
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
            <div className="skills">
              {c.skills.map((sk) => (
                <span className="chip" key={sk}>
                  {sk}
                </span>
              ))}
            </div>
            <h1 className="hero-name">
              {c.heroLine1}
              <br />
              <span>{c.heroLine2}</span>
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

            <div className="focus-card">
              <div className="focus-bar" />
              <div className="focus-label">{c.focus.label}</div>
              <div className="focus-body">
                <div className="focus-title">{c.focus.title}</div>
                <div className="focus-sub">{c.focus.sub}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        {/* ===== 01 INQUIRIES ===== */}
        <section id="inquiries" className="section">
          <div className="sec-head">
            <span className="sec-num">01</span>
            <h2 className="sec-title">{c.inqTitle}</h2>
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
        </section>

        <Wave />

        {/* ===== 02 PUBLICATIONS ===== */}
        <section id="pubs" className="section">
          <div className="sec-head">
            <span className="sec-num">02</span>
            <h2 className="sec-title">{c.pubTitle}</h2>
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
                    {p.links.map((l) => (
                      <a className="pub-link" href={l.href ?? '#'} key={l.label}>
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===== 03 PROJECTS ===== */}
        <section id="projects" className="section">
          <div className="sec-head sec-head--lg">
            <span className="sec-num">03</span>
            <h2 className="sec-title">{c.projTitle}</h2>
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
        </section>

        <Wave />

        {/* ===== 04 BLOG ===== */}
        <section id="blog" className="section">
          <div className="sec-head sec-head--lg">
            <span className="sec-num">04</span>
            <h2 className="sec-title">{c.blogTitle}</h2>
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
        </section>

        {/* ===== 05 CONTACT ===== */}
        <section id="contact" className="contact">
          <div className="sec-head sec-head--sm">
            <span className="sec-num">05</span>
            <h2 className="sec-title">{c.contactTitle}</h2>
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
        </section>

        <footer className="site-footer">{c.footer}</footer>
      </main>
    </div>
  );
}
