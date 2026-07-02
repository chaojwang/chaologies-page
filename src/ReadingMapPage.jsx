import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────
//  ReadingMapPage — 超說閱讀地圖 · Chaologies Reading Map
//  已上線產品的銷售頁：Hero（視頻）→ 問題 → 六層結構 →
//  使用場景 → 購買入口 → 訂閱更新。
// ─────────────────────────────────────────────────────

const SERIF = "'LXGW WenKai','Noto Serif SC',Georgia,serif";
const SANS = "'Inter','Noto Sans SC',system-ui,sans-serif";

const COPY = {
  zh: {
    navTitle: "超說閱讀地圖 · Reading Map",
    eyebrow: "CHAOLOGIES · READING OS",
    heroL1: "不是書單，",
    heroL2: "是一張幫你建立",
    heroHL: "思考系統",
    heroMid: "的",
    heroL3: "閱讀地圖。",
    heroSub: "101+ 本真正參與過我成長的書，整理成一套可以反復使用的 Reading OS。\n不只告訴你讀什麼，更告訴你：怎麼把一本書變成判斷、行動和真實的改變。",
    heroCta: "立即獲取閱讀地圖",
    heroSecondary: "地圖持續更新中，訂閱通知 →",
    bandQuote: "一本書沒有進入你的生活，就還沒有真正被讀完。",

    probEyebrow: "為什麼是「地圖」",
    probTitle: "我們收藏過太多書單了。",
    probBody: "我們畫線、標註、截圖、收藏。\n當下覺得很有用，過幾天又慢慢忘了。\n\n普通書單只告訴你「這本書很好」，\n卻不告訴你：它解決什麼問題、\n該在什麼階段讀、讀完可以馬上做什麼。\n\n所以我把閱讀做成了一張地圖——\n每本書都是一個可以反復回來的節點。\n面對金錢、工作、創作和生活選擇時，\n你隨時能從裡面取出可以用的東西。",
    mapCaption: "圍繞七個維度展開：你每天真正要面對的東西",

    layerEyebrow: "地圖的結構",
    layerTitle: "每一本書，都被整理成六層",
    layerSub: "不是書摘，是一個真實的人讀完之後留下來的判斷、經驗和行動線索。",

    useEyebrow: "怎麼用它",
    useTitle: "一張可以一直回來的地圖",

    buyEyebrow: "101+ 本 · 持續生長中",
    buyTitle: "現在就進入這張地圖",
    buyNote: "101+ 本書的精華筆記與指南，選擇你習慣的平台獲取。",
    buyGo: "立即獲取",
    buyCn: "國內首選",
    buyIntl: "國際",
    buyRed: "國內",

    whyEyebrow: "CHAO 的話",
    whyGreeting: "嗨，朋友",
    whyBody: "我以前也以為，讀書是為了變聰明。\n後來發現，不完全是。\n\n有些書真正有用的地方，是過了很久之後，\n你在某個生活場景裡，突然想起它的一句話、一個角度。\n那一刻你會發現：這本書並沒有結束，\n它只是換了一種方式，留在你的生活裡。\n\n這張地圖裡的每一本書，都是這樣留下來的。\n也許你也能從裡面，找到屬於你的那條線。",

    updEyebrow: "持續更新",
    updTitle: "這張地圖，還在繼續生長",
    updSub: "我會不斷往裡面加入新讀完的書和新的筆記。\n留下郵箱，每次更新你第一時間知道——還會收到我每週關於生活、金錢和好書的分享。",
    updCta: "訂閱更新",
    updFine: "免費訂閱。無垃圾郵件。隨時退訂。",

    footerQuote: "讀好書 · 思考 · 實踐 · 成長",
  },
  en: {
    navTitle: "Chaologies Reading Map",
    eyebrow: "CHAOLOGIES · READING OS",
    heroL1: "Not another booklist.",
    heroL2: "A map for building ",
    heroHL: "how you think",
    heroMid: ".",
    heroL3: "",
    heroSub: "101+ books that genuinely shaped me, organized into a Reading OS you can return to again and again.\nNot just what to read — how a book becomes judgment, action, and real change.",
    heroCta: "Get the Reading Map",
    heroSecondary: "The map keeps growing — get updates →",
    bandQuote: "A book isn't truly finished until it enters your life.",

    probEyebrow: "WHY A MAP",
    probTitle: "We've all saved too many booklists.",
    probBody: "We highlight, annotate, screenshot, save.\nIt feels useful in the moment — then quietly fades.\n\nAn ordinary booklist only says \"this book is good\".\nIt never tells you what problem it solves,\nwhen in life to read it, or what to do when you finish.\n\nSo I turned reading into a map —\nwhere every book is a node you can return to.\nWhen you face money, work, creativity and life choices,\nthere's always something in here you can actually use.",
    mapCaption: "Unfolds along seven dimensions: the things you actually face every day",

    layerEyebrow: "HOW THE MAP IS BUILT",
    layerTitle: "Every book is distilled into six layers",
    layerSub: "Not summaries — the judgments, experience and action threads one real person kept after reading.",

    useEyebrow: "HOW TO USE IT",
    useTitle: "A map you keep coming back to",

    buyEyebrow: "101+ BOOKS · STILL GROWING",
    buyTitle: "Step into the map today",
    buyNote: "Distilled notes & guides from 101+ books. Pick the platform you prefer.",
    buyGo: "Get it now",
    buyCn: "China (Recommended)",
    buyIntl: "International",
    buyRed: "China",

    whyEyebrow: "FROM CHAO",
    whyGreeting: "Hey friend",
    whyBody: "I used to think reading was about becoming smarter.\nSlowly, I realized that's not quite it.\n\nThe most useful part of a book shows up much later —\nin a real moment of your life, you suddenly remember\na sentence, a concept, a way of seeing.\nAnd you realize: the book never ended.\nIt just found another way to stay in your life.\n\nEvery book on this map earned its place that way.\nMaybe somewhere in here, you'll find your own thread.",

    updEyebrow: "ALWAYS GROWING",
    updTitle: "This map keeps growing",
    updSub: "I keep adding newly-finished books and fresh notes.\nLeave your email to hear about every update — plus my weekly notes on life, money and good books.",
    updCta: "Get updates",
    updFine: "Free. No spam. Unsubscribe anytime.",

    footerQuote: "Read well · Think · Practice · Grow",
  },
};

