// ============================================================
// Decorative full-bleed backdrops for the five content sections.
// Ported verbatim from the Claude Design handoff (个人主页.dc.html):
// each section is its own abstract Little-Prince "page" — a soft
// mood wash drawn from the section's --m hue, a scene-specific light
// shape, plus a recurring Little Prince silhouette and a red rose
// (北大红 / var(--pku)) threaded through every section.
//
// This is static, aria-hidden art with no interactivity, injected via
// dangerouslySetInnerHTML so the markup stays pixel-faithful to the
// design without hand-porting ~50 inline-styled nodes into JSX.
// ============================================================

type PrinceOpts = {
  left?: string;
  right?: string;
  bottom?: string;
  arm?: 'left' | 'right';
  ink?: number;
  w?: string;
};

/** Little Prince silhouette — head + cloaked body + one reaching arm. */
function prince({ left, right, bottom = '10%', arm = 'right', ink = 36, w = 'clamp(30px,3.6vw,38px)' }: PrinceOpts): string {
  const armPath = arm === 'left' ? 'M14,30 Q2,30 4,42' : 'M50,30 Q62,30 60,42';
  const pos = right != null ? `right:${right}` : `left:${left}`;
  return `<svg viewBox="0 0 64 96" style="position:absolute;${pos};bottom:${bottom};width:${w};height:auto"><circle cx="32" cy="16" r="9.5" fill="color-mix(in oklab,var(--text) ${ink}%,transparent)"/><path d="M14,96 L32,34 L50,96 Z" fill="color-mix(in oklab,var(--text) ${ink}%,transparent)"/><path d="M32,40 L32,68" stroke="color-mix(in oklab,var(--text) ${ink - 12}%,transparent)" stroke-width="2" fill="none"/><path d="${armPath}" stroke="color-mix(in oklab,var(--text) ${ink - 10}%,transparent)" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;
}

type RoseOpts = {
  left?: string;
  right?: string;
  bottom?: string;
  blur?: number;
  glow?: number;
  pulse?: boolean;
  w?: string;
};

/** The red rose — stem, leaf, bloom — the thread recurring in every scene. */
function rose({ left, right, bottom = '10%', blur = 6, glow = 42, pulse = false, w = 'clamp(18px,2.1vw,22px)' }: RoseOpts): string {
  const pos = right != null ? `right:${right}` : `left:${left}`;
  const anim = pulse ? ';animation:rosePulse 5.5s ease-in-out infinite alternate' : '';
  return `<svg viewBox="0 0 30 50" style="position:absolute;${pos};bottom:${bottom};width:${w};height:auto;overflow:visible;filter:drop-shadow(0 0 ${blur}px color-mix(in oklab,var(--pku) ${glow}%,transparent))${anim}"><path d="M15,50 L15,19" stroke="#6f9a6e" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M15,32 C7,31 5,24 9.5,21.5 C13.5,23.5 15,28.5 15,32 Z" fill="#6f9a6e" opacity="0.85"/><circle cx="15" cy="13" r="7.4" fill="var(--pku)"/><path d="M10,12.6 C10,8.4 20,8.4 20,12.6 C20,16 15,17.6 15,17.6 C15,14.6 12.8,13.6 10,12.6 Z" fill="#000" opacity="0.17"/></svg>`;
}

// 01 探索 · 看不见的大象 — the boa-that-swallowed-an-elephant hill of light.
const inquiries = `
<div style="position:absolute;top:-12%;left:-8%;width:min(50vw,600px);height:min(46vh,420px);background:radial-gradient(circle,color-mix(in oklab,var(--m) 13%,transparent),transparent 66%);filter:blur(34px)"></div>
<div style="position:absolute;right:-6%;top:24%;width:min(38vw,440px);height:min(34vh,300px);background:radial-gradient(circle,color-mix(in oklab,var(--m) 7%,transparent),transparent 68%);filter:blur(32px)"></div>
<svg viewBox="0 0 600 200" preserveAspectRatio="none" style="position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:clamp(360px,64vw,760px);height:clamp(150px,26vh,290px);filter:blur(11px);animation:glowPulse 16s ease-in-out infinite alternate"><path d="M0,200 L0,150 C90,150 110,52 300,52 C490,52 510,150 600,150 L600,200 Z" fill="color-mix(in oklab,var(--m) 22%,transparent)"/></svg>
<svg viewBox="0 0 600 200" preserveAspectRatio="none" style="position:absolute;left:50%;bottom:6%;transform:translateX(-50%);width:clamp(300px,52vw,620px);height:clamp(110px,20vh,220px);opacity:0.4"><path d="M16,180 C100,180 120,76 300,76 C480,76 500,180 584,180" fill="none" stroke="color-mix(in oklab,var(--m) 50%,transparent)" stroke-width="1.4" stroke-linecap="round"/></svg>
<div style="position:absolute;left:0;right:0;bottom:0;height:26%;background:linear-gradient(180deg,transparent,color-mix(in oklab,var(--m) 11%,transparent))"></div>
${prince({ left: '45%', arm: 'right', ink: 38 })}
${rose({ left: '53.5%', blur: 6, glow: 42 })}
`;

