/**
 * scripts/smoke-render.mjs
 * ---------------------------------------------------------------------------
 * Renders every screen with react-dom/server, without a browser.
 *
 * This catches the class of bugs that a build cannot: a content block shape the
 * renderer does not understand, a chapter whose data is missing, a component
 * reading an undefined prop. Every one of the 170 chapters is rendered, so the
 * whole content surface is exercised.
 *
 * JSX cannot be imported by Node directly, so this file is bundled with esbuild
 * (already present through Vite) before it runs:
 *
 *   node scripts/smoke-render.mjs
 */

import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';

/* ---------------------------------------------------------------- browser stubs */

const storage = new Map();

global.window = {
  localStorage: {
    getItem: (key) => (storage.has(key) ? storage.get(key) : null),
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key),
  },
  matchMedia: () => ({ matches: false }),
  location: { hash: '' },
  addEventListener() {},
  removeEventListener() {},
  requestAnimationFrame: (fn) => fn(),
  setTimeout,
  clearTimeout,
};

global.document = {
  documentElement: { dataset: {} },
  getElementById: () => null,
  addEventListener() {},
  removeEventListener() {},
};

// Node 24 exposes navigator as a getter-only global; the clipboard stub is only
// needed by the copy button, which never runs during server rendering.

/* ---------------------------------------------------------------- imports */

const { default: App } = await import('../src/App.jsx');
const { ALL_CHAPTERS, TRACKS, modulesOfTrack } = await import('../src/data/catalog.js');
const { default: ChapterView } = await import('../src/components/ChapterView.jsx');
const { default: Home } = await import('../src/components/Home.jsx');
const { default: TrackOverview } = await import('../src/components/TrackOverview.jsx');
const { default: Sidebar } = await import('../src/components/Sidebar.jsx');
const { default: SearchPanel } = await import('../src/components/SearchPanel.jsx');
const { StudyProvider } = await import('../src/context/StudyContext.jsx');

/* ---------------------------------------------------------------- helpers */

function wrap(node) {
  return createElement(StudyProvider, null, node);
}

function attempt(label, node) {
  try {
    const html = renderToStaticMarkup(wrap(node));
    return { label, ok: true, bytes: html.length, html };
  } catch (error) {
    return { label, ok: false, error };
  }
}

const failures = [];
const results = [];
let checks = 0;
let totalBytes = 0;

function check(result) {
  checks += 1;
  results.push(result);
  if (result.ok) totalBytes += result.bytes;
  else failures.push(result);
}

/* ---------------------------------------------------------------- screens */

for (const track of TRACKS) {
  check(attempt(`Home`, createElement(Home)));
  check(
    attempt(
      `TrackOverview ${track.id}`,
      createElement(TrackOverview, {
        track,
      }),
    ),
  );

  for (const module of modulesOfTrack(track.id)) {
    check(
      attempt(
        `Sidebar ${track.id}`,
        createElement(Sidebar, {
          route: { name: 'track', trackId: track.id, chapterId: null, chapter: null, module: null },
          openModules: [module.id],
          toggleModule: () => {},
          onNavigate: () => {},
          isOpen: false,
        }),
      ),
    );
  }
}

for (const chapter of ALL_CHAPTERS) {
  check(attempt(`Chapter ${chapter.id}`, createElement(ChapterView, { chapter, query: 'a' })));
}

check(
  attempt('SearchPanel', createElement(SearchPanel, {
    query: 'useeffect',
    onQueryChange: () => {},
    onOpenResult: () => {},
    onClose: () => {},
  })),
);

check(attempt('App shell', createElement(App)));

/* ---------------------------------------------------------------- report */

const seen = new Set();
const unique = failures.filter((failure) => {
  if (seen.has(failure.error.message)) return false;
  seen.add(failure.error.message);
  return true;
});

console.log(`rendered ${checks} screens, ${(totalBytes / 1024).toFixed(0)} kB of HTML`);

/* A block shape the renderer stringifies instead of rendering
   appears as literal [object Object] in the markup — the
   clearest possible signal of a content/renderer mismatch. */
const polluted = results.filter(
  (result) => result.ok && result.html.includes('[object Object]'),
);

if (polluted.length) {
  console.error(`\n${polluted.length} screen(s) render [object Object]:\n`);
  for (const result of polluted) {
    console.error(`- ${result.label}`);
  }
  process.exit(1);
}

if (failures.length) {
  console.error(`\nFAILED ${failures.length} render(s), ${unique.length} distinct error(s):\n`);
  for (const failure of unique) {
    console.error(`- ${failure.label}`);
    console.error(`  ${failure.error.message}`);
  }
  process.exit(1);
}

console.log('all screens rendered without errors');