// 七个维度 — 地图的经纬
const DIMENSIONS = [
  { zh: "金錢", en: "Money" },
  { zh: "工作", en: "Work" },
  { zh: "生活", en: "Life" },
  { zh: "創作", en: "Creativity" },
  { zh: "認知", en: "Thinking" },
  { zh: "商業", en: "Business" },
  { zh: "自我", en: "Self" },
];

// 每本书的六层结构
const LAYERS = [
  { n: "壹", zh: "這本書在解決什麼問題", en: "What problem this book solves", dzh: "先看問題，再看書。你會知道自己為什麼需要它。", den: "Problem first, book second — so you know why you need it." },
  { n: "貳", zh: "一句話總結", en: "One-line summary", dzh: "整本書留下來的那一句，忘掉全書也不會忘掉它。", den: "The one sentence that survives even after you forget the rest." },
  { n: "叁", zh: "三個真正留下來的核心認知", en: "Three ideas that actually stayed", dzh: "不是金句摘抄，是過了很久還在影響我的三個認知。", den: "Not quotable lines — the three ideas still shaping me long after." },
  { n: "肆", zh: "它改變了我什麼判斷", en: "How it changed my judgment", dzh: "讀之前我怎麼想，讀之後我怎麼做。真實的變化。", den: "How I thought before, what I do differently now. Real change." },
  { n: "伍", zh: "適合在哪個人生階段讀", en: "When in life to read it", dzh: "同一本書，在不同階段讀，是兩本書。時機很重要。", den: "The same book reads differently at different stages. Timing matters." },
  { n: "陸", zh: "讀完可以馬上做的小練習", en: "A small exercise to do right away", dzh: "合上書的十分鐘裡，就能做的一件小事。", den: "One small thing to do within ten minutes of closing the book." },
];

// 使用场景
const USE_CASES = [
  { emoji: "🧭", zh: "不知道下一本讀什麼時，按你的人生階段找書。", en: "Don't know what to read next? Find it by your stage of life." },
  { emoji: "🌫️", zh: "對金錢、職業、生活感到混亂時，按主題找入口。", en: "Money, career or life feels foggy? Enter by theme." },
  { emoji: "🎬", zh: "想做內容缺少角度時，找可延展的視頻和文章選題。", en: "Creating content? Pull extendable topics and angles." },
  { emoji: "🏃", zh: "讀完不知道怎麼應用時，找對應的行動練習。", en: "Finished a book? Find its action exercise." },
  { emoji: "🌱", zh: "想建立判斷力時，把它當成長期的思考系統。", en: "Building judgment? Treat it as a long-term thinking system." },
];

