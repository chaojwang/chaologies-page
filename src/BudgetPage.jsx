// ─────────────────────────────────────────────────────
//  BudgetPage.jsx — /budget landing (Chaologies design system)
//  Nav · Hero (number hook) · How-to · BudgetTool · Money-OS CTA
//
//  Ported from the Claude Design handoff "Budget Tool.dc.html"
//  (Hero variant A + how-to shown). Language follows the app-level
//  `lang` prop; the interactive tool lives in BudgetTool.jsx.
// ─────────────────────────────────────────────────────

import { useState } from "react";
import BudgetTool from "./BudgetTool.jsx";
import SubscribeModal from "./SubscribeModal.jsx";
import { tr as trBase } from "./i18n.jsx";

// 位置参数保持不变；繁体由 i18n 运行时转换
const tr = (lang, zh, en) => trBase({ zh, en }, lang);

// "Money OS" is the through-line of the whole page — make it pop wherever it appears.
function moneyOS(text) {
  return String(text).split("Money OS").flatMap((part, i) =>
    i === 0 ? [part] : [<span key={i} className="bpx-moneyos">Money OS</span>, part]
  );
}

const PLAN_ITEMS = [
  { zh: "每天一步的行动清单", en: "A day-by-day action plan", dzh: "连续 7 天，每天只做一件事，不再卡在「先干嘛」。", den: 'One small step a day for a week — never freeze on "where do I start".' },
  { zh: "自由支配预算表", en: "The Freedom Spending Plan", dzh: "一张表，让你花得不愧疚，又照样存得下钱。", den: "A sheet that lets you spend guilt-free while still saving." },
  { zh: "应急金计算器", en: "Emergency-fund calculator", dzh: "算清你到底需要多少，几周补齐，而不是熬几年。", den: "Know exactly how much you need — and get there in weeks, not years." },
  { zh: "还有一些小彩蛋", en: "Plus a few bonuses", dzh: "额外的模板和资源，悄悄送你。", den: "Extra templates and resources, on the house." },
];

