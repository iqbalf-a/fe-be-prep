/**
 * components/Sidebar.jsx
 * ---------------------------------------------------------------------------
 * Sticky sidebar on desktop, off-canvas drawer on mobile.
 *
 * The column is pinned to the viewport height below the top bar (h-[calc(100dvh-
 * 3.5rem)]) and owns its own scrolling. That is deliberate: tracks with few
 * modules — Frontend, for example — used to leave a bare gap under a short
 * list, because the panel only grew as far as its content.
 *
 * Only the active track's modules are expanded: with 37 modules the full tree
 * would be unusable, and module numbers are shown so the structure stays
 * predictable.
 */

import { TRACKS, TRACK_STATS, modulesOfTrack } from '../data/catalog.js';
import { chapterPath, navigateTo, trackPath } from '../hooks/useHashRoute.js';
import { useStudy } from '../context/StudyContext.jsx';
import { Button, IconCheck, IconClose, ProgressBar } from './ui.jsx';

const DOT_COLOR = {
  P1: 'bg-red-500 dark:bg-red-400',
  P2: 'bg-amber-500 dark:bg-amber-400',
  P3: 'bg-slate-400 dark:bg-slate-500',
};

function ModuleBlock({ module, activeChapterId, openModules, toggleModule, goChapter, closeDrawer }) {
  const { isCompleted } = useStudy();
  const isOpen = openModules.includes(module.id) || module.chapters.some((c) => c.id === activeChapterId);
  const doneCount = module.chapters.filter((chapter) => isCompleted(chapter.id)).length;
  const allDone = doneCount === module.chapters.length;

  return (
    <li className="module">
      <button
        type="button"
        className="module__head pointer-coarse:py-3 grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[0.85rem] text-ink transition hover:bg-soft"
        aria-expanded={isOpen}
        onClick={() => toggleModule(module.id)}
      >
        <span className="module__no rounded-md bg-soft px-1.5 py-0.5 font-mono text-[0.68rem] text-muted">
          {module.no}
        </span>
        <span className="module__title leading-snug">{module.plainTitle}</span>
        <span className={`module__count text-[0.7rem] ${allDone ? 'text-ok' : 'text-muted'}`}>
          {doneCount}/{module.chapters.length}
        </span>
      </button>

      {isOpen && (
        <ul className="chapter-list mt-1 mb-2 ml-3 flex list-none flex-col gap-0.5 border-l border-line pl-2">
          {module.chapters.map((chapter) => {
            const done = isCompleted(chapter.id);
            const active = chapter.id === activeChapterId;
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  className={`chapter-link pointer-coarse:py-3 grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 rounded-lg px-2 py-1 text-left text-[0.8rem] transition ${
                    active
                      ? 'is-active bg-brand-soft font-semibold text-brand'
                      : done
                        ? 'is-done text-muted hover:bg-soft hover:text-ink'
                        : 'text-muted hover:bg-soft hover:text-ink'
                  } ${done ? 'is-done' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => {
                    goChapter(chapter.id);
                    closeDrawer();
                  }}
                >
                  <span
                    className={`chapter-link__dot size-1.5 rounded-full ${DOT_COLOR[chapter.priority] ?? DOT_COLOR.P3}`}
                    aria-hidden="true"
                  />
                  <span className={`chapter-link__label leading-snug ${done ? 'line-through decoration-line' : ''}`}>
                    {chapter.plainTitle}
                  </span>
                  {done && (
                    <span className="chapter-link__check text-ok" aria-label="selesai">
                      <IconCheck width={13} height={13} />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({ route, openModules, toggleModule, onNavigate, isOpen }) {
  const { stats } = useStudy();
  const activeChapterId = route.chapter?.id ?? null;
  const modules = route.trackId ? modulesOfTrack(route.trackId) : [];

  return (
    <>
      <div
        className={`sidebar__scrim fixed top-[var(--topbar-h)] right-0 bottom-0 left-0 z-40 bg-black/45 transition-opacity duration-200 lg:hidden ${
          isOpen ? 'is-visible opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onNavigate}
        aria-hidden="true"
      />
      <nav
        id="sidebar"
        className={`sidebar fixed top-[var(--topbar-h)] bottom-0 left-0 z-50 flex w-[min(86vw,22rem)] shrink-0 flex-col overflow-y-auto overscroll-contain border-r border-line bg-panel px-3 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] transition-transform duration-200 ease-out lg:relative lg:top-auto lg:bottom-auto lg:z-30 lg:w-72 lg:translate-x-0 ${
          isOpen ? 'is-open translate-x-0 shadow-float' : '-translate-x-[102%]'
        }`}
        aria-label="Navigasi materi"
      >
        <div className="sidebar__head mb-3 flex items-center justify-between px-1">
          <p className="sidebar__brand text-base font-extrabold tracking-tight text-ink">
            FE<span className="text-brand">/</span>BE Prep
          </p>
          <Button variant="plain" size="sm" className="sidebar__close pointer-coarse:min-h-10 lg:hidden" onClick={onNavigate}>
            <IconClose width={14} height={14} />
            Tutup
          </Button>
        </div>

        <div className="sidebar__progress mx-1 mb-4 grid gap-1.5">
          <p className="text-xs text-muted">
            <strong className="text-sm text-ink">{stats.completed}</strong> dari {stats.total} bab selesai
          </p>
          <ProgressBar percent={stats.percent} />
        </div>

        <ul className="track-list flex list-none flex-col gap-1">
          {TRACKS.map((track) => {
            const trackStats = stats.perTrack[track.id] ?? TRACK_STATS[track.id];
            const active = route.trackId === track.id;
            return (
              <li key={track.id}>
                <a
                  className={`track-link pointer-coarse:py-3 grid grid-cols-[auto_1fr_auto] items-center gap-2.5 rounded-xl px-2 py-2 no-underline transition ${
                    active ? 'is-active bg-brand-soft' : 'hover:bg-soft'
                  }`}
                  href={trackPath(track.id)}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                >
                  <span
                    className="track-link__icon grid size-8 place-items-center rounded-lg bg-soft text-[0.7rem] font-extrabold text-brand"
                    aria-hidden="true"
                  >
                    {track.icon}
                  </span>
                  <span className="track-link__body grid">
                    <span className={`track-link__label text-[0.9rem] font-semibold ${active ? 'text-brand' : 'text-ink'}`}>
                      {track.label}
                    </span>
                    <span className="track-link__hint text-[0.72rem] text-muted">{track.hint}</span>
                  </span>
                  <span className="track-link__count text-[0.7rem] text-muted">
                    {trackStats.completed}/{trackStats.total}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {modules.length > 0 && (
          <div className="sidebar__modules mt-5">
            <p className="sidebar__modules-title mx-1 mb-1.5 text-[0.68rem] font-bold tracking-[0.12em] text-muted uppercase">
              Modul
            </p>
            <ul className="flex list-none flex-col gap-0.5">
              {modules.map((module) => (
                <ModuleBlock
                  key={module.id}
                  module={module}
                  activeChapterId={activeChapterId}
                  openModules={openModules}
                  toggleModule={toggleModule}
                  goChapter={(id) => navigateTo(chapterPath(id))}
                  closeDrawer={onNavigate}
                />
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}