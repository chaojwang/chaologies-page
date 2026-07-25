import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./life-in-weeks.css";

const MAX_YEARS = 90;
const WEEKS_PER_YEAR = 52;
const TOTAL_WEEKS = MAX_YEARS * WEEKS_PER_YEAR;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const JD_URL = "https://u.jd.com/9692ApQ";
const WALLPAPER_FORMATS = [
  { key: "phone", label: "手机", width: 1290, height: 2796 },
  { key: "ipad", label: "iPad", width: 2048, height: 2732 },
  { key: "desktop", label: "电脑", width: 2560, height: 1440 },
];

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function getWeeksFromBirthday(value) {
  if (!value) return null;
  const birthday = new Date(`${value}T12:00:00`);
  if (Number.isNaN(birthday.getTime()) || birthday > new Date()) return null;
  return Math.max(0, Math.min(TOTAL_WEEKS, Math.floor((Date.now() - birthday.getTime()) / WEEK_MS)));
}

function getWeeksFromAge(value) {
  const age = Number(value);
  if (!Number.isFinite(age) || age < 0 || age > 120) return null;
  return Math.max(0, Math.min(TOTAL_WEEKS, Math.floor(age * WEEKS_PER_YEAR)));
}

function drawWeekGrid(ctx, options) {
  const { x, y, width, elapsed, cellRadius = 3, gap: customGap } = options;
  const columns = WEEKS_PER_YEAR;
  const rows = MAX_YEARS;
  const gap = customGap ?? (width < 700 ? 3.4 : 5);
  const cell = (width - gap * (columns - 1)) / columns;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = row * columns + column;
      const px = x + column * (cell + gap);
      const py = y + row * (cell + gap);

      if (index < elapsed) {
        ctx.fillStyle = "#777065";
        roundedRect(ctx, px, py, cell, cell, Math.min(cellRadius, cell / 3));
        ctx.fill();
      } else if (index === elapsed && elapsed < TOTAL_WEEKS) {
        ctx.fillStyle = "#e4a11b";
        roundedRect(ctx, px - 1, py - 1, cell + 2, cell + 2, Math.min(cellRadius + 1, cell / 3));
        ctx.fill();
      } else {
        ctx.strokeStyle = "#d7d0c3";
        ctx.lineWidth = Math.max(1, cell * 0.08);
        roundedRect(ctx, px, py, cell, cell, Math.min(cellRadius, cell / 3));
        ctx.stroke();
      }
    }
  }

  return rows * cell + (rows - 1) * gap;
}

function drawLegend(ctx, x, y, size, gap, fontSize) {
  const items = [
    ["#777065", "已经走过", false],
    ["#e4a11b", "这一周", false],
    ["#d7d0c3", "还未到来", true],
  ];
  let currentX = x;
  items.forEach(([color, label, outlined]) => {
    if (outlined) {
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(1.5, size * .08);
      roundedRect(ctx, currentX, y, size, size, Math.max(3, size * .2));
      ctx.stroke();
    } else {
      ctx.fillStyle = color;
      roundedRect(ctx, currentX, y, size, size, Math.max(3, size * .2));
      ctx.fill();
    }
    ctx.fillStyle = "#8a8276";
    ctx.font = `500 ${fontSize}px "Noto Sans SC", sans-serif`;
    ctx.fillText(label, currentX + size + 12, y + size * .86);
    currentX += gap;
  });
}

function drawWallpaperFooter(ctx, width, height, left, right, fontSize) {
  ctx.fillStyle = "#8a8276";
  ctx.font = `500 ${fontSize}px "Noto Sans SC", sans-serif`;
  ctx.fillText("90 年 × 52 周的简化呈现，不是对寿命的预测。", left, height - 70);
  ctx.textAlign = "right";
  ctx.fillStyle = "#1c1915";
  ctx.font = `700 ${fontSize + 2}px "Noto Sans SC", sans-serif`;
  ctx.fillText("chaologies.com", right, height - 70);
  ctx.textAlign = "left";
}

