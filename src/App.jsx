// ─────────────────────────────────────────────────────
//  App.jsx — 左 profile (sticky) + 右 platforms & projects
// ─────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { siteData } from "./data.js";
import Blog from "./Blog.jsx";

// ════════════════════════════════════════════════════
//  Nav
// ════════════════════════════════════════════════════

function Nav({ lang, setLang }) {
  return (
    <nav className="nav">
      <div className="logo-group">
        <span className="logo">Chaologies</span>
        <span className="logo-sub">超說</span>
      </div>
      <div className="lang-toggle">
        <button
          className={`lang-btn${lang === "en" ? " active" : ""}`}
          onClick={() => setLang("en")}
        >
          EN
        </button>
        <div className="lang-btn-wrapper">
          <button
            className={`lang-btn${lang === "zh" ? " active" : ""}`}
            onClick={() => setLang("zh")}
          >
            中
          </button>
        </div>
      </div>
    </nav>
  );
}

// ════════════════════════════════════════════════════
//  Profile — left column: hook, followers, mission, newsletter
// ════════════════════════════════════════════════════

function Profile({ lang }) {
  const {
    name,
    tagline,
    hook,
    mission,
    totalFollowers,
    followersLabel,
    newsletter,
  } = siteData;
  const [followers, setFollowers] = useState(totalFollowers);

  // 粉丝数增长动画 — 平滑过渡，时快时慢，有时掉数
  useEffect(() => {
    let animationTimer = null;
    let scheduleTimer = null;

    const animateToTarget = (targetFollowers, duration) => {
      const startFollowers = followers;
      const startTime = Date.now();
      const difference = Math.abs(targetFollowers - startFollowers);

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 线性插值：逐步从当前值变到目标值
        const newValue = Math.round(
          startFollowers + (targetFollowers - startFollowers) * progress,
        );

        setFollowers(newValue);

        if (progress < 1) {
          animationTimer = requestAnimationFrame(animate);
        } else {
          // 动画完成，调度下一次更新
          scheduleNextUpdate();
        }
      };

      animationTimer = requestAnimationFrame(animate);
    };

    const scheduleNextUpdate = () => {
      // 随机延迟：3-15秒（这是两次更新之间的间隔）
      const delay = Math.random() * 12000 + 3000;
      // 动画时长：延迟的 40-80%（在更新间隔内完成）
      const animationDuration = delay * (0.4 + Math.random() * 0.4);

      scheduleTimer = setTimeout(() => {
        setFollowers((current) => {
          const action = Math.random();
          let targetFollowers;

          if (action < 0.7) {
            // 70% 概率：增加 1-5 个粉丝
            const increment = Math.floor(Math.random() * 5) + 1;
            targetFollowers = current + increment;
          } else if (action < 0.95) {
            // 25% 概率：保持不变
            targetFollowers = current;
          } else {
            // 5% 概率：掉 1 个粉丝
            targetFollowers = Math.max(current - 1, totalFollowers);
          }

          // 开始平滑动画
          animateToTarget(targetFollowers, animationDuration);
          return current; // 立即返回，动画会逐步更新
        });
      }, delay);
    };

    scheduleNextUpdate();

    return () => {
      clearTimeout(scheduleTimer);
      cancelAnimationFrame(animationTimer);
    };
  }, [totalFollowers]);

  // 格式化粉丝数 — 473468 → "473,468"
  const followersFmt = followers.toLocaleString("en-US");

  return (
    <div className="profile">
      <img
        className="avatar"
        src="/avatar.jpg"
        alt={`${name.en} — Chaologies`}
      />
      <p className="eyebrow">{tagline[lang]}</p>
      <h1 className="hero-name">{name[lang]}</h1>

      <p className="hook">{hook[lang]}</p>

      <p className="followers">
        <span className="followers-num">{followersFmt}</span>
        <span className="followers-label">{followersLabel[lang]}</span>
      </p>

      <p className="mission">{mission[lang]}</p>

      <a
        className="newsletter-cta"
        href={newsletter.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="newsletter-label">{newsletter.label[lang]}</span>
        <span className="newsletter-sub">{newsletter.sub[lang]}</span>
      </a>
    </div>
  );
}

// ════════════════════════════════════════════════════
//  PlatformCard — right column, with follower counts
// ════════════════════════════════════════════════════

