// ─────────────────────────────────────────────────────
//  Blog.jsx — Journal (design-system port)
//  Hero · newsletter strip · essays · currently · footer
// ─────────────────────────────────────────────────────

import { useState } from "react";
import SubscribeModal from "./SubscribeModal.jsx";
import { tr, LangToggle } from "./i18n.jsx";

const ESSAYS = [
  {
    date: { en: "Jun 2026", zh: "2026.06" },
    read: "6 min",
    tag: { en: "Latest", zh: "最新" },
    featured: true,
    url: "https://chaologies.beehiiv.com/p/i-audited-my-own-life-the-numbers",
    title: {
      en: "I audited my own life. The numbers didn’t add up.",
      zh: "我审计了自己的人生，结果账对不上。",
    },
    dek: {
      en: "Ten years of balancing other people’s books taught me one thing about my own: I’d been counting the wrong column.",
      zh: "帮别人做了十年账，我才发现自己这本账——一直在算错的那一栏。",
    },
  },
  {
    date: { en: "May 2026", zh: "2026.05" },
    read: "5 min",
    title: {
      en: "The most expensive word in personal finance is ‘someday’.",
      zh: "理财里最贵的两个字，是「以后」。",
    },
    dek: {
      en: "A short, slightly uncomfortable lesson on the cost of waiting — with actual math.",
      zh: "一堂关于「等待的代价」的小课，有点扎心，还附真实算式。",
    },
  },
  {
    date: { en: "May 2026", zh: "2026.05" },
    read: "4 min",
    title: {
      en: "How to own less without becoming insufferable about it.",
      zh: "如何拥有更少，又不变成一个烦人的极简主义者。",
    },
    dek: {
      en: "Minimalism is great. Talking about minimalism at dinner is not. A field guide.",
      zh: "极简主义很好。在饭桌上大谈极简主义，不好。一份避雷指南。",
    },
  },
  {
    date: { en: "Apr 2026", zh: "2026.04" },
    read: "8 min",
    title: {
      en: "Quitting the Big Four: a cost-benefit analysis nobody asked for.",
      zh: "从四大辞职：一份没人要看的成本收益分析。",
    },
    dek: {
      en: "I made a spreadsheet to decide whether to leave a job I was good at. Then I ignored it.",
      zh: "我做了张表来决定要不要离开一份我擅长的工作。然后我没看它。",
    },
  },
  {
    date: { en: "Mar 2026", zh: "2026.03" },
    read: "7 min",
    title: {
      en: "Five countries, one carry-on, zero regrets. (Okay, one.)",
      zh: "五个国家，一个登机箱，零遗憾。(好吧，一个。)",
    },
    dek: {
      en: "What twenty years of moving taught me about what’s actually worth carrying.",
      zh: "二十年的搬家生涯教会我：到底什么才值得随身带着。",
    },
  },
];

const CURRENTLY = [
  {
    k: { en: "Reading", zh: "在读" },
    v: { en: "Four Thousand Weeks — and feeling personally attacked.", zh: "《四千周》——感觉被点名了。" },
  },
  {
    k: { en: "Building", zh: "在做" },
    v: { en: "A life system — now that the reading one finally shipped.", zh: "一套 life system——阅读系统总算上线了。" },
  },
  {
    k: { en: "Avoiding", zh: "在躲" },
    v: { en: "Anything that requires a second monitor.", zh: "任何需要第二块显示器的事。" },
  },
  {
    k: { en: "Based in", zh: "现居" },
    v: { en: "Singapore — country no. 5, and counting.", zh: "新加坡——第 5 个国家，还在数。" },
  },
];