function drawPhoneWallpaper(ctx, width, height, elapsed, intention) {
  const left = 74;
  const contentWidth = width - left * 2;
  const remaining = TOTAL_WEEKS - elapsed;

  ctx.fillStyle = "#c8881a";
  ctx.font = '700 24px "Noto Sans SC", sans-serif';
  ctx.fillText("人生周历 · LIFE IN WEEKS", left, 104);
  ctx.fillStyle = "#1c1915";
  ctx.font = '600 72px "Noto Serif SC", serif';
  ctx.fillText("把这一生，摊开来看。", left, 205);
  ctx.fillStyle = "#6b645b";
  ctx.font = '500 28px "Noto Sans SC", sans-serif';
  ctx.fillText(`已经走过 ${elapsed.toLocaleString("zh-CN")} 周`, left, 277);
  ctx.fillText(`按 90 年计算，约还有 ${remaining.toLocaleString("zh-CN")} 周`, left + 410, 277);
  drawLegend(ctx, left, 324, 24, 160, 20);

  const gridHeight = drawWeekGrid(ctx, { x: left, y: 408, width: contentWidth, elapsed, cellRadius: 4 });
  const noteY = 408 + gridHeight + 72;
  ctx.strokeStyle = "#ddd6ca";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(left, noteY);
  ctx.lineTo(width - left, noteY);
  ctx.stroke();
  ctx.fillStyle = "#1c1915";
  ctx.font = '600 34px "Noto Serif SC", serif';
  ctx.fillText((intention.trim() || "接下来的 52 周，我最不想再推迟什么？").slice(0, 28), left, noteY + 74);
  drawWallpaperFooter(ctx, width, height, left, width - left, 19);
}

function drawIpadWallpaper(ctx, width, height, elapsed, intention) {
  const left = 120;
  const remaining = TOTAL_WEEKS - elapsed;

  ctx.fillStyle = "#c8881a";
  ctx.font = '700 29px "Noto Sans SC", sans-serif';
  ctx.fillText("人生周历 · LIFE IN WEEKS", left, 118);
  ctx.fillStyle = "#1c1915";
  ctx.font = '600 94px "Noto Serif SC", serif';
  ctx.fillText("把这一生，摊开来看。", left, 245);
  ctx.fillStyle = "#6b645b";
  ctx.font = '500 34px "Noto Sans SC", sans-serif';
  ctx.fillText(`已经走过 ${elapsed.toLocaleString("zh-CN")} 周`, left, 330);
  ctx.fillText(`按 90 年计算，约还有 ${remaining.toLocaleString("zh-CN")} 周`, left + 535, 330);
  drawLegend(ctx, left, 387, 29, 200, 24);

  const gridWidth = 1100;
  const gridX = (width - gridWidth) / 2;
  const gridHeight = drawWeekGrid(ctx, { x: gridX, y: 490, width: gridWidth, elapsed, cellRadius: 4, gap: 4 });
  const noteY = 490 + gridHeight + 65;
  ctx.strokeStyle = "#ddd6ca";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(left, noteY);
  ctx.lineTo(width - left, noteY);
  ctx.stroke();
  ctx.fillStyle = "#1c1915";
  ctx.font = '600 42px "Noto Serif SC", serif';
  ctx.fillText((intention.trim() || "接下来的 52 周，我最不想再推迟什么？").slice(0, 28), left, noteY + 80);
  drawWallpaperFooter(ctx, width, height, left, width - left, 23);
}

