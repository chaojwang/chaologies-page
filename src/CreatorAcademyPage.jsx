import { useEffect, useState } from "react";
import { LangToggle, tr } from "./i18n.jsx";
import SubscribeModal from "./SubscribeModal.jsx";

const C = {
  back: { zh: "Chaologies", en: "Chaologies" },
  navOutcome: { zh: "你会完成什么", en: "What you'll make" },
  navStory: { zh: "我的经历", en: "My story" },
  navFit: { zh: "适合谁", en: "Who it's for" },
  join: { zh: "加入等待名单", tw: "加入等待名單", en: "Join the waitlist" },
  eyebrow: {
    zh: "给想认真开始做内容的职场人",
    tw: "給想認真開始做內容的職場人",
    en: "For professionals ready to start creating",
  },
  heroLead: {
    zh: "完成并发布属于你自己的 3 个作品，\n建立一套下班后也能持续创作的系统。",
    tw: "完成並發布屬於你自己的 3 個作品，\n建立一套下班後也能持續創作的系統。",
    en: "Complete and publish three pieces of your own,\nthen build a creative system you can sustain after work.",
  },
  heroNote: {
    zh: "第一期会小范围开放。加入名单后，我会先把具体安排发给你。",
    tw: "第一期會小範圍開放。加入名單後，我會先把具體安排發給你。",
    en: "The first cohort will be deliberately small. Join the list and I'll send you the details first.",
  },
  badge: {
    zh: "Big 4 财税顾问 → 全职创作者",
    tw: "Big 4 財稅顧問 → 全職創作者",
    en: "Big 4 tax consultant → full-time creator",
  },
  stats: [
    { value: "5", zh: "年持续创作", tw: "年持續創作", en: "years creating" },
    { value: "47万+", twValue: "47萬+", enValue: "470K+", zh: "全网关注", tw: "全網關注", en: "people across platforms" },
    { value: "8", zh: "个内容平台", tw: "個內容平台", en: "content platforms" },
    { value: "10+", zh: "合作品牌", tw: "合作品牌", en: "brand partners" },
  ],
  stuckK: { zh: "真正让人停下来的地方", tw: "真正讓人停下來的地方", en: "Where most people get stuck" },
  stuckTitle: {
    zh: "你不是没想过开始，\n只是每一步都充满了阻力。",
    tw: "你不是沒想過開始，\n只是每一步都充滿了阻力。",
    en: "It is not that you have never thought about starting.\nEvery step simply comes with friction.",
  },
  stuckIntro: {
    zh: "工作已经很忙了。选题、写稿、拍摄、剪辑和发布又像五份不同的工作，很容易做到一半就停下来。",
    tw: "工作已經很忙了。選題、寫稿、拍攝、剪輯和發布又像五份不同的工作，很容易做到一半就停下來。",
    en: "Work is already busy. Ideas, writing, filming, editing and publishing can feel like five separate jobs, so it is easy to stop halfway through.",
  },
  stuck: [
    { zh: "我懂不少，但不知道哪些值得讲。", tw: "我懂不少，但不知道哪些值得講。", en: "I know a lot, but I don't know what is worth sharing." },
    { zh: "拍一条太累，发了几次就停了。", tw: "拍一條太累，發了幾次就停了。", en: "Making one piece takes so much effort that I stop after a few tries." },
    { zh: "会用 AI，可写出来越来越不像我。", tw: "會用 AI，可寫出來越來越不像我。", en: "I can use AI, but the writing sounds less and less like me." },
    { zh: "有人看了，但我不知道下一步是什么。", tw: "有人看了，但我不知道下一步是什麼。", en: "People are watching, but I don't know what the next step is." },
  ],
  programK: { zh: "第一期要完成什么", tw: "第一期要完成什麼", en: "What the first cohort is built to do" },
  programTitle: {
    zh: "目标很具体：\n把 3 个作品发出去。",
    tw: "目標很具體：\n把 3 個作品發出去。",
    en: "The goal is concrete:\npublish three pieces of work.",
  },
  programLead: {
    zh: "课程结束时，留下的不只是笔记，\n还有已经发布的作品和下一步计划。",
    tw: "課程結束時，留下的不只是筆記，\n還有已經發布的作品和下一步計劃。",
    en: "When the programme ends, you will leave with more than notes:\npublished work and a plan for what comes next.",
  },
  stages: [
    {
      n: "01",
      zh: "找到你值得长期讲的主题",
      tw: "找到你值得長期講的主題",
      en: "Find the subject you can own",
      zhD: "从你的专业、经历和兴趣里，找到别人愿意听、你也愿意一直讲的交集。",
      twD: "從你的專業、經歷和興趣裡，找到別人願意聽、你也願意一直講的交集。",
      enD: "Find the overlap between what you know, what people need and what you want to keep exploring.",
    },
    {
      n: "02",
      zh: "把经验整理成一个好选题",
      tw: "把經驗整理成一個好選題",
      en: "Turn experience into a strong idea",
      zhD: "学会从真实问题出发，写出自己的观点，不再面对空白页面发呆。",
      twD: "學會從真實問題出發，寫出自己的觀點，不再面對空白頁面發呆。",
      enD: "Start with a real question, form your point of view and stop staring at a blank page.",
    },
    {
      n: "03",
      zh: "独立完成拍摄和剪辑",
      tw: "獨立完成拍攝和剪輯",
      en: "Film and edit the work yourself",
      zhD: "用手边的设备完成拍摄、口播和剪辑，把想法做成真正能发布的内容。",
      twD: "用手邊的設備完成拍攝、口播和剪輯，把想法做成真正能發布的內容。",
      enD: "Use the gear you already have to film, speak on camera and turn the idea into something publishable.",
    },
    {
      n: "04",
      zh: "建立自己的 AI 创作流程",
      tw: "建立自己的 AI 創作流程",
      en: "Build an AI-assisted workflow",
      zhD: "让 AI 帮你整理、检查和复用，观点、判断和最后的表达仍然属于你。",
      twD: "讓 AI 幫你整理、檢查和複用，觀點、判斷和最後的表達仍然屬於你。",
      enD: "Use AI to organise, check and reuse your work while keeping the judgment and final voice yours.",
    },
  ],
  takeaways: [
    { value: "3", zh: "个已发布作品", tw: "個已發布作品", en: "published pieces" },
    { value: "1", zh: "套个人内容方向", tw: "套個人內容方向", en: "clear content direction" },
    { value: "1", zh: "套可重复的工作流", tw: "套可重複的工作流", en: "repeatable workflow" },
    { value: "30", zh: "天后续创作计划", tw: "天後續創作計劃", en: "day continuation plan" },
  ],
  storyK: { zh: "我也是从下班后开始的", tw: "我也是從下班後開始的", en: "I started after work, too" },
  storyTitle: {
    zh: "我是一名财税咨询师。\n拍视频，做自媒体是下班后学的。",
    tw: "我是一名財稅諮詢師。\n拍視頻，做自媒體是下班後學的。",
    en: "I am a tax consultant.\nI learned video and content creation after work.",
  },
  storyP1: {
    zh: "我做了十多年财税工作。五年前，我开始在下班后写东西、拍视频。最初不知道该讲什么，面对镜头不自然，剪一条视频也要很久。",
    tw: "我做了十多年財稅工作。五年前，我開始在下班後寫東西、拍視頻。最初不知道該講什麼，面對鏡頭不自然，剪一條視頻也要很久。",
    en: "I spent more than a decade working in tax and finance. Five years ago, I began writing and filming after work. At first I did not know what to say, felt stiff on camera and took far too long to edit one video.",
  },
  storyP2: {
    zh: "后来我把选题、写作、拍摄、剪辑和发布整理成一套自己的流程。它没有让我一夜爆红，但让我能持续做内容，也一步步走到了全职创作。",
    tw: "後來我把選題、寫作、拍攝、剪輯和發布整理成一套自己的流程。它沒有讓我一夜爆紅，但讓我能持續做內容，也一步步走到了全職創作。",
    en: "Over time I organised ideas, writing, filming, editing and publishing into a process of my own. It did not make me successful overnight. It helped me keep creating and eventually make the move full time.",
  },
  workK: { zh: "这套方法是我一路做出来的", tw: "這套方法是我一路做出來的", en: "The process came from doing the work" },
  workTitle: { zh: "从第一条视频，到一套能长期运行的系统。", tw: "從第一條視頻，到一套能長期運行的系統。", en: "From a first video to a system I can keep running." },
  fitK: { zh: "适合谁", tw: "適合誰", en: "Who it is for" },
  fitTitle: {
    zh: "适合想认真开始，\n也愿意真的动手行动的人。",
    tw: "適合想認真開始，\n也願意真的動手行動的人。",
    en: "For people who are ready to start,\nand willing to take real action.",
  },
  fit: [
    { zh: "你有工作经验，想把专业和经历变成内容。", tw: "你有工作經驗，想把專業和經歷變成內容。", en: "You have real work experience and want to turn it into useful content." },
    { zh: "你想建立个人品牌，但不想辞职后才开始。", tw: "你想建立個人品牌，但不想辭職後才開始。", en: "You want to build a personal brand without waiting until you can quit your job." },
    { zh: "你愿意在课程期间完成并发布作品。", tw: "你願意在課程期間完成並發布作品。", en: "You are willing to finish and publish work during the programme." },
  ],
  notFitTitle: { zh: "可能不适合你，如果", tw: "可能不適合你，如果", en: "Probably not for you if" },
  notFit: [
    { zh: "你只想找一个快速涨粉的公式。", tw: "你只想找一個快速漲粉的公式。", en: "You only want a formula for quick follower growth." },
    { zh: "你暂时没有时间完成作品。", tw: "你暫時沒有時間完成作品。", en: "You do not currently have time to finish the work." },
  ],
  finalK: { zh: "创作者学院 · 第一期", tw: "創作者學院 · 第一期", en: "Creator Academy · First cohort" },
  launchSoon: { zh: "将在近期上线！", tw: "將在近期上線！", en: "Launching soon!" },
  finalLead: {
    zh: "加入邮件名单。开放报名、课程安排和首期价格确定后，我会先发给等待名单。",
    tw: "加入郵件名單。開放報名、課程安排和首期價格確定後，我會先發給等待名單。",
    en: "Join the email list. The waitlist will hear first when enrolment, the schedule and first-cohort pricing are ready.",
  },
  wechat: { zh: "关注公众号", tw: "關注公眾號", en: "Follow on WeChat" },
};

