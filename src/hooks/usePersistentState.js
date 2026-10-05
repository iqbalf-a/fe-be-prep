/**
 * hooks/usePersistentState.js
 * ---------------------------------------------------------------------------
 * State that is written to LocalStorage rather than living only in React state.
 *
 * Writes are debounced so typing in a notes field does not hit LocalStorage on
 * every keystroke, and a failed write (private mode, quota) surfaces as a status
 * flag instead of throwing.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

const isBrowser = typeof window !== 'undefined' && !!window.localStorage;

function read(key, fallback) {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`[${key}] gagal dibaca dari LocalStorage`, error);
    return fallback;
  }
}

/**
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @param {{ delay?: number }} [options]
 * @returns {[T, (updater: T | ((prev: T) => T)) => void, { error: string | null }]}
 */
export default function usePersistentState(key, initialValue, options = {}) {
  const { delay = 250 } = options;

  const [value, setValue] = useState(() => {
    const stored = read(key, null);
    return stored === null || stored === undefined ? initialValue : stored;
  });
  const [error, setError] = useState(null);

  const timer = useRef(null);
  const latest = useRef(value);
  latest.current = value;

  const update = useCallback(
    (updater) => {
      setValue((previous) =>
        typeof updater === 'function' ? updater(previous) : updater,
      );
    },
    [],
  );

  // Persist on change, debounced.
  useEffect(() => {
    if (!isBrowser) return undefined;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(latest.current));
        setError(null);
      } catch (e) {
        console.warn(`[${key}] gagal disimpan`, e);
        setError('Penyimpanan browser penuh atau ditolak — progres mungkin tidak tersimpan.');
      }
    }, delay);
    return () => window.clearTimeout(timer.current);
  }, [key, value, delay]);

  return [value, update, { error }];
}

/** Writes immediately, bypassing the debounce (used before export / unload). */
export function writeNow(key, value) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[${key}] gagal disimpan`, e);
  }
}