export type SearchMode = 'auto' | 'site' | 'news' | 'github' | 'product' | 'web';

export interface SearchResultItem {
  id: string;
  mode: SearchMode;
  type: string;
  title: string;
  url: string;
  snippet: string;
  source?: string;
  stars?: number;
}
