-- Substack 彻底下线：把 profile 表的 newsletter_url 换成 Beehiiv 主页。
-- 这个字段喂给博客页 (/blog) 的「訂閱」按钮和页脚链接——
-- 静态代码里已改，但线上首页数据从 Supabase 读，所以必须跑这条 SQL。
update profile
set newsletter_url = 'https://chaologies.beehiiv.com'
where id = 1;
