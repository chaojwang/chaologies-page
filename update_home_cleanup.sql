-- 首页减法 + 小修（2026-07）
-- 1) 撤下全部「敬请期待」卡片（亮相 / 30 天口语 / 加拿大两本指南）
delete from projects where status = 'soon';

-- 2) Instagram 隐藏粉丝数（数字太小拉低整面墙），只留入口
update platforms set followers = '' where name = 'Instagram';

-- 3) 阅读地图标题统一为简体（原为「超說閱讀地圖」）
update projects
set title_zh = '超说阅读地图'
where title_en = 'Chaologies Reading Map';