export default function BudgetPage({ lang, setLang, onBack, onNavigate }) {
  const [wechatOpen, setWechatOpen] = useState(false);

  const onStart = () => {
    const el = document.getElementById("tool");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 18, behavior: "smooth" });
  };

  const c = {
    tag: tr(lang, "50 / 30 / 20 预算工具", "50 / 30 / 20 Budget Tool"),
    aEyebrow: tr(lang, "免费 · 不用注册 · 5 分钟", "Free · No signup · 5 min"),
    aTitle1: tr(lang, "五分钟，", "See where"),
    aTitle2: tr(lang, "看清你的钱途。", "your money flows."),
    aSub: tr(lang, "这是「Money OS · 普通人的金钱操作系统」的第一步。", "The first step of the Money OS — a money operating system for normal people."),
    ctaStart: tr(lang, "开始填，5 分钟搞定", "Start — 5 minutes"),
    scrollNote: tr(lang, "数据只留在你的浏览器里", "Your data stays in your browser"),
    exTitle: tr(lang, "你的一个月，大概长这样 ↓", "A month, roughly ↓"),
    exInc: tr(lang, "收入", "In"), exNeed: tr(lang, "必要", "Needs"), exWant: tr(lang, "想要", "Wants"), exSave: tr(lang, "储蓄", "Save"),
    exResL: tr(lang, "你能存下", "You keep"),
    exFreeL: tr(lang, "离财务自由", "To financial freedom"),
    exCap: tr(lang, "这是示例。往下填，换成你自己的数字。", "That's a sample. Scroll down and make it yours."),
    htTitle: tr(lang, "三步，把模糊的「感觉」变成清楚的行动", "Three steps: turn a vague feeling into clear action"),
    s1t: tr(lang, "填", "Fill"),
    s1lead: tr(lang, "收入、必要、想要、储蓄，四类如实填。", "Income, needs, wants, savings — fill all four honestly."),
    s1detail: tr(lang, "记不清就估个大概，先有数字比精确更重要。", "Rough estimates beat blank cells — a number down beats being exact."),
    s2t: tr(lang, "看", "See"),
    s2lead: tr(lang, "右边自动算出储蓄率、每月结余，", "The right side instantly shows your save rate and what's left,"),
    s2detail: tr(lang, "和离 50 / 30 / 20 还差多少——一眼看懂。", "plus how far you are from 50 / 30 / 20 — clear at a glance."),
    s3t: tr(lang, "调", "Tune"),
    s3lead: tr(lang, "不用一步到位。", "No need to nail it at once."),
    s3detail: tr(lang, "每个月把一个数字往好的方向挪一点点，就是进步。", "Each month, nudge one number the right way — that's progress."),
    htReassure: tr(lang, "不上传、不注册——关掉页面就没了！所以记得到下面导出存底哦。", "Nothing uploaded, no signup — close the tab and it's gone! So remember to export a copy below."),
    ctaKicker: tr(lang, "上面这张表，只是 Money OS 的第一步。", "That table above? Just step one of the Money OS."),
    ctaTitle: tr(lang, "看清钱途之后，\n咱们唠点深的。", "Once you can see it,\nlet's talk deeper."),
    ctaSub: tr(lang, "订阅后先收到一份「免费 7 天个人财务管理计划」，再加上每月两篇关于金钱、极简和自由的长文。", "Subscribe and you'll get a free 7-day personal-money plan first, plus two essays a month on money, minimalism, and freedom."),
    ctaPrimary: tr(lang, "免费领 7 天计划", "Get the free 7-day plan"),
    ctaSecondary: tr(lang, "关注公众号", "WeChat"),
    ctaFine: tr(lang, "一封邮件，随时退订。不卖课，不催你。", "One email. Unsubscribe anytime. No hard sell."),
    planLabel: tr(lang, "Free · 7 天个人财务管理计划", "Free · 7-Day Money Plan"),
    planInsideL: tr(lang, "里面有什么", "What's inside"),
    footL: tr(lang, "新加坡出品 · 靠南洋咖啡供能。", "Made in Singapore, fueled by Nanyang kopi."),
  };

  const planItems = PLAN_ITEMS.map((p) => ({ title: tr(lang, p.zh, p.en), desc: tr(lang, p.dzh, p.den) }));

  return (
    <div className="bpx">
      <style>{CSS}</style>

      {/* ══ NAV ══ */}
      <div className="bpx-nav">
        <button className="bpx-brand" onClick={onBack} aria-label="Home">
          <img src="/logo.png?v=3" alt="Chaologies" className="bpx-logo" />
          <span className="bpx-tag">{c.tag}</span>
        </button>
        <div className="bpx-lang">
          <button className={lang === "zh" ? "on" : ""} onClick={() => setLang("zh")}>简</button>
          <button className={lang === "tw" ? "on" : ""} onClick={() => setLang("tw")}>繁</button>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </div>

      {/* ══ HERO — number hook ══ */}
      <div className="bpx-hero">
        <div className="bpx-hero-copy">
          <div className="bpx-eyebrow"><span className="bpx-eyebrow-dot" />{c.aEyebrow}</div>
          <h1 className="bpx-h1">
            {c.aTitle1}<br />
            <span className="bpx-h1-underline">
              {c.aTitle2}
              <svg width="100%" height="14" viewBox="0 0 320 14" preserveAspectRatio="none" className="bpx-underline-svg">
                <path d="M3 9 Q80 2 160 7 T317 6" stroke="var(--honey)" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="bpx-sub">{moneyOS(c.aSub)}</p>
          <div className="bpx-hero-cta">
            <button className="bpx-btn-dark" onClick={onStart}>{c.ctaStart}<span className="bpx-arr">↓</span></button>
            <span className="bpx-scrollnote">{c.scrollNote}</span>
          </div>
        </div>

        {/* napkin sketch (sample) */}
        <div className="bpx-napkin-wrap">
          <div className="bpx-napkin">
            <div className="bpx-napkin-title">{c.exTitle}</div>
            <div className="bpx-nrow">
              <span className="bpx-ndot" style={{ background: "#1c1915" }} />
              <span className="bpx-nlabel">{c.exInc}</span>
              <div className="bpx-ntrack solid" />
              <span className="bpx-nval">¥18,000</span>
            </div>
            <div className="bpx-nrow">
              <span className="bpx-ndot" style={{ background: "#3a352e" }} />
              <span className="bpx-nlabel">{c.exNeed}</span>
              <div className="bpx-ntrack"><div className="bpx-nfill" style={{ width: "50%", background: "#3a352e" }} /></div>
              <span className="bpx-nval muted">50%</span>
            </div>
            <div className="bpx-nrow">
              <span className="bpx-ndot" style={{ background: "#f4845f" }} />
              <span className="bpx-nlabel">{c.exWant}</span>
              <div className="bpx-ntrack"><div className="bpx-nfill" style={{ width: "28%", background: "#f4845f" }} /></div>
              <span className="bpx-nval muted">28%</span>
            </div>
            <div className="bpx-nrow" style={{ marginBottom: 18 }}>
              <span className="bpx-ndot" style={{ background: "var(--honey)" }} />
              <span className="bpx-nlabel">{c.exSave}</span>
              <div className="bpx-ntrack"><div className="bpx-nfill" style={{ width: "22%", background: "var(--honey)" }} /></div>
              <span className="bpx-nval muted">22%</span>
            </div>
            <div className="bpx-napkin-foot">
              <div className="bpx-keep">
                <div className="bpx-keep-l">{c.exResL}</div>
                <div className="bpx-keep-numwrap">
                  <span className="bpx-keep-num">22%</span>
                  <svg width="86" height="10" viewBox="0 0 86 10" className="bpx-keep-underline"><path d="M2 6 Q22 2 43 6 T84 5" stroke="var(--honey)" strokeWidth="3.5" fill="none" strokeLinecap="round" /></svg>
                </div>
              </div>
              <div className="bpx-free-row">
                <span className="bpx-free-l">{c.exFreeL}</span>
                <div className="bpx-free-circ">
                  <span className="bpx-free-num">35%</span>
                </div>
              </div>
              <div className="bpx-free-track">
                <div className="bpx-free-fill" style={{ width: "35%" }} />
                <img src="/air.png" alt="" className="bpx-free-plane" style={{ left: "35%" }} />
              </div>
            </div>
          </div>
          <div className="bpx-napkin-cap">{c.exCap}</div>
        </div>
      </div>

      {/* ══ HOW TO ══ */}
      <div className="bpx-howto-wrap">
        <div className="bpx-howto">
          <div className="bpx-howto-head">
            <h2 className="bpx-howto-title">{c.htTitle}</h2>
          </div>
          <div className="bpx-steps">
            <div className="bpx-step">
              <div className="bpx-step-ic" style={{ transform: "rotate(-3deg)" }}>
                <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 23 Q7 12 9 10 Q19 8 28 9.5 Q30 16 29 27 Q19 30 11 28.5 Q8 27 8 23Z" /><path d="M30.5 8.5 l4 4 -11 11 -5.2 1.2 1.2 -5.2z" fill="#f7eacf" stroke="var(--honey)" /></svg>
              </div>
              <div className="bpx-step-body">
                <div className="bpx-step-h"><span className="bpx-step-t">{c.s1t}</span><span className="bpx-step-n">01</span></div>
                <p className="bpx-step-lead">{c.s1lead}</p>
                <p className="bpx-step-d">{c.s1detail}</p>
              </div>
            </div>
            <div className="bpx-step">
              <div className="bpx-step-ic" style={{ transform: "rotate(2.5deg)" }}>
                <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20 Q20 7 36 20 Q20 33 4 20Z" /><circle cx="20" cy="20" r="6" fill="#f7eacf" stroke="var(--honey)" /></svg>
              </div>
              <div className="bpx-step-body">
                <div className="bpx-step-h"><span className="bpx-step-t">{c.s2t}</span><span className="bpx-step-n">02</span></div>
                <p className="bpx-step-lead">{c.s2lead}</p>
                <p className="bpx-step-d">{c.s2detail}</p>
              </div>
            </div>
            <div className="bpx-step">
              <div className="bpx-step-ic" style={{ transform: "rotate(-2deg)" }}>
                <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="14" x2="32" y2="14" /><circle cx="25" cy="14" r="4.5" fill="#f7eacf" stroke="var(--honey)" /><line x1="8" y1="26" x2="32" y2="26" /><circle cx="14" cy="26" r="4.5" fill="#f7eacf" stroke="var(--honey)" /></svg>
              </div>
              <div className="bpx-step-body">
                <div className="bpx-step-h"><span className="bpx-step-t">{c.s3t}</span><span className="bpx-step-n">03</span></div>
                <p className="bpx-step-lead">{c.s3lead}</p>
                <p className="bpx-step-d">{c.s3detail}</p>
              </div>
            </div>
          </div>
          <div className="bpx-reassure"><span className="bpx-reassure-star">✦</span>{c.htReassure}</div>
        </div>
      </div>

      {/* ══ THE TOOL ══ */}
      <BudgetTool lang={lang === "tw" ? "zh" : lang} />

      {/* ══ CTA — Money OS step 1 ══ */}
      <div className="bpx-cta-band">
        <div className="bpx-cta">
          <div className="bpx-cta-copy">
            <div className="bpx-cta-kicker">
              <svg width="48" height="40" viewBox="0 0 48 40" fill="none" stroke="var(--honey)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bpx-cta-arrow"><path d="M8 38 Q5 14 26 9 Q37 6.5 45 10" /><path d="M37 4 l9 5 -5 9" /></svg>
              <span className="bpx-cta-kicker-t">{moneyOS(c.ctaKicker)}</span>
            </div>
            <h2 className="bpx-cta-title">{c.ctaTitle}</h2>
            <p className="bpx-cta-sub">{c.ctaSub}</p>
            <div className="bpx-cta-btns">
              <a href="/newsletter" onClick={(e) => { e.preventDefault(); onNavigate?.("/newsletter"); }} className="bpx-btn-dark">{c.ctaPrimary}<span className="bpx-arr-r">→</span></a>
              <button className="bpx-btn-wechat" onClick={() => setWechatOpen(true)}>
                <img src="/icons/wechat.png" alt="" className="bpx-wechat-ic" />{c.ctaSecondary}
              </button>
            </div>
            <div className="bpx-cta-fine">{c.ctaFine}</div>
          </div>

          {/* 7-day plan tease */}
          <div className="bpx-plan">
            <div className="bpx-plan-top">
              <div>
                <div className="bpx-plan-badge">{c.planLabel}</div>
                <div className="bpx-plan-inside">{c.planInsideL}</div>
              </div>
              <img src="/air.png" alt="" className="bpx-plan-plane" />
            </div>
            <div className="bpx-plan-list">
              {planItems.map((d, i) => (
                <div className="bpx-plan-item" key={i}>
                  <span className="bpx-plan-check">✓</span>
                  <div><div className="bpx-plan-item-t">{d.title}</div><div className="bpx-plan-item-d">{d.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <div className="bpx-foot">
        <div className="bpx-foot-inner">
          <span className="bpx-foot-l">{c.footL}</span>
          <span className="bpx-foot-r">Chaologies · 超说</span>
        </div>
      </div>

      {wechatOpen && <SubscribeModal lang={lang} onClose={() => setWechatOpen(false)} />}
    </div>
  );
}

// ── styles (design-system tokens from index.css) ─────
const CSS = `
.bpx { background: var(--paper); color: var(--ink); min-height: 100vh; line-height: 1.5; letter-spacing: -0.01em; }
.bpx { font-family: var(--font-sans); }
@keyframes bpx-floaty { 0%,100% { transform: translateY(0) rotate(-1.4deg); } 50% { transform: translateY(-7px) rotate(-1.4deg); } }

/* NAV */
.bpx-nav { max-width: 1180px; margin: 0 auto; padding: 22px 40px; display: flex; align-items: center; justify-content: space-between; }
.bpx-brand { display: flex; align-items: center; gap: 12px; background: none; border: none; cursor: pointer; padding: 0; }
.bpx-logo { height: 34px; width: auto; }
.bpx-tag { font-size: 12px; color: var(--ink-300); letter-spacing: 0.04em; white-space: nowrap; }
.bpx-lang { display: flex; gap: 2px; background: var(--surface); border: 1px solid var(--line); border-radius: 999px; padding: 3px; }
.bpx-lang button { border: none; cursor: pointer; font-family: var(--font-sans); font-size: 12.5px; font-weight: 600; padding: 5px 13px; border-radius: 999px; background: none; color: var(--ink-300); transition: all .15s; }
.bpx-lang button.on { background: var(--honey); color: #fff; }

/* HERO */
.bpx-hero { max-width: 1180px; margin: 0 auto; padding: 30px 40px 18px; display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 60px; align-items: center; }
.bpx-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-300); margin-bottom: 22px; }
.bpx-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--honey); }
.bpx-h1 { font-family: var(--font-serif); font-size: 58px; font-weight: 600; line-height: 1.04; letter-spacing: -1.6px; margin: 0 0 22px; }
.bpx-h1-underline { position: relative; white-space: nowrap; }
.bpx-underline-svg { position: absolute; left: 0; bottom: -6px; width: 100%; height: 12px; }
.bpx-sub { font-size: 17px; line-height: 1.7; color: var(--ink-500); max-width: 42ch; margin: 0 0 30px; }
.bpx-moneyos { font-family: var(--font-serif); font-weight: 600; color: var(--honey); font-style: normal; white-space: nowrap; }
.bpx-hero-cta { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
.bpx-btn-dark { display: inline-flex; align-items: center; gap: 10px; background: var(--ink); color: #fff; border: none; border-radius: 11px; padding: 15px 26px; font-family: var(--font-sans); font-size: 15px; font-weight: 600; cursor: pointer; white-space: nowrap; text-decoration: none; transition: background .15s; }
.bpx-btn-dark:hover { background: #000; }
.bpx-arr { color: var(--honey); }
.bpx-arr-r { color: var(--honey); }
.bpx-scrollnote { font-size: 13px; color: var(--ink-300); }

/* napkin sketch */
.bpx-napkin-wrap { position: relative; }
.bpx-napkin { background: var(--surface); border: 1.5px solid var(--ink); border-radius: 20px; padding: 24px 26px 22px; animation: bpx-floaty 6s ease-in-out infinite; box-shadow: 0 22px 46px -24px rgba(70,55,25,.45); }
.bpx-napkin-title { font-family: var(--font-hand); font-size: 15px; color: var(--ink-500); margin-bottom: 18px; letter-spacing: 0.2px; }
.bpx-nrow { display: flex; align-items: center; gap: 11px; margin-bottom: 13px; }
.bpx-ndot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.bpx-nlabel { width: 48px; font-size: 13px; color: var(--ink-700); }
.bpx-ntrack { flex: 1; height: 9px; border-radius: 5px; background: var(--line-2); }
.bpx-ntrack.solid { background: #1c1915; }
.bpx-nfill { height: 100%; border-radius: 5px; }
.bpx-nval { font-family: var(--font-serif); font-size: 14px; width: 64px; text-align: right; }
.bpx-nval.muted { color: var(--ink-500); }
.bpx-napkin-foot { border-top: 1.5px dashed var(--line); padding-top: 16px; }
.bpx-keep { margin-bottom: 15px; }
.bpx-keep-l { font-family: var(--font-hand); font-size: 14px; color: var(--ink-500); }
.bpx-keep-numwrap { position: relative; display: inline-block; }
.bpx-keep-num { font-family: var(--font-serif); font-size: 40px; font-weight: 600; letter-spacing: -1px; }
.bpx-keep-underline { position: absolute; left: 0; bottom: -3px; }
.bpx-free-row { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 11px; }
.bpx-free-l { font-family: var(--font-hand); font-weight: 700; font-size: 24px; color: var(--ink-700); letter-spacing: 0.5px; line-height: 1; }
.bpx-free-circ { position: relative; padding: 3px 10px; }
.bpx-free-num { font-family: var(--font-hand); font-weight: 700; font-size: 26px; color: var(--honey); line-height: 1; }
.bpx-free-track { position: relative; height: 8px; background: var(--line-2); border-radius: 5px; }
.bpx-free-fill { position: absolute; left: 0; top: 0; height: 100%; border-radius: 5px; background: var(--honey); }
.bpx-free-plane { position: absolute; top: -12px; transform: translateX(-50%); width: 24px; height: auto; }
.bpx-napkin-cap { font-family: var(--font-hand); font-size: 13.5px; color: var(--ink-300); text-align: center; margin-top: 18px; letter-spacing: 0.2px; }

/* HOW TO */
.bpx-howto-wrap { padding: 24px 40px 56px; display: flex; align-items: center; justify-content: center; }
.bpx-howto { width: 100%; max-width: 1100px; margin: 0 auto; background: var(--surface); border: 1px solid var(--line-2); border-radius: 24px; padding: clamp(40px, 5vw, 68px); }
.bpx-howto-head { margin-bottom: clamp(36px, 5vw, 52px); }
.bpx-howto-title { font-family: var(--font-serif); font-size: clamp(28px, 3.4vw, 36px); font-weight: 600; letter-spacing: -0.6px; margin: 0; line-height: 1.18; max-width: 24ch; }
.bpx-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(30px, 4vw, 54px); }
.bpx-step { display: flex; flex-direction: column; gap: 18px; align-items: flex-start; }
.bpx-step-ic { flex-shrink: 0; width: 60px; height: 60px; border: 1.5px solid var(--ink); border-radius: 16px; display: flex; align-items: center; justify-content: center; background: var(--surface); }
.bpx-step-h { display: flex; align-items: baseline; gap: 10px; margin-bottom: 12px; }
.bpx-step-t { font-size: 23px; font-weight: 600; }
.bpx-step-n { font-size: 12px; color: var(--ink-300); font-weight: 600; }
.bpx-step-lead { font-size: 16px; font-weight: 600; color: var(--ink-700); line-height: 1.55; margin: 0 0 8px; }
.bpx-step-d { font-size: 15px; color: var(--ink-400); line-height: 1.6; margin: 0; }
.bpx-reassure { margin-top: clamp(36px, 5vw, 52px); padding-top: 24px; border-top: 1px solid var(--line-2); font-size: 14px; color: var(--ink-400); display: flex; align-items: flex-start; gap: 9px; line-height: 1.6; }
.bpx-reassure-star { color: var(--honey); flex-shrink: 0; }

/* CTA */
.bpx-cta-band { margin-top: 40px; background: var(--surface); border-top: 1px solid var(--line); }
.bpx-cta { max-width: 1180px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 60px; align-items: center; }
.bpx-cta-kicker { display: flex; align-items: flex-start; gap: 11px; margin-bottom: 16px; }
.bpx-cta-arrow { flex-shrink: 0; margin-top: -6px; }
.bpx-cta-kicker-t { font-size: 16px; font-weight: 600; color: var(--ink); line-height: 1.45; }
.bpx-cta-title { font-family: var(--font-serif); font-size: 38px; font-weight: 600; line-height: 1.12; letter-spacing: -0.8px; margin: 0 0 18px; white-space: pre-line; }
.bpx-cta-sub { font-size: 16px; line-height: 1.7; color: var(--ink-500); max-width: 44ch; margin: 0 0 26px; }
.bpx-cta-btns { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.bpx-btn-wechat { display: inline-flex; align-items: center; gap: 9px; background: var(--surface); color: var(--ink); border: 1px solid var(--line); border-radius: 11px; padding: 14px 22px; font-family: var(--font-sans); font-size: 15px; font-weight: 600; white-space: nowrap; cursor: pointer; transition: border-color .15s; }
.bpx-btn-wechat:hover { border-color: var(--ink-300); }
.bpx-wechat-ic { width: 23px; height: 23px; object-fit: contain; }
.bpx-cta-fine { font-size: 12.5px; color: var(--ink-300); margin-top: 14px; font-style: italic; }

/* 7-day plan tease */
.bpx-plan { position: relative; background: var(--paper); border: 1px solid var(--line); border-radius: 20px; padding: 28px 30px; }
.bpx-plan-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 6px; }
.bpx-plan-badge { display: inline-block; font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; color: #fff; background: var(--honey); padding: 4px 11px; border-radius: 999px; margin-bottom: 11px; }
.bpx-plan-inside { font-family: var(--font-hand); font-size: 16px; color: var(--ink-500); }
.bpx-plan-plane { width: 44px; height: auto; opacity: .9; flex-shrink: 0; }
.bpx-plan-list { display: flex; flex-direction: column; gap: 12px; margin-top: 14px; }
.bpx-plan-item { display: flex; gap: 11px; align-items: flex-start; }
.bpx-plan-check { flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%; background: var(--honey); color: #fff; font-size: 11px; display: flex; align-items: center; justify-content: center; margin-top: 1px; }
.bpx-plan-item-t { font-size: 14px; font-weight: 600; color: var(--ink); line-height: 1.4; }
.bpx-plan-item-d { font-size: 12.5px; color: var(--ink-400); line-height: 1.5; margin-top: 2px; }

/* FOOTER */
.bpx-foot { background: var(--surface); border-top: 1px solid var(--line); }
.bpx-foot-inner { max-width: 1180px; margin: 0 auto; padding: 26px 40px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
.bpx-foot-l { font-family: var(--font-hand); font-size: 14px; color: var(--ink-400); }
.bpx-foot-r { font-size: 12px; color: var(--ink-300); }

/* responsive */
@media (max-width: 920px) {
  .bpx-hero { grid-template-columns: 1fr; gap: 36px; padding: 36px clamp(20px,5vw,40px) 24px; }
  .bpx-nav { padding: 20px clamp(20px,5vw,40px); }
  .bpx-h1 { font-size: clamp(40px, 9vw, 58px); }
  .bpx-howto-wrap { padding: 24px clamp(20px,5vw,40px) 8px; }
  .bpx-steps { grid-template-columns: 1fr; gap: 22px; }
  .bpx-howto { padding: 28px clamp(20px,5vw,32px); }
  .bpx-cta { grid-template-columns: 1fr; gap: 40px; padding: 48px clamp(20px,5vw,40px); }
  .bpx-cta-title { font-size: clamp(28px, 7vw, 38px); }
}
@media (prefers-reduced-motion: reduce) {
  .bpx-napkin { animation: none; }
}
@media print {
  .bpx-nav, .bpx-hero, .bpx-howto-wrap, .bpx-cta-band, .bpx-foot, .bpx-lang { display: none !important; }
}
`;
