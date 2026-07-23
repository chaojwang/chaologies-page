// ─────────────────────────────────────────────────────
//  PartnerPage.jsx — /partner 品牌合作（media kit as a page）
//  给品牌对接人看的一页：品牌价值 → 创作方法 → 平台 → 案例 → 合作入口
// ─────────────────────────────────────────────────────

import { tr, LangToggle } from "./i18n.jsx";
import {
  DOUYIN_URL,
  PARTNER_BRANDS,
  getBrand,
  getBrandCases,
  getFeaturedCases,
} from "./partnerCases.js";

const EMAIL = "chao@chaologies.com";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Brand Collaboration · Chaologies")}`;
// 赞藏总数目前只有旧版 2M+，待用各平台后台的最新累计数替换。
// 独立成一个常量，避免数字散落在中英文文案里。
const TOTAL_ENGAGEMENTS = "2M+";

const T = {
  eyebrow: { en: "For Brands · Selected Partnerships", zh: "品牌合作 · 案例与媒体资料" },
  h1a: { en: "Help", zh: "让" },
  h1num: { en: "470,000+", zh: "47 万+" },
  h1line1: {
    en: "people who care about living well",
    zh: "关注生活品质的人",
  },
  h1line2: {
    en: "find products that genuinely add value to their lives.",
    zh: "找到真正能为生活增加价值的产品。",
  },
  ctaTop: { en: "See the work", zh: "先看合作案例" },
  ctaMail: { en: "Start a conversation", zh: "发来合作资料" },
  statFollowers: { en: "followers across platforms", zh: "全网关注" },
  statLikes: { en: "likes & saves", zh: "累计点赞与收藏" },
  statYears: { en: "creating consistently", zh: "持续内容创作" },
  statBrands: { en: "brand partners", zh: "合作品牌" },
  brandsK: { en: "Selected brand partners", zh: "曾合作品牌" },
  brandsHint: { en: "Select a brand to see its complete case library.", zh: "点击品牌，查看完整合作案例。" },
  whyK: { en: "How I approach sponsored content", zh: "我怎么把产品讲进内容里" },
  whyIntro: {
    en: "Every partnership has a baseline: explain the brand's value clearly and remain accountable for the audience's buying decision.",
    zh: "我做合作有一条底线：既要帮品牌把价值讲清楚，也要对观众的购买判断负责。",
  },
  why: [
    {
      n: "01",
      t: { en: "Start with a genuine fit", zh: "先看它和我的生活是不是真的契合" },
      d: {
        en: "I don't force a product into a story because a feature sounds useful. I begin with a real problem and ask whether the product actually fits my life and my audience.",
        zh: "我不会拿着卖点硬找场景。先从真实问题出发，看看产品到底解决了什么，也看看它是否真的适合我的生活和观众。",
      },
    },
    {
      n: "02",
      t: { en: "Use it before making the call", zh: "先用一段时间，再给判断" },
      d: {
        en: "The process, strengths, and trade-offs stay in the story. I don't force praise or pretend a fit; I share experiences I can stand behind.",
        zh: "真实的使用过程、优点和取舍都会留在内容里。不硬夸，也不为了合作强行结合；我只讲自己愿意负责的体验。",
      },
    },
    {
      n: "03",
      t: { en: "Build around real audience questions", zh: "把观众的疑问，变成内容" },
      d: {
        en: "I take purchase questions seriously and answer them through video. Viewers get a clearer decision, and brands reach people who are genuinely a fit.",
        zh: "我会认真回复有购买需求的观众，用视频回答他们真正关心的问题。观众更容易做决定，品牌也能找到更合适的用户。",
      },
    },
  ],
  reachK: { en: "Audience channels", zh: "可触达的平台" },
  reachNote: {
    en: "Featured cases include YouTube and Bilibili links whenever both versions are available.",
    zh: "合作案例会尽量同时提供 YouTube 和 B站链接，国内外团队都能直接查看。",
  },
  workK: { en: "Selected work", zh: "代表作" },
  workIntro: {
    en: "Eight examples arranged by approach: brand stories, cameras and technology, products used at home, and English-language content.",
    zh: "这 8 条按内容方向排列：品牌故事、数码影像、生活场景和英文内容。点击品牌名称，可以查看完整案例库。",
  },
  watchYouTube: { en: "YouTube", zh: "YouTube" },
  watchBilibili: { en: "Bilibili", zh: "B站" },
  formatsK: { en: "Ways to work together", zh: "合作方式" },
  formats: [
    {
      t: { en: "Dedicated story", zh: "整支定制内容" },
      d: { en: "A review, experiment, or cinematic story built around one useful audience question.", zh: "围绕一个真实问题，完成评测、体验或剧情化内容。" },
    },
    {
      t: { en: "Native integration / UGC", zh: "原生植入 / UGC 内容" },
      d: { en: "A natural, UGC-style piece built around a use case that already belongs in the topic.", zh: "用接近日常分享的 UGC 方式，让产品自然进入真实使用场景。" },
    },
    {
      t: { en: "Platform-native package", zh: "多平台内容组合" },
      d: { en: "Long-form, short-form, or posts prepared in different versions when the campaign needs them.", zh: "如果项目需要，可以提供长视频、短视频或图文等不同版本。" },
    },
    {
      t: { en: "Brand story", zh: "品牌理念内容" },
      d: { en: "Like the Sony and Bellroy films: the brand's point of view and the human story lead, rather than a single product or feature list.", zh: "像 Sony 和 Bellroy 的合作一样，不从单一产品卖点出发，而是讲品牌理念和人的故事。" },
    },
  ],
  ctaK: { en: "Let's see if it's a fit", zh: "聊聊这次合作" },
  ctaSub: {
    en: "Send the product, target platforms, and preferred timing. If it fits the channel and the audience, we can find the most natural way to tell the story.",
    zh: "可以把产品资料、目标平台和时间安排发来。确认产品和内容方向合适后，我们再一起找最自然的合作方式。",
  },
  ctaBtn: { en: "Send the brief", zh: "发送合作资料" },
  back: { en: "Chaologies", zh: "Chaologies" },
  brandBack: { en: "All partnerships", zh: "全部品牌合作" },
  brandEyebrow: { en: "Partnership archive", zh: "品牌合作案例库" },
  brandCount: { en: "published collaborations", zh: "条合作内容" },
  brandIntro: {
    en: "Every case links to the public version available on YouTube, Bilibili, or both. The same core idea is adapted to fit each platform.",
    zh: "每条案例都保留可公开查看的平台入口；有双平台版本时，同时提供 YouTube 和 B站链接。",
  },
  brandEmpty: { en: "No public case is listed yet.", zh: "暂时还没有公开案例。" },
};