function PlatformCard({ p, lang, onNavigate }) {
  if (p.isPage) {
    return (
      <button
        className="platform-card platform-card-button"
        onClick={() => onNavigate(p.url)}
      >
        <div className="platform-head">
          <span className="platform-name">
            {lang === "zh" ? p.nameZh : p.name}
          </span>
          <span className="platform-followers">{p.followers}</span>
        </div>
        <span className="platform-handle">{p.handle}</span>
      </button>
    );
  }

  return (
    <a
      className="platform-card"
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="platform-head">
        <span className="platform-name">
          {lang === "zh" ? p.nameZh : p.name}
        </span>
        <span className="platform-followers">{p.followers}</span>
      </div>
      <span className="platform-handle">{p.handle}</span>
    </a>
  );
}

// ════════════════════════════════════════════════════
//  ProjectCard
// ════════════════════════════════════════════════════

const STATUS_LABEL = {
  active: "Active",
  course: "Course",
  soon: "Coming soon",
};

const PLATFORM_EMOJI = {
  gumroad: "🔗",
  bilibili: "▶️",
  xiaohongshu: "❤️",
  xiaoe: "🎓",
  notion: "📄",
  ebook: "📖",
};

const PLATFORM_ICON = {
  gumroad: "/icons/gumroad.png",
  bilibili: "/icons/bilibili.png",
  xiaohongshu: "/icons/xiaohongshu.png",
  xiaoe: "🎓",
  notion: "📄",
  ebook: "📖",
};

function ProjectCard({ project, lang, onNavigate }) {
  const isSoon = project.status === "soon";
  const hasLinks = project.links && project.links.length > 0;
  const isInternalPage = project.isPage;

  const inner = (
    <>
      <div className="card-top">
        <span className="card-icon">{project.icon}</span>
        <span className={`tag tag-${project.status}`}>
          {STATUS_LABEL[project.status]}
        </span>
      </div>
      <p className={`card-title${isSoon ? " muted" : ""}`}>
        {project.title[lang]}
      </p>
      <p className={`card-desc${isSoon ? " muted" : ""}`}>
        {project.desc[lang]}
      </p>
      {hasLinks && (
        <div className="card-links">
          {project.links.map((link, idx) => {
            const iconPath = PLATFORM_ICON[link.platform];
            const isImage = iconPath && iconPath.endsWith(".png");
            return (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-btn"
                title={link.platform}
              >
                {isImage ? (
                  <img
                    src={iconPath}
                    alt={link.platform}
                    className="link-icon"
                  />
                ) : (
                  iconPath || "🔗"
                )}
              </a>
            );
          })}
        </div>
      )}
      {!isSoon && !hasLinks && (
        <span className="card-arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (isSoon) return <div className="card card-soon">{inner}</div>;

  if (hasLinks) {
    return <div className="card">{inner}</div>;
  }

  if (isInternalPage) {
    return (
      <button
        className="card card-button"
        onClick={() => onNavigate(project.url)}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      className="card"
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {inner}
    </a>
  );
}

// ════════════════════════════════════════════════════
//  Right column: platforms + projects
// ════════════════════════════════════════════════════

const LABELS = {
  platforms: { en: "Where I Show Up", zh: "我在这里创作和分享" },
  projects: { en: "THINGS I'M BUILDING", zh: "我正在做的东西" },
};

function RightColumn({ lang, onNavigate }) {
  return (
    <section className="right-col">
      <p className="section-label">{LABELS.platforms[lang]}</p>
      <div className="platform-grid">
        {siteData.platforms.map((p, i) => (
          <PlatformCard key={i} p={p} lang={lang} onNavigate={onNavigate} />
        ))}
      </div>

      <p className="section-label section-gap">{LABELS.projects[lang]}</p>
      <div className="card-grid">
        {siteData.projects.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            lang={lang}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════

// ════════════════════════════════════════════════════
//  App Root
// ════════════════════════════════════════════════════

export default function App() {
  const [lang, setLang] = useState("en");
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
  };

  // 博客页面
  if (currentPage === "/blog") {
    return <Blog lang={lang} setLang={setLang} onBack={handleBackToHome} />;
  }

  // 主页
  return (
    <div className="page">
      <Nav lang={lang} setLang={setLang} />
      <div className="main-layout">
        <aside className="profile-col">
          <Profile lang={lang} />
        </aside>
        <RightColumn lang={lang} onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
