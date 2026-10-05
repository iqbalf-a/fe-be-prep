/**
 * App.jsx
 * ---------------------------------------------------------------------------
 * Application shell.
 *
 * Layout: fixed top bar, a sidebar that always fills the viewport height below
 * it (sticky on desktop, drawer on mobile), and a single scrollable reading
 * pane whose content column is centred. Routing is hash based, so the whole app
 * is static files and can be deployed to Vercel without rewrites.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import TopBar from './components/TopBar.jsx';
import Home from './components/Home.jsx';
import TrackOverview from './components/TrackOverview.jsx';
import ChapterView from './components/ChapterView.jsx';
import SearchPanel from './components/SearchPanel.jsx';
import BackToTop from './components/BackToTop.jsx';
import { TRACKS } from './data/catalog.js';
import { useHashRoute, navigateTo, chapterPath } from './hooks/useHashRoute.js';
import { StudyProvider, useStudy } from './context/StudyContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

function Shell() {
  const route = useHashRoute();
  const { storageError } = useStudy();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModules, setOpenModules] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  /** { chapterId, term } — highlighted only while that chapter is open. */
  const [highlight, setHighlight] = useState(null);
  /** Term to apply once the hash router has actually landed on the chapter. */
  const pendingHighlight = useRef(null);

  const track = useMemo(
    () => TRACKS.find((item) => item.id === route.trackId) ?? null,
    [route.trackId],
  );

  const toggleModule = useCallback((moduleId) => {
    setOpenModules((previous) =>
      previous.includes(moduleId)
        ? previous.filter((id) => id !== moduleId)
        : [...previous, moduleId],
    );
  }, []);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const openSearchResult = useCallback((result) => {
    pendingHighlight.current = { chapterId: result.chapter.id, term: query.trim() };
    navigateTo(chapterPath(result.chapter.id));
    setSearchOpen(false);
    if (result.blockIndex !== null) {
      window.setTimeout(() => {
        document.getElementById(`block-${result.blockIndex}`)?.scrollIntoView({ block: 'start' });
      }, 60);
    }
  }, [query]);

  // Keep the active module expanded in the sidebar.
  useEffect(() => {
    const moduleId = route.chapter?.moduleId ?? null;
    if (moduleId) setOpenModules((previous) => (previous.includes(moduleId) ? previous : [...previous, moduleId]));
  }, [route.chapter?.moduleId]);

  // A highlight only survives while its own chapter stays open. It is applied
  // here rather than in openSearchResult because the hash has not changed yet
  // at the moment the result is clicked.
  useEffect(() => {
    const pending = pendingHighlight.current;
    if (pending && pending.chapterId === route.chapter?.id) {
      pendingHighlight.current = null;
      setHighlight(pending);
    } else if (!pending) {
      setHighlight(null);
    }
  }, [route.chapter?.id]);

  const chapterQuery = highlight && highlight.chapterId === route.chapter?.id ? highlight.term : '';

  return (
    <div className={`app min-h-screen bg-canvas text-ink ${sidebarOpen ? 'app--nav-open' : ''}`}>
      <a
        className="skip-link sr-only rounded-lg bg-brand px-4 py-2 font-medium text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100"
        href="#main-scroll"
      >
        Lompat ke konten
      </a>

      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((value) => !value)}
        searchOpen={searchOpen}
        onOpenSearch={() => setSearchOpen(true)}
        onToggleSearch={setSearchOpen}
      />

      <div className="app__layout flex flex-col lg:flex-row lg:items-stretch">
        <Sidebar
          route={route}
          openModules={openModules}
          toggleModule={toggleModule}
          onNavigate={closeSidebar}
          isOpen={sidebarOpen}
        />

        <main
          className="app__main h-[calc(100dvh-3.5rem)] min-w-0 overflow-y-auto overscroll-contain px-4 pt-6 pb-28 sm:px-6 lg:flex-1 lg:px-10"
          id="main-scroll"
          tabIndex={-1}
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
            {storageError && (
              <p className="app__warning rounded-xl border border-warn/40 bg-warn/10 px-4 py-3 text-sm text-ink">
                {storageError}
              </p>
            )}

            {searchOpen && (
              <SearchPanel
                query={query}
                onQueryChange={setQuery}
                onOpenResult={openSearchResult}
                onClose={() => setSearchOpen(false)}
              />
            )}

            {!searchOpen && route.name === 'home' && <Home />}
            {!searchOpen && route.name === 'track' && track && <TrackOverview track={track} />}
            {!searchOpen && route.name === 'chapter' && route.chapter && (
              <ChapterView
                chapter={route.chapter}
                query={chapterQuery}
                onClearHighlight={() => setHighlight(null)}
              />
            )}
            {!searchOpen && route.name === 'chapter' && !route.chapter && (
              <p className="app__empty text-muted">
                Bab tidak ditemukan. Kembali ke <a className="text-brand underline" href="#/">halaman utama</a>.
              </p>
            )}
          </div>
        </main>
      </div>

      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <StudyProvider>
        <Shell />
      </StudyProvider>
    </ThemeProvider>
  );
}