function CaseCard({ item, lang, brandName, compact = false }) {
  const primaryUrl = item.youtube || item.bilibili;

  return (
    <article className={`pp-work${compact ? " pp-work-compact" : ""}`} id={`case-${item.id}`}>
      <a href={primaryUrl} target="_blank" rel="noopener noreferrer" aria-label={`${brandName}: ${item.title}`}>
        <div className="pp-work-thumb">
          {item.youtubeId ? (
            <img src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
          ) : (
            <div className="pp-work-placeholder" aria-hidden="true"><span>{brandName}</span></div>
          )}
          <span className="pp-work-brand">{brandName}</span>
          <span className="pp-work-play">▶</span>
        </div>
      </a>
      <div className="pp-work-type">{tr(item.kind, lang)}</div>
      <div className="pp-work-t">{item.title}</div>
      <div className="pp-work-links">
        {item.youtube && <a href={item.youtube} target="_blank" rel="noopener noreferrer">{tr(T.watchYouTube, lang)} <span>↗</span></a>}
        {item.bilibili && <a href={item.bilibili} target="_blank" rel="noopener noreferrer">{tr(T.watchBilibili, lang)} <span>↗</span></a>}
      </div>
    </article>
  );
}

function BrandCasePage({ brand, lang, setLang, onNavigate }) {
  const cases = getBrandCases(brand.slug);

  return (
    <div className="pp pp-brand-page">
      <style>{CSS}</style>
      <nav className="pp-nav">
        <button className="blog-back" onClick={() => onNavigate("/partner")}>
          <span className="a">←</span>
          <span>{tr(T.brandBack, lang)}</span>
        </button>
        <LangToggle lang={lang} setLang={setLang} />
      </nav>

      <header className="pp-case-hero">
        <div className="pp-kicker">{tr(T.brandEyebrow, lang)}</div>
        <h1 className={`pp-case-brand pp-brand ${brand.className}`}>{brand.name}</h1>
        <div className="pp-case-count"><b>{cases.length}</b> {tr(T.brandCount, lang)}</div>
        <p className="pp-sub">{tr(T.brandIntro, lang)}</p>
      </header>

      {cases.length ? (
        <section className="pp-sec pp-case-list">
          <div className="pp-works pp-works-archive">
            {cases.map((item) => <CaseCard key={item.id} item={item} lang={lang} brandName={brand.name} compact />)}
          </div>
        </section>
      ) : (
        <p className="pp-empty">{tr(T.brandEmpty, lang)}</p>
      )}

      <section className="pp-final pp-brand-final">
        <h2 className="pp-final-t">{tr(T.ctaK, lang)}</h2>
        <p className="pp-final-s">{tr(T.ctaSub, lang)}</p>
        <a className="pp-cta big" href={MAILTO}>
          <span>{tr(T.ctaBtn, lang)}</span>
          <span className="arr">→</span>
        </a>
      </section>
    </div>
  );
}

