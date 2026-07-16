import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./weekly-focus.css";

const COPY = {
  zh: {
    back: "返回首页",
    privacy: "仅在本机生成 · 不保存内容",
    eyebrow: "THE MINIMALIST WEEKLY SYSTEM",
    title1: "把重要的事，",
    title2: "留在眼前。",
    intro: "用三分钟想清楚这一周，再把答案做成一张每天都能看到的壁纸。",
    start: "开始制作",
    step1: "01 · 想清楚",
    formTitle: "这周，什么真正重要？",
    formIntro: "不要写满。只留下你愿意保护时间去完成的三件事。",
    weeklyLabel: "本周最重要的三件事",
    itemPlaceholder: "本周重要事项",
    todayLabel: "今天先做哪一件？",
    todayPlaceholder: "今天先完成……",
    reminderLabel: "本周提醒",
    refresh: "换一句",
    quoteNote: "可以直接修改。提醒语为原创表达，不使用未经核实的名人名言。",
    step2: "02 · 带在身边",
    previewTitle: "你的 Weekly Focus",
    live: "即时预览",
    lock: "手机锁屏",
    home: "手机桌面",
    desktop: "电脑桌面",
    exportNote: "高清导出 · 适合直接设为壁纸",
    export: "导出 PNG",
    exported: "已导出",
    todayCard: "今天先做这一件",
    defaultToday: "从最重要的那件事开始",
    productEyebrow: "想把这一周真正安排下来？",
    productTitle: "壁纸负责提醒你，完整系统帮你把事情放进一周。",
    productCopy: "用 Parking Lot 收住杂事，用每周看板安排任务，再看清时间和精力到底花在了哪里。",
    productButton: "了解极简每周效率系统",
    productFine: "Notion 模板 · 每周一次 · 每次十分钟",
    resetEyebrow: "A SMALL WEEKLY RESET",
    resetTitle1: "计划不是把一周塞满。",
    resetTitle2: "是先替重要的事留位置。",
    r1t: "选出三件事",
    r1b: "它们值得你在这一周主动保护时间。",
    r2t: "决定今天先做什么",
    r2b: "让注意力回到眼前，而不是同时追赶所有事情。",
    r3t: "放在每天都能看见的地方",
    r3b: "锁屏不是提醒你更忙，而是提醒你别走偏。",
  },
  en: {
    back: "Back home",
    privacy: "Created locally · Nothing is saved",
    eyebrow: "THE MINIMALIST WEEKLY SYSTEM",
    title1: "Keep what matters",
    title2: "in sight.",
    intro: "Take three minutes to clarify your week, then turn it into a wallpaper you see every day.",
    start: "Make yours",
    step1: "01 · GET CLEAR",
    formTitle: "What truly matters this week?",
    formIntro: "Don't fill the week. Keep only three things worth protecting time for.",
    weeklyLabel: "Your three priorities this week",
    itemPlaceholder: "Weekly priority",
    todayLabel: "What will you do first today?",
    todayPlaceholder: "Start today with…",
    reminderLabel: "Weekly reminder",
    refresh: "Another one",
    quoteNote: "Edit it freely. These reminders are original, not unverified internet quotes.",
    step2: "02 · KEEP IT CLOSE",
    previewTitle: "Your Weekly Focus",
    live: "Live preview",
    lock: "Lock screen",
    home: "Home screen",
    desktop: "Desktop",
    exportNote: "High-resolution · Ready to use",
    export: "Export PNG",
    exported: "Exported",
    todayCard: "Do this first today",
    defaultToday: "Start with the thing that matters most",
    productEyebrow: "WANT TO PLAN THE WHOLE WEEK?",
    productTitle: "The wallpaper keeps it visible. The full system gives it a place in your week.",
    productCopy: "Capture loose tasks, arrange the week, and see where your time and energy actually go.",
    productButton: "Explore the Minimal Weekly System",
    productFine: "Notion template · Once a week · Ten minutes",
    resetEyebrow: "A SMALL WEEKLY RESET",
    resetTitle1: "Planning isn't filling the week.",
    resetTitle2: "It's protecting space for what matters.",
    r1t: "Choose three things",
    r1b: "They are worth protecting time for this week.",
    r2t: "Decide what comes first today",
    r2b: "Bring your attention back to the next meaningful action.",
    r3t: "Put it where you can see it",
    r3b: "Your lock screen isn't there to make you busier. It's there to keep you on course.",
  },
};

