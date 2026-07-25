import { SITE_URLS } from '../config/site';
import type { Lang } from '../hooks/useLang';

interface Props {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export default function Header({ lang, onLangChange }: Props) {
  return (
    <header className="gh-header">
      <div className="gh-inner">
        <a href={SITE_URLS.home} className="gh-logo" target="_blank" rel="noopener noreferrer">
          AI EXPLORER
        </a>
        <nav className="gh-desktop-nav">
          <a href={SITE_URLS.home} className="gh-nav-link gh-nav-active" target="_blank" rel="noopener noreferrer">{lang === 'zh' ? '首页' : 'Home'}</a>
          <a href={SITE_URLS.tools} className="gh-nav-link" target="_blank" rel="noopener noreferrer">{lang === 'zh' ? '工具' : 'Tools'}</a>
          <a href={SITE_URLS.submit} className="gh-nav-link gh-nav-submit" target="_blank" rel="noopener noreferrer">{lang === 'zh' ? '提交工具' : 'Submit'}</a>
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