const T = {
  back: "Chaologies",
  kicker: { en: "The Journal", zh: "碎碎念" },
  title: {
    en: "Notes from a recovering accountant.",
    zh: "一个「康复中」会计师的碎碎念。",
  },
  dek: {
    en: "Essays on money, minimalism, and the quiet thrill of owning less. Published roughly twice a month — whenever the spreadsheet of my thoughts finally balances.",
    zh: "关于金钱、极简，和「拥有更少」的小确幸。大约每月两篇——等我脑子里那张表终于对上账的时候。",
  },
  join: { en: "Join", zh: "和" },
  joinTail: {
    en: "fellow overthinkers. One email, no spreadsheets.",
    zh: "位同路人。一封邮件，不含任何报表。",
  },
  emailPh: { en: "your@email.com", zh: "你的邮箱" },
  subscribe: { en: "Subscribe", zh: "订阅" },
  fine: {
    en: "Unsubscribe anytime. I’d audit myself if I made it hard.",
    zh: "随时退订。要是退订很麻烦，我会先审计我自己。",
  },
  essays: { en: "Essays", zh: "文章" },
  currently: { en: "Currently", zh: "近况" },
  sign: {
    en: "Made in Singapore, fueled by kopi and a mild, well-organised fear of clutter.",
    zh: "新加坡出品。靠咖啡，和一种井井有条的「怕乱」供能。",
  },
};

export default function Blog({ lang, setLang, data, onBack }) {
  const subUrl = `${data.newsletter.url.replace(/\/$/, "")}?utm_source=website`;
  const count = (data.totalFollowers || 0).toLocaleString("en-US");
  const [subOpen, setSubOpen] = useState(false);

  return (
    <div className="blog-page">
      <nav className="blog-nav">
        <button className="blog-back" onClick={onBack}>
          <span className="a">←</span>
          <span>{T.back}</span>
        </button>
        <LangToggle lang={lang} setLang={setLang} />
      </nav>

      <div className="blog-wrap">
        <header className="blog-hero">
          <div className="blog-kicker">{tr(T.kicker, lang)}</div>
          <h1 className="blog-h1">{tr(T.title, lang)}</h1>
          <p className="blog-dek">{tr(T.dek, lang)}</p>

          <div className="blog-signup">
            <p className="blog-lead">
              {tr(T.join, lang)} <b>{count}</b> {tr(T.joinTail, lang)}
            </p>
            <button className="blog-cta" onClick={() => setSubOpen(true)}>
              <span>{tr(T.subscribe, lang)}</span>
              <span className="arr">→</span>
            </button>
            <p className="blog-fine">{tr(T.fine, lang)}</p>
          </div>
        </header>

        <div className="blog-essays-label">
          <h2>{tr(T.essays, lang)}</h2>
          <span className="n">{String(ESSAYS.length).padStart(2, "0")}</span>
        </div>

        <div>
          {ESSAYS.map((e, i) => (
            <a
              key={i}
              className={`blog-essay${e.featured ? " featured" : ""}`}
              href={e.url || subUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="blog-meta">
                {e.tag && (
                  <>
                    <span className="tag">{tr(e.tag, lang)}</span>
                    <span className="dot" />
                  </>
                )}
                <span>{tr(e.date, lang)}</span>
                <span className="dot" />
                <span>{e.read}</span>
              </div>
              <h3>
                {tr(e.title, lang)}
                <span className="arr">→</span>
              </h3>
              <p>{tr(e.dek, lang)}</p>
            </a>
          ))}
        </div>

        <section className="blog-currently">
          <h2>{tr(T.currently, lang)}</h2>
          <div className="blog-cur-grid">
            {CURRENTLY.map((c, i) => (
              <div className="blog-cur-item" key={i}>
                <span className="k">{tr(c.k, lang)}</span>
                <span className="v">{tr(c.v, lang)}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="blog-foot">
          <p className="sign">{tr(T.sign, lang)}</p>
          <div className="links">
            <a href={subUrl} target="_blank" rel="noopener noreferrer">Beehiiv</a>
            <a href="https://youtube.com/@Chaologies" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="mailto:hello@chaologies.com">Email</a>
          </div>
        </footer>
      </div>
      {subOpen && <SubscribeModal lang={lang} onClose={() => setSubOpen(false)} />}
    </div>
  );
}
