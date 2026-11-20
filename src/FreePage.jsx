// ─────────────────────────────────────────────────────
//  FreePage.jsx — /free 免费资源
//  Hero · 最新一份（PDF 清单主卡 + 12/1 上线提醒）· 免费小工具
//
//  以后加新资源：在 RESOURCES 里加一条（最新的放第一条，
//  第一条会用大卡片展示，其余用小卡片），文件放 public/free/。
// ─────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import EditorialLines from "./EditorialLines.jsx";
import { tr } from "./i18n.jsx";

// 视频上线后，把 YouTube 链接填进 videoUrl，「看配套视频」按钮会自动出现
const RESOURCES = [
  {
    id: "year-end-checklist",
    file: "/free/year-end-money-checklist.pdf",
    downloadName: "年底个人财务整理清单.pdf",
    cover: "/free/year-end-checklist-cover.webp",
    videoUrl: null,
    title: { zh: "年底个人财务整理清单", en: "Year-End Money Checklist" },
    video: {
      zh: "配套视频：2027 年前，一定要完成的 9 件事",
      en: "Companion to the video: 9 things to finish before 2027",
    },
    lines: [
      { zh: "一页纸，视频里的 9 件事都在上面。", en: "One page with all 9 steps from the video." },
      { zh: "对照着看，做完一项，就勾一项。", en: "Watch along and tick them off as you go." },
    ],
    parts: [
      { icon: "/free/part-cash.webp", n: { zh: "第一部分", en: "Part 1" }, t: { zh: "把钱理清楚", en: "Get your money straight" }, steps: "Step 1–3" },
      { icon: "/free/part-flag.webp", n: { zh: "第二部分", en: "Part 2" }, t: { zh: "把目标想清楚", en: "Get your goals straight" }, steps: "Step 4–6" },
      { icon: "/free/part-robot.webp", n: { zh: "第三部分", en: "Part 3" }, t: { zh: "开始动手", en: "Get it done" }, steps: "Step 7–9" },
    ],
    meta: { zh: "PDF · 1 页 · 2.6 MB · 简体中文", en: "PDF · 1 page · 2.6 MB · in Chinese" },
    note: { zh: "打印出来贴在桌上，做完一项勾一项。", en: "Print it, pin it, tick it off." },
  },
];

const TOOLS = [
  {
    path: "/budget",
    tag: { zh: "个人财务", en: "Money" },
    title: { zh: "50 / 30 / 20 测算表", en: "50 / 30 / 20 Budget Tool" },
    desc: {
      zh: "五分钟，看清你的钱都花在了哪儿。",
      en: "Five minutes to see how your money splits between needs, wants and savings.",
    },
  },
  {
    path: "/creator-money",
    tag: { zh: "副业", en: "Side income" },
    title: { zh: "副业钱管家", en: "Side-Income Money Check" },
    desc: {
      zh: "收入是入水口，支出是出水口，两手都要硬。",
      en: "Income is the inlet and spending is the outlet. You need control of both.",
    },
  },
  {
    path: "/weekly-focus",
    tag: { zh: "效率", en: "Focus" },
    title: { zh: "本周专注壁纸生成器", en: "Weekly Focus Wallpaper" },
    desc: {
      zh: "把本周最重要的三件事，做成每天都能看见的手机或电脑壁纸。",
      en: "Turn this week's three priorities into a wallpaper you see every day.",
    },
  },
  {
    path: "/life-in-weeks",
    tag: { zh: "人生", en: "Life" },
    title: { zh: "人生周历", en: "Life in Weeks" },
    desc: {
      zh: "把 90 年摊成 4,680 个星期，看看接下来的时间想留给什么。",
      en: "Lay out 90 years as 4,680 weeks, then decide what the time ahead is for.",
    },
  },
];

