import type { SearchResultItem } from '../types/search';
import { TOOLS } from './tools';

function matchText(text: string, q: string): boolean {
  const hay = text.toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).some(term => hay.includes(term));
}

function toolToResult(t: typeof TOOLS[0]): SearchResultItem {
  return {
    id: `tool-${t.id}`,
    type: 'tool',
    title: t.name,
    url: t.url,
    snippet: t.desc,
    source: t.domain,
  };
}

/** Client-side site tool search — filters the local tool catalog only */
export async function searchSiteTools(query: string): Promise<SearchResultItem[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  await new Promise(r => setTimeout(r, 280 + Math.random() * 220));

  return TOOLS.filter(t =>
    matchText(`${t.name} ${t.desc} ${t.descEn} ${t.tag} ${t.domain}`, q)
  )
    .map(toolToResult)
    .slice(0, 12);
}
