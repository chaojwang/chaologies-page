import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────
//  ReadingMapThanksPage — 閱讀地圖 · 海外買家交付頁
//  /reading-map/thank-you（Gumroad 收據跳轉）
//  三個大按鈕：網頁版 / Notion 模板 / 飛書多維表格。
//  大陸交付頁由飛書文檔承載，不在本站。
// ─────────────────────────────────────────────────────

const SERIF = "'LXGW WenKai','Noto Serif SC',Georgia,serif";
const SANS = "'Inter','Noto Sans SC',system-ui,sans-serif";

// TODO(Chao)：上線前替換為真實交付鏈接
const LINKS = {
  access: "/reading-map/access",
  notion: "https://chaologies.notion.site/REPLACE-ME", // Notion duplicate 鏈接（待替換）
  feishu: "https://REPLACE-ME.feishu.cn/base/REPLACE-ME", // 飛書多維表格分享鏈接（待替換）
};

const COPY = {
  zh: {
    eyebrow: "感謝購買 · DELIVERY",
    title: "你的閱讀地圖已就緒",
    sub: "三種形態，內容一致，全部屬於你。選你最順手的開始。",
    items: [
      {
        emoji: "🌐",
        name: "網頁版",
        desc: "隨時隨地打開。進入後輸入你購買收據裡的訪問口令。",
        cta: "進入網頁版",
        href: LINKS.access,
        internal: true,
        highlight: true,
      },
      {
        emoji: "📑",
        name: "Notion 模板",
        desc: "打開後點右上角「Duplicate / 複製」，整張地圖就是你的了。",
        cta: "獲取 Notion 模板",
        href: LINKS.notion,
      },
      {
        emoji: "📊",
        name: "飛書多維表格",
        desc: "大陸網絡直達，無需任何工具，飛書賬號即可保存。",
        cta: "打開飛書版",
        href: LINKS.feishu,
      },
    ],
    notesTitle: "Notion 安裝注意事項",
    notes: [
      "需要先登錄（或註冊）Notion 賬號，再打開模板鏈接。",
      "打開後點右上角「Duplicate / 複製」，把地圖複製到你自己的工作區。",
      "複製後的內容完全屬於你，可以自由編輯、增刪、改造。",
      "大陸網絡訪問 Notion 可能不穩定，推薦直接使用飛書版。",
    ],
    help: "遇到任何問題，來信：hi@chaologies.com",
    back: "← 回到閱讀地圖介紹頁",
  },
  en: {
    eyebrow: "THANK YOU · DELIVERY",
    title: "Your Reading Map is ready",
    sub: "Three formats, identical content, all yours. Start with whichever suits you.",
    items: [
      {
        emoji: "🌐",
        name: "Web version",
        desc: "Open anywhere, anytime. Enter the access code printed on your receipt.",
        cta: "Open the web version",
        href: LINKS.access,
        internal: true,
        highlight: true,
      },
      {
        emoji: "📑",
        name: "Notion template",
        desc: "Open it, hit “Duplicate” in the top-right corner, and the whole map is yours.",
        cta: "Get the Notion template",
        href: LINKS.notion,
      },
      {
        emoji: "📊",
        name: "Feishu Base",
        desc: "Loads instantly in mainland China — save it with a Feishu account.",
        cta: "Open the Feishu version",
        href: LINKS.feishu,
      },
    ],
    notesTitle: "Notion setup notes",
    notes: [
      "Log in to (or sign up for) Notion first, then open the template link.",
      "Click “Duplicate” in the top-right corner to copy the map into your own workspace.",
      "Once duplicated, it's fully yours — edit, extend, remix freely.",
      "Notion can be unstable on mainland-China networks; use the Feishu version there.",
    ],
    help: "Any trouble at all — email hi@chaologies.com",
    back: "← Back to the Reading Map page",
  },
};

