/**
 * components/ChapterView.jsx
 * ---------------------------------------------------------------------------
 * One chapter: header with priority badge and reading time, the content blocks,
 * a personal notes field, and the completion control.
 *
 * Completion is the primary action of the page, so it appears twice: a solid
 * button next to the notes, and a compact pill pinned to the bottom of the
 * reading pane. The pill hides itself while the in-page button is on screen, so
 * the two never stack on top of each other, and both show the resulting state
 * at a glance.
 *
 * The "Bab sebelumnya / berikutnya" pair follows the catalogue order of the
 * chapter's own track, so navigation stays inside a track instead of jumping
 * between JavaScript and Backend.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import BlockRenderer from './BlockRenderer.jsx';
import { PRIORITIES, modulesOfTrack } from '../data/catalog.js';
import { chapterPath, navigateTo } from '../hooks/useHashRoute.js';
import { useStudy } from '../context/StudyContext.jsx';
import { Badge, Button, IconArrowLeft, IconArrowRight, IconCheck, IconCircleCheck, IconClose } from './ui.jsx';

export default function ChapterView({ chapter, query, onClearHighlight }) {
  const { isCompleted, toggleChapterCompleted, noteFor, setNote, rememberChapter } = useStudy();
  /** Wrapper of the in-page completion button, watched by the floating pill. */
  const doneAnchorRef = useRef(null);
  const [donePillVisible, setDonePillVisible] = useState(true);

  useEffect(() => {
    if (chapter?.id) rememberChapter(chapter.id);
  }, [chapter?.id, rememberChapter]);

  const siblings = useMemo(() => {
    if (!chapter) return { previous: null, next: null };
    const chapters = modulesOfTrack(chapter.trackId).flatMap((module) => module.chapters);
    const index = chapters.findIndex((item) => item.id === chapter.id);
    return {
      previous: index > 0 ? chapters[index - 1] : null,
      next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null,
    };
  }, [chapter]);

  // Keyboard shortcut: S toggles the chapter, like a study checklist.
  useEffect(() => {
    function onKeyDown(event) {
      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === 's' || event.key === 'S') {
        event.preventDefault();
        toggleChapterCompleted(chapter.id);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [chapter.id, toggleChapterCompleted]);

  // The floating pill only makes sense while the in-page button is off screen.
  useEffect(() => {
    const anchor = doneAnchorRef.current;
    const pane = document.getElementById('main-scroll');
    if (!anchor || !pane || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setDonePillVisible(!entry.isIntersecting),
      { root: pane, rootMargin: '-80px 0px -80px 0px' },
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [chapter.id]);

  if (!chapter) return null;

  const priority = PRIORITIES[chapter.priority] ?? PRIORITIES.P3;
  const done = isCompleted(chapter.id);

  const doneButton = (className = '', label, size = 'lg') => (
    <Button
      variant={done ? 'done' : 'primary'}
      size={size}
      className={`chapter__done ${
        done ? 'ring-2 ring-ok/40' : 'ring-2 ring-brand/25 hover:ring-brand/50'
      } ${className}`}
      onClick={() => toggleChapterCompleted(chapter.id)}
      aria-pressed={done}
      aria-label={label}
    >
      {done ? <IconCircleCheck width={19} height={19} /> : <IconCheck width={19} height={19} />}
      {done ? 'Sudah selesai' : 'Tandai selesai'}
      <kbd className="ml-0.5 hidden rounded bg-white/20 px-1.5 py-0.5 font-mono text-[0.65rem] sm:inline">S</kbd>
    </Button>
  );

  return (
    <article className="chapter mx-auto w-full max-w-3xl">
      <header className="chapter__header border-b border-line pb-5">
        <p className="chapter__eyebrow mb-1.5 flex flex-wrap items-center gap-2 text-[0.78rem] text-muted">
          <span className="chapter__track font-mono font-bold tracking-[0.08em] text-brand">
            {chapter.trackId.toUpperCase()}
          </span>
          <Badge priority={chapter.priority} label={priority.label} />
          <span className="chapter__minutes">±{chapter.minutes} menit</span>
        </p>
        <h1 className="chapter__title text-3xl leading-tight font-extrabold tracking-tight text-balance sm:text-4xl">
          {chapter.plainTitle}
        </h1>
        <p className="chapter__module mt-1 text-[0.9rem] text-muted">
          Bagian <strong className="text-ink">{chapter.moduleNo}</strong> · {chapter.moduleTitle}
        </p>

        {(chapter.tags ?? []).length > 0 && (
          <ul className="tag-list mt-3 flex list-none flex-wrap gap-1.5">
            {chapter.tags.map((tag) => (
              <li
                key={tag}
                className="tag rounded-full border border-line bg-soft px-2 py-0.5 text-[0.72rem] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {query && (
          <p className="chapter__highlight mt-3 flex items-center gap-2 rounded-xl bg-brand-soft px-3 py-2 text-sm text-brand">
            <span className="flex-1">Menyorot &ldquo;{query}&rdquo; dari pencarian</span>
            <Button variant="plain" size="sm" onClick={onClearHighlight}>
              <IconClose width={13} height={13} />
              Hapus sorotan
            </Button>
          </p>
        )}
      </header>

      <div className="chapter__body prose-block pt-2">
        <BlockRenderer blocks={chapter.blocks} query={query} chapterId={chapter.id} />
      </div>

      <section className="chapter__notes mt-10 grid gap-2 border-t border-line pt-5">
        <label className="text-sm font-semibold" htmlFor={`note-${chapter.id}`}>
          Catatan pribadi
        </label>
        <textarea
          id={`note-${chapter.id}`}
          rows={4}
          placeholder="Tulis catatan, mistake yang perlu diingat, atau link references."
          className="w-full resize-y rounded-xl border border-line bg-panel px-3 py-2.5 text-[0.9rem] text-ink placeholder:text-muted/70 focus:border-brand focus:outline-none"
          value={noteFor(chapter.id)}
          onChange={(event) => setNote(chapter.id, event.target.value)}
        />
        <p className="hint text-[0.8rem] text-muted">Tersimpan otomatis di LocalStorage browser ini.</p>
      </section>

      <footer className="chapter__footer mt-6 grid gap-4">
        <div ref={doneAnchorRef} className="flex">
          {doneButton('')}
        </div>

        <nav className="chapter__nav grid grid-cols-2 gap-2" aria-label="Navigasi bab">
          {siblings.previous ? (
            <Button
              variant="outline"
              className="max-w-full justify-start truncate text-left"
              onClick={() => navigateTo(chapterPath(siblings.previous.id))}
              title={siblings.previous.plainTitle}
            >
              <IconArrowLeft width={15} height={15} />
              <span className="truncate">{siblings.previous.plainTitle}</span>
            </Button>
          ) : (
            <span />
          )}
          {siblings.next && (
            <Button
              variant="outline"
              className="max-w-full justify-end truncate text-right"
              onClick={() => navigateTo(chapterPath(siblings.next.id))}
              title={siblings.next.plainTitle}
            >
              <span className="truncate">{siblings.next.plainTitle}</span>
              <IconArrowRight width={15} height={15} />
            </Button>
          )}
        </nav>
      </footer>

      {/* Compact version of the same toggle, only while the real button is off screen. */}
      {donePillVisible && (
        <div className="chapter__donebar pointer-events-none sticky bottom-3 z-20 mt-4 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-line bg-panel/95 py-1 pr-1 pl-3 shadow-float backdrop-blur">
            <span className="text-xs text-muted">{done ? 'Sudah selesai' : 'Selesai?'}</span>
            {doneButton('w-auto gap-1.5 px-3 py-1.5 text-xs ring-0', 'Tandai selesai bab ini', 'sm')}
          </div>
        </div>
      )}
    </article>
  );
}