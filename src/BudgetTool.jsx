// ─────────────────────────────────────────────────────
//  BudgetTool.jsx — 50 / 30 / 20 intentional budget tool
//  Chaologies (超说) — warm-paper redesign
//
//  Ported from the Claude Design handoff "Budget Tool.dc.html".
//  Left: four editable, collapsible categories + emergency stash.
//  Right (sticky): overview + donut + verdict, financial-freedom
//  progress, you-vs-50/30/20 bars, money flow, baseline + runway,
//  plain-language notes, and export (CSV / print / wallpaper).
//
//  Bilingual (中 / EN, driven by the `lang` prop) and currency
//  switchable ($ / ¥). Data lives only in the browser — nothing is
//  uploaded or persisted; export to keep a copy.
// ─────────────────────────────────────────────────────

import { useRef, useState } from "react";

let _uid = 100;

const INITIAL_ITEMS = {
  income: [
    { id: 1, zh: "主业工资", en: "Salary", raw: "18000" },
    { id: 2, zh: "副业 · 兼职", en: "Side income", raw: "" },
    { id: 3, zh: "房租 · 利息收入", en: "Rent · Interest", raw: "" },
  ],
  needs: [
    { id: 11, zh: "房租 · 房贷", en: "Rent · Mortgage", raw: "6000" },
    { id: 12, zh: "买菜 · 日用", en: "Groceries", raw: "1800" },
    { id: 13, zh: "交通 · 油费", en: "Transport", raw: "600" },
    { id: 14, zh: "水 · 电 · 网", en: "Utilities", raw: "500" },
    { id: 15, zh: "保险", en: "Insurance", raw: "" },
    { id: 16, zh: "最低还款", en: "Min. debt payment", raw: "" },
  ],
  wants: [
    { id: 21, zh: "下馆子", en: "Eating out", raw: "1200" },
    { id: 22, zh: "咖啡", en: "Coffee", raw: "" },
    { id: 23, zh: "旅行", en: "Travel", raw: "" },
    { id: 24, zh: "服饰", en: "Clothes", raw: "" },
    { id: 25, zh: "订阅", en: "Subscriptions", raw: "" },
    { id: 26, zh: "个人护理", en: "Personal care", raw: "" },
  ],
  savings: [
    { id: 31, zh: "应急金", en: "Emergency fund", raw: "2000" },
    { id: 32, zh: "投资账户", en: "Investing", raw: "1500" },
    { id: 33, zh: "养老 · 公积金", en: "Retirement", raw: "" },
    { id: 34, zh: "额外还债", en: "Extra debt payoff", raw: "" },
    { id: 35, zh: "首付储蓄", en: "Down payment", raw: "" },
  ],
};

const CAT_DEF = [
  { key: "income", zh: "收入", en: "Income", dot: "#1c1915", target: null, hintZh: "税后到手", hintEn: "after tax" },
  { key: "needs", zh: "必要", en: "Needs", dot: "#3a352e", target: 0.5 },
  { key: "wants", zh: "想要", en: "Wants", dot: "#f4845f", target: 0.3 },
  { key: "savings", zh: "储蓄与投资", en: "Save & Invest", dot: "#e4a11b", target: 0.2 },
];

const DONUT_C = 2 * Math.PI * 50;
const clamp01 = (x) => Math.max(0, Math.min(1, x));

