// ─────────────────────────────────────────────────────
//  App.jsx — Chaologies home (design-system port)
//  Left sticky profile + right platforms & projects
//  ▸ 2024 redesign: bilingual hero headline, follower stat
//    as a sentence, reordered platforms, growth sparklines.
// ─────────────────────────────────────────────────────

import { useState, useEffect, useMemo } from "react";
import { siteData as staticData } from "./data.js";
import { supabase, transformSiteData } from "./lib/supabase.js";
import Blog from "./Blog.jsx";
import BudgetPage from "./BudgetPage.jsx";
import NewsletterPage from "./NewsletterPage.jsx";
import FCPXPage from "./FCPXPage.jsx";
import NotionWeeklyPage from "./NotionWeeklyPage.jsx";
import WechatModal from "./WechatModal.jsx";

function useSiteData() {
  const [siteData, setSiteData] = useState(staticData);
  useEffect(() => {
    Promise.all([
      supabase.from("profile").select("*").eq("id", 1).single(),
      supabase.from("platforms").select("*").order("sort_order"),
      supabase.from("projects").select("*").order("sort_order"),
    ]).then(([{ data: profile }, { data: platforms }, { data: projects }]) => {
      if (profile && platforms && projects) {
        setSiteData(transformSiteData(profile, platforms, projects));
      }
    });
  }, []);
  return siteData;
}

// ── Static, bilingual copy (left column → Traditional zh) ──
const COPY = {
  journal: { en: "Blog", zh: "博客" },
  bubble: { en: "Hi, I'm Chao", zh: "你好，我是 Chao" },

  // Hero headline — primary language large, the other language quiet below.
  heroPrimary: {
    en: "Tax Consultant turned Entrepreneur & Creator",
    zh: "財稅顧問，變身創業者與創作者",
  },
  heroSecondary: {
    en: "Big 4 財稅顧問 · 變身創業者與創作者",
    zh: "Big 4 Tax Consultant turned Entrepreneur & Creator",
  },
  heroDesc: {
    en: "I share honest lessons on money, minimalism, habits, AI & creating — to help you make a complex life gradually clearer.",
    zh: "我分享關於金錢、極簡、習慣、AI 與創作的真實經驗，幫你把複雜的生活，一點點變得更清楚。",
  },

  // Follower stat, framed as a sentence around the live number.
  joinPre: { en: "Join", zh: "加入" },
  joinUnit: { en: "friends following along", zh: "位同行的朋友" },
  joinDesc: {
    en: "Following along for honest takes on money, minimalism, habits, AI & career changes — and building a freer life system.",
    zh: "關注這個頻道，我們一起聊聊金錢、極簡、習慣、AI 與轉行，以及如何搭建更自由的生活系統。",
  },

  subLabel: { en: "The Newsletter", zh: "訂閱 Newsletter" },
  subLead: {
    en: "Every week: practical notes on life, money, and good books. Free, always.",
    zh: "每週你會收到關於生活、金錢和好書的實用分享，完全免費。",
  },
  subscribe: { en: "Subscribe — it's free", zh: "免費訂閱" },
  wechat: { en: "Follow on WeChat", zh: "關注公眾號" },
  reviews: { en: "Loved by 2M+ readers", zh: "全網 200w+ 點讚收藏" },
  ctaFine: {
    en: "One email, no spreadsheets. Unsubscribe anytime.",
    zh: "一封郵件，不含任何報表。隨時退訂。",
  },
  whereLabel: { en: "Where I show up", zh: "我在這裡創作和分享" },
  whereSub: {
    en: "Find me here — tap any card to follow →",
    zh: "在這些平台找到我，點一下卡片就能關注 →",
  },
  buildingLabel: { en: "Things I'm building", zh: "我正在做的東西" },
  buildingSub: {
    en: "Products, templates & courses I've made",
    zh: "我做的產品、模板和課程",
  },
  live: { en: "Live", zh: "進行中" },
  soon: { en: "Soon", zh: "敬請期待" },
  followers: { en: "followers", zh: "粉絲" },
  essays: { en: "Essays", zh: "長文" },
  footSign: {
    en: "Made in Singapore, fueled by kopi & kaya toast.",
    zh: "新加坡出品，靠南洋咖啡和椰香麵包供能。(Kopi & Kaya Toast)",
  },
  footNow: {
    en: "Currently: 📍 Singapore · building Money OS · dad life: 2 years in",
    zh: "近況：現居 📍 新加坡 ～ 在做 Money OS ～ 奶爸經驗：兩年",
  },
};

// Project links → small icon buttons
const PLATFORM_ICON = {
  gumroad: "/icons/gumroad.png",
  bilibili: "/icons/bilibili.png",
  xiaohongshu: "/icons/xiaohongshu.png",
  xiaoe: "🎓",
  notion: "📄",
  ebook: "📖",
};

