// ─────────────────────────────────────────────────────
//  data.js — 所有页面内容在这里。改这个文件来更新网站。
// ─────────────────────────────────────────────────────

export const siteData = {
  // ── Identity ─────────────────────────────────────────
  name: { en: "Chao", zh: "Chao" },
  tagline: { en: "📍 Singapore", zh: "📍 新加坡" },

  // 总粉丝数 — 手动更新这个数字
  totalFollowers: 473648,
  followersLabel: { en: "followers across platforms", zh: "全网粉丝" },

  // ── Bio: 狠话 + 使命 ──────────────────────────────────
  hook: {
    en: "I spent 10+ years counting other people's money. Now I'm making my own life count. ✨",
    zh: "幫別人算了十幾年錢。\n現在，我想把自己的生活也算算清楚。",
  },

  mission: {
    en: "I help overthinkers simplify their money, their stuff, and their lives.",
    zh: "我幫普通人，重新掌控時間、金錢和人生選擇。",
  },

  // ── Newsletter CTA（左栏）───────────────────────────────
  newsletter: {
    label: { en: "Newsletter →", zh: "订阅 Newsletter →" },
    sub: { en: "Essays on money & minimalism", zh: "关于钱和极简主义的长文" },
    url: "https://chaologies.beehiiv.com",
  },

  // ── Platforms（右栏卡片，含粉丝数）─────────────────────
  // followers: 手动填，字符串格式自由（'24.1K' / '12万'）
  platforms: [
    {
      name: "YouTube",
      nameZh: "YouTube",
      handle: "Chaologies",
      followers: "24.1K",
      logoUrl: "/icons/youtube.png",
      url: "https://youtube.com/@Chaologies",
    },
    {
      name: "Instagram",
      nameZh: "Instagram",
      handle: "Chaologies",
      followers: "537",
      logoUrl: "/icons/instagram.png",
      url: "https://instagram.com/chaologies",
    },
    {
      name: "Bilibili",
      nameZh: "B 站",
      handle: "Chaologies",
      followers: "147.9K",
      logoUrl: "/icons/bilibili.png",
      url: "https://space.bilibili.com/394165725?spm_id_from=333.1007.0.0",
    },
    {
      name: "Douyin",
      nameZh: "抖音",
      handle: "Chaologies",
      followers: "57.3K",
      logoUrl: "/icons/douyin.png",
      url: "https://www.douyin.com/user/self?from_tab_name=main",
    },
    {
      name: "RedNote",
      nameZh: "小红书",
      handle: "Chaologies",
      followers: "167.8K",
      logoUrl: "/icons/xiaohongshu.png",
      url: "https://xhslink.com/m/5T0Q2Jyx2rN",
    },
    {
      name: "Zhihu",
      nameZh: "知乎",
      handle: "Chaologies",
      followers: "67.5K",
      logoUrl: "/icons/zhihu.png",
      url: "https://www.zhihu.com/people/chaology",
    },
    {
      name: "WeChat",
      nameZh: "微信公众号",
      handle: "Chaologies",
      followers: "8.3K",
      logoUrl: "/icons/wechat.png",
      url: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkyMzI2MjQyMg==&scene=124#wechat_redirect",
    },
    {
      name: "My Blog",
      nameZh: "我的博客",
      handle: "Stories from around the world",
      followers: "✍️",
      logoUrl: "📝",
      isPage: true,
      url: "/blog",
    },
  ],

  // ── Projects ──────────────────────────────────────────
  // 排序逻辑（方案 A）：免费钩子 → 可购买产品 → 等待清单 → 敬请期待
  projects: [
    {
      icon: "💰",
      title: { en: "The 1st Step of Financial Freedom", zh: "财富自由之路的第一步" },
      desc: {
        en: "Stop wondering where your money went. Start seeing where your life is going.",
        zh: "看清钱的走向，才能掌握未来的方向。",
      },
      status: "active",
      platform: "chaologies",
      links: [{ platform: "chaologies", label: { en: "Use free →", zh: "免费使用 →" }, url: "/budget" }],
    },
    {
      icon: "🗺️",
      title: { en: "Chaologies Reading Map", zh: "超說閱讀地圖" },
      desc: {
        en: "Not a booklist — a map that turns 101+ books into your own thinking system.",
        zh: "不是书单，是一张把 101+ 本好书变成思考系统的阅读地图。",
      },
      status: "active",
      platform: "Notion",
      url: null,
      links: [{ url: "/reading-map", platform: "Web", label: { en: "Open the map →", zh: "打开阅读地图 →" } }],
    },
    {
      icon: "🗓",
      title: { en: "The Minimal Weekly System", zh: "极简每周效率系统" },
      desc: {
        en: "One simple template to make the week feel clear.",
        zh: "Notion模板，每周一次，每次十分钟",
      },
      status: "active",
      platform: "Notion",
      url: "#",
      links: [{ url: "/notion-weekly", platform: "Web", label: { en: "Get template →", zh: "获取模板 →" } }],
    },
    {
      icon: "🎬",
      title: { en: "Final Cut Pro X", zh: "Final Cut Pro X" },
      desc: {
        en: "Edit with rhythm, story, and taste.",
        zh: "不只是会剪，而是学会用画面讲故事。",
      },
      status: "active",
      platform: "Video",
      url: "#",
      links: [{ url: "/fcpx", platform: "Web", label: { en: "View course →", zh: "查看课程 →" } }],
    },
    {
      icon: "🏦",
      title: {
        en: "Business Action Bank",
        zh: "商业行动银行 Action Bank",
      },
      desc: {
        en: "100+ business books distilled into insights, examples and exercises you can act on today.",
        zh: "100+ 本商业书，拆成可以马上执行的启发、案例和练习。",
      },
      status: "active",
      platform: "Notion",
      url: null,
      links: [{ url: "/action-bank", platform: "Web", label: { en: "Join waitlist →", zh: "加入等待清单 →" } }],
    },
    {
      icon: "💳",
      title: { en: "7-Day Money OS Starter Plan", zh: "7 天 Money OS 入门计划" },
      desc: {
        en: "A 7-day personal finance reset — built on strategies of the 1%, designed for you.",
        zh: "7 天个人财务整理计划，顶层富人的理财逻辑，为你重新设计。",
      },
      status: "active",
      platform: "Notion",
      url: null,
      links: [{ url: "/newsletter", platform: "Web", label: { en: "Join waitlist →", zh: "加入等待清单 →" } }],
    },
    {
      icon: "✦",
      title: { en: "Liangxiang · 亮相", zh: "亮相 Liangxiang" },
      desc: {
        en: "A showcase for Chinese-language creators.",
        zh: "一个给华语创作者展示作品的地方。",
      },
      status: "soon",
      platform: null,
      url: null,
    },
    {
      icon: "🗣️",
      title: { en: "30-Day English Speaking Plan", zh: "30 天口语养成计划" },
      desc: {
        en: "E-book + Notion Template + Community.",
        zh: "E-book + Notion Template + 社群。",
      },
      status: "soon",
      platform: "Notion",
      url: null,
    },
    {
      icon: "🍁",
      title: { en: "Canadian Departure Guide", zh: "加拿大离境指南" },
      desc: {
        en: "Essential e-book for returning to your home country.",
        zh: "回流人士必备的出境指南。",
      },
      status: "soon",
      platform: "Ebook",
      url: null,
    },
    {
      icon: "🍁",
      title: { en: "Canadian Arrival Guide", zh: "加拿大入境指南" },
      desc: {
        en: "Tax, finance, and living in Canada guide.",
        zh: "税务、财务和加拿大理财生活指南。",
      },
      status: "soon",
      platform: "Ebook",
      url: null,
    },
  ],
};