const FORMATS = [
  { key: "lock", english: "Lock Screen", width: 1290, height: 2796 },
  { key: "home", english: "Home Screen", width: 1290, height: 2796 },
  { key: "desktop", english: "Desktop", width: 2560, height: 1440 },
];

const REMINDERS = {
  zh: [
    "不是把一周塞满，而是把重要的事留下来。",
    "先完成真正重要的，再回应世界的噪音。",
    "这一周不需要完美，只需要有方向。",
    "少做一点，让真正重要的事被看见。",
    "今天向前一步，就已经在改变这一周。",
    "把注意力给出去之前，先决定它属于哪里。",
    "忙碌不是目标，把时间用在对的地方才是。",
    "允许有些事等一等，重要的事才有空间发生。",
    "清晰不是知道所有答案，而是知道下一步。",
    "你不需要更多时间，只需要更少的优先级。",
    "先做今天的这一件，其他事情会慢慢归位。",
    "计划不是控制未来，而是保护你真正想做的事。",
  ],
  en: [
    "A good week isn't full. It has room for what matters.",
    "Do the meaningful work before answering the noise.",
    "This week doesn't need to be perfect. It needs a direction.",
    "Do a little less, so the important work can be seen.",
    "One honest step today can change the shape of the week.",
    "Clarity isn't every answer. It's knowing the next step.",
  ],
};

const DEFAULTS = {
  zh: ["完成本周最重要的创作", "留出两次不被打扰的深度工作", "好好运动，也好好休息"],
  en: ["Finish this week's most important work", "Protect two blocks for deep work", "Move well and rest well"],
};

const COLORS = {
  ink: "#1c1915",
  muted: "#6b645b",
  paper: "#f8f4eb",
  cream: "#f7eacf",
  coral: "#f4845f",
  yellow: "#f5c842",
  teal: "#78cbd3",
  mint: "#dbe8dc",
  white: "#fffdf8",
};