// ════════════════════════════════════════════════════
//  Growth sparkline (deterministic per platform)
// ════════════════════════════════════════════════════

// Stable string → 32-bit hash, then a small seeded PRNG, so every
// platform always draws its OWN curve (flat for a while, then rises),
// and no two look identical — no data needed in the DB.
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function growthSeries(seed, n = 10) {
  const rnd = mulberry32(hashStr(seed));
  const base = 0.1 + rnd() * 0.06; // low, flat start
  const knee = Math.floor(n * (0.42 + rnd() * 0.32)); // when it starts to climb
  const peak = 0.58 + rnd() * 0.42; // final height
  const curve = 1.0 + rnd() * 0.9; // steepness of the ramp
  const out = [];
  for (let i = 0; i < n; i++) {
    if (i < knee) {
      out.push(base + (rnd() - 0.5) * 0.02);
    } else {
      const tt = (i - knee) / Math.max(1, n - 1 - knee);
      const eased = Math.pow(tt, curve);
      out.push(base + (peak - base) * eased + (rnd() - 0.5) * 0.03);
    }
  }
  return out.map((v) => Math.max(0.06, Math.min(1, v)));
}

const SW = 300, SH = 62, SP = 9;
function sparkPaths(vals) {
  const n = vals.length;
  const pts = vals.map((v, i) => [(i / (n - 1)) * SW, SH - SP - v * (SH - 2 * SP)]);
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || pts[i + 1];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return { line: d, area: `${d} L ${SW} ${SH} L 0 ${SH} Z` };
}

function Sparkline({ seed }) {
  const vals = useMemo(() => growthSeries(seed), [seed]);
  const { line, area } = useMemo(() => sparkPaths(vals), [vals]);
  const dur = useMemo(() => {
    const r = mulberry32(hashStr(seed + "d"));
    return (0.9 + r() * 0.5).toFixed(2);
  }, [seed]);
  const gid = "spk-" + seed.replace(/[^a-z0-9]/gi, "");
  return (
    <div className="pcard-chart" style={{ "--draw": dur + "s" }}>
      <svg className="spark spark-base" viewBox="0 0 300 62" preserveAspectRatio="none">
        <path d={line} fill="none" stroke="#E2DCCF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="spark spark-reveal" viewBox="0 0 300 62" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E4A11B" stopOpacity="0.26" />
            <stop offset="1" stopColor="#E4A11B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gid})`} />
        <path d={line} fill="none" stroke="#E4A11B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// Pin YouTube + the blog to the top; sort the rest by follower count desc.
function parseFollowers(s) {
  if (!s) return -1;
  const m = String(s).replace(/,/g, "").match(/([\d.]+)\s*([kKmM万]?)/);
  if (!m) return -1;
  let n = parseFloat(m[1]);
  const u = m[2].toLowerCase();
  if (u === "k") n *= 1e3;
  else if (u === "m") n *= 1e6;
  else if (u === "万") n *= 1e4;
  return n;
}
function orderPlatforms(list) {
  const arr = list || [];
  const yt = arr.filter((p) => /youtube/i.test(p.name || ""));
  const blog = arr.filter((p) => p.isPage);
  const rest = arr
    .filter((p) => !/youtube/i.test(p.name || "") && !p.isPage)
    .sort((a, b) => parseFollowers(b.followers) - parseFollowers(a.followers));
  return [...yt, ...blog, ...rest];
}

// ════════════════════════════════════════════════════
//  Nav
// ════════════════════════════════════════════════════

function Nav({ lang, setLang, onNavigate }) {
  return (
    <nav className="nav">
      <a className="brand" href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); }}>
        <img src="/logo.png?v=3" alt="Chaologies" className="logo-img" />
      </a>
      <div className="nav-right">
        <button className="nav-link blog-link" onClick={() => onNavigate("/blog")}>
          <span className="nl-default">{COPY.journal[lang]}</span>
          <span className="nl-hover">Blog</span>
        </button>
        <div className="lang">
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          <button className={lang === "zh" ? "on" : ""} onClick={() => setLang("zh")}>中</button>
        </div>
      </div>
    </nav>
  );
}

// ════════════════════════════════════════════════════
//  Profile — left sticky column
// ════════════════════════════════════════════════════

