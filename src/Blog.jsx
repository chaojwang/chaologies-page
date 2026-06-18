// ─────────────────────────────────────────────────────
//  Blog.jsx — Journal (design-system port)
//  Hero · newsletter strip · essays · currently · footer
// ─────────────────────────────────────────────────────

const ESSAYS = [
  {
    date: { en: "Jun 2026", zh: "2026.06" },
    read: "6 min",
    tag: { en: "Latest", zh: "最新" },
    featured: true,
    title: {
      en: "I audited my own life. The numbers didn’t add up.",
      zh: "我審計了自己的人生，結果賬對不上。",
    },
    dek: {
      en: "Ten years of balancing other people’s books taught me one thing about my own: I’d been counting the wrong column.",
      zh: "幫別人做了十年賬，我才發現自己這本賬——一直在算錯的那一欄。",
    },
  },
  {
    date: { en: "May 2026", zh: "2026.05" },
    read: "5 min",
    title: {
      en: "The most expensive word in personal finance is ‘someday’.",
      zh: "理財裡最貴的兩個字，是「以後」。",
    },
    dek: {
      en: "A short, slightly uncomfortable lesson on the cost of waiting — with actual math.",
      zh: "一堂關於「等待的代價」的小課，有點扎心，還附真實算式。",
    },
  },
  {
    date: { en: "May 2026", zh: "2026.05" },
    read: "4 min",
    title: {
      en: "How to own less without becoming insufferable about it.",
      zh: "如何擁有更少，又不變成一個煩人的極簡主義者。",
    },
    dek: {
      en: "Minimalism is great. Talking about minimalism at dinner is not. A field guide.",
      zh: "極簡主義很好。在飯桌上大談極簡主義，不好。一份避雷指南。",
    },
  },
  {
    date: { en: "Apr 2026", zh: "2026.04" },
    read: "8 min",
    title: {
      en: "Quitting the Big Four: a cost-benefit analysis nobody asked for.",
      zh: "從四大辭職：一份沒人要看的成本收益分析。",
    },
    dek: {
      en: "I made a spreadsheet to decide whether to leave a job I was good at. Then I ignored it.",
      zh: "我做了張表來決定要不要離開一份我擅長的工作。然後我沒看它。",
    },
  },
  {
    date: { en: "Mar 2026", zh: "2026.03" },
    read: "7 min",
    title: {
      en: "Five countries, one carry-on, zero regrets. (Okay, one.)",
      zh: "五個國家，一個登機箱，零遺憾。(好吧，一個。)",
    },
    dek: {
      en: "What twenty years of moving taught me about what’s actually worth carrying.",
      zh: "二十年的搬家生涯教會我：到底什麼才值得隨身帶著。",
    },
  },
];

const CURRENTLY = [
  {
    k: { en: "Reading", zh: "在讀" },
    v: { en: "Four Thousand Weeks — and feeling personally attacked.", zh: "《四千週》——感覺被點名了。" },
  },
  {
    k: { en: "Building", zh: "在做" },
    v: { en: "A life system — now that the reading one finally shipped.", zh: "一套 life system——閱讀系統總算上線了。" },
  },
  {
    k: { en: "Avoiding", zh: "在躲" },
    v: { en: "Anything that requires a second monitor.", zh: "任何需要第二塊顯示器的事。" },
  },
  {
    k: { en: "Based in", zh: "現居" },
    v: { en: "Singapore — country no. 5, and counting.", zh: "新加坡——第 5 個國家，還在數。" },
  },
];

const T = {
  back: "Chaologies",
  kicker: { en: "The Journal", zh: "碎碎念" },
  title: {
    en: "Notes from a recovering accountant.",
    zh: "一個「康復中」會計師的碎碎念。",
  },
  dek: {
    en: "Essays on money, minimalism, and the quiet thrill of owning less. Published roughly twice a month — whenever the spreadsheet of my thoughts finally balances.",
    zh: "關於金錢、極簡，和「擁有更少」的小確幸。大約每月兩篇——等我腦子裡那張表終於對上賬的時候。",
  },
  join: { en: "Join", zh: "和" },
  joinTail: {
    en: "fellow overthinkers. One email, no spreadsheets.",
    zh: "位同路人。一封郵件，不含任何報表。",
  },
  emailPh: { en: "your@email.com", zh: "你的郵箱" },
  subscribe: { en: "Subscribe", zh: "訂閱" },
  fine: {
    en: "Unsubscribe anytime. I’d audit myself if I made it hard.",
    zh: "隨時退訂。要是退訂很麻煩，我會先審計我自己。",
  },
  essays: { en: "Essays", zh: "文章" },
  currently: { en: "Currently", zh: "近況" },
  sign: {
    en: "Made in Singapore, fueled by kopi and a mild, well-organised fear of clutter.",
    zh: "新加坡出品。靠咖啡，和一種井井有條的「怕亂」供能。",
  },
};

export default function Blog({ lang, setLang, data, onBack }) {
  const subUrl = `${data.newsletter.url.replace(/\/$/, "")}?utm_source=website`;
  const count = (data.totalFollowers || 0).toLocaleString("en-US");

  return (
    <div className="blog-page">
      <nav className="blog-nav">
        <button className="blog-back" onClick={onBack}>
          <span className="a">←</span>
          <span>{T.back}</span>
        </button>
        <div className="lang">
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          <button className={lang === "zh" ? "on" : ""} onClick={() => setLang("zh")}>中</button>
        </div>
      </nav>

      <div className="blog-wrap">
        <header className="blog-hero">
          <div className="blog-kicker">{T.kicker[lang]}</div>
          <h1 className="blog-h1">{T.title[lang]}</h1>
          <p className="blog-dek">{T.dek[lang]}</p>

          <div className="blog-signup">
            <p className="blog-lead">
              {T.join[lang]} <b>{count}</b> {T.joinTail[lang]}
            </p>
            <a className="blog-cta" href={subUrl} target="_blank" rel="noopener noreferrer">
              <span>{T.subscribe[lang]}</span>
              <span className="arr">→</span>
            </a>
            <p className="blog-fine">{T.fine[lang]}</p>
          </div>
        </header>

        <div className="blog-essays-label">
          <h2>{T.essays[lang]}</h2>
          <span className="n">{String(ESSAYS.length).padStart(2, "0")}</span>
        </div>

        <div>
          {ESSAYS.map((e, i) => (
            <a
              key={i}
              className={`blog-essay${e.featured ? " featured" : ""}`}
              href={subUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="blog-meta">
                {e.tag && (
                  <>
                    <span className="tag">{e.tag[lang]}</span>
                    <span className="dot" />
                  </>
                )}
                <span>{e.date[lang]}</span>
                <span className="dot" />
                <span>{e.read}</span>
              </div>
              <h3>
                {e.title[lang]}
                <span className="arr">→</span>
              </h3>
              <p>{e.dek[lang]}</p>
            </a>
          ))}
        </div>

        <section className="blog-currently">
          <h2>{T.currently[lang]}</h2>
          <div className="blog-cur-grid">
            {CURRENTLY.map((c, i) => (
              <div className="blog-cur-item" key={i}>
                <span className="k">{c.k[lang]}</span>
                <span className="v">{c.v[lang]}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="blog-foot">
          <p className="sign">{T.sign[lang]}</p>
          <div className="links">
            <a href={subUrl} target="_blank" rel="noopener noreferrer">Substack</a>
            <a href="https://youtube.com/@Chaologies" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="mailto:hello@chaologies.com">Email</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