const WORK = [
  {
    youtubeId: "JgqT3dq5PSs",
    youtube: "https://youtu.be/JgqT3dq5PSs",
    bilibili: "https://www.bilibili.com/video/BV1Gd4y1R7NP/",
    zh: "如何制作一支视频",
    tw: "如何製作一支視頻",
    en: "How I make a video",
    label: { zh: "创作流程", tw: "創作流程", en: "Creator workflow" },
  },
  {
    youtubeId: "4o2Qo8soMa0",
    youtube: "https://youtu.be/4o2Qo8soMa0",
    bilibili: "https://www.bilibili.com/video/BV1MN4y1Q78R/",
    zh: "成为博主 900 天，我对 Vlog 的看法",
    tw: "成為博主 900 天，我對 Vlog 的看法",
    en: "900 days of becoming a creator",
    label: { zh: "创作者故事", tw: "創作者故事", en: "Creator story" },
  },
  {
    youtubeId: "Vo8nWQ--qg4",
    youtube: "https://youtu.be/Vo8nWQ--qg4",
    bilibili: "https://www.bilibili.com/video/BV1o841197DB/",
    zh: "要做全职创作者，我做了哪些准备？",
    tw: "要做全職創作者，我做了哪些準備？",
    en: "How I prepared to become a full-time creator",
    label: { zh: "转型记录", tw: "轉型記錄", en: "Career transition" },
  },
];

