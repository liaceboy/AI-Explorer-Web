import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '../hooks/useLang';
import { mockSearch } from '../data/search-mock';
import type { SearchMode, SearchResultItem } from '../types/search';

const MODES: { id: SearchMode; icon: string; zh: string; en: string }[] = [
  { id: 'auto', icon: '✨', zh: '智能', en: 'Auto' },
  { id: 'site', icon: '🔍', zh: '本站', en: 'Site' },
  { id: 'news', icon: '📰', zh: 'AI 新闻', en: 'AI News' },
  { id: 'github', icon: '💻', zh: 'GitHub', en: 'GitHub' },
  { id: 'product', icon: '🚀', zh: '产品', en: 'Products' },
  { id: 'web', icon: '🌐', zh: '全网', en: 'Web' },
];

const TYPE_LABEL: Record<string, { zh: string; en: string }> = {
  tool: { zh: '工具', en: 'Tool' },
  news: { zh: '新闻', en: 'News' },
  repo: { zh: '仓库', en: 'Repo' },
  product: { zh: '产品', en: 'Product' },
  web: { zh: '网页', en: 'Web' },
};

interface Props {
  variant?: 'hero' | 'page';
  lang: Lang;
  submittedQuery: string;
  onSubmit: (q: string) => void;
  defaultMode?: SearchMode;
}

function ResultCard({ item, lang }: { item: SearchResultItem; lang: Lang }) {
  const label = TYPE_LABEL[item.type]?.[lang === 'zh' ? 'zh' : 'en'] ?? item.type;
  const external = item.url.startsWith('http');

  const body = (
    <div className="search-result-card">
      <div className="search-result-meta">
        <span className="search-result-type">{label}</span>
        {item.source && <span className="search-result-source">{item.source}</span>}
        {item.stars != null && <span className="search-result-source">⭐ {item.stars.toLocaleString()}</span>}
      </div>
      <div className="search-result-title">{item.title}</div>
      {item.snippet && <div className="search-result-snippet">{item.snippet}</div>}
    </div>
  );

  if (external) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="search-result-link">
        {body}
      </a>
    );
  }
  return <div className="search-result-link search-result-link--static">{body}</div>;
}

export default function SearchAgent({
  variant = 'hero',
  lang,
  submittedQuery,
  onSubmit,
  defaultMode = 'auto',
}: Props) {
  const [mode, setMode] = useState<SearchMode>(defaultMode);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const isHero = variant === 'hero';
  const hasSubmitted = submittedQuery.trim().length >= 2;
  const t = (zh: string, en: string) => (lang === 'zh' ? zh : en);

  useEffect(() => {
    setDraft(submittedQuery);
  }, [submittedQuery]);

  useEffect(() => {
    if (!hasSubmitted) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    mockSearch(submittedQuery, mode).then(hits => {
      if (!cancelled) {
        setResults(hits);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [submittedQuery, mode, hasSubmitted]);

  const runSearch = useCallback(() => {
    const q = draft.trim();
    if (q.length < 2) return;
    onSubmit(q);
  }, [draft, onSubmit]);

  const clearAll = () => {
    setDraft('');
    onSubmit('');
    inputRef.current?.focus();
  };

  const bar = (
    <div className={`search-agent-shell${isHero ? ' search-agent-shell--hero' : ' search-agent-shell--page'}`}>
      <div className={`search-agent-bar${isHero ? ' search-agent-bar--hero' : ''}${loading ? ' is-searching' : ''}`}>
        <div className={`search-agent-field${isHero ? ' search-agent-field--hero' : ''}`}>
          {isHero && !draft && (
            <span className="search-agent-fake-ph" aria-hidden>
              {lang === 'zh' ? (
                <>告诉 <span className="search-agent-fake-ph-ai">AI</span>，你想找什么工具、资源或解决方案…</>
              ) : (
                <>Tell <span className="search-agent-fake-ph-ai">AI</span> what tools, resources, or solutions you need…</>
              )}
            </span>
          )}
          <input
            ref={inputRef}
            type="text"
            className="search-agent-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') runSearch(); }}
            aria-label={t('搜索', 'Search')}
          />
        </div>
        {draft && (
          <button type="button" className="search-agent-clear" onClick={clearAll} aria-label={t('清除', 'Clear')}>×</button>
        )}
        {!isHero && draft.trim().length >= 2 && (
          <button type="button" className="search-agent-submit" onClick={runSearch}>
            <span className="search-agent-submit-icon">↵</span>
            <span className="search-agent-submit-label">{t('搜索', 'Search')}</span>
          </button>
        )}
        {isHero && (
          <button type="button" className="search-agent-submit search-agent-submit--circle" onClick={runSearch} aria-label={t('搜索', 'Search')}>
            <span className="search-agent-submit-icon">→</span>
          </button>
        )}
      </div>
    </div>
  );

  const modeTabs = hasSubmitted && (
    <div className="search-agent-modes">
      {MODES.map(m => (
        <button
          key={m.id}
          type="button"
          className={`search-agent-mode${mode === m.id ? ' is-active' : ''}`}
          onClick={() => setMode(m.id)}
        >
          <span>{m.icon}</span>
          {lang === 'zh' ? m.zh : m.en}
        </button>
      ))}
    </div>
  );

  const resultsEl = hasSubmitted && (
    <div className="search-agent-results">
      {loading && (
        <div className="search-agent-status">
          {t('正在检索…', 'Searching…')}
        </div>
      )}
      {!loading && (
        <p className="search-agent-count">
          {t(`找到 ${results.length} 条结果`, `${results.length} results`)}
        </p>
      )}
      {!loading && results.length === 0 && (
        <p className="search-agent-empty">{t('未找到相关结果', 'No results found')}</p>
      )}
      <div className="search-agent-grid">
        {!loading && results.map(item => (
          <ResultCard key={item.id} item={item} lang={lang} />
        ))}
      </div>
    </div>
  );

  if (isHero) {
    return (
      <div className="search-agent-hero">
        {bar}
      </div>
    );
  }

  return (
    <div className="search-agent-page">
      {bar}
      {modeTabs}
      {resultsEl}
    </div>
  );
}

export type { SearchMode };
