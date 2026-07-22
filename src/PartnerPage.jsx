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
  h1b: {
    en: "people understand why your product belongs in their lives.",
    zh: "关注钱、效率与生活品质的人，真正看懂你的产品。",
  },
  sub: {
    en: "I'm Chao, a creator with five years of publishing experience and more than a decade in Big 4 tax consulting. I put products inside real questions and real use, then explain what they solve, who they suit, and where the trade-offs are.",
    zh: "我是 Chao，做了 5 年内容，也有十多年四大会计师事务所财税咨询经验。我会把产品放进真实问题和使用场景里，讲清楚它解决了什么、适合谁，也诚实交代取舍。",
  },
  ctaTop: { en: "See the work", zh: "先看合作案例" },
  ctaMail: { en: "Start a conversation", zh: "发来合作资料" },
  statFollowers: { en: "followers across platforms", zh: "全网关注" },
  statLikes: { en: "likes & saves", zh: "累计点赞与收藏" },
  statYears: { en: "creating consistently", zh: "持续内容创作" },
  statBrands: { en: "brand partners", zh: "合作品牌" },
  brandsK: { en: "Selected brand partners", zh: "曾合作品牌" },
  brandsHint: { en: "Hover to pause. Select a brand to see its complete case library.", zh: "鼠标移入可暂停；点击品牌，可查看该品牌的完整合作案例。" },
  whyK: { en: "How I make product stories", zh: "我怎么把产品讲进内容里" },
  why: [
    {
      n: "01",
      t: { en: "Start with a real problem", zh: "先有真实问题，再讲产品" },
      d: {
        en: "I don't read out a feature list. I begin with a frustration the audience already knows, then let testing, comparison, and daily use bring the product into the story.",
        zh: "不是把卖点逐条念完。我先找到观众真的会遇到的麻烦，再用实测、比较和生活场景，让产品自然出现。",
      },
    },
    {
      n: "02",
      t: { en: "Use depth to earn trust", zh: "长内容负责说服" },
      d: {
        en: "The use process, strengths, and trade-offs all stay in the story. Viewers leave knowing why the product matters and whether it fits them.",
        zh: "使用过程、优点和取舍都会讲清楚。观众看完不只记住产品，也知道它到底适不适合自己。",
      },
    },
    {
      n: "03",
      t: { en: "Rebuild for each platform", zh: "同一个创意，按平台重做" },
      d: {
        en: "YouTube, Bilibili, RedNote, and Douyin need different openings, pacing, and language. I adapt the idea rather than reposting the same cut everywhere.",
        zh: "YouTube、B站、小红书和抖音需要不同的开场、节奏和表达。我会重做版本，不把同一条片简单搬运。",
      },
    },
  ],
  reachK: { en: "Audience channels", zh: "可触达的平台" },
  reachNote: {
    en: "Featured cases include YouTube and Bilibili links whenever both versions are available.",
    zh: "合作案例会尽量同时提供 YouTube 和 B站链接，国内外团队都能直接查看。",
  },
  workK: { en: "Selected brand work", zh: "品牌合作案例" },
  workIntro: {
    en: "A small selection across cinematic narrative, real-life use, long-term testing, and in-depth review. Select any brand above for the complete library.",
    zh: "这里先选几条代表作：从剧情叙事、真实场景到长期使用和深度评测。点击上方品牌，可查看完整案例库。",
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
      t: { en: "Native integration", zh: "原生视频植入" },
      d: { en: "A product appears inside a scheduled topic where the use case already makes sense.", zh: "在已经成立的选题里，让产品作为解决方案自然出现。" },
    },
    {
      t: { en: "Platform-native package", zh: "多平台内容组合" },
      d: { en: "Long-form, short-form, and posts rebuilt around the same core idea.", zh: "围绕同一个核心创意，分别制作长视频、短视频或图文版本。" },
    },
    {
      t: { en: "Series or long-term use", zh: "系列或长期合作" },
      d: { en: "Use the product over time, then return with follow-ups and new real-life contexts.", zh: "先真实使用一段时间，再用复访、长期体验或新场景继续讲。" },
    },
  ],
  ctaK: { en: "Does your product deserve a closer look?", zh: "如果你的产品，也需要被认真讲清楚" },
  ctaSub: {
    en: "Send the product, target platforms, and preferred launch window. I'll reply with fit and the next information I need.",
    zh: "邮件里写清产品、目标平台和预计上线时间。我会回复是否适合，以及下一步需要哪些资料。",
  },
  ctaBtn: { en: "Send the brief", zh: "发来合作资料" },
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
          {tr(T.h1a, lang)} <span className="pp-h1-num">{tr(T.h1num, lang)}</span> {tr(T.h1b, lang)}
        </h1>
        <p className="pp-sub">{tr(T.sub, lang)}</p>
        <div className="pp-hero-actions">
          <a className="pp-cta" href="#partner-cases">
            <span>{tr(T.ctaTop, lang)}</span>
            <span className="arr">↓</span>
          </a>
          <a className="pp-text-link" href={MAILTO}>{tr(T.ctaMail, lang)} <span>→</span></a>
        </div>

        {/* stat band */}
        <div className="pp-stats">
          <div className="pp-stat"><b>{total}</b><span>{tr(T.statFollowers, lang)}</span></div>
          <div className="pp-stat"><b>{TOTAL_ENGAGEMENTS}</b><span>{tr(T.statLikes, lang)}</span></div>
          <div className="pp-stat"><b>{lang === "en" ? "5 years" : "5 年"}</b><span>{tr(T.statYears, lang)}</span></div>
          <div className="pp-stat"><b>10+</b><span>{tr(T.statBrands, lang)}</span></div>
        </div>
      </header>

      {/* BRANDS */}
      <section className="pp-sec">
        <div className="pp-sec-k">{tr(T.brandsK, lang)}</div>
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
        <p className="pp-brand-hint">{tr(T.brandsHint, lang)}</p>
      </section>

      {/* WHY */}
      <section className="pp-sec">
        <div className="pp-sec-k">{tr(T.whyK, lang)}</div>
        <div className="pp-why">
          {T.why.map((w, i) => (
            <div className="pp-why-card" key={i}>
              <span className="pp-why-ic">{w.n}</span>
              <div className="pp-why-t">{tr(w.t, lang)}</div>
              <div className="pp-why-d">{tr(w.d, lang)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REACH */}
      <section className="pp-sec">
        <div className="pp-sec-k">{tr(T.reachK, lang)}</div>
        <p className="pp-sec-intro">{tr(T.reachNote, lang)}</p>
        <div className="pp-reach">
          {platforms.map((p, i) => (
            <a className="pp-reach-item" key={i} href={p.url} target="_blank" rel="noopener noreferrer">
              {p.logoUrl && p.logoUrl.length > 2 ? (
                <img src={p.logoUrl} alt="" className="pp-reach-ic" />
              ) : (
                <span className="pp-reach-emoji">{p.logoUrl}</span>
              )}
              <span className="pp-reach-name">{lang !== "en" ? tr(p.nameZh || p.name, lang) : p.name}</span>
              {p.followers && <b className="pp-reach-n">{p.followers}</b>}
            </a>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section className="pp-sec" id="partner-cases">
        <div className="pp-sec-k">{tr(T.workK, lang)}</div>
        <p className="pp-sec-intro pp-work-intro">{tr(T.workIntro, lang)}</p>
        <div className="pp-works">
          {works.map((item) => {
            const brand = getBrand(item.brand);
            return <CaseCard key={item.id} item={item} lang={lang} brandName={brand?.name || item.brand} />;
          })}
        </div>
      </section>

      {/* FORMATS */}
      <section className="pp-sec">
        <div className="pp-sec-k">{tr(T.formatsK, lang)}</div>
        <div className="pp-formats">
          {T.formats.map((f, i) => (
            <div className="pp-format" key={i}>
              <span className="pp-format-n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="pp-format-t">{tr(f.t, lang)}</div>
                <div className="pp-format-d">{tr(f.d, lang)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pp-final">
        <h2 className="pp-final-t">{tr(T.ctaK, lang)}</h2>
        <p className="pp-final-s">{tr(T.ctaSub, lang)}</p>
        <a className="pp-cta big" href={MAILTO}>
          <span>{tr(T.ctaBtn, lang)}</span>
          <span className="arr">→</span>
        </a>
        <a className="pp-email" href={MAILTO}>{EMAIL}</a>
      </section>
    </div>
  );
}

// ── styles (design-system tokens) ────────────────────
const CSS = `
.pp { max-width: 880px; margin: 0 auto; padding: 0 32px 90px; background: var(--paper); }
.pp-nav { display: flex; align-items: center; justify-content: space-between; padding: 26px 0; }

.pp-hero { padding: 40px 0 14px; }
.pp-kicker { font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--honey); margin-bottom: 20px; }
.pp-h1 { font-family: var(--font-serif); font-weight: 600; font-size: clamp(32px, 5.4vw, 50px); line-height: 1.12; letter-spacing: -1.2px; max-width: 22ch; }
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

.pp-stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
  margin-top: 44px; padding: 26px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
}
.pp-stat { display: flex; flex-direction: column; gap: 5px; }
.pp-stat b { font-family: var(--font-serif); font-size: clamp(22px, 3vw, 30px); font-weight: 600; letter-spacing: -0.6px; font-variant-numeric: tabular-nums; }
.pp-stat span { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); }

.pp-sec { margin-top: 56px; }
.pp-sec-k { font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 20px; }
.pp-sec-intro { max-width: 64ch; margin: -6px 0 20px; color: var(--ink-2); font-size: 13.5px; line-height: 1.65; }

.pp-brand-strip { overflow: hidden; padding: 8px 2px 12px; margin: 0 -2px; mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent); }
.pp-brand-strip::-webkit-scrollbar { display: none; }
.pp-brands-track { display: flex; width: max-content; animation: ppBrandDrift 30s linear infinite; }
.pp-brand-strip:hover .pp-brands-track { animation-play-state: paused; }
.pp-brands { display: flex; width: max-content; gap: clamp(28px, 4.5vw, 48px); align-items: center; padding-right: clamp(28px, 4.5vw, 48px); }
.pp-brand {
  position: relative; display: inline-flex; align-items: center; min-height: 34px;
  font-family: var(--font-serif); font-size: clamp(18px, 2.4vw, 23px); font-weight: 650;
  color: var(--ink-3); letter-spacing: -0.35px; white-space: nowrap;
  filter: grayscale(1); opacity: 0.72; transition: color var(--ease), opacity var(--ease), transform var(--ease);
}
a.pp-brand::after { content: ""; position: absolute; left: 50%; right: 50%; bottom: -6px; height: 1px; background: var(--honey-600); transition: left var(--ease), right var(--ease); }
.pp-brand:hover { color: var(--ink); opacity: 1; transform: translateY(-3px); }
a.pp-brand:hover::after { left: 0; right: 0; }
.pp-brand.dji, .pp-brand.moft { font-family: var(--font-sans); font-weight: 800; letter-spacing: 0.06em; }
.pp-brand.insta, .pp-brand.bellroy, .pp-brand.italki { font-family: var(--font-sans); font-weight: 700; letter-spacing: -0.04em; }
.pp-brand.steelcase, .pp-brand.boox { font-family: var(--font-sans); font-weight: 750; letter-spacing: -0.02em; }
.pp-brand-hint { margin-top: 8px; color: var(--ink-3); font-size: 11.5px; line-height: 1.5; }
@keyframes ppBrandDrift { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) {
  .pp-brands-track { animation: none; }
  .pp-brand-strip { overflow-x: auto; mask-image: none; }
}

.pp-why { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.pp-why-card { background: var(--surface); border: 1px solid var(--line-2); border-radius: var(--r); padding: 22px 20px; transition: transform var(--ease), border-color var(--ease), box-shadow var(--ease); }
.pp-why-card:hover { transform: translateY(-3px); border-color: var(--line); box-shadow: 0 16px 30px -28px rgba(28,25,21,0.5); }
.pp-why-ic { font-family: var(--font-serif); font-size: 13px; color: var(--honey-600); font-weight: 650; letter-spacing: 0.08em; }
.pp-why-t { font-size: 15px; font-weight: 700; margin: 12px 0 7px; }
.pp-why-d { font-size: 13.5px; color: var(--ink-2); line-height: 1.6; }

.pp-reach { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.pp-reach-item {
  display: flex; align-items: center; gap: 9px; padding: 12px 14px;
  background: var(--surface); border: 1px solid var(--line-2); border-radius: 12px;
  transition: border-color var(--ease), transform var(--ease);
}
.pp-reach-item:hover { border-color: var(--line); transform: translateY(-2px); }
.pp-reach-ic { width: 17px; height: 17px; object-fit: contain; }
.pp-reach-emoji { font-size: 15px; }
.pp-reach-name { font-size: 12.5px; font-weight: 600; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pp-reach-n { font-family: var(--font-serif); font-size: 13.5px; font-variant-numeric: tabular-nums; }

.pp-work-intro { max-width: 68ch; }
.pp-works { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px 18px; }
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
.pp-work-t { font-size: 14px; font-weight: 650; line-height: 1.5; margin-top: 5px; color: var(--ink); }
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

.pp-formats { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 40px; }
.pp-format { display: flex; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--line); }
.pp-format-n { font-family: var(--font-serif); font-size: 14px; color: var(--honey-600); font-weight: 600; margin-top: 2px; }
.pp-format-t { font-size: 15px; font-weight: 700; }
.pp-format-d { font-size: 13.5px; color: var(--ink-2); line-height: 1.6; margin-top: 4px; }

.pp-final { margin-top: 76px; text-align: center; background: var(--surface); border: 1px solid var(--line-2); border-radius: 22px; padding: clamp(36px, 6vw, 56px) 28px; box-shadow: 0 14px 34px -22px rgba(70,55,25,0.3); }
.pp-final-t { font-family: var(--font-serif); font-weight: 600; font-size: clamp(22px, 3.4vw, 30px); letter-spacing: -0.5px; }
.pp-final-s { font-size: 14px; color: var(--ink-2); margin-top: 10px; }
.pp-email { display: block; margin-top: 14px; font-size: 13px; color: var(--ink-3); letter-spacing: 0.02em; }
.pp-email:hover { color: var(--ink); }

@media (max-width: 760px) {
  .pp { padding: 0 22px 70px; }
  .pp-stats { grid-template-columns: repeat(2, 1fr); gap: 20px 14px; }
  .pp-why { grid-template-columns: 1fr; }
  .pp-reach { grid-template-columns: repeat(2, 1fr); }
  .pp-brands { gap: 30px; }
  .pp-works { grid-template-columns: 1fr 1fr; }
  .pp-works-archive { grid-template-columns: 1fr 1fr; }
  .pp-formats { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .pp-hero-actions { align-items: flex-start; flex-direction: column; gap: 10px; }
  .pp-works { grid-template-columns: 1fr; }
  .pp-works-archive { grid-template-columns: 1fr; }
}
`;
