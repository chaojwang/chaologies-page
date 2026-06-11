import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

// Transform flat Supabase rows → siteData shape
export function transformSiteData(profile, platforms, projects) {
  return {
    name: { en: profile.name_en, zh: profile.name_zh },
    tagline: { en: profile.tagline_en, zh: profile.tagline_zh },
    hook: { en: profile.hook_en, zh: profile.hook_zh },
    mission: { en: profile.mission_en, zh: profile.mission_zh },
    totalFollowers: profile.total_followers,
    followersLabel: { en: profile.followers_label_en, zh: profile.followers_label_zh },
    newsletter: { url: profile.newsletter_url },
    platforms: platforms.map(p => ({
      name: p.name,
      nameZh: p.name_zh,
      handle: p.handle,
      followers: p.followers,
      logoUrl: p.logo_url,
      url: p.url,
      isPage: p.is_page,
    })),
    projects: projects.map(p => ({
      icon: p.icon,
      title: { en: p.title_en, zh: p.title_zh },
      desc: { en: p.desc_en, zh: p.desc_zh },
      status: p.status,
      platform: p.platform,
      url: p.url,
      isPage: p.is_page,
      links: p.links || [],
    })),
  }
}