// 02 论文 · 群星 — starfields, a milky band and a constellation asterism.
const pubs = `
<div style="position:absolute;top:7%;left:0;width:34%;height:54%;background-image:radial-gradient(1.4px 1.4px at 18% 22%,color-mix(in oklab,var(--text) 30%,transparent),transparent),radial-gradient(1.5px 1.5px at 40% 48%,color-mix(in oklab,var(--text) 24%,transparent),transparent),radial-gradient(1.4px 1.4px at 60% 18%,color-mix(in oklab,var(--text) 26%,transparent),transparent),radial-gradient(1.3px 1.3px at 26% 64%,color-mix(in oklab,var(--text) 22%,transparent),transparent),radial-gradient(1.5px 1.5px at 78% 38%,color-mix(in oklab,var(--text) 24%,transparent),transparent),radial-gradient(1.7px 1.7px at 52% 72%,var(--m),transparent)"></div>
<div style="position:absolute;top:7%;right:0;width:34%;height:54%;background-image:radial-gradient(1.4px 1.4px at 82% 24%,color-mix(in oklab,var(--text) 30%,transparent),transparent),radial-gradient(1.5px 1.5px at 60% 50%,color-mix(in oklab,var(--text) 24%,transparent),transparent),radial-gradient(1.4px 1.4px at 40% 18%,color-mix(in oklab,var(--text) 26%,transparent),transparent),radial-gradient(1.3px 1.3px at 74% 66%,color-mix(in oklab,var(--text) 22%,transparent),transparent),radial-gradient(1.5px 1.5px at 22% 40%,color-mix(in oklab,var(--text) 24%,transparent),transparent),radial-gradient(1.7px 1.7px at 50% 72%,var(--m),transparent)"></div>
<svg viewBox="0 0 420 200" style="position:absolute;left:12%;top:13%;width:min(36vw,420px);height:auto;opacity:0.42"><polyline points="16,46 120,96 224,52 330,128" fill="none" stroke="color-mix(in oklab,var(--m) 46%,transparent)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></svg>
<div style="position:absolute;right:-3%;top:30%;width:min(34vw,430px);height:min(48vh,460px);background:radial-gradient(closest-side,color-mix(in oklab,var(--m) 22%,transparent),color-mix(in oklab,var(--m) 8%,transparent) 52%,transparent 78%);filter:blur(28px)"></div>
<div style="position:absolute;right:-3%;top:30%;width:min(34vw,430px);height:min(48vh,460px);opacity:0.9;background-image:radial-gradient(1.6px 1.6px at 30% 40%,#fff,transparent),radial-gradient(1.5px 1.5px at 54% 56%,color-mix(in oklab,var(--text) 50%,transparent),transparent),radial-gradient(1.8px 1.8px at 44% 30%,var(--m),transparent),radial-gradient(1.5px 1.5px at 70% 48%,#fff,transparent),radial-gradient(1.5px 1.5px at 62% 66%,color-mix(in oklab,var(--text) 46%,transparent),transparent),radial-gradient(1.4px 1.4px at 36% 64%,color-mix(in oklab,var(--text) 40%,transparent),transparent)"></div>
<div style="position:absolute;left:-4%;top:24%;width:min(28vw,360px);height:min(42vh,400px);background:radial-gradient(closest-side,color-mix(in oklab,var(--m) 16%,transparent),color-mix(in oklab,var(--m) 6%,transparent) 54%,transparent 80%);filter:blur(30px)"></div>
<div style="position:absolute;left:-4%;top:24%;width:min(28vw,360px);height:min(42vh,400px);opacity:0.85;background-image:radial-gradient(1.5px 1.5px at 40% 36%,#fff,transparent),radial-gradient(1.4px 1.4px at 62% 52%,color-mix(in oklab,var(--text) 44%,transparent),transparent),radial-gradient(1.6px 1.6px at 50% 26%,var(--m),transparent),radial-gradient(1.4px 1.4px at 30% 58%,color-mix(in oklab,var(--text) 40%,transparent),transparent)"></div>
<div style="position:absolute;left:0;right:0;bottom:0;height:34%;background:linear-gradient(180deg,transparent,color-mix(in oklab,var(--m) 17%,transparent))"></div>
<div style="position:absolute;left:0;right:0;bottom:0;height:44%;background-image:radial-gradient(1.4px 1.4px at 12% 30%,color-mix(in oklab,var(--text) 26%,transparent),transparent),radial-gradient(1.3px 1.3px at 30% 64%,color-mix(in oklab,var(--text) 20%,transparent),transparent),radial-gradient(1.5px 1.5px at 68% 40%,color-mix(in oklab,var(--text) 24%,transparent),transparent),radial-gradient(1.3px 1.3px at 84% 66%,color-mix(in oklab,var(--text) 20%,transparent),transparent),radial-gradient(1.4px 1.4px at 92% 34%,color-mix(in oklab,var(--text) 22%,transparent),transparent),radial-gradient(1.3px 1.3px at 6% 70%,color-mix(in oklab,var(--text) 18%,transparent),transparent),radial-gradient(1.3px 1.3px at 48% 76%,color-mix(in oklab,var(--text) 18%,transparent),transparent)"></div>
<div style="position:absolute;left:16%;top:31%;width:clamp(80px,12vw,140px);height:1.5px;background:linear-gradient(90deg,transparent,color-mix(in oklab,var(--text) 42%,transparent));transform:rotate(23deg);opacity:0.6"></div>
<svg viewBox="0 0 540 132" style="position:absolute;left:50%;bottom:12%;transform:translateX(-50%);width:min(64vw,580px);height:auto;opacity:0.92"><g stroke="color-mix(in oklab,var(--m) 48%,transparent)" stroke-width="1" fill="none" stroke-linecap="round"><path d="M28,92 L112,40 L212,72 L300,26 L404,62 L508,34"/><path d="M212,72 L250,122"/></g><g fill="#fff"><circle cx="112" cy="40" r="2"/><circle cx="404" cy="62" r="1.7"/><circle cx="508" cy="34" r="1.8"/></g><circle cx="28" cy="92" r="2.5" fill="color-mix(in oklab,var(--m) 70%,#fff)"/><circle cx="212" cy="72" r="2.7" fill="color-mix(in oklab,var(--m) 70%,#fff)"/><circle cx="300" cy="26" r="2.6" fill="#fff"/><circle cx="300" cy="26" r="5" fill="none" stroke="color-mix(in oklab,#fff 55%,transparent)" stroke-width="0.8"/></svg>
<div style="position:absolute;left:31%;bottom:31%;width:4px;height:4px;border-radius:50%;background:#fff;box-shadow:0 0 10px 2px color-mix(in oklab,#fff 50%,transparent);animation:twinkle 4s ease-in-out infinite"></div>
<div style="position:absolute;right:27%;bottom:35%;width:5px;height:5px;border-radius:50%;background:var(--m);box-shadow:0 0 14px 3px color-mix(in oklab,var(--m) 40%,transparent);animation:twinkle 5.5s ease-in-out infinite"></div>
${prince({ left: '53%', arm: 'left', ink: 36 })}
${rose({ left: '45.5%', blur: 6, glow: 42 })}
`;

