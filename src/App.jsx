// ─────────────────────────────────────────────────────
//  App.jsx — Chaologies home (design-system port)
//  Left sticky profile + right platforms & projects
//  ▸ 2024 redesign: bilingual hero headline, follower stat
//    as a sentence, reordered platforms, growth sparklines.
// ─────────────────────────────────────────────────────

import { useState, useEffect, lazy, Suspense } from "react";
import { siteData as staticData } from "./data.js";
import { supabase, transformSiteData } from "./lib/supabase.js";
import Blog from "./Blog.jsx";
import BudgetPage from "./BudgetPage.jsx";
import NewsletterPage from "./NewsletterPage.jsx";
import FCPXPage from "./FCPXPage.jsx";
import NotionWeeklyPage from "./NotionWeeklyPage.jsx";
import WeeklyFocusPage from "./WeeklyFocusPage.jsx";
import ActionBankPage from "./ActionBankPage.jsx";
import ReadingMapPage from "./ReadingMapPage.jsx";
import ReadingMapThanksPage from "./ReadingMapThanksPage.jsx";
import SubscribeModal from "./SubscribeModal.jsx";
import PartnerPage from "./PartnerPage.jsx";
import CreatorAcademyPage from "./CreatorAcademyPage.jsx";
import { tr, useTw, LangToggle } from "./i18n.jsx";

// 買家完整版（含 books.json）走動態 chunk，不進主包
const ReadingMap = lazy(() => import("./ReadingMap.jsx"));

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

// ── Static copy — zh 一律简体；繁体由 i18n 运行时转换 ──
const COPY = {
  journal: { en: "Blog", zh: "博客" },
  partner: { en: "For Brands", zh: "品牌合作" },
  bubble: { en: "Hi, I'm Chao", zh: "你好，我是 Chao" },

  // Hero headline — primary language large, the other language quiet below.
  heroPrimary: {
    en: "Tax Consultant turned Entrepreneur & Creator",
    zh: "财税顾问，变身创业者与创作者",
  },
  heroSecondary: {
    en: "Big 4 财税顾问 · 变身创业者与创作者",
    zh: "Big 4 Tax Consultant turned Entrepreneur & Creator",
    tw: "Big 4 Tax Consultant turned Entrepreneur & Creator",
  },
  heroDesc: {
    en: "I share honest lessons on money, minimalism, habits, AI & creating — to help you make a complex life gradually clearer.",
    zh: "我分享关于金钱、极简、习惯、AI 与创作的真实经验，帮你把复杂的生活，一点点变得更清楚。",
  },

  // Follower stat, framed as a sentence around the live number.
  joinPre: { en: "Join", zh: "加入" },
  joinUnit: { en: "friends following along", zh: "位同行的朋友" },
  joinDesc: {
    en: "Following along for honest takes on money, minimalism, habits, AI & career changes — and building a freer life system.",
    zh: "关注这个频道，我们一起聊聊金钱、极简、习惯、AI 与转行，以及如何搭建更自由的生活系统。",
  },

  subLabel: { en: "The Newsletter", zh: "订阅 Newsletter" },
  subLead: {
    en: "Twice a month: practical notes on life, money, and good books. Free, always.",
    zh: "每月两篇，关于生活、金钱和好书的实用分享，完全免费。",
  },
  subscribe: { en: "Subscribe — it's free", zh: "免费订阅" },
  wechat: { en: "Follow on WeChat", zh: "关注公众号" },
  reviews: { en: "Loved by 2M+ readers", zh: "全网 200w+ 点赞收藏" },
  ctaFine: {
    en: "One email, no spreadsheets. Unsubscribe anytime.",
    zh: "一封邮件，不含任何报表。随时退订。",
  },
  whereLabel: { en: "Where I show up", zh: "我在这里创作和分享" },
  whereSub: {
    en: "Find me here — tap any card to follow →",
    zh: "在这些平台找到我，点一下卡片就能关注 →",
  },
  buildingLabel: { en: "Things I'm building", zh: "我正在做的东西" },
  buildingSub: {
    en: "Products, templates & courses I've made",
    zh: "我做的产品、模板和课程",
  },
  live: { en: "Live", zh: "进行中" },
  soon: { en: "Soon", zh: "敬请期待" },
  followers: { en: "followers", zh: "粉丝" },
  essays: { en: "Essays", zh: "长文" },
  brewing: {
    en: "Brewing: Canada guides · 30-day speaking plan",
    zh: "正在酝酿：加拿大指南 · 口语计划",
  },
  footSign: {
    en: "Made in Singapore, fueled by kopi & kaya toast.",
    zh: "新加坡出品，靠南洋咖啡和椰香面包供能。(Kopi & Kaya Toast)",
  },
  footNow: {
    en: "Currently: 📍 Singapore · building Money OS · dad life: 2 years in",
    zh: "近况：现居 📍 新加坡 ～ 在做 Money OS ～ 奶爸经验：两年",
  },
};