function local(item, lang, key = "") {
  if (lang === "en") return item[`${key}en`] ?? item.en;
  if (lang === "tw") return item[`${key}tw`] ?? item.tw ?? item[`${key}zh`] ?? item.zh;
  return item[`${key}zh`] ?? item.zh;
}

function HeroTitle({ lang }) {
  if (lang === "en") {
    return (
      <h1 className="ca2-hero-title ca2-hero-title-en">
        <span>Turn what you know into content</span>
        <span className="ca2-accent">people want to follow.</span>
      </h1>
    );
  }
  const traditional = lang === "tw";
  return (
    <h1 className="ca2-hero-title ca2-hero-title-zh">
      <span>{traditional ? "把你的經驗，" : "把你的经验，"}</span>
      <span className="ca2-accent">{traditional ? "變成值得關注的內容。" : "变成值得关注的内容。"}</span>
    </h1>
  );
}

export default function CreatorAcademyPage({ lang, setLang, onBack }) {
  const [subOpen, setSubOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ca2-page">
      <style>{CSS}</style>

      <nav className="ca2-nav">
        <div className="ca2-nav-inner">
          <button className="ca2-back" onClick={onBack}><span>←</span> {tr(C.back, lang)}</button>
          <div className="ca2-nav-links">
            <a href="#outcomes">{tr(C.navOutcome, lang)}</a>
            <a href="#story">{tr(C.navStory, lang)}</a>
            <a href="#fit">{tr(C.navFit, lang)}</a>
          </div>
          <div className="ca2-nav-actions">
            <LangToggle lang={lang} setLang={setLang} />
            <a className="ca2-nav-cta" href="#waitlist">{tr(C.join, lang)}</a>
          </div>
        </div>
      </nav>

      <main>
        <section className="ca2-hero">
          <div className="ca2-hero-copy">
            <p className="ca2-kicker">{tr(C.eyebrow, lang)}</p>
            <HeroTitle lang={lang} />
            <p className="ca2-hero-lead ca2-fixed-lines">{tr(C.heroLead, lang)}</p>
            <div className="ca2-hero-actions">
              <a className="ca2-primary" href="#waitlist">{tr(C.join, lang)} <span>→</span></a>
              <a className="ca2-text-link" href="#outcomes">{tr(C.navOutcome, lang)} ↓</a>
            </div>
            <p className="ca2-hero-note">{tr(C.heroNote, lang)}</p>
          </div>

          <div className="ca2-hero-visual">
            <div className="ca2-portrait-ring">
              <img src="/avatar.jpg" alt="Chao" />
            </div>
            <div className="ca2-career-badge">{tr(C.badge, lang)}</div>
            <div className="ca2-dot ca2-dot-a" />
            <div className="ca2-dot ca2-dot-b" />
          </div>
        </section>

        <section className="ca2-proof" aria-label="Creator experience">
          {C.stats.map((item) => (
            <div className="ca2-proof-item" key={item.en}>
              <strong>{lang === "en" ? (item.enValue || item.value) : lang === "tw" ? (item.twValue || item.value) : item.value}</strong>
              <span>{local(item, lang)}</span>
            </div>
          ))}
        </section>

        <section className="ca2-stuck ca2-section">
          <div className="ca2-heading">
            <div>
              <p className="ca2-kicker">{tr(C.stuckK, lang)}</p>
              <h2 className="ca2-fixed-lines">{tr(C.stuckTitle, lang)}</h2>
            </div>
            <p>{tr(C.stuckIntro, lang)}</p>
          </div>
          <div className="ca2-quote-grid">
            {C.stuck.map((item, index) => (
              <article key={item.en}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>“{local(item, lang)}”</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ca2-program-shell" id="outcomes">
          <div className="ca2-program">
            <div className="ca2-program-head">
              <div>
                <p className="ca2-kicker">{tr(C.programK, lang)}</p>
                <h2 className="ca2-fixed-lines">{tr(C.programTitle, lang)}</h2>
                <p className="ca2-program-lead ca2-fixed-lines">{tr(C.programLead, lang)}</p>
              </div>
              <div className="ca2-big-result" aria-label={tr(C.programTitle, lang)}>
                <strong>3</strong>
                <span>{lang === "en" ? "PUBLISHED PIECES" : lang === "tw" ? "個已發布作品" : "个已发布作品"}</span>
              </div>
            </div>

            <div className="ca2-stage-grid">
              {C.stages.map((item) => (
                <article key={item.n}>
                  <span className="ca2-stage-n">{item.n}</span>
                  <h3>{local(item, lang)}</h3>
                <p>{lang === "en" ? item.enD : lang === "tw" ? item.twD : item.zhD}</p>
                </article>
              ))}
            </div>

            <div className="ca2-takeaways">
              {C.takeaways.map((item) => (
                <div key={item.en}>
                  <strong>{item.value}</strong>
                  <span>{local(item, lang)}</span>
                </div>
              ))}
            </div>

            <a className="ca2-program-cta" href="#waitlist">{tr(C.join, lang)} <span>→</span></a>
          </div>
        </section>

        <section className="ca2-story ca2-section" id="story">
          <div className="ca2-story-image">
            <img src="/avatar.jpg" alt="Chao" />
            <div className="ca2-story-tag">2021 → 2026</div>
          </div>
          <div className="ca2-story-copy">
            <p className="ca2-kicker">{tr(C.storyK, lang)}</p>
            <h2 className="ca2-fixed-lines">{tr(C.storyTitle, lang)}</h2>
            <p>{tr(C.storyP1, lang)}</p>
            <p>{tr(C.storyP2, lang)}</p>
            <div className="ca2-story-facts">
              <span>Big 4</span>
              <span>5 {lang === "en" ? "years" : lang === "tw" ? "年創作" : "年创作"}</span>
              <span>{lang === "en" ? "470K+ following" : lang === "tw" ? "47萬+ 關注" : "47万+ 关注"}</span>
            </div>
          </div>
        </section>

        <section className="ca2-work ca2-section">
          <div className="ca2-work-head">
            <p className="ca2-kicker">{tr(C.workK, lang)}</p>
            <h2>{tr(C.workTitle, lang)}</h2>
          </div>
          <div className="ca2-work-grid">
            {WORK.map((item) => (
              <a key={item.youtubeId} href={lang === "en" ? item.youtube : item.bilibili} target="_blank" rel="noopener noreferrer">
                <div className="ca2-work-thumb">
                  <img src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
                  <span>▶</span>
                </div>
                <p>{tr(item.label, lang)}</p>
                <h3>{local(item, lang)}</h3>
              </a>
            ))}
          </div>
        </section>

        <section className="ca2-fit ca2-section" id="fit">
          <div className="ca2-fit-intro">
            <p className="ca2-kicker">{tr(C.fitK, lang)}</p>
            <h2 className="ca2-fixed-lines">{tr(C.fitTitle, lang)}</h2>
          </div>
          <div className="ca2-fit-columns">
            <div className="ca2-fit-yes">
              {C.fit.map((item) => <p key={item.en}><span>→</span>{local(item, lang)}</p>)}
            </div>
            <div className="ca2-fit-no">
              <h3>{tr(C.notFitTitle, lang)}</h3>
              {C.notFit.map((item) => <p key={item.en}>{local(item, lang)}</p>)}
            </div>
          </div>
        </section>

        <section className="ca2-final" id="waitlist">
          <div className="ca2-final-title">
            <span>{tr(C.finalK, lang)}</span>
            <strong>{tr(C.launchSoon, lang)}</strong>
          </div>
          <p className="ca2-final-lead">{tr(C.finalLead, lang)}</p>
          <div className="ca2-subscribe-actions">
            <button className="ca2-subscribe-main" type="button" onClick={() => setSubOpen(true)}>
              {tr(C.join, lang)} <span>→</span>
            </button>
            <button className="ca2-subscribe-wechat" type="button" onClick={() => setSubOpen(true)}>
              <img src="/icons/wechat.png" alt="" />
              {tr(C.wechat, lang)}
            </button>
          </div>
        </section>
      </main>

      {subOpen && <SubscribeModal lang={lang} onClose={() => setSubOpen(false)} />}


      <footer className="ca2-footer">
        <span>Chaologies Creator Academy</span>
        <button onClick={onBack}>{tr(C.back, lang)} →</button>
      </footer>
    </div>
  );
}

const CSS = `
  .ca2-page{--paper:#f4f2ec;--surface:#fff;--ink:#1c1915;--muted:#6b645b;--soft:#a49c90;--line:#ddd7cc;--honey:#d99a18;min-height:100vh;background:var(--paper);color:var(--ink);font-family:var(--font-sans);overflow:hidden}
  .ca2-page *{box-sizing:border-box}.ca2-page a{text-decoration:none;color:inherit}.ca2-page button,.ca2-page input{font:inherit}
  .ca2-nav{position:sticky;top:0;z-index:30;background:rgba(244,242,236,.9);backdrop-filter:blur(16px);border-bottom:1px solid rgba(28,25,21,.08)}
  .ca2-nav-inner,.ca2-page main,.ca2-footer{width:min(1120px,calc(100% - 80px));margin-inline:auto}.ca2-nav-inner{height:78px;display:flex;align-items:center;justify-content:space-between;gap:24px}
  .ca2-back{display:inline-flex;align-items:center;gap:9px;border:0;background:none;color:var(--ink);font-family:var(--font-serif);font-size:17px;font-weight:650;cursor:pointer;white-space:nowrap}.ca2-back span{color:var(--honey)}.ca2-back:hover{gap:13px}
  .ca2-nav-links{display:flex;align-items:center;gap:26px;margin-left:auto}.ca2-nav-links a{font-size:13px;font-weight:650;color:var(--muted)}.ca2-nav-links a:hover{color:var(--ink)}
  .ca2-nav-actions{display:flex;align-items:center;gap:12px}.ca2-nav-cta{display:inline-flex;align-items:center;min-height:38px;padding:8px 14px;border-radius:999px;background:var(--ink);color:#fff!important;font-size:12.5px;font-weight:700;white-space:nowrap}
  .ca2-hero{min-height:650px;display:grid;grid-template-columns:minmax(0,1.14fr) minmax(360px,.86fr);align-items:center;gap:72px;padding:68px 0 58px}
  .ca2-kicker{display:flex;align-items:center;gap:10px;color:#b9790e;font-size:12px;font-weight:750;letter-spacing:.11em;text-transform:uppercase}.ca2-kicker:before{content:"";width:27px;height:1px;background:currentColor;flex:none}
  .ca2-hero-title{margin:22px 0 26px;font-family:var(--font-serif);font-weight:600;line-height:1.06;letter-spacing:-2.4px}.ca2-hero-title span{display:block}.ca2-hero-title-zh{font-size:clamp(50px,5vw,62px)}.ca2-hero-title-zh span{white-space:nowrap}.ca2-hero-title-en{font-size:clamp(50px,5.3vw,68px);max-width:13ch}.ca2-accent{color:#c8881a}
  .ca2-fixed-lines{white-space:pre-line}.ca2-hero-lead{max-width:38ch;font-size:20px;line-height:1.65;color:#3f3932;font-weight:520}.ca2-hero-actions{display:flex;align-items:center;gap:21px;flex-wrap:wrap;margin-top:30px}
  .ca2-primary,.ca2-program-cta{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:13px 20px;border-radius:11px;background:var(--ink);color:#fff!important;font-size:14px;font-weight:750}.ca2-primary span,.ca2-program-cta span{color:#efb83e}.ca2-primary:hover,.ca2-program-cta:hover{background:#000}.ca2-text-link{font-size:14px;font-weight:700;color:var(--muted)!important}.ca2-text-link:hover{color:var(--ink)!important}
  .ca2-hero-note{max-width:54ch;margin-top:16px;color:#81796e;font-size:13.5px;line-height:1.6}
  .ca2-hero-visual{position:relative;min-height:470px}.ca2-portrait-ring{position:absolute;left:50%;top:50%;width:330px;height:420px;transform:translate(-50%,-50%);padding:12px;background:#fff;border:1px solid #e2dcd2;border-radius:180px 180px 28px 28px;box-shadow:0 30px 70px -42px rgba(28,25,21,.62)}.ca2-portrait-ring:before{content:"";position:absolute;inset:-18px 20px 30px -18px;border:2px solid var(--honey);border-radius:190px 190px 34px 34px;z-index:-1}.ca2-portrait-ring img{width:100%;height:100%;object-fit:cover;object-position:center 13%;border-radius:170px 170px 20px 20px}.ca2-career-badge{position:absolute;right:-4px;bottom:38px;max-width:190px;padding:13px 16px;border-radius:11px;background:var(--ink);color:#fff;font-family:var(--font-hand);font-size:14px;line-height:1.45;transform:rotate(-2deg);box-shadow:0 14px 28px -18px rgba(0,0,0,.7)}.ca2-dot{position:absolute;border-radius:50%}.ca2-dot-a{width:13px;height:13px;background:#79c6df;left:7%;top:23%}.ca2-dot-b{width:9px;height:9px;background:#f4845f;right:8%;top:18%}
  .ca2-proof{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.ca2-proof-item{padding:25px 23px;border-right:1px solid var(--line)}.ca2-proof-item:first-child{padding-left:0}.ca2-proof-item:last-child{border-right:0}.ca2-proof-item strong{display:block;font-family:var(--font-serif);font-size:30px;line-height:1}.ca2-proof-item span{display:block;margin-top:8px;color:#81796e;font-size:12px;letter-spacing:.06em;text-transform:uppercase}
  .ca2-section{padding:104px 0}.ca2-heading{display:grid;grid-template-columns:1.12fr .88fr;gap:80px;align-items:end;margin-bottom:48px}.ca2-heading h2,.ca2-program h2,.ca2-story h2,.ca2-work h2,.ca2-fit h2,.ca2-final h2{margin-top:20px;font-family:var(--font-serif);font-size:clamp(38px,4.4vw,56px);font-weight:600;line-height:1.1;letter-spacing:-1.8px;text-wrap:balance}.ca2-heading>p{color:var(--muted);font-size:16px;line-height:1.78;max-width:42ch}
  .ca2-quote-grid{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--ink)}.ca2-quote-grid article{display:grid;grid-template-columns:45px 1fr;gap:18px;align-items:start;padding:29px 32px 31px 0;border-bottom:1px solid var(--line)}.ca2-quote-grid article:nth-child(odd){border-right:1px solid var(--line)}.ca2-quote-grid article:nth-child(even){padding-left:32px}.ca2-quote-grid span{padding-top:3px;color:#b9790e;font-family:var(--font-serif);font-size:13px}.ca2-quote-grid p{font-family:var(--font-hand);font-size:19px;line-height:1.55;color:#3e3932}
  .ca2-program-shell{margin-inline:calc((1120px - 100vw)/2);background:var(--ink);color:#fff}.ca2-program{width:min(1120px,calc(100% - 80px));margin-inline:auto;padding:102px 0}.ca2-program .ca2-kicker{color:#efb83e}.ca2-program-head{display:grid;grid-template-columns:1fr 250px;gap:80px;align-items:start}.ca2-program h2{max-width:15ch}.ca2-program-lead{max-width:58ch;margin-top:24px;color:#bbb3a8;font-size:16px;line-height:1.78}.ca2-big-result{width:230px;height:230px;border:1px solid rgba(255,255,255,.24);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.ca2-big-result strong{font-family:var(--font-serif);font-size:100px;line-height:.85;color:#efb83e}.ca2-big-result span{margin-top:18px;color:#d8d0c5;font-size:12px;font-weight:750;letter-spacing:.1em}
  .ca2-stage-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:74px;border-top:1px solid rgba(255,255,255,.22)}.ca2-stage-grid article{padding:28px 24px 8px 0;border-right:1px solid rgba(255,255,255,.18)}.ca2-stage-grid article:not(:first-child){padding-left:24px}.ca2-stage-grid article:last-child{border-right:0}.ca2-stage-n{color:#efb83e;font-family:var(--font-serif);font-size:13px}.ca2-stage-grid h3{margin:16px 0 10px;font-size:17px;line-height:1.45}.ca2-stage-grid p{color:#bdb5aa;font-family:var(--font-hand);font-size:14.5px;line-height:1.68}
  .ca2-takeaways{display:grid;grid-template-columns:repeat(4,1fr);margin-top:62px;border:1px solid rgba(255,255,255,.2);border-radius:18px}.ca2-takeaways div{padding:22px 24px;border-right:1px solid rgba(255,255,255,.18)}.ca2-takeaways div:last-child{border-right:0}.ca2-takeaways strong{font-family:var(--font-serif);font-size:30px;color:#efb83e}.ca2-takeaways span{margin-left:8px;color:#e5ded5;font-size:13px}.ca2-program-cta{margin-top:34px;background:#efb83e;color:var(--ink)!important}.ca2-program-cta span{color:var(--ink)}.ca2-program-cta:hover{background:#f5c95d}
  .ca2-story{display:grid;grid-template-columns:.82fr 1.18fr;gap:92px;align-items:center}.ca2-story-image{position:relative;width:min(100%,390px);margin-inline:auto}.ca2-story-image:before{content:"";position:absolute;inset:20px -20px -20px 20px;border:2px solid #79c6df;border-radius:24px}.ca2-story-image img{position:relative;width:100%;aspect-ratio:4/5;object-fit:cover;object-position:center 12%;border-radius:24px;filter:saturate(.86)}.ca2-story-tag{position:absolute;left:-24px;bottom:27px;padding:11px 14px;background:#fff;border:1px solid var(--line);font-size:12px;font-weight:800;letter-spacing:.1em;transform:rotate(-4deg)}.ca2-story-copy h2{max-width:15ch}.ca2-story-copy>p:not(.ca2-kicker){max-width:58ch;margin-top:17px;color:#4d463d;font-family:var(--font-hand);font-size:17px;line-height:1.82}.ca2-story-facts{display:flex;gap:10px;flex-wrap:wrap;margin-top:27px}.ca2-story-facts span{padding:8px 12px;border:1px solid var(--line);border-radius:999px;background:#fff;font-size:12.5px;font-weight:700;color:#665e54}
  .ca2-work{padding-top:18px}.ca2-work-head{display:grid;grid-template-columns:.72fr 1.28fr;gap:60px;align-items:start;margin-bottom:40px}.ca2-work h2{margin-top:0}.ca2-work-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.ca2-work-grid>a{display:block}.ca2-work-thumb{position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:15px;background:#e7e2d8}.ca2-work-thumb img{width:100%;height:100%;object-fit:cover;transition:transform .45s ease}.ca2-work-thumb span{position:absolute;right:11px;bottom:11px;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.92);font-size:12px}.ca2-work-grid>a:hover img{transform:scale(1.035)}.ca2-work-grid>a>p{margin-top:13px;color:#b9790e;font-size:12px;font-weight:750;letter-spacing:.08em;text-transform:uppercase}.ca2-work-grid h3{margin-top:7px;font-size:15px;line-height:1.45}
  .ca2-fit{display:grid;grid-template-columns:.88fr 1.12fr;gap:76px;align-items:start}.ca2-fit-intro h2{max-width:14ch}.ca2-fit-columns{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--line);border-radius:22px;overflow:hidden;background:#fff}.ca2-fit-columns>div{padding:29px}.ca2-fit-yes{border-right:1px solid var(--line)}.ca2-fit-yes p{display:grid;grid-template-columns:22px 1fr;gap:7px;padding:14px 0;border-bottom:1px solid #ebe6de;font-size:14.5px;line-height:1.55}.ca2-fit-yes p:last-child{border-bottom:0}.ca2-fit-yes span{color:#b9790e;font-weight:750}.ca2-fit-no{background:#efebe2}.ca2-fit-no h3{font-size:14px;margin-bottom:11px}.ca2-fit-no p{padding:11px 0;color:var(--muted);font-family:var(--font-hand);font-size:14.5px;line-height:1.6;border-bottom:1px solid #ded8cd}.ca2-fit-no p:last-child{border-bottom:0}
  .ca2-final{position:relative;overflow:hidden;padding:82px 64px;margin-bottom:36px;border-radius:28px;background:#efc455}.ca2-final:before,.ca2-final:after{content:"";position:absolute;border:1px solid rgba(28,25,21,.15);border-radius:50%}.ca2-final:before{width:300px;height:300px;left:-180px;top:-210px}.ca2-final:after{width:420px;height:420px;right:-260px;bottom:-330px}.ca2-final-title{position:relative;z-index:1;display:flex;flex-direction:column;gap:8px;font-family:var(--font-serif);line-height:1.08}.ca2-final-title span{color:#665019;font-size:clamp(24px,3vw,36px);font-weight:600}.ca2-final-title strong{font-size:clamp(38px,4.4vw,56px);font-weight:600;letter-spacing:-1.8px}.ca2-final-lead{position:relative;z-index:1;max-width:52ch;margin:22px 0 28px;color:#594c2e;font-size:16px;line-height:1.7}.ca2-subscribe-actions{position:relative;z-index:1;display:grid;grid-template-columns:minmax(220px,1fr) minmax(180px,.65fr);gap:10px;max-width:640px}.ca2-subscribe-actions a,.ca2-subscribe-actions button{min-height:54px;border-radius:12px;font-size:14px;font-weight:750;cursor:pointer}.ca2-subscribe-main{display:flex;align-items:center;justify-content:space-between;padding:13px 20px;border:1px solid var(--ink);background:var(--ink);color:#fff!important}.ca2-subscribe-main span{color:#efb83e}.ca2-subscribe-main:hover{background:#000}.ca2-subscribe-wechat{display:flex;align-items:center;justify-content:center;gap:9px;padding:13px 18px;border:1px solid rgba(28,25,21,.2);background:rgba(255,255,255,.72);color:var(--ink)}.ca2-subscribe-wechat:hover{background:#fff}.ca2-subscribe-wechat img{width:18px;height:18px;object-fit:contain}
  .ca2-footer{height:112px;display:flex;align-items:center;justify-content:space-between;color:#81796e;font-size:12px}.ca2-footer button{border:0;background:transparent;color:var(--ink);font-weight:700;cursor:pointer}
  @media(max-width:1160px){.ca2-program-shell{margin-inline:-40px}.ca2-hero{gap:42px}.ca2-portrait-ring{width:290px;height:380px}.ca2-nav-links{display:none}}
  @media(max-width:850px){.ca2-nav-inner,.ca2-page main,.ca2-footer{width:min(100% - 44px,680px)}.ca2-nav-cta{display:none}.ca2-hero{grid-template-columns:1fr;min-height:auto;padding:54px 0 48px;gap:24px}.ca2-hero-copy{max-width:640px}.ca2-hero-visual{min-height:320px}.ca2-portrait-ring{width:240px;height:300px}.ca2-career-badge{right:8%;bottom:22px;max-width:180px}.ca2-proof{grid-template-columns:1fr 1fr}.ca2-proof-item{padding:22px}.ca2-proof-item:nth-child(2){border-right:0}.ca2-proof-item:nth-child(-n+2){border-bottom:1px solid var(--line)}.ca2-proof-item:nth-child(3){padding-left:0}.ca2-section{padding:82px 0}.ca2-heading,.ca2-story,.ca2-fit{grid-template-columns:1fr;gap:36px}.ca2-heading{align-items:start}.ca2-quote-grid{grid-template-columns:1fr}.ca2-quote-grid article,.ca2-quote-grid article:nth-child(even){padding:25px 0;border-right:0}.ca2-program-shell{margin-inline:-22px}.ca2-program{width:calc(100% - 44px);padding:80px 0}.ca2-program-head{grid-template-columns:1fr;gap:42px}.ca2-big-result{width:190px;height:190px}.ca2-big-result strong{font-size:82px}.ca2-stage-grid{grid-template-columns:1fr 1fr}.ca2-stage-grid article:nth-child(2){border-right:0}.ca2-stage-grid article:nth-child(-n+2){padding-bottom:28px;border-bottom:1px solid rgba(255,255,255,.18)}.ca2-stage-grid article:nth-child(3){padding-left:0}.ca2-takeaways{grid-template-columns:1fr 1fr}.ca2-takeaways div:nth-child(2){border-right:0}.ca2-takeaways div:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.18)}.ca2-story{gap:68px}.ca2-work-head{grid-template-columns:1fr;gap:18px}.ca2-work-grid{grid-template-columns:1fr 1fr}.ca2-work-grid>a:last-child{grid-column:1/-1;max-width:50%}.ca2-fit-columns{grid-template-columns:1fr}.ca2-fit-yes{border-right:0;border-bottom:1px solid var(--line)}}
  @media(max-width:560px){.ca2-nav-inner,.ca2-page main,.ca2-footer{width:calc(100% - 34px)}.ca2-nav-inner{height:70px}.ca2-nav-actions{gap:0}.ca2-nav-actions .lang button{padding:6px 8px}.ca2-hero{padding-top:42px}.ca2-kicker{font-size:12px;letter-spacing:.06em}.ca2-hero-title{margin:18px 0 21px;letter-spacing:-1.25px}.ca2-hero-title-zh{font-size:32px}.ca2-hero-title-en{font-size:35px;line-height:1.07}.ca2-hero-lead{font-size:17px;line-height:1.62;max-width:34ch}.ca2-hero-actions{margin-top:24px;gap:15px}.ca2-primary{width:100%;min-height:49px}.ca2-text-link{width:100%;text-align:center}.ca2-hero-note{font-size:13px}.ca2-hero-visual{min-height:285px}.ca2-portrait-ring{width:210px;height:265px}.ca2-career-badge{right:0;bottom:17px;font-size:12px;max-width:155px}.ca2-dot-a{left:3%}.ca2-dot-b{right:4%}.ca2-proof-item{padding:20px 13px}.ca2-proof-item strong{font-size:26px}.ca2-proof-item span{font-size:12px;letter-spacing:.02em}.ca2-section{padding:72px 0}.ca2-heading h2,.ca2-program h2,.ca2-story h2,.ca2-work h2,.ca2-fit h2{font-size:34px;letter-spacing:-1px}.ca2-heading>p,.ca2-program-lead,.ca2-final-lead{font-size:15px}.ca2-quote-grid p{font-size:17px}.ca2-quote-grid article{grid-template-columns:34px 1fr;gap:9px}.ca2-program-shell{margin-inline:-17px}.ca2-program{width:calc(100% - 34px);padding:70px 0}.ca2-program-head{gap:34px}.ca2-big-result{width:160px;height:160px}.ca2-big-result strong{font-size:70px}.ca2-big-result span{font-size:12px;margin-top:13px}.ca2-stage-grid{grid-template-columns:1fr;margin-top:54px}.ca2-stage-grid article,.ca2-stage-grid article:not(:first-child){padding:23px 0;border-right:0;border-bottom:1px solid rgba(255,255,255,.18)}.ca2-stage-grid p{font-size:14.5px}.ca2-takeaways{grid-template-columns:1fr 1fr;margin-top:40px}.ca2-takeaways div{padding:17px 14px}.ca2-takeaways strong{font-size:25px}.ca2-takeaways span{display:block;margin:5px 0 0;font-size:12px}.ca2-story{gap:58px}.ca2-story-image{width:84%}.ca2-story-copy>p:not(.ca2-kicker){font-size:16px}.ca2-work-grid{grid-template-columns:1fr}.ca2-work-grid>a:last-child{grid-column:auto;max-width:none}.ca2-fit{gap:32px}.ca2-fit-columns>div{padding:23px}.ca2-final{padding:58px 20px;margin-inline:-4px}.ca2-subscribe-actions{grid-template-columns:1fr}.ca2-subscribe-actions a,.ca2-subscribe-actions button{min-height:50px}.ca2-footer{height:118px}}
  @media(max-width:360px){.ca2-hero-title-zh{font-size:28px}.ca2-hero-title-en{font-size:32px}.ca2-back{font-size:15px}}
`;
