// ─────────────────────────────────────────────────────
//  BudgetPage.jsx — /budget landing (Chaologies design system)
//  Full-viewport hero · how-to · BudgetTool · subscribe
// ─────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import BudgetTool from "./BudgetTool.jsx";
import WechatModal from "./WechatModal.jsx";

const T = {
  eyebrow: { en: "Free · 50 / 30 / 20 Budget Tool", zh: "免费 · 50 / 30 / 20 预算工具" },
  h1: {
    en: "Your money is already building your future.",
    zh: "你对待钱的习惯，正在慢慢塑造你的未来。",
  },
  dek: {
    en: "Make sure it’s the one you want. Fill this in and see what your numbers are quietly deciding for you.",
    zh: "试试这个表，看看这是不是你想要的未来。填进去，看清楚你的每一笔钱到底在替你做什么决定。",
  },
  start: { en: "Start filling it in", zh: "开始填" },
  howLink: { en: "How it works", zh: "怎么用" },
  motif: {
    needs: { en: "Needs", zh: "必要" },
    wants: { en: "Wants", zh: "想要" },
    savings: { en: "Savings", zh: "储蓄" },
  },
  howTitle: { en: "How to use it", zh: "怎么用" },
  howSub: {
    en: "Four boxes and a number. Five minutes, no account.",
    zh: "四个格子，一个数字。五分钟，不用注册。",
  },
  steps: {
    en: [
      ["Fill your income", "Every source, after tax."],
      ["Fill Needs", "Rent, bills, minimum debt. The things you can’t skip."],
      ["Fill Savings", "Emergency fund, investing, extra debt. Pay your future first."],
      ["Fill Wants", "Eating out, subscriptions, the fun. Be honest."],
      ["Read the right side", "It moves as you type. If a number surprises you — that’s the point."],
    ],
    zh: [
      ["填收入", "所有来源，税后。"],
      ["填必要", "房租、账单、最低还款。没法省掉的那些。"],
      ["填储蓄", "应急金、投资、额外还债。先给未来分钱。"],
      ["填想要", "下馆子、订阅、想买的。诚实填。"],
      ["看右边", "边填边变。哪个数字让你意外，那就是重点。"],
    ],
  },
  subKicker: { en: "If this helped →", zh: "如果这对你有帮助 →" },
  subTitle: {
    en: "The newsletter goes deeper.",
    zh: "Newsletter 里聊得更深。",
  },
  subBody: {
    en: "Essays on money, minimalism, and making it count — about twice a month. One email, no spreadsheets.",
    zh: "关于钱、极简，和把生活过明白的长文，大约每月两篇。一封邮件，不含报表。",
  },
  subBtn: { en: "Subscribe", zh: "订阅" },
  wechatBtn: { en: "Follow on WeChat", zh: "关注微信公众号" },
  wechatHint: { en: "Scan to follow on WeChat", zh: "扫码关注公众号「超说 Chaologies」" },
  close: { en: "Close", zh: "关闭" },
};

const SUB_URL = "https://chaologies.substack.com?utm_source=budget-tool";

