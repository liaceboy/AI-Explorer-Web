import type { Lang } from '../hooks/useLang';

interface Props {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export default function Header({ lang, onLangChange }: Props) {
  return (
    <header className="gh-header">
      <div className="gh-inner">
        <a href="#" className="gh-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0 }); }}>
          AI EXPLORER
        </a>
        <nav className="gh-desktop-nav">
          <a href="#" className="gh-nav-link gh-nav-active">{lang === 'zh' ? '首页' : 'Home'}</a>
          <a href="#tools-section" className="gh-nav-link">{lang === 'zh' ? '工具' : 'Tools'}</a>
        </nav>
        <button
          type="button"
          className="gh-lang-btn"
          onClick={() => onLangChange(lang === 'zh' ? 'en' : 'zh')}
        >
          <span className={lang === 'zh' ? 'gh-lang-on' : 'gh-lang-off'}>中</span>
          <span className="gh-lang-sep">/</span>
          <span className={lang === 'en' ? 'gh-lang-on' : 'gh-lang-off'}>EN</span>
        </button>
      </div>
    </header>
  );
}
