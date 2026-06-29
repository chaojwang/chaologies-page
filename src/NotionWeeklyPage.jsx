import { useState, useEffect } from "react";

const COPY = {
  zh: {
    navTitle: "我的极简主义效率模板 · 每周计划",
    eyebrow: "NOTION 模板",
    heroLine1: "每周一次，",
    heroLine2: "每次十分钟",
    heroCopy: "告别混乱，提高效率，完成真正重要的事。",
    heroBtnText: "立即获取模板 →",
    videoLinkText: "▶ 观看介绍视频",
    bandText: "告别花哨，回归本质。",
    storyEyebrow: "CHAO 的话",
    greeting: "嗨，朋友们",
    storyBody: "每周都很忙，\n但一周结束的时候，还是说不清自己到底做了什么。\n\n很多时候，问题不是不努力，\n而是事情太多，却没有一个地方把它们统一整理一下。\n\n这套模板，是我自己每周都在用的一套一周系统。\n它不是让你做更多，而是帮你把一周过得更清楚一点。\n\n你可以把想法、待办和安排放在同一个地方，\n慢慢看清楚时间和精力都花在了哪里。\n\n它不复杂，但正因为这样，我才一直在用。\n\n如果你也想少一点混乱，多一点清晰，\n也许可以试试看。",
    featTitle: "这套系统，帮你把一周过清楚",
    f1T: "专注 Milestone", f1B: "一眼看清本周真正要完成的核心目标，不被琐事牵着走。",
    f2T: "精力可视化", f2B: "清晰追踪时间和精力的流向，知道每一刻花在了哪里。",
    f3T: "每周规划仪式", f3B: "每周一次，只需十分钟，养成主动管理时间和精力的习惯。",
    f4T: "可复用系统", f4B: "可复用任务清单，打开即用，每周快速开始，无需重新搭建。",
    forTitle: "这套模板适合你吗？",
    forYesLabel: "适合", forNoLabel: "不适合",
    forYes1: "追求效率、崇尚极简的行动者",
    forYes2: "想主动管理时间和精力的人",
    forYes3: "想建立每周规律、告别拖延的人",
    forYes4: "任何想用这套原则改变生活的人",
    forNo1: "热衷 Notion 视觉美学的用户",
    forNo2: "需要复杂看板和数据库的用户",
    buyEyebrow: "立即获取", buyTitle: "选择你的平台",
    buyNote: "购买后下载 PDF，点击置顶链接，复制模板到 Notion，即可使用。",
    buyNow: "立即购买",
    p1Sub: "国内首选", p3Sub: "国际版", p4Price: "在帖子评论区购买",
    footerQuote: "告别花哨，回归本质。",
  },
  en: {
    navTitle: "Minimalist Productivity Template · Weekly Plan",
    eyebrow: "NOTION TEMPLATE",
    heroLine1: "Once a week.",
    heroLine2: "Ten minutes.",
    heroCopy: "Less chaos. More clarity. Get the things that actually matter done.",
    heroBtnText: "Get the template →",
    videoLinkText: "▶ Watch the intro video",
    bandText: "Less noise. More clarity.",
    storyEyebrow: "FROM CHAO",
    greeting: "Hey friends",
    storyBody: "You stay busy all week,\nbut when it ends, it's hard to say what actually moved forward.\n\nIt's usually not about effort.\nIt's that everything is scattered, with no place to bring it together.\n\nThis is the weekly system I actually use.\nIt's not about doing more, but about making your week clearer.\n\nIt brings your ideas, tasks, and schedule into one place,\nso you can see where your time and energy really go.\n\nIt's simple. And that's exactly why it works.\n\nIf you're looking for less chaos and a bit more clarity,\nthis might be a good place to start.",
    featTitle: "A system that makes your week make sense",
    f1T: "Focus on Milestones", f1B: "See the milestones that actually matter this week. Stop chasing small tasks.",
    f2T: "See Your Energy", f2B: "Track where your time and energy go — see it clearly, every week.",
    f3T: "Weekly Ritual", f3B: "Once a week, ten minutes. Build the habit of planning with intention.",
    f4T: "Reusable by Design", f4B: "Reusable task lists. Open and go — never rebuild from scratch.",
    forTitle: "Is this for you?",
    forYesLabel: "A good fit if you", forNoLabel: "Not for you if",
    forYes1: "you're an action-taker who values clarity",
    forYes2: "you want to manage your energy intentionally",
    forYes3: "you're building consistent weekly habits",
    forYes4: "you want less chaos and more focus",
    forNo1: "you love Notion aesthetics and complex layouts",
    forNo2: "you need advanced dashboards or databases",
    buyEyebrow: "GET IT NOW", buyTitle: "Choose your platform",
    buyNote: "After purchase, open the PDF and click the link to duplicate the template into your Notion.",
    buyNow: "Get now",
    p1Sub: "China (Recommended)", p3Sub: "International", p4Price: "Purchase in post comments",
    footerQuote: "Less noise. More clarity.",
  },
};