// ── Main ─────────────────────────────────────────────
export default function BudgetPage({ lang, setLang, onBack }) {
  const [wechatOpen, setWechatOpen] = useState(false);
  const [motifIn, setMotifIn] = useState(false);
  const toolRef = useRef(null);
  const howRef = useRef(null);

  // animate the 50/30/20 motif bar on mount
  useEffect(() => {
    const id = setTimeout(() => setMotifIn(true), 250);
    return () => clearTimeout(id);
  }, []);

  const scrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const motif = [
    { key: "needs", w: 50, cls: "needs" },
    { key: "wants", w: 30, cls: "wants" },
    { key: "savings", w: 20, cls: "savings" },
  ];

  return (
    <div className="bp-root">
      <style>{CSS}</style>

      {/* Hero — full viewport */}
      <section className="bp-hero">
        <nav className="bp-nav">
          <button className="bp-brand" onClick={onBack} aria-label="Home">
            <img src="/logo.png?v=3" alt="Chaologies" className="logo-img" />
          </button>
          <div className="lang">
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "zh" ? "on" : ""} onClick={() => setLang("zh")}>中</button>
          </div>
        </nav>

        <div className="bp-hero-inner">
          <div className="bp-eyebrow">{T.eyebrow[lang]}</div>
          <h1 className="bp-h1">{T.h1[lang]}</h1>
          <p className="bp-dek">{T.dek[lang]}</p>

          <div className="bp-cta-row">
            <button className="bp-cta" onClick={() => scrollTo(toolRef)}>
              <span>{T.start[lang]}</span>
              <span className="arr">↓</span>
            </button>
            <button className="bp-cta-ghost" onClick={() => scrollTo(howRef)}>
              {T.howLink[lang]}
            </button>
          </div>

          <div className={`bp-motif ${motifIn ? "in" : ""}`}>
            <div className="bp-motif-bar">
              {motif.map((m) => (
                <span key={m.key} className={`bp-motif-seg ${m.cls}`} style={{ width: `${m.w}%` }} />
              ))}
            </div>
            <div className="bp-motif-labels">
              {motif.map((m) => (
                <span key={m.key}>
                  <i className={`bp-dot ${m.cls}`} />
                  {T.motif[m.key][lang]} <b>{m.w}</b>
                </span>
              ))}
            </div>
          </div>
        </div>

        <button className="bp-scroll" onClick={() => scrollTo(howRef)} aria-label="Scroll down">↓</button>
      </section>

      {/* How to use */}
      <section className="bp-how" ref={howRef}>
        <div className="bp-how-inner">
          <div className="bp-section-kicker">{T.howTitle[lang]}</div>
          <p className="bp-how-sub">{T.howSub[lang]}</p>
          <ol className="bp-steps">
            {T.steps[lang].map(([label, detail], i) => (
              <li key={i} className="bp-step">
                <span className="bp-step-num">{i + 1}</span>
                <span className="bp-step-text">
                  <b>{label}</b>
                  <span>{detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tool */}
      <div ref={toolRef} className="bp-tool">
        <BudgetTool />
      </div>

      {/* Subscribe */}
      <section className="bp-sub">
        <div className="bp-sub-card">
          <div className="bp-section-kicker honey">{T.subKicker[lang]}</div>
          <h2 className="bp-sub-title">{T.subTitle[lang]}</h2>
          <p className="bp-sub-body">{T.subBody[lang]}</p>
          <div className="bp-sub-btns">
            <a className="bp-cta" href={SUB_URL} target="_blank" rel="noopener noreferrer">
              <span>{T.subBtn[lang]}</span>
              <span className="arr">→</span>
            </a>
            <button className="bp-cta-ghost dark" onClick={() => setWechatOpen(true)}>
              {T.wechatBtn[lang]}
            </button>
          </div>
        </div>
      </section>

      {wechatOpen && <WechatModal lang={lang} onClose={() => setWechatOpen(false)} />}
    </div>
  );
}

// ── Styles (design-system tokens from index.css) ─────
const CSS = `
.bp-root { background: var(--paper); color: var(--ink); }

/* Hero */
.bp-hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 96px clamp(24px, 6vw, 80px) 80px;
  overflow: hidden;
}
.bp-hero::before {
  content: "";
  position: absolute;
  top: -10%; right: -8%;
  width: 60vw; height: 60vw;
  max-width: 760px; max-height: 760px;
  background: radial-gradient(circle, rgba(228,161,27,0.14), rgba(228,161,27,0) 68%);
  pointer-events: none;
}
.bp-hero::after {
  content: "";
  position: absolute;
  bottom: -14%; left: -10%;
  width: 46vw; height: 46vw;
  max-width: 540px; max-height: 540px;
  background: radial-gradient(circle, rgba(244,132,95,0.10), rgba(244,132,95,0) 70%);
  pointer-events: none;
}

.bp-nav {
  position: absolute;
  top: 0; left: 0; right: 0;
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px clamp(24px, 6vw, 80px);
  z-index: 5;
}
.bp-brand { background: none; border: none; cursor: pointer; padding: 0; display: inline-flex; }
.bp-nav .logo-img { height: 46px; width: auto; }

.bp-hero-inner { position: relative; z-index: 2; max-width: 640px; }
.bp-eyebrow {
  font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--honey); margin-bottom: 26px;
}
.bp-h1 {
  font-family: var(--font-serif); font-weight: 600;
  font-size: clamp(32px, 5.4vw, 62px); line-height: 1.05;
  letter-spacing: -1.4px; color: var(--ink);
  text-wrap: balance;
}
.bp-dek {
  font-family: var(--font-hand);
  font-size: clamp(16px, 2vw, 21px); line-height: 1.75;
  color: var(--ink-2); margin-top: 24px; max-width: 42ch; letter-spacing: 0.2px;
}

.bp-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; margin-top: 38px; }
.bp-cta {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  padding: 14px 26px; border-radius: var(--r-sm);
  background: var(--ink); color: #fff; border: none; cursor: pointer;
  font-family: var(--font-sans); font-size: 14px; font-weight: 600; letter-spacing: 0.01em;
  transition: background var(--ease), transform var(--ease);
}
.bp-cta .arr { color: var(--honey); transition: transform var(--ease); }
.bp-cta:hover { background: #000; }
.bp-cta:hover .arr { transform: translateY(3px); }
.bp-cta:active { transform: scale(0.985); }
.bp-cta-ghost {
  background: none; border: none; cursor: pointer;
  font-family: var(--font-sans); font-size: 14px; font-weight: 600; color: var(--ink-2);
  display: inline-flex; align-items: center; gap: 6px;
  transition: color var(--ease);
}
.bp-cta-ghost::after { content: "\\2192"; color: var(--honey); transition: transform var(--ease); }
.bp-cta-ghost:hover { color: var(--ink); }
.bp-cta-ghost:hover::after { transform: translateX(3px); }

/* 50/30/20 motif */
.bp-motif { margin-top: 46px; max-width: 420px; }
.bp-motif-bar {
  display: flex; gap: 4px; height: 10px;
}
.bp-motif-seg {
  height: 100%; border-radius: 999px; transform-origin: left;
  transform: scaleX(0); transition: transform 0.9s cubic-bezier(0.2,0.7,0.2,1);
}
.bp-motif.in .bp-motif-seg { transform: scaleX(1); }
.bp-motif-seg.needs { background: var(--ink); }
.bp-motif-seg.wants { background: var(--ink-4); transition-delay: 0.12s; }
.bp-motif-seg.savings { background: var(--coral); transition-delay: 0.24s; }
.bp-motif-labels {
  display: flex; gap: 18px; margin-top: 14px;
  font-size: 12px; color: var(--ink-2);
  opacity: 0; transform: translateY(6px); transition: opacity 0.6s 0.4s, transform 0.6s 0.4s;
}
.bp-motif.in .bp-motif-labels { opacity: 1; transform: none; }
.bp-motif-labels span { display: inline-flex; align-items: center; gap: 6px; }
.bp-motif-labels b { font-family: var(--font-serif); font-weight: 600; color: var(--ink); }
.bp-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.bp-dot.needs { background: var(--ink); }
.bp-dot.wants { background: var(--ink-4); }
.bp-dot.savings { background: var(--coral); }

.bp-scroll {
  position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%);
  width: 38px; height: 38px; border-radius: 50%;
  border: 1px solid var(--line); background: var(--surface); color: var(--ink-2);
  cursor: pointer; font-size: 15px; z-index: 2;
  display: flex; align-items: center; justify-content: center;
  transition: transform var(--ease), border-color var(--ease);
  animation: bp-bob 2.4s ease-in-out infinite;
}
.bp-scroll:hover { border-color: var(--ink-3); }
@keyframes bp-bob { 0%,100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 5px); } }

/* How to use */
.bp-how {
  border-top: 1px solid var(--line);
  padding: clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px);
}
.bp-how-inner { max-width: 760px; margin: 0 auto; }
.bp-section-kicker {
  font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--ink); margin-bottom: 10px;
}
.bp-section-kicker.honey { color: var(--honey); }
.bp-how-sub {
  font-family: var(--font-hand); font-size: 17px; color: var(--ink-2);
  line-height: 1.6; margin-bottom: 34px; letter-spacing: 0.2px;
}
.bp-steps { list-style: none; display: grid; gap: 4px; }
.bp-step {
  display: flex; align-items: flex-start; gap: 18px;
  padding: 18px 4px; border-bottom: 1px solid var(--line);
}
.bp-step:last-child { border-bottom: none; }
.bp-step-num {
  flex: none; width: 28px; height: 28px; border-radius: 50%;
  background: var(--honey-soft); color: var(--honey-600);
  font-family: var(--font-serif); font-weight: 600; font-size: 14px;
  display: flex; align-items: center; justify-content: center; line-height: 1;
}
.bp-step-text { display: flex; flex-direction: column; gap: 3px; }
.bp-step-text b { font-size: 15px; font-weight: 600; color: var(--ink); }
.bp-step-text span { font-size: 14px; color: var(--ink-2); line-height: 1.55; }

/* Tool wrapper */
.bp-tool { border-top: 1px solid var(--line); }

/* Subscribe */
.bp-sub {
  padding: clamp(56px, 8vw, 100px) clamp(24px, 6vw, 80px);
  display: flex; justify-content: center;
}
.bp-sub-card {
  max-width: 540px; width: 100%; text-align: center;
  background: var(--surface); border: 1px solid var(--line-2);
  border-radius: 20px; padding: clamp(32px, 5vw, 48px);
  box-shadow: 0 14px 34px -22px rgba(70, 55, 25, 0.3);
}
.bp-sub-title {
  font-family: var(--font-serif); font-weight: 600;
  font-size: clamp(24px, 3.4vw, 32px); line-height: 1.12; letter-spacing: -0.6px;
  color: var(--ink); margin: 6px 0 14px;
}
.bp-sub-body {
  font-family: var(--font-hand); font-size: 16px; color: var(--ink-2);
  line-height: 1.7; margin: 0 auto 28px; max-width: 40ch; letter-spacing: 0.2px;
}
.bp-sub-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.bp-cta-ghost.dark {
  border: 1px solid var(--line); border-radius: var(--r-sm);
  padding: 14px 22px; color: var(--ink);
}
.bp-cta-ghost.dark::after { content: ""; }
.bp-cta-ghost.dark:hover { border-color: var(--ink-3); }

@media (max-width: 560px) {
  .bp-hero-inner { max-width: none; }
  .bp-motif-labels { gap: 14px; font-size: 11.5px; flex-wrap: wrap; }
}
@media (prefers-reduced-motion: reduce) {
  .bp-scroll { animation: none; }
  .bp-motif-seg, .bp-motif-labels { transition: none; }
}
`;