export default function PartnerPage({ lang, setLang, data, onBack, onNavigate, brandSlug }) {
  const selectedBrand = brandSlug ? getBrand(brandSlug) : null;
  if (selectedBrand) {
    return <BrandCasePage brand={selectedBrand} lang={lang} setLang={setLang} onNavigate={onNavigate} />;
  }

  const platforms = (data.platforms || [])
    .filter((p) => !p.isPage)
    .map((p) => /douyin|抖音/i.test(`${p.name || ""} ${p.nameZh || ""}`) ? { ...p, url: DOUYIN_URL } : p);
  const works = getFeaturedCases();
  const total = (data.totalFollowers || 0).toLocaleString("en-US");

  return (
    <div className="pp">
      <style>{CSS}</style>

      <nav className="pp-nav">
        <button className="blog-back" onClick={onBack}>
          <span className="a">←</span>
          <span>{tr(T.back, lang)}</span>
        </button>
        <LangToggle lang={lang} setLang={setLang} />
      </nav>

      {/* HERO */}
      <header className="pp-hero">
        <div className="pp-kicker">{tr(T.eyebrow, lang)}</div>
        <h1 className="pp-h1">
          <span className="pp-h1-line">{tr(T.h1a, lang)} <span className="pp-h1-num">{tr(T.h1num, lang)}</span> {tr(T.h1line1, lang)}</span>
          <span className="pp-h1-line pp-h1-line-2">{tr(T.h1line2, lang)}</span>
        </h1>
        <div className="pp-hero-actions">
          <a className="pp-cta" href="#partner-cases">
            <span>{tr(T.ctaTop, lang)}</span>
            <span className="arr">↓</span>
          </a>
        </div>

        <div className="pp-proof">
          <div className="pp-stats">
            <div className="pp-stat pp-stat-primary"><b>{total}</b><span>{tr(T.statFollowers, lang)}</span></div>
            <div className="pp-stat"><b>{TOTAL_ENGAGEMENTS}</b><span>{tr(T.statLikes, lang)}</span></div>
            <div className="pp-stat"><b>{lang === "en" ? "5 years" : "5 年"}</b><span>{tr(T.statYears, lang)}</span></div>
            <div className="pp-stat"><b>10+</b><span>{tr(T.statBrands, lang)}</span></div>
          </div>
          <div className="pp-platform-cluster">
            <div className="pp-proof-label">{tr(T.reachK, lang)}</div>
            <div className="pp-platform-bubbles">
              {platforms.map((p, i) => (
                <a
                  className="pp-platform-bubble"
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={lang !== "en" ? tr(p.nameZh || p.name, lang) : p.name}
                >
                  {p.logoUrl && p.logoUrl.length > 2 ? <img src={p.logoUrl} alt="" /> : null}
                  <span className="pp-platform-tip">{lang !== "en" ? tr(p.nameZh || p.name, lang) : p.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* BRANDS */}
      <section className="pp-sec pp-brand-section">
        <div className="pp-brand-strip" aria-label={tr(T.brandsK, lang)}>
          <div className="pp-brands-track">
            <div className="pp-brands">
              {PARTNER_BRANDS.map((b) => (
                <a
                  key={b.name}
                  href={`/partner/${b.slug}`}
                  className={`pp-brand ${b.className}`}
                  onClick={(event) => { event.preventDefault(); onNavigate(`/partner/${b.slug}`); }}
                >{b.name}</a>
              ))}
            </div>
            <div className="pp-brands" aria-hidden="true">
              {PARTNER_BRANDS.map((b) => <span key={`repeat-${b.name}`} className={`pp-brand ${b.className}`}>{b.name}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="pp-sec" id="partner-cases">
        <div className="pp-sec-k">{tr(T.workK, lang)}</div>
        <p className="pp-sec-intro pp-work-intro">{tr(T.workIntro, lang)}</p>
        <div className="pp-works">
          {works.map((item) => {
            const brand = getBrand(item.brand);
            return <CaseCard key={item.id} item={item} lang={lang} brandName={item.brandName || brand?.name || item.brand} />;
          })}
        </div>
      </section>

      {/* WHY */}
      <section className="pp-sec">
        <div className="pp-sec-k">{tr(T.whyK, lang)}</div>
        <p className="pp-sec-intro pp-why-intro">{tr(T.whyIntro, lang)}</p>
        <div className="pp-why">
          {T.why.map((w, i) => (
            <div className="pp-why-card" key={i}>
              <span className={`pp-mini-art pp-partner-art-${i}`} aria-hidden="true" />
              <span className="pp-why-ic">{w.n}</span>
              <div className="pp-why-t">{tr(w.t, lang)}</div>
              <div className="pp-why-d">{tr(w.d, lang)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pp-final">
        <div className="pp-portrait-wrap" aria-hidden="true">
          <img src="/avatar.jpg" alt="" />
        </div>
        <div className="pp-final-copy">
          <h2 className="pp-final-t">{tr(T.ctaK, lang)}</h2>
          <p className="pp-final-s">{tr(T.ctaSub, lang)}</p>
          <a className="pp-cta big" href={MAILTO}>
            <span>{tr(T.ctaBtn, lang)}</span>
            <span className="arr">→</span>
          </a>
          <a className="pp-email" href={MAILTO}>{EMAIL}</a>
        </div>
      </section>

      {/* FORMATS */}
      <section className="pp-sec">
        <div className="pp-sec-k">{tr(T.formatsK, lang)}</div>
        <div className="pp-formats">
          {T.formats.map((f, i) => (
            <div className="pp-format" key={i}>
              <span className={`pp-mini-art pp-partner-art-${i + 3}`} aria-hidden="true" />
              <span className="pp-format-n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="pp-format-t">{tr(f.t, lang)}</div>
                <div className="pp-format-d">{tr(f.d, lang)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

// ── styles (design-system tokens) ────────────────────
const CSS = `
.pp { max-width: 1080px; margin: 0 auto; padding: 0 32px 90px; background: var(--paper); }
.pp-nav { display: flex; align-items: center; justify-content: space-between; padding: 26px 0; }

.pp-hero { padding: 40px 0 4px; }
.pp-kicker { font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--honey); margin-bottom: 20px; }
.pp-h1 { font-family: var(--font-serif); font-weight: 600; font-size: clamp(34px, 5vw, 54px); line-height: 1.1; letter-spacing: -1.4px; max-width: 24ch; }
.pp-h1-line { display: block; text-wrap: balance; }
.pp-h1-line-2 { margin-top: 7px; }
.pp-h1-num { color: var(--honey); white-space: nowrap; }
.pp-sub { font-family: var(--font-hand); font-size: clamp(15px, 2vw, 18px); line-height: 1.75; color: var(--ink-2); margin-top: 20px; max-width: 52ch; letter-spacing: 0.2px; }
.pp-hero-actions { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; margin-top: 28px; }
.pp-cta {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 28px; border-radius: var(--r-sm); background: var(--ink); color: #fff;
  font-size: 14px; font-weight: 600; transition: background var(--ease), transform var(--ease);
}
.pp-cta .arr { color: var(--honey); transition: transform var(--ease); }
.pp-cta:hover { background: #000; }
.pp-cta:hover .arr { transform: translateX(4px); }
.pp-cta.big { padding: 16px 34px; font-size: 15px; margin-top: 28px; }
.pp-text-link { color: var(--ink-2); font-size: 13.5px; font-weight: 650; padding: 8px 0; border-bottom: 1px solid var(--line); }
.pp-text-link span { color: var(--honey-600); margin-left: 4px; transition: margin-left var(--ease); }
.pp-text-link:hover { color: var(--ink); border-color: var(--ink-3); }
.pp-text-link:hover span { margin-left: 8px; }

.pp-proof {
  display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(250px, .75fr); gap: 22px;
  margin-top: 44px; padding: 18px; border: 1px solid var(--line-2); border-radius: 22px;
  background: rgba(255,255,255,.55); box-shadow: 0 18px 50px -40px rgba(53,40,19,.55);
}
.pp-stats { display: grid; grid-template-columns: 1.35fr repeat(3, 1fr); gap: 8px; }
.pp-stat {
  display: flex; flex-direction: column; gap: 5px; padding: 15px 13px; border-radius: 15px;
  background: var(--surface); border: 1px solid rgba(223,217,205,.7);
  transition: transform var(--ease), box-shadow var(--ease), background var(--ease), border-color var(--ease);
}
.pp-stat-primary { border-color: #e3d4b5; }
.pp-stat:nth-child(1) { --stat-wash: #fff1cf; --stat-line: #e6bd65; }
.pp-stat:nth-child(2) { --stat-wash: #ffe7df; --stat-line: #e9a18a; }
.pp-stat:nth-child(3) { --stat-wash: #e4f2ef; --stat-line: #85bdb2; }
.pp-stat:nth-child(4) { --stat-wash: #e8edf8; --stat-line: #93a8d0; }
.pp-stat:hover {
  z-index: 2; transform: translateY(-6px) rotate(-.35deg); background: var(--stat-wash);
  border-color: var(--stat-line); box-shadow: 0 18px 28px -22px rgba(28,25,21,.72);
}
.pp-stat b { font-family: var(--font-serif); font-size: clamp(21px, 2.5vw, 29px); font-weight: 600; letter-spacing: -0.6px; font-variant-numeric: tabular-nums; }
.pp-stat span { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); }
.pp-platform-cluster { display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 0; padding: 10px 6px; }
.pp-proof-label { margin-bottom: 16px; font-size: 10px; font-weight: 700; letter-spacing: .14em; color: var(--ink-3); text-transform: uppercase; }
.pp-platform-bubbles { display: flex; align-items: center; justify-content: center; min-height: 64px; padding: 0 16px; }
.pp-platform-bubble {
  position: relative; display: grid; place-items: center; width: 48px; height: 48px;
  margin-left: -14px; border-radius: 50%; background: var(--surface); border: 1px solid var(--line);
  box-shadow: 0 7px 18px -12px rgba(28,25,21,.65);
  transition: margin var(--ease), transform var(--ease), box-shadow var(--ease), border-color var(--ease);
}
.pp-platform-bubble:first-child { margin-left: 0; }
.pp-platform-bubble img { width: 21px; height: 21px; object-fit: contain; filter: grayscale(1); opacity: .66; transition: filter var(--ease), opacity var(--ease), transform var(--ease); }
.pp-platform-bubbles:hover .pp-platform-bubble,
.pp-platform-bubbles:focus-within .pp-platform-bubble { margin-left: 5px; transform: translateY(var(--bubble-y, 0px)) rotate(var(--bubble-r, 0deg)); }
.pp-platform-bubble:nth-child(2n) { --bubble-y: -6px; --bubble-r: 3deg; }
.pp-platform-bubble:nth-child(3n) { --bubble-y: 5px; --bubble-r: -3deg; }
.pp-platform-bubble:hover,
.pp-platform-bubble:focus-visible { z-index: 4; border-color: #dfb866; box-shadow: 0 12px 24px -16px rgba(28,25,21,.72); transform: translateY(-8px) rotate(0deg) scale(1.08) !important; }
.pp-platform-bubble:hover img,
.pp-platform-bubble:focus-visible img { filter: none; opacity: 1; transform: scale(1.05); }
.pp-platform-tip {
  position: absolute; left: 50%; bottom: -28px; transform: translate(-50%, 5px); opacity: 0; pointer-events: none;
  padding: 4px 7px; border-radius: 6px; background: var(--ink); color: #fff; font-size: 9px; font-weight: 650; white-space: nowrap;
  transition: opacity var(--ease), transform var(--ease);
}
.pp-platform-bubble:hover .pp-platform-tip,
.pp-platform-bubble:focus-visible .pp-platform-tip { opacity: 1; transform: translate(-50%, 0); }

.pp-sec { margin-top: 56px; }
.pp-sec-k { font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 20px; }
.pp-sec-intro { max-width: 64ch; margin: -6px 0 20px; color: var(--ink-2); font-size: 13.5px; line-height: 1.65; }

.pp-brand-section { margin-top: 38px; }
.pp-brand-strip { overflow: hidden; padding: 14px 2px 16px; margin: 0 -2px; mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent); }
.pp-brand-strip::-webkit-scrollbar { display: none; }
.pp-brands-track { display: flex; width: max-content; animation: ppBrandDrift 30s linear infinite; }
.pp-brand-strip:hover .pp-brands-track { animation-play-state: paused; }
.pp-brands { display: flex; width: max-content; gap: clamp(28px, 4.5vw, 48px); align-items: center; padding-right: clamp(28px, 4.5vw, 48px); }
.pp-brand {
  position: relative; display: inline-flex; align-items: center; justify-content: center; min-height: 38px;
  font-family: var(--font-serif); font-size: clamp(18px, 2vw, 23px); font-weight: 650;
  color: var(--ink-2); letter-spacing: -0.35px; white-space: nowrap;
  filter: grayscale(1); opacity: 0.72; transition: color var(--ease), opacity var(--ease), transform var(--ease), filter var(--ease);
}
a.pp-brand::after { content: ""; position: absolute; left: 50%; right: 50%; bottom: 1px; height: 1px; background: var(--honey-600); transition: left var(--ease), right var(--ease); }
.pp-brand:hover { color: var(--ink); opacity: 1; filter: none; transform: translateY(-3px); animation: ppSpectrumInk .72s ease-out both; }
a.pp-brand:hover::after { left: 0; right: 0; }
.pp-brand.dji, .pp-brand.moft { font-family: var(--font-sans); font-weight: 800; letter-spacing: 0.06em; }
.pp-brand.insta, .pp-brand.bellroy, .pp-brand.italki { font-family: var(--font-sans); font-weight: 700; letter-spacing: -0.04em; }
.pp-brand.steelcase, .pp-brand.boox { font-family: var(--font-sans); font-weight: 750; letter-spacing: -0.02em; }
@keyframes ppBrandDrift { to { transform: translateX(-50%); } }
@keyframes ppSpectrumInk {
  0% { color: #df684f; }
  18% { color: #dd9b24; }
  38% { color: #6eaa71; }
  58% { color: #4c9ba7; }
  78% { color: #677fc3; }
  92% { color: #9971b7; }
  100% { color: var(--ink); }
}
.pp-stat:hover b, .pp-stat:hover span { animation: ppSpectrumInk .72s ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .pp-brands-track { animation: none; }
  .pp-brand-strip { overflow-x: auto; mask-image: none; }
  .pp-brand:hover, .pp-stat:hover b, .pp-stat:hover span { animation: none; }
}

.pp-why { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.pp-why-intro { max-width: 62ch; margin-bottom: 22px; color: var(--ink-2); font-size: 15px; line-height: 1.7; }
.pp-why-card { position: relative; min-height: 250px; overflow: hidden; background: var(--surface); border: 1px solid var(--line-2); border-radius: var(--r); padding: 22px 20px 112px; transition: transform var(--ease), border-color var(--ease), box-shadow var(--ease); }
.pp-why-card:hover { transform: translateY(-3px); border-color: var(--line); box-shadow: 0 16px 30px -28px rgba(28,25,21,0.5); }
.pp-why-ic { font-family: var(--font-serif); font-size: 13px; color: var(--honey-600); font-weight: 650; letter-spacing: 0.08em; }
.pp-why-t { font-size: 15px; font-weight: 700; margin: 12px 0 7px; }
.pp-why-d { font-size: 13.5px; color: var(--ink-2); line-height: 1.6; }

.pp-work-intro { max-width: 68ch; }
.pp-works { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px 14px; }
.pp-work { display: block; scroll-margin-top: 24px; }
.pp-work-thumb {
  position: relative; border-radius: 14px; overflow: hidden; aspect-ratio: 16/9;
  background: var(--surface-2); border: 1px solid var(--line-2);
}
.pp-work-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--ease); }
.pp-work:hover .pp-work-thumb img { transform: scale(1.04); }
.pp-work-placeholder {
  width: 100%; height: 100%; display: grid; place-items: center;
  background: linear-gradient(145deg, #f3efe5, #e6dfd1); color: var(--ink-3);
  font-family: var(--font-serif); font-size: clamp(22px, 4vw, 38px); font-weight: 650;
}
.pp-work-brand {
  position: absolute; top: 9px; left: 9px; padding: 3px 9px; border-radius: 999px;
  background: rgba(28,25,21,0.82); color: #fff; font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em;
}
.pp-work-play {
  position: absolute; right: 10px; bottom: 8px; width: 26px; height: 26px; border-radius: 50%;
  background: rgba(252,251,248,0.92); color: var(--ink); font-size: 10px;
  display: flex; align-items: center; justify-content: center;
}
.pp-work-type { margin-top: 12px; color: var(--honey-600); font-size: 10.5px; font-weight: 750; letter-spacing: 0.12em; text-transform: uppercase; }
.pp-work-t { font-size: 13px; font-weight: 650; line-height: 1.45; margin-top: 5px; color: var(--ink); }
.pp-work-links { display: flex; gap: 18px; margin-top: 10px; }
.pp-work-links a { color: var(--ink-2); font-size: 12px; font-weight: 650; border-bottom: 1px solid var(--line); padding-bottom: 2px; transition: color var(--ease), border-color var(--ease); }
.pp-work-links a:hover { color: var(--ink); border-color: var(--honey-600); }
.pp-work-links span { color: var(--honey-600); }

.pp-case-hero { padding: 54px 0 4px; max-width: 720px; }
.pp-case-brand.pp-brand {
  display: block; width: max-content; max-width: 100%; min-height: 0;
  color: var(--ink); opacity: 1; filter: none; transform: none;
  font-family: var(--font-serif); font-size: clamp(48px, 9vw, 84px); line-height: 0.95;
  letter-spacing: -0.055em; margin: 0;
}
.pp-case-brand.pp-brand.dji, .pp-case-brand.pp-brand.moft { font-family: var(--font-sans); letter-spacing: 0.02em; }
.pp-case-brand.pp-brand.insta, .pp-case-brand.pp-brand.bellroy, .pp-case-brand.pp-brand.italki { font-family: var(--font-sans); letter-spacing: -0.055em; }
.pp-case-count { margin-top: 24px; color: var(--ink-3); font-size: 13px; letter-spacing: 0.06em; }
.pp-case-count b { color: var(--honey-600); font-family: var(--font-serif); font-size: 20px; margin-right: 4px; }
.pp-case-list { margin-top: 44px; }
.pp-works-archive { grid-template-columns: repeat(3, 1fr); gap: 34px 16px; }
.pp-work-compact .pp-work-t { font-size: 13.5px; }
.pp-work-compact .pp-work-links { gap: 14px; }
.pp-brand-final { margin-top: 82px; }
.pp-empty { margin: 44px 0 80px; color: var(--ink-3); }

.pp-formats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.pp-format { position: relative; min-height: 178px; overflow: hidden; display: flex; gap: 16px; padding: 22px 145px 22px 20px; border: 1px solid var(--line-2); border-radius: var(--r); background: var(--surface); }
.pp-format-n { font-family: var(--font-serif); font-size: 14px; color: var(--honey-600); font-weight: 600; margin-top: 2px; }
.pp-format-t { font-size: 15px; font-weight: 700; }
.pp-format-d { font-size: 13.5px; color: var(--ink-2); line-height: 1.6; margin-top: 4px; }

.pp-mini-art {
  position: absolute; right: 5px; bottom: -18px; width: 126px; height: 150px;
  background-image: url('/visuals/partner-sprites.png'); background-size: 400% 200%; background-repeat: no-repeat;
  pointer-events: none; opacity: .9; transform: rotate(-2deg) scale(.88); transform-origin: bottom right;
  transition: transform var(--ease), opacity var(--ease);
}
.pp-why-card:hover .pp-mini-art,
.pp-format:hover .pp-mini-art { transform: rotate(0deg) scale(.94) translate(-3px,-3px); opacity: 1; }
.pp-partner-art-0 { background-position: 0% 0%; }
.pp-partner-art-1 { background-position: 33.333% 0%; }
.pp-partner-art-2 { background-position: 66.666% 0%; }
.pp-partner-art-3 { background-position: 100% 0%; }
.pp-partner-art-4 { background-position: 0% 100%; }
.pp-partner-art-5 { background-position: 33.333% 100%; }
.pp-partner-art-6 { background-position: 66.666% 100%; }
.pp-partner-art-7 { background-position: 100% 100%; }

.pp-final { display: grid; grid-template-columns: minmax(170px, .65fr) minmax(0, 1.5fr); align-items: center; gap: 34px; margin-top: 76px; text-align: left; background: var(--surface); border: 1px solid var(--line-2); border-radius: 24px; padding: clamp(32px, 5vw, 52px); box-shadow: 0 14px 34px -22px rgba(70,55,25,0.3); overflow: hidden; }
.pp-portrait-wrap { position: relative; width: min(210px, 100%); aspect-ratio: 1; margin: 0 auto; }
.pp-portrait-wrap::before { content: ""; position: absolute; inset: 7% 0 0 7%; border-radius: 47% 53% 46% 54%; background: #f4c963; transform: rotate(-7deg); }
.pp-portrait-wrap::after { content: ""; position: absolute; width: 52%; height: 52%; right: -6%; top: -2%; border-top: 3px solid #8071a8; border-right: 3px solid #8071a8; border-radius: 50%; transform: rotate(15deg); opacity: .65; }
.pp-portrait-wrap img { position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
.pp-final-t { font-family: var(--font-serif); font-weight: 600; font-size: clamp(22px, 3.4vw, 30px); letter-spacing: -0.5px; }
.pp-final-s { font-size: 14px; color: var(--ink-2); margin-top: 10px; }
.pp-email { display: block; margin-top: 14px; font-size: 13px; color: var(--ink-3); letter-spacing: 0.02em; }
.pp-email:hover { color: var(--ink); }
.pp-final.pp-brand-final { display: block; text-align: center; }

@media (max-width: 760px) {
  .pp { padding: 0 22px 70px; }
  .pp-proof { grid-template-columns: 1fr; }
  .pp-stats { grid-template-columns: repeat(2, 1fr); }
  .pp-why { grid-template-columns: 1fr; }
  .pp-works { grid-template-columns: 1fr 1fr; }
  .pp-works-archive { grid-template-columns: 1fr 1fr; }
  .pp-formats { grid-template-columns: 1fr; }
  .pp-final { grid-template-columns: 130px minmax(0, 1fr); gap: 24px; }
}
@media (max-width: 480px) {
  .pp-hero-actions { align-items: flex-start; flex-direction: column; gap: 10px; }
  .pp-works { grid-template-columns: 1fr; }
  .pp-works-archive { grid-template-columns: 1fr; }
  .pp-platform-bubble { width: 43px; height: 43px; }
  .pp-brand-strip { overflow-x: auto; mask-image: none; }
  .pp-format { padding-right: 112px; }
  .pp-mini-art { width: 108px; height: 129px; }
  .pp-final { grid-template-columns: 1fr; text-align: center; }
  .pp-portrait-wrap { width: 150px; }
}
`;
