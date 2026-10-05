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

/* A same-URL goto may skip the reload, so the resize animates
   the drawer's transform from its desktop position. Wait for
   the off-canvas state to settle instead of snapshotting once. */
await page.waitForFunction(
  () => document.getElementById('sidebar').getBoundingClientRect().x < -50,
  null,
  { timeout: 5000, polling: 'raf' },
);
const sidebarBox = await page.locator('.sidebar').boundingBox();
report('sidebar hidden off-canvas on mobile', sidebarBox.x < -50, `x=${Math.round(sidebarBox.x)}`);

await page.locator('.topbar__menu').click();
await page.waitForFunction(
  () => document.getElementById('sidebar').getBoundingClientRect().x >= -1,
  null,
  { timeout: 5000, polling: 'raf' },
);
const openBox = await page.locator('.sidebar').boundingBox();
report('mobile drawer opens', openBox.x >= -1, `x=${Math.round(openBox.x)}`);

await page.locator('.sidebar__scrim').click({ position: { x: 370, y: 400 } });
await page.waitForFunction(
  () => document.getElementById('sidebar').getBoundingClientRect().x < -50,
  null,
  { timeout: 5000, polling: 'raf' },
);
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

/* ------------------------------------------------------------------ mobile */

// A touch-emulated context so the pointer-coarse utilities apply and
// the checks measure what a phone actually renders.
const mobileContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});
const mobilePage = await mobileContext.newPage();
mobilePage.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(`[mobile] ${message.text()}`);
});
mobilePage.on('pageerror', (error) => consoleErrors.push(`[mobile] ${String(error)}`));

const drawerX = () =>
  mobilePage.evaluate(() => Math.round(document.getElementById('sidebar').getBoundingClientRect().x));

/* The drawer slides with a 200ms transition; wait for the
   target state instead of fixed timeouts. */
async function waitForDrawerX(expect, timeoutMs = 5000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const x = await drawerX();
    if (expect === 'open' ? x >= -1 : x < -50) return x;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return drawerX();
}

/* Touch targets: everything interactive in the reading pane must be
   at least 40px tall for a thumb. */
for (const [label, hash] of [
  ['home', '#/'],
  ['track overview', '#/track/frontend'],
  ['chapter', '#/track/js/c1'],
  ['checklist chapter', '#/track/backend/sp8-design-question'],
]) {
  await mobilePage.goto(`${BASE_URL}/${hash}`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(300);
  const smallTargets = await mobilePage.evaluate(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const visible = (el) => {
      const box = el.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && box.right > 0 && box.left < vw && box.bottom > 0 && box.top < vh;
    };
    return [...document.querySelectorAll('#main-scroll button, #main-scroll a, #main-scroll summary, #main-scroll input, #main-scroll label')]
      .filter((el) => visible(el) && !(el.tagName === 'INPUT' && el.closest('label')))
      .map((el) => ({
        tag: el.tagName,
        h: Math.round(el.getBoundingClientRect().height),
        label: (el.textContent ?? '').trim().slice(0, 24),
      }))
      .filter((item) => item.h < 40);
  });
  report(
    `mobile touch targets on ${label}`,
    smallTargets.length === 0,
    smallTargets.length ? JSON.stringify(smallTargets.slice(0, 4)) : 'all >= 40px',
  );
}

/* The reading pane is the only scroll surface on mobile. */
await mobilePage.setViewportSize({ width: 390, height: 844 });
await mobilePage.goto(`${BASE_URL}/#/track/frontend`, { waitUntil: 'networkidle' });
await mobilePage.waitForTimeout(300);
const nestedScrollers = await mobilePage.evaluate(() => {
  const pane = document.getElementById('main-scroll');
  return [...pane.querySelectorAll('*')].filter((el) => {
    const style = getComputedStyle(el);
    return ['auto', 'scroll'].includes(style.overflowY) && el.scrollHeight > el.clientHeight + 4;
  }).length;
});
report('no nested vertical scrollers on mobile', nestedScrollers === 0, `${nestedScrollers} nested`);

/* Tables and code samples break out of the page padding. */
await mobilePage.goto(`${BASE_URL}/#/track/js/c1`, { waitUntil: 'networkidle' });
await mobilePage.waitForSelector('.code-block');
const bleed = await mobilePage.evaluate(() => {
  const el = document.querySelector('.code-block') ?? document.querySelector('.table-wrap');
  const box = el.getBoundingClientRect();
  return { left: Math.round(box.left), right: Math.round(window.innerWidth - box.right) };
});
report(
  'code and tables go full-bleed on mobile',
  bleed.left <= 2 && bleed.right <= 18,
  `inset ${bleed.left}px / ${bleed.right}px`,
);

/* Prev/next navigation stacks below 380px. */
await mobilePage.setViewportSize({ width: 320, height: 700 });
await mobilePage.goto(`${BASE_URL}/#/track/js/c2`, { waitUntil: 'networkidle' });
await mobilePage.waitForSelector('.chapter__nav');
const navColumns = await mobilePage.evaluate(
  () => getComputedStyle(document.querySelector('.chapter__nav')).gridTemplateColumns,
);
report('prev/next stack below 380px', !navColumns.includes(' '), navColumns);

/* The completion pill and the back-to-top button never
   overlap: the pill sticks above the reading pane's bottom
   padding, the button sits inside it. */
