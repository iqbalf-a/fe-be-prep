/**
 * verify-parity.mjs
 * ---------------------------------------------------------------------------
 * Guards the "no content lost" requirement.
 *
 * Re-parses the source HTML and compares it against the generated data files:
 * every chapter, every code block, every list item and every table cell must be
 * accounted for. Run after any change to migrate-html.mjs.
 *
 *   node scripts/verify-parity.mjs
 */

import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { parseHtml, isEl, hasClass, textOf, findAll, findFirst } from './lib/parser.mjs';
import { ROOT, SOURCE_NAME, loadSource, sourceMissingNotice } from './lib/source.mjs';

const source = loadSource();
if (!source) {
  console.log(sourceMissingNotice('npm run verify:content'));
  process.exit(0);
}

const failures = [];
function check(label, expected, actual, extra = '') {
  const ok = expected === actual;
  const line = `${ok ? 'PASS' : 'FAIL'}  ${label}: expected ${expected}, got ${actual}${extra ? ` (${extra})` : ''}`;
  console.log(line);
  if (!ok) failures.push(line);
}

/* ---- source side ---- */

const { html, applied } = source;
const dom = parseHtml(html);
const sections = findAll(dom, (n) => isEl(n, 'section') && hasClass(n, 'mod'));
const articles = sections.flatMap((s) =>
  (s.children ?? []).filter((n) => isEl(n, 'article') && hasClass(n, 'ch')),
);

const srcPre = findAll(dom, (n) => isEl(n, 'pre') && !hasClass(n, 'out'));
const srcCode = srcPre.map(
  (p) => textOf(findFirst(p, (n) => isEl(n, 'code')) ?? p).trim(),
).filter(Boolean);

const srcTables = findAll(dom, (n) => isEl(n, 'table'));
const srcHeads = findAll(dom, (n) => isEl(n, 'th'));
const srcCells = findAll(dom, (n) => isEl(n, 'td'));
// Only <tbody> rows become generated rows; header rows live in the table's `head`.
const srcBodyRows = findAll(dom, (n) => isEl(n, 'tbody')).flatMap((tbody) =>
  (tbody.children ?? []).filter((n) => isEl(n, 'tr')),
);
const srcLi = findAll(dom, (n) => isEl(n, 'li'));
const srcCheckItems = findAll(dom, (n) => isEl(n, 'input') && hasClass(n, 'persist-check'));
const srcProb = findAll(dom, (n) => isEl(n, 'div') && hasClass(n, 'prob'));
const srcQ = findAll(dom, (n) => isEl(n, 'details') && hasClass(n, 'q'));
const srcReveal = findAll(dom, (n) => isEl(n, 'details') && !hasClass(n, 'note') && !hasClass(n, 'q') && !hasClass(n, 'out'));
const srcQuote = findAll(dom, (n) => isEl(n, 'blockquote'));
const srcH4 = findAll(dom, (n) => isEl(n, 'h4'));

/* ---- generated side ---- */

async function loadData(name, exportName) {
  const file = pathToFileURL(join(ROOT, 'src', 'data', name)).href;
  const mod = await import(file);
  return mod[exportName];
}

const modules = [
  ...(await loadData('javascript.generated.js', 'javascriptModules')),
  ...(await loadData('backend-node.generated.js', 'backendNodeModules')),
];
const chapters = modules.flatMap((m) => m.chapters);

function walk(blocks, visit) {
  for (const b of blocks) {
    visit(b);
    if (b.body) walk(b.body, visit);
    if (b.answer) walk(b.answer, visit);
  }
}

const genCode = [];
const genTables = [];
const genRows = [];
const genHeads = [];
const genCells = [];
const genItems = [];
const genCheckItems = [];
const genProbs = [];
const genQas = [];
const genReveals = [];
const genQuotes = [];
const genH4 = [];

