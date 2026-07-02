import { useState, useEffect } from "react";
import WechatModal from "./WechatModal.jsx";

const COPY = {
  heroEyebrow: { zh: "等待清单 · 7 天财务计划", en: "WAITLIST · 7-DAY MONEY PLAN" },
  heroT1: { zh: "7 天，把你的钱", en: "The free 7-day plan to finally get your " },
  heroHL: { zh: "真正管起来", en: "money under control" },
  heroSub: { zh: "7 天个人财务管理计划，正在打磨中。\n现在加入等待清单，计划一上线，你第一个拿到。", en: "The 7-day money plan is almost ready.\nJoin the waitlist now and be the first to get it the moment it drops." },
  heroCta: { zh: "加入等待清单", en: "Join the waitlist" },
  heroFine: { zh: "🔒 免费加入。无垃圾邮件。你还会收到我每周的财务 newsletter（10,000+ 人在读）。随时退订。", en: "🔒 Free to join. No spam. You'll also get my weekly money newsletter (10,000+ readers). Unsubscribe anytime." },
  proof: { zh: "加入 10,000+ 终于开始掌控自己钱的读者", en: "Join 10,000+ readers who finally took control of their money" },
  forYouTitle: { zh: "这份计划，是为你准备的", en: "This plan is " },
  forYouHL: { zh: "如果…", en: "for you if…" },
  forYouTag1: { zh: "听起来很熟悉？你不是一个人。", en: "Sound familiar? You're not alone." },
  forYouTag2: { zh: "从今天开始，真正掌控你的财务未来。", en: "It's time to take real control of your financial future." },
  insideTitle: { zh: "这 7 天里，到底有", en: "What's inside the " },
  insideHL: { zh: "什么", en: "7-day money plan" },
  insideSub: { zh: "从一团乱到井井有条，一周就够。\n没有废话，全是行动。", en: "Everything to go from scattered to structured in one week.\nNo fluff, just action." },
  finalTitle: { zh: "现在就", en: "Join the " },
  finalHL: { zh: "加入等待清单", en: "waitlist" },
  finalSub: { zh: "这 7 天，会是你开启富足人生的起点。\n立刻加入，第一时间拿到完整计划。", en: "These 7 days will be the start of your journey to financial freedom.\nJoin early and be first in line." },
  finalFine: { zh: "♡ 免费加入。无垃圾邮件。随时退订。", en: "♡ Free to join. No spam. Unsubscribe anytime." },
  footerLine: { zh: "新加坡出品。靠咖啡，和一种井井有条的「怕乱」供能。", en: "Made in Singapore, fueled by kopi and a well-organised fear of clutter." },
  successTitle: { zh: "欢迎上车，", en: "Welcome aboard — " },
  successHi: { zh: "你成功加入了 🎉", en: "you're in! 🎉" },
  successSub: { zh: "完成下面几步，计划一上线你第一个收到 👇", en: "Complete these steps so you're first in line when it drops 👇" },
  goSubstack: { zh: "前往 Beehiiv 完成订阅 →", en: "Go to Beehiiv to confirm →" },
  backHome: { zh: "← 返回主页", en: "← Back to home" },
  qrModalTitle: { zh: "关注 Chaologies 公众号", en: "Follow Chaologies on WeChat" },
  qrModalSub: { zh: "微信扫一扫，或长按图片保存二维码再扫。", en: "Scan with WeChat, or long-press to save and scan." },
};

const FOR_YOU = [
  { zh: "你很努力地工作，却总觉钱不够花，也觉得自己本该走得更远。", en: "You work hard and feel like you should be further ahead — but the money never seems to stretch far enough." },
  { zh: "你知道该投资，却一直拖着，也不知道从哪开始。", en: "You know you should be investing, but keep putting it off because you don't know where to start." },
  { zh: "你试过记账、做预算，但从来没真正坚持下来，也不知道这么做具体有什么用。", en: "You've tried budgeting before and nothing ever stuck — and you weren't even sure why it was supposed to help." },
  { zh: "你有目标（买房、结婚、创业、旅行），却没有真正计划过如何实现。", en: "You have goals (a house, a wedding, a business, travel) but no real plan for how to actually get there." },
];

