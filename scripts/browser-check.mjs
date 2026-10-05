/**
 * scripts/browser-check.mjs
 * ---------------------------------------------------------------------------
 * End-to-end checks in a real browser, against the dev server.
 *
 * Covers the verification list from the project brief: navigation across all
 * tracks, LocalStorage persistence of progress, search behaviour, theme toggle,
 * and the responsive sidebar.
 *
 *   node scripts/browser-check.mjs
 */

import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4173';
const SHOTS = process.env.SHOT_DIR ?? 'node_modules/.cache/shots';

const results = [];
let failed = 0;

function report(name, ok, detail = '') {
  results.push({ name, ok, detail });
  if (!ok) failed += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` â€” ${detail}` : ''}`);
}

async function waitForServer(url, timeoutMs = 60000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`server tidak merespons di ${url}`);
}

/* ------------------------------------------------------------------ browser */

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

const consoleErrors = [];
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('pageerror', (error) => consoleErrors.push(String(error)));

/* ------------------------------------------------------------------ home */

await waitForServer(BASE_URL);
await page.goto(BASE_URL, { waitUntil: 'networkidle' });

report('home renders title', (await page.locator('.home__title').count()) === 1);

const trackCards = await page.locator('.home__track-link').count();
report('four track cards', trackCards === 4, `${trackCards} cards`);

const overall = await page.locator('.home__progress p').innerText();
report('progress summary visible', /bab selesai/.test(overall), overall.replace(/\s+/g, ' '));

/* ------------------------------------------------------------------ layout */

const shellGeometry = await page.evaluate(() => {
  const pane = document.getElementById('main-scroll');
  const content = document.querySelector('.home');
  const paneBox = pane.getBoundingClientRect();
  const contentBox = content.getBoundingClientRect();
  return {
    paneCenter: paneBox.left + paneBox.width / 2,
    contentCenter: contentBox.left + contentBox.width / 2,
    contentWidth: contentBox.width,
    paneWidth: paneBox.width,
  };
});
report(
  'content column is centred in the reading pane',
  Math.abs(shellGeometry.paneCenter - shellGeometry.contentCenter) < 2,
  `pane ${Math.round(shellGeometry.paneWidth)}px, content ${Math.round(shellGeometry.contentWidth)}px, offset ${Math.round(
    Math.abs(shellGeometry.paneCenter - shellGeometry.contentCenter),
  )}px`,
);

const themeAtStart = await page.getAttribute('html', 'data-theme');
report('theme defaults to light', themeAtStart === 'light', String(themeAtStart));

// The default must not follow the OS preference: a dark-mode machine still
// starts on the light palette from the source document.
const darkOsContext = await browser.newContext({ colorScheme: 'dark' });
const darkOsPage = await darkOsContext.newPage();
await darkOsPage.goto(BASE_URL, { waitUntil: 'networkidle' });
const darkOsTheme = await darkOsPage.getAttribute('html', 'data-theme');
report('dark OS preference still starts light', darkOsTheme === 'light', String(darkOsTheme));
await darkOsContext.close();

/* ------------------------------------------------------------------ every track */

const expectedCounts = { js: 93, frontend: 15, backend: 44, interview: 18 };

for (const [trackId, expected] of Object.entries(expectedCounts)) {
  await page.goto(`${BASE_URL}/#/track/${trackId}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.module-grid');

  const cards = await page.locator('.module-card').count();
  const links = await page.locator('.module-card__chapters a').count();
  report(
    `track ${trackId} lists all chapters`,
    links === expected,
    `${cards} modules, ${links}/${expected} chapters`,
  );

  // The sidebar must reach the bottom of the viewport even when a track only has
  // a handful of modules (Frontend has four).
  const sidebarFill = await page.evaluate(() => {
    const sidebar = document.getElementById('sidebar');
    const box = sidebar.getBoundingClientRect();
    return {
      gap: Math.round(window.innerHeight - (box.top + box.height)),
      height: Math.round(box.height),
      viewport: window.innerHeight,
    };
  });
  report(
    `track ${trackId} sidebar fills the viewport`,
    sidebarFill.gap <= 1,
    `${sidebarFill.height}/${sidebarFill.viewport}px, ${sidebarFill.gap}px gap`,
  );
}

/* ------------------------------------------------------------------ chapter navigation */

await page.goto(`${BASE_URL}/#/track/js/c1`, { waitUntil: 'networkidle' });
await page.waitForSelector('.chapter__title');
report('chapter renders', (await page.locator('.chapter__body').count()) === 1);
report('code block highlighted', (await page.locator('.code-block').count()) > 0);

const qaCards = await page.locator('.qa-card').count();
const tables = await page.locator('.content-table').count();
report('chapter has rich blocks', qaCards + tables > 0, `${qaCards} qa cards, ${tables} tables`);

