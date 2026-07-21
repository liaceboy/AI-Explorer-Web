import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '../hooks/useLang';
import { searchSiteTools } from '../data/search-mock';
import type { SearchResultItem } from '../types/search';

interface Props {
  variant?: 'hero' | 'page';
  lang: Lang;
  submittedQuery: string;
  onSubmit: (q: string) => void;
}

function ResultCard({ item, lang }: { item: SearchResultItem; lang: Lang }) {
  const label = lang === 'zh' ? '工具' : 'Tool';

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="search-result-link">
      <div className="search-result-card">
        <div className="search-result-meta">
          <span className="search-result-type">{label}</span>
          {item.source && <span className="search-result-source">{item.source}</span>}
        </div>
        <div className="search-result-title">{item.title}</div>
        {item.snippet && <div className="search-result-snippet">{item.snippet}</div>}
      </div>
    </a>
  );
}

export default function SearchAgent({
  variant = 'hero',
  lang,
  submittedQuery,
  onSubmit,
}: Props) {
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
    searchSiteTools(submittedQuery).then(hits => {
      if (!cancelled) {
        setResults(hits);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [submittedQuery, hasSubmitted]);

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
              {t('搜索 AI 工具、分类或关键词…', 'Search AI tools, categories, or keywords…')}
            </span>
          )}
          <input
            ref={inputRef}
            type="search"
            className="search-agent-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') runSearch(); }}
            aria-label={t('搜索本站工具', 'Search site tools')}
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

  const resultsEl = hasSubmitted && (
    <div className="search-agent-results">
      {loading && (
        <div className="search-agent-status">
          {t('正在搜索本站工具…', 'Searching site tools…')}
        </div>
      )}
      {!loading && (
        <p className="search-agent-count">
          {t(`找到 ${results.length} 个工具`, `${results.length} tools found`)}
        </p>
      )}
      {!loading && results.length === 0 && (
        <p className="search-agent-empty">{t('未找到相关工具', 'No matching tools')}</p>
      )}
      <div className="search-agent-grid">
        {!loading && results.map(item => (
          <ResultCard key={item.id} item={item} lang={lang} />
        ))}
      </div>
    </div>
  );

  if (isHero) {
    return <div className="search-agent-hero">{bar}</div>;
  }

  return (
    <div className="search-agent-page">
      {bar}
      {resultsEl}
    </div>
  );
}