// 销售入口
const PURCHASE = [
  { name: "B站商城", subKey: "buyCn", href: "https://mall.bilibili.com/neul-next/detailuniversal/detail.html?page=detailuniversal_detail&itemsId=40994927&loadingShow=1&noTitleBar=1#noReffer=true&msource=merchant_share", highlight: true },
  { name: "Gumroad", subKey: "buyIntl", href: "https://1408889899058.gumroad.com/l/Books" },
  { name: "小紅書", subKey: "buyRed", href: "http://xhslink.com/o/8txd25qexbN" },
];

// ── 地图视觉：中心一本书，虚线连向七个维度节点 ──
function MapVisual({ lang, caption }) {
  const nodes = [
    { x: 95, y: 78 }, { x: 262, y: 46 }, { x: 428, y: 82 },
    { x: 462, y: 222 }, { x: 372, y: 340 }, { x: 158, y: 348 }, { x: 58, y: 218 },
  ];
  const cx = 260, cy = 202;
  return (
    <div style={{ position: "relative", background: "#fbfaf6", border: "1px solid #e7e2d8", borderRadius: 18, boxShadow: "0 16px 44px -18px rgba(70,55,25,.25)", padding: "26px 18px 16px", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 14, left: 18, fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: ".14em", color: "#c4bcaf", textTransform: "uppercase" }}>READING MAP · 101+</div>
      <div style={{ position: "absolute", top: 12, right: 16, fontSize: 15, color: "#d8d2c7" }}>✦</div>
      <svg viewBox="0 0 520 400" style={{ width: "100%", height: "auto", display: "block" }}>
        <g opacity="0.35">
          <circle cx="470" cy="352" r="20" fill="none" stroke="#c4bcaf" strokeWidth="1" />
          <path d="M470 336 L474 352 L470 368 L466 352 Z" fill="#c4bcaf" />
          <text x="470" y="330" textAnchor="middle" fontSize="9" fill="#a49c90" fontFamily={SANS}>N</text>
        </g>
        {nodes.map((n, i) => (
          <path key={i} d={`M ${cx} ${cy} Q ${(cx + n.x) / 2 + (i % 2 ? 18 : -18)} ${(cy + n.y) / 2} ${n.x} ${n.y}`} fill="none" stroke="#c9bfa8" strokeWidth="1.3" strokeDasharray="4 5" className="rm-route" style={{ animationDelay: `${0.15 * i}s` }} />
        ))}
        <g>
          <circle cx={cx} cy={cy} r="34" fill="#f7eacf" stroke="#e4a11b" strokeWidth="1.5" />
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="26">📖</text>
        </g>
        {DIMENSIONS.map((d, i) => {
          const n = nodes[i];
          return (
            <g key={i} className="rm-node" style={{ animationDelay: `${0.7 + 0.12 * i}s` }}>
              <circle cx={n.x} cy={n.y} r="26" fill="#ffffff" stroke="#e0d9cb" strokeWidth="1.2" />
              <text x={n.x} y={n.y + 5.5} textAnchor="middle" fontSize={lang === "zh" ? 15 : 10.5} fill="#3a352e" fontFamily={SERIF} fontWeight="600">{lang === "zh" ? d.zh : d.en}</text>
            </g>
          );
        })}
      </svg>
      <p style={{ textAlign: "center", fontFamily: SERIF, fontSize: 12.5, color: "#a49c90", margin: "10px 0 4px", letterSpacing: ".04em" }}>{caption}</p>
    </div>
  );
}

