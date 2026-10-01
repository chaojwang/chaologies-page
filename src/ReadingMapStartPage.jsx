import { useEffect, useRef, useState } from "react";
import EditorialLines from "./EditorialLines";
import "./reading-map-start.css";

const STORAGE_KEY = "chaologies.reading-onboarding.v1";
const DEVICES = [
  { id: "desktop", name: "电脑", detail: "Mac / Windows", icon: "desktop" },
  { id: "iphone", name: "iPhone", detail: "苹果手机", icon: "phone" },
  { id: "ipad", name: "iPad", detail: "苹果平板", icon: "tablet" },
  { id: "android", name: "安卓 / 华为", detail: "Android / HarmonyOS", icon: "phone" },
];
const SOFTWARE = {
  notion: {
    name: "Notion", subtitle: "用过 Notion？选你熟悉的。", letter: "N",
    login: "https://app.notion.com/login", signup: "https://app.notion.com/signup",
    template: "https://piquant-antimatter-ada.notion.site/Chaologies-35af81438f7c80c3a86ccc8dcd452bb3",
    download: "https://www.notion.com/desktop", home: "https://app.notion.com/",
  },
  feishu: {
    name: "飞书", subtitle: "中文界面，也适合安卓和华为。", letter: "飞",
    login: "https://accounts.feishu.cn/accounts/page/login?app_id=2&redirect_uri=https%3A%2F%2Fwww.feishu.cn%2Fdrive%2Fhome%2F",
    signup: "https://www.feishu.cn/accounts/page/ug_register?redirect_uri=https%3A%2F%2Fwww.feishu.cn%2Fdrive%2Fhome%2F&app_id=2",
    template: "https://qb895q16v9.feishu.cn/base/TcgpbcgyTaKRmVs6zt7c7wBOn6e",
    download: "https://www.feishu.cn/download", home: "https://www.feishu.cn/drive/home/",
  },
};
const STEP_NAMES = ["选设备", "选软件", "登录账号", "打开地图"];
const TITLES = ["你现在用什么设备？", "你想用哪个版本？", "先登录你的账号", "你的阅读地图在这里"];
const EMPTY = { step: 0, device: "", software: "", account: "", loggedIn: false };

// Preferences only: never store credentials or infer another platform's login state.
function restoreJourney() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !DEVICES.some(d => d.id === saved.device)) return { ...EMPTY };
    const software = Object.hasOwn(SOFTWARE, saved.software) ? saved.software : "";
    const account = ["existing", "new"].includes(saved.account) ? saved.account : "";
    const loggedIn = Boolean(software && account && saved.loggedIn === true);
    const maxStep = loggedIn ? 3 : software ? 2 : 1;
    return { device: saved.device, software, account, loggedIn,
      step: Number.isInteger(saved.step) ? Math.max(0, Math.min(saved.step, maxStep)) : 0 };
  } catch { return { ...EMPTY }; }
}

function DeviceIcon({ type }) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
    {type === "desktop" ? <><rect x="3" y="5" width="26" height="18" rx="2" /><path d="M16 23v5m-7 0h14" /></>
      : <><rect x={type === "tablet" ? 6 : 9} y="3" width={type === "tablet" ? 20 : 14} height="26" rx="3" /><path d="M14 25h4" /></>}
  </svg>;
}
function Subheading({ children }) {
  return <EditorialLines as="h3" lines={[children]} />;
}
function OutLink({ href, children, className = "" }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children} <span aria-hidden="true">↗</span><span className="rm-sr-only">（在新标签页打开）</span>
  </a>;
}
function Help({ title, children }) {
  return <details className="rm-help"><summary>{title}<span aria-hidden="true">＋</span></summary><div>{children}</div></details>;
}
function Screenshot({ src, alt, caption, portrait = false }) {
  return <figure className={`rm-shot${portrait ? " rm-shot--portrait" : ""}`}>
    <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`放大截图：${alt}`}><img src={src} alt={alt} loading="lazy" /></a>
    <figcaption>{caption} <span>点击图片可放大 ↗</span></figcaption>
  </figure>;
}

function useEntryMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    const changed = [];
    const title = "超说阅读地图 · 从这里开始 | Chaologies";
    const description = "选择设备与 Notion 或飞书，跟着步骤登录、复制阅读地图，再打开你的第一本书。";
    const set = (attribute, key, value) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      const created = !element;
      const previous = element?.getAttribute("content");
      if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.appendChild(element); }
      element.setAttribute("content", value); changed.push({ element, created, previous });
    };
    document.title = title;
    set("name", "description", description); set("name", "robots", "noindex,nofollow");
    for (const [attribute, prefix] of [["property", "og"], ["name", "twitter"]]) {
      set(attribute, `${prefix}:title`, title); set(attribute, `${prefix}:description`, description);
      set(attribute, `${prefix}:image`, `${window.location.origin}/delivery-og.jpg`);
    }
    set("name", "twitter:card", "summary_large_image"); set("property", "og:type", "website");
    return () => {
      document.title = previousTitle;
      changed.forEach(({ element, created, previous }) => {
        if (created) element.remove(); else if (previous === null) element.removeAttribute("content"); else element.setAttribute("content", previous);
      });
    };
  }, []);
}

export default function ReadingMapStartPage({ onNavigate }) {
  const [journey, setJourney] = useState(restoreJourney);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const [readingView, setReadingView] = useState("ability");
  const [installRoute, setInstallRoute] = useState("browser");
  const [showReturning, setShowReturning] = useState(false);
  const headingRef = useRef(null);
  const previousStep = useRef(journey.step);
  const { step, device, software, account } = journey;
  const platform = SOFTWARE[software];
  const deviceName = DEVICES.find(d => d.id === device)?.name;
  useEntryMetadata();
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(journey)); setStorageUnavailable(false); }
    catch { setStorageUnavailable(true); }
  }, [journey]);
  useEffect(() => {
    if (previousStep.current !== step) {
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
      previousStep.current = step;
    }
  }, [step]);
  const update = (values) => setJourney(j => ({ ...j, ...values }));
  const goHome = (event) => { if (onNavigate) { event.preventDefault(); onNavigate("home"); } };
  const chooseDevice = id => { if (id !== device) { update({ device: id, loggedIn: false }); setInstallRoute("browser"); } };
  const chooseSoftware = id => { if (id !== software) { update({ software: id, account: "", loggedIn: false }); setInstallRoute("browser"); } };
  const completeAccount = () => update({ loggedIn: true, step: 3 });
  const next = () => update({ step: step + 1 });
  const downloadUrl = software === "feishu" ? SOFTWARE.feishu.download
    : device === "desktop" ? SOFTWARE.notion.download
    : device === "android" ? "https://play.google.com/store/apps/details?id=notion.id"
    : "https://apps.apple.com/app/notion-notes-tasks-ai/id1232780281";
  const ready = step === 0 ? Boolean(device) : step === 1 ? Boolean(software) : step === 2 ? Boolean(account) : true;

  return <div className="rm-entry">
    <header className="rm-nav">
      <a href="/" onClick={goHome} className="rm-brand" aria-label="返回 Chaologies 首页"><img src="/logo.png" alt="Chaologies" /></a>
      <span className="rm-nav-title">超说阅读地图<span> · 使用入口</span></span>
      <a href="/" onClick={goHome} className="rm-home">访问 Chaologies <span aria-hidden="true">→</span></a>
    </header>
    <main className="rm-main">
      <section className="rm-intro" aria-labelledby="rm-title">
        <p className="rm-eyebrow"><span aria-hidden="true" />购买成功，从这里开始</p>
        <h1 id="rm-title" className="rm-title"><EditorialLines as="span" lines={["欢迎进入", "超说阅读地图"]} /></h1>
        <EditorialLines className="rm-intro-text" lines={["选好设备和软件，", "登录后，打开你选择的阅读地图。"]} />
        <button className="rm-return-link" onClick={() => setShowReturning(!showReturning)} aria-expanded={showReturning}>已经复制过？查看再次打开的方法 <span aria-hidden="true">{showReturning ? "−" : "+"}</span></button>
        {showReturning && <div className="rm-return-panel">
          <EditorialLines as="h2" lines={["以后，打开自己的副本"]} />
          <p>在 Notion 的工作区或飞书的云文档中，找到你复制的「阅读地图」。建议把自己的副本加入收藏，或把链接存为浏览器书签。</p>
          <div className="rm-inline-links"><OutLink href={SOFTWARE.notion.home}>打开 Notion 工作区</OutLink><OutLink href={SOFTWARE.feishu.home}>打开飞书云文档</OutLink></div>
          <p className="rm-small">这里打开的是软件主页。自己的副本会保存在你复制时使用的账号中。</p>
        </div>}
      </section>
      <div className="rm-workspace">
        <nav className="rm-progress" aria-label="设置进度">
          <ol>{STEP_NAMES.map((name, index) => <li key={name} className={index === step ? "is-current" : index < step ? "is-done" : ""}>
            <button disabled={index > step} onClick={() => update({ step: index })} aria-current={index === step ? "step" : undefined}>
              <span className="rm-progress-number" aria-hidden="true">{index < step ? "✓" : index + 1}</span><span>{name}</span>
            </button>
          </li>)}</ol>
        </nav>
        <section className="rm-step-card" aria-labelledby="rm-step-heading">
          <div className="rm-step-top"><span className="rm-step-count">第 {step + 1} 步 / 共 4 步</span>{device && <span className="rm-context">{deviceName}{platform && ` · ${platform.name}`}</span>}</div>
          <h2 id="rm-step-heading" className="rm-step-heading" tabIndex={-1} ref={headingRef}><EditorialLines as="span" lines={[TITLES[step]]} /></h2>

          {step === 0 && <>
            <EditorialLines className="rm-lead" lines={["选你现在正在使用的设备。", "接下来，只看适合你的操作步骤。"]} />
            <div className="rm-options rm-devices" role="group" aria-label="选择设备">{DEVICES.map(d => <button key={d.id} className={`rm-option${device === d.id ? " is-selected" : ""}`} aria-pressed={device === d.id} onClick={() => chooseDevice(d.id)}>
              <span className="rm-device-icon"><DeviceIcon type={d.icon} /></span><span className="rm-option-text"><strong>{d.name}</strong><span>{d.detail}</span></span><span className="rm-check" aria-hidden="true">{device === d.id ? "✓" : ""}</span>
            </button>)}</div>
            <p className="rm-note">不用着急下载 App。我们会先带你登录或注册，再给出地图地址。</p>
          </>}

          {step === 1 && <>
            <EditorialLines className="rm-lead" lines={["用过哪一个，就选你熟悉的。", "两个版本都可以把阅读地图保存到自己的空间。"]} />
            <div className="rm-options rm-software" role="group" aria-label="选择软件">{Object.entries(SOFTWARE).map(([id, s]) => <button key={id} className={`rm-option${software === id ? " is-selected" : ""}`} aria-pressed={software === id} onClick={() => chooseSoftware(id)}>
              <span className={`rm-software-icon rm-software-icon--${id}`} aria-hidden="true">{s.letter}</span><span className="rm-option-text"><strong>{s.name}</strong><span>{s.subtitle}</span></span><span className="rm-check" aria-hidden="true">{software === id ? "✓" : ""}</span>
            </button>)}</div>
            <p className="rm-note"><strong>{device === "android" ? "安卓 / 华为建议" : "还不确定？"}</strong>{device === "android" ? "如果没有 Google Play，或 Notion 访问不顺，可以选飞书。选 Notion 也可以先用浏览器。" : "希望使用中文界面，可以先选飞书；已经熟悉 Notion，就继续用 Notion。"}</p>
          </>}

          {step === 2 && <>
            <p className="rm-lead">你已经有 {platform.name} 账号了吗？</p>
            <div className="rm-options rm-account-options" role="group" aria-label="账号状态">{[["existing", "已有账号", "直接登录即可"], ["new", "还没有账号", "先完成注册"]].map(([id, title, detail]) => <button key={id} className={`rm-option${account === id ? " is-selected" : ""}`} aria-pressed={account === id} onClick={() => update({ account: id, loggedIn: false })}><span className="rm-option-text"><strong>{title}</strong><span>{detail}</span></span><span className="rm-check" aria-hidden="true">{account === id ? "✓" : ""}</span></button>)}</div>
            {account && <div className="rm-account-content">
              <div className="rm-instructions">
                <Subheading>{account === "existing" ? `直接登录 ${platform.name}` : `先注册 ${platform.name} 账号`}</Subheading>
                {software === "notion" ? <>
                  <p>{account === "existing" ? "使用原来的邮箱或第三方账号登录，不需要再注册。" : "在打开的页面填写你常用的邮箱，点击 Continue（继续），按页面提示完成验证与账号设置。也可以选择页面提供的第三方账号。"}</p>
                  {account === "new" && <p className="rm-small">页面写着 Work email 时，填写你自己能收到邮件的常用邮箱即可。界面语言可能不同。</p>}
                </> : <>
                  <p>{account === "existing" ? "使用原来的手机号、邮箱，或用已登录的飞书 App 扫码登录。" : "打开注册页，填写你自己的手机号。阅读页面协议后，按提示继续验证与账号设置。"}</p>
                  <p className="rm-small">{account === "existing" ? "已有账号继续使用原来的账号，不用重新创建。" : "如果打开的是登录页，点击「立即注册」。"}</p>
                </>}
                <OutLink className="rm-action" href={account === "existing" ? platform.login : platform.signup}>打开 {platform.name} {account === "existing" ? "登录" : "注册"}</OutLink>
                <p className="rm-callout">完成后回到这一页，点击下方「我已登录，打开地图」。</p>
                {account === "new" && <Help title="查看注册页面示例"><Screenshot portrait src={software === "notion" ? "/read-guide/notion-signup.jpg" : "/read-guide/feishu-account.jpg"} alt={software === "notion" ? "Notion 注册页面，邮箱输入框和 Continue 按钮" : "飞书注册页面，手机号输入框和下一步按钮"} caption="真实账号界面参考；按你打开的页面提示操作。" /></Help>}
                <Help title={device === "desktop" ? "需要安装软件吗？" : "在手机 / 平板上怎样打开？"}>
                  <p>{device === "desktop" ? "电脑先在浏览器登录并打开地图。桌面 App 可以以后再安装。" : "先用 Safari 或系统浏览器完成登录。如果在微信里打不开，点右上角菜单，选择「在浏览器打开」。如果网页提示使用 App，可从官方入口安装，再用同一个账号登录。"}</p>
                  {software === "notion" && device === "android" && <><div className="rm-route-options" role="group" aria-label="安卓安装方式"><button aria-pressed={installRoute === "browser"} onClick={() => setInstallRoute("browser")}>没有 Google Play</button><button aria-pressed={installRoute === "play"} onClick={() => setInstallRoute("play")}>有 Google Play</button></div><p>{installRoute === "browser" ? "不用先安装 Notion。请在系统浏览器打开网页版；如果访问不顺，可以返回上一步改用飞书。" : "可以通过 Google Play 安装官方 Notion App，再用同一个账号登录。"}</p></>}
                  {(software === "feishu" || device !== "android" || installRoute === "play") && <OutLink href={downloadUrl}>官方 App 下载入口</OutLink>}
                </Help>
              </div>
            </div>}
          </>}

          {step === 3 && <>
            <EditorialLines className="rm-lead" lines={[`已完成登录？点击下面的地址，`, "就可以打开阅读地图了。"]} />
            <div className="rm-open-map">
              <span className="rm-mini-label">你选择的是 {platform.name} 版</span>
              <OutLink className="rm-next rm-map-link" href={platform.template}>打开 {platform.name} 阅读地图</OutLink>
              <p className="rm-small">会在新标签页打开。以后可以把这个地址加入收藏。</p>
            </div>
            <Help title="想保存到自己的空间？查看复制方法">
              <p>{software === "notion" ? "打开模板后，点击右上角两个重叠方框的复制图标（Duplicate / 复制），选择自己的工作区。如果看不到，先检查右上角「⋯」菜单。" : "打开模板并登录后，点击「使用该模板」，或在右上角菜单选择「创建副本」，再选择自己的保存位置。"}</p>
              <p>从自己的工作区或云文档打开副本，个人笔记和阅读进度就放在这里。原模板的更新不保证自动同步到独立副本。</p>
              <Screenshot src={software === "notion" ? "/read-guide/notion-copy-control.jpg" : "/read-guide/feishu-covers.jpg"} alt={software === "notion" ? "Notion 右上角的真实复制图标，在分享箭头右侧" : "飞书阅读地图的公开封面浏览页面"} caption={software === "notion" ? "电脑浏览器右上角，两个重叠方框就是复制图标。手机上先检查右上角菜单。" : "原模板可以浏览；登录后可使用模板或创建自己的副本。"} />
            </Help>
            <Help title="不知道从哪里开始读？">
              <div className="rm-reading-options" role="group" aria-label="找书方式">{[["ability", "按能力找书", "有想提升的能力"], ["list", "完整书单", "找书名或作者"], ["cover", "按封面浏览", "随意逛一逛"]].map(([id, name, detail]) => <button key={id} aria-pressed={readingView === id} onClick={() => setReadingView(id)}><strong>{name}</strong><span>{detail}</span></button>)}</div>
              <div className="rm-reading-guide" aria-live="polite">
                <Subheading>{readingView === "ability" ? "选一个想提升的能力，再打开一本书" : readingView === "list" ? "浏览书单，找到想读的书" : "点一张封面，打开书籍卡片"}</Subheading>
                <p>{software === "notion" ? (readingView === "ability" ? "展开「开始探索 101 本书」，点击「按能力找书」，选择你想提升的能力。还不知道读什么时，也可以展开首页的问题路径。" : readingView === "list" ? "展开「开始探索 101 本书」，点击「查看完整书单」，搜索书名或查看作者与分类。" : "展开「开始探索 101 本书」，打开封面浏览入口。点击一张感兴趣的封面，就能进入书籍卡片。") : (readingView === "ability" ? "左侧选择「书籍」，再切换到「按能力分类」。展开相关分类，选择一本书打开详情。" : readingView === "list" ? "左侧选择「书籍」，切换到「完整书单」，查看书名、作者与分类。" : "左侧选择「书籍」，切换到「封面浏览」，点击一张封面打开详情。手机上可以先展开视图下拉菜单。")}</p>
                <Screenshot src={software === "notion" ? "/read-guide/notion-paths.jpg" : "/read-guide/feishu-covers.jpg"} alt={software === "notion" ? "Notion 阅读地图的开始探索与问题路径入口" : "飞书阅读地图的封面浏览、完整书单与按能力分类视图"} caption="真实页面参考。先选一本，再读一张卡片即可。" />
              </div>
              <p>打开卡片后，先看看适不适合你、它解决什么问题，再读核心认知，选一个今天能尝试的小行动。</p>
            </Help>
          </>}

          <div className="rm-step-actions">
            {step > 0 ? <button className="rm-back" onClick={() => update({ step: step - 1 })}>← 上一步</button> : <span className="rm-action-hint">{device ? `已选择${deviceName}` : "先选择一个设备"}</span>}
            {step < 2 && <button className="rm-next" disabled={!ready} onClick={next}>{step === 0 ? "下一步：选软件" : "下一步：登录账号"}<span aria-hidden="true">→</span></button>}
            {step === 2 && <button className="rm-next" disabled={!ready} onClick={completeAccount}>我已登录，打开地图<span aria-hidden="true">→</span></button>}
            {step === 3 && <span className="rm-complete-label">随时可以开始阅读</span>}
          </div>
          {step === 2 && account && <p className="rm-small rm-confirm-note">请完成实际登录后再继续。本页不会读取你的账号或密码。</p>}
        </section>
        <p className="rm-save-note">{storageUnavailable ? "当前浏览器无法保存步骤，刷新后需要重新选择。" : "步骤会保存在当前浏览器，回来可以接着操作。"}</p>
      </div>
    </main>
    <footer className="rm-footer"><span>Chaologies · Chao</span><span>从一本书，走向一个小行动。</span></footer>
  </div>;
}
