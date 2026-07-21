import type { CSSProperties } from 'react';
import type { CategoryId } from '../data/tools';
import { CATEGORIES } from '../data/tools';
import type { Lang } from '../hooks/useLang';

interface Props {
  active: CategoryId | 'all';
  onChange: (cat: CategoryId | 'all') => void;
  onClearSearch: () => void;
  lang: Lang;
  searching: boolean;
}

export default function CategoryTabs({ active, onChange, onClearSearch, lang, searching }: Props) {
  const label = (zh: string, en: string) => (lang === 'zh' ? zh : en);

  return (
    <div className="home-sticky-tabs">
      <div className="home-tabs-inner">
        <button
          type="button"
          className={`cat-tab${active === 'all' && !searching ? ' is-active is-active-cyan' : ''}`}
          onClick={() => { onChange('all'); onClearSearch(); }}
        >
          {label('全部', 'All')}
        </button>
        {CATEGORIES.map(cat => {
          const isActive = active === cat.id && !searching;
          return (
            <button
              key={cat.id}
              type="button"
              className={`cat-tab${isActive ? ' is-active' : ''}`}
              style={isActive ? { '--tab-color': cat.color } as CSSProperties : undefined}
              onClick={() => { onChange(cat.id); onClearSearch(); }}
            >
              {lang === 'zh' ? cat.labelZh : cat.labelEn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
