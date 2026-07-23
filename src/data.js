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
      followers: "",
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
      url: "https://v.douyin.com/yTifRziOV1M/",
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
      title: { en: "The 50 / 30 / 20 Rule", zh: "50 / 30 / 20 法则" },
      desc: {
        en: "The first step toward financial freedom.",
        zh: "财富自由之路的第一步。",
      },
      status: "active",
      platform: "chaologies",
      links: [{ platform: "chaologies", label: { en: "Use free →", zh: "免费使用 →" }, url: "/budget" }],
    },
    {
      icon: "🗺️",
      title: { en: "Chaologies Reading Map", zh: "超说阅读地图" },
      desc: {
        en: "Turn 101 good books into your own thinking system.",
        zh: "把 101 本好书变成你的思考系统。",
      },
      status: "active",
      platform: "Notion",
      url: null,
      links: [{ url: "/reading-map", platform: "Web", label: { en: "Open the map →", zh: "打开阅读地图 →" } }],
    },
    {
      icon: "🗓",
      title: { en: "My Minimalist Weekly Template", zh: "我的极简主义效率模板" },
      desc: {
        en: "Ten minutes a week to see what matters and plan the week clearly.",
        zh: "每周花十分钟，理清重点和时间安排。",
      },
      status: "active",
      platform: "Notion",
      url: "#",
      links: [{ url: "/notion-weekly", platform: "Web", label: { en: "Get template →", zh: "获取模板 →" } }],
    },
    {
      icon: "🎬",
      title: { en: "Final Cut Pro X Video Editing", zh: "Final Cut Pro X 视频剪辑" },
      desc: {
        en: "The best video editing software on the Mac. No contest.",
        zh: "最好用的苹果视频剪辑软件，没有之一。",
      },
      status: "active",
      platform: "Video",
      url: "#",
      links: [{ url: "/fcpx", platform: "Web", label: { en: "View course →", zh: "查看课程 →" } }],
    },
    {
      icon: "🏦",
      title: {
        en: "From Idea to First Revenue",
        zh: "从想法到第一笔收入",
      },
      desc: {
        en: "Turn 100+ business books into a practical library for finding direction, testing ideas, and starting to earn.",
        zh: "把 100+ 本商业书，变成找方向、验证想法和开始创收的行动库。",
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
        en: "Seven days to see your cash flow clearly and build a money system you can keep using.",
        zh: "用 7 天理清现金流，建立一套能长期使用的金钱系统。",
      },
      status: "active",
      platform: "Notion",
      url: null,
      links: [{ url: "/newsletter", platform: "Web", label: { en: "Join waitlist →", zh: "加入等待清单 →" } }],
    },
  ],
};