await mobilePage.goto(`${BASE_URL}/#/track/backend/sp3-transactional`, { waitUntil: 'networkidle' });
const floatScroll = await mobilePage.evaluate(() => {
  const pane = document.getElementById('main-scroll');
  const footer = document.querySelector('.chapter__footer');
  const paneTop = pane.getBoundingClientRect().top;
  const footerAbs = footer.getBoundingClientRect().top - paneTop + pane.scrollTop;
  return Math.max(
    650,
    Math.min(footerAbs - pane.clientHeight - 100, pane.scrollHeight - pane.clientHeight),
  );
});
await mobilePage.evaluate((top) => {
  document.getElementById('main-scroll').scrollTo({ top, behavior: 'instant' });
}, floatScroll);
await mobilePage.waitForTimeout(500);
const floats = await mobilePage.evaluate(() => {
  const pill = document.querySelector('.chapter__donebar');
  const top = document.querySelector('.back-to-top');
  if (!pill || !top) return null;
  return {
    pillBottom: Math.round(pill.getBoundingClientRect().bottom),
    buttonTop: Math.round(top.getBoundingClientRect().top),
  };
});
report(
  'back-to-top lifts above the completion pill',
  floats !== null && floats.pillBottom <= floats.buttonTop + 2,
  floats ? `pill bottom ${floats.pillBottom}px, button top ${floats.buttonTop}px` : 'missing',
);

/* The reading pane locks while the drawer is open, and scrolls
   again once it closes. */
await mobilePage.setViewportSize({ width: 390, height: 844 });
await mobilePage.goto(`${BASE_URL}/#/track/backend/sp3-transactional`, { waitUntil: 'networkidle' });
await mobilePage.waitForSelector('.chapter__title');
await mobilePage.locator('.topbar__menu').click();
await waitForDrawerX('open');
const locked = await mobilePage.evaluate(() => {
  const pane = document.getElementById('main-scroll');
  return {
    overflow: getComputedStyle(pane).overflowY,
    scrollable: pane.scrollHeight > pane.clientHeight + 4,
  };
});
report(
  'reading pane locks while the drawer is open',
  locked.overflow === 'hidden' && locked.scrollable,
  JSON.stringify(locked),
);
await mobilePage.locator('.sidebar__scrim').click({ position: { x: 370, y: 400 } });
await mobilePage.waitForTimeout(300);
const unlocked = await mobilePage.evaluate(() => {
  const pane = document.getElementById('main-scroll');
  pane.scrollTo({ top: 400, behavior: 'instant' });
  return { overflow: getComputedStyle(pane).overflowY, scrollTop: pane.scrollTop };
});
report(
  'reading pane scrolls again once the drawer closes',
  unlocked.overflow === 'auto' && unlocked.scrollTop > 0,
  JSON.stringify(unlocked),
);

/* Swipe gestures: edge swipe opens, in-drawer swipe closes, and a
   swipe over the reading pane does nothing. */
const cdp = await mobileContext.newCDPSession(mobilePage);
async function swipe(fromX, toX, y = 400) {
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: fromX, y }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: toX, y }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
}

await swipe(10, 120);
const swipeOpenX = await waitForDrawerX('open');
report('edge swipe opens the drawer', swipeOpenX >= -1, `x=${swipeOpenX}`);

await swipe(100, 20);
const swipeClosedX = await waitForDrawerX('closed');
report('in-drawer swipe closes the drawer', swipeClosedX < -50, `x=${swipeClosedX}`);

await swipe(200, 320);
const ignoredX = await waitForDrawerX('closed');
report('swipe over the reading pane is ignored', ignoredX < -50, `x=${ignoredX}`);

/* Escape closes the drawer, and picking a chapter from the drawer
   navigates and closes it. */
await mobilePage.locator('.topbar__menu').click();
await waitForDrawerX('open');
await mobilePage.keyboard.press('Escape');
const escapeX = await waitForDrawerX('closed');
report('escape closes the mobile drawer', escapeX < -50, `x=${escapeX}`);

await mobilePage.locator('.topbar__menu').click();
await waitForDrawerX('open');
const drawerLinks = await mobilePage.locator('.chapter-link').count();
const hashBefore = await mobilePage.evaluate(() => location.hash);
/* The last link is a different chapter from the active one,
   so navigation is observable in the hash. */
await mobilePage.locator('.chapter-link').last().click();
const pickX = await waitForDrawerX('closed');
const afterPick = await mobilePage.evaluate(() => ({
  x: Math.round(document.getElementById('sidebar').getBoundingClientRect().x),
  hash: location.hash,
}));
report(
  'drawer chapter link navigates and closes',
  drawerLinks > 1 &&
    pickX < -50 &&
    afterPick.hash !== hashBefore &&
    /#\/track\/[^/]+\/[^/]+/.test(afterPick.hash),
  `${hashBefore} -> ${afterPick.hash}, x=${afterPick.x}`,
);

const mobileOverflow = await mobilePage.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
report('no horizontal overflow on mobile', mobileOverflow <= 1, `${mobileOverflow}px`);

await mobilePage.screenshot({ path: `${SHOTS}/mobile-chapter.png`, fullPage: false });
await mobileContext.close();

/* ------------------------------------------------------------------ unknown route */

await page.goto(`${BASE_URL}/#/track/js/tidak-ada`, { waitUntil: 'networkidle' });
await page.waitForTimeout(200);
report('unknown chapter id falls back home', (await page.locator('.home__title').count()) === 1);

/* ------------------------------------------------------------------ console */

report('no console errors', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));

await browser.close();

console.log(`\n${results.length - failed}/${results.length} checks passed`);
if (failed) process.exit(1);
