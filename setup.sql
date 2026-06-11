-- 建表
create table if not exists profile (
  id int primary key default 1,
  name_en text default 'Chao',
  name_zh text default 'Chao',
  tagline_en text default '📍 Singapore',
  tagline_zh text default '📍 新加坡',
  hook_en text default 'I spent 10+ years counting other people''s money. Now I''m making my own life count. ✨',
  hook_zh text default '帮别人算了十几年钱。\n现在，我想把自己的生活也算算清楚。',
  mission_en text default 'I help overthinkers simplify their money, their stuff, and their lives.',
  mission_zh text default '我帮普通人，重新掌控时间、金钱和人生选择。',
  total_followers int default 473648,
  followers_label_en text default 'followers across platforms',
  followers_label_zh text default '全网粉丝',
  newsletter_url text default 'https://chaologies.substack.com'
);

create table if not exists platforms (
  id serial primary key,
  name text not null,
  name_zh text,
  handle text,
  followers text,
  logo_url text,
  url text,
  is_page boolean default false,
  sort_order int default 0
);

create table if not exists projects (
  id serial primary key,
  icon text,
  title_en text,
  title_zh text,
  desc_en text,
  desc_zh text,
  status text default 'soon',
  platform text,
  url text,
  is_page boolean default false,
  links jsonb default '[]',
  sort_order int default 0
);

-- 填入 profile 数据
insert into profile (id) values (1) on conflict (id) do nothing;

-- 填入 platforms 数据
insert into platforms (name, name_zh, handle, followers, logo_url, url, is_page, sort_order) values
('YouTube','YouTube','Chaologies','24.1K','/icons/youtube.png','https://youtube.com/@Chaologies',false,1),
('Instagram','Instagram','Chaologies','537','/icons/instagram.png','https://instagram.com/chaologies',false,2),
('Bilibili','B 站','Chaologies','147.9K','/icons/bilibili.png','https://space.bilibili.com/394165725',false,3),
('Douyin','抖音','Chaologies','57.3K','/icons/douyin.png','https://www.douyin.com/user/self',false,4),
('RedNote','小红书','Chaologies','167.8K','/icons/xiaohongshu.png','https://xhslink.com/m/5T0Q2Jyx2rN',false,5),
('Zhihu','知乎','Chaologies','67.5K','/icons/zhihu.png','https://www.zhihu.com/people/chaology',false,6),
('WeChat','微信公众号','Chaologies','8.3K','/icons/wechat.png','https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkyMzI2MjQyMg==',false,7),
('My Blog','我的博客','Stories from around the world','✍️','📝','/blog',true,8);

-- 填入 projects 数据
insert into projects (icon,title_en,title_zh,desc_en,desc_zh,status,url,links,sort_order) values
('📚','Reading Roadmap','超说阅读地图','A reading system that helps good ideas actually stay.','101+本好书的精华笔记+指南','active','#','[{"platform":"gumroad","url":"https://1408889899058.gumroad.com/l/Books"},{"platform":"bilibili","url":"https://mall.bilibili.com/neul-next/detailuniversal/detail.html?page=detailuniversal_detail&itemsId=40994927"},{"platform":"xiaohongshu","url":"https://www.xiaohongshu.com/discovery/item/6a02e586000000003501df22"}]',1),
('🗓','The Minimal Weekly System','极简每周效率系统','One simple template to make the week feel clear.','Notion模板，每周一次，每次十分钟','active','#','[{"platform":"gumroad","url":"https://1408889899058.gumroad.com/l/kcbinp"},{"platform":"bilibili","url":"https://mall.bilibili.com/neul-next/detailuniversal/detail.html?page=detailuniversal_detail&itemsId=40799137"},{"platform":"xiaohongshu","url":"https://www.xiaohongshu.com/discovery/item/69db2d0b0000000023021acb"}]',2),
('🎬','Final Cut Pro X','Final Cut Pro X','Edit with rhythm, story, and taste.','不只是会剪，而是学会用画面讲故事。','active','#','[{"platform":"xiaoe","url":"https://app0v0tctza4800.pc.xiaoe-tech.com/p/t_pc/goods_pc_detail/goods_detail/course_2Z80SD8YWOGbjWWEqHEh6Q5lTZk"}]',3),
('✦','Liangxiang · 亮相','亮相 Liangxiang','A showcase for Chinese-language creators.','一个给华语创作者展示作品的地方。','soon',null,'[]',4),
('📖','Business Book Club Database','Business Book Club Notion Database','100+ lessons from business books.','100+本商业书籍中的精华课程。','soon',null,'[]',5),
('🗣️','30-Day English Speaking Plan','30 天口语养成计划','E-book + Notion Template + Community.','E-book + Notion Template + 社群。','soon',null,'[]',6),
('💰','Budgeting Template','预算管理模板','Excel, Notion, and other formats.','Excel、Notion 等多种格式。','soon',null,'[]',7),
('💳','Personal Finance Guide','个人理财指南','E-book + Notion template.','E-book + Notion 模板。','soon',null,'[]',8),
('🍁','Canadian Departure Guide','加拿大离境指南','Essential e-book for returning home.','回流人士必备的出境指南。','soon',null,'[]',9),
('🍁','Canadian Arrival Guide','加拿大入境指南','Tax, finance, and living in Canada guide.','税务、财务和加拿大理财生活指南。','soon',null,'[]',10);

-- 开启 RLS
alter table profile enable row level security;
alter table platforms enable row level security;
alter table projects enable row level security;

-- 所有人可读
create policy "public_read_profile" on profile for select to anon using (true);
create policy "public_read_platforms" on platforms for select to anon using (true);
create policy "public_read_projects" on projects for select to anon using (true);

-- 登录用户可写
create policy "auth_all_profile" on profile for all to authenticated using (true) with check (true);
create policy "auth_all_platforms" on platforms for all to authenticated using (true) with check (true);
create policy "auth_all_projects" on projects for all to authenticated using (true) with check (true);