export default function ReadingMapThanksPage({ lang: initialLang = "zh", setLang: setParentLang, onBack, onNavigate }) {
  const [lang, setLang] = useState(initialLang);
  const c = COPY[lang];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 交付頁不進搜索索引
  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex";
    document.head.appendChild(m);
    return () => document.head.removeChild(m);
  }, []);

  const switchLang = (l) => { setLang(l); setParentLang?.(l); };

  const btnBase = {
    border: "none", borderRadius: 16, cursor: "pointer",
    fontFamily: SANS, fontWeight: 600, fontSize: 13,
    padding: "6px 14px", transition: "background 0.15s,color 0.15s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f2ec", color: "#1c1915", fontFamily: SANS, WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        .rmty-card{display:flex;flex-direction:column;align-items:flex-start;text-align:left;text-decoration:none;background:#fff;border-radius:16px;padding:28px 26px;transition:transform .15s,box-shadow .2s}
        .rmty-card:hover{transform:translateY(-3px);box-shadow:0 10px 26px -16px rgba(70,55,25,.3)}
        .rmty-card:active{transform:scale(.98)}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(244,242,236,0.97)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "0.5px solid #e7e2d8", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <img src="/logo.png" alt="Chaologies" style={{ height: 22, objectFit: "contain", flexShrink: 0 }} />
          </button>
          <span style={{ color: "#d8d2c7", fontSize: 14 }}>·</span>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#3a352e", letterSpacing: -0.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {lang === "zh" ? "超說閱讀地圖 · 交付頁" : "Reading Map · Delivery"}
          </span>
        </div>
        <div style={{ display: "flex", gap: 2, background: "#e0dbd1", borderRadius: 20, padding: 3, flexShrink: 0 }}>
          <button onClick={() => switchLang("zh")} style={{ ...btnBase, background: lang === "zh" ? "#1c1915" : "transparent", color: lang === "zh" ? "#f4f2ec" : "#8a8276" }}>中文</button>
          <button onClick={() => switchLang("en")} style={{ ...btnBase, background: lang === "en" ? "#1c1915" : "transparent", color: lang === "en" ? "#f4f2ec" : "#8a8276" }}>EN</button>
        </div>
      </nav>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px 90px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>🎉</div>
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", color: "#c8881a", textTransform: "uppercase", marginBottom: 14 }}>{c.eyebrow}</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(28px,4.5vw,40px)", lineHeight: 1.25, letterSpacing: "-.5px", margin: "0 0 14px" }}>{c.title}</h1>
          <p style={{ fontSize: 15, color: "#6b645b", lineHeight: 1.75, maxWidth: "44ch", margin: "0 auto" }}>{c.sub}</p>
        </div>

        {/* 三個交付入口 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14, marginBottom: 36 }}>
          {c.items.map((item, i) => (
            <a
              key={i}
              className="rmty-card"
              href={item.href}
              {...(item.internal
                ? { onClick: (e) => { if (onNavigate) { e.preventDefault(); onNavigate(item.href); } } }
                : { target: "_blank", rel: "noopener noreferrer" })}
              style={{ border: item.highlight ? "2px solid #e4a11b" : "1px solid #e0d9cb" }}
            >
              <span style={{ fontSize: 28, marginBottom: 12 }}>{item.emoji}</span>
              <span style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: "#1c1915", marginBottom: 8 }}>{item.name}</span>
              <span style={{ fontSize: 13.5, lineHeight: 1.65, color: "#6b645b", marginBottom: 18, flex: 1 }}>{item.desc}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: item.highlight ? "#e4a11b" : "#6b645b" }}>{item.cta} →</span>
            </a>
          ))}
        </div>

        {/* Notion 安裝注意事項（折疊，不佔首屏） */}
        <details style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 13, padding: "16px 20px", marginBottom: 28 }}>
          <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#3a352e" }}>{c.notesTitle}</summary>
          <ul style={{ margin: "14px 0 4px", paddingLeft: 20, display: "grid", gap: 8 }}>
            {c.notes.map((n, i) => (
              <li key={i} style={{ fontSize: 13.5, lineHeight: 1.7, color: "#6b645b" }}>{n}</li>
            ))}
          </ul>
        </details>

        <p style={{ textAlign: "center", fontSize: 13, color: "#8a8276", margin: "0 0 10px" }}>{c.help}</p>
        <p style={{ textAlign: "center", margin: 0 }}>
          <a href="/reading-map" onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate("/reading-map"); } }} style={{ fontSize: 13, color: "#c8881a", textDecoration: "none" }}>{c.back}</a>
        </p>
      </main>
    </div>
  );
}