const PURCHASE = [
  { key: "p1", subKey: "p1Sub", name: "小鹅通", price: "¥29.9", href: "https://irw5t.xetlk.com/s/1mXSPR", highlight: true },
  { key: "p2", sub: "Bilibili Mall", name: "B站商城", price: "¥29.9", href: "https://mall.bilibili.com/neul-next/detailuniversal/detail.html?page=detailuniversal_detail&itemsId=40799137&loadingShow=1&noTitleBar=1" },
  { key: "p3", subKey: "p3Sub", name: "Gumroad", price: "S$5.99", href: "https://1408889899058.gumroad.com/l/kcbinp" },
  { key: "p4", sub: "RedNote", name: "小红书", priceKey: "p4Price", href: "http://xhslink.com/o/aXfIJM9reZ" },
];

const SOCIAL = [
  { icon: "/icons/bilibili.png", href: "https://www.bilibili.com/video/BV18nDSBSEez/", title: "Bilibili" },
  { icon: "/icons/xiaohongshu.png", href: "http://xhslink.com/o/aXfIJM9reZ", title: "小红书" },
  { icon: "/icons/gumroad.png", href: "https://1408889899058.gumroad.com/l/kcbinp", title: "Gumroad" },
  { icon: "/icons/youtube.png", href: "https://chaologies.com", title: "YouTube" },
  { icon: "/icons/instagram.png", href: "https://chaologies.com", title: "Instagram" },
];