// Open a collapsed interview card from the source document (JS module 11).
await page.goto(`${BASE_URL}/#/track/js/c71`, { waitUntil: 'networkidle' });
await page.waitForSelector('.qa-card');
await page.locator('.qa-card__q').first().click();
await page.waitForTimeout(120);
const openAnswer = await page.locator('.qa-card[open] .qa-card__a').count();
report('interview card expands', openAnswer > 0);

/* ------------------------------------------------------------------ localstorage progress */

await page.goto(`${BASE_URL}/#/track/js/c1`, { waitUntil: 'networkidle' });
await page.waitForSelector('.chapter__footer .chapter__done');
const doneBox = await page.locator('.chapter__footer .chapter__done').boundingBox();
const doneHasIcon = (await page.locator('.chapter__footer .chapter__done svg').count()) > 0;
report(
  'completion control is prominent but compact',
  doneBox.width >= 150 && doneBox.width <= 280 && doneBox.height >= 44 && doneHasIcon,
  `${Math.round(doneBox.width)}x${Math.round(doneBox.height)}px, icon=${doneHasIcon}`,
);
await page.locator('.chapter__footer .chapter__done').click();
await page.waitForTimeout(600);

const doneLabel = await page.locator('.chapter__footer .chapter__done').innerText();
report('completion control shows the resulting state', /Sudah selesai/i.test(doneLabel), doneLabel.replace(/\s+/g, ' '));

