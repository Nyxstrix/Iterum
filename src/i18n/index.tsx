import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { catalogues } from './strings';
import type { Dict } from './strings';

export type Lang = 'en' | 'pt';

/** Curriculum content carries both locales inline; this picks one. */
export type Localized = { en: string; pt: string };

const STORAGE_KEY = 'iterum.lang';

type I18nContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  /** Typed string catalogue — `t.nav.dashboard`, not `t('nav.dashboard')`. */
  t: Dict;
  /** Resolves a `{ en, pt }` pair from curriculum data. */
  pick: (value: Localized) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function readStored(): Lang {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'en' || value === 'pt') return value;
  } catch {
    /* storage unavailable */
  }
  // Fall back to the browser's preference before defaulting to English.
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('pt')
    ? 'pt'
    : 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStored);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en';
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* non-fatal: language just won't persist */
    }
  }, []);

  const pick = useCallback((value: Localized) => value[lang], [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: catalogues[lang], pick }),
    [lang, setLang, pick],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside <I18nProvider>');
  return context;
}