export default function NotionWeeklyPage({ lang: initialLang = "zh", setLang: setParentLang, onBack }) {
  const [lang, setLang] = useState(initialLang);
  const c = COPY[lang];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const switchLang = (l) => { setLang(l); setParentLang?.(l); };

  const btnBase = {
    border: "none", borderRadius: 16, cursor: "pointer",
    fontFamily: "'Inter','Noto Sans SC',sans-serif", fontWeight: 600, fontSize: 13,
    padding: "6px 14px", transition: "background 0.15s,color 0.15s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f2ec", color: "#1c1915", fontFamily: "'Inter','Noto Sans SC',sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes wave{0%,55%,100%{transform:rotate(0deg)}10%,30%{transform:rotate(16deg)}20%{transform:rotate(-8deg)}40%{transform:rotate(-4deg)}}
        @keyframes spin360{to{transform:rotate(360deg)}}
        @keyframes pulseRing{0%{transform:scale(0.7);opacity:0.6}70%{transform:scale(1.35);opacity:0}100%{transform:scale(1.35);opacity:0}}
        @keyframes growBar{0%,100%{transform:scaleY(0.35)}50%{transform:scaleY(1)}}
        @keyframes drawIn{to{stroke-dashoffset:0}}
        .notion-feat-card{background:#fff;border:0.5px solid #efebe2;border-radius:14px;padding:32px;transition:border-color .2s,transform .2s}
        .notion-feat-card:hover{border-color:#c4bcaf;transform:translateY(-3px)}
        .notion-social-btn{width:46px;height:46px;border-radius:50%;background:#ece8e0;display:flex;align-items:center;justify-content:center;transition:background .2s,transform .15s}
        .notion-social-btn:hover{background:#e0dbd1;transform:translateY(-3px)}
        .notion-social-btn img{width:24px;height:24px;object-fit:contain;filter:grayscale(1);opacity:0.6;transition:filter .2s,opacity .2s}
        .notion-social-btn:hover img{filter:grayscale(0);opacity:1}
        .notion-buy-card{text-decoration:none;display:flex;flex-direction:column;border-radius:14px;padding:28px 22px;transition:transform .1s}
        .notion-buy-card:active{transform:scale(0.98)}
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
          <button onClick={() => switchLang("zh")} style={{ ...btnBase, background: lang === "zh" ? "#e4a11b" : "transparent", color: lang === "zh" ? "#fff" : "#8a8276" }}>中文</button>
          <button onClick={() => switchLang("en")} style={{ ...btnBase, background: lang === "en" ? "#e4a11b" : "transparent", color: lang === "en" ? "#fff" : "#8a8276" }}>EN</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 40px 72px", display: "grid", gridTemplateColumns: "1fr 560px", gap: 56, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 26 }}>
            <div style={{ width: 24, height: 24, borderRadius: 5, border: "1.5px solid #1c1915", background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "Georgia,'Times New Roman',serif", fontWeight: 700, fontSize: 14, color: "#1c1915", lineHeight: 1 }}>N</span>
            </div>
            <span style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", color: "#a49c90", textTransform: "uppercase" }}>{c.eyebrow}</span>
          </div>
          <h1 style={{ fontFamily: "'LXGW WenKai','Noto Serif SC',serif", fontWeight: 700, fontSize: "clamp(46px,6.2vw,72px)", lineHeight: 1.04, color: "#1c1915", letterSpacing: -1.5, margin: "0 0 4px", whiteSpace: "nowrap" }}>{c.heroLine1}</h1>
          <div style={{ display: "inline-block", margin: "0 0 28px" }}>
            <h1 style={{ fontFamily: "'LXGW WenKai','Noto Serif SC',serif", fontWeight: 700, fontSize: "clamp(46px,6.2vw,72px)", lineHeight: 1.04, color: "#1c1915", letterSpacing: -1.5, margin: 0, whiteSpace: "nowrap" }}>{c.heroLine2}</h1>
            <svg viewBox="0 0 260 14" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 14, marginTop: 4 }}>
              <path d="M4 9 C 60 2, 120 12, 175 6 C 215 2, 244 7, 256 8" fill="none" stroke="#5bc8d4" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 280, strokeDashoffset: 280, animation: "drawIn 1.1s ease-out 0.5s forwards" }} />
            </svg>
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "#6b645b", maxWidth: 440, margin: "0 0 40px" }}>{c.heroCopy}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <a href="#purchase" style={{ background: "#e4a11b", color: "#fff", fontWeight: 600, fontSize: 15, padding: "15px 30px", borderRadius: 8, textDecoration: "none", display: "inline-block" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#c8881a"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#e4a11b"; }}
            >{c.heroBtnText}</a>
            <a href="https://www.bilibili.com/video/BV18nDSBSEez/" target="_blank" rel="noopener noreferrer" style={{ color: "#8a8276", fontSize: 14, textDecoration: "none", borderBottom: "1px solid #c4bcaf", paddingBottom: 1 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#3a352e"; e.currentTarget.style.borderColor = "#6b645b"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#8a8276"; e.currentTarget.style.borderColor = "#c4bcaf"; }}
            >{c.videoLinkText}</a>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", borderRadius: 16, overflow: "hidden", background: "#000", boxShadow: "0 16px 50px rgba(28,25,21,0.14)" }}>
            <iframe src="https://player.bilibili.com/player.html?isOutside=true&aid=116389956355311&bvid=BV18nDSBSEez&cid=37439145123&p=1" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allowFullScreen scrolling="no" title="Notion Weekly" />
          </div>
        </div>
      </section>

      {/* QUOTE BAND */}
      <div style={{ background: "#e4a11b", padding: "30px 40px", textAlign: "center" }}>
        <p style={{ fontFamily: "'LXGW WenKai','Noto Serif SC',serif", fontSize: 22, lineHeight: 1.5, color: "#fff", letterSpacing: "0.04em", margin: 0 }}>{c.bandText}</p>
      </div>

      {/* STORY */}
      <section style={{ background: "#ffffff", padding: "88px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "300px 1fr", gap: 56, alignItems: "start" }}>
          <div style={{ justifySelf: "center" }}>
            <div style={{ position: "relative", width: 300, height: 300, animation: "floaty 5s ease-in-out infinite" }}>
              <svg viewBox="0 0 300 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <path d="M27 221 A142 142 0 0 1 79 27" fill="none" stroke="#f5c842" strokeWidth="5" strokeLinecap="round" />
                <path d="M273 221 A142 142 0 0 1 150 292" fill="none" stroke="#d8d2c7" strokeWidth="5" strokeLinecap="round" />
                <circle cx="150" cy="150" r="118" fill="#f5c842" />
                <path d="M250 120 L296 150 L250 182 Z" fill="#f5c842" />
              </svg>
              <img src="/avatar.jpg" alt="Chao" style={{ position: "absolute", left: 45, top: 45, width: 210, height: 210, borderRadius: "50%", objectFit: "cover" }} />
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", color: "#a49c90", textTransform: "uppercase", marginBottom: 14 }}>{c.storyEyebrow}</div>
            <h2 style={{ fontFamily: "'LXGW WenKai','Noto Serif SC',serif", fontWeight: 700, fontSize: 42, lineHeight: 1.1, color: "#1c1915", letterSpacing: -0.5, margin: "0 0 2px" }}>
              {c.greeting} <span style={{ display: "inline-block", transformOrigin: "75% 80%", animation: "wave 2.6s ease-in-out infinite" }}>👋</span>
            </h2>
            <svg viewBox="0 0 240 14" preserveAspectRatio="none" style={{ display: "block", width: 190, height: 13, marginBottom: 30 }}>
              <path d="M4 9 C 55 2, 110 12, 160 6 C 196 2, 222 7, 236 8" fill="none" stroke="#5bc8d4" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 260, strokeDashoffset: 260, animation: "drawIn 1.1s ease-out 0.6s forwards" }} />
            </svg>
            <p style={{ fontFamily: "'LXGW WenKai','Noto Serif SC',serif", fontSize: 18, lineHeight: 1.95, color: "#3a352e", whiteSpace: "pre-line", margin: "0 0 32px" }}>{c.storyBody}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "0.5px solid #e7e2d8", paddingTop: 24 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1c1915" }}>Chao</span>
              <span style={{ fontSize: 13, color: "#a49c90" }}>· Chaologies 超说</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "#f4f2ec", padding: "88px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ marginBottom: 48, maxWidth: 560 }}>
            <div style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", color: "#a49c90", textTransform: "uppercase", marginBottom: 14 }}>FEATURES · 功能</div>
            <h2 style={{ fontFamily: "'Fraunces','Noto Serif SC',serif", fontWeight: 700, fontSize: 38, lineHeight: 1.12, color: "#1c1915", letterSpacing: -0.5, margin: 0 }}>{c.featTitle}</h2>
          </div>
          <svg viewBox="0 0 80 92" width="62" height="72" style={{ position: "absolute", top: 6, right: 6 }}>
            <path d="M58 10 C 22 20, 70 50, 32 78" fill="none" stroke="#f4845f" strokeWidth="3" strokeLinecap="round" style={{ strokeDasharray: 180, strokeDashoffset: 180, animation: "drawIn 1.3s ease-out 0.6s forwards" }} />
            <path d="M20 64 L33 80 L48 68" fill="none" stroke="#f4845f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 52, strokeDashoffset: 52, animation: "drawIn 0.5s ease-out 1.8s forwards" }} />
          </svg>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* F1 */}
            <div className="notion-feat-card">
              <svg viewBox="0 0 52 52" width="52" height="52" fill="none" style={{ marginBottom: 20 }}>
                <circle cx="26" cy="26" r="22" stroke="#e4a11b" strokeWidth="2.5" opacity="0.22" />
                <circle cx="26" cy="26" r="13" stroke="#e4a11b" strokeWidth="2.5" opacity="0.5" />
                <circle cx="26" cy="26" r="5" fill="#e4a11b" />
                <circle cx="26" cy="26" r="22" stroke="#e4a11b" strokeWidth="2.5" style={{ transformOrigin: "center", transformBox: "fill-box", animation: "pulseRing 2.6s ease-out infinite" }} />
              </svg>
              <h3 style={{ fontFamily: "'Fraunces','Noto Serif SC',serif", fontWeight: 600, fontSize: 20, lineHeight: 1.25, color: "#1c1915", margin: "0 0 10px" }}>{c.f1T}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#6b645b", margin: 0 }}>{c.f1B}</p>
            </div>
            {/* F2 */}
            <div className="notion-feat-card">
              <svg viewBox="0 0 52 52" width="52" height="52" fill="none" style={{ marginBottom: 20 }}>
                {[{ x: 9, delay: 0 }, { x: 22, delay: 0.35 }, { x: 35, delay: 0.7 }].map(({ x, delay }) => (
                  <rect key={x} x={x} y="16" width="8" height="28" rx="2.5" fill="#5bc8d4" style={{ transformOrigin: "bottom", transformBox: "fill-box", animation: `growBar 1.7s ease-in-out ${delay}s infinite` }} />
                ))}
              </svg>
              <h3 style={{ fontFamily: "'Fraunces','Noto Serif SC',serif", fontWeight: 600, fontSize: 20, lineHeight: 1.25, color: "#1c1915", margin: "0 0 10px" }}>{c.f2T}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#6b645b", margin: 0 }}>{c.f2B}</p>
            </div>
            {/* F3 */}
            <div className="notion-feat-card">
              <svg viewBox="0 0 52 52" width="52" height="52" fill="none" style={{ marginBottom: 20 }}>
                <rect x="8" y="11" width="36" height="33" rx="5" stroke="#f4845f" strokeWidth="2.6" />
                <path d="M8 20 H44" stroke="#f4845f" strokeWidth="2.6" />
                <path d="M17 7 V14" stroke="#f4845f" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M35 7 V14" stroke="#f4845f" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M17 31 L23 37 L35 26" stroke="#f4845f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 36, strokeDashoffset: 36, animation: "drawIn 1s ease-out 0.4s infinite alternate" }} />
              </svg>
              <h3 style={{ fontFamily: "'Fraunces','Noto Serif SC',serif", fontWeight: 600, fontSize: 20, lineHeight: 1.25, color: "#1c1915", margin: "0 0 10px" }}>{c.f3T}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#6b645b", margin: 0 }}>{c.f3B}</p>
            </div>
            {/* F4 */}
            <div className="notion-feat-card">
              <svg viewBox="0 0 52 52" width="52" height="52" fill="none" style={{ marginBottom: 20, transformOrigin: "center", animation: "spin360 6s linear infinite" }}>
                <path d="M44 26 A18 18 0 1 1 36 11" stroke="#b8a9e8" strokeWidth="3" strokeLinecap="round" />
                <path d="M36 4 L36 12 L28 12" stroke="#b8a9e8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 style={{ fontFamily: "'Fraunces','Noto Serif SC',serif", fontWeight: 600, fontSize: 20, lineHeight: 1.25, color: "#1c1915", margin: "0 0 10px" }}>{c.f4T}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#6b645b", margin: 0 }}>{c.f4B}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOR WHOM */}
      <section style={{ background: "#fff", padding: "88px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Fraunces','Noto Serif SC',serif", fontWeight: 700, fontSize: 34, lineHeight: 1.15, color: "#1c1915", letterSpacing: -0.5, margin: "0 0 48px", textAlign: "center" }}>{c.forTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "#f9f7f1", border: "0.5px solid #efebe2", borderRadius: 14, padding: 32 }}>
              <div style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.08em", color: "#1c1915", textTransform: "uppercase", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#6ab04c", fontSize: 15 }}>✓</span>{c.forYesLabel}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[c.forYes1, c.forYes2, c.forYes3, c.forYes4].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "#6ab04c", fontSize: 12, flexShrink: 0, marginTop: 3 }}>✓</span>
                    <span style={{ fontSize: 14, lineHeight: 1.55, color: "#3a352e" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#f9f7f1", border: "0.5px solid #efebe2", borderRadius: 14, padding: 32 }}>
              <div style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.08em", color: "#1c1915", textTransform: "uppercase", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#c4bcaf", fontSize: 15 }}>✕</span>{c.forNoLabel}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[c.forNo1, c.forNo2].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "#c4bcaf", fontSize: 12, flexShrink: 0, marginTop: 3 }}>✕</span>
                    <span style={{ fontSize: 14, lineHeight: 1.55, color: "#8a8276" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PURCHASE */}
      <section id="purchase" style={{ background: "#f4f2ec", padding: "88px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", color: "#a49c90", textTransform: "uppercase", marginBottom: 14 }}>{c.buyEyebrow}</div>
            <h2 style={{ fontFamily: "'Fraunces','Noto Serif SC',serif", fontWeight: 700, fontSize: 40, lineHeight: 1.1, color: "#1c1915", letterSpacing: -0.8, margin: "0 0 16px" }}>{c.buyTitle}</h2>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "#6b645b", maxWidth: 480, margin: "0 auto" }}>{c.buyNote}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
            {PURCHASE.map((p) => (
              <a key={p.key} href={p.href} target="_blank" rel="noopener noreferrer"
                className="notion-buy-card"
                style={p.highlight
                  ? { background: "#f7eacf", border: "1.5px solid #e4a11b" }
                  : { background: "#fff", border: "0.5px solid #e7e2d8" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = p.highlight ? "#f0d9a8" : "#fff"; e.currentTarget.style.borderColor = p.highlight ? "#e4a11b" : "#a49c90"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = p.highlight ? "#f7eacf" : "#fff"; e.currentTarget.style.borderColor = p.highlight ? "#e4a11b" : "#e7e2d8"; }}
              >
                <div style={{ fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", color: p.highlight ? "#e4a11b" : "#a49c90", textTransform: "uppercase", marginBottom: 10 }}>
                  {p.subKey ? c[p.subKey] : p.sub}
                </div>
                <div style={{ fontWeight: 700, fontSize: 20, lineHeight: 1.2, color: "#1c1915" }}>{p.name}</div>
                <div style={{ flex: 1, minHeight: 16 }} />
                <div style={{ fontWeight: 700, fontSize: 38, lineHeight: 1, color: p.highlight ? "#e4a11b" : "#3a352e", letterSpacing: -1.5, marginBottom: 16 }}>
                  {p.priceKey ? c[p.priceKey] : p.price}
                </div>
                <div style={{ fontWeight: 600, fontSize: 13, color: p.highlight ? "#e4a11b" : "#6b645b" }}>
                  {p.highlight ? `${c.buyNow} →` : "→"}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#fff", borderTop: "0.5px solid #e7e2d8", padding: "56px 40px 48px", textAlign: "center" }}>
        <img src="/logo.png" alt="Chaologies" style={{ height: 30, objectFit: "contain", margin: "0 auto 16px" }} />
        <p style={{ fontFamily: "'LXGW WenKai','Noto Serif SC',serif", fontSize: 15, lineHeight: 1.6, color: "#8a8276", margin: "0 0 6px" }}>{c.footerQuote}</p>
        <p style={{ fontSize: 12, color: "#c4bcaf", margin: "0 0 28px" }}>© 2026 Chaologies. All rights reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {SOCIAL.map((s) => (
            <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" title={s.title} className="notion-social-btn">
              <img src={s.icon} alt={s.title} />
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