function UpdateForm({ lang, label }) {
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
      <p style={{ fontSize: 16, fontWeight: 700, color: "#2a9d5c", padding: "14px 0", fontFamily: SANS }}>
        {lang === "zh" ? "✓ 已訂閱，感謝！地圖有更新會第一時間通知你。" : "✓ You're in! You'll hear about every update."}
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", background: "#fff", borderRadius: 999, padding: "5px 5px 5px 18px", border: "1.5px solid #e7e2d8", maxWidth: 430, margin: "0 auto" }}>
        <input
          type="email" required value={email}
          onChange={(e) => { setEmail(e.target.value); setSubState("idle"); }}
          placeholder={lang === "zh" ? "你的郵件地址" : "Your email address"}
          style={{ flex: 1, border: "none", background: "transparent", fontSize: 14, color: "#1c1915", outline: "none", minWidth: 0, fontFamily: SANS }}
        />
        <button type="submit" disabled={subState === "loading"} style={{ flexShrink: 0, padding: "11px 22px", borderRadius: 999, background: "#e4a11b", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", whiteSpace: "nowrap", transition: "background .15s", fontFamily: SANS }}
          onMouseEnter={e => e.currentTarget.style.background = "#c8881a"}
          onMouseLeave={e => e.currentTarget.style.background = "#e4a11b"}
        >
          {subState === "loading" ? "…" : label}
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

export default function ReadingMapPage({ lang: initialLang = "zh", setLang: setParentLang, onBack }) {
  const [lang, setLang] = useState(initialLang);
  const c = COPY[lang];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const switchLang = (l) => { setLang(l); setParentLang?.(l); };

  const btnBase = {
    border: "none", borderRadius: 16, cursor: "pointer",
    fontFamily: SANS, fontWeight: 600, fontSize: 13,
    padding: "6px 14px", transition: "background 0.15s,color 0.15s",
  };
  const eyebrowStyle = { fontFamily: SANS, fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", color: "#a49c90", textTransform: "uppercase", marginBottom: 14 };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f2ec", color: "#1c1915", fontFamily: SANS, WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @keyframes drawIn{to{stroke-dashoffset:0}}
        @keyframes rmFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes rmDash{to{stroke-dashoffset:-72}}
        @media(prefers-reduced-motion:reduce){*{animation:none!important}}
        .rm-route{animation:rmDash 6s linear infinite}
        .rm-node{opacity:0;animation:rmFade .7s ease forwards}
        .rm-layer{background:#fff;border:1px dashed #d8d2c7;border-radius:14px;padding:24px 22px;transition:border-color .25s,transform .25s,box-shadow .25s}
        .rm-layer:hover{border-color:#a49c90;transform:translateY(-3px);box-shadow:0 10px 26px -16px rgba(70,55,25,.3)}
        .rm-buy{text-decoration:none;display:flex;flex-direction:column;border-radius:14px;padding:26px 22px;text-align:left;transition:transform .15s,border-color .2s,box-shadow .2s}
        .rm-buy:hover{transform:translateY(-3px);box-shadow:0 10px 26px -16px rgba(70,55,25,.3)}
        .rm-buy:active{transform:scale(.98)}
        .rm-hero{display:grid;grid-template-columns:1fr 540px;gap:52px;align-items:center}
        .rm-prob{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center}
        @media(max-width:960px){.rm-hero{grid-template-columns:1fr;gap:40px}.rm-prob{grid-template-columns:1fr;gap:36px}}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(244,242,236,0.97)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "0.5px solid #e7e2d8", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <img src="/logo.png" alt="Chaologies" style={{ height: 22, objectFit: "contain", flexShrink: 0 }} />
          </button>
          <span style={{ color: "#d8d2c7", fontSize: 14 }}>·</span>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#3a352e", letterSpacing: -0.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.navTitle}</span>
        </div>
        <div style={{ display: "flex", gap: 2, background: "#e0dbd1", borderRadius: 20, padding: 3, flexShrink: 0 }}>
          <button onClick={() => switchLang("zh")} style={{ ...btnBase, background: lang === "zh" ? "#1c1915" : "transparent", color: lang === "zh" ? "#f4f2ec" : "#8a8276" }}>中文</button>
          <button onClick={() => switchLang("en")} style={{ ...btnBase, background: lang === "en" ? "#1c1915" : "transparent", color: lang === "en" ? "#f4f2ec" : "#8a8276" }}>EN</button>
        </div>
      </nav>

      {/* HERO — 左文案 + 右视频 */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "68px 40px 76px" }}>
        <div className="rm-hero">
          <div>
            <div style={eyebrowStyle}>✦ &nbsp;{c.eyebrow}</div>
            <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(30px,3.9vw,46px)", lineHeight: 1.3, color: "#1c1915", letterSpacing: "-.5px", margin: "0 0 22px", textWrap: "balance" }}>
              {c.heroL1}<br />
              {c.heroL2}
              <span style={{ position: "relative", whiteSpace: "nowrap" }}>
                {c.heroHL}
                <svg viewBox="0 0 200 12" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: -5, width: "100%", height: 9, overflow: "visible" }}>
                  <path d="M3 8 Q 50 2 100 7 T 197 5" fill="none" stroke="#5bc8d4" strokeWidth="3" strokeLinecap="round" strokeDasharray="240" strokeDashoffset="240" style={{ animation: "drawIn 1.1s ease-out .5s forwards" }} />
                </svg>
              </span>
              {c.heroMid}
              {c.heroL3 && <><br />{c.heroL3}</>}
            </h1>
            <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "#6b645b", maxWidth: "44ch", margin: "0 0 32px", whiteSpace: "pre-line" }}>{c.heroSub}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
              <a href="#map-entry" style={{ background: "#e4a11b", color: "#fff", fontWeight: 700, fontSize: 15, padding: "15px 30px", borderRadius: 10, textDecoration: "none", display: "inline-block", transition: "background .15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#c8881a"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#e4a11b"; }}
              >{c.heroCta} →</a>
              <a href="#updates" style={{ color: "#8a8276", fontSize: 14, textDecoration: "none", borderBottom: "1px solid #c4bcaf", paddingBottom: 1 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#3a352e"; e.currentTarget.style.borderColor = "#6b645b"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#8a8276"; e.currentTarget.style.borderColor = "#c4bcaf"; }}
              >{c.heroSecondary}</a>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", borderRadius: 16, overflow: "hidden", background: "#000", boxShadow: "0 16px 50px rgba(28,25,21,0.14)" }}>
              <iframe
                src="https://player.bilibili.com/player.html?isOutside=true&aid=116560597354746&bvid=BV1dU5T6XEqx&cid=38278073982&p=1"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allowFullScreen scrolling="no" title="超說閱讀地圖"
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE BAND */}
      <div style={{ background: "#1c1915", padding: "32px 40px", textAlign: "center" }}>
        <p style={{ fontFamily: SERIF, fontSize: "clamp(17px,2.4vw,22px)", lineHeight: 1.6, color: "#f4f2ec", letterSpacing: ".05em", margin: 0 }}>{c.bandQuote}</p>
      </div>

      {/* PROBLEM — 左地图视觉 + 右短文案 */}
      <section style={{ background: "#fff", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div className="rm-prob">
            <MapVisual lang={lang} caption={c.mapCaption} />
            <div>
              <div style={eyebrowStyle}>{c.probEyebrow}</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(24px,3.2vw,32px)", lineHeight: 1.3, color: "#1c1915", letterSpacing: "-.4px", margin: "0 0 22px" }}>{c.probTitle}</h2>
              <p style={{ fontFamily: SERIF, fontSize: 15.5, lineHeight: 1.95, color: "#3a352e", whiteSpace: "pre-line", margin: 0 }}>{c.probBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SIX LAYERS */}
      <section style={{ background: "#f4f2ec", padding: "80px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 42 }}>
            <div style={eyebrowStyle}>{c.layerEyebrow}</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(25px,3.4vw,34px)", lineHeight: 1.3, letterSpacing: "-.4px", margin: "0 0 12px" }}>{c.layerTitle}</h2>
            <p style={{ fontSize: 14.5, color: "#6b645b", maxWidth: "46ch", margin: "0 auto", lineHeight: 1.7 }}>{c.layerSub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 14 }}>
            {LAYERS.map((l, i) => (
              <div key={i} className="rm-layer">
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 9 }}>
                  <span style={{ fontFamily: SERIF, fontSize: 13, color: "#a49c90", border: "1px solid #e0d9cb", borderRadius: "50%", width: 26, height: 26, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{l.n}</span>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 17, lineHeight: 1.4, color: "#1c1915", margin: 0 }}>{lang === "zh" ? l.zh : l.en}</h3>
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#6b645b", margin: 0 }}>{lang === "zh" ? l.dzh : l.den}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES — 紧凑两列 */}
      <section style={{ background: "#fff", padding: "76px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={eyebrowStyle}>{c.useEyebrow}</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(25px,3.4vw,34px)", lineHeight: 1.3, letterSpacing: "-.4px", margin: 0 }}>{c.useTitle}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
            {USE_CASES.map((u, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 13, background: "#f9f7f1", border: "1px solid #efebe2", borderRadius: 13, padding: "16px 18px" }}>
                <span style={{ fontSize: 19, flexShrink: 0 }}>{u.emoji}</span>
                <span style={{ fontSize: 14, lineHeight: 1.65, color: "#3a352e" }}>{lang === "zh" ? u.zh : u.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PURCHASE — 主转化区 */}
      <section id="map-entry" style={{ background: "#f7eacf", padding: "80px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...eyebrowStyle, color: "#c8881a" }}>{c.buyEyebrow}</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(28px,3.8vw,38px)", lineHeight: 1.25, letterSpacing: "-.5px", margin: "0 0 12px" }}>{c.buyTitle}</h2>
          <p style={{ fontSize: 15, color: "#6b645b", maxWidth: "46ch", margin: "0 auto 38px", lineHeight: 1.7 }}>{c.buyNote}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, maxWidth: 680, margin: "0 auto" }}>
            {PURCHASE.map((p, i) => (
              <a key={i} href={p.href} target="_blank" rel="noopener noreferrer" className="rm-buy"
                style={p.highlight
                  ? { background: "#fff", border: "2px solid #e4a11b" }
                  : { background: "#fff", border: "1px solid #e0d9cb" }}
              >
                <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", color: p.highlight ? "#e4a11b" : "#a49c90", textTransform: "uppercase" }}>{c[p.subKey]}</span>
                <span style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 700, color: "#1c1915", margin: "6px 0 14px" }}>{p.name}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: p.highlight ? "#e4a11b" : "#6b645b" }}>{c.buyGo} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHY — 短版个人信 */}
      <section style={{ background: "#fff", padding: "80px 40px" }}>
        <div style={{ maxWidth: 940, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(200px, 250px) 1fr", gap: 48, alignItems: "start" }} className="rm-why">
          <style>{`@media(max-width:820px){.rm-why{grid-template-columns:1fr!important}.rm-why-avatar{margin:0 auto}}`}</style>
          <div className="rm-why-avatar" style={{ justifySelf: "center", position: "relative", width: 220, height: 220 }}>
            <svg viewBox="0 0 220 220" style={{ position: "absolute", inset: 0 }}>
              <circle cx="110" cy="110" r="103" fill="none" stroke="#e0d9cb" strokeWidth="1.5" strokeDasharray="5 7" />
              <circle cx="110" cy="110" r="88" fill="#f7eacf" />
            </svg>
            <img src="/avatar.jpg" alt="Chao" style={{ position: "absolute", left: 30, top: 30, width: 160, height: 160, borderRadius: "50%", objectFit: "cover" }} />
            <span style={{ position: "absolute", right: 8, top: 12, fontSize: 22 }}>📖</span>
          </div>
          <div>
            <div style={eyebrowStyle}>{c.whyEyebrow}</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 30, lineHeight: 1.2, color: "#1c1915", letterSpacing: "-.4px", margin: "0 0 22px" }}>{c.whyGreeting} 👋</h2>
            <p style={{ fontFamily: SERIF, fontSize: 15.5, lineHeight: 1.95, color: "#3a352e", whiteSpace: "pre-line", margin: "0 0 26px" }}>{c.whyBody}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "0.5px solid #e7e2d8", paddingTop: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1c1915" }}>Chao</span>
              <span style={{ fontSize: 13, color: "#a49c90" }}>· Chaologies 超說</span>
            </div>
          </div>
        </div>
      </section>

      {/* UPDATES — 邮件订阅（地图持续生长） */}
      <section id="updates" style={{ background: "#f4f2ec", borderTop: "0.5px solid #e7e2d8", padding: "78px 40px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🌱</div>
          <div style={eyebrowStyle}>{c.updEyebrow}</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(25px,3.4vw,34px)", lineHeight: 1.3, letterSpacing: "-.4px", margin: "0 0 14px" }}>{c.updTitle}</h2>
          <p style={{ fontSize: 15, color: "#6b645b", lineHeight: 1.75, margin: "0 auto 26px", maxWidth: "46ch", whiteSpace: "pre-line" }}>{c.updSub}</p>
          <UpdateForm lang={lang} label={c.updCta} />
          <p style={{ fontSize: 12.5, color: "#a49c90", margin: "14px 0 0", fontStyle: "italic" }}>{c.updFine}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#fff", borderTop: "0.5px solid #e7e2d8", padding: "48px 40px 42px", textAlign: "center" }}>
        <img src="/logo.png" alt="Chaologies" style={{ height: 28, objectFit: "contain", margin: "0 auto 14px" }} />
        <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.6, color: "#8a8276", margin: "0 0 6px", letterSpacing: ".12em" }}>{c.footerQuote}</p>
        <p style={{ fontSize: 12, color: "#c4bcaf", margin: 0 }}>© 2026 Chaologies. All rights reserved.</p>
      </footer>
    </div>
  );
}