const INSIDE = [
  { emoji: "📅", title: { zh: "每天一步的行动清单", en: "Day-by-day action plan" }, desc: { zh: "每天只做一件小事，7 天下来，你再也不会卡在「该先做什么」。", en: "One simple step each day so you never freeze up wondering what to do first." } },
  { emoji: "💸", title: { zh: "自由消费计划表", en: "The Freedom Spending Plan" }, desc: { zh: "一张让你花钱不愧疚、还能稳稳存下钱的表格。", en: "A spreadsheet that lets you spend guilt-free while still saving money." } },
  { emoji: "📈", title: { zh: "新手投资指南", en: "Beginner investing guide" }, desc: { zh: "搞懂投资的底层逻辑与核心概念，建立真正属于自己的投资思维框架，而不是跟风或乱猜。", en: "Understand the underlying logic and core concepts of investing — build your own thinking framework instead of just following instructions." } },
  { emoji: "🛟", title: { zh: "应急资金计算器", en: "Emergency fund calculator" }, desc: { zh: "算清你到底需要多少，并用「周」而不是「年」把它攒出来。", en: "See exactly how much you need and build a plan to get there in weeks, not years." } },
  { emoji: "🎁", title: { zh: "额外福利资源", en: "Plus bonus resources" }, desc: { zh: "一份模板与清单合集，帮你把这套系统一直用下去。", en: "A pack of templates so you keep this whole system going for good." } },
];


function PrimaryBtn({ onClick, children, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "var(--honey)",
        color: "#fff",
        border: "none",
        borderRadius: 11,
        padding: "16px 30px",
        fontSize: 16,
        fontWeight: 700,
        fontFamily: "var(--font-sans)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background .15s, transform .15s",
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--honey-600)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "var(--honey)"; }}
    >
      {children}
    </button>
  );
}

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
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", background: "var(--surface)", borderRadius: 999, padding: "5px 5px 5px 18px", border: "1.5px solid var(--border)", maxWidth: 420, margin: center ? "0 auto" : undefined }}>
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
          {subState === "loading" ? "…" : (label || (lang === "zh" ? "免費訂閱" : "Subscribe"))}
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

