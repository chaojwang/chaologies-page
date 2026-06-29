const COURSE_URL = "https://app0v0tctza4800.pc.xiaoe-tech.com/p/t_pc/goods_pc_detail/goods_detail/course_2Z80SD8YWOGbjWWEqHEh6Q5lTZk";

function PrimaryBtn({ href, children, size = "md" }) {
  const pad = size === "lg" ? "16px 32px" : "10px 22px";
  const fs = size === "lg" ? 16 : 14;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-block", background: "var(--honey)", color: "#fff", border: "none", borderRadius: 8, padding: pad, fontSize: fs, fontWeight: 700, fontFamily: "var(--font-sans)", cursor: "pointer", textDecoration: "none", transition: "background .15s" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--honey-600)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "var(--honey)"; }}
    >
      {children}
    </a>
  );
}

function Eyebrow({ children }) {
  return (
    <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--honey)" }}>
      {children}
    </p>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div style={{ fontSize: 30, fontWeight: 700, color: "var(--honey)", letterSpacing: -1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--ink-400)", marginTop: 3 }}>{label}</div>
    </div>
  );
}

function StatDivider() {
  return <div style={{ width: 1, background: "var(--line)", margin: "4px 28px", flexShrink: 0 }} />;
}

const PAIN_POINTS = [
  { emoji: "🎬", title: '不知道口播视频"该怎么剪"', body: "拍完了素材，打开 Final Cut Pro，然后呢？剪出来的总感觉少了什么，却说不清楚在哪里。" },
  { emoji: "🖥️", title: "买了软件，摸索成本太高", body: "教程看了一堆，零散的知识拼不出完整流程。越摸索越没信心，浪费了大量时间。" },
  { emoji: "⏰", title: '没时间，一直等"准备好了再开始"', body: '"有空了再学"——这一等可能就是一年。在职创作最需要的，是高效、能直接套用的方法。' },
];

const STEPS = [
  {
    step: "STEP 01", title: "组装 A-Cut", sub: "口播的底层骨架",
    items: ["创建项目 · 导入素材", "精剪口播 A-Roll", "核心快捷键一遍搞定", "高效建立时间线"],
  },
  {
    step: "STEP 02", title: "加入 B-Roll", sub: "让视频有血有肉",
    items: ["标题 · 字幕", "转场 · 动画效果", "录屏 · 图片 · 引用", "下三分之一条"],
  },
  {
    step: "STEP 03", title: "精修与输出", sub: "专业质感从这里来",
    items: ["背景音乐 · 音效", "人声调节", "画面色调", "导出 · 发布"],
  },
];

const CHECKLIST = [
  "Final Cut Pro X 从零到能用",
  "口播剪辑三部曲完整工作流",
  "课程资料包（模板 · 快捷键手册）",
  "Creator OS 将来免费升级",
];