function drawDesktopWallpaper(ctx, width, height, elapsed, intention) {
  const left = 140;
  const remaining = TOTAL_WEEKS - elapsed;
  const gridWidth = 720;
  const gridX = width - left - gridWidth;

  ctx.fillStyle = "#c8881a";
  ctx.font = '700 27px "Noto Sans SC", sans-serif';
  ctx.fillText("人生周历 · LIFE IN WEEKS", left, 132);
  ctx.fillStyle = "#1c1915";
  ctx.font = '600 104px "Noto Serif SC", serif';
  ctx.fillText("把这一生，", left, 285);
  ctx.fillText("摊开来看。", left, 405);

  ctx.fillStyle = "#6b645b";
  ctx.font = '500 34px "Noto Sans SC", sans-serif';
  ctx.fillText(`已经走过 ${elapsed.toLocaleString("zh-CN")} 周`, left, 510);
  ctx.fillText(`按 90 年计算，约还有 ${remaining.toLocaleString("zh-CN")} 周`, left, 566);
  drawLegend(ctx, left, 630, 27, 195, 22);

  ctx.strokeStyle = "#ddd6ca";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(left, 755);
  ctx.lineTo(1320, 755);
  ctx.stroke();
  ctx.fillStyle = "#1c1915";
  ctx.font = '600 48px "Noto Serif SC", serif';
  ctx.fillText((intention.trim() || "接下来的 52 周，").slice(0, 21), left, 850);
  if (!intention.trim()) ctx.fillText("我最不想再推迟什么？", left, 918);

  drawWeekGrid(ctx, { x: gridX, y: 82, width: gridWidth, elapsed, cellRadius: 3, gap: 2.6 });
  drawWallpaperFooter(ctx, width, height, left, width - left, 22);
}

function renderWallpaper(canvas, format, elapsed, intention = "") {
  const { width, height, key } = format;
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "#f5f2eb";
  ctx.fillRect(0, 0, width, height);

  if (key === "desktop") drawDesktopWallpaper(ctx, width, height, elapsed, intention);
  else if (key === "ipad") drawIpadWallpaper(ctx, width, height, elapsed, intention);
  else drawPhoneWallpaper(ctx, width, height, elapsed, intention);
}

function makeShareCard(elapsed) {
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = 1920;
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "#f5f2eb";
  ctx.fillRect(0, 0, width, height);

  const left = 76;
  ctx.fillStyle = "#c8881a";
  ctx.font = '700 21px "Noto Sans SC", sans-serif';
  ctx.fillText("人生周历 · LIFE IN WEEKS", left, 92);
  ctx.fillStyle = "#1c1915";
  ctx.font = '600 68px "Noto Serif SC", serif';
  ctx.fillText("把这一生，", left, 202);
  ctx.fillText("摊开来看。", left, 294);

  ctx.fillStyle = "#6b645b";
  ctx.font = '500 26px "Noto Sans SC", sans-serif';
  ctx.fillText(`我已经走过 ${elapsed.toLocaleString("zh-CN")} 周。`, left, 368);
  ctx.fillText("接下来的时间，你想留给什么？", left, 410);

  const gridWidth = 780;
  drawWeekGrid(ctx, {
    x: (width - gridWidth) / 2,
    y: 470,
    width: gridWidth,
    elapsed,
    cellRadius: 2,
    gap: 3,
  });

  ctx.fillStyle = "#1c1915";
  ctx.font = '700 22px "Noto Sans SC", sans-serif';
  ctx.fillText("生成你的人生周历", left, height - 94);
  ctx.textAlign = "right";
  ctx.fillStyle = "#8a8276";
  ctx.font = '500 20px "Noto Sans SC", sans-serif';
  ctx.fillText("chaologies.com", width - left, height - 94);
  ctx.textAlign = "left";
  return canvas;
}

function canvasBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

