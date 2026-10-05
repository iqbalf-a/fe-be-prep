/**
 * components/TopBar.jsx
 * ---------------------------------------------------------------------------
 * Sticky header: menu button on mobile, brand, search entry, and the theme
 * toggle. Search lives here so it can be opened with the "/" shortcut from
 * anywhere.
 */

import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { Button, IconMenu, IconMoon, IconSearch, IconSun } from './ui.jsx';

export default function TopBar({ onToggleSidebar, sidebarOpen, onOpenSearch, onToggleSearch, searchOpen }) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function onKeyDown(event) {
      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if (event.key === '/' && !typing) {
        event.preventDefault();
        onOpenSearch();
      }
      if (event.key === 'Escape' && searchOpen) {
        onToggleSearch(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onOpenSearch, onToggleSearch, searchOpen]);

  return (
    <header className="topbar relative z-40 flex min-h-14 shrink-0 items-center gap-2 border-b border-line bg-panel/95 px-3 pt-[env(safe-area-inset-top)] backdrop-blur sm:gap-3 sm:px-4">
      <Button
        variant="plain"
        className="topbar__menu pointer-coarse:size-11 px-2 lg:hidden"
        onClick={onToggleSidebar}
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        aria-label="Buka navigasi"
      >
        <IconMenu />
      </Button>

      <a className="topbar__brand shrink-0 text-base font-extrabold tracking-tight text-ink" href="#/">
        FE<span className="text-brand">/</span>BE Prep
      </a>

      <button
        type="button"
        className="topbar__search pointer-coarse:min-h-11 ml-auto flex max-w-md flex-1 items-center gap-2 rounded-xl border border-line bg-soft px-3 py-2 text-left text-sm text-muted transition hover:border-brand/50 hover:text-ink lg:ml-4"
        onClick={() => (searchOpen ? onToggleSearch(false) : onOpenSearch())}
      >
        <IconSearch className="shrink-0" />
        <span className="truncate">Cari materi…</span>
        <kbd className="ml-auto hidden rounded border border-line bg-panel px-1.5 py-0.5 font-mono text-[0.7rem] text-muted sm:inline">
          /
        </kbd>
      </button>

      <Button
        variant="plain"
        className="topbar__theme pointer-coarse:size-11 px-2"
        onClick={toggleTheme}
        title={`Ganti ke tema ${theme === 'dark' ? 'light' : 'dark'}`}
        aria-label={`Ganti ke tema ${theme === 'dark' ? 'light' : 'dark'}`}
      >
        {theme === 'dark' ? <IconSun /> : <IconMoon />}
      </Button>
    </header>
  );
}