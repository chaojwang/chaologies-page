import { useEffect, useMemo, useState } from "react";
import BOOKS from "./data/books.json";

/* ============================================================
   Chaologies 超說 · 閱讀地圖 — 網頁版交付組件
   ------------------------------------------------------------
   兩種用法：
   1. 買家完整版（/reading-map/access）：
        <ReadingMap accessCode={import.meta.env.VITE_RM_CODE} noindex />
      口令存 env（VITE_RM_CODE），不硬編碼進倉庫。
   2. Landing 試讀嵌入（/reading-map）：
        <ReadingMap embedded freePreview={8} onLockedClick={scrollToBuy} />
      embedded 模式只渲染 toolbar + 卡片區，鎖卡點擊交給
      onLockedClick（平滑滾動到購買區）。
   本文件經 React.lazy 動態引入，books.json 隨 chunk 懶加載，
   不影響 landing 首屏。
   ============================================================ */

const BUY_URL = "/reading-map"; // 鎖定狀態下的購買落地頁（站內）

const ABILITIES = {
  // 鍵名需與 books.json 的 ability 欄位（Notion 導出原文）完全一致
  清醒力: "#8FB8DE",
  洞察力: "#E8A0B4",
  沟通力: "#E3C25C",
  领导力: "#7FB69E",
  赚钱力: "#9BC47E",
  批判力: "#B08BBF",
  精力管理: "#9AA5B1",
  方向感: "#E08E8E",
  世界观: "#C4A484",
  创作力: "#F0A868",
  金钱观: "#C39BD3",
  故事力: "#E0B089",
};

// 能力身份文案（來自 Notion 標籤「能力｜XXX的人」的後半段）
const TAGLINES = {
  清醒力: "看清本質的人",
  洞察力: "更懂人心的人",
  沟通力: "表達清楚的人",
  领导力: "帶人成事的人",
  赚钱力: "看懂生意的人",
  批判力: "獨立判斷的人",
  精力管理: "狀態穩定的人",
  方向感: "活得明白的人",
  世界观: "看懂規則的人",
  创作力: "持續輸出的人",
  金钱观: "不為錢焦慮的人",
  故事力: "用故事表達的人",
};

function useNoindex(enabled) {
  useEffect(() => {
    if (!enabled) return;
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex";
    document.head.appendChild(m);
    return () => document.head.removeChild(m);
  }, [enabled]);
}

