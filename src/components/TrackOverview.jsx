/**
 * components/TrackOverview.jsx
 * ---------------------------------------------------------------------------
 * Landing view for one track: module list with per-module progress, plus the
 * recommended starting chapter. Keeps navigation one click deep even on the
 * long JavaScript track.
 */

import { PRIORITIES, TRACK_STATS, modulesOfTrack } from '../data/catalog.js';
import { chapterPath, navigateTo } from '../hooks/useHashRoute.js';
import { useStudy } from '../context/StudyContext.jsx';
import { Badge, Button, IconArrowRight, IconCheck, IconStar, ProgressBar } from './ui.jsx';

function ModuleCard({ module }) {
  const { isCompleted } = useStudy();
  const doneCount = module.chapters.filter((chapter) => isCompleted(chapter.id)).length;
  const percent = module.chapters.length
    ? Math.round((doneCount / module.chapters.length) * 100)
    : 0;
  const firstOpen = module.chapters.find((chapter) => !isCompleted(chapter.id)) ?? module.chapters[0];

  return (
    <li className="module-card grid content-start gap-2.5 rounded-2xl border border-line bg-panel p-5 shadow-card">
      <div className="module-card__head flex items-baseline gap-2">
        <span className="module-card__no font-mono text-xs text-muted">{String(module.no).padStart(2, '0')}</span>
        <h3 className="module-card__title text-[1.05rem] leading-snug font-bold">{module.plainTitle}</h3>
        <span className="module-card__minutes ml-auto shrink-0 text-xs text-muted">{module.minutes} menit</span>
      </div>

      <p className="module-card__desc m-0 text-sm text-muted">{module.desc}</p>
      {module.priorityNote && (
        <p className="module-card__note m-0 flex items-start gap-1.5 text-xs text-warn">
          <IconStar width={13} height={13} className="mt-0.5 shrink-0" />
          {module.priorityNote}
        </p>
      )}

      <ProgressBar percent={percent} />
      <p className="module-card__count m-0 text-xs text-muted">
        {doneCount}/{module.chapters.length} bab selesai
      </p>

      {/* The chapter list scrolls with the page on mobile: a nested
          scrollbar inside every card fights the thumb. Desktop keeps
          the capped, self-scrolling list. */}
      <ul className="module-card__chapters m-0 grid list-none gap-0.5 border-t border-line pt-2.5 sm:max-h-64 sm:overflow-y-auto">
        {module.chapters.map((chapter) => (
          <li key={chapter.id}>
            <a
              href={chapterPath(chapter.id)}
              className="pointer-coarse:py-3 flex items-center gap-2 rounded-lg px-2 py-1 text-[0.84rem] text-ink no-underline transition hover:bg-soft"
            >
              <Badge priority={chapter.priority} short={PRIORITIES[chapter.priority]?.short} label={PRIORITIES[chapter.priority]?.label} />
              <span className="truncate">{chapter.plainTitle}</span>
              {isCompleted(chapter.id) && (
                <span className="ml-auto shrink-0 text-ok" aria-label="selesai">
                  <IconCheck width={13} height={13} />
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>

      {firstOpen && (
        <Button
          variant="soft"
          className="pointer-coarse:min-h-11 mt-1 justify-self-start"
          onClick={() => navigateTo(chapterPath(firstOpen.id))}
        >
          {doneCount > 0 ? 'Lanjutkan modul' : 'Mulai modul'}
          <IconArrowRight width={15} height={15} />
        </Button>
      )}
    </li>
  );
}

export default function TrackOverview({ track }) {
  const { stats, lastChapter } = useStudy();
  const modules = modulesOfTrack(track.id);
  const trackStats = stats.perTrack[track.id] ?? TRACK_STATS[track.id];

  return (
    <div className="overview mx-auto w-full">
      <header className="overview__header">
        <p className="overview__eyebrow text-[0.72rem] font-bold tracking-[0.14em] text-brand uppercase">
          Track {track.id}
        </p>
        <h1 className="overview__title text-4xl font-extrabold tracking-tight text-balance">{track.label}</h1>
        <p className="overview__hint mt-2 max-w-[65ch] text-[1.02rem] text-muted">{track.hint}</p>
        <p className="overview__stats mt-1 text-sm text-muted">
          {trackStats.modules} modul · {trackStats.total} bab · {trackStats.minutes} menit · {trackStats.p1} bab P1
        </p>
        <ProgressBar percent={trackStats.percent} size="lg" />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {lastChapter && (
            <Button variant="primary" size="lg" onClick={() => navigateTo(chapterPath(lastChapter))}>
              Lanjutkan belajar
              <IconArrowRight width={16} height={16} />
            </Button>
          )}
          <Button as="a" href="#/" variant="ghost" className="pointer-coarse:min-h-11">
            ← Semua track
          </Button>
        </div>
      </header>

      <ol className="module-grid mt-8 grid list-none grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </ol>

      <p className="overview__back mt-8 text-center">
        <Button as="a" href="#/" variant="ghost" className="pointer-coarse:min-h-11">
          ← Semua track
        </Button>
      </p>
    </div>
  );
}