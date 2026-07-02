import { useState, useEffect } from "react";
import WechatModal from "./WechatModal.jsx";

// ─────────────────────────────────────────────────────
//  ActionBankPage — Business Action Bank · 商业行动银行
//  Landing + waitlist，风格与 NewsletterPage 一致。
// ─────────────────────────────────────────────────────

const COPY = {
  heroEyebrow: { zh: "等待清单 · BUSINESS ACTION BANK", en: "WAITLIST · BUSINESS ACTION BANK" },
  heroT1: { zh: "你和你的第一门生意之间，", en: "Between you and your first business, " },
  heroHL: { zh: "只差一个行动", en: "there's just one action" },
  heroSub: {
    zh: "Business Action Bank · 商业行动银行\n我把 100+ 本商业经典，拆成一条条可以马上执行的启发、练习和真实案例。\n不用再读完一整本书，才敢开始。",
    en: "The Business Action Bank: 100+ business classics, broken down into bite-sized insights, exercises and real examples you can act on today.\nNo more finishing a whole book before you dare to start.",
  },
  heroCta: { zh: "加入等待清单", en: "Join the waitlist" },
  heroFine: {
    zh: "🔒 免费加入。无垃圾邮件。上线当天，你第一个收到。随时退订。",
    en: "🔒 Free to join. No spam. You'll be the first to know when it drops. Unsubscribe anytime.",
  },
  proof: {
    zh: "和 10,000+ 想把想法变成现实的读者，一起等它上线",
    en: "Join 10,000+ readers turning ideas into action",
  },

  probTitle: { zh: "为什么书读了很多，", en: "Why all that reading " },
  probHL: { zh: "生意还没开始？", en: "hasn't become a business" },
  probTag: {
    zh: "启发没有变成行动，就只是更贵的娱乐。",
    en: "Inspiration that never becomes action is just expensive entertainment.",
  },

  storyKicker: { zh: "所以我做了一件事", en: "So I built something" },
  storyTitle: { zh: "一个随取随用的", en: "A bank you can " },
  storyHL: { zh: "「行动银行」", en: "withdraw actions from" },
  storyBody: {
    zh: "过去几年，我读了 100 多本商业书。每读完一本，我都会把真正打动我的点提炼出来，写成三样东西：可行动的启发和例子、我的亲身实践心得、和一个可以马上做的练习。\n\n然后按书、按创业阶段、按行动类型，全部整理进一个 Notion 数据库。\n\n无论你想做更好的内容、创造更好的产品、更理解你的客户，还是更好地推广你的服务——你不需要再读完一本书才能开始。打开它，取出一条，今天就用。",
    en: "Over the past few years I've read 100+ business books. After each one, I distilled what truly moved me into three things: actionable insights with examples, my own first-hand experience, and an exercise you can do right away.\n\nThen I organized everything into one Notion database — by book, by stage of your journey, and by type of action.\n\nWhether you want to create better content, build better products, understand your customers, or market your work — you don't need to finish another book to begin. Open it, withdraw one action, use it today.",
  },

  sampleLabel: { zh: "数据库里的一条，长这样 👇", en: "Here's what one entry looks like 👇" },
  sampleBook: { zh: "《百万美元周末》 Million Dollar Weekend — Noah Kagan", en: "Million Dollar Weekend — Noah Kagan" },
  sampleTagA: { zh: "可行动启发 & 例子", en: "Actionable insight" },
  sampleTagB: { zh: "马上做的练习", en: "Do-it-now exercise" },
  sampleQuote: {
    zh: "别再说「我做 Notion 模板」。改成说「我帮你把混乱的想法，整理成每周都能执行的创作系统」。客户买的从来不是你做什么，而是你帮他解决什么。",
    en: "Stop saying \"I make Notion templates.\" Say \"I help you turn messy ideas into a weekly creative system you can actually run.\" Customers never buy what you do — they buy what you solve.",
  },
  sampleEx: {
    zh: "练习：把你现在的产品或服务，用「我帮你解决____」重写一遍。10 分钟。",
    en: "Exercise: rewrite your current offer as \"I help you solve ____.\" Ten minutes.",
  },

  insideTitle: { zh: "打开这个银行，你会拿到", en: "Inside the " },
  insideHL: { zh: "什么", en: "Action Bank" },
  insideSub: {
    zh: "不是书摘合集。每一条，都回答同一个问题：\n「所以，我现在该做什么？」",
    en: "This is not a book-summary pile. Every single entry answers one question:\n\"So what do I do right now?\"",
  },

  tagTitle: { zh: "按你卡住的地方找行动", en: "Find actions by where you're stuck" },
  tagSub: {
    zh: "30+ 个行动类别。不管你在哪一步，这里都有下一步。",
    en: "30+ action categories. Wherever you are, your next step is in here.",
  },

  forYouTitle: { zh: "这个银行，是为", en: "This bank was opened " },
  forYouHL: { zh: "这样的你开的", en: "for you if…" },
  forYouTag1: { zh: "听起来像你？你不是一个人。", en: "Sound like you? You're not alone." },
  forYouTag2: {
    zh: "想法不值钱，执行才值钱。从第一条行动开始。",
    en: "Ideas are cheap. Execution is everything. Start with one action.",
  },

  finalTitle: { zh: "现在就", en: "Join the " },
  finalHL: { zh: "加入等待清单", en: "waitlist" },
  finalSub: {
    zh: "Business Action Bank 正在做最后的整理。\n现在加入等待清单，上线当天你第一个拿到，还有早鸟专属价格。",
    en: "The Business Action Bank is in its final polish.\nJoin the waitlist now — you'll get it first, at an early-bird price.",
  },
  finalFine: { zh: "♡ 免费加入。无垃圾邮件。随时退订。", en: "♡ Free to join. No spam. Unsubscribe anytime." },
  footerLine: {
    zh: "新加坡出品。靠咖啡，和一摞被拆解得七零八落的商业书供能。",
    en: "Made in Singapore, fueled by kopi and a pile of thoroughly dismantled business books.",
  },
};

