import React, { useState, useMemo, useEffect, useRef } from "react";

/**
 * 50/30/20 Intentional Budget Tool
 * Chaologies (超说) — full product component
 *
 * Mirrors Chao's spreadsheet: Income / Needs / Savings & Investments / Wants,
 * each with editable line items + custom rows, year & month, bilingual (中/EN),
 * currency ($/¥). Adds plain-language insights and Excel / PDF / wallpaper export.
 *
 * Brand tokens: Space Grotesk + Noto Sans SC, single accent Coral #FF6040
 * (reserved for the Savings/Future tier so the color carries the thesis).
 *
 * Self-contained styles. Export libs (SheetJS / jsPDF) load on demand from CDN,
 * with CSV / PNG fallbacks; wallpaper + PDF render via native canvas.
 *
 * Note: data is not persisted — refreshing clears it. Export to keep a copy.
 */

// ─── i18n ────────────────────────────────────────────────────────────
const T = {
  zh: {
    eyebrow: "50 / 30 / 20 预算工具",
    title: "把每一笔填进去，看清楚你的钱。",
    sub: "收入和支出按真实情况填。算出来不是 50/30/20 也很正常——重点是先看见，再慢慢调。",
    income: "收入",
    needs: "必要",
    savings: "储蓄与投资",
    wants: "想要",
    needsPctLabel: "必要 50%",
    savingsPctLabel: "储蓄 20%",
    wantsPctLabel: "想要 30%",
    addRow: "+ 加一项",
    customPlaceholder: "自定义名称",
    total: "合计",
    summaryTitle: "本月总览",
    incomeTotal: "总收入",
    spendTotal: "已分配",
    leftLabel: "还没分配",
    overLabel: "超支了",
    allocatedOk: "刚好分配完，漂亮。",
    leftHint: "别让它留在日常账户里慢慢消失——划给未来。",
    overHint: "支出超过收入了。先看必要和想要，哪些「必要」其实是过去的选择。",
    youVsTarget: "你的实况 vs 50/30/20",
    you: "你",
    target: "建议",
    floorTitle: "财务底线",
    floorSub: "维持现在这套生活，每月最低需要",
    perMonth: "/ 月",
    fundTitle: "应急金跑道",
    fundInputLabel: "现有应急金存量",
    fundInputHint: "你随时能动用、专门留着的那笔（不是本月存入额）",
    fundSub: "万一收入停了，你能撑",
    months: "个月",
    month: "个月",
    donutCenter: "储蓄率",
    insightsTitle: "给你的几条建议",
    flowTitle: "钱的流向",
    exportTitle: "导出 / 保存",
    exportNote: "数据不会被自动保存，记得导出留底。",
    exportExcel: "Excel 表格",
    exportPDF: "PDF 报告",
    exportWallDesktop: "壁纸 · 电脑",
    exportWallPhone: "壁纸 · 手机",
    exporting: "生成中…",
    yearLabel: "年",
    monthLabel: "月",
    emptyHint: "在左边填入收入和至少一项支出，这里就会变成你自己的实况。",
    demoTag: "示例预览",
    demoMessy: "很多人一开始是这样：钱花完了，没给未来留多少。",
    demoIdeal: "把 20% 先分给未来，画面就稳了——这就是这个表帮你做的事。",
    builtBy: "Chaologies · 超说",
    wallTagline: "看清楚，才管得住。",
    months_arr: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
    runwayState: {
      danger: "还很薄，先补起来",
      start: "起步了，往 3 个月走",
      solid: "比较稳，往半年走",
      strong: "很稳，这就是底气",
    },
  },
  en: {
    eyebrow: "50 / 30 / 20 Budget Tool",
    title: "Enter every line. See your money clearly.",
    sub: "Fill in your real income and spending. If it isn't exactly 50/30/20, that's normal — the point is to see it first, then adjust.",
    income: "Income",
    needs: "Needs",
    savings: "Savings & Investments",
    wants: "Wants",
    needsPctLabel: "Needs 50%",
    savingsPctLabel: "Savings 20%",
    wantsPctLabel: "Wants 30%",
    addRow: "+ Add row",
    customPlaceholder: "Custom name",
    total: "Total",
    summaryTitle: "Monthly overview",
    incomeTotal: "Total income",
    spendTotal: "Allocated",
    leftLabel: "Left to allocate",
    overLabel: "Overspent",
    allocatedOk: "Allocated to the last dollar. Nice.",
    leftHint: "Don't leave it in your everyday account to quietly vanish — send it to your future.",
    overHint: "You're spending more than you earn. Start with needs and wants — which 'needs' were actually old choices?",
    youVsTarget: "You vs 50/30/20",
    you: "You",
    target: "Target",
    floorTitle: "Financial floor",
    floorSub: "The minimum your current life needs each month",
    perMonth: "/ mo",
    fundTitle: "Emergency runway",
    fundInputLabel: "Current emergency fund",
    fundInputHint: "Cash you've set aside and can reach anytime (not this month's deposit)",
    fundSub: "If income stopped, you'd last",
    months: "months",
    month: "month",
    donutCenter: "Savings rate",
    insightsTitle: "A few notes for you",
    flowTitle: "Where the money flows",
    exportTitle: "Export / Save",
    exportNote: "Nothing is saved automatically — export to keep a copy.",
    exportExcel: "Excel",
    exportPDF: "PDF report",
    exportWallDesktop: "Wallpaper · Desktop",
    exportWallPhone: "Wallpaper · Phone",
    exporting: "Generating…",
    yearLabel: "Year",
    monthLabel: "Month",
    emptyHint: "Add income and at least one expense on the left, and this becomes your real picture.",
    demoTag: "Sample preview",
    demoMessy: "This is how it often starts: spent it all, almost nothing left for later.",
    demoIdeal: "Give 20% to your future first and the picture settles — that's what this tool is for.",
    builtBy: "Chaologies",
    wallTagline: "See it clearly. Then you can manage it.",
    months_arr: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    runwayState: {
      danger: "Still thin — build it up",
      start: "Off the ground — head for 3 months",
      solid: "Fairly stable — push toward six",
      strong: "Strong. This is your backbone.",
    },
  },
};

