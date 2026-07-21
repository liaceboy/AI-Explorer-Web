import { useMemo, useState } from 'react';
import CategoryTabs from './components/CategoryTabs';
import Header from './components/Header';
import SearchAgent from './components/SearchAgent';
import ToolCard from './components/ToolCard';
import { CATEGORIES, CATEGORY_MAP, TOOLS, type CategoryId } from './data/tools';
import { useLang } from './hooks/useLang';

function CatHeader({ label, color, total }: { label: string; color: string; total?: number }) {
  return (
    <div className="cat-header">
      <div className="cat-header-bar" style={{ background: color }} />
      <h2 className="cat-header-title">{label}</h2>
      {total != null && <span className="cat-header-count">{total}</span>}
      <div className="cat-header-line" style={{ background: `linear-gradient(90deg, ${color}30 0%, transparent 60%)` }} />
    </div>
  );
}

export default function App() {
  const { lang, setLang, t } = useLang();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryId | 'all'>('all');

  const featured = useMemo(() => TOOLS.filter(tool => tool.isFeatured), []);
  const searching = search.trim().length >= 2;

  const filteredTools = useMemo(() => {
    if (category === 'all') return TOOLS;
    return TOOLS.filter(tool => tool.category === category);
  }, [category]);

  const scrollToTools = () => {
    document.getElementById('tools-section')?.scrollIntoView({ block: 'start' });
  };

  return (
    <div className="page-shell">
      <Header lang={lang} onLangChange={setLang} />
      <div className="layout-wrap">
        <main className="home-root">
          {searching ? (
            <div className="home-search-page">
              <SearchAgent
                variant="page"
                lang={lang}
                submittedQuery={search}
                onSubmit={setSearch}
              />
            </div>
          ) : (
            <>
              <section className="home-hero">
                <div className="home-hero-kicker">YOUR DIGITAL LAUNCHPAD</div>
                <h1 className="home-hero-title">
                  {lang === 'zh' ? (
                    <>探索 <span className="text-cyan">AI 宇宙</span></>
                  ) : (
                    <>Explore the <span className="text-cyan">AI Universe</span></>
                  )}
                </h1>
                <p className="home-hero-sub">
                  {t(
                    '精选优质网站与工具，一站直达，开启高效数字生活',
                    'Curated websites & tools, one-stop access to boost your digital life'
                  )}
                </p>
                <div className="home-search-wrap">
                  <SearchAgent
                    variant="hero"
                    lang={lang}
                    submittedQuery={search}
                    onSubmit={setSearch}
                  />
                </div>
              </section>

              <CategoryTabs
                active={category}
                onChange={cat => { setCategory(cat); scrollToTools(); }}
                onClearSearch={() => setSearch('')}
                lang={lang}
                searching={searching}
              />

              <div className="home-main" id="tools-section">
                {category === 'all' ? (
                  <>
                    {featured.length > 0 && (
                      <section className="home-section">
                        <CatHeader label={t('⚡ 精选推荐', '⚡ Featured')} color="#ffd700" />
                        <div className="tools-grid">
                          {featured.map(tool => (
                            <ToolCard key={tool.id} tool={tool} lang={lang} />
                          ))}
                        </div>
                      </section>
                    )}
                    {CATEGORIES.map(cat => {
                      const catTools = TOOLS.filter(tool => tool.category === cat.id);
                      if (!catTools.length) return null;
                      return (
                        <section key={cat.id} className="home-section">
                          <CatHeader
                            label={lang === 'zh' ? cat.labelZh : cat.labelEn}
                            color={cat.color}
                            total={catTools.length}
                          />
                          <div className="tools-grid">
                            {catTools.slice(0, 8).map(tool => (
                              <ToolCard key={tool.id} tool={tool} lang={lang} />
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </>
                ) : (
                  <section className="home-section">
                    <CatHeader
                      label={lang === 'zh' ? CATEGORY_MAP[category].labelZh : CATEGORY_MAP[category].labelEn}
                      color={CATEGORY_MAP[category].color}
                      total={filteredTools.length}
                    />
                    <div className="tools-grid">
                      {filteredTools.map(tool => (
                        <ToolCard key={tool.id} tool={tool} lang={lang} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </>
          )}
        </main>

        <footer className="site-footer">
          <div className="site-footer-inner">
            <span className="gh-logo">AI EXPLORER</span>
            <p>
              {t('精选 AI 工具导航与工作流指南', 'Curated AI tools & workflow guides')}
              {' · '}
              <a href="https://www.aiexplore.top/" target="_blank" rel="noopener noreferrer">aiexplore.top</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