export default function BudgetTool({ lang = "zh" }) {
  const [cur, setCur] = useState("$");
  const [open, setOpen] = useState({ income: true, needs: true, wants: false, savings: false });
  const [emergency, setEmergency] = useState("");
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [busy, setBusy] = useState("");
  const [dragging, setDragging] = useState(null);
  const draggingRef = useRef(null);

  const z = lang === "zh";
  const tr = (zh, en) => (z ? zh : en);
  const n = (raw) => {
    const x = parseFloat(String(raw == null ? "" : raw).replace(/[^0-9.]/g, ""));
    return isFinite(x) ? x : 0;
  };
  const sum = (cat) => items[cat].reduce((a, it) => a + n(it.raw), 0);
  const fmt = (v) => cur + Math.round(v).toLocaleString("en-US");
  const grp = (v) => Math.round(v).toLocaleString("en-US");

  // ── mutations ──
  const setRaw = (cat, id, val) =>
    setItems((s) => ({ ...s, [cat]: s[cat].map((it) => (it.id === id ? { ...it, raw: val } : it)) }));
  const setLabel = (cat, id, val) =>
    setItems((s) => ({ ...s, [cat]: s[cat].map((it) => (it.id === id ? { ...it, zh: val, en: val } : it)) }));
  const addRow = (cat) => {
    const id = ++_uid;
    setOpen((o) => ({ ...o, [cat]: true }));
    setItems((s) => ({ ...s, [cat]: [...s[cat], { id, zh: "", en: "", raw: "", custom: true }] }));
  };
  const removeRow = (cat, id) =>
    setItems((s) => ({ ...s, [cat]: s[cat].filter((it) => it.id !== id) }));
  const reorderRow = (cat, sourceId, targetId, position) => {
    if (sourceId === targetId) return;
    setItems((s) => {
      const next = [...s[cat]];
      const from = next.findIndex((it) => it.id === sourceId);
      if (from < 0) return s;
      const [moved] = next.splice(from, 1);
      const target = next.findIndex((it) => it.id === targetId);
      if (target < 0) return s;
      next.splice(target + (position === "after" ? 1 : 0), 0, moved);
      return { ...s, [cat]: next };
    });
  };
  const startRowDrag = (e, cat, id) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const next = { cat, id, overId: id, position: "before", pointerId: e.pointerId };
    draggingRef.current = next;
    setDragging(next);
  };
  const moveRowDrag = (e) => {
    const active = draggingRef.current;
    if (!active || active.pointerId !== e.pointerId) return;
    e.preventDefault();
    const target = document.elementFromPoint(e.clientX, e.clientY)?.closest(".bt-row");
    if (!target || target.dataset.cat !== active.cat) return;
    const overId = Number(target.dataset.rowId);
    if (!overId || overId === active.id) return;
    const rect = target.getBoundingClientRect();
    const position = e.clientY < rect.top + rect.height / 2 ? "before" : "after";
    if (active.overId === overId && active.position === position) return;
    reorderRow(active.cat, active.id, overId, position);
    const next = { ...active, overId, position };
    draggingRef.current = next;
    setDragging(next);
  };
  const finishRowDrag = (e) => {
    const active = draggingRef.current;
    if (!active || active.pointerId !== e.pointerId) return;
    e.preventDefault();
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    draggingRef.current = null;
    setDragging(null);
  };
  const cancelRowDrag = () => {
    draggingRef.current = null;
    setDragging(null);
  };
  const toggle = (cat) => setOpen((o) => ({ ...o, [cat]: !o[cat] }));
  const exportWallpaper = async (kind) => {
    if (busy) return;
    setBusy(kind);
    try {
      const canvas = await renderWallpaper({
        kind, lang, cur,
        hasData: income > 0,
        rate: income > 0 ? ratePctN : 0,
        needsPct: income > 0 ? (needs / income) * 100 : 0,
        wantsPct: income > 0 ? (wants / income) * 100 : 0,
        savingsPct: income > 0 ? (savings / income) * 100 : 0,
        unallocPct: income > 0 ? Math.max(0, (unalloc / income) * 100) : 0,
        baseStr: grp(baseline), runway: runwayM, freedom,
      });
      await new Promise((res) =>
        canvas.toBlob((b) => { if (b) downloadBlob(b, `chaologies-wallpaper-${kind}.png`); res(); }, "image/png")
      );
    } catch (e) {
      window.alert(tr("导出失败，请重试", "Export failed — please try again"));
    } finally {
      setBusy("");
    }
  };
  const printPDF = () => window.print();
  const exportCSV = () => {
    const L = {
      income: tr("收入", "Income"),
      needs: tr("必要", "Needs"),
      wants: tr("想要", "Wants"),
      savings: tr("储蓄与投资", "Save & Invest"),
    };
    const out = [[tr("分类", "Category"), tr("项目", "Item"), tr("金额", "Amount")]];
    ["income", "needs", "wants", "savings"].forEach((k) =>
      items[k].forEach((it) => {
        const v = n(it.raw);
        if (v > 0) out.push([L[k], tr(it.zh, it.en) || "—", v]);
      })
    );
    const csv = out.map((r) => r.map((x) => '"' + String(x).replace(/"/g, '""') + '"').join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "chaologies-budget.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  // ── derived values ──
  const income = sum("income"), needs = sum("needs"), wants = sum("wants"), savings = sum("savings");
  const allocated = needs + wants + savings;
  const unalloc = income - allocated;
  const rate = income > 0 ? savings / income : 0;
  const ratePctN = Math.round(rate * 100);
  const denom = Math.max(income, allocated, 1);

  const cats = CAT_DEF.map((cd) => {
    const list = items[cd.key];
    const total = sum(cd.key);
    const isOpen = open[cd.key];
    const actualPct = income > 0 && cd.key !== "income" ? Math.round((total / income) * 100) : null;
    let meta = "";
    if (cd.target != null) meta = (actualPct != null ? actualPct + "%" : "—") + " / " + Math.round(cd.target * 100) + "%";
    return {
      key: cd.key, label: tr(cd.zh, cd.en), dot: cd.dot, open: isOpen,
      hint: cd.hintZh ? (z ? "（" + cd.hintZh + "）" : " (" + cd.hintEn + ")") : null,
      hasTarget: cd.target != null, meta,
      totalStr: fmt(total), chevron: isOpen ? "▾" : "▸",
      addLabel: tr("加一项", "Add a line"),
      rows: list.map((it) => ({
        id: it.id, custom: !!it.custom,
        label: tr(it.zh, it.en), labelVal: z ? it.zh : it.en,
        labelPh: tr("自定义项目", "Custom item"), raw: it.raw,
      })),
    };
  });

  // donut
  const donutSegs = [];
  if (income > 0) {
    let acc = 0;
    [{ v: needs, c: "#3a352e" }, { v: wants, c: "#f4845f" }, { v: savings, c: "#e4a11b" }].forEach((s) => {
      const f = Math.max(0, Math.min(1 - acc, s.v / income));
      if (f <= 0.0001) return;
      donutSegs.push({ color: s.c, dash: (f * DONUT_C).toFixed(2) + " " + DONUT_C.toFixed(2), off: (-acc * DONUT_C).toFixed(2) });
      acc += f;
    });
  }
  const rateStr = income > 0 ? ratePctN + "%" : "—";

  // 50/30/20 bars
  const barRows = [
    { label: tr("必要", "Needs"), v: needs, target: 0.5, color: "#3a352e" },
    { label: tr("想要", "Wants"), v: wants, target: 0.3, color: "#f4845f" },
    { label: tr("储蓄与投资", "Save & Invest"), v: savings, target: 0.2, color: "#e4a11b" },
  ].map((r) => {
    const ap = income > 0 ? r.v / income : 0;
    return {
      label: r.label,
      actualPct: (income > 0 ? Math.round(ap * 100) : 0) + "%",
      targetPct: Math.round(r.target * 100) + "%",
      fillWidth: Math.min(100, ap * 100).toFixed(1) + "%",
      fillColor: r.color,
      tickLeft: (r.target * 100).toFixed(1) + "%",
    };
  });

  // money flow
  const flowSegs = [];
  if (income > 0) {
    [{ label: tr("必要", "Needs"), v: needs, c: "#3a352e" }, { label: tr("想要", "Wants"), v: wants, c: "#f4845f" }, { label: tr("储蓄", "Save"), v: savings, c: "#e4a11b" }].forEach((d) => {
      if (d.v <= 0) return;
      flowSegs.push({ label: d.label, color: d.c, pct: Math.round((d.v / income) * 100) + "%", width: (d.v / denom * 100).toFixed(2) + "%", bg: d.c });
    });
    if (unalloc > 0.5)
      flowSegs.push({
        label: tr("待分配", "Unassigned"), color: "#c4bcaf", pct: Math.round((unalloc / income) * 100) + "%",
        width: (unalloc / denom * 100).toFixed(2) + "%",
        bg: "repeating-linear-gradient(45deg,#e7e2d8,#e7e2d8 5px,#efebe2 5px,#efebe2 10px)",
      });
  }

  // baseline + runway
  const baseline = needs;
  const eVal = n(emergency);
  const runwayM = baseline > 0 ? eVal / baseline : 0;
  const runwayStr = runwayM > 0 ? runwayM.toFixed(1) : "0.0";
  const runwayPips = Array.from({ length: 6 }, (_, i) => ({
    bg: runwayM >= i + 1 ? "var(--honey)" : runwayM > i ? "#f0d79a" : "var(--line)",
  }));
  let runwayNote, runwayColor;
  if (baseline <= 0) { runwayNote = tr("先填必要支出", "Fill needs first"); runwayColor = "var(--ink-300)"; }
  else if (runwayM < 1) { runwayNote = tr("还很薄，先补起来", "Thin — start building"); runwayColor = "#d2691e"; }
  else if (runwayM < 3) { runwayNote = tr("在路上了，目标 3 个月", "Getting there — aim for 3"); runwayColor = "#c8881a"; }
  else if (runwayM < 6) { runwayNote = tr("挺稳，可以推到 6 个月", "Solid — push toward 6"); runwayColor = "var(--ink-500)"; }
  else { runwayNote = tr("很扎实 ✦", "Rock solid ✦"); runwayColor = "#1f8a4c"; }

  // financial-freedom progress
  const byId = (cat, id) => { const it = items[cat].find((x) => x.id === id); return it ? n(it.raw) : 0; };
  const expenses = needs + wants;
  const passiveIncome = byId("income", 3);
  const investing = byId("savings", 32) + byId("savings", 33);
  const sSave = clamp01(rate / 0.5);
  const sRun = clamp01(runwayM / 6);
  const sInv = clamp01(income > 0 ? investing / income / 0.15 : 0);
  const sPas = clamp01(expenses > 0 ? passiveIncome / expenses : 0);
  const freedom = income > 0 ? Math.round((sSave * 0.3 + sRun * 0.15 + sInv * 0.3 + sPas * 0.25) * 100) : 0;
  const freedomRemain = 100 - freedom;
  const levers = [
    { s: sSave, zh: "提高储蓄率", en: "lift your savings rate" },
    { s: sRun, zh: "把应急金补厚", en: "thicken your emergency fund" },
    { s: sInv, zh: "让钱开始投资生钱", en: "put money to work investing" },
    { s: sPas, zh: "攒出第一笔被动收入", en: "grow some passive income" },
  ].sort((a, b) => a.s - b.s);
  const freedomLever = income <= 0 ? tr("先填一笔收入", "add an income line") : levers[0][z ? "zh" : "en"];
  const freedomFillW = Math.max(2, freedom) + "%";

  // conclusion
  let conclLead = "", conclEmph = "", conclTail = "", conclColor = "var(--honey)";
  if (income <= 0) { conclLead = tr("先在最上面填一笔收入，", "Add an income line and "); conclEmph = tr("结论", "your verdict"); conclTail = tr("就出来了。", " appears here."); }
  else if (unalloc > income * 0.05) { conclLead = tr("这个月还有 ", "You still have "); conclEmph = fmt(unalloc); conclTail = tr(" 没安排好。", " sitting unassigned."); conclColor = "#d2691e"; }
  else if (rate >= 0.2) { conclLead = tr("这个月你能存下 ", "This month you're keeping "); conclEmph = ratePctN + "%"; conclTail = tr("，漂亮。", " — beautifully done."); conclColor = "#1f8a4c"; }
  else if (rate > 0) { conclLead = tr("这个月能存下 ", "You're keeping "); conclEmph = ratePctN + "%"; conclTail = tr("，先从这里往上走。", " this month — build from here."); }
  else { conclLead = tr("这个月还没存下钱，", "Nothing saved yet — "); conclEmph = tr("先给储蓄那一档一个数", "give the save line a number"); conclTail = tr("。", "."); conclColor = "#d2691e"; }

  // suggestions
  const sg = [];
  if (income <= 0) {
    sg.push(tr("先从最上面填一笔收入开始，右边立刻就有数字。", "Start with one income line up top — the numbers appear instantly."));
  } else {
    if (unalloc > income * 0.05) sg.push(tr("还有 " + fmt(unalloc) + " 没贴上名字。没分配的钱就像没系安全带，最容易在路上甩出去——发薪日先给它派个去处。", fmt(unalloc) + " has no name on it yet. Unassigned money is money without a seatbelt — give it a job on payday, before it slips away."));
    if (rate < 0.2) { const gap = income * 0.2 - savings; sg.push(tr("储蓄率 " + ratePctN + "%，离 20% 还差 " + fmt(gap) + "。把存钱当成「先付给未来的你」的月租，雷打不动地从工资里先扣。", "Savings at " + ratePctN + "%, " + fmt(gap) + " short of 20%. Treat saving like rent you pay your future self — take it off the top, every month.")); }
    else sg.push(tr("储蓄率 " + ratePctN + "%，已经跑过 20% 这条线。这笔钱是你将来「睡后收入」的种子，继续埋。", "Savings at " + ratePctN + "% — past the 20% line. This is the seed of your future passive income. Keep planting."));
    if (needs > income * 0.5) sg.push(tr("必要支出占了 " + Math.round(needs / income * 100) + "%，房租和车贷像两块压在预算上的大石头。先看最大那一笔，能不能松一寸。", "Needs are " + Math.round(needs / income * 100) + "% — rent and loans are the two boulders on your budget. See if the biggest one will give an inch."));
    else if (baseline > 0 && runwayM < 3) sg.push(tr("应急金能撑 " + runwayStr + " 个月。它不负责生钱，负责在意外砸下来时给你当安全气囊——慢慢充到 3 个月。", "Your emergency fund covers " + runwayStr + " months. It's not here to earn — it's your airbag when life hits. Build it toward 3 months."));
  }
  const suggestions = sg.slice(0, 3);

  const incomeStr = fmt(income);
  const allocatedStr = fmt(allocated);
  const unallocStr = (unalloc < 0 ? "-" : "") + fmt(Math.abs(unalloc));
  const unallocColor = unalloc > 0.5 ? "#d2691e" : unalloc < -0.5 ? "#c0392b" : "var(--ink-500)";
  const baseNum = grp(baseline);

  // ── copy ──
  const c = {
    curLabel: tr("金额单位", "Currency"),
    emergTitle: tr("现有应急金存量", "Emergency fund on hand"),
    emergHint: tr("你随时能动用、专门留着的那笔（不是本月新存入的）。", "The money you can tap anytime — not what you're saving this month."),
    sumKicker: tr("本月总览", "This month"),
    incomeL: tr("总收入", "Income"), allocatedL: tr("已分配", "Allocated"), unallocL: tr("还没分配", "Unassigned"),
    rateL: tr("储蓄率", "Save rate"),
    freedomKicker: tr("财务自由 · 进度", "Financial freedom · progress"),
    freedomRemainL: tr("还差", "still"), freedomRemainU: tr("的努力", "to go"),
    freedomLeverL: tr("现在最该使劲的：", "Push hardest on: "),
    freedomHint: tr("由储蓄率、应急金、投资和被动收入一起估算——只要收入一直高于支出，它就会往上走。", "Estimated from your savings rate, emergency fund, investing, and passive income — as long as income stays above spending, it climbs."),
    vsTitle: tr("你的实际 vs 50 / 30 / 20", "You vs 50 / 30 / 20"),
    flowTitle: tr("钱的流向", "Where it goes"),
    baseTitle: tr("财务底线", "Your baseline"), perMonth: tr("/ 月", "/ mo"),
    baseSub: tr("维持现在的生活，每月最少要这么多。", "The minimum to keep your life running each month."),
    runwayTitle: tr("应急金跑道", "Emergency runway"), monthsU: tr("个月", "months"),
    notesTitle: tr("给你的几句话", "A few notes for you"),
    notesSub: tr("财务自由，就是从这几个小数字开始的。", "Financial freedom starts with these small numbers."),
    exportTitle: tr("导出 / 保存", "Export / Save"),
    exportSub: tr("关掉页面数据就没了，先存一份。", "Close the tab and it's gone — keep a copy first."),
    expExcel: tr("Excel 表格", "Excel / CSV"), expPDF: tr("打印 · PDF", "Print · PDF"),
    exportWallLabel: tr("设成壁纸，每天提醒自己的目标", "Set as wallpaper — a daily nudge toward your goal"),
    expWallPhone: tr("手机", "Phone"), expWallPad: tr("iPad", "iPad"), expWallPC2: tr("电脑", "Desktop"),
    exporting: tr("生成中…", "Saving…"),
    exportNote: tr("数据不会自动保存，记得导出存底。", "Nothing is saved automatically — export to keep a copy."),
  };

  return (
    <div id="tool" className="bt">
      <style>{CSS}</style>

      {/* LEFT: form */}
      <div className="bt-form">
        <div className="bt-curbar">
          <span className="bt-curlabel">{c.curLabel}</span>
          <div className="bt-pillgroup">
            <button className={`bt-pill ${cur === "$" ? "on" : ""}`} onClick={() => setCur("$")}>$</button>
            <button className={`bt-pill ${cur === "¥" ? "on" : ""}`} onClick={() => setCur("¥")}>¥</button>
          </div>
        </div>

        {cats.map((cat) => (
          <div className="bt-cat" key={cat.key}>
            <button className="bt-cat-head" onClick={() => toggle(cat.key)}>
              <span className="bt-cat-dot" style={{ background: cat.dot }} />
              <span className="bt-cat-name">{cat.label}</span>
              {cat.hint && <span className="bt-cat-hint">{cat.hint}</span>}
              {cat.hasTarget && <span className="bt-cat-meta">{cat.meta}</span>}
              <span className="bt-spacer" />
              <span className="bt-cat-total">{cat.totalStr}</span>
              <span className="bt-cat-chev">{cat.chevron}</span>
            </button>
            {cat.open && (
              <div className="bt-cat-body">
                {cat.rows.map((row) => (
                  <div
                    className={[
                      "bt-row",
                      dragging?.cat === cat.key && dragging.id === row.id ? "is-dragging" : "",
                      dragging?.cat === cat.key && dragging.overId === row.id && dragging.id !== row.id
                        ? `drop-${dragging.position}`
                        : "",
                    ].filter(Boolean).join(" ")}
                    key={row.id}
                    data-cat={cat.key}
                    data-row-id={row.id}
                  >
                    <button
                      className="bt-row-drag"
                      onPointerDown={(e) => startRowDrag(e, cat.key, row.id)}
                      onPointerMove={moveRowDrag}
                      onPointerUp={finishRowDrag}
                      onPointerCancel={cancelRowDrag}
                      aria-label={tr("拖动调整顺序", "Drag to reorder")}
                      title={tr("拖动调整顺序", "Drag to reorder")}
                    >
                      <span />
                      <span />
                      <span />
                    </button>
                    {row.custom ? (
                      <input
                        className="bt-row-label-input"
                        value={row.labelVal}
                        onChange={(e) => setLabel(cat.key, row.id, e.target.value)}
                        placeholder={row.labelPh}
                      />
                    ) : (
                      <span className="bt-row-label">{row.label}</span>
                    )}
                    <div className="bt-amt">
                      <span className="bt-amt-cur">{cur}</span>
                      <input
                        className="bt-amt-input"
                        inputMode="numeric"
                        value={row.raw}
                        onChange={(e) => setRaw(cat.key, row.id, e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <button className="bt-row-x" onClick={() => removeRow(cat.key, row.id)} aria-label="remove">×</button>
                  </div>
                ))}
                <button className="bt-addrow" onClick={() => addRow(cat.key)}>+ {cat.addLabel}</button>
              </div>
            )}
          </div>
        ))}

        {/* emergency stash */}
        <div className="bt-emerg">
          <div className="bt-emerg-top">
            <div className="bt-emerg-title">{c.emergTitle}</div>
            <div className="bt-amt bt-amt-emerg">
              <span className="bt-amt-cur">{cur}</span>
              <input
                className="bt-amt-input"
                inputMode="numeric"
                value={emergency}
                onChange={(e) => setEmergency(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
          <div className="bt-emerg-hint">{c.emergHint}</div>
        </div>
      </div>

      {/* RIGHT: summary (sticky) */}
      <div className="bt-summary">
        {/* overview + donut + conclusion */}
        <div className="bt-card">
          <div className="bt-overview">
            <div className="bt-ov-left">
              <div className="bt-kicker">{c.sumKicker}</div>
              <div className="bt-ov-row"><span className="bt-ov-l">{c.incomeL}</span><span className="bt-ov-v">{incomeStr}</span></div>
              <div className="bt-ov-row"><span className="bt-ov-l">{c.allocatedL}</span><span className="bt-ov-v">{allocatedStr}</span></div>
              <div className="bt-ov-row"><span className="bt-ov-l" style={{ color: unallocColor }}>{c.unallocL}</span><span className="bt-ov-v" style={{ color: unallocColor }}>{unallocStr}</span></div>
            </div>
            <div className="bt-donut">
              <svg viewBox="0 0 120 120" className="bt-donut-svg">
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--line-2)" strokeWidth="13" />
                {donutSegs.map((s, i) => (
                  <circle key={i} cx="60" cy="60" r="50" fill="none" stroke={s.color} strokeWidth="13" strokeDasharray={s.dash} strokeDashoffset={s.off} />
                ))}
              </svg>
              <div className="bt-donut-center">
                <span className="bt-donut-l">{c.rateL}</span>
                <span className="bt-donut-v">{rateStr}</span>
              </div>
            </div>
          </div>
          <div className="bt-verdict">
            {conclLead}<span style={{ color: conclColor, fontWeight: 600 }}>{conclEmph}</span>{conclTail}
          </div>
        </div>

        {/* financial freedom progress */}
        <div className="bt-card bt-honeycard">
          <div className="bt-freedom-top">
            <span className="bt-freedom-kicker">{c.freedomKicker}</span>
            <span className="bt-freedom-remain">{c.freedomRemainL} <b>{freedomRemain}%</b> {c.freedomRemainU}</span>
          </div>
          <div className="bt-freedom-main">
            <span className="bt-freedom-num">{freedom}%</span>
            <div className="bt-freedom-trackwrap">
              <div className="bt-freedom-track">
                <div className="bt-freedom-fill" style={{ width: freedomFillW }} />
                <img src="/air.png" alt="" className="bt-freedom-plane" style={{ left: freedom + "%" }} />
              </div>
            </div>
          </div>
          <div className="bt-freedom-lever">{c.freedomLeverL}<b>{freedomLever}</b></div>
          <div className="bt-freedom-hint">{c.freedomHint}</div>
        </div>

        {/* 50/30/20 bars */}
        <div className="bt-card">
          <div className="bt-kicker">{c.vsTitle}</div>
          {barRows.map((b, i) => (
            <div className="bt-bar" key={i}>
              <div className="bt-bar-top">
                <span className="bt-bar-label">{b.label}</span>
                <span className="bt-bar-pct"><b>{b.actualPct}</b><span className="bt-bar-target"> / {b.targetPct}</span></span>
              </div>
              <div className="bt-bar-track">
                <div className="bt-bar-fill" style={{ width: b.fillWidth, background: b.fillColor }} />
                <div className="bt-bar-tick" style={{ left: b.tickLeft }} />
              </div>
            </div>
          ))}
        </div>

        {/* money flow */}
        <div className="bt-card">
          <div className="bt-kicker">{c.flowTitle}</div>
          <div className="bt-flow">
            {flowSegs.map((f, i) => (
              <div key={i} className="bt-flow-seg" style={{ width: f.width, background: f.bg }} />
            ))}
          </div>
          <div className="bt-flow-legend">
            {flowSegs.map((f, i) => (
              <div key={i} className="bt-flow-key">
                <span className="bt-flow-swatch" style={{ background: f.color }} />
                <span className="bt-flow-klabel">{f.label}</span>
                <span className="bt-flow-kpct">{f.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* baseline + runway */}
        <div className="bt-twin">
          <div className="bt-card bt-stat">
            <div className="bt-kicker">{c.baseTitle}</div>
            <div className="bt-bignum">
              <span className="bt-bignum-cur">{cur}</span>
              <span className="bt-bignum-v">{baseNum}</span>
              <span className="bt-bignum-u">{c.perMonth}</span>
            </div>
            <div className="bt-stat-sub">{c.baseSub}</div>
          </div>
          <div className="bt-card bt-stat">
            <div className="bt-kicker">{c.runwayTitle}</div>
            <div className="bt-bignum">
              <span className="bt-bignum-v">{runwayStr}</span>
              <span className="bt-bignum-u">{c.monthsU}</span>
            </div>
            <div className="bt-pips">
              {runwayPips.map((p, i) => (
                <div key={i} className="bt-pip" style={{ background: p.bg }} />
              ))}
            </div>
            <div className="bt-runway-note" style={{ color: runwayColor }}>{runwayNote}</div>
          </div>
        </div>

        {/* suggestions */}
        <div className="bt-card bt-honeycard">
          <div className="bt-notes-head">
            <span className="bt-notes-star">✦</span>
            <h3 className="bt-notes-title">{c.notesTitle}</h3>
          </div>
          <div className="bt-notes-sub">{c.notesSub}</div>
          {suggestions.map((s, i) => (
            <div className="bt-note" key={i}>
              <span className="bt-note-arrow">→</span>
              <p className="bt-note-text">{s}</p>
            </div>
          ))}
        </div>

        {/* export */}
        <div className="bt-card">
          <h3 className="bt-export-title">{c.exportTitle}</h3>
          <div className="bt-export-sub">{c.exportSub}</div>
          <div className="bt-export-grid2">
            <button className="bt-export-btn" onClick={exportCSV}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><line x1="4" y1="10" x2="20" y2="10" /><line x1="12" y1="4" x2="12" y2="20" /></svg>
              {c.expExcel}
            </button>
            <button className="bt-export-btn" onClick={printPDF}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 9V4h10v5" /><rect x="5" y="9" width="14" height="8" rx="1.5" /><path d="M8 17h8v3H8z" /></svg>
              {c.expPDF}
            </button>
          </div>
          <div className="bt-wall-label">
            <span>📌</span><span className="bt-wall-label-t">{c.exportWallLabel}</span>
          </div>
          <div className="bt-export-grid3">
            <button className="bt-wall-btn" onClick={() => exportWallpaper("phone")} disabled={!!busy}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="3" width="10" height="18" rx="2.5" /><line x1="10.5" y1="18" x2="13.5" y2="18" /></svg>
              {busy === "phone" ? c.exporting : c.expWallPhone}
            </button>
            <button className="bt-wall-btn" onClick={() => exportWallpaper("pad")} disabled={!!busy}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2.5" /><line x1="10.5" y1="18" x2="13.5" y2="18" /></svg>
              {busy === "pad" ? c.exporting : c.expWallPad}
            </button>
            <button className="bt-wall-btn" onClick={() => exportWallpaper("desktop")} disabled={!!busy}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="16" x2="12" y2="20" /></svg>
              {busy === "desktop" ? c.exporting : c.expWallPC2}
            </button>
          </div>
          <div className="bt-export-note">{c.exportNote}</div>
        </div>
      </div>
    </div>
  );
}

// ── styles (design-system tokens from index.css) ─────
const CSS = `
.bt {
  max-width: 1180px; margin: 0 auto; padding: 34px 40px 20px;
  display: grid; grid-template-columns: 1.08fr 0.92fr; gap: 26px; align-items: start;
}
.bt *, .bt *::before, .bt *::after { box-sizing: border-box; }
.bt input::placeholder { color: var(--ink-200); }

.bt-form { display: flex; flex-direction: column; gap: 14px; }
.bt-curbar { display: flex; align-items: center; justify-content: flex-end; gap: 9px; }
.bt-curlabel { font-size: 12px; color: var(--ink-300); }
.bt-pillgroup { display: flex; gap: 2px; background: var(--surface); border: 1px solid var(--line); border-radius: 999px; padding: 3px; }
.bt-pill {
  border: none; cursor: pointer; font-family: var(--font-sans); font-size: 12.5px; font-weight: 600;
  padding: 5px 13px; border-radius: 999px; background: none; color: var(--ink-300); transition: all .15s;
}
.bt-pill.on { background: var(--honey); color: #fff; }

.bt-cat { background: var(--surface); border: 1px solid var(--line-2); border-radius: 16px; overflow: hidden; }
.bt-cat-head { display: flex; align-items: center; gap: 12px; width: 100%; padding: 18px 22px; background: none; border: none; cursor: pointer; text-align: left; }
.bt-cat-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.bt-cat-name { font-size: 16px; font-weight: 600; color: var(--ink); }
.bt-cat-hint { font-size: 12px; font-weight: 500; color: var(--ink-300); margin-left: -4px; }
.bt-cat-meta { font-size: 11px; color: var(--ink-400); background: var(--surface-2); padding: 3px 9px; border-radius: 999px; }
.bt-spacer { flex: 1; }
.bt-cat-total { font-family: var(--font-serif); font-size: 19px; font-weight: 600; letter-spacing: -0.3px; }
.bt-cat-chev { color: var(--ink-300); font-size: 11px; width: 14px; text-align: center; }
.bt-cat-body { padding: 0 22px 12px; }

.bt-row {
  position: relative; display: flex; align-items: center; gap: 10px; padding: 8px 0;
  border-top: 1px solid var(--line-2); transition: opacity .15s, background .15s, box-shadow .15s;
}
.bt-row.is-dragging { opacity: .42; }
.bt-row.drop-before { box-shadow: inset 0 2px 0 var(--honey); }
.bt-row.drop-after { box-shadow: inset 0 -2px 0 var(--honey); }
.bt-row-drag {
  width: 18px; height: 30px; flex-shrink: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 3px; padding: 0; border: none;
  background: none; color: var(--ink-200); cursor: grab; touch-action: none;
  transition: color .15s, transform .15s;
}
.bt-row-drag:hover { color: var(--ink-500); transform: scale(1.06); }
.bt-row-drag:active { cursor: grabbing; }
.bt-row-drag span { width: 12px; height: 1.5px; border-radius: 2px; background: currentColor; pointer-events: none; }
.bt-row-label { flex: 1; font-size: 14px; color: var(--ink-700); }
.bt-row-label-input { flex: 1; min-width: 0; border: none; background: none; font-family: var(--font-sans); font-size: 14px; color: var(--ink-700); outline: none; }
.bt-amt { display: flex; align-items: center; gap: 5px; width: 142px; border: 1px solid var(--line); border-radius: 9px; padding: 8px 11px; background: var(--surface); }
.bt-amt-cur { font-size: 13px; color: var(--ink-300); }
.bt-amt-input { width: 100%; border: none; background: none; text-align: right; font-family: var(--font-sans); font-size: 14px; color: var(--ink); outline: none; font-variant-numeric: tabular-nums; }
.bt-row-x { width: 22px; height: 22px; flex-shrink: 0; border: none; background: none; color: var(--ink-200); cursor: pointer; font-size: 16px; line-height: 1; transition: color .15s; }
.bt-row-x:hover { color: var(--ink-500); }
.bt-addrow { margin-top: 10px; background: none; border: none; color: var(--ink-400); cursor: pointer; font-family: var(--font-sans); font-size: 13px; font-weight: 500; transition: color .15s; }
.bt-addrow:hover { color: var(--ink); }

.bt-emerg { background: var(--honey-soft); border: 1px solid #ecdcb8; border-radius: 16px; padding: 18px 22px; }
.bt-emerg-top { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
.bt-emerg-title { font-size: 14px; font-weight: 600; }
.bt-amt-emerg { width: 160px; border-color: #e2cf9f; }
.bt-emerg-hint { font-size: 12px; color: var(--ink-400); margin-top: 8px; line-height: 1.5; }

.bt-summary { position: sticky; top: 20px; display: flex; flex-direction: column; gap: 14px; }
.bt-card { background: var(--surface); border: 1px solid var(--line-2); border-radius: 16px; padding: 22px 24px; }
.bt-honeycard { border-color: #ecdcb8; }
.bt-kicker { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-300); margin-bottom: 16px; }

.bt-overview { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; }
.bt-ov-left { flex: 1; }
.bt-ov-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 9px; }
.bt-ov-row:last-child { margin-bottom: 0; }
.bt-ov-l { font-size: 13.5px; color: var(--ink-500); }
.bt-ov-v { font-family: var(--font-serif); font-size: 16px; }
.bt-donut { position: relative; width: 118px; height: 118px; flex-shrink: 0; }
.bt-donut-svg { width: 118px; height: 118px; transform: rotate(-90deg); }
.bt-donut-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.bt-donut-l { font-size: 10px; color: var(--ink-300); letter-spacing: 0.04em; }
.bt-donut-v { font-family: var(--font-serif); font-size: 30px; font-weight: 600; letter-spacing: -1px; line-height: 1; }
.bt-verdict { margin-top: 16px; padding: 13px 15px; background: var(--paper); border-radius: 11px; font-size: 14px; line-height: 1.55; color: var(--ink-700); }

.bt-freedom-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.bt-freedom-kicker { font-size: 11px; font-weight: 600; letter-spacing: 0.13em; text-transform: uppercase; color: var(--honey); }
.bt-freedom-remain { font-size: 12px; color: var(--ink-400); }
.bt-freedom-remain b { color: var(--ink-700); font-variant-numeric: tabular-nums; }
.bt-freedom-main { display: flex; align-items: flex-end; gap: 16px; }
.bt-freedom-num { font-family: var(--font-serif); font-size: 46px; font-weight: 600; letter-spacing: -1.5px; line-height: 0.85; color: var(--honey); }
.bt-freedom-trackwrap { flex: 1; padding-bottom: 7px; }
.bt-freedom-track { position: relative; height: 10px; background: var(--line-2); border-radius: 6px; }
.bt-freedom-fill { position: absolute; left: 0; top: 0; height: 100%; border-radius: 6px; background: var(--honey); transition: width .5s cubic-bezier(.2,.7,.2,1); }
.bt-freedom-plane { position: absolute; top: -13px; width: 26px; height: auto; transform: translateX(-50%); transition: left .5s cubic-bezier(.2,.7,.2,1); }
.bt-freedom-lever { margin-top: 16px; font-size: 13px; color: var(--ink-700); }
.bt-freedom-lever b { color: var(--honey); }
.bt-freedom-hint { margin-top: 7px; font-size: 11.5px; color: var(--ink-300); line-height: 1.5; }

.bt-bar { margin-bottom: 16px; }
.bt-bar:last-child { margin-bottom: 0; }
.bt-bar-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 7px; }
.bt-bar-label { font-size: 13px; color: var(--ink-700); }
.bt-bar-pct { font-size: 13px; }
.bt-bar-pct b { font-variant-numeric: tabular-nums; }
.bt-bar-target { color: var(--ink-300); }
.bt-bar-track { position: relative; height: 8px; background: var(--line-2); border-radius: 5px; }
.bt-bar-fill { height: 100%; border-radius: 5px; transition: width .5s cubic-bezier(.2,.7,.2,1); }
.bt-bar-tick { position: absolute; top: -3px; width: 2px; height: 14px; background: var(--ink-300); border-radius: 2px; }

.bt-flow { display: flex; gap: 3px; height: 26px; border-radius: 7px; overflow: hidden; }
.bt-flow-seg { height: 100%; min-width: 2px; transition: width .5s cubic-bezier(.2,.7,.2,1); }
.bt-flow-legend { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 14px; }
.bt-flow-key { display: flex; align-items: center; gap: 7px; }
.bt-flow-swatch { width: 8px; height: 8px; border-radius: 2px; }
.bt-flow-klabel { font-size: 12px; color: var(--ink-500); }
.bt-flow-kpct { font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums; }

.bt-twin { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.bt-stat { padding: 18px 20px; }
.bt-stat .bt-kicker { letter-spacing: 0.12em; margin-bottom: 12px; }
.bt-bignum { display: flex; align-items: baseline; gap: 3px; }
.bt-bignum-cur { font-size: 16px; color: var(--ink-400); }
.bt-bignum-v { font-family: var(--font-serif); font-size: 30px; font-weight: 600; letter-spacing: -1px; }
.bt-bignum-u { font-size: 13px; color: var(--ink-400); margin-left: 1px; }
.bt-stat-sub { font-size: 12px; color: var(--ink-400); margin-top: 8px; line-height: 1.5; }
.bt-pips { display: flex; gap: 3px; margin-top: 11px; }
.bt-pip { flex: 1; height: 6px; border-radius: 3px; transition: background .4s; }
.bt-runway-note { font-size: 12px; margin-top: 9px; }

.bt-notes-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 3px; }
.bt-notes-star { color: var(--honey); font-size: 16px; }
.bt-notes-title { font-family: var(--font-serif); font-size: 19px; font-weight: 600; letter-spacing: -0.3px; margin: 0; }
.bt-notes-sub { font-size: 12.5px; color: var(--ink-400); margin: 0 0 17px 26px; }
.bt-note { display: flex; gap: 11px; margin-bottom: 14px; align-items: flex-start; }
.bt-note:last-child { margin-bottom: 0; }
.bt-note-arrow { color: var(--honey); font-size: 14px; flex-shrink: 0; transform: translateY(2px); }
.bt-note-text { font-size: 14px; color: var(--ink-700); line-height: 1.65; margin: 0; }

.bt-export-title { font-family: var(--font-serif); font-size: 19px; font-weight: 600; letter-spacing: -0.3px; margin: 0 0 3px; }
.bt-export-sub { font-size: 12.5px; color: var(--ink-400); margin-bottom: 16px; }
.bt-export-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.bt-export-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border: 1px solid var(--line); border-radius: 10px; background: var(--surface); font-family: var(--font-sans); font-size: 13.5px; font-weight: 600; color: var(--ink); cursor: pointer; transition: border-color .15s; }
.bt-export-btn:hover { border-color: var(--ink-300); }
.bt-wall-label { display: flex; align-items: center; gap: 8px; margin: 18px 0 12px; }
.bt-wall-label-t { font-size: 12.5px; font-weight: 600; color: var(--honey); line-height: 1.4; }
.bt-export-grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
.bt-wall-btn { display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 14px 8px; border: 1px solid var(--line); border-radius: 10px; background: var(--honey-soft); cursor: pointer; font-family: var(--font-sans); font-size: 12.5px; font-weight: 600; color: var(--ink); transition: border-color .15s; }
.bt-wall-btn:hover:not(:disabled) { border-color: var(--honey); }
.bt-export-btn:disabled, .bt-wall-btn:disabled { opacity: .55; cursor: default; }
.bt-export-note { font-size: 11.5px; color: var(--ink-300); margin-top: 12px; line-height: 1.5; }

@media (max-width: 920px) {
  .bt { grid-template-columns: 1fr; padding: 28px clamp(20px, 5vw, 40px) 20px; }
  .bt-summary { position: static; }
}
@media (max-width: 480px) {
  .bt-twin { grid-template-columns: 1fr; }
  .bt-cat-body { padding-left: 16px; padding-right: 16px; }
  .bt-row { gap: 8px; }
  .bt-amt { width: 122px; }
}
@media (prefers-reduced-motion: reduce) {
  .bt-freedom-fill, .bt-freedom-plane, .bt-bar-fill, .bt-flow-seg, .bt-pip, .bt-row, .bt-row-drag { transition: none; }
}
`;

// ── wallpaper export (canvas) ────────────────────────
// A momentum-focused, encouraging wallpaper: the save rate is the hero,
// the 50/30/20 split + freedom meter are the visual anchors, and a warm
// one-liner keeps the tone positive. Dark warm ground + honey glow so it
// sits well behind home-screen icons.
function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
async function loadFonts() { try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) { /* noop */ } }
function loadImg(src) {
  return new Promise((res) => {
    const im = new Image();
    im.onload = () => res(im); im.onerror = () => res(null);
    im.src = src;
  });
}
function rr(x, X, Y, W, H, R) {
  const r = Math.min(R, W / 2, H / 2);
  x.beginPath();
  x.moveTo(X + r, Y);
  x.arcTo(X + W, Y, X + W, Y + H, r);
  x.arcTo(X + W, Y + H, X, Y + H, r);
  x.arcTo(X, Y + H, X, Y, r);
  x.arcTo(X, Y, X + W, Y, r);
  x.closePath();
}
function wpMomentum(o) {
  const z = o.lang === "zh";
  if (!o.hasData) return z ? "先填一笔收入，让钱开始替你打工。" : "Add one income line — let your money start working.";
  if (o.unallocPct > 5) return z ? `还有 ${Math.round(o.unallocPct)}% 在等你派活儿——发薪日先安排它。` : `${Math.round(o.unallocPct)}% is still waiting for a job — assign it on payday.`;
  if (o.rate >= 20) return z ? `存下 ${o.rate}%。未来的你正在偷偷比心。` : `Saving ${o.rate}% — future you is throwing a tiny party.`;
  if (o.rate > 0) return z ? "已经在路上了——每一块都在替你打工。" : "On your way — every dollar is clocking in.";
  return z ? "先给未来留个座位，哪怕一块钱。" : "Save future-you a seat — even a dollar counts.";
}
function wpWrap(x, str, maxW) {
  const tokens = String(str).match(/[一-鿿]|[^一-鿿\s]+|\s+/g) || [];
  const noLead = "。，、！？：；）】」』%";
  const lines = []; let cur = "";
  for (const t of tokens) {
    const test = cur + t;
    // never let closing punctuation start a fresh line — keep it glued to the line before
    if (x.measureText(test).width > maxW && cur.trim() && !noLead.includes(t)) {
      lines.push(cur.trim()); cur = /\s/.test(t) ? "" : t;
    } else cur = test;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}
async function renderWallpaper(o) {
  await loadFonts();
  const plane = await loadImg("/air.png");
  const SPEC = { phone: [1170, 2532], pad: [1668, 2388], desktop: [2560, 1440] };
  const [W, H] = SPEC[o.kind] || SPEC.phone;
  const land = o.kind === "desktop";
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const x = cv.getContext("2d");
  const z = o.lang === "zh";
  const SANS = "'Inter','Noto Sans SC',sans-serif";
  const SERIF = "'Fraunces','Noto Serif SC',serif";
  const HAND = "'LXGW WenKai','Noto Serif SC',serif";
  const PAPER = "#f4f2ec", HONEY = "#e4a11b", CORAL = "#f4845f", NEEDS = "#d8cfbe";
  const MUT = "rgba(244,242,236,0.55)", FAINT = "rgba(244,242,236,0.13)";

  // ground + honey glow
  const grad = x.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#211d18"); grad.addColorStop(1, "#15120e");
  x.fillStyle = grad; x.fillRect(0, 0, W, H);
  const gx = land ? W * 0.74 : W * 0.66, gy = land ? H * 0.42 : H * 0.30;
  const glow = x.createRadialGradient(gx, gy, 30, gx, gy, Math.max(W, H) * 0.72);
  glow.addColorStop(0, "rgba(228,161,27,0.20)"); glow.addColorStop(1, "rgba(228,161,27,0)");
  x.fillStyle = glow; x.fillRect(0, 0, W, H);

  const period = (() => { const d = new Date(); return z ? `${d.getFullYear()} · ${d.getMonth() + 1}月` : d.toLocaleDateString("en-US", { month: "short", year: "numeric" }); })();
  const sym = o.cur;
  const rateStr = o.hasData ? `${o.rate}%` : "—";
  const k = land ? W / 2560 : W / 1170; // type scale

  const segs = [
    { pct: o.needsPct, color: NEEDS, label: z ? "必要" : "Needs" },
    { pct: o.wantsPct, color: CORAL, label: z ? "想要" : "Wants" },
    { pct: o.savingsPct, color: HONEY, label: z ? "储蓄" : "Save" },
  ];
  if (o.unallocPct > 0.5) segs.push({ pct: o.unallocPct, color: FAINT, label: z ? "待分配" : "Unassigned", faint: true });
  const denom = Math.max(100, segs.reduce((a, s) => a + s.pct, 0));

  // shared draw helpers ----------------------------------
  const drawBar = (X, Y, w, h) => {
    let bx = X;
    const gap = 8 * k;
    segs.forEach((s) => {
      const sw = (s.pct / denom) * w;
      if (sw <= 0.5) return;
      x.fillStyle = s.color;
      rr(x, bx, Y, Math.max(2, sw - gap), h, h / 2); x.fill();
      bx += sw;
    });
  };
  const drawLegend = (X, Y, w) => {
    x.textAlign = "left"; x.textBaseline = "alphabetic";
    const items = segs.filter((s) => s.pct > 0.5);
    const colW = w / items.length;
    items.forEach((s, i) => {
      const cx0 = X + i * colW;
      x.fillStyle = s.faint ? "rgba(244,242,236,0.4)" : s.color;
      x.beginPath(); x.arc(cx0 + 7 * k, Y - 7 * k, 7 * k, 0, 7); x.fill();
      x.fillStyle = MUT; x.font = `500 ${24 * k}px ${SANS}`;
      x.fillText(s.label, cx0 + 22 * k, Y);
      x.fillStyle = PAPER; x.font = `600 ${24 * k}px ${SANS}`;
      x.fillText(`${Math.round(s.pct)}%`, cx0 + 22 * k, Y + 30 * k);
    });
  };
  const drawFreedom = (X, Y, w) => {
    x.textAlign = "left"; x.textBaseline = "alphabetic";
    x.fillStyle = MUT; x.font = `500 ${26 * k}px ${SANS}`;
    x.fillText(z ? "离财务自由" : "To financial freedom", X, Y);
    x.fillStyle = HONEY; x.font = `600 ${64 * k}px ${SERIF}`;
    x.textAlign = "right"; x.fillText(`${o.freedom}%`, X + w, Y + 6 * k); x.textAlign = "left";
    const ty = Y + 34 * k, th = 14 * k;
    x.fillStyle = "rgba(244,242,236,0.16)"; rr(x, X, ty, w, th, th / 2); x.fill();
    const fw = Math.max(th, (o.freedom / 100) * w);
    x.fillStyle = HONEY; rr(x, X, ty, fw, th, th / 2); x.fill();
    if (plane) { const pw = 46 * k; x.drawImage(plane, X + fw - pw / 2, ty - pw * 0.55, pw, pw * (plane.height / plane.width)); }
  };
  const drawStat = (label, value, X, Y) => {
    x.textAlign = "left"; x.textBaseline = "alphabetic";
    x.fillStyle = MUT; x.font = `500 ${26 * k}px ${SANS}`;
    x.fillText(label, X, Y);
    x.fillStyle = PAPER; x.font = `600 ${56 * k}px ${SERIF}`;
    x.fillText(value, X, Y + 60 * k);
  };
  const baseVal = `${sym}${o.baseStr}${z ? " / 月" : " / mo"}`;
  const runwayVal = `${o.runway > 0 ? o.runway.toFixed(1) : "0.0"} ${z ? "个月" : "mo"}`;

  if (!land) {
    // ── portrait (phone / pad) ──
    const cx = W / 2;
    const barW = W * 0.74, barX = cx - barW / 2;
    x.textAlign = "center"; x.textBaseline = "alphabetic";

    // brand eyebrow
    x.fillStyle = HONEY; x.font = `700 ${28 * k}px ${SANS}`;
    x.save(); const ls = 6 * k;
    drawTracked(x, (z ? "MONEY OS · 第一步" : "MONEY OS · STEP ONE"), cx, H * 0.115, ls);
    x.restore();

    // hero save rate
    x.fillStyle = MUT; x.font = `500 ${30 * k}px ${SANS}`;
    x.fillText(z ? "本月储蓄率" : "This month's save rate", cx, H * 0.205);
    x.fillStyle = PAPER; x.font = `600 ${300 * k}px ${SERIF}`;
    x.fillText(rateStr, cx, H * 0.32);

    // 50/30/20 bar + legend
    drawBar(barX, H * 0.39, barW, 34 * k);
    drawLegend(barX, H * 0.45, barW);

    // freedom
    drawFreedom(barX, H * 0.56, barW);

    // stats
    drawStat(z ? "财务底线" : "Baseline", baseVal, barX, H * 0.66);
    drawStat(z ? "应急金跑道" : "Runway", runwayVal, cx + 10 * k, H * 0.66);

    // momentum line
    x.textAlign = "center";
    x.fillStyle = PAPER; x.font = `400 ${44 * k}px ${HAND}`;
    const lines = wpWrap(x, wpMomentum(o), barW);
    lines.forEach((ln, i) => x.fillText(ln, cx, H * 0.80 + i * 60 * k));

    // footer
    x.fillStyle = HONEY; x.font = `600 ${28 * k}px ${SANS}`;
    x.fillText("Chaologies · 超说", cx, H * 0.93);
    x.fillStyle = "rgba(244,242,236,0.4)"; x.font = `500 ${24 * k}px ${SANS}`;
    x.fillText(period, cx, H * 0.955);
  } else {
    // ── landscape (desktop) ──
    const pad = 200 * k;
    const colR = W * 0.55;
    x.textAlign = "left"; x.textBaseline = "alphabetic";

    // left: hero
    x.fillStyle = HONEY; x.font = `700 ${30 * k}px ${SANS}`;
    drawTracked(x, (z ? "MONEY OS · 第一步" : "MONEY OS · STEP ONE"), pad, H * 0.22, 6 * k, "left");
    x.fillStyle = MUT; x.font = `500 ${32 * k}px ${SANS}`;
    x.fillText(z ? "本月储蓄率" : "This month's save rate", pad, H * 0.31);
    x.fillStyle = PAPER; x.font = `600 ${300 * k}px ${SERIF}`;
    x.fillText(rateStr, pad - 6 * k, H * 0.55);
    x.fillStyle = PAPER; x.font = `400 ${46 * k}px ${HAND}`;
    const lines = wpWrap(x, wpMomentum(o), colR - pad - 40 * k);
    lines.forEach((ln, i) => x.fillText(ln, pad, H * 0.66 + i * 60 * k));

    // right column
    const rx = colR, rw = W - pad - colR;
    drawBar(rx, H * 0.26, rw, 36 * k);
    drawLegend(rx, H * 0.34, rw);
    drawFreedom(rx, H * 0.50, rw);
    drawStat(z ? "财务底线" : "Baseline", baseVal, rx, H * 0.66);
    drawStat(z ? "应急金跑道" : "Runway", runwayVal, rx + rw * 0.5, H * 0.66);

    // footer
    x.fillStyle = HONEY; x.font = `600 ${28 * k}px ${SANS}`;
    x.fillText("Chaologies · 超说", pad, H - 90 * k);
    x.fillStyle = "rgba(244,242,236,0.4)"; x.font = `500 ${24 * k}px ${SANS}`;
    x.fillText(period, pad + 280 * k, H - 90 * k);
  }
  return cv;
}
function drawTracked(x, str, X, Y, ls, align = "center") {
  // letter-spaced text (canvas has no native tracking)
  const chars = [...str];
  const widths = chars.map((ch) => x.measureText(ch).width + ls);
  const total = widths.reduce((a, w) => a + w, 0) - ls;
  let sx = align === "center" ? X - total / 2 : X;
  const prevAlign = x.textAlign;
  x.textAlign = "left";
  chars.forEach((ch, i) => { x.fillText(ch, sx, Y); sx += widths[i]; });
  x.textAlign = prevAlign;
}