const T = {
  tag: { zh: "免费资源", en: "Free resources" },
  eyebrow: { zh: "免费 · 不用注册 · 拿走就能用", en: "Free · No signup · Take what helps" },
  h1a: { zh: "免费的东西，", en: "Free stuff," },
  h1b: { zh: "都放这儿了。", en: "all in one place." },
  sub: [
    { zh: "我做视频时整理的清单、表格和小工具，", en: "Checklists, sheets and small tools I make alongside my videos." },
    { zh: "全部免费。以后做了新的，也会先放在这里。", en: "All free. New ones land here first." },
  ],
  latest: { zh: "最新", en: "New" },
  free: { zh: "免费", en: "Free" },
  download: { zh: "免费下载 PDF", en: "Download free PDF" },
  open: { zh: "直接打开看", en: "Open in browser" },
  watch: { zh: "看配套视频", en: "Watch the video" },
  cfoBadge: { zh: "12 月 1 日上线", en: "Launching Dec 1" },
  cfoTitle: { zh: "我的个人财务总监", en: "My Personal CFO" },
  cfoText: [
    { zh: "清单上没做完的，那天咱们一起做：30\u00a0天个人财务大扫除。", en: "Whatever's left on the list, we'll do together: a 30-day money clean-up." },
    { zh: "留个邮箱，上线那天提醒你。", en: "Leave your email and I'll tell you the day it's live." },
  ],
  emailPh: { zh: "你的邮件地址", en: "Your email address" },
  remind: { zh: "上线提醒我", en: "Remind me" },
  fine: {
    zh: "会同时订阅我的 Newsletter，每月两篇，随时退订。",
    en: "You'll also join my newsletter. Two emails a month, unsubscribe anytime.",
  },
  ok: { zh: "✓ 好了，12 月 1 日见。", en: "✓ Done. See you on Dec 1." },
  err: { zh: "出错了，请稍后再试", en: "Something went wrong, try again" },
  toolsTitle: { zh: "免费小工具", en: "Free tools" },
  toolsSub: { zh: "打开网页就能用。", en: "Open in your browser and go." },
  use: { zh: "免费使用", en: "Use free" },
  home: { zh: "回到主页", en: "Back to home" },
  foot: { zh: "新加坡出品 · 靠南洋咖啡供能。", en: "Made in Singapore, fueled by Nanyang kopi." },
};

function RemindForm({ lang }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | success | error

  async function onSubmit(e) {
    e.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "free-checklist" }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "success") return <p className="frx-ok">{tr(T.ok, lang)}</p>;

  return (
    <div className="frx-formwrap">
      <form className="frx-form" onSubmit={onSubmit}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
          placeholder={tr(T.emailPh, lang)}
          aria-label={tr(T.emailPh, lang)}
        />
        <button type="submit" disabled={state === "loading"}>
          {state === "loading" ? "…" : tr(T.remind, lang)}
        </button>
      </form>
      {state === "error" && <p className="frx-err">{tr(T.err, lang)}</p>}
      <p className="frx-fine">{tr(T.fine, lang)}</p>
    </div>
  );
}

function Featured({ item, lang }) {
  return (
    <article className="frx-feature">
      <div className="frx-feature-grid">
        <div className="frx-cover-col">
          <a className="frx-cover" href={item.file} target="_blank" rel="noopener">
            <img src={item.cover} alt={tr(item.title, lang)} width="960" height="1357" />
            <span className="frx-sticker">{tr(T.free, lang)}<br />PDF</span>
          </a>
          <p className="frx-note">{tr(item.note, lang)}</p>
        </div>

        <div className="frx-info">
          <div className="frx-badges">
            <span className="frx-new">{tr(T.latest, lang)}</span>
            <span className="frx-video">{tr(item.video, lang)}</span>
          </div>
          <h2 className="frx-h2">{tr(item.title, lang)}</h2>
          <EditorialLines className="frx-lines" lines={item.lines.map((l) => tr(l, lang))} />

          <ul className="frx-parts">
            {item.parts.map((p) => (
              <li key={p.steps}>
                <img src={p.icon} alt="" />
                <span className="frx-part-n">{tr(p.n, lang)}</span>
                <span className="frx-part-t">{tr(p.t, lang)}</span>
                <span className="frx-part-s">{p.steps}</span>
              </li>
            ))}
          </ul>

          <div className="frx-btns">
            <a className="frx-btn-dark" href={item.file} download={item.downloadName}>
              {tr(T.download, lang)}<span className="frx-arr">↓</span>
            </a>
            <a className="frx-btn-light" href={item.file} target="_blank" rel="noopener">
              {tr(T.open, lang)}
            </a>
            {item.videoUrl && (
              <a className="frx-btn-light" href={item.videoUrl} target="_blank" rel="noopener">
                {tr(T.watch, lang)} <span className="frx-arr">→</span>
              </a>
            )}
          </div>
          <p className="frx-meta">{tr(item.meta, lang)}</p>
        </div>
      </div>

      <div className="frx-cfo">
        <div className="frx-cfo-copy">
          <span className="frx-cfo-badge">{tr(T.cfoBadge, lang)}</span>
          <h3 className="frx-cfo-title">
            {tr(T.cfoTitle, lang)}
            {lang !== "en" && <span className="frx-cfo-en">My Personal CFO</span>}
          </h3>
          <EditorialLines className="frx-cfo-text" lines={T.cfoText.map((l) => tr(l, lang))} />
        </div>
        <RemindForm lang={lang} />
      </div>
    </article>
  );
}