// Project links → small icon buttons
const PLATFORM_ICON = {
  gumroad: "/icons/gumroad.png",
  bilibili: "/icons/bilibili.png",
  xiaohongshu: "/icons/xiaohongshu.png",
  xiaoe: "↗",
  notion: "N",
  ebook: "PDF",
};

const WEEKLY_FOCUS_PROJECT = {
  icon: "◎",
  title: { en: "Weekly Focus Wallpaper", zh: "本周专注壁纸生成器" },
  desc: {
    en: "Turn this week's three priorities into a wallpaper you see every day.",
    zh: "把本周最重要的三件事，做成每天都能看见的手机或电脑壁纸。",
  },
  status: "active",
  badge: { en: "Free tool", zh: "免费工具" },
  links: [
    {
      url: "/weekly-focus",
      platform: "Web",
      label: { en: "Make yours free →", zh: "免费制作 →" },
    },
  ],
};

const CREATOR_ACADEMY_PROJECT = {
  title: { en: "Creator Academy", zh: "创作者学院" },
  desc: {
    en: "Turn your experience into content, then use your personal brand and AI to create new opportunities.",
    zh: "把你的经验变成内容，用个人品牌和 AI 为自己创造新的机会。",
  },
  status: "active",
  badge: { en: "Waitlist", zh: "等待清单" },
  links: [
    {
      url: "/creator-academy",
      platform: "Web",
      label: { en: "Join the waitlist →", zh: "加入等待清单 →" },
    },
  ],
};

const CREATOR_MONEY_PROJECT = {
  title: { en: "Side-Income Money Check", zh: "副业钱管家" },
  desc: {
    en: "Income is the inlet and spending is the outlet. You need control of both.",
    zh: "收入是入水口，支出是出水口，两手都要硬。",
  },
  status: "active",
  badge: { en: "Free tool", zh: "免费工具" },
  links: [
    {
      url: "https://creator-money-starter-kit.chaologies.chatgpt.site",
      platform: "Web",
      label: { en: "Use free", zh: "免费使用" },
    },
  ],
};

function projectText(project) {
  return [
    project?.title?.en,
    project?.title?.zh,
    project?.links?.map((link) => link.url).join(" "),
  ].filter(Boolean).join(" ");
}

function withProjectCopy(project, title, desc) {
  return { ...project, title, desc };
}