export default function FCPXPage({ onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink-900)", fontFamily: "var(--font-sans)", lineHeight: 1.5 }}>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(244,242,236,0.88)", backdropFilter: "blur(12px)", borderBottom: "0.5px solid var(--line)", padding: "0 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--ink-400)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-sans)", padding: 0 }}>
            SimpleGrowth Academy
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 14, color: "var(--ink-500)" }}>¥599</span>
            <PrimaryBtn href={COURSE_URL}>立即购课</PrimaryBtn>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 640 }}>
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ background: "var(--paper)" }} />
          <div style={{ position: "relative" }}>
            <img src="/fcpx-chao.webp" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "85% center" }} alt="Chao" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--paper) 0%, rgba(244,242,236,0.6) 40%, transparent 80%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--paper) 0%, transparent 30%)" }} />
          </div>
        </div>
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "80px 40px 100px" }}>
          <div style={{ maxWidth: 560 }}>
            <Eyebrow>Final Cut Pro X · 口播剪辑课</Eyebrow>
            <h1 style={{ margin: "20px 0 0", fontSize: "clamp(40px,5vw,60px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: -2, color: "var(--ink-900)" }}>
              买了 Mac，<br />口播视频<br />
              <span style={{ color: "var(--honey)" }}>该怎么剪？</span>
            </h1>
            <p style={{ margin: "28px 0 0", fontSize: 18, lineHeight: 1.75, color: "var(--ink-500)", fontFamily: "var(--font-serif)", maxWidth: 460 }}>
              30 节录播课，带你从零建立一套口播剪辑工作流——用 Final Cut Pro，剪出专业质感的视频。
            </p>
            <div style={{ margin: "40px 0 0", display: "flex", gap: 0, alignItems: "stretch" }}>
              <Stat value="30+" label="节录播课" />
              <StatDivider />
              <div>
                <div style={{ fontSize: 30, fontWeight: 700, color: "var(--ink-900)", letterSpacing: -1 }}>40万+</div>
                <div style={{ fontSize: 12, color: "var(--ink-400)", marginTop: 3 }}>全网关注</div>
              </div>
              <StatDivider />
              <div>
                <div style={{ fontSize: 30, fontWeight: 700, color: "var(--ink-900)", letterSpacing: -1 }}>永久</div>
                <div style={{ fontSize: 12, color: "var(--ink-400)", marginTop: 3 }}>有效回看</div>
              </div>
            </div>
            <div style={{ margin: "40px 0 0", display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
              <PrimaryBtn href={COURSE_URL} size="lg">¥599 · 立即购课，开始剪辑 →</PrimaryBtn>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--honey)", background: "var(--honey-soft)", padding: "4px 10px", borderRadius: 6 }}>✦ 现在购买，Creator OS 升级永久免费</span>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section style={{ borderTop: "0.5px solid var(--line)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px" }}>
          <Eyebrow>你是不是也遇到了这些</Eyebrow>
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {PAIN_POINTS.map((p) => (
              <div key={p.title} style={{ background: "var(--surface)", border: "0.5px solid var(--line-2)", borderRadius: 12, padding: "36px 28px" }}>
                <div style={{ fontSize: 28, marginBottom: 18 }}>{p.emoji}</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 12px", lineHeight: 1.4 }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--ink-500)", margin: 0, fontFamily: "var(--font-serif)" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <div style={{ background: "var(--ink-900)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-400)" }}>课程结构</span>
          <div style={{ margin: "16px 0 0", display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5, color: "#fff", margin: 0 }}>三步，剪完一条口播视频</h2>
            <span style={{ fontSize: 16, color: "rgba(255,255,255,0.35)" }}>30+ 节课 · 全程录播 · 永久有效</span>
          </div>
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {STEPS.map((s) => (
              <div key={s.step} style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "36px 28px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--honey)", marginBottom: 20 }}>{s.step}</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 24px", fontStyle: "italic" }}>{s.sub}</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {s.items.map((item) => (
                    <li key={item} style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--honey)", flexShrink: 0 }}>—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INSTRUCTOR */}
      <section style={{ borderTop: "0.5px solid var(--line)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 64, alignItems: "center" }}>
            <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "3/4", background: "var(--ink-900)" }}>
              <img src="/fcpx-chao.webp" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "84% 5%" }} alt="Chao" />
            </div>
            <div>
              <Eyebrow>关于讲师</Eyebrow>
              <h2 style={{ margin: "16px 0 0", fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>这门课，是我自己走了弯路之后<br />想送给你的捷径</h2>
              {["几年前，我也买了 Final Cut Pro，然后打开——然后不知道怎么办。",
                "断断续续自学了两年，零散的教程堆成一堆，就是建不起完整流程。后来我逼自己从框架开始，用两年业余时间，做到了全网 40 万+关注，开拓了 7 条收入渠道。",
                "这门课是我的真实工作流，不是软件功能大全——是真正可以复用的剪辑框架。"
              ].map((text, i) => (
                <p key={i} style={{ margin: i === 0 ? "24px 0 0" : "16px 0 0", fontSize: 16, lineHeight: 1.85, color: "var(--ink-500)", fontFamily: "var(--font-serif)" }}>{text}</p>
              ))}
              <div style={{ marginTop: 36, display: "flex", gap: 0, alignItems: "stretch" }}>
                <div><div style={{ fontSize: 24, fontWeight: 700, color: "var(--honey)" }}>40万+</div><div style={{ fontSize: 12, color: "var(--ink-400)", marginTop: 3 }}>全网关注</div></div>
                <StatDivider />
                <div><div style={{ fontSize: 24, fontWeight: 700, color: "var(--ink-900)" }}>2年</div><div style={{ fontSize: 12, color: "var(--ink-400)", marginTop: 3 }}>业余时间做到</div></div>
                <StatDivider />
                <div><div style={{ fontSize: 24, fontWeight: 700, color: "var(--ink-900)" }}>7条</div><div style={{ fontSize: 12, color: "var(--ink-400)", marginTop: 3 }}>收入渠道</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ borderTop: "0.5px solid var(--line)", background: "var(--paper)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px" }}>
          <div style={{ maxWidth: 560, margin: "0 auto", background: "var(--surface)", border: "0.5px solid var(--line)", borderRadius: 16, padding: "52px 48px", textAlign: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--honey)", background: "var(--honey-soft)", padding: "4px 12px", borderRadius: 6, letterSpacing: "0.05em" }}>2026 预售中</span>
            <div style={{ marginTop: 28, fontSize: 52, fontWeight: 700, letterSpacing: -2, color: "var(--ink-900)" }}>¥599</div>
            <div style={{ fontSize: 14, color: "var(--ink-400)", marginTop: 6 }}>30+ 节录播课 · 永久有效 · Creator OS 升级免费</div>
            <div style={{ margin: "36px auto", display: "flex", flexDirection: "column", gap: 13, textAlign: "left", maxWidth: 340 }}>
              {CHECKLIST.map((item) => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--honey)", fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>✓</span>
                  <span style={{ fontSize: 15, color: "var(--ink-700)", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
            <PrimaryBtn href={COURSE_URL} size="lg">立即购课，开始剪辑 →</PrimaryBtn>
            <p style={{ margin: "20px 0 0", fontSize: 12, color: "var(--ink-300)" }}>知识付费虚拟产品，购买后不设退款，请慎重下单</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "0.5px solid var(--line)", padding: "28px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "var(--ink-400)" }}>SimpleGrowth Academy · by Chao</span>
          <a href="https://app0v0tctza4800.pc.xiaoe-tech.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--ink-400)", textDecoration: "none" }}>进入课程平台 →</a>
        </div>
      </footer>

    </div>
  );
}