export default function ReadingMap({
  embedded = false,
  freePreview = 0,
  accessCode = "",
  onLockedClick,
  noindex = false,
}) {
  const [unlocked, setUnlocked] = useState(accessCode === "");
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [query, setQuery] = useState("");
  const [ability, setAbility] = useState("全部");
  const [view, setView] = useState("cards"); // cards | list
  const [active, setActive] = useState(null); // index of open book
  const [expanded, setExpanded] = useState(false); // 試讀模式下是否展開鎖定書目

  useNoindex(noindex);

  const books = BOOKS;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      const okA = ability === "全部" || b.ability === ability;
      const okQ =
        !q ||
        b.en.toLowerCase().includes(q) ||
        b.zh.includes(query.trim()) ||
        b.author.toLowerCase().includes(q) ||
        b.oneLine.includes(query.trim());
      return okA && okQ;
    });
  }, [books, query, ability]);

  const isLocked = (globalIdx) => freePreview > 0 && globalIdx >= freePreview;

  // 試讀模式：鎖定的書默認折疊，只亮出 demo；expanded 時可瀏覽完整書目
  const visible = useMemo(
    () => (freePreview > 0 && !expanded ? filtered.filter((b) => !isLocked(books.indexOf(b))) : filtered),
    [filtered, expanded, freePreview, books]
  );
  const hiddenCount = filtered.length - visible.length;

  const goUnlock = () => {
    if (onLockedClick) return onLockedClick();
    window.location.href = BUY_URL;
  };

  const openOrUpsell = (gi, locked) => {
    if (!locked) return setActive(gi);
    goUnlock();
  };

  const tryUnlock = () => {
    const input = codeInput.trim();
    if (input !== "" && input === accessCode) {
      setUnlocked(true);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  // 抽屜打開時：Esc 關閉 + 鎖定背景滾動
  useEffect(() => {
    if (active == null) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  if (!unlocked) {
    return (
      <div className="rm-root">
        <Style />
        <div className="rm-gate">
          <div className="rm-gate-card">
            <div className="rm-eyebrow">Chaologies 超說</div>
            <h1 className="rm-gate-title">閱讀地圖 · 網頁版</h1>
            <p className="rm-gate-sub">輸入購買憑證裡的訪問口令，開始探索 {books.length} 本書。</p>
            <div className="rm-gate-row">
              <input
                className="rm-input"
                type="text"
                value={codeInput}
                placeholder="訪問口令"
                onChange={(e) => setCodeInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
                aria-label="訪問口令"
              />
              <button className="rm-btn rm-btn-primary" onClick={tryUnlock}>
                進入
              </button>
            </div>
            {codeError && <p className="rm-gate-err">口令不對。它印在你的購買收據 / 交付頁裡，找不到就來信：hi@chaologies.com</p>}
            <a className="rm-gate-buy" href={BUY_URL}>
              還沒有閱讀地圖？看看它是什麼 →
            </a>
          </div>
        </div>
      </div>
    );
  }

  const activeBook = active != null ? books[active] : null;

  return (
    <div className={`rm-root ${embedded ? "rm-embedded" : ""}`}>
      <Style />

      {/* ------- Hero（嵌入模式下隱藏） ------- */}
      {!embedded && (
        <header className="rm-hero">
          <div className="rm-eyebrow">Chaologies 超說 · Reading Map</div>
          <h1 className="rm-title">
            {books.length} 本書的<span className="rm-title-accent">世界地圖</span>
          </h1>
          <p className="rm-sub">
            有些書幫我重新理解金錢，有些書幫我重新理解時間。每一本，我都整理了一句話、三個核心認知、留在我腦子裡的話，和一個小練習。
          </p>
          <div className="rm-entries" role="group" aria-label="選擇入口">
            <button className="rm-entry" onClick={() => { setView("cards"); setAbility("全部"); document.getElementById("rm-grid")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span className="rm-entry-no">入口一</span>
              <span className="rm-entry-name">按能力找書</span>
              <span className="rm-entry-hint">從你最想提升的能力開始，而不是從書名開始</span>
            </button>
            <button className="rm-entry" onClick={() => { setView("cards"); document.getElementById("rm-grid")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span className="rm-entry-no">入口二</span>
              <span className="rm-entry-name">精簡卡片</span>
              <span className="rm-entry-hint">快速看完一本書的核心</span>
            </button>
            <button className="rm-entry" onClick={() => { setView("list"); document.getElementById("rm-grid")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span className="rm-entry-no">入口三</span>
              <span className="rm-entry-name">完整書單</span>
              <span className="rm-entry-hint">列表格式，一屏掃完</span>
            </button>
          </div>
        </header>
      )}

      {/* ------- Toolbar ------- */}
      <div className="rm-toolbar">
        <div className="rm-chips" role="group" aria-label="按能力篩選">
          <Chip label="全部" color="#1c1915" active={ability === "全部"} onClick={() => setAbility("全部")} />
          {Object.entries(ABILITIES).map(([name, color]) => (
            <Chip key={name} label={name} color={color} active={ability === name} onClick={() => setAbility(name)} />
          ))}
        </div>
        <div className="rm-tools">
          <input
            className="rm-input rm-search"
            type="search"
            placeholder="搜書名 / 作者 / 關鍵詞"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="搜索書籍"
          />
          <div className="rm-viewtoggle" role="group" aria-label="切換視圖">
            <button className={`rm-vbtn ${view === "cards" ? "on" : ""}`} onClick={() => setView("cards")}>卡片</button>
            <button className={`rm-vbtn ${view === "list" ? "on" : ""}`} onClick={() => setView("list")}>列表</button>
          </div>
        </div>
      </div>

      {/* ------- Content ------- */}
      <main id="rm-grid" className="rm-main">
        <div className="rm-count">
          {filtered.length} / {books.length} 本
          {ability !== "全部" && (
            <span className="rm-tagline">　{ability} · 給想成為「{TAGLINES[ability]}」的你</span>
          )}
        </div>

        {filtered.length === 0 && (
          <div className="rm-empty">沒有匹配的書。換個關鍵詞，或點「全部」清掉篩選。</div>
        )}
        {filtered.length > 0 && visible.length === 0 && (
          <div className="rm-empty">這{ability !== "全部" ? `類的 ${filtered.length} 本書` : "些書"}都在完整地圖裡，解鎖後即可打開。</div>
        )}

        {view === "cards" ? (
          <div className="rm-cards">
            {visible.map((b) => {
              const gi = books.indexOf(b);
              const locked = isLocked(gi);
              return (
                <article key={b.en} className={`rm-card ${locked ? "locked" : ""}`}>
                  <button
                    className="rm-card-hit"
                    onClick={() => openOrUpsell(gi, locked)}
                    aria-label={locked ? `${b.zh}（解鎖完整版）` : `打開 ${b.zh}`}
                  >
                    <div className="rm-card-top">
                      <span className="rm-ability" style={{ background: ABILITIES[b.ability] + "33", color: "#1c1915", borderColor: ABILITIES[b.ability] }}>
                        {b.ability}
                      </span>
                      {b.hasZh && <span className="rm-haszh">有中文版</span>}
                    </div>
                    <h3 className="rm-card-zh">{b.zh}</h3>
                    <div className="rm-card-en">{b.en}</div>
                    <div className="rm-card-author">{b.author}</div>
                    <p className="rm-card-line">{locked ? "解鎖後查看更多精彩內容。" : b.oneLine}</p>
                    <div className={`rm-card-cta ${locked ? "rm-card-cta-lock" : ""}`}>{locked ? "🔒 解鎖完整地圖" : "打開書卡 →"}</div>
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rm-table-wrap">
            <table className="rm-table">
              <thead>
                <tr>
                  <th>書名</th>
                  <th>作者</th>
                  <th>能力</th>
                  <th className="rm-th-line">一句話</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((b) => {
                  const gi = books.indexOf(b);
                  const locked = isLocked(gi);
                  return (
                    <tr key={b.en} onClick={() => openOrUpsell(gi, locked)} tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && openOrUpsell(gi, locked)}>
                      <td>
                        <div className="rm-td-zh">{b.zh}</div>
                        <div className="rm-td-en">{b.en}</div>
                      </td>
                      <td className="rm-td-author">{b.author}</td>
                      <td>
                        <span className="rm-ability" style={{ background: ABILITIES[b.ability] + "33", borderColor: ABILITIES[b.ability] }}>
                          {b.ability}
                        </span>
                      </td>
                      <td className="rm-td-line">{locked ? "🔒 解鎖後查看更多精彩內容" : b.oneLine}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* 試讀模式：大號解鎖 CTA + 可展開的完整書目 */}
        {freePreview > 0 && books.length > freePreview && (
          <div className="rm-unlock">
            <button className="rm-unlock-btn" onClick={goUnlock}>
              🔓 解鎖完整地圖 · 共 {books.length} 本 →
            </button>
            {(hiddenCount > 0 || expanded) && (
              <button className="rm-expand-btn" onClick={() => setExpanded((v) => !v)}>
                {expanded ? "收起完整書單 ↑" : `先逛逛完整書單（還有 ${hiddenCount} 本）↓`}
              </button>
            )}
          </div>
        )}
      </main>

      {/* ------- Detail drawer ------- */}
      {activeBook && (
        <div className="rm-overlay" onClick={() => setActive(null)} role="dialog" aria-modal="true" aria-label={activeBook.zh}>
          <aside className="rm-drawer" onClick={(e) => e.stopPropagation()}>
            <button className="rm-close" onClick={() => setActive(null)} aria-label="關閉">✕</button>
            <span className="rm-ability" style={{ background: ABILITIES[activeBook.ability] + "33", borderColor: ABILITIES[activeBook.ability] }}>
              {activeBook.ability}
            </span>
            <h2 className="rm-d-zh">{activeBook.zh}</h2>
            <div className="rm-d-en">{activeBook.en} · {activeBook.author}</div>

            <section className="rm-d-sec">
              <div className="rm-d-label">一句話</div>
              <p className="rm-d-oneline">{activeBook.oneLine}</p>
            </section>

            <section className="rm-d-sec">
              <div className="rm-d-label">三個核心認知</div>
              <ol className="rm-d-insights">
                {activeBook.insights.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </section>

            <section className="rm-d-sec">
              <div className="rm-d-label">一直留在我腦子裡的話</div>
              <blockquote className="rm-d-quote">
                "{activeBook.quote}"
                {activeBook.quoteZh && <span className="rm-d-quotezh">「{activeBook.quoteZh}」</span>}
              </blockquote>
            </section>

            <section className="rm-d-sec">
              <div className="rm-d-label">我的一個改變</div>
              <p>{activeBook.change}</p>
            </section>

            <section className="rm-d-sec rm-d-exercise">
              <div className="rm-d-label">小練習</div>
              <p>{activeBook.exercise}</p>
            </section>
          </aside>
        </div>
      )}

      {!embedded && (
        <footer className="rm-footer">
          Created by <strong>Chaologies 超說</strong> · Youtube｜B站｜小紅書｜公眾號
        </footer>
      )}
    </div>
  );
}

function Chip({ label, color, active, onClick }) {
  return (
    <button
      className={`rm-chip ${active ? "on" : ""}`}
      style={active ? { background: "#1c1915", color: "#fff", borderColor: "#1c1915" } : { borderColor: color }}
      onClick={onClick}
    >
      <span className="rm-chip-dot" style={{ background: color }} />
      {label}
    </button>
  );
}

function Style() {
  return (
    <style>{`
      .rm-root {
        /* token 對齊 ReadingMapPage（landing）實際值 */
        --ink: #1c1915; --paper: #faf9f4; --accent: #e4a11b;
        --sand: #f7eacf; --muted: #8a8276; --line: #e7e2d8;
        background: var(--paper); color: var(--ink); min-height: 100vh;
        font-family: "Inter", "Noto Sans SC", "Noto Sans TC", system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      .rm-root :is(h1,h2,h3) { font-family: "LXGW WenKai", "Noto Serif SC", Georgia, serif; }
      .rm-root.rm-embedded { background: transparent; min-height: 0; }

      .rm-eyebrow { font-size: 12px; letter-spacing: .18em; text-transform: uppercase; color: var(--accent); font-weight: 600; }

      /* Gate */
      .rm-gate { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      .rm-gate-card { max-width: 420px; width: 100%; background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 36px 32px; }
      .rm-gate-title { font-size: 28px; margin: 10px 0 6px; }
      .rm-gate-sub { color: var(--muted); font-size: 14px; margin: 0 0 18px; }
      .rm-gate-row { display: flex; gap: 8px; }
      .rm-gate-err { color: #c0392b; font-size: 13px; margin-top: 10px; }
      .rm-gate-buy { display: inline-block; margin-top: 18px; font-size: 13px; color: var(--accent); text-decoration: none; }
      .rm-gate-buy:hover { text-decoration: underline; }

      .rm-input { border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; font-size: 14px; background: #fff; flex: 1; font-family: inherit; }
      .rm-input:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
      .rm-btn { border: none; border-radius: 10px; padding: 10px 18px; font-size: 14px; cursor: pointer; font-family: inherit; }
      .rm-btn-primary { background: var(--accent); color: #fff; font-weight: 600; }
      .rm-btn-primary:hover { filter: brightness(.95); }
      .rm-btn:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }

      /* Hero */
      .rm-hero { max-width: 980px; margin: 0 auto; padding: 72px 24px 28px; }
      .rm-title { font-size: clamp(34px, 6vw, 56px); line-height: 1.1; margin: 14px 0 12px; font-weight: 700; }
      .rm-title-accent { color: var(--accent); }
      .rm-sub { max-width: 620px; color: var(--muted); font-size: 16px; line-height: 1.8; margin: 0 0 28px; }
      .rm-entries { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .rm-entry { text-align: left; background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 16px; cursor: pointer; display: grid; gap: 4px; transition: border-color .15s, transform .15s; font-family: inherit; }
      .rm-entry:hover { border-color: var(--accent); transform: translateY(-2px); }
      .rm-entry:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
      .rm-entry-no { font-size: 11px; letter-spacing: .14em; color: var(--accent); font-weight: 600; }
      .rm-entry-name { font-size: 17px; font-weight: 700; }
      .rm-entry-hint { font-size: 12.5px; color: var(--muted); }

      /* Toolbar */
      .rm-toolbar { position: sticky; top: 0; z-index: 5; background: rgba(250,249,244,.92); backdrop-filter: blur(8px); border-bottom: 1px solid var(--line); padding: 12px 24px; display: grid; gap: 10px; }
      .rm-embedded .rm-toolbar { top: 60px; background: rgba(244,242,236,.92); border-top: 1px solid var(--line); border-radius: 0; }
      .rm-chips { display: flex; flex-wrap: wrap; gap: 8px; max-width: 980px; margin: 0 auto; width: 100%; }
      .rm-chip { display: inline-flex; align-items: center; gap: 6px; border: 1px solid; background: #fff; border-radius: 999px; padding: 5px 12px; font-size: 13px; cursor: pointer; font-family: inherit; }
      .rm-chip-dot { width: 8px; height: 8px; border-radius: 50%; }
      .rm-chip:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
      .rm-tools { display: flex; gap: 10px; max-width: 980px; margin: 0 auto; width: 100%; }
      .rm-search { max-width: 320px; }
      .rm-viewtoggle { display: inline-flex; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
      .rm-vbtn { border: none; background: #fff; padding: 8px 16px; font-size: 13px; cursor: pointer; font-family: inherit; }
      .rm-vbtn.on { background: var(--ink); color: #fff; }

      /* Main */
      .rm-main { max-width: 980px; margin: 0 auto; padding: 20px 24px 80px; }
      .rm-embedded .rm-main { padding-bottom: 24px; }
      .rm-count { font-size: 13px; color: var(--muted); margin: 4px 0 16px; }
      .rm-tagline { color: var(--accent); font-weight: 600; }
      .rm-empty { padding: 60px 0; text-align: center; color: var(--muted); }

      .rm-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
      .rm-card { background: #fff; border: 1px solid var(--line); border-radius: 14px; overflow: hidden; transition: border-color .15s, transform .15s; }
      .rm-card:hover { border-color: var(--accent); transform: translateY(-2px); }
      .rm-card.locked { opacity: .78; }
      .rm-card-hit { all: unset; box-sizing: border-box; display: block; padding: 18px; cursor: pointer; width: 100%; }
      .rm-card-hit:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
      .rm-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
      .rm-ability { font-size: 11.5px; border: 1px solid; border-radius: 999px; padding: 2px 9px; }
      .rm-haszh { font-size: 11px; color: var(--muted); }
      .rm-card-zh { font-size: 18px; margin: 0 0 2px; }
      .rm-card-en { font-size: 13px; color: var(--muted); }
      .rm-card-author { font-size: 12px; color: var(--muted); margin: 6px 0 10px; }
      .rm-card-line { font-size: 14px; line-height: 1.7; margin: 0 0 14px; min-height: 3.4em; }
      .rm-card-cta { display: inline-block; font-size: 14px; font-weight: 700; color: var(--accent); border: 1.5px solid var(--accent); border-radius: 10px; padding: 9px 18px; transition: background .15s, color .15s; }
      .rm-card:hover .rm-card-cta { background: var(--accent); color: #fff; }
      .rm-card-cta-lock { background: var(--ink); border-color: var(--ink); color: #fff; }
      .rm-card.locked:hover .rm-card-cta-lock { background: var(--accent); border-color: var(--accent); }

      /* 試讀模式：解鎖 CTA + 展開書目 */
      .rm-unlock { display: grid; justify-items: center; gap: 14px; margin-top: 32px; text-align: center; }
      .rm-unlock-btn { background: var(--accent); color: #fff; border: none; border-radius: 12px; font-family: inherit; font-size: 16.5px; font-weight: 700; padding: 16px 34px; cursor: pointer; box-shadow: 0 10px 26px -12px rgba(196,136,26,.55); transition: filter .15s, transform .15s; }
      .rm-unlock-btn:hover { filter: brightness(.94); transform: translateY(-1px); }
      .rm-unlock-btn:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
      .rm-expand-btn { background: none; border: none; font-family: inherit; font-size: 13.5px; color: var(--muted); cursor: pointer; text-decoration: underline; text-underline-offset: 3px; text-decoration-style: dotted; }
      .rm-expand-btn:hover { color: var(--ink); }

      .rm-table-wrap { overflow-x: auto; background: #fff; border: 1px solid var(--line); border-radius: 14px; }
      .rm-table { width: 100%; border-collapse: collapse; font-size: 14px; }
      .rm-table th { text-align: left; font-size: 12px; letter-spacing: .06em; color: var(--muted); padding: 12px 14px; border-bottom: 1px solid var(--line); }
      .rm-table td { padding: 12px 14px; border-bottom: 1px solid var(--line); vertical-align: top; }
      .rm-table tr { cursor: pointer; }
      .rm-table tbody tr:hover { background: #f4f2ec; }
      .rm-table tr:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
      .rm-td-zh { font-weight: 600; }
      .rm-td-en { font-size: 12px; color: var(--muted); }
      .rm-td-author { color: var(--muted); font-size: 13px; }
      .rm-td-line { max-width: 340px; line-height: 1.6; }

      /* Drawer */
      .rm-overlay { position: fixed; inset: 0; background: rgba(28,25,21,.4); z-index: 200; display: flex; justify-content: flex-end; }
      .rm-drawer { background: var(--paper); width: min(480px, 100%); height: 100%; overflow-y: auto; padding: 40px 32px 60px; position: relative; animation: rm-in .22s ease; }
      @keyframes rm-in { from { transform: translateX(24px); opacity: 0; } to { transform: none; opacity: 1; } }
      @media (prefers-reduced-motion: reduce) { .rm-drawer { animation: none; } .rm-card, .rm-entry { transition: none; } }
      .rm-close { position: absolute; top: 16px; right: 16px; border: 1px solid var(--line); background: #fff; border-radius: 50%; width: 34px; height: 34px; cursor: pointer; font-size: 14px; }
      .rm-close:focus-visible { outline: 2px solid var(--accent); }
      .rm-d-zh { font-size: 26px; margin: 12px 0 4px; }
      .rm-d-en { color: var(--muted); font-size: 14px; margin-bottom: 22px; }
      .rm-d-sec { margin-bottom: 22px; }
      .rm-d-sec p { white-space: pre-line; line-height: 1.75; margin: 0; }
      .rm-d-label { font-size: 11px; letter-spacing: .16em; color: var(--accent); font-weight: 700; margin-bottom: 7px; text-transform: uppercase; }
      .rm-d-oneline { font-size: 17px; font-weight: 600; }
      .rm-d-insights { margin: 0; padding-left: 20px; display: grid; gap: 6px; line-height: 1.7; }
      .rm-d-quote { margin: 0; padding: 14px 16px; background: var(--sand); border-left: 3px solid var(--accent); border-radius: 0 10px 10px 0; font-style: italic; line-height: 1.7; }
      .rm-d-quotezh { display: block; margin-top: 6px; font-style: normal; color: var(--muted); font-size: 14px; }
      .rm-d-exercise { background: #fff; border: 1px dashed var(--accent); border-radius: 12px; padding: 14px 16px; }

      .rm-footer { text-align: center; color: var(--muted); font-size: 13px; padding: 28px 0 48px; border-top: 1px solid var(--line); }

      @media (max-width: 720px) {
        .rm-entries { grid-template-columns: 1fr; }
        .rm-hero { padding-top: 48px; }
        .rm-tools { flex-wrap: wrap; }
        .rm-td-line { max-width: none; }
      }
    `}</style>
  );
}