function ClaimModal({ onClose, onUnlocked }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function subscribe(event) {
    event.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "life-in-weeks" }),
      });
      if (!response.ok) throw new Error("subscribe failed");
      setState("success");
      window.setTimeout(() => onUnlocked("email"), 450);
    } catch {
      setState("error");
    }
  }

  return (
    <div className="liw-modal-backdrop" role="presentation" onClick={onClose}>
      <div className="liw-modal" role="dialog" aria-modal="true" aria-labelledby="liw-modal-title" onClick={(event) => event.stopPropagation()}>
        <button className="liw-modal-close" type="button" onClick={onClose} aria-label="关闭">×</button>
        <div className="liw-modal-head">
          <span>高清壁纸 · 免费领取</span>
          <h2 id="liw-modal-title">把这一生，放在每天都能看见的地方。</h2>
          <p>选择邮件或公众号，壁纸会马上保存到你的设备。</p>
        </div>
        <div className="liw-claim-options">
          <div className="liw-claim-email">
            <strong>邮件领取</strong>
            <form onSubmit={subscribe}>
              <label htmlFor="liw-email">你的邮件地址</label>
              <input id="liw-email" type="email" required autoComplete="email" placeholder="name@example.com" value={email} onChange={(event) => { setEmail(event.target.value); setState("idle"); }} />
              <button type="submit" disabled={state === "loading" || state === "success"}>
                {state === "loading" ? "正在订阅…" : state === "success" ? "订阅成功，正在保存" : "订阅并保存壁纸"}
              </button>
              {state === "error" && <p className="liw-form-error">暂时没有提交成功，请稍后再试。</p>}
            </form>
            <small>每月两篇，关于生活、金钱和好书。随时退订。</small>
          </div>
          <div className="liw-claim-divider"><span>或</span></div>
          <div className="liw-claim-wechat">
            <strong>微信公众号</strong>
            <img src="/wechat-qr.png" alt="Chaologies 超说微信公众号二维码" />
            <p>扫码关注「Chaologies 超说」<br />回复关键词「四千周」</p>
            <button type="button" onClick={() => onUnlocked("wechat")}>我已关注，保存壁纸</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LifeInWeeksPage({ onBack }) {
  const canvasRef = useRef(null);
  const pendingDownload = useRef(false);
  const [mode, setMode] = useState("birthday");
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState("");
  const [elapsed, setElapsed] = useState(null);
  const [intention, setIntention] = useState("");
  const [error, setError] = useState("");
  const [claimOpen, setClaimOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [downloadUnlocked, setDownloadUnlocked] = useState(() => window.localStorage.getItem("liw-download-unlocked") === "1");
  const [shareState, setShareState] = useState("idle");
  const [formatKey, setFormatKey] = useState("phone");

  const remaining = useMemo(() => elapsed === null ? null : TOTAL_WEEKS - elapsed, [elapsed]);
  const format = useMemo(() => WALLPAPER_FORMATS.find((item) => item.key === formatKey) || WALLPAPER_FORMATS[0], [formatKey]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "人生周历｜把这一生摊开来看 · Chaologies";
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") || "";
    meta?.setAttribute("content", "输入生日，看看你已经走过多少周，并生成一张属于自己的人生周历壁纸。");
    const socialMeta = [
      ["property", "og:title", "把这一生，摊开来看。｜人生周历"],
      ["property", "og:description", "输入生日，看看你已经走过多少周，并生成一张属于自己的人生周历壁纸。"],
      ["property", "og:image", `${window.location.origin}/life-in-weeks-og.png`],
      ["property", "og:url", `${window.location.origin}/life-in-weeks`],
      ["name", "twitter:card", "summary_large_image"],
    ].map(([attribute, key, content]) => {
      let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
      const created = !node;
      const previous = node?.getAttribute("content") || "";
      if (!node) {
        node = document.createElement("meta");
        node.setAttribute(attribute, key);
        document.head.appendChild(node);
      }
      node.setAttribute("content", content);
      return { node, created, previous };
    });
    return () => {
      document.title = previousTitle;
      meta?.setAttribute("content", previousDescription);
      socialMeta.forEach(({ node, created, previous }) => {
        if (created) node.remove();
        else node.setAttribute("content", previous);
      });
    };
  }, []);

  useEffect(() => {
    if (elapsed === null || !canvasRef.current) return;
    const render = () => renderWallpaper(canvasRef.current, format, elapsed, intention);
    if (document.fonts?.ready) void document.fonts.ready.then(render);
    else render();
  }, [elapsed, intention, format]);

  const calculate = (event) => {
    event.preventDefault();
    const value = mode === "birthday" ? getWeeksFromBirthday(birthday) : getWeeksFromAge(age);
    if (value === null) {
      setError(mode === "birthday" ? "请填写一个有效的生日。" : "请输入 0 到 120 之间的年龄。");
      return;
    }
    setElapsed(value);
    setError("");
    setDownloaded(false);
    window.setTimeout(() => document.getElementById("life-weeks-result")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const saveWallpaper = useCallback(async () => {
    if (!canvasRef.current || elapsed === null) return;
    const blob = await canvasBlob(canvasRef.current);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `我的人生周历-${format.key}-${format.width}x${format.height}.png`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  }, [elapsed, format]);

  const requestDownload = () => {
    if (downloadUnlocked) {
      void saveWallpaper();
      return;
    }
    pendingDownload.current = true;
    setClaimOpen(true);
  };

  const unlockDownload = async () => {
    window.localStorage.setItem("liw-download-unlocked", "1");
    setDownloadUnlocked(true);
    setClaimOpen(false);
    if (pendingDownload.current) {
      pendingDownload.current = false;
      await saveWallpaper();
    }
  };

  const share = useCallback(async () => {
    if (elapsed === null) return;
    const shareCanvas = makeShareCard(elapsed);
    const blob = await canvasBlob(shareCanvas);
    const file = blob ? new File([blob], "我的人生周历.png", { type: "image/png" }) : null;
    const shareData = {
      title: "把这一生，摊开来看",
      text: `我已经走过 ${elapsed.toLocaleString("zh-CN")} 周。你也来生成自己的人生周历。`,
      url: `${window.location.origin}/life-in-weeks`,
    };

    try {
      if (navigator.share) {
        if (file && navigator.canShare?.({ files: [file] })) await navigator.share({ ...shareData, files: [file] });
        else await navigator.share(shareData);
        setShareState("shared");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareState("copied");
      }
    } catch (event) {
      if (event?.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(shareData.url);
          setShareState("copied");
        } catch {
          setShareState("error");
        }
      }
    }
    window.setTimeout(() => setShareState("idle"), 2200);
  }, [elapsed]);

  return (
    <main className="liw-page">
      <header className="liw-nav">
        <button type="button" className="liw-logo" onClick={onBack} aria-label="返回首页">
          <img src="/logo.png?v=3" alt="Chaologies" />
        </button>
        <span><i />生日只在本机计算，不会保存</span>
      </header>

      <section className="liw-hero">
        <div className="liw-hero-copy">
          <p className="liw-eyebrow">人生周历 · 免费生成</p>
          <h1>把这一生，<br />摊开来看。</h1>
          <p className="liw-intro">输入生日，看看你已经走过多少周。<br />也看看，接下来的时间想留给什么。</p>

          <form className="liw-calc" onSubmit={calculate}>
            <div className="liw-mode" role="tablist" aria-label="输入方式">
              <button type="button" role="tab" aria-selected={mode === "birthday"} className={mode === "birthday" ? "active" : ""} onClick={() => { setMode("birthday"); setError(""); }}>输入生日</button>
              <button type="button" role="tab" aria-selected={mode === "age"} className={mode === "age" ? "active" : ""} onClick={() => { setMode("age"); setError(""); }}>只记得年龄</button>
            </div>
            <div className="liw-calc-row">
              {mode === "birthday" ? (
                <label><span>你的生日</span><input type="date" required max={new Date().toISOString().slice(0, 10)} value={birthday} onChange={(event) => setBirthday(event.target.value)} /></label>
              ) : (
                <label><span>你的年龄</span><input type="number" required min="0" max="120" inputMode="numeric" placeholder="例如：40" value={age} onChange={(event) => setAge(event.target.value)} /></label>
              )}
              <button type="submit">看看我的人生周历 <span>↓</span></button>
            </div>
            {error && <p className="liw-error" role="alert">{error}</p>}
          </form>
        </div>

        <div className="liw-hero-visual" aria-hidden="true">
          <div className="liw-sample-grid" />
          <span className="liw-now-dot" />
          <p>90 年 · 4,680 周</p>
        </div>
      </section>

      {elapsed !== null && (
        <section className="liw-result" id="life-weeks-result">
          <div className="liw-result-copy">
            <p className="liw-eyebrow">你的人生周历</p>
            <div className="liw-numbers">
              <div><strong>{elapsed.toLocaleString("zh-CN")}</strong><span>周，已经走过</span></div>
              <div><strong>{remaining.toLocaleString("zh-CN")}</strong><span>周，约在前面</span></div>
            </div>
            <p className="liw-result-note">按 90 年 × 52 周简化计算。这是一张用来理解时间的图，不是对寿命的预测。</p>

            <label className="liw-intention">
              <span>接下来的 52 周，你最不想再推迟什么？</span>
              <input type="text" maxLength="28" placeholder="可以不填，也可以留一句给自己" value={intention} onChange={(event) => setIntention(event.target.value)} />
            </label>

            <div className="liw-format-tabs" role="tablist" aria-label="壁纸尺寸">
              {WALLPAPER_FORMATS.map((item) => (
                <button key={item.key} type="button" role="tab" aria-selected={formatKey === item.key} className={formatKey === item.key ? "active" : ""} onClick={() => { setFormatKey(item.key); setDownloaded(false); }}>
                  <span>{item.label}</span><small>{item.width} × {item.height}</small>
                </button>
              ))}
            </div>

            <div className="liw-actions">
              <button type="button" className="liw-primary" onClick={requestDownload}>{downloaded ? "再保存一张" : `保存${format.label}壁纸`}<span>↓</span></button>
              <button type="button" className="liw-secondary" onClick={share}>{shareState === "copied" ? "链接已复制" : shareState === "shared" ? "已打开分享" : shareState === "error" ? "请复制页面链接" : "送给一个在乎的人"}<span>↗</span></button>
            </div>
          </div>

          <div className={`liw-wallpaper-preview is-${format.key}`}>
            {format.key === "phone" && <div className="liw-phone-speaker" aria-hidden="true" />}
            <canvas ref={canvasRef} aria-label={`人生周历壁纸：已经走过 ${elapsed} 周，约剩余 ${remaining} 周`} />
          </div>
        </section>
      )}

      <section className="liw-reflection">
        <div>
          <p className="liw-eyebrow">为什么要把人生画成一格一格？</p>
          <h2>有些事，不必等到“有空的时候”。</h2>
        </div>
        <p>看到这些格子，不是为了催自己更忙。只是当时间不再是一个模糊的“以后”，我们会更清楚，哪些事值得留下位置。</p>
      </section>

      <section className="liw-book">
        <div className="liw-book-cover">
          <img src="/four-thousand-weeks.webp" alt="《四千周》中文版封面" />
        </div>
        <div className="liw-book-copy">
          <p className="liw-eyebrow">这个页面的灵感</p>
          <h2>《四千周》</h2>
          <p>我们总觉得，只要再高效一点，就能把所有事情安排妥当。这本书谈的是另一件事：承认做不完，然后认真选择。</p>
          <a href={JD_URL} target="_blank" rel="noopener noreferrer sponsored">去京东看看这本书 <span>↗</span></a>
          <small>通过这个链接购买，我可能获得少量佣金，不影响你的购买价格。</small>
        </div>
      </section>

      <footer className="liw-footer">
        <button type="button" onClick={onBack}><img src="/logo.png?v=3" alt="返回 Chaologies 首页" /></button>
        <p>人生周历 · 免费工具<br /><span>chaologies.com</span></p>
      </footer>

      {claimOpen && <ClaimModal onClose={() => { pendingDownload.current = false; setClaimOpen(false); }} onUnlocked={unlockDownload} />}
    </main>
  );
}
