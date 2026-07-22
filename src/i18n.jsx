// ─────────────────────────────────────────────────────
//  i18n.jsx — 简 / 繁 / EN
//  · Copy is authored as { en, zh }（zh = 简体）
//  · 繁体 via opencc-js（懒加载，只在用户切到「繁」时才拉字典）
//  · 可选 obj.tw 手写覆盖（转换不理想的句子用它）
// ─────────────────────────────────────────────────────

import { useEffect, useState } from "react";

let cc = null; // converter fn once dictionaries load
let ccPromise = null;
const twCache = new Map();

export function loadTw() {
  if (!ccPromise) {
    ccPromise = import("opencc-js")
      .then((OpenCC) => {
        cc = OpenCC.Converter({ from: "cn", to: "tw" });
        return cc;
      })
      .catch(() => {
        ccPromise = null; // allow retry on next switch
      });
  }
  return ccPromise;
}

function toTw(s) {
  if (!s || !cc) return s || "";
  let v = twCache.get(s);
  if (v === undefined) {
    v = cc(s);
    twCache.set(s, v);
  }
  return v;
}

/** Translate a { en, zh, tw? } object — or a plain zh string — for `lang`. */
export function tr(obj, lang) {
  if (obj == null) return "";
  if (typeof obj === "string") return lang === "tw" ? toTw(obj) : obj;
  if (lang === "en") return obj.en ?? obj.zh ?? "";
  if (lang === "tw") return obj.tw ?? toTw(obj.zh ?? obj.en ?? "");
  return obj.zh ?? obj.en ?? "";
}

/** Kick off dictionary load when 繁 is selected; flips once ready to re-render. */
export function useTw(lang) {
  const [ready, setReady] = useState(!!cc);
  useEffect(() => {
    if (lang === "tw" && !cc) loadTw().then(() => setReady(true));
  }, [lang]);
  return ready;
}

const LANGS = [
  ["zh", "简"],
  ["tw", "繁"],
  ["en", "EN"],
];

export function LangToggle({ lang, setLang }) {
  return (
    <div className="lang">
      {LANGS.map(([v, label]) => (
        <button key={v} className={lang === v ? "on" : ""} onClick={() => setLang(v)}>
          {label}
        </button>
      ))}
    </div>
  );
}