const STATS = [
  { n: "100+", zh: "本商业经典", en: "business classics" },
  { n: "30+", zh: "个行动类别", en: "action categories" },
  { n: "1000+", zh: "条可执行启发", en: "actionable insights" },
  { n: "10 min", zh: "每条配套小练习", en: "exercises per entry" },
];

const PROBLEMS = [
  {
    emoji: "📚",
    title: { zh: "读商业书，其实很花时间", en: "Business books take real time" },
    desc: {
      zh: "心法也好，实操也好，都需要时间去消化、应用、转化。一本 300 页的书，真正能改变你的，可能就那几页——但你得先读完 300 页。",
      en: "Mindset or tactics, it all takes time to digest, apply and turn into results. In a 300-page book, maybe a handful of pages will change you — but you have to read all 300 first.",
    },
  },
  {
    emoji: "✍️",
    title: { zh: "读的时候很兴奋，读完就没有然后了", en: "Exciting to read, then… nothing" },
    desc: {
      zh: "画线、标注、收藏、截图……那些让你热血沸腾的故事和金句，大多数停在了笔记里。对你启发最大的那些点，并没有变成现实中的行动。",
      en: "Highlights, notes, bookmarks, screenshots… the stories that fired you up mostly stay in your notes app. The insights that moved you most never became real-world action.",
    },
  },
];

const INSIDE = [
  {
    emoji: "📖",
    title: { zh: "100+ 本商业经典，逐本拆解", en: "100+ business classics, fully dismantled" },
    desc: {
      zh: "从《百万美元周末》到那些你一直想读却没时间读的书。每本书拆成多条独立的行动点，各自归类，随取随用。",
      en: "From Million Dollar Weekend to all the books you've been meaning to read. Each one broken into standalone action points, categorized and ready to use.",
    },
  },
  {
    emoji: "⚡",
    title: { zh: "可行动的启发 & 例子", en: "Actionable insights & examples" },
    desc: {
      zh: "不是书摘。每一条都翻译成「所以我现在该做什么」，并配上真实的例子，让你看完就知道怎么套用到自己身上。",
      en: "Not summaries. Every entry is translated into \"so here's what I do now,\" with real examples so you know exactly how to apply it to your own work.",
    },
  },
  {
    emoji: "🏋️",
    title: { zh: "可以马上做的练习", en: "Do-it-now exercises" },
    desc: {
      zh: "每个点配一个 10 分钟内能完成的小练习。看完这一条，你的生意就比十分钟前更进了一步。",
      en: "Each point comes with an exercise you can finish in ten minutes. Read one entry, and your business is one step further than it was ten minutes ago.",
    },
  },
  {
    emoji: "🧭",
    title: { zh: "三种找法：按书、按阶段、按行动", en: "Three ways in: by book, stage, or action" },
    desc: {
      zh: "想深挖某本书？按书找。刚起步没方向？按创业阶段找。卡在获客或内容上？按行动类型找。你永远能迅速找到现在最需要的那条。",
      en: "Deep-diving one book? Search by book. Just starting out? Browse by stage. Stuck on leads or content? Filter by action type. You'll always find the entry you need right now.",
    },
  },
  {
    emoji: "💬",
    title: { zh: "我的第一手实践心得", en: "My first-hand field notes" },
    desc: {
      zh: "哪些方法我亲自试过、真的有用，哪些坑我已经替你踩过了——每一条都附上我自己的感受和经验。",
      en: "What I've personally tried and what actually worked — plus the mistakes I already made so you don't have to. My honest notes on every entry.",
    },
  },
];

