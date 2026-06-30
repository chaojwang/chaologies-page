// ─────────────────────────────────────────────────────
//  WechatModal.jsx — shared QR overlay (homepage + budget)
// ─────────────────────────────────────────────────────

import { useEffect } from "react";

const HINT = {
  en: "Scan to follow on WeChat · Chaologies 超說",
  zh: "扫码关注公众号「Chaologies 超說」",
};
const CLOSE = { en: "Close", zh: "关闭" };

export default function WechatModal({ lang, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="wq-overlay" onClick={onClose}>
      <div className="wq-modal" onClick={(e) => e.stopPropagation()}>
        <img src="/wechat-qr.png" alt="WeChat QR" className="wq-img" />
        <p className="wq-hint">{HINT[lang] || HINT.zh}</p>
        <button className="wq-close" onClick={onClose}>{CLOSE[lang] || CLOSE.zh}</button>
      </div>
    </div>
  );
}
