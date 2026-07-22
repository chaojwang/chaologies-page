-- Business Book Club Database → Business Action Bank（商业行动银行）
-- 卡片改名 + 状态改为进行中 + 指向 /action-bank 等待清单落地页。
-- ⚠️ 先把新代码部署上线，再跑这条 SQL——否则线上卡片会指向一个还不存在的页面。
-- （已确认 projects 表里这一行是 id = 5，title_en = 'Business Book Club Database'）

update projects
set icon = '🏦',
    title_en = 'Business Action Bank',
    title_zh = '商业行动银行 Action Bank',
    desc_en = '100+ business books distilled into insights, examples and exercises you can act on today.',
    desc_zh = '100+ 本商业书，拆成可以马上执行的启发、案例和练习。',
    status = 'active',
    platform = 'Notion',
    links = '[
      {"url":"/action-bank","platform":"Web","label":{"en":"Join waitlist →","zh":"加入等待清单 →"}}
    ]'::jsonb
where id = 5 and title_en = 'Business Book Club Database';
