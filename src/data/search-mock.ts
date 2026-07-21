import type { SearchMode } from '../types/search';
import { TOOLS } from './tools';

export interface MockSearchResult {
  id: string;
  mode: SearchMode;
  type: 'tool' | 'news' | 'repo' | 'product' | 'web';
  title: string;
  url: string;
  snippet: string;
  source?: string;
  stars?: number;
}

const MOCK_NEWS: MockSearchResult[] = [
  { id: 'n1', mode: 'news', type: 'news', title: 'OpenAI 发布 GPT-4.5 预览版，推理能力再升级', url: '#', snippet: '新一代模型在数学与代码 benchmark 上刷新 SOTA…', source: '机器之心' },
  { id: 'n2', mode: 'news', type: 'news', title: 'Google DeepMind 开源 Gemma 3 多模态小模型', url: '#', snippet: '支持 128K 上下文，可在消费级 GPU 上运行…', source: '量子位' },
  { id: 'n3', mode: 'news', type: 'news', title: 'Anthropic Claude 4 支持 500K token 上下文窗口', url: '#', snippet: '企业版率先开放，文档分析场景大幅提速…', source: 'TechCrunch' },
  { id: 'n4', mode: 'news', type: 'news', title: '宇树科技人形机器人完成新一轮融资', url: '#', snippet: '具身智能赛道持续升温，多家机构跟投…', source: '36氪' },
  { id: 'n5', mode: 'news', type: 'news', title: 'Sora 正式向 ChatGPT Plus 用户开放', url: '#', snippet: '支持 20 秒 1080p 视频生成，含音频同步…', source: 'The Verge' },
];

const MOCK_REPOS: MockSearchResult[] = [
  { id: 'r1', mode: 'github', type: 'repo', title: 'openai/openai-cookbook', url: 'https://github.com/openai/openai-cookbook', snippet: 'OpenAI API 示例与最佳实践合集', source: 'GitHub', stars: 61200 },
  { id: 'r2', mode: 'github', type: 'repo', title: 'langchain-ai/langchain', url: 'https://github.com/langchain-ai/langchain', snippet: '构建 LLM 应用的框架', source: 'GitHub', stars: 98000 },
  { id: 'r3', mode: 'github', type: 'repo', title: 'ollama/ollama', url: 'https://github.com/ollama/ollama', snippet: '本地运行大语言模型', source: 'GitHub', stars: 89000 },
];

const MOCK_PRODUCTS: MockSearchResult[] = [
  { id: 'p1', mode: 'product', type: 'product', title: 'Cursor — AI Code Editor', url: 'https://cursor.com', snippet: 'Product Hunt #1 Product of the Day', source: 'Product Hunt' },
  { id: 'p2', mode: 'product', type: 'product', title: 'Arc Search — Browse for Me', url: 'https://arc.net', snippet: 'AI 替你浏览网页并总结答案', source: 'Product Hunt' },
  { id: 'p3', mode: 'product', type: 'product', title: 'Gamma — AI Presentations', url: 'https://gamma.app', snippet: '一键生成精美演示文稿', source: 'Product Hunt' },
];

const MOCK_WEB: MockSearchResult[] = [
  { id: 'w1', mode: 'web', type: 'web', title: 'Best AI Tools Directory 2026', url: '#', snippet: 'Comprehensive roundup of top AI tools across categories…', source: 'futurepedia.io' },
  { id: 'w2', mode: 'web', type: 'web', title: 'How to Build an AI Agent from Scratch', url: '#', snippet: 'Step-by-step guide covering LLM, tools, and memory…', source: 'dev.to' },
];

const GENERIC_NEWS = new Set(['新闻', 'news', '热点', '资讯', 'ai新闻', 'ainews']);

function toolToResult(t: typeof TOOLS[0]): MockSearchResult {
  return {
    id: `tool-${t.id}`,
    mode: 'site',
    type: 'tool',
    title: t.name,
    url: t.url,
    snippet: t.desc,
    source: t.domain,
  };
}

function matchText(text: string, q: string): boolean {
  const hay = text.toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).some(term => hay.includes(term));
}

function filterPool(pool: MockSearchResult[], q: string): MockSearchResult[] {
  if (GENERIC_NEWS.has(q.trim().toLowerCase().replace(/\s+/g, ''))) {
    return pool.slice(0, 8);
  }
  return pool.filter(item => matchText(`${item.title} ${item.snippet}`, q));
}

/** Client-side mock search — no API, no real algorithms */
export async function mockSearch(query: string, mode: SearchMode): Promise<MockSearchResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  await new Promise(r => setTimeout(r, 420 + Math.random() * 380));

  const siteHits = TOOLS.filter(t =>
    matchText(`${t.name} ${t.desc} ${t.tag} ${t.domain}`, q)
  ).map(toolToResult);

  if (mode === 'site') return siteHits.slice(0, 12);
  if (mode === 'news') return filterPool(MOCK_NEWS, q).slice(0, 10);
  if (mode === 'github') return filterPool(MOCK_REPOS, q).slice(0, 10);
  if (mode === 'product') return filterPool(MOCK_PRODUCTS, q).slice(0, 10);
  if (mode === 'web') return filterPool(MOCK_WEB, q).slice(0, 8);

  // auto: site first, then news/repos/products
  const merged: MockSearchResult[] = [];
  const seen = new Set<string>();
  for (const item of [...siteHits, ...filterPool(MOCK_NEWS, q), ...filterPool(MOCK_REPOS, q), ...filterPool(MOCK_PRODUCTS, q)]) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    merged.push(item);
    if (merged.length >= 12) break;
  }
  return merged;
}