// The floating pill appears only while the in-page button is off screen, so the
// two never stack. A long chapter gives the scroll something to do.
await page.goto(`${BASE_URL}/#/track/backend/sp3-transactional`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.getElementById('main-scroll').scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(400);
const pillBox = await page.locator('.chapter__donebar .chapter__done').boundingBox();
report(
  'compact completion pill while scrolling',
  pillBox !== null && pillBox.width <= 220 && pillBox.height <= 44,
  pillBox ? `${Math.round(pillBox.width)}x${Math.round(pillBox.height)}px` : 'missing',
);

await page.evaluate(() => {
  const pane = document.getElementById('main-scroll');
  pane.scrollTo({ top: pane.scrollHeight, behavior: 'instant' });
});
await page.waitForTimeout(500);
report(
  'completion pill hides when the button is in view',
  (await page.locator('.chapter__donebar').count()) === 0,
);

// Back to the chapter the remaining LocalStorage checks operate on.
await page.goto(`${BASE_URL}/#/track/js/c1`, { waitUntil: 'networkidle' });

// Keyboard shortcut toggles it back, then on again so later checks see it done.
await page.keyboard.press('s');
await page.waitForTimeout(400);
const afterShortcut = await page.locator('.chapter__footer .chapter__done').innerText();
report('keyboard shortcut S toggles completion', /Tandai selesai/i.test(afterShortcut), afterShortcut.replace(/\s+/g, ' '));
await page.keyboard.press('s');
await page.waitForTimeout(500);

const storedRaw = await page.evaluate(() => window.localStorage.getItem('bsi-js-interview-v10'));
let stored = null;
try {
  stored = JSON.parse(storedRaw);
} catch {
  /* reported below */
}
report('completion persisted', stored?.completed?.c1 === true, `keys=${Object.keys(stored ?? {}).join(',')}`);

// Notes
await page.locator('#note-c1').fill('Catatan uji coba: var vs let.');
await page.waitForTimeout(600);
const withNote = JSON.parse(await page.evaluate(() => window.localStorage.getItem('bsi-js-interview-v10')));
report('note persisted', withNote.notes?.c1 === 'Catatan uji coba: var vs let.');

// Checklist
await page.goto(`${BASE_URL}/#/track/backend/sp8-design-question`, { waitUntil: 'networkidle' });
const checklistBox = page.locator('.checklist__list input[type=checkbox]').first();
await page.waitForSelector('.checklist__list input[type=checkbox]');
await checklistBox.check();
await page.waitForTimeout(600);
const withChecklist = JSON.parse(await page.evaluate(() => window.localStorage.getItem('bsi-js-interview-v10')));
report('checklist persisted', Object.keys(withChecklist.checklists ?? {}).length > 0);

// Progress survives a reload
await page.goto(`${BASE_URL}/#/`, { waitUntil: 'networkidle' });
await page.waitForSelector('.home__progress');
const afterReload = await page.locator('.home__progress p').innerText();
report('progress survives reload', /^1\//.test(afterReload.trim()), afterReload.replace(/\s+/g, ' '));

/* ------------------------------------------------------------------ sidebar progress */

// The module holding the finished chapter is auto-expanded on that chapter page.
await page.goto(`${BASE_URL}/#/track/js/c1`, { waitUntil: 'networkidle' });
await page.waitForSelector('.chapter-link');
const doneLink = await page.locator('.chapter-link.is-done').count();
report('sidebar shows completed chapter', doneLink > 0, `${doneLink} done links`);

/* ------------------------------------------------------------------ search */

await page.locator('.topbar__search').click();
await page.waitForSelector('.search');
await page.locator('#search-input').fill('stale closure');
await page.waitForTimeout(200);

const count = await page.locator('.search__result').count();
report('search finds topics', count > 0, `${count} results`);

const firstResult = await page.locator('.search__result').first().innerText();
await page.locator('.search__result').first().click();
await page.waitForTimeout(300);
report('search navigates to chapter', (await page.locator('.chapter__title').count()) === 1, firstResult.split('\n').join(' Â· '));
report('highlight notice shown', (await page.locator('.chapter__highlight').count()) === 1);
report('match marked', (await page.locator('.chapter__body mark').count()) > 0);

// Case-insensitive
await page.locator('.topbar__search').click();
await page.locator('#search-input').fill('USEEFFECT');
await page.waitForTimeout(250);
report('search is case-insensitive', (await page.locator('.search__result').count()) > 0);

// Code content is searchable
await page.locator('#search-input').fill('setIfAbsent');
await page.waitForTimeout(200);
report('search covers code samples', (await page.locator('.search__result').count()) > 0);

await page.keyboard.press('Escape');
await page.waitForTimeout(150);
report('escape closes search', (await page.locator('.search').count()) === 0);

/* ------------------------------------------------------------------ theme */

const themeBefore = await page.getAttribute('html', 'data-theme');
await page.locator('.topbar__theme').click();
await page.waitForTimeout(200);
const themeAfter = await page.getAttribute('html', 'data-theme');
report('theme toggles', themeBefore !== themeAfter, `${themeBefore} -> ${themeAfter}`);

const themeStored = JSON.parse(await page.evaluate(() => window.localStorage.getItem('bsi-theme')));
report('theme persisted', themeStored === themeAfter, String(themeStored));

// Progress must survive a theme change.
const progressAfterTheme = JSON.parse(
  await page.evaluate(() => window.localStorage.getItem('bsi-js-interview-v10')),
);
report('theme change keeps progress', progressAfterTheme?.completed?.c1 === true);

/* ------------------------------------------------------------------ back to top */

await page.goto(`${BASE_URL}/#/track/js/c1`, { waitUntil: 'networkidle' });
await page.waitForSelector('#main-scroll');
// Instant scroll: the reading pane is smooth-scrolling, and a scripted
// scrollTop assignment would otherwise animate and fire events late.
await page.evaluate(() => {
  const pane = document.getElementById('main-scroll');
  pane.scrollTo({ top: pane.scrollHeight, behavior: 'instant' });
});
await page.waitForTimeout(500);
report('back to top appears when scrolled', (await page.locator('.back-to-top').count()) === 1);
await page.locator('.back-to-top').click();
await page.waitForTimeout(600);
const scrollTop = await page.evaluate(() => document.getElementById('main-scroll').scrollTop);
report('back to top scrolls up', scrollTop < 40, `scrollTop=${scrollTop}`);

/* ------------------------------------------------------------------ responsive */

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${BASE_URL}/#/track/js/c1`, { waitUntil: 'networkidle' });
await page.waitForSelector('.sidebar');

const sidebarBox = await page.locator('.sidebar').boundingBox();
report('sidebar hidden off-canvas on mobile', sidebarBox.x < -50, `x=${Math.round(sidebarBox.x)}`);

await page.locator('.topbar__menu').click();
await page.waitForTimeout(300);
const openBox = await page.locator('.sidebar').boundingBox();
report('mobile drawer opens', openBox.x >= -1, `x=${Math.round(openBox.x)}`);

await page.locator('.sidebar__scrim').click({ position: { x: 370, y: 400 } });
await page.waitForTimeout(300);
const closedBox = await page.locator('.sidebar').boundingBox();
report('mobile drawer closes', closedBox.x < -50, `x=${Math.round(closedBox.x)}`);

const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
report('no horizontal overflow on mobile', overflow <= 1, `${overflow}px`);

await page.screenshot({ path: `${SHOTS}/mobile.png`, fullPage: false });
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(`${BASE_URL}/#/track/backend/sp3-transactional`, { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
await page.screenshot({ path: `${SHOTS}/desktop-chapter.png`, fullPage: false });

/* ------------------------------------------------------------------ unknown route */

await page.goto(`${BASE_URL}/#/track/js/tidak-ada`, { waitUntil: 'networkidle' });
await page.waitForTimeout(200);
report('unknown chapter id falls back home', (await page.locator('.home__title').count()) === 1);

/* ------------------------------------------------------------------ console */

report('no console errors', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));

await browser.close();

console.log(`\n${results.length - failed}/${results.length} checks passed`);
if (failed) process.exit(1);