// 03 项目 · 点灯人 — the lamplighter's downward cone of light + ground pool.
const projects = `
<div style="position:absolute;left:-8%;top:-12%;width:min(40vw,460px);height:min(40vh,380px);background:radial-gradient(circle,color-mix(in oklab,var(--m) 9%,transparent),transparent 66%);filter:blur(30px)"></div>
<div style="position:absolute;left:48%;bottom:9%;transform:translateX(-50%);width:clamp(200px,32vw,400px);height:clamp(220px,42vh,400px);clip-path:polygon(43% 0%,57% 0%,100% 100%,0% 100%);background:linear-gradient(180deg,color-mix(in oklab,var(--m) 26%,transparent),color-mix(in oklab,var(--m) 7%,transparent) 60%,transparent 90%);filter:blur(13px);animation:glowPulse 12s ease-in-out infinite alternate"></div>
<div style="position:absolute;left:48%;bottom:8%;transform:translateX(-50%);width:clamp(240px,40vw,500px);height:clamp(56px,9vh,110px);border-radius:50%;background:radial-gradient(closest-side,color-mix(in oklab,var(--m) 24%,transparent),transparent 80%);filter:blur(7px)"></div>
<svg viewBox="0 0 200 200" style="position:absolute;left:48%;bottom:31%;transform:translateX(-50%);width:min(30vw,260px);height:auto;opacity:0.42"><g fill="none" stroke="color-mix(in oklab,var(--m) 50%,transparent)" stroke-width="1.1" stroke-linecap="round"><path d="M100,34 L100,4"/><path d="M150,52 L172,32"/><path d="M50,52 L28,32"/><path d="M168,104 L198,100"/><path d="M32,104 L2,100"/></g></svg>
${prince({ left: '39%', arm: 'right', ink: 36 })}
${rose({ left: '55%', blur: 7, glow: 44 })}
`;

