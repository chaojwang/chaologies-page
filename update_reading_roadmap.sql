update projects
set icon = '🌍',
    links = '[
      {"platform":"gumroad","url":"https://1408889899058.gumroad.com/l/Books"},
      {"platform":"bilibili","url":"https://mall.bilibili.com/neul-next/detailuniversal/detail.html?page=detailuniversal_detail&itemsId=40994927"},
      {"platform":"xiaohongshu","url":"http://xhslink.com/o/8txd25qexbN"}
    ]'::jsonb
where title_en = 'Reading Roadmap';

update projects
set links = '[
      {"platform":"gumroad","url":"https://1408889899058.gumroad.com/l/kcbinp"},
      {"platform":"bilibili","url":"https://mall.bilibili.com/neul-next/detailuniversal/detail.html?page=detailuniversal_detail&itemsId=40799137"},
      {"platform":"xiaohongshu","url":"http://xhslink.com/o/AJ4WfMkRcmJ"}
    ]'::jsonb
where title_en = 'The Minimal Weekly System';