export default function FreePage({ lang, setLang, onBack, onNavigate }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = lang === "en" ? "Free resources · Chaologies" : "免费资源 · Chaologies";
    return () => { document.title = previousTitle; };
  }, [lang]);

  const [latest] = RESOURCES;

  return (
    <div className="frx">
      <style>{CSS}</style>

      <div className="frx-nav">
        <button className="frx-brand" onClick={onBack} aria-label="Home">
          <img src="/logo.png?v=3" alt="Chaologies" className="frx-logo" />
          <span className="frx-tag">{tr(T.tag, lang)}</span>
        </button>
        <div className="frx-lang">
          <button className={lang === "zh" ? "on" : ""} onClick={() => setLang("zh")}>简</button>
          <button className={lang === "tw" ? "on" : ""} onClick={() => setLang("tw")}>繁</button>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </div>

      <header className="frx-hero">
        <div className="frx-eyebrow"><span className="frx-dot" />{tr(T.eyebrow, lang)}</div>
        <h1 className="frx-h1">
          {tr(T.h1a, lang)}<br />
          <span className="frx-h1-u">
            {tr(T.h1b, lang)}
            <svg width="100%" height="14" viewBox="0 0 320 14" preserveAspectRatio="none" aria-hidden="true">
              <path d="M3 9 Q80 2 160 7 T317 6" stroke="var(--honey)" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <EditorialLines className="frx-sub" lines={T.sub.map((l) => tr(l, lang))} />
      </header>

      <main>
        <section className="frx-wrap">
          <Featured item={latest} lang={lang} />
        </section>

        <section className="frx-wrap frx-tools">
          <div className="frx-tools-head">
            <h2 className="frx-tools-title">{tr(T.toolsTitle, lang)}</h2>
            <p className="frx-tools-sub">{tr(T.toolsSub, lang)}</p>
          </div>
          <div className="frx-grid">
            {TOOLS.map((tool) => (
              <a
                key={tool.path}
                className="frx-tool"
                href={tool.path}
                onClick={(e) => { e.preventDefault(); onNavigate(tool.path); }}
              >
                <span className="frx-tool-tag">{tr(tool.tag, lang)}</span>
                <span className="frx-tool-title">{tr(tool.title, lang)}</span>
                <span className="frx-tool-desc">{tr(tool.desc, lang)}</span>
                <span className="frx-tool-go">{tr(T.use, lang)} <span className="frx-arr">→</span></span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="frx-foot">
        <div className="frx-foot-inner">
          <span className="frx-foot-l">{tr(T.foot, lang)}</span>
          <button className="frx-foot-r" onClick={onBack}>← {tr(T.home, lang)}</button>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
.frx { background: var(--paper); color: var(--ink); min-height: 100vh; font-family: var(--font-sans); line-height: 1.5; letter-spacing: -0.01em; }
.frx-arr { color: var(--honey); }

/* NAV */
.frx-nav { max-width: 1180px; margin: 0 auto; padding: 22px 40px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.frx-brand { display: flex; align-items: center; gap: 12px; background: none; border: none; cursor: pointer; padding: 0; }
.frx-logo { height: 34px; width: auto; }
.frx-tag { font-size: 12px; color: var(--ink-300); letter-spacing: 0.04em; white-space: nowrap; }
.frx-lang { display: flex; gap: 2px; background: var(--surface); border: 1px solid var(--line); border-radius: 999px; padding: 3px; }
.frx-lang button { border: none; cursor: pointer; font-family: var(--font-sans); font-size: 12.5px; font-weight: 600; padding: 5px 13px; border-radius: 999px; background: none; color: var(--ink-300); transition: all .15s; }
.frx-lang button.on { background: var(--honey); color: #fff; }

/* HERO */
.frx-hero { max-width: 1180px; margin: 0 auto; padding: 34px 40px 34px; }
.frx-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-300); margin-bottom: 22px; }
.frx-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--honey); }
.frx-h1 { font-family: var(--font-serif); font-size: 58px; font-weight: 600; line-height: 1.06; letter-spacing: -1.6px; margin: 0 0 24px; text-wrap: balance; }
.frx-h1-u { position: relative; white-space: nowrap; }
.frx-h1-u svg { position: absolute; left: 0; bottom: -6px; width: 100%; height: 12px; }
.frx-sub { font-size: 17px; line-height: 1.7; color: var(--ink-500); max-width: 40em; --editorial-line-gap: .1em; }

/* FEATURED */
.frx-wrap { max-width: 1180px; margin: 0 auto; padding: 0 40px; }
.frx-feature { background: var(--surface); border: 1px solid var(--line-2); border-radius: 24px; overflow: hidden; box-shadow: 0 24px 50px -38px rgba(70,55,25,.45); }
.frx-feature-grid { display: grid; grid-template-columns: 0.82fr 1.18fr; gap: clamp(32px, 5vw, 64px); padding: clamp(28px, 4vw, 52px); align-items: center; }
.frx-cover-col { display: flex; flex-direction: column; align-items: center; }
.frx-cover { position: relative; display: block; width: 100%; max-width: 360px; transform: rotate(-2.4deg); transition: transform var(--ease); }
.frx-cover:hover { transform: rotate(-1deg) translateY(-4px); }
.frx-cover img { width: 100%; height: auto; border-radius: 6px; border: 1px solid var(--line); box-shadow: 0 2px 0 rgba(255,255,255,.6) inset, 0 26px 44px -22px rgba(70,55,25,.55), 0 6px 14px -8px rgba(70,55,25,.3); background: #fbf8f1; }
.frx-sticker { position: absolute; right: -18px; top: -16px; width: 74px; height: 74px; border-radius: 50%; background: var(--honey); color: #fff; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 13px; font-weight: 800; line-height: 1.1; letter-spacing: .04em; transform: rotate(12deg); box-shadow: 0 10px 20px -10px rgba(120,80,10,.6); }
.frx-note { font-family: var(--font-hand); font-size: 15px; color: var(--ink-500); margin-top: 26px; text-align: center; transform: rotate(-1deg); }

.frx-badges { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 16px; }
.frx-new { font-size: 10.5px; font-weight: 700; letter-spacing: .08em; color: #fff; background: var(--honey); padding: 4px 11px; border-radius: 999px; }
.frx-video { font-size: 13px; color: var(--ink-400); }
.frx-h2 { font-family: var(--font-serif); font-size: clamp(30px, 3.6vw, 40px); font-weight: 600; line-height: 1.15; letter-spacing: -0.8px; margin: 0 0 16px; }
.frx-lines { font-size: 16.5px; line-height: 1.65; color: var(--ink-500); margin: 0 0 24px; --editorial-line-gap: .05em; }

.frx-parts { list-style: none; margin: 0 0 28px; padding: 0; border-top: 1px dashed var(--line-dashed); }
.frx-parts li { display: grid; grid-template-columns: 40px auto 1fr auto; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px dashed var(--line-dashed); }
.frx-parts img { width: 36px; height: 36px; object-fit: contain; }
.frx-part-n { font-size: 12.5px; color: var(--ink-300); font-weight: 600; white-space: nowrap; }
.frx-part-t { font-size: 16px; font-weight: 700; color: var(--ink); }
.frx-part-s { font-family: var(--font-serif); font-size: 13px; color: var(--ink-400); white-space: nowrap; }

.frx-btns { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.frx-btn-dark { display: inline-flex; align-items: center; gap: 10px; background: var(--ink); color: #fff; border-radius: 11px; padding: 15px 26px; font-size: 15px; font-weight: 600; white-space: nowrap; transition: background .15s, transform .15s; }
.frx-btn-dark:hover { background: #000; transform: translateY(-1px); }
.frx-btn-light { display: inline-flex; align-items: center; gap: 8px; background: var(--surface); color: var(--ink); border: 1px solid var(--line); border-radius: 11px; padding: 14px 20px; font-size: 15px; font-weight: 600; white-space: nowrap; transition: border-color .15s; }
.frx-btn-light:hover { border-color: var(--ink-300); }
.frx-meta { font-size: 12.5px; color: var(--ink-300); margin-top: 14px; }

/* CFO reminder strip */
.frx-cfo { display: grid; grid-template-columns: minmax(0, 1fr) minmax(300px, 420px); gap: 20px 48px; align-items: center; padding: 28px clamp(28px, 4vw, 52px); background: var(--honey-soft); border-top: 1px solid #eed9aa; }
.frx-cfo-badge { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: .06em; color: #7d5711; border: 1px solid #dfbd70; padding: 3px 10px; border-radius: 999px; margin-bottom: 10px; }
.frx-cfo-title { font-family: var(--font-serif); font-size: 22px; font-weight: 600; letter-spacing: -0.3px; margin: 0 0 6px; display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 10px; }
.frx-cfo-en { font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: #a07a2c; letter-spacing: 0; }
.frx-cfo > * { min-width: 0; }
.frx-cfo-text { font-size: 14.5px; line-height: 1.65; color: var(--ink-700); margin: 0; --editorial-line-gap: 0; word-break: keep-all; overflow-wrap: anywhere; }
.frx-form { display: flex; align-items: center; background: var(--surface); border: 1.5px solid #e6cf97; border-radius: 999px; padding: 5px 5px 5px 18px; }
.frx-form input { flex: 1; min-width: 0; width: 100%; border: none; background: transparent; font: inherit; font-size: 14.5px; color: var(--ink); outline: none; }
.frx-form button { flex-shrink: 0; border: none; cursor: pointer; background: var(--honey); color: #fff; font: inherit; font-size: 14px; font-weight: 700; padding: 10px 18px; border-radius: 999px; white-space: nowrap; transition: background .15s; }
.frx-form button:hover { background: var(--honey-600); }
.frx-form:focus-within { border-color: var(--honey); }
.frx-fine { font-size: 12px; color: #9a7d45; margin: 9px 4px 0; }
.frx-err { font-size: 12px; color: #c0392b; margin: 8px 4px 0; }
.frx-ok { font-size: 16px; font-weight: 700; color: #2a7d4f; }

/* TOOLS */
.frx-tools { padding-top: 64px; padding-bottom: 72px; }
.frx-tools-head { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
.frx-tools-title { font-family: var(--font-serif); font-size: 28px; font-weight: 600; letter-spacing: -0.5px; margin: 0; }
.frx-tools-sub { font-size: 14px; color: var(--ink-400); margin: 0; }
.frx-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.frx-tool { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; background: var(--surface); border: 1px solid var(--line-2); border-radius: var(--r); padding: 22px 24px 20px; transition: transform var(--ease), box-shadow var(--ease), border-color var(--ease); }
.frx-tool:hover { transform: translateY(-3px); box-shadow: var(--lift); border-color: var(--line); }
.frx-tool-tag { font-size: 11px; font-weight: 700; letter-spacing: .06em; color: var(--honey-600); margin-bottom: 4px; }
.frx-tool-title { font-size: 17px; font-weight: 700; color: var(--ink); }
.frx-tool-desc { font-size: 14px; line-height: 1.6; color: var(--ink-500); flex: 1; word-break: keep-all; overflow-wrap: anywhere; }
.frx-tool-go { margin-top: 12px; font-size: 13px; font-weight: 700; color: var(--ink); display: inline-flex; gap: 6px; transition: gap var(--ease); }
.frx-tool:hover .frx-tool-go { gap: 10px; }

/* FOOTER */
.frx-foot { background: var(--surface); border-top: 1px solid var(--line); }
.frx-foot-inner { max-width: 1180px; margin: 0 auto; padding: 26px 40px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
.frx-foot-l { font-family: var(--font-hand); font-size: 14px; color: var(--ink-400); }
.frx-foot-r { border: none; background: none; cursor: pointer; font: inherit; font-size: 13px; color: var(--ink-400); }
.frx-foot-r:hover { color: var(--ink); }

/* RESPONSIVE */
@media (max-width: 900px) {
  .frx-nav, .frx-hero, .frx-wrap, .frx-foot-inner { padding-left: clamp(20px, 5vw, 40px); padding-right: clamp(20px, 5vw, 40px); }
  .frx-h1 { font-size: clamp(40px, 9vw, 58px); }
  .frx-feature-grid { grid-template-columns: 1fr; }
  .frx-cover { max-width: 280px; }
  .frx-cfo { grid-template-columns: minmax(0, 1fr); }
  .frx-tools { padding-top: 48px; padding-bottom: 56px; }
}
@media (max-width: 560px) {
  .frx-tag { display: none; }
  .frx-hero { padding-top: 22px; }
  .frx-sub { font-size: 16px; }
  .frx-cover { max-width: 230px; }
  .frx-sticker { width: 62px; height: 62px; font-size: 12px; right: -12px; }
  .frx-parts li { grid-template-columns: 34px 1fr auto; row-gap: 0; }
  .frx-parts img { width: 30px; height: 30px; grid-row: span 2; }
  .frx-part-n { grid-column: 2; }
  .frx-part-t { grid-column: 2; }
  .frx-part-s { grid-column: 3; grid-row: 1 / span 2; }
  .frx-btns > a { flex: 1 1 auto; justify-content: center; }
  .frx-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .frx-cover, .frx-tool, .frx-btn-dark { transition: none; }
}
`;