// 类别标签（来自数据库的真实分类）
const TAGS = [
  { zh: "开始的勇气", en: "Courage to Start", c: "#f4845f" },
  { zh: "卡住了 · 需要动力", en: "I'm Stuck & Need Momentum", c: "#e4a11b" },
  { zh: "产品打造", en: "Offers & Product Creation", c: "#5bc8d4" },
  { zh: "产品验证", en: "Product Validation", c: "#b8a9e8" },
  { zh: "营销", en: "Marketing", c: "#e4a11b" },
  { zh: "获客", en: "Leads", c: "#f4845f" },
  { zh: "理解客户", en: "Customers", c: "#5bc8d4" },
  { zh: "内容创作", en: "Content Creation", c: "#b8a9e8" },
  { zh: "销售与金钱", en: "Sales & Money", c: "#e4a11b" },
  { zh: "赢得注意力", en: "Earning Attention", c: "#f4845f" },
  { zh: "自由职业", en: "Freelancing", c: "#5bc8d4" },
  { zh: "时间管理", en: "Time Management", c: "#b8a9e8" },
  { zh: "搭建系统", en: "Systems", c: "#e4a11b" },
  { zh: "自我信任", en: "Self-Trust", c: "#5bc8d4" },
  { zh: "愿景", en: "Vision", c: "#f4845f" },
  { zh: "…还有 15+ 个", en: "…and 15+ more", c: "#a49c90" },
];

const FOR_YOU = [
  {
    zh: "你一直想创业，但总觉得「还没准备好」——书单越来越长，行动清单一直是空的。",
    en: "You've always wanted to start something, but never feel \"ready\" — your reading list keeps growing while your action list stays empty.",
  },
  {
    zh: "你有一个商业想法，在脑子里放了半年，还没有迈出第一步。",
    en: "You have a business idea that's been sitting in your head for six months, and you still haven't taken the first step.",
  },
  {
    zh: "你正在做副业，但卡在了某个阶段：没客户、不会推广、内容没人看。",
    en: "You have a side hustle, but you're stuck at some stage: no customers, no idea how to market, content nobody sees.",
  },
  {
    zh: "你甚至还没有副业——但你心里清楚，你不想一辈子只帮别人打工。",
    en: "You don't even have a side hustle yet — but deep down you know you don't want to spend your whole life building someone else's dream.",
  },
];

function SubForm({ lang, label, center }) {
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || subState === "loading") return;
    setSubState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubState(res.ok ? "success" : "error");
    } catch {
      setSubState("error");
    }
  }

  if (subState === "success") {
    return (
      <p style={{ fontSize: 16, fontWeight: 700, color: "#2a9d5c", padding: "14px 0" }}>
        {lang === "zh" ? "✓ 已加入，感謝！稍後查收邮件。" : "✓ You're in! Check your inbox shortly."}
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", background: "var(--surface)", borderRadius: 999, padding: "5px 5px 5px 18px", border: "1.5px solid var(--line)", maxWidth: 420, margin: center ? "0 auto" : undefined }}>
        <input
          type="email" required value={email}
          onChange={(e) => { setEmail(e.target.value); setSubState("idle"); }}
          placeholder={lang === "zh" ? "你的邮件地址" : "Your email address"}
          style={{ flex: 1, border: "none", background: "transparent", fontSize: 14, color: "var(--ink)", outline: "none", minWidth: 0 }}
        />
        <button type="submit" disabled={subState === "loading"} style={{ flexShrink: 0, padding: "10px 20px", borderRadius: 999, background: "var(--honey)", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", whiteSpace: "nowrap", transition: "background .15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--honey-600)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--honey)"}
        >
          {subState === "loading" ? "…" : (label || (lang === "zh" ? "加入等待清單" : "Join waitlist"))}
        </button>
      </form>
      {subState === "error" && (
        <p style={{ fontSize: 12, color: "#c0392b", marginTop: 6 }}>
          {lang === "zh" ? "出錯了，請稍後再試" : "Something went wrong, try again"}
        </p>
      )}
    </div>
  );
}

