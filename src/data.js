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
    url: "https://chaologies.substack.com",
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
  projects: [
    {
      icon: "🌍",
      title: { en: "Reading Roadmap", zh: "超说阅读地图" },
      desc: {
        en: "A reading system that helps good ideas actually stay.",
        zh: "101+本好书的精华笔记+指南",
      },
      status: "active",
      platform: "Notion",
      url: "#",
      links: [
        {
          platform: "gumroad",
          url: "https://1408889899058.gumroad.com/l/Books",
        },
        {
          platform: "bilibili",
          url: "https://mall.bilibili.com/neul-next/detailuniversal/detail.html?page=detailuniversal_detail&itemsId=40994927&loadingShow=1&noTitleBar=1#noReffer=true&msource=merchant_share",
        },
        {
          platform: "xiaohongshu",
          url: "http://xhslink.com/o/8txd25qexbN",
        },
      ],
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
      links: [
        {
          platform: "gumroad",
          url: "https://1408889899058.gumroad.com/l/kcbinp",
        },
        {
          platform: "bilibili",
          url: "https://mall.bilibili.com/neul-next/detailuniversal/detail.html?page=detailuniversal_detail&itemsId=40799137&loadingShow=1&noTitleBar=1#noReffer=true&msource=merchant_share",
        },
        {
          platform: "xiaohongshu",
          url: "http://xhslink.com/o/AJ4WfMkRcmJ",
        },
      ],
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
      links: [
        {
          platform: "xiaoe",
          url: "https://app0v0tctza4800.pc.xiaoe-tech.com/p/t_pc/goods_pc_detail/goods_detail/course_2Z80SD8YWOGbjWWEqHEh6Q5lTZk",
        },
      ],
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
      icon: "📖",
      title: {
        en: "Business Book Club Database",
        zh: "Business Book Club Notion Database",
      },
      desc: {
        en: "100+ lessons from business books with actionable exercises.",
        zh: "100+本商业书籍中的精华课程，配套练习和案例。",
      },
      status: "soon",
      platform: "Notion",
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
      icon: "💰",
      title: { en: "Budgeting Template", zh: "预算管理模板" },
      desc: {
        en: "Excel, Notion, and other formats.",
        zh: "Excel、Notion 等多种格式。",
      },
      status: "soon",
      platform: "Notion",
      url: null,
    },
    {
      icon: "💳",
      title: { en: "Personal Finance Guide", zh: "个人理财指南" },
      desc: {
        en: "E-book + Notion template for smart money management.",
        zh: "E-book + Notion 模板，让你的钱更聪慧。",
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
