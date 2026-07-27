import { useEffect, useState } from "react";
import "./product-delivery.css";

const DELIVERY = {
  reading: {
    slug: "reading-map",
    navTitle: "超说阅读地图",
    eyebrow: "购买成功 · 从这里开始",
    title: "你好，欢迎进入\n超说阅读地图",
    intro: "请先选择你正在使用的设备。下面会把注册、打开阅读地图和复制模板，一步一步列给你。",
    accent: "#d49422",
    soft: "#f7ead0",
    templateUrl: "https://piquant-antimatter-ada.notion.site/Chaologies-35af81438f7c80c3a86ccc8dcd452bb3?source=copy_link",
    guideUrl: "https://docs.qq.com/doc/DSHFKcFNLbEtMYU14",
    landingUrl: "/reading-map",
    primary: "打开 Notion 阅读地图",
    guideCta: "查看完整图文指南",
    packageLabel: "你已经获得",
    packageTitle: "一张可以持续生长的阅读地图",
    packageItems: ["101 本精选好书", "按 12 种能力分类", "每本书一张认知卡片", "持续更新的 Notion 模板"],
    steps: [
      {
        label: "STEP 01",
        title: "从此刻的问题出发",
        body: "不用从第一页开始，也不用一次看完。先想一件你最近真正想解决的事。",
      },
      {
        label: "STEP 02",
        title: "选择一个主题或能力",
        body: "按金钱、工作、生活、创作等主题，或按你想培养的能力，找到此刻最相关的一本书。",
      },
      {
        label: "STEP 03",
        title: "一次只读一张卡片",
        body: "先看它解决什么问题，再读最重要的三个认知。觉得相关时，再决定要不要继续读原书。",
      },
      {
        label: "STEP 04",
        title: "带走一次小行动",
        body: "一个认知、一个问题或一个可以马上开始的小练习，就已经足够。",
      },
    ],
    insideTitle: "打开一张卡片，你会看到这些",
    insideIntro: "每本书都被整理成同一套阅读入口，方便你快速判断：现在值不值得继续读。",
    inside: [
      ["01", "它适不适合你", "先判断这本书是否与你此刻的问题有关。"],
      ["02", "它解决什么问题", "用最短时间找到这本书真正回应的困惑。"],
      ["03", "最重要的 3 个认知", "不追求面面俱到，只留下最值得带走的部分。"],
      ["04", "读完后如何行动", "Chao 的真实改变，以及一个可以马上开始的小练习。"],
    ],
    tipsTitle: "第一次使用，记住这三件事",
    tips: [
      "先登录 Notion，再打开模板链接；没有登录时可能看不到复制入口。",
      "复制完成后，那份模板就在你的工作区里，可以自由修改、标记和添加自己的笔记。",
      "手机可以阅读，但第一次复制和整理更推荐使用电脑浏览器或 Notion 桌面端。",
    ],
    faq: [
      ["为什么我看不到「Duplicate / 复制」？", "先确认已经登录 Notion。不同版本的按钮也可能显示为「免费试用」或复制图标；仍然找不到时，请打开完整图文指南对照操作。"],
      ["一定要下载 Notion App 吗？", "不用。电脑和手机都可以直接使用网页版；长期使用时，再按自己的习惯安装桌面端或手机 App。"],
      ["模板复制后还能更新吗？", "你复制到自己工作区的版本属于你，可以自由编辑。Chaologies 的原模板会持续增加内容；重要更新会另行说明。"],
    ],
  },
  weekly: {
    slug: "notion-weekly",
    navTitle: "Minimalist Weekly System",
    eyebrow: "购买成功 · 从这一周开始",
    title: "用十分钟，\n把这一周过清楚",
    intro: "这套系统不是让你塞进更多任务，而是把注意力留给真正想推进的事情。",
    accent: "#3498a4",
    soft: "#dff1f1",
    templateUrl: "https://piquant-antimatter-ada.notion.site/The-Minimalist-Weekly-System-2fcf81438f7c81baa4c7e6dfb2308937",
    guideUrl: "https://docs.qq.com/doc/DSEJ6eXh2T3RCTWFE",
    landingUrl: "/notion-weekly",
    primary: "打开 Minimalist Template",
    guideCta: "查看完整图文指南",
    packageLabel: "你已经获得",
    packageTitle: "一套每周都能重新开始的极简系统",
    packageItems: ["首页 Dashboard", "年度总览 Yearly Overview", "待办池 Parking Lot", "每周规划模板 Weekly Plan"],
    steps: [
      {
        label: "STEP 01",
        title: "找到每周规划模板",
        body: "进入首页后，先找到 Weekly Planning Template。固定事件和新一周计划，都从这里开始设置。",
      },
      {
        label: "STEP 02",
        title: "先设置任务容器",
        body: "把工作、创作、生活等长期领域放进 Task Containers，让后来出现的任务都有归处。",
      },
      {
        label: "STEP 03",
        title: "先修改「固定事件」",
        body: "在 Weekly Planning Template 里，把周一到周五的会议、运动和固定承诺改成你自己的。请先改模板本身，以后新建的每一周才会自动带上这些安排。",
      },
      {
        label: "STEP 04",
        title: "再创建本周计划",
        body: "点击模板里的「点击复制每周模版」，生成本周页面，再从 Parking Lot 拖入这一周真正要推进的任务。",
      },
    ],
    insideTitle: "模板里有四个核心区域",
    insideIntro: "结构刻意保持简单。先把东西放对地方，再决定这一周真正要做什么。",
    inside: [
      ["01", "首页 Dashboard", "Reminder 提醒区和 Frontload 每周入口，让你一打开就知道从哪里开始。"],
      ["02", "Yearly Overview", "把每一周放回整年里看，留下持续推进的轨迹。"],
      ["03", "Parking Lot", "先收集，不急着承诺；真正要做时，再把任务拖进这一周。"],
      ["04", "Weekly Planning", "用 Milestone、固定事件和任务安排，完成每周一次的十分钟规划。"],
    ],
    tipsTitle: "第一次设置，记住这三件事",
    tips: [
      "先放固定事件，再安排任务；这样看到的是你真实可用的时间，而不是理想中的一周。",
      "不要把 Parking Lot 里的所有事情都塞进本周，只选择真正要推进的少数事项。",
      "第一次建议用电脑完成设置；之后在手机或 iPad 上查看、勾选和调整都可以。",
    ],
    faq: [
      ["为什么我看不到「Duplicate / 复制」？", "先确认已经登录 Notion，再查看页面右上角的复制图标或更多菜单。不同设备上的按钮位置会略有区别。"],
      ["我应该先改哪些内容？", "先设置 Task Containers 和固定事件，其他样式与字段暂时不用改。完成第一周以后，再按你的习惯微调。"],
      ["每周需要重新搭建吗？", "不用。点击模板里的「复制每周模版」，生成新的 Weekly Plan，再从 Parking Lot 选择本周任务即可。"],
    ],
  },
};