function Profile({ lang, data }) {
  const { totalFollowers, newsletter } = data;
  const [count, setCount] = useState(totalFollowers);
  const [wechatOpen, setWechatOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState("idle"); // idle | loading | success | error

  useEffect(() => setCount(totalFollowers), [totalFollowers]);

  // gentle live follower count — restraint, not spectacle
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        const r = Math.random();
        if (r < 0.7) return c + Math.floor(Math.random() * 4) + 1;
        if (r > 0.96) return Math.max(c - 1, totalFollowers);
        return c;
      });
    }, 2600);
    return () => clearInterval(id);
  }, [totalFollowers]);

  const subUrl = `${newsletter.url.replace(/\/$/, "")}?utm_source=website`;

  async function handleSubscribe(e) {
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

  return (
    <aside className="profile">
      {/* avatar + speech bubble (top-right of the avatar) */}
      <div className="intro">
        <div className="avatar-wrap">
          <img className="avatar" src="/avatar.jpg" alt="Chao" />
        </div>
        <div className="bubble">
          <span className="bubble-t">{COPY.bubble[lang]}</span>
          <span className="wave">👋</span>
        </div>
      </div>

      {/* bilingual hero headline */}
      <h1 className="hero-head">
        <span className="hl">Big 4</span> {COPY.heroPrimary[lang]}
      </h1>
      <p className="hero-sub">{COPY.heroSecondary[lang]}</p>
      <p className="hero-desc">{COPY.heroDesc[lang]}</p>

      {/* follower stat, as a sentence */}
      <div className="statline-wrap">
        <div className="statline">
          <span className="pre">{COPY.joinPre[lang]}</span>
          <span className="num">{count.toLocaleString("en-US")}</span>
          <span className="unit">{COPY.joinUnit[lang]}</span>
        </div>
        <p className="stat-desc">{COPY.joinDesc[lang]}</p>
      </div>

      {/* newsletter */}
      <div className="subscribe">
        <div className="sub-top">
          <div>
            <span className="sub-label">{COPY.subLabel[lang]}</span>
            <p className="sub-lead">{COPY.subLead[lang]}</p>
          </div>
          <img className="plane" src="/air.png" alt="" />
        </div>
        {subState === "success" ? (
          <p className="sub-success">{lang === "zh" ? "✓ 已訂閱，感謝！" : "✓ Subscribed — thanks!"}</p>
        ) : (
          <form className="sub-form" onSubmit={handleSubscribe}>
            <input
              className="sub-email"
              type="email"
              required
              placeholder={lang === "zh" ? "你的邮件地址" : "Your email address"}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setSubState("idle"); }}
            />
            <button className="sub-cta" type="submit" disabled={subState === "loading"}>
              <span className="sub-cta-zh">{subState === "loading" ? "…" : "免費訂閱"}</span>
              <span className="sub-cta-en">Subscribe</span>
            </button>
            {subState === "error" && (
              <p className="sub-error">{lang === "zh" ? "出錯了，請稍後再試" : "Something went wrong, try again"}</p>
            )}
          </form>
        )}
        <div className="sub-btns">
          <button className="sub-wechat" onClick={() => setWechatOpen(true)}>
            <img className="sub-wechat-ic" src="/icons/wechat.png" alt="" />
            <span>{COPY.wechat[lang]}</span>
          </button>
        </div>
        <div className="sub-proof">
          <span className="stars">★★★★★</span>
          <span className="reviews">{COPY.reviews[lang]}</span>
        </div>
        <p className="cta-fine">{COPY.ctaFine[lang]}</p>
      </div>
      {wechatOpen && <WechatModal lang={lang} onClose={() => setWechatOpen(false)} />}
    </aside>
  );
}

// ════════════════════════════════════════════════════
//  Platform card
// ════════════════════════════════════════════════════

function PlatformCard({ p, lang, onNavigate }) {
  const name = lang === "zh" ? p.nameZh || p.name : p.name;
  const isEmoji = p.logoUrl && p.logoUrl.length <= 2;
  const handle = p.isPage
    ? lang === "zh" ? p.handleZh || p.handle : p.handle
    : "@" + (p.handle || "Chaologies");

  const inner = (
    <>
      <div className="pcard-head">
        <div className="pcard-id">
          {isEmoji ? (
            <span className="pcard-emoji">{p.logoUrl}</span>
          ) : (
            <img className="pcard-logo" src={p.logoUrl} alt="" />
          )}
          <div className="pcard-meta">
            <span className="pcard-name">{name}</span>
            <span className="pcard-handle">{handle}</span>
          </div>
        </div>
        <span className="pcard-badge">
          {p.isPage ? (
            COPY.essays[lang]
          ) : (
            <>
              <span className="bn">{p.followers}</span>
              <span className="bu">{COPY.followers[lang]}</span>
            </>
          )}
        </span>
      </div>
      <Sparkline seed={(p.name || "x") + (p.followers || "")} />
    </>
  );

  if (p.isPage) {
    return (
      <button className="pcard blog" onClick={() => onNavigate(p.url)}>
        {inner}
      </button>
    );
  }
  return (
    <a className="pcard" href={p.url} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  );
}

// ════════════════════════════════════════════════════
//  Project card
// ════════════════════════════════════════════════════

