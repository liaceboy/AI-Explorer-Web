import { useCallback, useEffect, useState } from 'react';

export type Lang = 'zh' | 'en';

export function useLang() {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof navigator !== 'undefined' && navigator.language.startsWith('zh')) return 'zh';
    return 'en';
  });

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);

  const t = useCallback(
    (zh: string, en: string) => (lang === 'zh' ? zh : en),
    [lang]
  );

  return { lang, setLang, t };
}
