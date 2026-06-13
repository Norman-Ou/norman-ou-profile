'use client';

import { useEffect, useState } from 'react';
import { CONTENT, type LangKey, type ThemeKey, type Version } from '@/lib/content';
import { SCENE_ART } from '@/lib/sceneArt';

const LANG_KEY = 'hp-lang';

/** Per-version hero photo, served from public/ (work → HR, school → faculty). */
const HERO_PHOTO: Record<Version, string> = {
  work: '/work_avatar.jpg',
  school: '/school_avatar.jpg',
};

const SECTION_IDS = ['top', 'inquiries', 'pubs', 'projects', 'blog', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

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

export default function Home({ version }: { version: Version }) {
  // Theme is decided by the URL version (work → Deep, school → Tide) and known
  // at render time, so the first paint is already correct. Language is
  // independent and remembered in localStorage.
  const theme: ThemeKey = version === 'work' ? 'A' : 'B';
  const [lang, setLang] = useState<LangKey>('en');
  const [active, setActive] = useState<SectionId>('top');
  // Opening animation overlay ("Ruizhe" writes itself), dismissed after a beat.
  const [showIntro, setShowIntro] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);

  useEffect(() => {
    try {
      const l = localStorage.getItem(LANG_KEY);
      if (l === 'zh' || l === 'en') setLang(l);
    } catch {
      /* ignore unavailable storage */
    }
  }, []);

  // Opening animation: lock scroll, let "Ruizhe" write itself, then reveal the
  // page — skip on any interaction or after a short hold; honour reduced-motion.
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduce) {
      setShowIntro(false);
      return;
    }
    const docEl = document.documentElement;
    docEl.style.overflow = 'hidden';
    const ac = new AbortController();
    let hold = 0;
    let unmount = 0;
    const leave = () => {
      ac.abort();
      window.clearTimeout(hold);
      docEl.style.overflow = '';
      setIntroLeaving(true);
      unmount = window.setTimeout(() => setShowIntro(false), 700);
    };
    hold = window.setTimeout(leave, 2600);
    const opts: AddEventListenerOptions = { passive: true, signal: ac.signal };
    window.addEventListener('wheel', leave, opts);
    window.addEventListener('touchstart', leave, opts);
    window.addEventListener('keydown', leave, { signal: ac.signal });
    window.addEventListener('click', leave, { signal: ac.signal });
    return () => {
      ac.abort();
      window.clearTimeout(hold);
      window.clearTimeout(unmount);
      docEl.style.overflow = '';
    };
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

  const applyLang = (l: LangKey) => {
    setLang(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      /* ignore */
    }
  };

  const c = CONTENT[lang];
  const focus = c.focus[version];
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
      {showIntro && (
        <div className={`intro${introLeaving ? ' intro--leaving' : ''}`} aria-hidden="true">
          <div className="intro-glow" />
          <div className="intro-name">Ruizhe</div>
        </div>
      )}
      <div className="bg-layers" aria-hidden="true">
        <div className="caustics" />
        <div className="sheen" />
      </div>

      {/* ===== TOP BAR ===== */}
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="logo">
            {c.logoMain} <i>{c.logoAlt}</i>
          </a>
          <div className="header-spacer" />
          <nav className="nav">
            {SECTION_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? 'active' : undefined}
                aria-current={active === id ? 'true' : undefined}
              >
                {navLabels[id]}
              </a>
            ))}
          </nav>
          <div className="v-divider" />
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
              <img className="photo-img" src={HERO_PHOTO[version]} alt={c.heroLine1} />
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
                {focus.label}
              </div>
              <div className="focus-body">
                <div className="focus-title">{focus.title}</div>
                <div className="focus-sub">{focus.sub}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        {/* ===== 01 INQUIRIES · 看不见的大象 ===== */}
        <section id="inquiries" className="scene scene--inquiries">
          <div
            className="scene-art"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: SCENE_ART.inquiries }}
          />
          <div className="scene-inner">
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
          </div>
        </section>

        {/* ===== 02 PUBLICATIONS · 群星 ===== */}
        <section id="pubs" className="scene scene--pubs">
          <div
            className="scene-art"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: SCENE_ART.pubs }}
          />
          <div className="scene-inner">
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
                  </div>
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
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 03 PROJECTS · 点灯人 ===== */}
        <section id="projects" className="scene scene--projects">
          <div
            className="scene-art"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: SCENE_ART.projects }}
          />
          <div className="scene-inner">
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
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 04 BLOG · 狐狸与麦田 ===== */}
        <section id="blog" className="scene scene--blog">
          <div
            className="scene-art"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: SCENE_ART.blog }}
          />
          <div className="scene-inner">
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
          </div>
        </section>

        {/* ===== 05 CONTACT · 沙漠之井 ===== */}
        <section id="contact" className="scene scene--contact">
          <div
            className="scene-art"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: SCENE_ART.contact }}
          />
          <div className="scene-inner">
            <div className="contact-card">
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
            </div>
            <footer className="site-footer">{c.footer}</footer>
          </div>
        </section>
      </main>
    </div>
  );
}