// ─── preset line items (from Chao's sheet) ───────────────────────────
const PRESETS = {
  income: [
    { k: "dayjob", zh: "主业工资", en: "Day Job" },
    { k: "side", zh: "副业 / 兼职", en: "Dog Walking" },
    { k: "rental", zh: "房租收入", en: "Rental" },
  ],
  needs: [
    { k: "rent", zh: "房租 / 房贷", en: "Rent / Mortgage" },
    { k: "grocery", zh: "买菜 / 日用", en: "Groceries" },
    { k: "insurance", zh: "保险", en: "Insurance" },
    { k: "carpay", zh: "车贷", en: "Car Payment" },
    { k: "transport", zh: "交通 / 油费", en: "Gas / Transportation" },
    { k: "mindebt", zh: "最低还款", en: "Minimum Debt Payments" },
    { k: "phone", zh: "话费", en: "Phone Bill" },
    { k: "internet", zh: "网费", en: "Internet" },
    { k: "electric", zh: "电费", en: "Electricity" },
    { k: "needmisc", zh: "其他", en: "Miscellaneous" },
  ],
  savings: [
    { k: "emfund", zh: "应急金", en: "Emergency Fund" },
    { k: "invest", zh: "投资账户", en: "Investment accounts" },
    { k: "retire", zh: "养老金 / 公积金", en: "Workplace retirement" },
    { k: "extradebt", zh: "额外还债", en: "Extra debt payments" },
    { k: "downpay", zh: "首付储蓄", en: "Downpayment" },
  ],
  wants: [
    { k: "clothing", zh: "服饰", en: "Clothing" },
    { k: "eatout", zh: "下馆子", en: "Eating out" },
    { k: "travel", zh: "旅行", en: "Travel" },
    { k: "care", zh: "个人护理", en: "Personal Care" },
    { k: "subs", zh: "订阅", en: "Subscriptions" },
    { k: "donation", zh: "捐赠", en: "Donations" },
    { k: "coffee", zh: "咖啡", en: "Coffees" },
    { k: "wantmisc", zh: "其他", en: "Miscellaneous" },
  ],
};

const GOAL = { needs: 0.5, wants: 0.3, savings: 0.2 };
let _id = 0;
const uid = () => `r${++_id}`;
const fmt = (n) =>
  Math.round(n || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });

function makeRows(cat, lang) {
  return PRESETS[cat].map((p) => ({
    id: uid(),
    key: p.k,
    name: p[lang],
    nameZh: p.zh,
    nameEn: p.en,
    amount: "",
  }));
}

// ─── count-up hook ───────────────────────────────────────────────────
function useCountUp(target, ms = 600) {
  const [val, setVal] = useState(target);
  const from = useRef(target);
  const raf = useRef();
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVal(target); from.current = target; return; }
    const f = from.current, start = performance.now();
    cancelAnimationFrame(raf.current);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ms);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(f + (target - f) * e);
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, ms]);
  return val;
}

// ─── donut (SVG) ─────────────────────────────────────────────────────
function Donut({ needs, wants, savings, centerTop, centerBig }) {
  const total = needs + wants + savings;
  const segs = total > 0
    ? [
        { v: needs, c: "var(--ink)" },
        { v: wants, c: "var(--muted-fill)" },
        { v: savings, c: "var(--coral)" },
      ]
    : [{ v: 1, c: "#EEECE5" }];
  const r = 52, cx = 70, cy = 70, circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 140 140" className="ifc-donut" role="img">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F2F0EA" strokeWidth="16" />
      {total > 0 && segs.map((s, i) => {
        const frac = s.v / total;
        const dash = frac * circ;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.c}
            strokeWidth="16" strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset} transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: "stroke-dasharray .7s cubic-bezier(.22,1,.36,1), stroke-dashoffset .7s cubic-bezier(.22,1,.36,1)" }} />
        );
        offset += dash;
        return el;
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" className="ifc-donut-top">{centerTop}</text>
      <text x={cx} y={cy + 16} textAnchor="middle" className="ifc-donut-big">{centerBig}</text>
    </svg>
  );
}

// ─── empty-state demo (animates into view to draw users in) ──────────
const DEMO_MESSY = { needs: 64, wants: 35, savings: 1 };
const DEMO_IDEAL = { needs: 50, wants: 30, savings: 20 };
const DEMO_INCOME = 40000;

