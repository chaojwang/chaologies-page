// ─────────────────────────────────────────────────────
//  Blog.jsx — 博客页面，展示地理位置时间线
// ─────────────────────────────────────────────────────

import { useState } from "react";

const TIMELINE_EVENTS = [
  { year: 2002, country: "UK", countryZh: "英国", flag: "🇬🇧" },
  { year: 2009, country: "Canada", countryZh: "加拿大", flag: "🍁" },
  { year: 2011, country: "China", countryZh: "中国", flag: "🇨🇳" },
  { year: 2013, country: "Canada", countryZh: "加拿大", flag: "🍁" },
  { year: 2021, country: "China", countryZh: "中国", flag: "🇨🇳" },
  { year: 2022, country: "Dubai", countryZh: "迪拜", flag: "🇦🇪" },
  {
    year: 2024,
    country: "Singapore",
    countryZh: "新加坡",
    flag: "🇸🇬",
    current: true,
  },
];

export default function Blog({ lang, setLang, onBack }) {
  return (
    <div className="blog-page">
      {/* 简化的导航 */}
      <nav className="blog-nav">
        <button onClick={onBack} className="blog-logo-btn">
          ← Chaologies
        </button>
        <div className="lang-toggle">
          <button
            className={`lang-btn${lang === "en" ? " active" : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            className={`lang-btn${lang === "zh" ? " active" : ""}`}
            onClick={() => setLang("zh")}
          >
            中
          </button>
        </div>
      </nav>

      {/* 博客内容区 */}
      <div className="blog-container">
        <div className="blog-header">
          <h1>{lang === "en" ? "My Blog" : "我的博客"}</h1>
          <p>
            {lang === "en"
              ? "Stories, lessons, and thoughts from around the world."
              : "来自世界各地的故事、思考和感悟。"}
          </p>
        </div>

        {/* 时间线 */}
        <div className="timeline-section">
          <h2>{lang === "en" ? "My Journey" : "我的足迹"}</h2>
          <div className="timeline">
            {/* 时间线背景线 */}
            <div className="timeline-line"></div>

            {/* 时间线事件 */}
            <div className="timeline-events">
              {TIMELINE_EVENTS.map((event, idx) => (
                <div key={idx} className="timeline-event">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="event-year">{event.year}</div>
                    <div className="event-location">
                      <span className="flag">{event.flag}</span>
                      <span className="country">
                        {lang === "en" ? event.country : event.countryZh}
                      </span>
                      {event.current && (
                        <span className="current-badge">
                          {lang === "en" ? "Present" : "至今"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 文章列表占位符 */}
        <div className="articles-section">
          <h2>{lang === "en" ? "Articles Coming Soon" : "文章敬请期待"}</h2>
          <p>
            {lang === "en"
              ? "New posts will appear here and be published on Substack."
              : "新文章会发布在这里，同时同步到 Substack。"}
          </p>
        </div>
      </div>
    </div>
  );
}
