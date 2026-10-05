/**
 * context/ThemeContext.jsx
 * ---------------------------------------------------------------------------
 * Light/dark theme, persisted separately from study progress so a theme change
 * can never disturb completion state (explicit requirement in the brief).
 *
 * The class lands on <html> so CSS can key off `html[data-theme]`, and the
 * stored value is applied before first paint to avoid a flash of the wrong
 * theme.
 */

import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import usePersistentState from '../hooks/usePersistentState.js';
import { THEME_KEY } from './StudyContext.jsx';

const ThemeContext = createContext(null);

const THEMES = [
  { id: 'light', label: 'Light', icon: '☀' },
  { id: 'dark', label: 'Dark', icon: '☾' },
];

/** Light is the default; the OS preference is deliberately not consulted. */
const DEFAULT_THEME = 'light';

function preferredTheme() {
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme, storage] = usePersistentState(THEME_KEY, preferredTheme(), { delay: 0 });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, themes: THEMES, storageError: storage.error }),
    [theme, setTheme, toggleTheme, storage.error],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme harus dipakai di dalam ThemeProvider');
  return context;
}

/**
 * Injected into index.html so the stored theme is applied before React mounts.
 * Kept here as documentation of what the inline script does.
 */
export const THEME_BOOT_SCRIPT = `try{var t=JSON.parse(localStorage.getItem('${THEME_KEY}'));document.documentElement.dataset.theme=(t==='dark'||t==='light')?t:'${DEFAULT_THEME}';}catch(e){document.documentElement.dataset.theme='${DEFAULT_THEME}';}`;