// 04 随笔 · 狐狸与麦田 — a low field-horizon, wind sweep, wheat and the fox.
const blog = `
<div style="position:absolute;left:0;right:0;bottom:0;height:34%;background:linear-gradient(180deg,transparent,color-mix(in oklab,var(--m) 13%,transparent) 58%,color-mix(in oklab,var(--m) 19%,transparent))"></div>
<div style="position:absolute;left:50%;bottom:4%;transform:translateX(-50%);width:clamp(440px,76vw,960px);height:clamp(150px,26vh,300px);background:radial-gradient(62% 100% at 50% 100%,color-mix(in oklab,var(--m) 22%,transparent),color-mix(in oklab,var(--m) 8%,transparent) 50%,transparent 76%);filter:blur(10px)"></div>
<div style="position:absolute;left:-12%;right:-12%;bottom:11%;height:16%;transform:rotate(-3.5deg);background:linear-gradient(100deg,transparent,color-mix(in oklab,var(--m) 12%,transparent) 46%,transparent 78%);filter:blur(16px);animation:sheenFloat 18s ease-in-out infinite alternate"></div>
<svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMax meet" style="position:absolute;left:0;right:0;bottom:9%;width:100%;height:clamp(120px,22vh,210px);opacity:0.5"><g stroke="var(--m)" stroke-width="2" fill="none" stroke-linecap="round"><path d="M150,156 Q145,86 154,44"/><path d="M196,156 Q201,96 192,58"/><path d="M240,156 Q236,90 244,52"/><path d="M980,156 Q975,84 984,44"/><path d="M1034,156 Q1039,94 1030,56"/></g><g fill="var(--m)" opacity="0.55"><ellipse cx="154" cy="40" rx="3" ry="10"/><ellipse cx="244" cy="48" rx="2.8" ry="9"/><ellipse cx="984" cy="40" rx="3" ry="10"/></g></svg>
<svg viewBox="0 0 150 112" style="position:absolute;left:55%;bottom:10%;width:clamp(78px,10.5vw,124px);height:auto;overflow:visible;filter:drop-shadow(0 0 7px color-mix(in oklab,var(--m) 48%,transparent))"><path d="M58,100 C50,82 52,64 66,58 C72,52 80,50 86,54 L92,37 L100,54 L109,35 L117,54 L131,64 L114,70 C110,82 107,92 105,100 Z M60,99 C36,98 20,82 25,60 C28,47 41,43 52,52 C45,63 47,78 60,86 Z" fill="color-mix(in oklab,var(--m) 17%,transparent)" stroke="color-mix(in oklab,var(--m) 56%,transparent)" stroke-width="1.5" stroke-linejoin="round"/><circle cx="110" cy="58" r="1.7" fill="color-mix(in oklab,var(--text) 42%,transparent)"/></svg>
${prince({ left: '80%', arm: 'left', ink: 36 })}
${rose({ left: '14%', blur: 6, glow: 42 })}
`;

// 05 联系 · 沙漠之井 — pure porcelain, neutral dunes, light rising from a well, ripple rings.
const contact = `
<div style="position:absolute;left:-16%;bottom:1%;width:78%;height:clamp(120px,20vh,220px);border-radius:50% 50% 0 0;background:radial-gradient(78% 100% at 42% 100%,color-mix(in oklab,var(--m) 16%,transparent),transparent 72%);filter:blur(9px)"></div>
<div style="position:absolute;right:-18%;bottom:0%;width:82%;height:clamp(150px,25vh,270px);border-radius:50% 50% 0 0;background:radial-gradient(78% 100% at 58% 100%,color-mix(in oklab,var(--m) 12%,transparent),transparent 72%);filter:blur(11px)"></div>
<div style="position:absolute;left:50%;bottom:9%;transform:translateX(-50%);width:clamp(70px,11vw,140px);height:clamp(180px,38vh,340px);background:linear-gradient(0deg,color-mix(in oklab,var(--m) 18%,transparent),transparent 82%);filter:blur(16px)"></div>
<div style="position:absolute;left:50%;bottom:13%;width:clamp(150px,24vw,290px);aspect-ratio:1;transform:translate(-50%,50%);border-radius:50%;border:1px solid color-mix(in oklab,var(--m) 28%,transparent)"></div>
<div style="position:absolute;left:50%;bottom:13%;width:clamp(260px,40vw,500px);aspect-ratio:1;transform:translate(-50%,50%);border-radius:50%;border:1px solid color-mix(in oklab,var(--m) 16%,transparent)"></div>
${prince({ left: '32%', arm: 'right', ink: 38, w: 'clamp(29px,3.5vw,37px)' })}
${rose({ right: '20%', bottom: '11%', blur: 9, glow: 50, pulse: true })}
`;

export const SCENE_ART = { inquiries, pubs, projects, blog, contact } as const;
