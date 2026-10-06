/**
 * components/SearchPanel.jsx
 * ---------------------------------------------------------------------------
 * Global search over the catalog. Matching is case-insensitive and happens
 * against the pre-built searchText index, so results cover code samples, tables,
 * and hidden answers too, not just titles.
 *
 * Selecting a result navigates to the chapter and scrolls to the block that
 * contains the first match.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { ALL_CHAPTERS, TRACKS } from '../data/catalog.js';
import { blockText } from '../data/build.js';
import { Button, IconClose, IconSearch } from './ui.jsx';

const MAX_RESULTS = 40;
const MIN_QUERY = 2;

/** Index built once: chapter + the block-level haystacks that can match. */
const INDEX = ALL_CHAPTERS.map((chapter) => ({
  chapter,
  blocks: chapter.blocks ?? [],
}));

export default function SearchPanel({ query, onQueryChange, onOpenResult, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /** Flattens one block into a lowercase haystack, mirroring utils/build.js. */
  function blockHaystack(block) {
    if (!block) return '';
    switch (block.type) {
      case 'code':
        return block.code.toLowerCase();
      case 'table':
        return [...block.head, ...block.rows.flat()].join(' ').toLowerCase();
      case 'ul':
      case 'ol':
        return block.items
          .map((item) => (typeof item === 'string' ? item : blockText(item)))
          .join(' ')
          .replace(/<[^>]*>/g, ' ')
          .toLowerCase();
      case 'quote':
        return [block.title ?? '', ...(block.body ?? [])].join(' ').replace(/<[^>]*>/g, ' ').toLowerCase();
      case 'qa':
        return [block.question, ...(block.answer ?? [])]
          .join(' ')
          .replace(/<[^>]*>/g, ' ')
          .toLowerCase();
      case 'reveal':
        return [block.summary, ...(block.body ?? [])].join(' ').replace(/<[^>]*>/g, ' ').toLowerCase();
      case 'problem':
        return [block.task, block.io ?? ''].join(' ').replace(/<[^>]*>/g, ' ').toLowerCase();
      case 'checklist':
        return block.items.map((item) => item.text ?? item.label).join(' ').toLowerCase();
      case 'group':
        return (block.body ?? []).map(blockHaystack).join(' ');
      default:
        return String(block.html ?? '').replace(/<[^>]*>/g, ' ').toLowerCase();
    }
  }

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle.length < MIN_QUERY) return [];

    const found = [];
    for (const { chapter, blocks } of INDEX) {
      // searchText is already lowercased by data/build.js and covers title, tags
      // and every block, so it is the recall half of the check.
      const inContent = chapter.searchText.includes(needle);
      if (!inContent) continue;

      const inTitle = chapter.plainTitle.toLowerCase().includes(needle);
      const inTags = (chapter.tags ?? []).some((tag) => tag.toLowerCase().includes(needle));

      const blockHits = [];
      blocks.forEach((block, blockIndex) => {
        if (blockHaystack(block).includes(needle)) blockHits.push(blockIndex);
      });

      found.push({
        chapter,
        blockIndex: blockHits.length ? blockHits[0] : null,
        score: (inTitle ? 100 : 0) + (inTags ? 40 : 0) + Math.min(blockHits.length, 10),
      });
    }

    return found
      .sort((a, b) => b.score - a.score || a.chapter.id.localeCompare(b.chapter.id))
      .slice(0, MAX_RESULTS);
    // blockHaystack is a stable helper in practice; it is redefined per render,
    // so the memo intentionally depends only on the query.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function openResult(result) {
    onOpenResult(result);
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      onClose?.();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }
    if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault();
      openResult(results[activeIndex]);
    }
  }

  const trackLabel = (trackId) => TRACKS.find((track) => track.id === trackId)?.label ?? trackId;
  const needle = query.trim().toLowerCase();

  return (
    <div className="search mx-auto w-full max-w-3xl">
      <div className="search__box flex items-center gap-2">
        <label className="sr-only" htmlFor="search-input">
          Cari materi
        </label>
        <div className="relative flex-1">
          <IconSearch className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
          <input
            id="search-input"
            ref={inputRef}
            type="search"
            value={query}
            placeholder="Cari topik, kode, atau pertanyaan…"
            autoComplete="off"
            className="w-full rounded-xl border border-line bg-panel py-3 pr-4 pl-10 text-ink placeholder:text-muted/70 focus:border-brand focus:outline-none"
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
        <Button variant="ghost" size="sm" className="pointer-coarse:min-h-10" onClick={onClose}>
          <IconClose width={14} height={14} />
          Tutup
        </Button>
      </div>

      {needle.length >= MIN_QUERY && (
        <p className="search__count mt-3 mb-1 text-sm text-muted" aria-live="polite">
          {results.length} hasil untuk &ldquo;{query.trim()}&rdquo;
          {results.length === 40 ? ' (dipotong 40 pertama)' : ''}
        </p>
      )}

      {needle.length >= MIN_QUERY && results.length === 0 && (
        <p className="search__empty text-muted">Tidak ada bab yang cocok. Coba kata kunci lain.</p>
      )}

      <ul className="search__results mt-2 grid list-none gap-1.5">
        {results.map((result, index) => (
          <li key={result.chapter.id}>
            <button
              type="button"
              className={`search__result grid w-full gap-0.5 rounded-xl border px-4 py-3 text-left transition ${
                index === activeIndex
                  ? 'is-active border-brand bg-brand-soft'
                  : 'border-line bg-panel hover:border-brand hover:bg-brand-soft/50'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => openResult(result)}
            >
              <span className="search__result-track text-[0.68rem] font-bold tracking-[0.1em] text-brand uppercase">
                {trackLabel(result.chapter.trackId)}
              </span>
              <span className="search__result-title text-[0.95rem] font-semibold text-ink">
                {result.chapter.plainTitle}
              </span>
              <span className="search__result-module text-xs text-muted">
                {result.chapter.moduleNo} · {result.chapter.moduleTitle}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}