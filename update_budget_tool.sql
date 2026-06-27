-- Turn the "Budgeting Template" project into the live, free 50/30/20 tool
-- that links into the on-site /budget page.
update projects
set icon     = '💰',
    title_en = '50/30/20 Budget Tool',
    title_zh = '50/30/20 预算工具',
    desc_en  = 'Free. Fill it in, see where your money is really going.',
    desc_zh  = '免费。填进去，看清楚钱到底去哪了。',
    status   = 'active',
    platform = 'chaologies',
    links    = '[{"platform":"chaologies","label":{"en":"Use free →","zh":"免费使用 →"},"url":"/budget"}]'::jsonb
where title_en = 'Budgeting Template'
   or title_zh = '预算管理模板';
