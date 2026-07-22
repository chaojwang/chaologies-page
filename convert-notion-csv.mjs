/* ============================================================
   Notion 导出 CSV → books.json 转换器 v2（已按真实导出校准）
   用法：node convert-notion-csv.mjs <导出.csv> > src/data/books.json
   产品分层：网页版只取「认知标题行 ×3」和「第一句引言中英对照」，
   十句话全文与认知展开留给 Notion / 飞书模板独占。
   「原版试读」列刻意不导出（版权风险，见交付说明）。
   ============================================================ */
import { readFileSync } from "node:fs";

const COLS = {
  en: "英文书名",
  zh: "中文书名",
  author: "作者",
  ability: "能力",
  oneLine: "一句话",
  insights: "3个核心认知",
  quotes: "一直留在我脑子里的10句话",
  change: "我的一个改变",
  exercise: "小练习",
  hasZh: "是否有中文版本",
  from: "作者来自",
};

function parseCSV(text) {
  const rows = []; let row = [], field = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i+1] === '"') { field += '"'; i++; } else inQ = false; }
      else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i+1] === "\n") i++;
        row.push(field); field = "";
        if (row.some(f => f.trim() !== "")) rows.push(row);
        row = [];
      } else field += c;
    }
  }
  if (field !== "" || row.length) { row.push(field); if (row.some(f => f.trim() !== "")) rows.push(row); }
  return rows;
}

// 认知：按 1️⃣2️⃣3️⃣（或 ①②③ / 1. 2. 3.）分段，取每段标题行
function extractInsights(raw) {
  if (!raw.trim()) return [];
  let parts = raw.split(/[1-3]\uFE0F\u20E3/).map(s => s.trim()).filter(Boolean);
  if (parts.length < 2) parts = raw.split(/[①②③]/).map(s => s.trim()).filter(Boolean);
  if (parts.length < 2) parts = raw.split(/\n(?=[1-3][.、])/).map(s => s.replace(/^[1-3][.、]\s*/, "").trim()).filter(Boolean);
  return parts.slice(0, 3).map(p => p.split("\n")[0].replace(/[：:，,]$/, "").trim()).filter(Boolean);
}

// 引言：取第一组 “英文” + 「中文」
function extractQuote(raw) {
  const en = (raw.match(/[“"]([^”"]+)[”"]/) || [])[1] || raw.split("\n")[0].trim();
  const zh = (raw.match(/「([^」]+)」/) || [])[1] || "";
  return { quote: en.trim(), quoteZh: zh.trim() };
}

const file = process.argv[2];
if (!file) { console.error("用法: node convert-notion-csv.mjs <导出.csv> > books.json"); process.exit(1); }

const rows = parseCSV(readFileSync(file, "utf8"));
const header = rows[0].map(h => h.trim().replace(/^\uFEFF/, ""));
const idx = {};
for (const [key, colName] of Object.entries(COLS)) {
  idx[key] = header.findIndex(h => h === colName || h.startsWith(colName));
  if (idx[key] === -1) console.error(`⚠️ 找不到列「${colName}」，字段 ${key} 将为空`);
}

const books = rows.slice(1).map((r) => {
  const get = k => (idx[k] >= 0 ? (r[idx[k]] || "").trim() : "");
  const { quote, quoteZh } = extractQuote(get("quotes"));
  return {
    en: get("en"),
    zh: get("zh") || get("en"), // 5 本无中文书名，回退英文
    author: get("author"),
    ability: get("ability").split(/[｜|]/)[0].trim(),
    oneLine: get("oneLine"),
    insights: extractInsights(get("insights")),
    quote, quoteZh,
    change: get("change"),
    exercise: get("exercise"),
    hasZh: /有/.test(get("hasZh")),
    from: get("from"),
  };
}).filter(b => b.en || b.zh);

console.error(`✅ 转换完成：${books.length} 本`);
const bad = books.filter(b => b.insights.length < 3);
if (bad.length) console.error(`⚠️ ${bad.length} 本认知不足3条: ${bad.map(b=>b.en).slice(0,10).join(" / ")}`);
process.stdout.write(JSON.stringify(books, null, 2));
