import type { CSSProperties } from 'react';
import type { Tool } from '../data/tools';
import { CATEGORY_MAP } from '../data/tools';
import type { Lang } from '../hooks/useLang';

interface Props {
  tool: Tool;
  lang: Lang;
}

export default function ToolCard({ tool, lang }: Props) {
  const cat = CATEGORY_MAP[tool.category];
  const accent = cat?.color ?? '#00e5ff';

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="tool-card"
      style={{ '--accent': accent } as CSSProperties}
    >
      <div className="tool-card-icon">{tool.emoji}</div>
      <div className="tool-card-name">{tool.name}</div>
      <div className="tool-card-desc">{lang === 'zh' ? tool.desc : tool.descEn}</div>
      <div className="tool-card-meta">
        <span className="tool-card-tag">{tool.tag}</span>
      </div>
    </a>
  );
}