function EmptyPreview({ t, sym }) {
  const ref = useRef(null);
  const done = useRef(false);
  const timers = useRef([]);
  const [v, setV] = useState({ needs: 0, wants: 0, savings: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" && window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !done.current) {
        done.current = true;
        io.disconnect();
        if (reduce) { setV(DEMO_IDEAL); return; }
        timers.current.push(setTimeout(() => setV(DEMO_MESSY), 150));
        timers.current.push(setTimeout(() => setV(DEMO_IDEAL), 2000));
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); timers.current.forEach(clearTimeout); };
  }, []);

  const total = v.needs + v.wants + v.savings;
  const isIdeal = v.savings >= 20;
  const amt = (p) => Math.round((p / 100) * DEMO_INCOME);

  const tiers = [
    { key: "needs", label: t.needs, pct: v.needs, goal: 50, tone: "ink" },
    { key: "wants", label: t.wants, pct: v.wants, goal: 30, tone: "muted" },
    { key: "savings", label: t.savings, pct: v.savings, goal: 20, tone: "coral" },
  ];

  return (
    <div className="ifc-demo" ref={ref}>
      <div className="ifc-demo-tag">{t.demoTag}</div>

      <div className="ifc-block ifc-summary">
        <div className="ifc-sum-left">
          <div className="ifc-block-h">{t.summaryTitle}</div>
          <div className="ifc-sum-row"><span>{t.incomeTotal}</span><b>{sym}{fmt(DEMO_INCOME)}</b></div>
          <div className="ifc-sum-row"><span>{t.spendTotal}</span><b>{sym}{fmt(amt(total))}</b></div>
          <div className="ifc-demo-cap">{isIdeal ? t.demoIdeal : t.demoMessy}</div>
        </div>
        <div className="ifc-sum-right">
          <Donut needs={v.needs} wants={v.wants} savings={v.savings}
            centerTop={t.donutCenter} centerBig={`${Math.round(v.savings)}%`} />
          <div className="ifc-donut-legend">
            <span><i className="dot ink" />{t.needs}</span>
            <span><i className="dot muted" />{t.wants}</span>
            <span><i className="dot coral" />{t.savings}</span>
          </div>
        </div>
      </div>

      <div className="ifc-block">
        <div className="ifc-block-h">{t.youVsTarget}</div>
        <div className="ifc-tiers">
          {tiers.map((tr) => (
            <div className="ifc-tier" key={tr.key}>
              <div className="ifc-tier-top">
                <span className="ifc-tier-name">{tr.label}</span>
                <span className="ifc-tier-pct">{Math.round(tr.pct)}%
                  <span className="ifc-tier-tgt"> / {tr.goal}%</span></span>
              </div>
              <div className="ifc-track">
                <div className={`ifc-fill ${tr.tone}`} style={{ width: `${Math.min(100, tr.pct)}%` }} />
                <div className="ifc-target" style={{ left: `${tr.goal}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ifc-demo-foot">
        <span className="ifc-demo-foot-arrow">←</span>
        {t.emptyHint}
      </div>
    </div>
  );
}

// ─── insight engine (plain language, data-specific) ──────────────────
function buildInsights(d, lang, sym) {
  const out = [];
  const { inc, needsT, wantsT, savingsT, left, needsPct, wantsPct, savingsPct, rows, runway, floor } = d;
  const Z = lang === "zh";

  if (inc <= 0) return out;

  if (left < -1) {
    out.push({ tone: "warn", text: Z
      ? `你这个月超支 ${sym}${fmt(-left)}。先别想存钱，第一步是把必要和想要过一遍，找出哪些「必要」其实是旧选择。`
      : `You're ${sym}${fmt(-left)} over this month. Before saving, walk through needs and wants — which "needs" were actually old choices?` });
  } else if (left > 1) {
    out.push({ tone: "coral", text: Z
      ? `你还有 ${sym}${fmt(left)} 没分配。趁它还没在日常账户里消失，发薪日就划给未来。`
      : `You've got ${sym}${fmt(left)} unallocated. Before it disappears, move it to your future on payday.` });
  }

  if (savingsPct < 20) {
    const gap = inc * 0.2 - savingsT;
    out.push({ tone: "coral", text: Z
      ? `储蓄只占 ${Math.round(savingsPct)}%，离 20% 还差 ${sym}${fmt(gap)}。不用一步到位，先把这一档当成发薪日第一件事。`
      : `Savings is ${Math.round(savingsPct)}% — ${sym}${fmt(gap)} short of 20%. No need to leap there; just make this the first thing on payday.` });
  } else {
    out.push({ tone: "good", text: Z
      ? `储蓄占到了 ${Math.round(savingsPct)}%，已经先给未来留了位置，保持这个顺序。`
      : `Savings is ${Math.round(savingsPct)}% — you've reserved a spot for your future. Keep this order.` });
  }

  if (needsPct > 55) {
    out.push({ tone: "ink", text: Z
      ? `必要支出占了 ${Math.round(needsPct)}%，你能动的空间被压小了。盯一下那些每月自动扣的固定支出。`
      : `Needs take ${Math.round(needsPct)}% — that shrinks the room you can move. Watch the fixed costs that auto-debit each month.` });
  }

  // biggest wants leak
  const wantRows = rows.wants.filter((r) => +r.amount > 0).sort((a, b) => +b.amount - +a.amount);
  if (wantsT > 0 && wantRows[0]) {
    const top = wantRows[0];
    const share = Math.round((+top.amount / wantsT) * 100);
    if (share >= 30) {
      out.push({ tone: "ink", text: Z
        ? `想要里，「${top.nameZh || top.name}」一项就占了 ${share}%（${sym}${fmt(+top.amount)}）。最容易漏的往往就是这种。`
        : `In wants, "${top.nameEn || top.name}" alone is ${share}% (${sym}${fmt(+top.amount)}). The easy-to-miss leak is usually here.` });
    }
  }

  if (floor > 0) {
    if (runway < 3) {
      out.push({ tone: "warn", text: Z
        ? `应急金只够撑 ${runway.toFixed(1)} 个月。别想收益，先把它当成出事那天替你挡一下的缓冲，慢慢补到 3 个月。`
        : `Your fund covers ${runway.toFixed(1)} months. Forget returns — treat it as the buffer that takes the hit, and build toward 3 months.` });
    } else if (runway >= 6) {
      out.push({ tone: "good", text: Z
        ? `应急金能撑 ${runway >= 12 ? "12+" : runway.toFixed(1)} 个月，这就是你的底气。`
        : `Your fund lasts ${runway >= 12 ? "12+" : runway.toFixed(1)} months — that's your backbone.` });
    }
  }

  return out.slice(0, 5);
}

// ─── export: dynamic lib loaders ─────────────────────────────────────
function loadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
}
async function ensureXLSX() {
  if (window.XLSX) return window.XLSX;
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js");
  return window.XLSX;
}
async function ensureJsPDF() {
  if (window.jspdf) return window.jspdf;
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
  return window.jspdf;
}
function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

// ─── main ────────────────────────────────────────────────────────────
export default function BudgetTool() {
  const [lang, setLang] = useState("zh");
  const [cur, setCur] = useState("$");
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [mon, setMon] = useState(now.getMonth());
  const [fund, setFund] = useState("");
  const [busy, setBusy] = useState("");

  const [rows, setRows] = useState({
    income: makeRows("income", "zh"),
    needs: makeRows("needs", "zh"),
    savings: makeRows("savings", "zh"),
    wants: makeRows("wants", "zh"),
  });

  const t = T[lang];
  const sym = cur;

  // relabel preset rows when language flips (keep user edits/customs)
  useEffect(() => {
    setRows((prev) => {
      const next = {};
      for (const cat of Object.keys(prev)) {
        next[cat] = prev[cat].map((r) =>
          r.key ? { ...r, name: lang === "zh" ? r.nameZh : r.nameEn } : r
        );
      }
      return next;
    });
  }, [lang]);

  const sumCat = (cat) =>
    rows[cat].reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);

  const inc = sumCat("income");
  const needsT = sumCat("needs");
  const savingsT = sumCat("savings");
  const wantsT = sumCat("wants");
  const spendT = needsT + savingsT + wantsT;
  const left = inc - spendT;
  const fd = parseFloat(fund) || 0;
  const floor = needsT;
  const runway = floor > 0 ? fd / floor : 0;
  const hasData = inc > 0 && spendT > 0;

  const pct = (v) => (inc > 0 ? (v / inc) * 100 : 0);
  const needsPct = pct(needsT), wantsPct = pct(wantsT), savingsPct = pct(savingsT);

  const runwayState =
    runway < 1 ? "danger" : runway < 3 ? "start" : runway < 6 ? "solid" : "strong";

  const insights = useMemo(
    () => buildInsights(
      { inc, needsT, wantsT, savingsT, left, needsPct, wantsPct, savingsPct, rows, runway, floor },
      lang, sym
    ),
    [inc, needsT, wantsT, savingsT, left, needsPct, wantsPct, savingsPct, rows, runway, floor, lang, sym]
  );

  const aFloor = useCountUp(hasData ? floor : 0);
  const aRunway = useCountUp(hasData && floor > 0 ? runway : 0);

  // row ops
  const setAmount = (cat, id, v) =>
    setRows((p) => ({ ...p, [cat]: p[cat].map((r) => (r.id === id ? { ...r, amount: v.replace(/[^0-9.]/g, "") } : r)) }));
  const setName = (cat, id, v) =>
    setRows((p) => ({ ...p, [cat]: p[cat].map((r) => (r.id === id ? { ...r, name: v, nameZh: v, nameEn: v } : r)) }));
  const addRow = (cat) =>
    setRows((p) => ({ ...p, [cat]: [...p[cat], { id: uid(), key: null, name: "", nameZh: "", nameEn: "", amount: "" }] }));
  const delRow = (cat, id) =>
    setRows((p) => ({ ...p, [cat]: p[cat].filter((r) => r.id !== id) }));

  const tiers = [
    { key: "needs", label: t.needs, pct: needsPct, goal: 50, tone: "ink", amt: needsT },
    { key: "wants", label: t.wants, pct: wantsPct, goal: 30, tone: "muted", amt: wantsT },
    { key: "savings", label: t.savings, pct: savingsPct, goal: 20, tone: "coral", amt: savingsT },
  ];

  const periodLabel = `${year} · ${t.months_arr[mon]}`;
  const fileStem = `chaologies-5030 20-${year}-${String(mon + 1).padStart(2, "0")}`;

  // ── exports ──────────────────────────────────────────────────────
  async function doExcel() {
    setBusy("excel");
    try {
      const XLSX = await ensureXLSX();
      const wb = XLSX.utils.book_new();
      const aoa = [
        [t.eyebrow, periodLabel],
        [],
        [t.summaryTitle],
        [t.incomeTotal, inc],
        [t.spendTotal, spendT],
        [left >= 0 ? t.leftLabel : t.overLabel, Math.abs(left)],
        [],
        [t.youVsTarget, t.you, t.target],
        [t.needs, `${Math.round(needsPct)}%`, "50%"],
        [t.wants, `${Math.round(wantsPct)}%`, "30%"],
        [t.savings, `${Math.round(savingsPct)}%`, "20%"],
        [],
        [t.floorTitle, floor],
        [t.fundTitle + " (" + (lang === "zh" ? "月" : "mo") + ")", floor > 0 ? +runway.toFixed(1) : 0],
        [],
      ];
      const catTitle = { income: t.income, needs: t.needs, savings: t.savings, wants: t.wants };
      for (const cat of ["income", "needs", "savings", "wants"]) {
        aoa.push([catTitle[cat], t.total, sumCat(cat)]);
        rows[cat].filter((r) => r.name || r.amount).forEach((r) =>
          aoa.push(["", r.name, parseFloat(r.amount) || 0]));
        aoa.push([]);
      }
      const ws = XLSX.utils.aoa_to_sheet(aoa);
      ws["!cols"] = [{ wch: 26 }, { wch: 22 }, { wch: 12 }];
      XLSX.utils.book_append_sheet(wb, ws, "50-30-20");
      XLSX.writeFile(wb, `${fileStem}.xlsx`);
    } catch (e) {
      // CSV fallback
      const lines = [[t.eyebrow, periodLabel].join(",")];
      for (const cat of ["income", "needs", "savings", "wants"]) {
        lines.push([cat, t.total, sumCat(cat)].join(","));
        rows[cat].filter((r) => r.name || r.amount).forEach((r) =>
          lines.push(["", `"${r.name}"`, parseFloat(r.amount) || 0].join(",")));
      }
      downloadBlob(new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8" }), `${fileStem}.csv`);
    }
    setBusy("");
  }

  async function doPDF() {
    setBusy("pdf");
    try {
      const canvas = await renderReportCanvas({
        t, sym, periodLabel, inc, spendT, left, needsT, wantsT, savingsT,
        needsPct, wantsPct, savingsPct, floor, runway, runwayState, savingsRate: savingsPct, insights,
      });
      try {
        const { jsPDF } = await ensureJsPDF();
        const pdf = new jsPDF({ unit: "px", format: [canvas.width, canvas.height] });
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${fileStem}.pdf`);
      } catch {
        canvas.toBlob((b) => downloadBlob(b, `${fileStem}-report.png`), "image/png");
      }
    } catch (e) { /* noop */ }
    setBusy("");
  }

  async function doWallpaper(kind) {
    setBusy(kind);
    try {
      const canvas = await renderWallpaperCanvas({
        kind, t, sym, periodLabel, floor, runway, runwayState,
        savingsRate: savingsPct, needsPct, wantsPct, savingsPct,
      });
      canvas.toBlob((b) => downloadBlob(b, `${fileStem}-wallpaper-${kind}.png`), "image/png");
    } catch (e) { /* noop */ }
    setBusy("");
  }

  // ── render ───────────────────────────────────────────────────────
  const cats = [
    { key: "income", label: t.income, tone: "income" },
    { key: "needs", label: t.needs, tone: "ink", badge: t.needsPctLabel },
    { key: "savings", label: t.savings, tone: "coral", badge: t.savingsPctLabel },
    { key: "wants", label: t.wants, tone: "muted", badge: t.wantsPctLabel },
  ];

  return (
    <div className="ifc-root">
      <style>{CSS}</style>
      <div className="ifc-shell">
        <header className="ifc-head">
          <div className="ifc-eyebrow">{t.eyebrow}</div>
          <div className="ifc-toggles">
            <div className="ifc-period">
              <select className="ifc-sel" value={year} onChange={(e) => setYear(+e.target.value)} aria-label={t.yearLabel}>
                {Array.from({ length: 7 }).map((_, i) => {
                  const y = now.getFullYear() - 3 + i;
                  return <option key={y} value={y}>{y}</option>;
                })}
              </select>
              <select className="ifc-sel" value={mon} onChange={(e) => setMon(+e.target.value)} aria-label={t.monthLabel}>
                {t.months_arr.map((m, i) => <option key={i} value={i}>{m}</option>)}
              </select>
            </div>
            <div className="ifc-seg">
              {["zh", "en"].map((l) => (
                <button key={l} className={`ifc-segbtn ${lang === l ? "on" : ""}`} onClick={() => setLang(l)} aria-pressed={lang === l}>
                  {l === "zh" ? "中" : "EN"}
                </button>
              ))}
            </div>
            <div className="ifc-seg">
              {["$", "¥"].map((c) => (
                <button key={c} className={`ifc-segbtn ${cur === c ? "on" : ""}`} onClick={() => setCur(c)} aria-pressed={cur === c}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </header>

        <h1 className="ifc-title">{t.title}</h1>
        <p className="ifc-sub">{t.sub}</p>

        <div className="ifc-grid">
          {/* INPUT COLUMN */}
          <section className="ifc-inputs">
            {cats.map((c) => (
              <div className="ifc-cat" key={c.key}>
                <div className="ifc-cat-head">
                  <span className="ifc-cat-name">
                    <i className={`dot ${c.tone}`} />
                    {c.label}
                    {c.badge && <span className="ifc-cat-badge">{c.badge}</span>}
                  </span>
                  <span className="ifc-cat-total">{sym}{fmt(sumCat(c.key))}</span>
                </div>
                <div className="ifc-rows">
                  {rows[c.key].map((r) => (
                    <div className="ifc-row" key={r.id}>
                      <input className="ifc-rowname" value={r.name}
                        placeholder={t.customPlaceholder}
                        onChange={(e) => setName(c.key, r.id, e.target.value)} />
                      <div className="ifc-rowamt">
                        <span className="ifc-rowcur">{sym}</span>
                        <input className="ifc-rowinput" inputMode="decimal" placeholder="0"
                          value={r.amount} onChange={(e) => setAmount(c.key, r.id, e.target.value)} />
                      </div>
                      <button className="ifc-del" onClick={() => delRow(c.key, r.id)} aria-label="remove">×</button>
                    </div>
                  ))}
                </div>
                <button className="ifc-add" onClick={() => addRow(c.key)}>{t.addRow}</button>
              </div>
            ))}

            <label className="ifc-fund">
              <span className="ifc-fund-l">{t.fundInputLabel}</span>
              <div className="ifc-rowamt big">
                <span className="ifc-rowcur">{sym}</span>
                <input className="ifc-rowinput" inputMode="decimal" placeholder="0"
                  value={fund} onChange={(e) => setFund(e.target.value.replace(/[^0-9.]/g, ""))} />
              </div>
              <span className="ifc-fund-hint">{t.fundInputHint}</span>
            </label>
          </section>

          {/* RESULTS COLUMN */}
          <section className="ifc-results">
            {!hasData && <EmptyPreview t={t} sym={sym} />}

            {hasData && (
              <>
                {/* summary + donut */}
                <div className="ifc-block ifc-summary">
                  <div className="ifc-sum-left">
                    <div className="ifc-block-h">{t.summaryTitle}</div>
                    <div className="ifc-sum-row"><span>{t.incomeTotal}</span><b>{sym}{fmt(inc)}</b></div>
                    <div className="ifc-sum-row"><span>{t.spendTotal}</span><b>{sym}{fmt(spendT)}</b></div>
                    <div className={`ifc-sum-status ${left < -1 ? "over" : left > 1 ? "left" : "ok"}`}>
                      {left < -1
                        ? `${t.overLabel} · ${sym}${fmt(-left)}`
                        : left > 1
                        ? `${t.leftLabel} · ${sym}${fmt(left)}`
                        : t.allocatedOk}
                    </div>
                    {(left > 1 || left < -1) && (
                      <div className="ifc-sum-hint">{left < -1 ? t.overHint : t.leftHint}</div>
                    )}
                  </div>
                  <div className="ifc-sum-right">
                    <Donut needs={needsT} wants={wantsT} savings={savingsT}
                      centerTop={t.donutCenter} centerBig={`${Math.round(savingsPct)}%`} />
                    <div className="ifc-donut-legend">
                      <span><i className="dot ink" />{t.needs}</span>
                      <span><i className="dot muted" />{t.wants}</span>
                      <span><i className="dot coral" />{t.savings}</span>
                    </div>
                  </div>
                </div>

                {/* tiers vs target */}
                <div className="ifc-block">
                  <div className="ifc-block-h">{t.youVsTarget}</div>
                  <div className="ifc-tiers">
                    {tiers.map((tr) => (
                      <div className="ifc-tier" key={tr.key}>
                        <div className="ifc-tier-top">
                          <span className="ifc-tier-name">{tr.label}</span>
                          <span className="ifc-tier-pct">{Math.round(tr.pct)}%
                            <span className="ifc-tier-tgt"> / {tr.goal}%</span></span>
                        </div>
                        <div className="ifc-track">
                          <div className={`ifc-fill ${tr.tone}`} style={{ width: `${Math.min(100, tr.pct)}%` }} />
                          <div className="ifc-target" style={{ left: `${tr.goal}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* flow bar */}
                <div className="ifc-block">
                  <div className="ifc-block-h">{t.flowTitle}</div>
                  <div className="ifc-flow">
                    {[
                      { w: needsPct, tone: "ink", label: t.needs },
                      { w: wantsPct, tone: "muted", label: t.wants },
                      { w: savingsPct, tone: "coral", label: t.savings },
                    ].map((s, i) => s.w > 0 && (
                      <div key={i} className={`ifc-flow-seg ${s.tone}`} style={{ flexGrow: s.w }}>
                        <span>{Math.round(s.w)}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* floor + runway */}
                <div className="ifc-twin">
                  <div className="ifc-block ifc-stat">
                    <div className="ifc-block-h">{t.floorTitle}</div>
                    <div className="ifc-bignum"><span className="ifc-bignum-cur">{sym}</span>{fmt(aFloor)}
                      <span className="ifc-bignum-unit">{t.perMonth}</span></div>
                    <div className="ifc-stat-sub">{t.floorSub}</div>
                  </div>
                  <div className="ifc-block ifc-stat">
                    <div className="ifc-block-h">{t.fundTitle}</div>
                    <div className="ifc-bignum">{aRunway >= 12 ? "12+" : aRunway.toFixed(1)}
                      <span className="ifc-bignum-unit">{runway === 1 ? t.month : t.months}</span></div>
                    <div className="ifc-runway-dots">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <span key={i} className={`rdot ${i < Math.round(runway) ? "fill" : ""}`} />
                      ))}
                    </div>
                    <div className={`ifc-runway-state ${runwayState}`}>{t.runwayState[runwayState]}</div>
                  </div>
                </div>

                {/* insights */}
                {insights.length > 0 && (
                  <div className="ifc-block ifc-insights">
                    <div className="ifc-block-h">{t.insightsTitle}</div>
                    <ul className="ifc-ins-list">
                      {insights.map((ins, i) => (
                        <li key={i} className={`ifc-ins ${ins.tone}`}>
                          <span className="ifc-ins-mark">↳</span>
                          <span>{ins.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* exports */}
                <div className="ifc-block ifc-export">
                  <div className="ifc-block-h">{t.exportTitle}</div>
                  <div className="ifc-export-btns">
                    <button className="ifc-xbtn" onClick={doExcel} disabled={!!busy}>
                      {busy === "excel" ? t.exporting : t.exportExcel}</button>
                    <button className="ifc-xbtn" onClick={doPDF} disabled={!!busy}>
                      {busy === "pdf" ? t.exporting : t.exportPDF}</button>
                    <button className="ifc-xbtn" onClick={() => doWallpaper("desktop")} disabled={!!busy}>
                      {busy === "desktop" ? t.exporting : t.exportWallDesktop}</button>
                    <button className="ifc-xbtn" onClick={() => doWallpaper("phone")} disabled={!!busy}>
                      {busy === "phone" ? t.exporting : t.exportWallPhone}</button>
                  </div>
                  <div className="ifc-export-note">{t.exportNote}</div>
                </div>
              </>
            )}
          </section>
        </div>

        <footer className="ifc-foot">
          <span className="ifc-sign">{t.builtBy}</span>
        </footer>
      </div>
    </div>
  );
}

// ─── canvas: wallpaper ───────────────────────────────────────────────
async function loadFonts() {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch {}
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function renderWallpaperCanvas(o) {
  await loadFonts();
  const phone = o.kind === "phone";
  const W = phone ? 1170 : 2560;
  const H = phone ? 2532 : 1440;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d");

  const INK = "#161616", CORAL = "#FF6040", PAPER = "#FCFBF8", MUT = "#6E6E6E";
  x.fillStyle = INK; x.fillRect(0, 0, W, H);

  // ambient coral glow
  const g = x.createRadialGradient(W * (phone ? 0.5 : 0.72), H * (phone ? 0.28 : 0.4), 50, W * 0.6, H * 0.4, W * 0.9);
  g.addColorStop(0, "rgba(255,96,64,0.16)");
  g.addColorStop(1, "rgba(255,96,64,0)");
  x.fillStyle = g; x.fillRect(0, 0, W, H);

  const cx = phone ? W * 0.5 : W * 0.5;
  const pad = phone ? 110 : 220;
  const baseY = phone ? 360 : 360;

  // eyebrow
  x.textAlign = phone ? "center" : "left";
  x.fillStyle = CORAL;
  x.font = "600 " + (phone ? 34 : 30) + "px 'Space Grotesk', sans-serif";
  x.fillText("50 / 30 / 20", phone ? cx : pad, baseY - (phone ? 120 : 90));

  // savings rate — hero
  x.fillStyle = PAPER;
  x.font = "700 " + (phone ? 220 : 300) + "px 'Space Grotesk', sans-serif";
  const rate = `${Math.round(o.savingsRate)}%`;
  x.fillText(rate, phone ? cx : pad - (phone ? 0 : 6), baseY + (phone ? 90 : 130));

  x.fillStyle = "rgba(252,251,248,0.6)";
  x.font = "500 " + (phone ? 40 : 40) + "px 'Space Grotesk', sans-serif";
  x.fillText(o.t.donutCenter, phone ? cx : pad, baseY + (phone ? 175 : 210));

  // three-tier mini bar
  const barY = phone ? baseY + 320 : baseY + 360;
  const barW = phone ? W - pad * 2 : W * 0.42;
  const barX = phone ? pad : pad;
  const barH = phone ? 26 : 26;
  const segs = [
    { w: o.needsPct, c: "rgba(252,251,248,0.85)" },
    { w: o.wantsPct, c: "rgba(252,251,248,0.4)" },
    { w: o.savingsPct, c: CORAL },
  ];
  let bx = barX;
  const totalPct = Math.max(1, o.needsPct + o.wantsPct + o.savingsPct);
  segs.forEach((s) => {
    const w = (s.w / totalPct) * barW;
    x.fillStyle = s.c;
    roundRect(x, bx, barY, Math.max(0, w - 4), barH, barH / 2); x.fill();
    bx += w;
  });

  // floor + runway stats
  const sy = phone ? barY + 180 : barY + 150;
  const stat = (label, value, ox, align) => {
    x.textAlign = align;
    x.fillStyle = MUT === "#6E6E6E" ? "rgba(252,251,248,0.55)" : MUT;
    x.font = "500 " + (phone ? 32 : 28) + "px 'Space Grotesk', sans-serif";
    x.fillText(label, ox, sy);
    x.fillStyle = PAPER;
    x.font = "700 " + (phone ? 64 : 60) + "px 'Space Grotesk', sans-serif";
    x.fillText(value, ox, sy + (phone ? 78 : 72));
  };
  if (phone) {
    stat(o.t.floorTitle, `${o.sym}${fmt(o.floor)}`, cx - 250, "left");
    stat(o.t.fundTitle, `${o.runway >= 12 ? "12+" : o.runway.toFixed(1)} ${o.runway === 1 ? o.t.month : o.t.months}`, cx + 250, "right");
  } else {
    stat(o.t.floorTitle, `${o.sym}${fmt(o.floor)} ${o.t.perMonth}`, pad, "left");
    stat(o.t.fundTitle, `${o.runway >= 12 ? "12+" : o.runway.toFixed(1)} ${o.runway === 1 ? o.t.month : o.t.months}`, pad + 520, "left");
  }

  // tagline + brand (bottom)
  x.textAlign = phone ? "center" : "left";
  x.fillStyle = "rgba(252,251,248,0.85)";
  x.font = "500 " + (phone ? 44 : 38) + "px 'Noto Sans SC', 'Space Grotesk', sans-serif";
  x.fillText(o.t.wallTagline, phone ? cx : pad, H - (phone ? 220 : 150));

  x.fillStyle = "rgba(252,251,248,0.4)";
  x.font = "600 " + (phone ? 32 : 26) + "px 'Space Grotesk', sans-serif";
  x.fillText(`${o.t.builtBy}   ·   ${o.periodLabel}`, phone ? cx : pad, H - (phone ? 150 : 100));

  return c;
}

// ─── canvas: one-page report (for PDF) ───────────────────────────────
async function renderReportCanvas(o) {
  await loadFonts();
  const W = 1240, H = 1754; // ~A4 @150dpi
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d");
  const INK = "#1A1A1A", CORAL = "#FF6040", PAPER = "#FCFBF8", LINE = "#E9E7E0", MUT = "#5A5A57";
  const pad = 90;

  x.fillStyle = PAPER; x.fillRect(0, 0, W, H);

  // header
  x.fillStyle = CORAL;
  x.font = "600 26px 'Space Grotesk', sans-serif";
  x.fillText(o.t.eyebrow, pad, 110);
  x.fillStyle = INK;
  x.font = "700 56px 'Space Grotesk', sans-serif";
  x.fillText(o.periodLabel, pad, 175);
  x.strokeStyle = LINE; x.lineWidth = 2;
  x.beginPath(); x.moveTo(pad, 210); x.lineTo(W - pad, 210); x.stroke();

  // summary numbers
  let y = 290;
  const big = (label, val, ox) => {
    x.fillStyle = MUT; x.font = "500 24px 'Space Grotesk', sans-serif";
    x.fillText(label, ox, y);
    x.fillStyle = INK; x.font = "700 48px 'Space Grotesk', sans-serif";
    x.fillText(val, ox, y + 56);
  };
  big(o.t.incomeTotal, `${o.sym}${fmt(o.inc)}`, pad);
  big(o.t.spendTotal, `${o.sym}${fmt(o.spendT)}`, pad + 360);
  big(o.left < 0 ? o.t.overLabel : o.t.leftLabel, `${o.sym}${fmt(Math.abs(o.left))}`, pad + 720);

  // tiers vs target
  y = 470;
  x.fillStyle = INK; x.font = "600 22px 'Space Grotesk', sans-serif";
  x.fillText(o.t.youVsTarget.toUpperCase(), pad, y);
  y += 40;
  const tierList = [
    { l: o.t.needs, p: o.needsPct, g: 50, col: INK },
    { l: o.t.wants, p: o.wantsPct, g: 30, col: "#CFCDC6" },
    { l: o.t.savings, p: o.savingsPct, g: 20, col: CORAL },
  ];
  const trackW = W - pad * 2;
  tierList.forEach((tr) => {
    x.fillStyle = INK; x.font = "600 26px 'Noto Sans SC','Space Grotesk',sans-serif";
    x.fillText(tr.l, pad, y + 20);
    x.textAlign = "right";
    x.fillText(`${Math.round(tr.p)}%`, W - pad, y + 20);
    x.fillStyle = MUT; x.font = "500 20px 'Space Grotesk',sans-serif";
    x.fillText(` / ${tr.g}%`, W - pad + 70, y + 20);
    x.textAlign = "left";
    y += 38;
    x.fillStyle = "#F2F0EA"; roundRect(x, pad, y, trackW, 16, 8); x.fill();
    x.fillStyle = tr.col; roundRect(x, pad, y, Math.min(1, tr.p / 100) * trackW, 16, 8); x.fill();
    x.fillStyle = INK;
    const gx = pad + (tr.g / 100) * trackW;
    x.fillRect(gx - 1, y - 5, 2, 26);
    y += 56;
  });

  // floor + runway
  y += 20;
  x.strokeStyle = LINE; x.beginPath(); x.moveTo(pad, y); x.lineTo(W - pad, y); x.stroke();
  y += 60;
  big(o.t.floorTitle, `${o.sym}${fmt(o.floor)} ${o.t.perMonth}`, pad);
  big(o.t.fundTitle, `${o.runway >= 12 ? "12+" : o.runway.toFixed(1)} ${o.runway === 1 ? o.t.month : o.t.months}`, pad + 600);

  // insights
  y += 150;
  x.fillStyle = INK; x.font = "600 22px 'Space Grotesk',sans-serif";
  x.fillText(o.t.insightsTitle.toUpperCase(), pad, y);
  y += 30;
  x.font = "400 25px 'Noto Sans SC','Space Grotesk',sans-serif";
  const wrap = (text, maxW) => {
    const words = text.split("");
    const lines = []; let cur = "";
    for (const ch of words) {
      if (x.measureText(cur + ch).width > maxW) { lines.push(cur); cur = ch; }
      else cur += ch;
    }
    if (cur) lines.push(cur);
    return lines;
  };
  (o.insights || []).forEach((ins) => {
    y += 34;
    x.fillStyle = CORAL; x.fillText("↳", pad, y);
    x.fillStyle = INK;
    wrap(ins.text, trackW - 50).forEach((ln, i) => {
      x.fillText(ln, pad + 40, y + i * 36);
    });
    y += (wrap(ins.text, trackW - 50).length - 1) * 36 + 14;
  });

  // footer
  x.fillStyle = MUT; x.font = "600 22px 'Space Grotesk',sans-serif";
  x.fillText(`${o.t.builtBy}   ·   ${o.t.wallTagline}`, pad, H - 70);

  return c;
}

// ─── styles ──────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap');
.ifc-root{
  --coral:#FF6040;--coral-soft:#FFEDE7;--ink:#1A1A1A;--ink-2:#5A5A57;
  --muted:#B9B7B0;--muted-fill:#CFCDC6;--line:#E9E7E0;--paper:#FCFBF8;--card:#FFFFFF;
  font-family:'Space Grotesk','Noto Sans SC',-apple-system,BlinkMacSystemFont,sans-serif;
  color:var(--ink);background:var(--paper);-webkit-font-smoothing:antialiased;
  line-height:1.5;padding:clamp(18px,3.5vw,44px);display:flex;justify-content:center;
}
.ifc-root *{box-sizing:border-box;}
.ifc-shell{width:100%;max-width:1080px;}
.ifc-head{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:24px;}
.ifc-eyebrow{font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--coral);}
.ifc-toggles{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
.ifc-period{display:flex;gap:6px;}
.ifc-sel{font-family:inherit;font-size:13px;font-weight:500;color:var(--ink);background:var(--card);
  border:1px solid var(--line);border-radius:999px;padding:6px 12px;cursor:pointer;}
.ifc-sel:focus-visible{outline:2px solid var(--coral);outline-offset:2px;}
.ifc-seg{display:inline-flex;background:var(--card);border:1px solid var(--line);border-radius:999px;padding:3px;}
.ifc-segbtn{border:0;background:transparent;font-family:inherit;font-size:13px;font-weight:500;color:var(--ink-2);
  padding:5px 13px;border-radius:999px;cursor:pointer;transition:all .18s ease;line-height:1;}
.ifc-segbtn.on{background:var(--ink);color:#fff;}
.ifc-segbtn:focus-visible{outline:2px solid var(--coral);outline-offset:2px;}
.ifc-title{font-size:clamp(24px,3.6vw,36px);font-weight:700;letter-spacing:-.02em;margin:0 0 10px;line-height:1.14;}
.ifc-sub{font-size:clamp(13px,1.5vw,15px);color:var(--ink-2);max-width:62ch;margin:0 0 clamp(22px,3.5vw,36px);}
.ifc-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:clamp(18px,2.6vw,34px);align-items:start;}
@media(max-width:820px){.ifc-grid{grid-template-columns:1fr;}}

.dot{width:9px;height:9px;border-radius:50%;display:inline-block;flex:none;}
.dot.ink{background:var(--ink);}.dot.muted{background:var(--muted-fill);}
.dot.coral{background:var(--coral);}.dot.income{background:#8AA899;}

.ifc-inputs{display:flex;flex-direction:column;gap:14px;}
.ifc-cat{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 15px;}
.ifc-cat-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
.ifc-cat-name{font-size:14px;font-weight:700;display:flex;align-items:center;gap:8px;}
.ifc-cat-badge{font-size:10px;font-weight:600;letter-spacing:.04em;color:var(--ink-2);
  background:var(--paper);border:1px solid var(--line);padding:2px 7px;border-radius:999px;text-transform:uppercase;}
.ifc-cat-total{font-size:15px;font-weight:700;font-variant-numeric:tabular-nums;}
.ifc-rows{display:flex;flex-direction:column;gap:6px;}
.ifc-row{display:flex;align-items:center;gap:7px;}
.ifc-rowname{flex:1;min-width:0;border:0;border-bottom:1px solid transparent;background:transparent;
  font-family:inherit;font-size:13.5px;color:var(--ink);padding:5px 2px;border-radius:0;}
.ifc-rowname::placeholder{color:var(--muted);}
.ifc-rowname:focus{outline:0;border-bottom-color:var(--coral);}
.ifc-rowamt{display:flex;align-items:center;border:1px solid var(--line);border-radius:9px;
  background:var(--paper);padding:0 9px;width:108px;transition:border-color .16s,box-shadow .16s;}
.ifc-rowamt.big{width:100%;background:var(--card);}
.ifc-rowamt:focus-within{border-color:var(--coral);box-shadow:0 0 0 3px var(--coral-soft);}
.ifc-rowcur{color:var(--ink-2);font-size:13px;margin-right:3px;}
.ifc-rowinput{border:0;outline:0;background:transparent;font-family:inherit;font-size:14px;
  font-weight:500;color:var(--ink);width:100%;padding:7px 0;text-align:right;font-variant-numeric:tabular-nums;}
.big .ifc-rowinput{font-size:17px;font-weight:600;}
.ifc-del{border:0;background:transparent;color:var(--muted);font-size:18px;cursor:pointer;
  width:22px;height:22px;line-height:1;border-radius:6px;flex:none;transition:all .15s;}
.ifc-del:hover{color:var(--coral);background:var(--coral-soft);}
.ifc-add{margin-top:9px;border:0;background:transparent;color:var(--ink-2);font-family:inherit;
  font-size:12.5px;font-weight:500;cursor:pointer;padding:3px 0;}
.ifc-add:hover{color:var(--coral);}
.ifc-fund{display:flex;flex-direction:column;gap:7px;background:var(--coral-soft);
  border:1px solid #FFD9CC;border-radius:14px;padding:14px 15px;}
.ifc-fund-l{font-size:13.5px;font-weight:600;}
.ifc-fund-hint{font-size:11.5px;color:var(--ink-2);line-height:1.4;}

.ifc-results{display:flex;flex-direction:column;gap:14px;min-height:140px;}
.ifc-empty{border:1px dashed var(--line);border-radius:14px;padding:48px 24px;text-align:center;
  color:var(--ink-2);font-size:14px;background:var(--card);}
.ifc-demo{display:flex;flex-direction:column;gap:14px;position:relative;}
.ifc-demo-tag{align-self:flex-start;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:var(--coral);background:var(--coral-soft);border:1px solid #FFD9CC;padding:4px 11px;border-radius:999px;}
.ifc-demo .ifc-block{position:relative;overflow:hidden;}
.ifc-demo .ifc-block::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.5) 50%,transparent 60%);
  background-size:240% 100%;animation:ifc-sheen 3.4s ease-in-out infinite;}
@keyframes ifc-sheen{0%{background-position:140% 0;}55%,100%{background-position:-40% 0;}}
.ifc-demo-cap{margin-top:10px;font-size:12.5px;color:var(--ink-2);line-height:1.5;min-height:3em;
  transition:opacity .35s ease;}
.ifc-demo-foot{display:flex;align-items:center;justify-content:center;gap:8px;
  border:1px dashed var(--line);border-radius:14px;padding:15px 18px;text-align:center;
  font-size:13px;color:var(--ink-2);background:var(--card);line-height:1.5;}
.ifc-demo-foot-arrow{color:var(--coral);font-weight:700;}
@media(max-width:820px){.ifc-demo-foot-arrow{display:none;}}
.ifc-block{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:17px 19px;}
.ifc-block-h{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-2);margin-bottom:13px;}

.ifc-summary{display:flex;gap:18px;align-items:center;}
.ifc-sum-left{flex:1;min-width:0;}
.ifc-sum-row{display:flex;justify-content:space-between;font-size:14px;padding:3px 0;}
.ifc-sum-row b{font-variant-numeric:tabular-nums;}
.ifc-sum-status{margin-top:8px;font-size:14px;font-weight:600;}
.ifc-sum-status.ok{color:#3A7D44;}.ifc-sum-status.left{color:var(--coral);}.ifc-sum-status.over{color:#C0392B;}
.ifc-sum-hint{margin-top:5px;font-size:12px;color:var(--ink-2);line-height:1.45;}
.ifc-sum-right{display:flex;flex-direction:column;align-items:center;gap:8px;flex:none;}
.ifc-donut{width:130px;height:130px;}
.ifc-donut-top{font-size:11px;fill:var(--ink-2);font-family:'Space Grotesk',sans-serif;}
.ifc-donut-big{font-size:26px;font-weight:700;fill:var(--ink);font-family:'Space Grotesk',sans-serif;}
.ifc-donut-legend{display:flex;gap:11px;font-size:11px;color:var(--ink-2);}
.ifc-donut-legend span{display:flex;align-items:center;gap:4px;}

.ifc-tiers{display:flex;flex-direction:column;gap:14px;}
.ifc-tier-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:7px;}
.ifc-tier-name{font-size:14px;font-weight:600;}
.ifc-tier-pct{font-size:14px;font-weight:600;font-variant-numeric:tabular-nums;}
.ifc-tier-tgt{color:var(--muted);font-weight:500;}
.ifc-track{position:relative;height:9px;background:#F2F0EA;border-radius:999px;}
.ifc-fill{height:100%;border-radius:999px;transition:width .7s cubic-bezier(.22,1,.36,1);}
.ifc-fill.ink{background:var(--ink);}.ifc-fill.muted{background:var(--muted-fill);}.ifc-fill.coral{background:var(--coral);}
.ifc-target{position:absolute;top:-3px;width:2px;height:15px;background:var(--ink);opacity:.32;border-radius:2px;}

.ifc-flow{display:flex;gap:4px;height:38px;}
.ifc-flow-seg{display:flex;align-items:center;justify-content:center;border-radius:8px;
  font-size:12px;font-weight:600;color:#fff;min-width:34px;transition:flex-grow .6s ease;}
.ifc-flow-seg.ink{background:var(--ink);}.ifc-flow-seg.muted{background:var(--muted-fill);color:var(--ink);}
.ifc-flow-seg.coral{background:var(--coral);}

.ifc-twin{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
@media(max-width:460px){.ifc-twin{grid-template-columns:1fr;}}
.ifc-stat{display:flex;flex-direction:column;}
.ifc-bignum{font-size:clamp(24px,3.6vw,32px);font-weight:700;letter-spacing:-.02em;
  font-variant-numeric:tabular-nums;line-height:1;display:flex;align-items:baseline;gap:3px;}
.ifc-bignum-cur{font-size:.58em;font-weight:600;color:var(--ink-2);}
.ifc-bignum-unit{font-size:.4em;font-weight:500;color:var(--ink-2);margin-left:3px;}
.ifc-stat-sub{font-size:12px;color:var(--ink-2);margin-top:9px;line-height:1.4;}
.ifc-runway-dots{display:flex;gap:5px;margin-top:11px;}
.rdot{width:100%;height:5px;border-radius:3px;background:#EEECE5;transition:background .4s;}
.rdot.fill{background:var(--coral);}
.ifc-runway-state{font-size:12px;margin-top:9px;font-weight:500;}
.ifc-runway-state.danger{color:#C0392B;}.ifc-runway-state.start{color:var(--coral);}
.ifc-runway-state.solid{color:var(--ink);}.ifc-runway-state.strong{color:var(--ink);font-weight:600;}

.ifc-insights .ifc-ins-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px;}
.ifc-ins{display:flex;gap:10px;font-size:13.5px;line-height:1.55;}
.ifc-ins-mark{color:var(--coral);font-weight:700;flex:none;}
.ifc-ins.warn .ifc-ins-mark{color:#C0392B;}
.ifc-ins.good .ifc-ins-mark{color:#3A7D44;}

.ifc-export-btns{display:grid;grid-template-columns:1fr 1fr;gap:9px;}
.ifc-xbtn{border:1px solid var(--line);background:var(--paper);font-family:inherit;font-size:13px;
  font-weight:600;color:var(--ink);padding:11px 12px;border-radius:11px;cursor:pointer;transition:all .16s;}
.ifc-xbtn:hover:not(:disabled){border-color:var(--coral);color:var(--coral);}
.ifc-xbtn:disabled{opacity:.55;cursor:default;}
.ifc-xbtn:focus-visible{outline:2px solid var(--coral);outline-offset:2px;}
.ifc-export-note{margin-top:10px;font-size:11.5px;color:var(--ink-2);}

.ifc-foot{margin-top:26px;padding-top:18px;border-top:1px solid var(--line);text-align:right;}
.ifc-sign{font-size:12px;font-weight:600;letter-spacing:.04em;color:var(--ink-2);}
@media(prefers-reduced-motion:reduce){.ifc-fill,.rdot,.ifc-segbtn,.ifc-rowamt,.ifc-flow-seg{transition:none;}}
`;
