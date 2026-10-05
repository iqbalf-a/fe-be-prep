/**
 * context/StudyContext.jsx
 * ---------------------------------------------------------------------------
 * All study state in one place: which chapters are finished, which practice
 * checklist items are ticked, per-chapter notes, and the last visited chapter.
 *
 * The LocalStorage shape matches the source document so an existing learner's
 * progress survives the migration:
 *
 *   {
 *     completed: { [chapterId]: true },
 *     checklists: { [chapterId]: { [itemId]: true } },
 *     notes: { [chapterId]: string },
 *     lastChapter: 'c1'
 *   }
 */

import { createContext, useCallback, useContext, useMemo } from 'react';
import usePersistentState, { writeNow } from '../hooks/usePersistentState.js';
import { ALL_CHAPTERS, CHAPTERS_BY_ID, TRACK_STATS } from '../data/catalog.js';

export const STORAGE_KEY = 'bsi-js-interview-v10';
export const THEME_KEY = 'bsi-theme';

const emptyState = {
  completed: {},
  checklists: {},
  notes: {},
  lastChapter: ALL_CHAPTERS[0]?.id ?? null,
};

const StudyContext = createContext(null);

/** Drops keys for chapters that no longer exist, so the blob cannot grow forever. */
function prune(state) {
  const known = new Set(ALL_CHAPTERS.map((chapter) => chapter.id));
  const completed = {};
  const checklists = {};
  const notes = {};

  for (const [id, value] of Object.entries(state.completed ?? {})) {
    if (known.has(id) && value) completed[id] = true;
  }
  for (const [id, items] of Object.entries(state.checklists ?? {})) {
    if (!known.has(id)) continue;
    const kept = {};
    for (const [itemId, value] of Object.entries(items ?? {})) {
      if (value) kept[itemId] = true;
    }
    checklists[id] = kept;
  }
  for (const [id, value] of Object.entries(state.notes ?? {})) {
    if (known.has(id) && typeof value === 'string' && value.trim()) notes[id] = value;
  }

  return {
    completed,
    checklists,
    notes,
    lastChapter: CHAPTERS_BY_ID.has(state.lastChapter) ? state.lastChapter : emptyState.lastChapter,
  };
}

export function StudyProvider({ children }) {
  const [raw, setRaw, storage] = usePersistentState(STORAGE_KEY, emptyState, { delay: 200 });

  const state = useMemo(() => prune(raw ?? emptyState), [raw]);

  const setChapterCompleted = useCallback(
    (chapterId, done) => {
      setRaw((previous) => {
        const completed = { ...(previous.completed ?? {}) };
        if (done) completed[chapterId] = true;
        else delete completed[chapterId];
        return { ...previous, completed };
      });
    },
    [setRaw],
  );

  const toggleChapterCompleted = useCallback(
    (chapterId) => {
      setRaw((previous) => {
        const completed = { ...(previous.completed ?? {}) };
        if (completed[chapterId]) delete completed[chapterId];
        else completed[chapterId] = true;
        return { ...previous, completed };
      });
    },
    [setRaw],
  );

  const toggleChecklistItem = useCallback(
    (chapterId, itemId) => {
      setRaw((previous) => {
        const perChapter = { ...(previous.checklists?.[chapterId] ?? {}) };
        if (perChapter[itemId]) delete perChapter[itemId];
        else perChapter[itemId] = true;
        return { ...previous, checklists: { ...(previous.checklists ?? {}), [chapterId]: perChapter } };
      });
    },
    [setRaw],
  );

  const setNote = useCallback(
    (chapterId, text) => {
      setRaw((previous) => ({ ...previous, notes: { ...(previous.notes ?? {}), [chapterId]: text } }));
    },
    [setRaw],
  );

  const rememberChapter = useCallback(
    (chapterId) => {
      setRaw((previous) => (previous.lastChapter === chapterId ? previous : { ...previous, lastChapter: chapterId }));
    },
    [setRaw],
  );

  const resetAll = useCallback(() => {
    setRaw(emptyState);
    writeNow(STORAGE_KEY, emptyState);
  }, [setRaw]);

  const stats = useMemo(() => {
    const done = state.completed;
    const perTrack = {};
    for (const [trackId, trackStats] of Object.entries(TRACK_STATS)) {
      const total = trackStats.total;
      const completed = ALL_CHAPTERS.filter(
        (chapter) => chapter.trackId === trackId && done[chapter.id],
      ).length;
      perTrack[trackId] = {
        ...trackStats,
        completed,
        percent: total ? Math.round((completed / total) * 100) : 0,
      };
    }
    const completedTotal = Object.keys(done).length;
    return {
      perTrack,
      total: ALL_CHAPTERS.length,
      completed: completedTotal,
      percent: ALL_CHAPTERS.length
        ? Math.round((completedTotal / ALL_CHAPTERS.length) * 100)
        : 0,
    };
  }, [state.completed]);

  const value = useMemo(
    () => ({
      completed: state.completed,
      checklists: state.checklists,
      notes: state.notes,
      lastChapter: state.lastChapter,
      isCompleted: (chapterId) => Boolean(state.completed[chapterId]),
      setChapterCompleted,
      toggleChapterCompleted,
      toggleChecklistItem,
      isChecklistItemDone: (chapterId, itemId) =>
        Boolean(state.checklists?.[chapterId]?.[itemId]),
      setNote,
      noteFor: (chapterId) => state.notes[chapterId] ?? '',
      rememberChapter,
      resetAll,
      stats,
      storageError: storage.error,
    }),
    [
      state,
      storage.error,
      setChapterCompleted,
      toggleChapterCompleted,
      toggleChecklistItem,
      setNote,
      rememberChapter,
      resetAll,
      stats,
    ],
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) throw new Error('useStudy harus dipakai di dalam StudyProvider');
  return context;
}
