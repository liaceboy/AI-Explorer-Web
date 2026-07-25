/** Official AI Explorer site URLs */
export const SITE_ORIGIN = 'https://www.aiexplorebox.com';

export const SITE_URLS = {
  home: SITE_ORIGIN,
  submit: `${SITE_ORIGIN}/submit`,
  tools: `${SITE_ORIGIN}/tools`,
  rankings: `${SITE_ORIGIN}/rankings`,
  articles: `${SITE_ORIGIN}/articles`,
  contact: `${SITE_ORIGIN}/contact`,
  toolDetail: (id: string) => `${SITE_ORIGIN}/tool/${id}`,
} as const;

export const SITE_HOST = 'aiexplorebox.com';
