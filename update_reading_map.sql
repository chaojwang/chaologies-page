-- 超說閱讀地圖：卡片改造 + 「我正在做的東西」重新排序
-- ⚠️ 先把新代码部署上线，再跑这份 SQL——否则线上卡片会指向还不存在的 /reading-map。
-- （已确认 projects 表里 Reading Roadmap 是 id = 1）

-- 1) Reading Roadmap → 超說閱讀地圖，指向 /reading-map 落地页
update projects
set icon = '🗺️',
    title_en = 'Chaologies Reading Map',
    title_zh = '超說閱讀地圖',
    desc_en = 'Not a booklist — a map that turns 101+ books into your own thinking system.',
    desc_zh = '不是书单，是一张把 101+ 本好书变成思考系统的阅读地图。',
    status = 'active',
    platform = 'Notion',
    links = '[
      {"url":"/reading-map","platform":"Web","label":{"en":"Open the map →","zh":"打开阅读地图 →"}}
    ]'::jsonb
where id = 1 and title_en = 'Reading Roadmap';

-- 2) 卡片排序（方案 A）：免费钩子打头 → 可购买产品 → 等待清单 → 敬请期待
update projects set sort_order = 1  where id = 7;  -- 财富自由之路的第一步（免费）
update projects set sort_order = 2  where id = 1;  -- 超說閱讀地圖（可购买）
update projects set sort_order = 3  where id = 2;  -- 极简每周效率系统（可购买）
update projects set sort_order = 4  where id = 3;  -- Final Cut Pro X（课程）
update projects set sort_order = 5  where id = 5;  -- 商业行动银行（等待清单）
update projects set sort_order = 6  where id = 8;  -- 7 天 Money OS（等待清单）
update projects set sort_order = 7  where id = 4;  -- 亮相
update projects set sort_order = 8  where id = 6;  -- 30 天口语养成计划
update projects set sort_order = 9  where id = 9;  -- 加拿大离境指南
update projects set sort_order = 10 where id = 10; -- 加拿大入境指南