function roundedRect(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

function textLines(context, text, maxWidth, maxLines) {
  const source = text.trim();
  if (!source) return [];
  const tokens = source.includes(" ") ? source.split(/(\s+)/) : Array.from(source);
  const lines = [];
  let current = "";

  tokens.forEach((token) => {
    const trial = current + token;
    if (context.measureText(trial).width > maxWidth && current.trim()) {
      lines.push(current.trim());
      current = token.trimStart();
    } else {
      current = trial;
    }
  });
  if (current.trim()) lines.push(current.trim());

  const visible = lines.slice(0, maxLines);
  if (lines.length > maxLines && visible.length) {
    let last = visible[visible.length - 1];
    while (context.measureText(`${last}…`).width > maxWidth && last.length) last = last.slice(0, -1);
    visible[visible.length - 1] = `${last}…`;
  }
  return visible;
}

function drawWrappedText(context, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const lines = textLines(context, text, maxWidth, maxLines);
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
  return lines.length * lineHeight;
}

function drawFlower(context, x, y, size) {
  context.save();
  context.translate(x, y);
  context.fillStyle = COLORS.coral;
  for (let i = 0; i < 6; i += 1) {
    context.save();
    context.rotate((Math.PI * 2 * i) / 6);
    context.beginPath();
    context.ellipse(0, -size * 0.38, size * 0.25, size * 0.42, 0, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
  context.fillStyle = COLORS.yellow;
  context.beginPath();
  context.arc(0, 0, size * 0.23, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function drawWallpaper(canvas, format, focusItems, today, reminder, lang, c) {
  const context = canvas.getContext("2d");
  if (!context) return;
  const { width, height, key } = format;
  const desktop = key === "desktop";
  const scale = desktop ? width / 2560 : width / 1290;
  const font = lang === "zh"
    ? '"PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif'
    : 'Inter, Arial, sans-serif';

  canvas.width = width;
  canvas.height = height;
  context.clearRect(0, 0, width, height);
  context.fillStyle = COLORS.paper;
  context.fillRect(0, 0, width, height);

  context.fillStyle = COLORS.mint;
  context.beginPath();
  context.arc(desktop ? width * 0.9 : width * 0.87, desktop ? height * 0.13 : height * 0.09, desktop ? 330 : 245, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = COLORS.cream;
  context.beginPath();
  context.arc(desktop ? width * 0.06 : width * 0.06, desktop ? height * 0.91 : height * 0.92, desktop ? 310 : 250, 0, Math.PI * 2);
  context.fill();

  if (desktop) {
    drawDesktop(context, width, height, focusItems, today, reminder, font, scale, c);
  } else {
    drawPhone(context, width, height, key, focusItems, today, reminder, font, scale, c);
  }
}

function drawPhone(context, width, height, key, focusItems, today, reminder, font, scale, c) {
  const margin = 92 * scale;
  const startY = key === "lock" ? 720 * scale : 470 * scale;
  const cardWidth = width - margin * 2;
  const focus = focusItems.map((item) => item.trim()).filter(Boolean);

  context.fillStyle = COLORS.muted;
  context.font = `600 ${29 * scale}px ${font}`;
  context.fillText("WEEKLY FOCUS", margin, startY - 120 * scale);
  context.fillStyle = COLORS.ink;
  context.font = `700 ${68 * scale}px ${font}`;
  context.fillText(c.title1, margin, startY - 36 * scale);
  context.fillText(c.title2, margin, startY + 52 * scale);

  const cardY = startY + 130 * scale;
  context.fillStyle = COLORS.white;
  roundedRect(context, margin, cardY, cardWidth, 720 * scale, 48 * scale);
  context.fill();
  context.fillStyle = COLORS.muted;
  context.font = `600 ${28 * scale}px ${font}`;
  context.fillText(c.weeklyLabel, margin + 56 * scale, cardY + 72 * scale);

  let itemY = cardY + 146 * scale;
  focus.slice(0, 3).forEach((item, index) => {
    context.fillStyle = [COLORS.coral, COLORS.teal, COLORS.yellow][index];
    context.beginPath();
    context.arc(margin + 74 * scale, itemY + 18 * scale, 18 * scale, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = COLORS.ink;
    context.font = `600 ${38 * scale}px ${font}`;
    const usedHeight = drawWrappedText(context, item, margin + 120 * scale, itemY + 30 * scale, cardWidth - 190 * scale, 53 * scale, 2);
    itemY += Math.max(150 * scale, usedHeight + 70 * scale);
  });

  const todayY = cardY + 775 * scale;
  context.fillStyle = COLORS.coral;
  roundedRect(context, margin, todayY, cardWidth, 300 * scale, 48 * scale);
  context.fill();
  context.fillStyle = "#fffaf2";
  context.font = `600 ${27 * scale}px ${font}`;
  context.fillText(c.todayCard, margin + 56 * scale, todayY + 67 * scale);
  context.font = `700 ${47 * scale}px ${font}`;
  drawWrappedText(context, today.trim() || c.defaultToday, margin + 56 * scale, todayY + 145 * scale, cardWidth - 112 * scale, 64 * scale, 2);

  const quoteY = todayY + 400 * scale;
  drawFlower(context, width - margin - 62 * scale, quoteY - 6 * scale, 70 * scale);
  context.fillStyle = COLORS.muted;
  context.font = `500 ${30 * scale}px ${font}`;
  drawWrappedText(context, reminder, margin, quoteY, cardWidth - 160 * scale, 46 * scale, 3);
  context.globalAlpha = 0.72;
  context.font = `500 ${22 * scale}px ${font}`;
  context.fillText("CHAOLOGIES · THE MINIMALIST WEEKLY SYSTEM", margin, height - 100 * scale);
  context.globalAlpha = 1;
}

function drawDesktop(context, width, height, focusItems, today, reminder, font, scale, c) {
  const margin = 150 * scale;
  const leftWidth = 870 * scale;
  const rightX = 1230 * scale;
  const rightWidth = width - rightX - margin;
  const focus = focusItems.map((item) => item.trim()).filter(Boolean);

  context.fillStyle = COLORS.muted;
  context.font = `600 ${26 * scale}px ${font}`;
  context.fillText("WEEKLY FOCUS", margin, 175 * scale);
  context.fillStyle = COLORS.ink;
  context.font = `700 ${75 * scale}px ${font}`;
  context.fillText(c.title1, margin, 285 * scale);
  context.fillText(c.title2, margin, 382 * scale);

  context.fillStyle = COLORS.coral;
  roundedRect(context, margin, 470 * scale, leftWidth, 370 * scale, 54 * scale);
  context.fill();
  context.fillStyle = "#fffaf2";
  context.font = `600 ${26 * scale}px ${font}`;
  context.fillText(c.todayCard, margin + 56 * scale, 550 * scale);
  context.font = `700 ${49 * scale}px ${font}`;
  drawWrappedText(context, today.trim() || c.defaultToday, margin + 56 * scale, 645 * scale, leftWidth - 112 * scale, 68 * scale, 2);

  drawFlower(context, margin + 50 * scale, 1010 * scale, 74 * scale);
  context.fillStyle = COLORS.muted;
  context.font = `500 ${30 * scale}px ${font}`;
  drawWrappedText(context, reminder, margin + 115 * scale, 1005 * scale, leftWidth - 120 * scale, 48 * scale, 3);

  context.fillStyle = COLORS.white;
  roundedRect(context, rightX, 170 * scale, rightWidth, 1040 * scale, 64 * scale);
  context.fill();
  context.fillStyle = COLORS.muted;
  context.font = `600 ${28 * scale}px ${font}`;
  context.fillText(c.weeklyLabel, rightX + 72 * scale, 280 * scale);

  let itemY = 390 * scale;
  focus.slice(0, 3).forEach((item, index) => {
    context.fillStyle = [COLORS.coral, COLORS.teal, COLORS.yellow][index];
    roundedRect(context, rightX + 72 * scale, itemY - 40 * scale, 62 * scale, 62 * scale, 18 * scale);
    context.fill();
    context.fillStyle = COLORS.ink;
    context.font = `600 ${40 * scale}px ${font}`;
    const usedHeight = drawWrappedText(context, item, rightX + 170 * scale, itemY + 5 * scale, rightWidth - 250 * scale, 58 * scale, 3);
    itemY += Math.max(240 * scale, usedHeight + 100 * scale);
  });

  context.globalAlpha = 0.72;
  context.fillStyle = COLORS.muted;
  context.font = `500 ${21 * scale}px ${font}`;
  context.fillText("CHAOLOGIES · THE MINIMALIST WEEKLY SYSTEM", margin, height - 84 * scale);
  context.globalAlpha = 1;
}

export default function WeeklyFocusPage({ lang = "zh", setLang, onBack, onNavigate }) {
  const c = COPY[lang];
  const canvasRef = useRef(null);
  const [focusItems, setFocusItems] = useState(DEFAULTS[lang]);
  const [today, setToday] = useState(DEFAULTS[lang][0]);
  const [reminderIndex, setReminderIndex] = useState(0);
  const [reminder, setReminder] = useState(REMINDERS[lang][0]);
  const [formatKey, setFormatKey] = useState("lock");
  const [downloadState, setDownloadState] = useState("idle");
  const format = useMemo(() => FORMATS.find((item) => item.key === formatKey) || FORMATS[0], [formatKey]);

  useEffect(() => {
    const render = () => {
      if (canvasRef.current) drawWallpaper(canvasRef.current, format, focusItems, today, reminder, lang, c);
    };
    if (document.fonts?.ready) void document.fonts.ready.then(render);
    else render();
  }, [format, focusItems, today, reminder, lang, c]);

  const updateFocus = useCallback((index, value) => {
    setFocusItems((items) => items.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }, []);

  const refreshReminder = useCallback(() => {
    const list = REMINDERS[lang];
    const next = (reminderIndex + 1 + Math.floor(Math.random() * Math.max(1, list.length - 1))) % list.length;
    setReminderIndex(next);
    setReminder(list[next]);
  }, [lang, reminderIndex]);

  const switchLanguage = (nextLang) => {
    setLang(nextLang);
    if (focusItems.every((item) => DEFAULTS[lang].includes(item))) {
      setFocusItems(DEFAULTS[nextLang]);
      setToday(DEFAULTS[nextLang][0]);
      setReminder(REMINDERS[nextLang][0]);
      setReminderIndex(0);
    }
  };

  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `weekly-focus-${format.key}-${format.width}x${format.height}.png`;
      link.click();
      URL.revokeObjectURL(url);
      setDownloadState("done");
      window.setTimeout(() => setDownloadState("idle"), 1800);
    }, "image/png");
  }, [format]);

  return (
    <div className="wf-page">
      <header className="wf-nav">
        <button className="wf-brand" type="button" onClick={onBack} aria-label={c.back}>
          <img src="/logo.png?v=3" alt="Chaologies" />
        </button>
        <div className="wf-nav-right">
          <span className="wf-privacy"><i />{c.privacy}</span>
          <div className="wf-lang">
            <button className={lang === "en" ? "on" : ""} onClick={() => switchLanguage("en")}>EN</button>
            <button className={lang === "zh" ? "on" : ""} onClick={() => switchLanguage("zh")}>中</button>
          </div>
        </div>
      </header>

      <section className="wf-hero" id="weekly-focus-top">
        <div className="wf-eyebrow">{c.eyebrow}</div>
        <h1>{c.title1}<br />{c.title2}</h1>
        <p>{c.intro}</p>
        <a href="#weekly-focus-generator" className="wf-text-link">{c.start}<span>↓</span></a>
        <div className="wf-orbit wf-orbit-one" aria-hidden="true" />
        <div className="wf-orbit wf-orbit-two" aria-hidden="true" />
        <div className="wf-sun" aria-hidden="true"><span /></div>
      </section>

      <section className="wf-generator" id="weekly-focus-generator">
        <div className="wf-form-column">
          <span className="wf-step-label">{c.step1}</span>
          <h2>{c.formTitle}</h2>
          <p className="wf-section-intro">{c.formIntro}</p>

          <div className="wf-field-stack">
            {focusItems.map((item, index) => (
              <label className="wf-focus-field" key={index}>
                <span className={`wf-number wf-number-${index + 1}`}>{index + 1}</span>
                <span className="wf-sr-only">{c.itemPlaceholder} {index + 1}</span>
                <input value={item} onChange={(event) => updateFocus(index, event.target.value)} maxLength={42} placeholder={`${c.itemPlaceholder} ${index + 1}`} />
              </label>
            ))}
          </div>

          <label className="wf-text-field">
            <span className="wf-field-label">{c.todayLabel}</span>
            <input value={today} onChange={(event) => setToday(event.target.value)} maxLength={50} placeholder={c.todayPlaceholder} />
          </label>

          <div className="wf-quote-editor">
            <div className="wf-quote-heading">
              <span className="wf-field-label">{c.reminderLabel}</span>
              <button type="button" onClick={refreshReminder}><span>↻</span>{c.refresh}</button>
            </div>
            <textarea value={reminder} onChange={(event) => setReminder(event.target.value)} maxLength={90} rows={3} aria-label={c.reminderLabel} />
            <p>{c.quoteNote}</p>
          </div>
        </div>

        <div className="wf-preview-panel">
          <div className="wf-preview-heading">
            <div><span className="wf-step-label">{c.step2}</span><h2>{c.previewTitle}</h2></div>
            <span className="wf-live"><i />{c.live}</span>
          </div>
          <div className="wf-format-tabs" role="tablist" aria-label="Wallpaper size">
            {FORMATS.map((item) => (
              <button key={item.key} type="button" role="tab" aria-selected={formatKey === item.key} className={formatKey === item.key ? "active" : ""} onClick={() => setFormatKey(item.key)}>
                <span>{c[item.key]}</span><small>{item.english}</small>
              </button>
            ))}
          </div>
          <div className={`wf-canvas-shell ${formatKey === "desktop" ? "is-desktop" : "is-phone"}`}>
            <canvas ref={canvasRef} aria-label={`${c[formatKey]} wallpaper preview`} />
          </div>
          <div className="wf-download-row">
            <div><strong>{format.width} × {format.height} PNG</strong><span>{c.exportNote}</span></div>
            <button className="wf-download" type="button" onClick={download}>
              {downloadState === "done" ? c.exported : c.export}<span>{downloadState === "done" ? "✓" : "↓"}</span>
            </button>
          </div>
          <button className={`wf-product-inline ${downloadState === "done" ? "is-ready" : ""}`} type="button" onClick={() => onNavigate("/notion-weekly")}>
            <span>{c.productEyebrow}</span><strong>{c.productButton}</strong><i>→</i>
          </button>
        </div>
      </section>

      <section className="wf-product-bridge">
        <div className="wf-product-shape" aria-hidden="true"><span>1</span><span>2</span><span>3</span></div>
        <div>
          <span className="wf-step-label">{c.productEyebrow}</span>
          <h2>{c.productTitle}</h2>
          <p>{c.productCopy}</p>
          <button type="button" onClick={() => onNavigate("/notion-weekly")}>{c.productButton}<span>→</span></button>
          <small>{c.productFine}</small>
        </div>
      </section>

      <section className="wf-reset">
        <div><span className="wf-step-label">{c.resetEyebrow}</span><h2>{c.resetTitle1}<br />{c.resetTitle2}</h2></div>
        <ol>
          {[[c.r1t, c.r1b], [c.r2t, c.r2b], [c.r3t, c.r3b]].map(([title, body], index) => (
            <li key={title}><span>{index + 1}</span><div><strong>{title}</strong><p>{body}</p></div></li>
          ))}
        </ol>
      </section>

      <footer className="wf-footer">
        <button type="button" onClick={onBack}><img src="/logo.png" alt="Chaologies" /></button>
        <span>Weekly Focus Wallpaper Generator · Free tool</span>
      </footer>
    </div>
  );
}