for (const chapter of chapters) {
  walk(chapter.blocks, (b) => {
    switch (b.type) {
      case 'code':
        genCode.push(b.code.trim());
        break;
      case 'table':
        genTables.push(b);
        genHeads.push(...b.head);
        for (const row of b.rows) genRows.push(row), genCells.push(...row);
        break;
      case 'ul':
      case 'ol':
        genItems.push(...b.items);
        break;
      case 'checklist':
        genCheckItems.push(...b.items);
        break;
      case 'problem':
        genProbs.push(b);
        break;
      case 'qa':
        genQas.push(b);
        break;
      case 'reveal':
        genReveals.push(b);
        break;
      case 'quote':
        genQuotes.push(b);
        break;
      case 'h4':
        genH4.push(b);
        break;
      default:
        break;
    }
  });
}

/* ---- structure parity ---- */

console.log(`source: ${SOURCE_NAME}`);
console.log(`repairs applied: ${applied.length ? applied.join('; ') : 'none'}`);
console.log('\n=== structure ===');
check('modules', sections.length, modules.length);
check('chapters', articles.length, chapters.length);

const srcIds = articles.map((a) => a.attrs.id);
const genIds = chapters.map((c) => c.id);
check(
  'chapter ids in order',
  srcIds.join(','),
  genIds.join(','),
  srcIds.filter((id) => !genIds.includes(id)).join(' ') || 'order preserved',
);

console.log('\n=== content parity ===');
check('code blocks', srcCode.length, genCode.length);

/** Multiset difference, so duplicate snippets do not hide a real mismatch. */
function difference(a, b) {
  const pool = [...b];
  const missing = [];
  for (const item of a) {
    const at = pool.indexOf(item);
    if (at === -1) missing.push(item);
    else pool.splice(at, 1);
  }
  return { missing, extra: pool };
}

const codeDiff = difference(srcCode, genCode);
check('code blocks missing from data', 0, codeDiff.missing.length, codeDiff.missing[0]?.slice(0, 70));
check('code blocks not in source', 0, codeDiff.extra.length, codeDiff.extra[0]?.slice(0, 70));

check('tables', srcTables.length, genTables.length);
check('table header cells', srcHeads.length, genHeads.length);
check('table body rows', srcBodyRows.length, genRows.length);
check('table body cells', srcCells.length, genCells.length);

const srcListItems = srcLi.length - srcCheckItems.length;
check('list items', srcListItems, genItems.length);

check('checklist items', srcCheckItems.length, genCheckItems.length);
check('problems', srcProb.length, genProbs.length);
check('interview Q&A', srcQ.length, genQas.length);
check('reveal blocks', srcReveal.length, genReveals.length);
check('quotes', srcQuote.length, genQuotes.length);
check('h4 headings', srcH4.length, genH4.length);

/* ---- seeds: every playground button must carry its code sample ---- */

console.log('\n=== playground seeds ===');
const srcSeeds = findAll(dom, (n) => isEl(n, 'button') && hasClass(n, 'playbtn')).map(
  (b) => b.attrs['data-q'] ?? '',
);
const genSeeds = genProbs.map((p) => p.seed ?? '');
check('playground seeds', srcSeeds.length, genSeeds.length);
const missingSeeds = srcSeeds.filter((s) => s && !genSeeds.includes(s));
check('seeds preserved verbatim', 0, missingSeeds.length, missingSeeds[0]?.slice(0, 60));

/* ---- metadata parity ---- */

console.log('\n=== metadata parity ===');
let metaMismatch = 0;
for (const article of articles) {
  const gen = chapters.find((c) => c.id === article.attrs.id);
  if (!gen) continue;
  if (gen.priority !== article.attrs['data-p']) metaMismatch++;
  else if (gen.minutes !== Number(article.attrs['data-min'])) metaMismatch++;
  else if (gen.short !== article.attrs['data-short']) metaMismatch++;
}
check('priority/minutes/short mismatches', 0, metaMismatch);

/* ---- searchable text coverage ---- */

console.log('\n=== search index ===');
const noHaystack = chapters.filter((c) => !c.searchText || c.searchText.length < 5);
check('chapters without searchText', 0, noHaystack.length, noHaystack.map((c) => c.id).join(' '));
const noBlocks = chapters.filter((c) => c.blocks.length === 0);
check('chapters without content', 0, noBlocks.length, noBlocks.map((c) => c.id).join(' '));

console.log(
  failures.length ? `\n${failures.length} check(s) failed.` : '\nAll parity checks passed.',
);
process.exit(failures.length ? 1 : 0);