const DEVICE_GUIDES = [
  {
    id: "desktop",
    tab: "电脑",
    sub: "Mac / Windows",
    icon: "⌨",
    title: "第一次使用\n电脑浏览器最省事",
    intro: "不用先安装软件。\n注册、登录和复制模板，都先在浏览器完成。\n复制成功后，再决定要不要下载桌面 App。",
    appLabel: "可选：复制成功后下载桌面 App",
    appUrl: "https://www.notion.com/desktop",
    ui: "desktop",
  },
  {
    id: "ios",
    tab: "iPhone / iPad",
    sub: "iOS / iPadOS",
    icon: "◉",
    title: "iPhone / iPad\n先装 App，再从浏览器复制",
    intro: "还没有 Notion 时，先安装官方 App。\n然后按下面 1 → 2 → 3 操作，不用再去别的页面找入口。",
    appLabel: "先安装 Notion 官方 App",
    appUrl: "https://apps.apple.com/us/app/notion-notes-tasks-ai/id1232780281",
    ui: "mobile",
  },
  {
    id: "android",
    tab: "安卓 / 华为",
    sub: "Android / HarmonyOS",
    icon: "◇",
    title: "安卓 / 华为\n先注册账号，再打开模板",
    intro: "有 Google Play 时可以先安装 Notion App。\n华为暂时装不了官方 App 也没关系，直接用浏览器完成下面三步。",
    appLabel: "Google Play 安装 Notion",
    appUrl: "https://play.google.com/store/apps/details?id=notion.id",
    ui: "mobile",
  },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function ProductDeliveryPage({ product, onNavigate }) {
  const data = DELIVERY[product];
  const [device, setDevice] = useState("desktop");
  const deviceGuide = DEVICE_GUIDES.find((item) => item.id === device);

  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription = document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
    let robots = document.querySelector('meta[name="robots"]');
    const createdRobots = !robots;
    const socialMetas = [];

    const setSocialMeta = (attribute, key, content) => {
      let meta = document.querySelector(`meta[${attribute}="${key}"]`);
      const created = !meta;
      const previous = meta?.getAttribute("content") ?? "";
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
      socialMetas.push({ meta, created, previous });
    };

    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }

    document.title = `${data.navTitle} · 开始使用 | Chaologies`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", data.intro);
    robots.setAttribute("content", "noindex,nofollow");
    const socialTitle = `${data.navTitle} · 从这里开始`;
    const socialImage = `${window.location.origin}/delivery-og.jpg`;
    setSocialMeta("property", "og:title", socialTitle);
    setSocialMeta("property", "og:description", data.intro);
    setSocialMeta("property", "og:type", "website");
    setSocialMeta("property", "og:image", socialImage);
    setSocialMeta("name", "twitter:card", "summary_large_image");
    setSocialMeta("name", "twitter:title", socialTitle);
    setSocialMeta("name", "twitter:description", data.intro);
    setSocialMeta("name", "twitter:image", socialImage);

    return () => {
      document.title = previousTitle;
      document.querySelector('meta[name="description"]')?.setAttribute("content", previousDescription);
      if (createdRobots) robots.remove();
      else robots.removeAttribute("content");
      socialMetas.forEach(({ meta, created, previous }) => {
        if (created) meta.remove();
        else meta.setAttribute("content", previous);
      });
    };
  }, [data]);

  const go = (path) => (event) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <div className={`delivery-page delivery-page--${data.slug}`} style={{ "--delivery-accent": data.accent, "--delivery-soft": data.soft }}>
      <header className="delivery-nav">
        <a className="delivery-brand" href="/" onClick={go("home")} aria-label="返回 Chaologies 首页">
          <img src="/logo.png" alt="Chaologies" />
        </a>
        <span className="delivery-nav-divider" aria-hidden="true" />
        <span className="delivery-nav-title">{data.navTitle} · 使用入口</span>
        <a className="delivery-home-link" href="/" onClick={go("home")}>访问 Chaologies <span aria-hidden="true">→</span></a>
      </header>

      <main>
        <section className="delivery-hero" aria-labelledby={`${data.slug}-title`}>
          <div className="delivery-hero-copy">
            <p className="delivery-eyebrow"><span />{data.eyebrow}</p>
            <h1 id={`${data.slug}-title`}>{data.title}</h1>
            <p className="delivery-intro">{data.intro}</p>
            <div className="delivery-actions">
              <a className="delivery-button delivery-button--primary" href={data.templateUrl} rel="noreferrer">
                {data.primary} <ArrowIcon />
              </a>
              <a className="delivery-button delivery-button--secondary" href="#notion-install">
                推荐：按下面步骤打开 <span aria-hidden="true">↓</span>
              </a>
            </div>
            <aside className="delivery-first-use" aria-label="第一次使用提醒">
              <p><span>{product === "reading" ? "请按照以下步骤" : "第一次只需要按照下面四个步骤设置"}</span></p>
              <h2>{product === "reading" ? "选择设备，打开你的阅读地图" : "先在电脑浏览器里复制模板"}</h2>
              <div>
                {product === "reading" ? (
                  <><strong>上面的按钮就是模板入口。</strong><br />第一次使用，建议先选择设备，按下面三步完成注册、打开和复制。</>
                ) : (
                  <><strong>上面的按钮就是模板入口。</strong><br />第一次使用，建议先在电脑浏览器登录 Notion，再按下面三步复制模板。<br />复制成功后，再决定要不要下载桌面 App。</>
                )}
              </div>
              <a href="#notion-install">选择你正在使用的设备 <span aria-hidden="true">↓</span></a>
            </aside>
            {product === "weekly" && (
              <p className="delivery-action-note">
                仍想看原来的长说明？
                <a href={data.guideUrl} rel="noreferrer">{data.guideCta} <ArrowIcon /></a>
              </p>
            )}
          </div>

          <aside className="delivery-package" aria-label={data.packageLabel}>
            <div className="delivery-package-topline">
              <span>{data.packageLabel}</span>
              <span className="delivery-ready">READY</span>
            </div>
            <h2>{data.packageTitle}</h2>
            <ul>
              {data.packageItems.map((item, index) => (
                <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
              ))}
            </ul>
            <p>Created by Chaologies · Chao</p>
          </aside>
        </section>

        <section id="notion-install" className="delivery-section delivery-device-guide" aria-labelledby={`${data.slug}-device-guide`}>
          <div className="delivery-section-heading delivery-section-heading--wide">
            <p>NOTION SETUP</p>
            <h2 id={`${data.slug}-device-guide`}>你现在用什么设备？</h2>
            <span>选好设备后，按 1 → 2 → 3 走：登录或注册、打开模板、点击复制。需要的入口都在这里。</span>
          </div>

          <div className="delivery-device-tabs" role="tablist" aria-label="选择设备">
            {DEVICE_GUIDES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={device === item.id}
                aria-controls={`${data.slug}-${item.id}-panel`}
                id={`${data.slug}-${item.id}-tab`}
                className={device === item.id ? "is-active" : ""}
                onClick={() => setDevice(item.id)}
              >
                <span aria-hidden="true">{item.icon}</span>
                <strong>{item.tab}</strong>
                <small>{item.sub}</small>
              </button>
            ))}
          </div>

          <div
            className="delivery-device-panel"
            id={`${data.slug}-${deviceGuide.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${data.slug}-${deviceGuide.id}-tab`}
          >
            <div className="delivery-device-copy">
              <p className="delivery-device-kicker">{deviceGuide.tab} · 第一次设置</p>
              <h3>{deviceGuide.title}</h3>
              <p>{deviceGuide.intro}</p>
              {deviceGuide.id !== "desktop" && <a className="delivery-device-app" href={deviceGuide.appUrl} rel="noreferrer">{deviceGuide.appLabel} <ArrowIcon /></a>}
              <ol>
                <li>
                  <span>1</span>
                  <div>
                    <strong>在浏览器登录或免费注册 Notion</strong>
                    <p>已经有账号时，直接登录同一个账号即可。</p>
                    <a href="https://www.notion.so/signup" rel="noreferrer">打开 Notion 登录 / 注册 <ArrowIcon /></a>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <strong>回到本页，打开你的模板</strong>
                    <p>保持浏览器打开，直接点击下面的按钮。</p>
                    <a href={data.templateUrl} rel="noreferrer">{data.primary} <ArrowIcon /></a>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <strong>点击 Duplicate / 复制</strong>
                    <p>在模板右上角找到复制按钮，把模板放进自己的工作区。右边是按钮位置示意。</p>
                  </div>
                </li>
              </ol>
              {deviceGuide.id === "desktop" && <a className="delivery-device-app delivery-device-app--after" href={deviceGuide.appUrl} rel="noreferrer">{deviceGuide.appLabel} <ArrowIcon /></a>}
            </div>

            <div className={`delivery-notion-demo delivery-notion-demo--${deviceGuide.ui}`} aria-label="Notion 复制按钮示意">
              <div className="delivery-demo-label">按钮位置示意 · NOTION</div>
              {deviceGuide.ui === "desktop" ? (
                <>
                  <div className="delivery-notion-toolbar">
                    <span>📄 {data.navTitle}</span>
                    <div><button type="button" tabIndex="-1">•••</button><button type="button" tabIndex="-1">Duplicate / 复制</button></div>
                  </div>
                  <div className="delivery-notion-canvas">
                    <span>{product === "reading" ? "🗺️" : "📆"}</span>
                    <strong>{data.navTitle}</strong>
                    <i />
                    <i />
                    <i />
                  </div>
                </>
              ) : (
                <div className="delivery-phone-shell">
                  <div className="delivery-phone-top">
                    <span>‹</span><strong>{data.navTitle}</strong><button type="button" tabIndex="-1">•••</button>
                  </div>
                  <div className="delivery-phone-content">
                    <span>{product === "reading" ? "🗺️" : "📆"}</span>
                    <strong>{data.navTitle}</strong>
                    <i /><i />
                  </div>
                  <div className="delivery-phone-menu">
                    <b>复制到我的 Notion</b>
                    <small>未登录时，这里会先显示「注册或登录」</small>
                  </div>
                </div>
              )}
              <p>Notion 会不定期调整文字和图标。请认这三个线索：<strong>Duplicate / 复制</strong>、两个重叠方框的复制图标、右上角 <strong>•••</strong> 菜单。</p>
            </div>
          </div>
        </section>

        <section className="delivery-section delivery-section--steps" aria-labelledby={`${data.slug}-steps`}>
          <div className="delivery-section-heading">
            <p>QUICK START</p>
            <h2 id={`${data.slug}-steps`}>{product === "weekly" ? "复制完成后，跟着视频设置你的第一周" : "复制完成后，这样开始阅读"}</h2>
          </div>
          {product === "weekly" && (
            <div className="delivery-video-guide">
              <div className="delivery-video-copy">
                <p>从 6:54 开始看</p>
                <h3>先改好固定事件，<br />再创建本周计划</h3>
                <p>请先在 <strong>Weekly Planning Template</strong> 里修改会议、运动和其他固定安排。以后每周从这个模板创建新计划时，这些内容才会自动保留下来。</p>
                <a href="https://www.bilibili.com/video/BV18nDSBSEez/?t=414" target="_blank" rel="noreferrer">在 B 站从 6:54 打开完整视频 <ArrowIcon /></a>
              </div>
              <div className="delivery-video-player">
                <iframe
                  src="https://player.bilibili.com/player.html?isOutside=true&aid=116389956355311&bvid=BV18nDSBSEez&cid=37439145123&p=1&t=414&autoplay=0&danmaku=0"
                  title="Minimalist Weekly System 设置教程，从 6 分 54 秒开始"
                  loading="lazy"
                  allowFullScreen
                  scrolling="no"
                />
              </div>
            </div>
          )}
          <div className="delivery-steps">
            {data.steps.map((step) => (
              <article className="delivery-step" key={step.label}>
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="delivery-section delivery-section--inside" aria-labelledby={`${data.slug}-inside`}>
          <div className="delivery-section-heading delivery-section-heading--wide">
            <p>WHAT'S INSIDE</p>
            <h2 id={`${data.slug}-inside`}>{data.insideTitle}</h2>
            <span>{data.insideIntro}</span>
          </div>
          <div className="delivery-inside-grid">
            {data.inside.map(([number, title, body]) => (
              <article className="delivery-inside-card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="delivery-section delivery-tips" aria-labelledby={`${data.slug}-tips`}>
          <div>
            <p className="delivery-tips-label">FIRST USE NOTES</p>
            <h2 id={`${data.slug}-tips`}>{data.tipsTitle}</h2>
          </div>
          <ol>
            {data.tips.map((tip, index) => (
              <li key={tip}><span>{index + 1}</span><p>{tip}</p></li>
            ))}
          </ol>
        </section>

        <section className="delivery-section delivery-faq" aria-labelledby={`${data.slug}-faq`}>
          <div className="delivery-section-heading">
            <p>NEED HELP?</p>
            <h2 id={`${data.slug}-faq`}>第一次使用的常见问题</h2>
          </div>
          <div className="delivery-faq-list">
            {data.faq.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>{question}<span aria-hidden="true">＋</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="delivery-final">
          <p>准备好了吗？</p>
          <h2>{product === "reading" ? "从一本此刻真正需要的书开始。" : "从这一周真正重要的事情开始。"}</h2>
          <div className="delivery-actions delivery-actions--center">
            <a className="delivery-button delivery-button--primary" href={data.templateUrl} rel="noreferrer">{data.primary} <ArrowIcon /></a>
            <a className="delivery-button delivery-button--text" href={data.landingUrl} onClick={go(data.landingUrl)}>查看产品介绍</a>
          </div>
        </section>
      </main>

      <footer className="delivery-footer">
        <a href="/" onClick={go("home")} aria-label="返回 Chaologies 首页"><img src="/logo.png" alt="Chaologies" /></a>
        <p>关于生活、金钱、创作和更清楚的选择。</p>
        <a href="mailto:hi@chaologies.com">遇到问题：hi@chaologies.com</a>
      </footer>
    </div>
  );
}