function projectsWithWeeklyFocus(projects = []) {
  const find = (pattern) => projects.find((project) => pattern.test(projectText(project)));
  const budget = find(/\/budget|financial freedom|财富自由/i);
  const moneyOs = find(/\/newsletter|money os/i);
  const weekly = find(/\/notion-weekly|minimal weekly|极简每周/i);
  const focus = find(/\/weekly-focus|weekly focus|专注壁纸/i) || WEEKLY_FOCUS_PROJECT;
  const reading = find(/\/reading-map|reading map|阅读地图/i);
  const action = find(/\/action-bank|action bank|行动银行/i);
  const fcpx = find(/\/fcpx|final cut/i);

  return [
    budget && withProjectCopy(
      budget,
      { en: "The 50 / 30 / 20 Rule", zh: "50 / 30 / 20 法则" },
      { en: "The first step toward financial freedom.", zh: "财富自由之路的第一步。" },
    ),
    CREATOR_MONEY_PROJECT,
    weekly && withProjectCopy(
      weekly,
      { en: "My Minimalist Weekly Template", zh: "我的极简主义效率模板" },
      {
        en: "Ten minutes a week to see what matters and plan the week clearly.",
        zh: "每周花十分钟，理清重点和时间安排。",
      },
    ),
    focus,
    reading && withProjectCopy(
      reading,
      { en: "Chaologies Reading Map", zh: "超说阅读地图" },
      {
        en: "Turn 101 good books into your own thinking system.",
        zh: "把 101 本好书变成你的思考系统。",
      },
    ),
    action && withProjectCopy(
      action,
      { en: "Business Idea Bank", zh: "商业想法银行" },
      {
        en: "Turn 100+ business books into a practical library for finding direction, testing ideas, and starting to earn.",
        zh: "把 100+ 本商业书，变成找方向、验证想法和开始创收的行动库。",
      },
    ),
    fcpx && withProjectCopy(
      fcpx,
      { en: "Final Cut Pro X Video Editing", zh: "Final Cut Pro X 视频剪辑" },
      {
        en: "The best video editing software on the Mac. No contest.",
        zh: "最好用的苹果视频剪辑软件，没有之一。",
      },
    ),
    CREATOR_ACADEMY_PROJECT,
    moneyOs && withProjectCopy(
      moneyOs,
      { en: "7-Day Money OS Starter Plan", zh: "7 天 Money OS 入门计划" },
      {
        en: "Seven days to see your cash flow clearly and build a money system you can keep using.",
        zh: "用 7 天理清现金流，建立一套能长期使用的金钱系统。",
      },
    ),
  ].filter(Boolean);
}

// Homepage only shows active public social channels. Blog stays in the top nav;
// WeChat stays available elsewhere on the site without duplicating this grid.
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
  const arr = (list || []).filter((p) =>
    !p.isPage && !/wechat|微信/i.test(`${p.name || ""} ${p.nameZh || ""}`),
  );
  const yt = arr.filter((p) => /youtube/i.test(p.name || ""));
  const rest = arr
    .filter((p) => !/youtube/i.test(p.name || ""))
    .sort((a, b) => parseFollowers(b.followers) - parseFollowers(a.followers));
  return [...yt, ...rest];
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
          {tr(COPY.journal, lang)}
        </button>
        <button className="nav-link partner-link" onClick={() => onNavigate("/partner")}>
          {tr(COPY.partner, lang)}
        </button>
        <LangToggle lang={lang} setLang={setLang} />
      </div>
    </nav>
  );
}

// ════════════════════════════════════════════════════
//  Profile — left sticky column
// ════════════════════════════════════════════════════