export default function NewsletterPage({ lang, setLang, onBack }) {
  const [showWechat, setShowWechat] = useState(false);

  const p = (o) => (o && typeof o === "object" ? (o[lang] || o.zh) : o);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goHome = () => onBack();

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink)", fontFamily: "var(--font-sans)", lineHeight: 1.5, WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-13px)}}
        @keyframes pop{0%{transform:scale(.5);opacity:0}65%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
        @keyframes dash{from{stroke-dashoffset:240}to{stroke-dashoffset:0}}
        @keyframes confetti-fall{0%{transform:translateY(-30px) rotate(0);opacity:1}100%{transform:translateY(440px) rotate(380deg);opacity:0}}
        @media(prefers-reduced-motion:reduce){*{animation:none!important}}
        .nl-inside-card{transition:transform .25s,box-shadow .25s,border-color .25s;}
        .nl-inside-card:hover{transform:translateY(-3px);box-shadow:var(--lift-sm);border-color:var(--line)!important;}
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

      <div>
          {/* HERO */}
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
            <div style={{ position: "relative", maxWidth: 640, margin: "0 auto", padding: "46px 0 72px" }}>
              <span style={{ position: "absolute", top: "2%", left: "-1%", fontSize: 30, animation: "floaty 4.2s ease-in-out infinite", pointerEvents: "none" }}>💰</span>
              <span style={{ position: "absolute", bottom: "4%", left: "38%", fontSize: 24, animation: "floaty 5s ease-in-out .6s infinite", pointerEvents: "none" }}>✨</span>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--honey)", display: "flex", alignItems: "center", gap: 8, margin: "0 0 18px" }}>
                <span>✦</span>{p(COPY.heroEyebrow)}
              </p>
              <h1 style={{ fontFamily: "var(--font-sans)", fontSize: 54, fontWeight: 800, lineHeight: 1.06, letterSpacing: -1.4, margin: "0 0 22px", textWrap: "balance" }}>
                {p(COPY.heroT1)}
                <span style={{ position: "relative", color: "var(--honey)", whiteSpace: "nowrap" }}>
                  {p(COPY.heroHL)}
                  <svg viewBox="0 0 200 12" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: -7, width: "100%", height: 10, overflow: "visible" }}>
                    <path d="M2 8 Q 50 1 100 7 T 198 5" fill="none" stroke="var(--honey)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="240" style={{ animation: "dash 1.1s ease .35s both" }} />
                  </svg>
                </span>
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: "34ch", margin: "0 0 26px", whiteSpace: "pre-line" }}>{p(COPY.heroSub)}</p>
              <div style={{ marginBottom: 13 }}>
                <SubForm lang={lang} label={lang === "zh" ? "加入等待清單" : "Join waitlist"} center />
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--ink-3)", maxWidth: "46ch", margin: "0 0 24px" }}>{p(COPY.heroFine)}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
                <span style={{ fontSize: 13, color: "var(--ink-2)", maxWidth: "30ch", lineHeight: 1.45 }}>{p(COPY.proof)}</span>
              </div>
            </div>
          </div>

          {/* FOR YOU */}
          <div style={{ background: "var(--surface)", borderTop: "1px solid var(--line-2)", borderBottom: "1px solid var(--line-2)" }}>
            <div style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px" }}>
              <h2 style={{ textAlign: "center", fontSize: 38, fontWeight: 800, letterSpacing: -1, margin: "0 0 40px" }}>
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

          {/* WHAT'S INSIDE */}
          <div style={{ maxWidth: 880, margin: "0 auto", padding: "78px 40px" }}>
            <h2 style={{ textAlign: "center", fontSize: 38, fontWeight: 800, letterSpacing: -1, margin: "0 0 14px" }}>
              {p(COPY.insideTitle)}<span style={{ color: "var(--honey)" }}>{p(COPY.insideHL)}</span>
            </h2>
            <p style={{ textAlign: "center", fontSize: 16, color: "var(--ink-2)", maxWidth: "42ch", margin: "0 auto 40px", lineHeight: 1.6, whiteSpace: "pre-line" }}>{p(COPY.insideSub)}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 720, margin: "0 auto" }}>
              {INSIDE.map((item, i) => (
                <div key={i} className="nl-inside-card" style={{ display: "flex", alignItems: "flex-start", gap: 18, background: "var(--surface)", border: "1px solid var(--line-2)", borderRadius: 16, padding: "22px 24px" }}>
                  <span style={{ flexShrink: 0, width: 46, height: 46, borderRadius: 13, background: "var(--honey-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 23 }}>{item.emoji}</span>
                  <div>
                    <p style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", margin: "2px 0 6px" }}>{p(item.title)}</p>
                    <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-2)", margin: 0 }}>{p(item.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FINAL CTA */}
          <div style={{ background: "var(--honey-soft)" }}>
            <div style={{ maxWidth: 660, margin: "0 auto", padding: "78px 40px", textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 10, animation: "floaty 4s ease-in-out infinite" }}>✈️</div>
              <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, margin: "0 0 16px" }}>
                {p(COPY.finalTitle)}<span style={{ color: "var(--honey-600)" }}>{p(COPY.finalHL)}</span>
              </h2>
              <p style={{ fontSize: 16.5, color: "var(--ink-2)", maxWidth: "42ch", margin: "0 auto 28px", lineHeight: 1.6, whiteSpace: "pre-line" }}>{p(COPY.finalSub)}</p>
              <SubForm lang={lang} label={lang === "zh" ? "加入等待清單" : "Join waitlist"} center />
              <p style={{ fontSize: 12.5, color: "var(--ink-3)", margin: "14px 0 0", fontStyle: "italic" }}>{p(COPY.finalFine)}</p>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "34px 40px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <p style={{ fontFamily: "var(--font-hand)", fontSize: 15, color: "var(--ink-2)", maxWidth: "44ch", lineHeight: 1.6, margin: 0, letterSpacing: ".2px" }}>{p(COPY.footerLine)}</p>
            <img src="/air.png" alt="" style={{ width: 40, opacity: .85 }} />
          </div>
        </div>

      {showWechat && <WechatModal lang={lang} onClose={() => setShowWechat(false)} />}
    </div>
  );
}
