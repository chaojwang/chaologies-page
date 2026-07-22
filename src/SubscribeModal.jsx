// ─────────────────────────────────────────────────────
//  SubscribeModal.jsx — 全站订阅弹窗
//  一个弹窗，两条通道：邮件 Newsletter + 微信公众号二维码
//  视觉记忆点：纸飞机 + 蜂蜜色顶带
// ─────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { tr } from "./i18n.jsx";

const T = {
  title: {
    en: "Make a complex life gradually clearer.",
    zh: "把复杂的生活，一点点变清楚。",
  },
  sub: {
    en: "Twice a month · money, minimalism & good books · free, always",
    zh: "每月两篇 · 关于金钱、极简与好书 · 完全免费",
  },
  emailK: { en: "The Newsletter", zh: "邮件订阅" },
  emailPh: { en: "Your email address", zh: "你的邮件地址" },
  emailBtn: { en: "Subscribe free", zh: "免费订阅" },
  emailFine: {
    en: "One email, no spreadsheets. Unsubscribe anytime.",
    zh: "一封邮件，不含任何报表。随时退订。",
  },
  success: { en: "✓ Subscribed — thanks!", zh: "✓ 已订阅，感谢！" },
  error: { en: "Something went wrong, try again", zh: "出错了，请稍后再试" },
  or: { en: "or", zh: "或" },
  wxK: { en: "WeChat", zh: "微信公众号" },
  wxHint: {
    en: "Scan to follow · Chaologies 超說",
    zh: "扫码关注「Chaologies 超說」",
    tw: "掃碼關注「Chaologies 超說」",
  },
};

export default function SubscribeModal({ lang, onClose }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  return createPortal(
    <div className="sm-overlay" onClick={onClose}>
      <div className="sm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="sm-x" onClick={onClose} aria-label="Close">×</button>

        <div className="sm-head">
          <img className="sm-plane" src="/air.png" alt="" />
          <h3 className="sm-title">{tr(T.title, lang)}</h3>
          <p className="sm-sub">{tr(T.sub, lang)}</p>
        </div>

        <div className="sm-body">
          {/* Email column */}
          <div className="sm-col">
            <span className="sm-col-k">📮 {tr(T.emailK, lang)}</span>
            {state === "success" ? (
              <p className="sm-success">{tr(T.success, lang)}</p>
            ) : (
              <form className="sm-form" onSubmit={handleSubmit}>
                <input
                  className="sm-email"
                  type="email"
                  required
                  placeholder={tr(T.emailPh, lang)}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
                />
                <button className="sm-btn" type="submit" disabled={state === "loading"}>
                  {state === "loading" ? "…" : tr(T.emailBtn, lang)}
                </button>
                {state === "error" && <p className="sm-error">{tr(T.error, lang)}</p>}
              </form>
            )}
            <p className="sm-fine">{tr(T.emailFine, lang)}</p>
          </div>

          <div className="sm-or"><span>{tr(T.or, lang)}</span></div>

          {/* WeChat column */}
          <div className="sm-col sm-col-wx">
            <span className="sm-col-k">💬 {tr(T.wxK, lang)}</span>
            <img className="sm-qr" src="/wechat-qr.png" alt="WeChat QR" />
            <p className="sm-fine">{tr(T.wxHint, lang)}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