function Profile({ lang, data }) {
  const { totalFollowers } = data;
  const [count, setCount] = useState(totalFollowers);
  const [subOpen, setSubOpen] = useState(false);

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

  return (
    <aside className="profile">
      {/* avatar + speech bubble (top-right of the avatar) */}
      <div className="intro">
        <div className="avatar-wrap">
          <img className="avatar" src="/avatar.jpg" alt="Chao" />
        </div>
        <div className="bubble">
          <span className="bubble-t">{tr(COPY.bubble, lang)}</span>
          <span className="wave" role="img" aria-label={lang === "en" ? "Waving hello" : "挥手问好"}>👋</span>
        </div>
      </div>

      {/* bilingual hero headline */}
      <h1 className="hero-head">
        <span className="hl">Big 4</span> {tr(COPY.heroPrimary, lang)}
      </h1>
      <p className="hero-sub">{tr(COPY.heroSecondary, lang)}</p>
      <p className="hero-desc">{tr(COPY.heroDesc, lang)}</p>

      {/* follower stat, as a sentence */}
      <div className="statline-wrap">
        <div className="statline">
          <span className="pre">{tr(COPY.joinPre, lang)}</span>
          <span className="num">{count.toLocaleString("en-US")}</span>
          <span className="unit">{tr(COPY.joinUnit, lang)}</span>
        </div>
        <p className="stat-desc">{tr(COPY.joinDesc, lang)}</p>
      </div>

      {/* newsletter */}
      <div className="subscribe">
        <div className="sub-top">
          <div>
            <span className="sub-label">{tr(COPY.subLabel, lang)}</span>
            <p className="sub-lead">{tr(COPY.subLead, lang)}</p>
          </div>
          <img className="plane" src="/air.png" alt="" />
        </div>
        <div className="sub-btns">
          <button className="sub-cta-main" onClick={() => setSubOpen(true)}>
            <span>{tr(COPY.subscribe, lang)}</span>
            <span className="arr">→</span>
          </button>
          <button className="sub-wechat" onClick={() => setSubOpen(true)}>
            <img className="sub-wechat-ic" src="/icons/wechat.png" alt="" />
            <span>{tr(COPY.wechat, lang)}</span>
          </button>
        </div>
        <div className="sub-proof">
          <span className="stars">★★★★★</span>
          <span className="reviews">{tr(COPY.reviews, lang)}</span>
        </div>
        <p className="cta-fine">{tr(COPY.ctaFine, lang)}</p>
      </div>
      {subOpen && <SubscribeModal lang={lang} onClose={() => setSubOpen(false)} />}
    </aside>
  );
}

// ════════════════════════════════════════════════════
//  Platform card
// ════════════════════════════════════════════════════