export default function ActionBankPage({ lang, setLang, onBack }) {
  const [showWechat, setShowWechat] = useState(false);
  const p = (o) => (o && typeof o === "object" ? (o[lang] || o.zh) : o);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink)", fontFamily: "var(--font-sans)", lineHeight: 1.5, WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-13px)}}
        @keyframes dash{from{stroke-dashoffset:240}to{stroke-dashoffset:0}}
        @media(prefers-reduced-motion:reduce){*{animation:none!important}}
        .ab-card{transition:transform .25s,box-shadow .25s,border-color .25s;}
        .ab-card:hover{transform:translateY(-3px);box-shadow:var(--lift-sm);border-color:var(--line)!important;}
        .ab-tag{transition:transform .18s;}
        .ab-tag:hover{transform:translateY(-2px);}
        @media(max-width:640px){.ab-float{display:none}}
      `}</style>

      {/* NAV */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "26px 0 20px" }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} style={{ textDecoration: "none" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, letterSpacing: "-.4px", color: "var(--ink)", position: "relative", display: "inline-block" }}>
              Chao<span style={{ color: "#233" }}>logies</span>
              <span style={{ position: "absolute", left: 1, right: 1, bottom: -4, height: 1.5, background: "var(--logo-wave)", borderRadius: 2, opacity: .85, display: "block" }} />
            </div>
          </a>
          <div className="lang" style={{ display: "flex", gap: 2 }}>
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "zh" ? "on" : ""} onClick={() => setLang("zh")}>中</button>
          </div>
        </nav>
      </div>

      {/* HERO */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ position: "relative", maxWidth: 660, margin: "0 auto", padding: "46px 0 58px", textAlign: "center" }}>
          <span className="ab-float" style={{ position: "absolute", top: "4%", left: "-2%", fontSize: 30, animation: "floaty 4.2s ease-in-out infinite", pointerEvents: "none" }}>🏦</span>
          <span className="ab-float" style={{ position: "absolute", top: "18%", right: "-1%", fontSize: 26, animation: "floaty 5.4s ease-in-out .9s infinite", pointerEvents: "none" }}>🚀</span>
          <span className="ab-float" style={{ position: "absolute", bottom: "6%", left: "8%", fontSize: 24, animation: "floaty 5s ease-in-out .5s infinite", pointerEvents: "none" }}>💡</span>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--honey)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "0 0 18px" }}>
            <span>✦</span>{p(COPY.heroEyebrow)}
          </p>
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(27px, 6vw, 54px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: -1.2, margin: "0 0 22px", textWrap: "balance" }}>
            {p(COPY.heroT1)}
            <span style={{ position: "relative", color: "var(--honey)", whiteSpace: "nowrap" }}>
              {p(COPY.heroHL)}
              <svg viewBox="0 0 200 12" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: -7, width: "100%", height: 10, overflow: "visible" }}>
                <path d="M2 8 Q 50 1 100 7 T 198 5" fill="none" stroke="var(--honey)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="240" style={{ animation: "dash 1.1s ease .35s both" }} />
              </svg>
            </span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", maxWidth: "38ch", margin: "0 auto 26px", whiteSpace: "pre-line" }}>{p(COPY.heroSub)}</p>
          <div style={{ marginBottom: 13 }}>
            <SubForm lang={lang} label={p(COPY.heroCta)} center />
          </div>
          <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--ink-3)", maxWidth: "46ch", margin: "0 auto 24px" }}>{p(COPY.heroFine)}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ display: "flex" }}>
              {[
                { src: "/avatar.jpg", style: { objectFit: "cover", objectPosition: "center 12%" } },
                { emoji: "🧑🏻‍💻", bg: "var(--coral)" },
                { emoji: "👩🏻", bg: "var(--teal)" },
                { emoji: "🧑🏽", bg: "var(--lavender)" },
              ].map((av, i) => (
                <div key={i} style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid var(--paper)", marginLeft: i > 0 ? -11 : 0, boxShadow: "0 1px 4px rgba(0,0,0,.15)", overflow: "hidden", background: av.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                  {av.src ? <img src={av.src} alt="" style={{ width: "100%", height: "100%", ...av.style }} /> : av.emoji}
                </div>
              ))}
            </div>
            <span style={{ fontSize: 13, color: "var(--ink-2)", maxWidth: "30ch", lineHeight: 1.45, textAlign: "left" }}>{p(COPY.proof)}</span>
          </div>

          {/* STATS STRIP */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, marginTop: 40 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--line-2)", borderRadius: 14, padding: "14px 20px", minWidth: 118 }}>
                <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.5px", color: "var(--honey-600)" }}>{s.n}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 2 }}>{lang === "zh" ? s.zh : s.en}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <div style={{ background: "var(--surface)", borderTop: "1px solid var(--line-2)", borderBottom: "1px solid var(--line-2)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 4.5vw, 38px)", fontWeight: 800, letterSpacing: -1, margin: "0 0 40px" }}>
            {p(COPY.probTitle)}<span style={{ color: "var(--honey)" }}>{p(COPY.probHL)}</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, maxWidth: 760, margin: "0 auto" }}>
            {PROBLEMS.map((item, i) => (
              <div key={i} className="ab-card" style={{ background: "var(--paper)", border: "1px solid var(--line-2)", borderRadius: 16, padding: "26px 24px" }}>
                <div style={{ fontSize: 30, marginBottom: 12 }}>{item.emoji}</div>
                <p style={{ fontSize: 17.5, fontWeight: 800, letterSpacing: "-.3px", margin: "0 0 10px", color: "var(--ink)" }}>{p(item.title)}</p>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--ink-2)", margin: 0 }}>{p(item.desc)}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 20, fontWeight: 800, color: "var(--ink)", margin: "36px auto 0", maxWidth: "32ch", lineHeight: 1.5, letterSpacing: "-.3px" }}>{p(COPY.probTag)}</p>
        </div>
      </div>

      {/* STORY + SAMPLE CARD */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "78px 40px" }}>
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--honey)", margin: "0 0 14px" }}>✦ {p(COPY.storyKicker)}</p>
        <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 4.5vw, 38px)", fontWeight: 800, letterSpacing: -1, margin: "0 0 26px" }}>
          {p(COPY.storyTitle)}<span style={{ color: "var(--honey)" }}>{p(COPY.storyHL)}</span>
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", maxWidth: "52ch", margin: "0 auto 44px", whiteSpace: "pre-line" }}>{p(COPY.storyBody)}</p>

        {/* Sample entry mock */}
        <p style={{ textAlign: "center", fontSize: 14, fontWeight: 700, color: "var(--ink-2)", margin: "0 0 14px" }}>{p(COPY.sampleLabel)}</p>
        <div style={{ maxWidth: 620, margin: "0 auto", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 18, boxShadow: "var(--lift-sm)", overflow: "hidden" }}>
          <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>📖</span>
            <span style={{ fontSize: 14.5, fontWeight: 700, color: "var(--ink)" }}>{p(COPY.sampleBook)}</span>
          </div>
          <div style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, padding: "4px 11px", borderRadius: 999, background: "var(--honey-soft)", color: "var(--honey-600)" }}>⚡ {p(COPY.sampleTagA)}</span>
              <span style={{ fontSize: 11.5, fontWeight: 700, padding: "4px 11px", borderRadius: 999, background: "#e7f6f2", color: "#2a9d5c" }}>🏋️ {p(COPY.sampleTagB)}</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--ink)", margin: "0 0 14px" }}>{p(COPY.sampleQuote)}</p>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--ink-2)", margin: 0, background: "var(--paper)", borderLeft: "3px solid var(--honey)", borderRadius: "0 10px 10px 0", padding: "10px 14px" }}>{p(COPY.sampleEx)}</p>
          </div>
        </div>
      </div>

      {/* WHAT'S INSIDE */}
      <div style={{ background: "var(--surface)", borderTop: "1px solid var(--line-2)", borderBottom: "1px solid var(--line-2)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "78px 40px" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 4.5vw, 38px)", fontWeight: 800, letterSpacing: -1, margin: "0 0 14px" }}>
            {p(COPY.insideTitle)}<span style={{ color: "var(--honey)" }}>{p(COPY.insideHL)}</span>
          </h2>
          <p style={{ textAlign: "center", fontSize: 16, color: "var(--ink-2)", maxWidth: "42ch", margin: "0 auto 40px", lineHeight: 1.6, whiteSpace: "pre-line" }}>{p(COPY.insideSub)}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 720, margin: "0 auto" }}>
            {INSIDE.map((item, i) => (
              <div key={i} className="ab-card" style={{ display: "flex", alignItems: "flex-start", gap: 18, background: "var(--paper)", border: "1px solid var(--line-2)", borderRadius: 16, padding: "22px 24px" }}>
                <span style={{ flexShrink: 0, width: 46, height: 46, borderRadius: 13, background: "var(--honey-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 23 }}>{item.emoji}</span>
                <div>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", margin: "2px 0 6px" }}>{p(item.title)}</p>
                  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-2)", margin: 0 }}>{p(item.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TAG CLOUD */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "78px 40px" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 800, letterSpacing: -1, margin: "0 0 12px" }}>{p(COPY.tagTitle)}</h2>
        <p style={{ textAlign: "center", fontSize: 15.5, color: "var(--ink-2)", maxWidth: "40ch", margin: "0 auto 34px", lineHeight: 1.6 }}>{p(COPY.tagSub)}</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, maxWidth: 700, margin: "0 auto" }}>
          {TAGS.map((t, i) => (
            <span key={i} className="ab-tag" style={{ fontSize: 13.5, fontWeight: 600, padding: "8px 16px", borderRadius: 999, background: "var(--surface)", border: `1.5px solid ${t.c}44`, color: "var(--ink)", display: "inline-flex", alignItems: "center", gap: 7, cursor: "default" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.c, flexShrink: 0 }} />
              {lang === "zh" ? t.zh : t.en}
            </span>
          ))}
        </div>
      </div>

      {/* FOR YOU */}
      <div style={{ background: "var(--surface)", borderTop: "1px solid var(--line-2)", borderBottom: "1px solid var(--line-2)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 4.5vw, 38px)", fontWeight: 800, letterSpacing: -1, margin: "0 0 40px" }}>
            {p(COPY.forYouTitle)}<span style={{ color: "var(--honey)" }}>{p(COPY.forYouHL)}</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 680, margin: "0 auto" }}>
            {FOR_YOU.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 15, background: "var(--paper)", border: "1px solid var(--line-2)", borderRadius: 14, padding: "18px 20px" }}>
                <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "var(--honey)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ink)" }}>{p(item)}</span>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 15.5, color: "var(--ink-2)", margin: "34px auto 6px", maxWidth: "40ch", lineHeight: 1.6 }}>{p(COPY.forYouTag1)}</p>
          <p style={{ textAlign: "center", fontSize: 20, fontWeight: 800, color: "var(--ink)", margin: "0 auto", maxWidth: "30ch", lineHeight: 1.45, letterSpacing: "-.3px" }}>{p(COPY.forYouTag2)}</p>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ background: "var(--honey-soft)" }}>
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "78px 40px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 10, animation: "floaty 4s ease-in-out infinite" }}>🏦</div>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 40px)", fontWeight: 800, letterSpacing: -1, margin: "0 0 16px" }}>
            {p(COPY.finalTitle)}<span style={{ color: "var(--honey-600)" }}>{p(COPY.finalHL)}</span>
          </h2>
          <p style={{ fontSize: 16.5, color: "var(--ink-2)", maxWidth: "42ch", margin: "0 auto 28px", lineHeight: 1.6, whiteSpace: "pre-line" }}>{p(COPY.finalSub)}</p>
          <SubForm lang={lang} label={p(COPY.heroCta)} center />
          <p style={{ fontSize: 12.5, color: "var(--ink-3)", margin: "14px 0 0", fontStyle: "italic" }}>{p(COPY.finalFine)}</p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "34px 40px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <p style={{ fontFamily: "var(--font-hand)", fontSize: 15, color: "var(--ink-2)", maxWidth: "44ch", lineHeight: 1.6, margin: 0, letterSpacing: ".2px" }}>{p(COPY.footerLine)}</p>
        <img src="/air.png" alt="" style={{ width: 40, opacity: .85 }} />
      </div>

      {showWechat && <WechatModal lang={lang} onClose={() => setShowWechat(false)} />}
    </div>
  );
}