function ProjectCard({ project, lang, onNavigate }) {
  const isLive = project.status === "active" || project.status === "course";
  const hasLinks = project.links && project.links.length > 0;

  return (
    <div className={`jcard ${isLive ? "live" : "dim"}`}>
      <div className="jcard-top">
        <span className="jcard-emoji">{project.icon}</span>
        <span className={`status ${isLive ? "live" : "soon"}`}>
          {isLive ? COPY.live[lang] : COPY.soon[lang]}
        </span>
      </div>
      <div className="jcard-title">{project.title[lang]}</div>
      <div className="jcard-desc">{project.desc[lang]}</div>
      {isLive && hasLinks && (
        <div className="jcard-links">
          {project.links.map((link, idx) => {
            const icon = PLATFORM_ICON[link.platform];
            const isImg = icon && icon.endsWith(".png");
            const isInternal = link.url && link.url.startsWith("/");
            const label = link.label ? (link.label[lang] || link.label.en) : null;
            if (isInternal) {
              return (
                <button
                  key={idx}
                  className="link-btn link-btn-text"
                  onClick={() => onNavigate(link.url)}
                  title={link.platform}
                >
                  {label || "→"}
                </button>
              );
            }
            return (
              <a
                key={idx}
                className="link-btn"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
              >
                {isImg ? (
                  <img className="link-icon" src={icon} alt={link.platform} />
                ) : (
                  icon || "🔗"
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════
//  Right column
// ════════════════════════════════════════════════════

function RightColumn({ lang, data, onNavigate }) {
  const pad2 = (n) => String(n).padStart(2, "0");
  const platforms = orderPlatforms(data.platforms);
  return (
    <section className="right-col">
      <div className="section">
        <div className="section-head">
          <div className="section-label">
            <span>{COPY.whereLabel[lang]}</span>
            <span className="n">{pad2(platforms.length)}</span>
          </div>
          <p className="section-sub">{COPY.whereSub[lang]}</p>
        </div>
        <div className="grid">
          {platforms.map((p, i) => (
            <PlatformCard key={i} p={p} lang={lang} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <div className="section-label">
            <span>{COPY.buildingLabel[lang]}</span>
            <span className="n">{pad2(data.projects.length)}</span>
          </div>
          <p className="section-sub">{COPY.buildingSub[lang]}</p>
        </div>
        <div className="grid">
          {data.projects.map((project, i) => (
            <ProjectCard key={i} project={project} lang={lang} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════
//  App root
// ════════════════════════════════════════════════════

// keep in-app routing and the URL bar in sync, so /blog and /budget
// are real, shareable links with working back/forward.
const pathToPage = (path) =>
  path === "/budget" ? "/budget" : path === "/blog" ? "/blog" : path === "/newsletter" ? "/newsletter" : path === "/fcpx" ? "/fcpx" : path === "/notion-weekly" ? "/notion-weekly" : "home";
const pageToPath = (page) => (page === "home" ? "/" : page);

export default function App() {
  const [lang, setLang] = useState("zh");
  const [currentPage, setCurrentPage] = useState(
    pathToPage(window.location.pathname)
  );
  const siteData = useSiteData();

  // sync state when the user hits the browser back/forward buttons
  useEffect(() => {
    const onPop = () => setCurrentPage(pathToPage(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    const path = pageToPath(page);
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
  };

  if (currentPage === "/blog") {
    return (
      <Blog
        lang={lang}
        setLang={setLang}
        data={siteData}
        onBack={() => handleNavigate("home")}
      />
    );
  }

  if (currentPage === "/budget") {
    return (
      <BudgetPage
        lang={lang}
        setLang={setLang}
        onBack={() => handleNavigate("home")}
      />
    );
  }

  if (currentPage === "/notion-weekly") {
    return (
      <NotionWeeklyPage
        lang={lang}
        setLang={setLang}
        onBack={() => handleNavigate("home")}
      />
    );
  }

  if (currentPage === "/fcpx") {
    return (
      <FCPXPage
        lang={lang}
        onBack={() => handleNavigate("home")}
      />
    );
  }

  if (currentPage === "/newsletter") {
    return (
      <NewsletterPage
        lang={lang}
        setLang={setLang}
        onBack={() => handleNavigate("home")}
      />
    );
  }

  return (
    <div className="page">
      <Nav lang={lang} setLang={setLang} onNavigate={handleNavigate} />
      <div className="layout">
        <Profile lang={lang} data={siteData} />
        <RightColumn lang={lang} data={siteData} onNavigate={handleNavigate} />
      </div>
      <footer className="foot">
        <p className="sign">{COPY.footSign[lang]}</p>
        <p className="now">{COPY.footNow[lang]}</p>
      </footer>
    </div>
  );
}
