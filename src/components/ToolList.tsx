import type { CSSProperties } from 'react';
import { SITE_URLS } from '../config/site';
import type { Tool } from '../data/tools';
import { CATEGORY_MAP } from '../data/tools';
import type { Lang } from '../hooks/useLang';

interface Props {
  tools: Tool[];
  lang: Lang;
}

export default function ToolList({ tools, lang }: Props) {
  return (
    <div className="tool-list">
      {tools.map(tool => {
        const cat = CATEGORY_MAP[tool.category];
        const categoryLabel = lang === 'zh' ? cat.labelZh : cat.labelEn;

        return (
          <a
            key={tool.id}
            href={SITE_URLS.toolDetail(tool.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="tool-list-row"
            style={{ '--accent': cat.color } as CSSProperties}
          >
            <span className="tool-list-emoji" aria-hidden>{tool.emoji}</span>
            <div className="tool-list-body">
              <div className="tool-list-head">
                <span className="tool-list-name">{tool.name}</span>
                <span className="tool-list-category">{categoryLabel}</span>
                <span className="tool-list-tag">{tool.tag}</span>
              </div>
              <p className="tool-list-desc">{lang === 'zh' ? tool.desc : tool.descEn}</p>
            </div>
            <span className="tool-list-arrow" aria-hidden>→</span>
          </a>
        );
      })}
    </div>
  );
}