function PlatformCard({ p, lang, onNavigate }) {
  const name = lang !== "en" ? tr(p.nameZh || p.name, lang) : p.name;
  const isEmoji = p.logoUrl && p.logoUrl.length <= 2;
  const handle = p.isPage
    ? lang !== "en" ? tr(p.handleZh || p.handle, lang) : p.handle
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
            tr(COPY.essays, lang)
          ) : p.followers && !p.hideCount ? (
            <>
              <span className="bn">{p.followers}</span>
              <span className="bu">{tr(COPY.followers, lang)}</span>
            </>
          ) : (
            <span className="bu">→</span>
          )}
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
        <span className={`status ${isLive ? "live" : "soon"}`}>
          {tr(project.badge, lang) || (isLive ? tr(COPY.live, lang) : tr(COPY.soon, lang))}
        </span>
      </div>
      <div className="jcard-title">{tr(project.title, lang)}</div>
      <div className="jcard-desc">{tr(project.desc, lang)}</div>
      {isLive && hasLinks && (
        <div className="jcard-links">
          {project.links.map((link, idx) => {
            const icon = PLATFORM_ICON[link.platform];
            const isImg = icon && icon.endsWith(".png");
            const isInternal = link.url && link.url.startsWith("/");
            const label = link.label ? (tr(link.label, lang)) : null;
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
                className={`link-btn ${label ? "link-btn-text" : ""}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
              >
                {label || (isImg ? (
                  <img className="link-icon" src={icon} alt={link.platform} />
                ) : (
                  icon || "↗"
                ))}
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
  const projects = projectsWithWeeklyFocus(data.projects);
  return (
    <section className="right-col">
      <div className="section">
        <div className="section-head">
          <div className="section-label">
            <span>{tr(COPY.whereLabel, lang)}</span>
            <span className="n">{pad2(platforms.length)}</span>
          </div>
          <p className="section-sub">{tr(COPY.whereSub, lang)}</p>
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
            <span>{tr(COPY.buildingLabel, lang)}</span>
            <span className="n">{pad2(projects.length)}</span>
          </div>
          <p className="section-sub">{tr(COPY.buildingSub, lang)}</p>
        </div>
        <div className="grid">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} lang={lang} onNavigate={onNavigate} />
          ))}
        </div>
        <p className="brewing">{tr(COPY.brewing, lang)}</p>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════
//  App root
// ════════════════════════════════════════════════════

// keep in-app routing and the URL bar in sync, so /blog and /budget
// are real, shareable links with working back/forward.
const pathToPage = (path) => {
  if (path === "/partner" || path.startsWith("/partner/")) return path;
  const pages = new Set([
    "/budget", "/blog", "/newsletter", "/fcpx", "/notion-weekly",
    "/weekly-focus", "/action-bank", "/reading-map", "/reading-map/access",
    "/reading-map/thank-you", "/creator-academy",
  ]);
  return pages.has(path) ? path : "home";
};
const pageToPath = (page) => (page === "home" ? "/" : page);

export default function App() {
  const [lang, setLang] = useState("zh"); // "zh" 简 | "tw" 繁 | "en"
  const [currentPage, setCurrentPage] = useState(
    pathToPage(window.location.pathname)
  );
  const siteData = useSiteData();
  useTw(lang); // 切到繁体时懒加载字典并触发一次重渲染

  // 还没接三语的页面：繁体先按简体显示
  const coerced = lang === "tw" ? "zh" : lang;

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

  if (currentPage === "/partner" || currentPage.startsWith("/partner/")) {
    return (
      <PartnerPage
        lang={lang}
        setLang={setLang}
        data={siteData}
        onBack={() => handleNavigate("home")}
        onNavigate={handleNavigate}
        brandSlug={currentPage.startsWith("/partner/") ? currentPage.slice("/partner/".length) : null}
      />
    );
  }

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
        onNavigate={handleNavigate}
      />
    );
  }

  if (currentPage === "/notion-weekly") {
    return (
      <NotionWeeklyPage
        lang={coerced}
        setLang={setLang}
        onBack={() => handleNavigate("home")}
      />
    );
  }

  if (currentPage === "/weekly-focus") {
    return (
      <WeeklyFocusPage
        lang={coerced}
        setLang={setLang}
        onBack={() => handleNavigate("home")}
        onNavigate={handleNavigate}
      />
    );
  }

  if (currentPage === "/fcpx") {
    return (
      <FCPXPage
        lang={coerced}
        onBack={() => handleNavigate("home")}
      />
    );
  }

  if (currentPage === "/reading-map") {
    return (
      <ReadingMapPage
        lang={coerced}
        setLang={setLang}
        onBack={() => handleNavigate("home")}
      />
    );
  }

  if (currentPage === "/reading-map/access") {
    return (
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "#faf9f4" }} />}>
        <ReadingMap accessCode={import.meta.env.VITE_RM_CODE ?? null} noindex />
      </Suspense>
    );
  }

  if (currentPage === "/reading-map/thank-you") {
    return (
      <ReadingMapThanksPage
        lang={coerced}
        setLang={setLang}
        onBack={() => handleNavigate("home")}
        onNavigate={handleNavigate}
      />
    );
  }

  if (currentPage === "/action-bank") {
    return (
      <ActionBankPage
        lang={coerced}
        setLang={setLang}
        onBack={() => handleNavigate("home")}
      />
    );
  }

  if (currentPage === "/newsletter") {
    return (
      <NewsletterPage
        lang={coerced}
        setLang={setLang}
        onBack={() => handleNavigate("home")}
      />
    );
  }

  if (currentPage === "/creator-academy") {
    return (
      <CreatorAcademyPage
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
        <p className="sign">{tr(COPY.footSign, lang)}</p>
        <p className="now">{tr(COPY.footNow, lang)}</p>
      </footer>
    </div>
  );
}
