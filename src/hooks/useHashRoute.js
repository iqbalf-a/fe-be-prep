/**
 * hooks/useHashRoute.js
 * ---------------------------------------------------------------------------
 * Minimal hash router. The app needs three kinds of destination, and nothing
 * more:
 *
 *   (empty)                  home / dashboard
 *   #/track/<trackId>        track overview
 *   #/track/<trackId>/<chapterId>
 *
 * A chapter id is unique across the whole catalog (verified by the catalog
 * itself), so the track in the url is only used to resolve the module context
 * and the sidebar highlight.
 *
 * Hash routing keeps the app deployable as static files anywhere, including
 * Vercel, without any server rewrite rules.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { CHAPTERS_BY_ID, MODULES_BY_ID, modulesOfTrack } from '../data/catalog.js';

function parseHash(hash) {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (!parts.length) return { name: 'home', trackId: null, chapterId: null };
  if (parts[0] === 'track' && parts[1]) {
    const trackId = parts[1];
    const chapterId = parts[2] ?? null;
    return { name: chapterId ? 'chapter' : 'track', trackId, chapterId };
  }
  return { name: 'home', trackId: null, chapterId: null };
}

export function navigateTo(path) {
  const next = path.startsWith('#') ? path : `#${path}`;
  if (window.location.hash === next) return;
  window.location.hash = next;
}

export function chapterPath(chapterId) {
  const chapter = CHAPTERS_BY_ID.get(chapterId);
  return chapter ? `#/track/${chapter.trackId}/${chapter.id}` : '#/';
}

export function trackPath(trackId) {
  return `#/track/${trackId}`;
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash(window.location.hash));
      // Every navigation starts at the top, like a real page load would.
      window.requestAnimationFrame(() => {
        document.getElementById('main-scroll')?.scrollTo({ top: 0 });
      });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const chapter = route.chapterId ? CHAPTERS_BY_ID.get(route.chapterId) ?? null : null;
  const module = chapter ? MODULES_BY_ID.get(chapter.moduleId) ?? null : null;

  // A stale link (renamed id, older hash kept in history) must not blank the app.
  const resolved = useMemo(() => {
    if (route.name === 'chapter' && !chapter) {
      return { name: 'home', trackId: null, chapterId: null, chapter: null, module: null };
    }
    return {
      ...route,
      chapter: route.name === 'track' ? null : chapter,
      module: route.name === 'track' ? (MODULES_BY_ID.get(firstModuleId(route.trackId)) ?? null) : module,
    };
  }, [route, chapter, module]);

  const goHome = useCallback(() => navigateTo('#/'), []);
  const goTrack = useCallback((trackId) => navigateTo(trackPath(trackId)), []);
  const goChapter = useCallback((chapterId) => navigateTo(chapterPath(chapterId)), []);

  return {
    ...resolved,
    modules: resolved.trackId ? modulesOfTrack(resolved.trackId) : [],
    goHome,
    goTrack,
    goChapter,
  };
}

function firstModuleId(trackId) {
  return modulesOfTrack(trackId)[0]?.id ?? null;
}
