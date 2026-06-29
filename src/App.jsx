// ─────────────────────────────────────────────────────
//  App.jsx — Chaologies home (design-system port)
//  Left sticky profile + right platforms & projects
// ─────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { siteData as staticData } from "./data.js";
import { supabase, transformSiteData } from "./lib/supabase.js";
import Blog from "./Blog.jsx";
import BudgetPage from "./BudgetPage.jsx";
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
  based: { en: "Based in Singapore", zh: "現居新加坡" },
  followersLabel: { en: "followers across every platform", zh: "全網粉絲" },
  subLabel: { en: "The Newsletter", zh: "訂閱 Newsletter" },
  subLead: {
    en: "Essays on money & minimalism — about twice a month.",
    zh: "關於錢與極簡主義的長文，大約每月兩篇。",
  },
  subscribe: { en: "Subscribe", zh: "訂閱" },
  wechat: { en: "Follow on WeChat", zh: "關注公眾號" },
  reviews: { en: "Loved by 2M+ readers", zh: "全網 200w+ 點讚收藏" },
  ctaFine: {
    en: "One email, no spreadsheets. Unsubscribe anytime.",
    zh: "一封郵件，不含任何報表。隨時退訂。",
  },
  whereLabel: { en: "Where I show up", zh: "我在这里创作和分享" },
  buildingLabel: { en: "Things I'm building", zh: "我正在做的东西" },
  live: { en: "Live", zh: "进行中" },
  soon: { en: "Soon", zh: "敬请期待" },
  followers: { en: "followers", zh: "粉丝" },
  footSign: {
    en: "Made in Singapore, fueled by kopi and a mild, well-organised fear of clutter.",
    zh: "新加坡出品。靠咖啡，和一种井井有条的「怕乱」供能。",
  },
  footNow: {
    en: "Currently: in Singapore · building a life system · avoiding second monitors.",
    zh: "近况：现居新加坡 · 在做一套 life system · 躲着第二块显示器。",
  },
};

const ROUTE = [
  { code: "LON", place: { en: "United Kingdom · 2002", zh: "英国 · 2002" } },
  { code: "YYZ", place: { en: "Canada · 2009, 2013", zh: "加拿大 · 2009、2013" } },
  { code: "PEK", place: { en: "China · 2011, 2021", zh: "中国 · 2011、2021" } },
  { code: "DXB", place: { en: "Dubai · 2022", zh: "迪拜 · 2022" } },
  { code: "SIN", place: { en: "Singapore · 2024 — now", zh: "新加坡 · 2024 — 至今" }, now: true },
];

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
  const { hook, mission, totalFollowers, newsletter } = data;
  const [count, setCount] = useState(totalFollowers);
  const [wechatOpen, setWechatOpen] = useState(false);

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

  return (
    <aside className="profile">
      <div className="intro">
        <div className="avatar-wrap">
          <img className="avatar" src="/avatar.jpg" alt="Chao" />
          <div className="avatar-ring" />
        </div>
        <div className="bubble">
          <h1>{COPY.bubble[lang]}</h1>
          <span className="wave">👋</span>
        </div>
      </div>

      <div className="origin">
        <div className="route">
          {ROUTE.map((s, i) => (
            <span key={s.code} style={{ display: "contents" }}>
              {i > 0 &&
                (s.now ? (
                  <span className="rplane">✈</span>
                ) : (
                  <span className="hop" />
                ))}
              <span className={`leg${s.now ? " now" : ""}`} title={s.place[lang]}>
                {s.code}
              </span>
            </span>
          ))}
        </div>
        <div className="origin-cap">
          <span className="pin">◆</span>
          <span>{COPY.based[lang]}</span>
        </div>
      </div>

      <div className="bigstat">
        <span className="num">{count.toLocaleString("en-US")}</span>
        <span className="lbl">{COPY.followersLabel[lang]}</span>
      </div>

      <p className="hook">{hook[lang]}</p>
      {mission[lang] && <p className="mission">{mission[lang]}</p>}

      <div className="subscribe">
        <div className="sub-top">
          <div>
            <span className="sub-label">{COPY.subLabel[lang]}</span>
            <p className="sub-lead">{COPY.subLead[lang]}</p>
          </div>
          <img className="plane" src="/air.png" alt="" />
        </div>
        <div className="sub-btns">
          <a className="cta" href={subUrl} target="_blank" rel="noopener noreferrer">
            <span>{COPY.subscribe[lang]}</span>
            <span className="arr">→</span>
          </a>
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

  const inner = (
    <>
      <div className="pcard-top">
        {isEmoji ? (
          <span className="pcard-emoji">{p.logoUrl}</span>
        ) : (
          <img className="pcard-logo" src={p.logoUrl} alt="" />
        )}
        <span className="pcard-name">{name}</span>
      </div>
      <div className="pcard-bottom">
        <span className="pcard-num">{p.followers}</span>
        <span className="pcard-foll">
          {p.isPage ? (lang === "zh" ? p.handleZh || p.handle : p.handle) : COPY.followers[lang]}
        </span>
      </div>
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
  return (
    <section className="right-col">
      <div className="section">
        <div className="section-label">
          <span>{COPY.whereLabel[lang]}</span>
          <span className="n">{pad2(data.platforms.length)}</span>
        </div>
        <div className="grid">
          {data.platforms.map((p, i) => (
            <PlatformCard key={i} p={p} lang={lang} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-label">
          <span>{COPY.buildingLabel[lang]}</span>
          <span className="n">{pad2(data.projects.length)}</span>
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
  path === "/budget" ? "/budget" : path === "/blog" ? "/blog" : "home";
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
