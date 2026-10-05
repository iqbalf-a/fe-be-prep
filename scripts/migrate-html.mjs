/**
 * migrate-html.mjs
 * ---------------------------------------------------------------------------
 * One-off content migration tool.
 *
 * Reads the original standalone study guide
 *   Materi_Persiapan_Technical_Test_JavaScript_BSI_Interactive.html
 * and converts every module/chapter into plain, structured JavaScript data
 * under src/data/.
 *
 * The source HTML is the source of truth for all learning content. Rather than
 * hand-retyping 100+ chapters (and risking silent loss), this script parses the
 * document and emits React-friendly data files.
 *
 * No dependencies on purpose: this must be runnable on a bare Node install.
 *
 *   node scripts/migrate-html.mjs
 *
 * Re-running it is safe - it overwrites the generated data files. After
 * re-running, always run scripts/verify-parity.mjs to confirm nothing was lost.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

import {
  parseHtml,
  isText,
  isEl,
  hasClass,
  classList,
  findAll,
  findFirst,
  textOf,
  textBlock,
  normalizeText,
  inlineHtml,
} from './lib/parser.mjs';
import { ROOT, SOURCE_NAME, loadSource } from './lib/source.mjs';

/* ==========================================================================
   CODE BLOCK LANGUAGE DETECTION
   ========================================================================== */

function detectLanguage(code) {
  const text = code.trim();
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE TABLE|ALTER TABLE|BEGIN;|COMMIT;|--)/i.test(text)) {
    return 'sql';
  }
  if (/^(npm|npx|git|node|yarn|docker|curl|cd|mkdir|echo|cat|ls|pwd)\s/m.test(text)) {
    return 'bash';
  }
  if (/^\s*(public\s+class|package\s+[\w.]+;|import\s+(org|java|com)\.[\w.]+;)/m.test(text)) {
    return 'java';
  }
  if (/@(RestController|Service|Transactional|Autowired|Bean|GetMapping|Valid)\b/.test(text)) {
    return 'java';
  }
  if (/^(interface|type)\s+\w+/m.test(text)) return 'ts';
  return 'js';
}

/* ==========================================================================
   BLOCK CONVERSION
   ========================================================================== */

const stats = { blocks: {}, unknownTags: new Map() };

function countBlock(type) {
  stats.blocks[type] = (stats.blocks[type] ?? 0) + 1;
}

function noteUnknownTag(tag) {
  stats.unknownTags.set(tag, (stats.unknownTags.get(tag) ?? 0) + 1);
}

/** Converts a list of sibling nodes into block objects. */
function toBlocks(nodes) {
  const blocks = [];
  for (const node of nodes) {
    if (isText(node)) {
      if (normalizeText(node.text)) noteUnknownTag('#stray-text');
      continue;
    }
    const block = toBlock(node);
    if (Array.isArray(block)) blocks.push(...block);
    else if (block) blocks.push(block);
  }
  return blocks;
}

function toBlock(node) {
  const tag = node.tag;

  if (tag === 'p') {
    const html = (node.children ?? []).map(inlineHtml).join('').trim();
    if (!html) return null;
    countBlock('p');
    return { type: 'p', html };
  }

  if (tag === 'h4' || tag === 'h3' || tag === 'h5') {
    countBlock('h4');
    return { type: 'h4', html: (node.children ?? []).map(inlineHtml).join('') };
  }

  if (tag === 'pre') {
    const codeNode = findFirst(node, (n) => isEl(n, 'code'));
    const code = textOf(codeNode ?? node).replace(/\n+$/, '');
    if (!code.trim()) return null;
    countBlock('code');
    return { type: 'code', code, lang: detectLanguage(code) };
  }

  if (tag === 'blockquote') {
    const variant =
      classList(node).find((c) => c === 'tip' || c === 'warn') ?? 'tip';
    const inner = (node.children ?? []).map(toBlock).filter(Boolean);
    // The first paragraph acts as the quote's headline.
    const heading = inner.find((b) => b.type === 'p');
    const rest = inner.filter((b) => b !== heading);
    countBlock('quote');
    return {
      type: 'quote',
      variant,
      title: heading ? heading.html.replace(/<[^>]+>/g, '') : '',
      body: rest,
    };
  }

  if (tag === 'ul' || tag === 'ol') {
    if (hasClass(node, 'checklist')) return toChecklist(node);
    const ordered = tag === 'ol';
    const items = (node.children ?? [])
      .filter((n) => isEl(n, 'li'))
      .map((li) =>
        (li.children ?? [])
          .filter((n) => isText(n) || !['ul', 'ol'].includes(n.tag))
          .map(inlineHtml)
          .join('')
          .trim(),
      )
      .filter(Boolean);
    if (!items.length) return null;
    countBlock(ordered ? 'ol' : 'ul');
    return { type: ordered ? 'ol' : 'ul', items };
  }

  if (tag === 'details') {
    const classes = classList(node);
    // "Catatan saya" is rendered by the Chapter component, not as content.
    if (classes.includes('note')) return null;

    const summaryNode = findFirst(node, (n) => isEl(n, 'summary'));
    const summary = summaryNode ? textBlock(summaryNode) : 'Lihat detail';

    const ansNode = findFirst(node, (n) => isEl(n, 'div') && hasClass(n, 'ans'));
    const bodySource = ansNode ?? node;
    const body = toBlocks(
      (bodySource.children ?? []).filter((n) => !isEl(n, 'summary')),
    );
    if (!body.length) return null;

    if (classes.includes('q')) {
      countBlock('qa');
      return { type: 'qa', question: summary, answer: body };
    }
    countBlock('reveal');
    return { type: 'reveal', summary, body };
  }

  if (tag === 'table') return toTable(node);

  if (tag === 'div') {
    const classes = classList(node);
    if (classes.includes('tbl')) return toTable(node);
    if (classes.includes('prob')) return toProblem(node);
    if (classes.includes('ans') || classes.includes('ch-body')) {
      return toBlocks(node.children ?? []);
    }

    const inner = toBlocks(node.children ?? []);
    if (!inner.length) return null;
    countBlock('group');
    return { type: 'group', body: inner };
  }

  if (['span', 'strong', 'em', 'code', 'b'].includes(tag)) {
    const html = inlineHtml(node);
    if (!html) return null;
    countBlock('p');
    return { type: 'p', html };
  }

  if (['label', 'input', 'button'].includes(tag)) {
    noteUnknownTag(tag);
    return null;
  }

  if (['article', 'header', 'section', 'textarea'].includes(tag)) return null;

  noteUnknownTag(tag);
  return null;
}

function cellHtml(cell) {
  return (cell.children ?? []).map(inlineHtml).join('').trim();
}

function toTable(node) {
  const table = node.tag === 'table' ? node : findFirst(node, (n) => isEl(n, 'table'));
  if (!table) return null;

  const headRow = findFirst(
    table,
    (n) => isEl(n, 'tr') && !!findFirst(n, (c) => isEl(c, 'th')),
  );
  const head = headRow
    ? headRow.children.filter((c) => isEl(c, 'th')).map(cellHtml)
    : [];

  const rows = [];
  for (const tbody of findAll(table, (n) => isEl(n, 'tbody'))) {
    for (const tr of (tbody.children ?? []).filter((c) => isEl(c, 'tr'))) {
      rows.push((tr.children ?? []).filter((c) => isEl(c, 'td')).map(cellHtml));
    }
  }
  if (!rows.length) {
    for (const tr of findAll(table, (n) => isEl(n, 'tr'))) {
      const cells = (tr.children ?? []).filter((c) => isEl(c, 'td'));
      if (cells.length) rows.push(cells.map(cellHtml));
    }
  }
  if (!head.length && !rows.length) return null;

  countBlock('table');
  return { type: 'table', head, rows };
}

function toProblem(node) {
  const paragraphs = (node.children ?? []).filter((c) => isEl(c, 'p'));
  const ioNode = paragraphs.find((p) => hasClass(p, 'io'));
  const taskNode = paragraphs.find((p) => !hasClass(p, 'io'));
  const button = findFirst(node, (n) => isEl(n, 'button') && hasClass(n, 'playbtn'));

  countBlock('problem');
  return {
    type: 'problem',
    task: taskNode ? (taskNode.children ?? []).map(inlineHtml).join('').trim() : '',
    io: ioNode ? (ioNode.children ?? []).map(inlineHtml).join('').trim() : '',
    seed: button?.attrs?.['data-q'] ?? '',
  };
}

function toChecklist(node) {
  const items = [];
  (node.children ?? [])
    .filter((c) => isEl(c, 'li'))
    .forEach((li, index) => {
      const input = findFirst(li, (n) => isEl(n, 'input'));
      const label = findFirst(li, (n) => isEl(n, 'span')) ?? li;
      const text = textBlock(label);
      if (!text) return;
      items.push({
        id: input?.attrs?.['data-id'] ?? `check-${index}`,
        label: (label.children ?? []).map(inlineHtml).join('').trim(),
        text,
      });
    });
  if (!items.length) return null;
  countBlock('checklist');
  return { type: 'checklist', items };
}

/* ==========================================================================
   MODULE / CHAPTER EXTRACTION
   ========================================================================== */

export function stripTags(html) {
  return normalizeText(String(html ?? '').replace(/<[^>]*>/g, ' '))
    .replace(/\s+([,;:.!?%)\]}])/g, '$1')
    .replace(/([([{])\s+/g, '$1');
}

function flattenBlockText(block) {
  switch (block.type) {
    case 'code':
      return block.code;
    case 'table':
      return [block.head.join(' '), ...block.rows.map((r) => r.join(' '))].join(' ');
    case 'ul':
    case 'ol':
      return block.items.map(stripTags).join(' ');
    case 'quote':
      return [block.title, ...block.body.map((b) => b.html ?? stripTags(b.code ?? ''))].join(' ');
    case 'qa':
      return [stripTags(block.question), ...block.answer.map(flattenBlockText)].join(' ');
    case 'reveal':
      return [stripTags(block.summary), ...block.body.map(flattenBlockText)].join(' ');
    case 'problem':
      return [stripTags(block.task), stripTags(block.io), block.seed].join(' ');
    case 'checklist':
      return block.items.map((i) => i.text).join(' ');
    case 'group':
      return block.body.map(flattenBlockText).join(' ');
    default:
      return stripTags(block.html ?? '');
  }
}

function toChapter(article, index) {
  const body = findFirst(article, (n) => isEl(n, 'div') && hasClass(n, 'ch-body'));
  const h3 = findFirst(article, (n) => isEl(n, 'h3'));
  const noteNode = findFirst(article, (n) => isEl(n, 'textarea') && hasClass(n, 'note-ta'));

  const chapter = {
    id: article.attrs.id,
    no: index + 1,
    title: (h3?.children ?? []).map(inlineHtml).join('').trim(),
    plainTitle: h3 ? textBlock(h3) : article.attrs.id,
    priority: article.attrs['data-p'] ?? 'P3',
    minutes: Number(article.attrs['data-min'] ?? 8),
    short: article.attrs['data-short'] ?? '',
    tags: (article.attrs['data-tags'] ?? '').split(/\s+/).filter(Boolean),
    notePlaceholder: noteNode?.attrs?.placeholder ?? '',
    blocks: toBlocks(body?.children ?? []),
  };

  if (!chapter.short) chapter.short = chapter.plainTitle;

  // Pre-computed haystack so search can match collapsed chapter bodies.
  chapter.searchText = [chapter.plainTitle, chapter.short, chapter.tags.join(' ')]
    .concat(chapter.blocks.map(flattenBlockText))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return chapter;
}

function toModule(section) {
  const h2 = findFirst(section, (n) => isEl(n, 'h2'));
  const badge = findFirst(h2 ?? { children: [] }, (n) => isEl(n, 'em'));
  const descNode = findFirst(section, (n) => isEl(n, 'p') && hasClass(n, 'mod-desc'));
  const toolsNode = findFirst(section, (n) => isEl(n, 'div') && hasClass(n, 'mod-tools'));

  const priorityBadge = toolsNode
    ? findFirst(
        toolsNode,
        (n) => isEl(n, 'span') && classList(n).some((c) => /^P[123]$/.test(c)),
      )
    : null;
  // Strip the pieces the UI renders separately: the priority badge, the minutes
  // span (empty in the source, filled in at runtime) and the two buttons.
  const priorityNote = priorityBadge
    ? normalizeText(
        textBlock(toolsNode)
          .replace(textBlock(priorityBadge), '')
          .replace(/\d*\s*menit/g, '')
          .replace(/Buka semua|Tutup semua/g, ''),
      ).replace(/[·,]+/g, ' ').replace(/\s+/g, ' ').trim()
    : '';

  const chapters = (section.children ?? [])
    .filter((n) => isEl(n, 'article') && hasClass(n, 'ch'))
    .map(toChapter);

  return {
    id: section.attrs.id,
    track: section.attrs['data-cat'] ?? 'js',
    no: badge ? textBlock(badge) : '',
    title: (h2?.children ?? []).filter((n) => !isEl(n, 'em')).map(inlineHtml).join('').trim(),
    plainTitle: h2 ? textBlock(h2) : section.attrs.id,
    desc: descNode ? (descNode.children ?? []).map(inlineHtml).join('').trim() : '',
    priorityNote,
    minutes: chapters.reduce((sum, c) => sum + c.minutes, 0),
    chapters,
  };
}

/* ==========================================================================
   SOURCE
   ========================================================================== */

/* ==========================================================================
   EMIT
   ========================================================================== */

function writeDataFile(name, exportName, payload, header) {
  const file = join(ROOT, 'src', 'data', name);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(
    file,
    `${header}\n\nexport const ${exportName} = ${JSON.stringify(payload, null, 2)};\n`,
    'utf8',
  );
  return file;
}

function header(source) {
  return [
    '/**',
    ' * AUTO-GENERATED from the source study guide - do not edit by hand.',
    ' *',
    ` * ${source}`,
    ' *',
    ' * Regenerate with: npm run migrate',
    ' * Any deliberate change should be applied in scripts/migrate-html.mjs or',
    ' * made in the hand-written companion data files instead.',
    ' */',
  ].join('\n');
}

export function migrate() {
  console.log('Reading source document...');
  const { html, applied } = loadSource();
  for (const note of applied) console.log(`  repaired: ${note}`);

  const dom = parseHtml(html);
  const sections = findAll(dom, (n) => isEl(n, 'section') && hasClass(n, 'mod'));
  console.log(`Parsed ${sections.length} modules.`);

  const modules = sections.map(toModule);
  const chapters = modules.flatMap((m) => m.chapters);
  console.log(`Parsed ${chapters.length} chapters.`);

  const pick = (track) => modules.filter((m) => m.track === track);
  const js = pick('js');
  const node = pick('backend');
  const unknownTrack = modules
    .filter((m) => !['js', 'backend', 'frontend'].includes(m.track))
    .map((m) => `${m.id}:${m.track}`);
  if (unknownTrack.length) console.log(`  ! unrecognised track: ${unknownTrack.join(', ')}`);

  const count = (list) =>
    `${list.length} modules, ${list.reduce((n, m) => n + m.chapters.length, 0)} chapters`;

  const jsFile = writeDataFile(
    'javascript.generated.js',
    'javascriptModules',
    js,
    header(`Source: ${SOURCE_NAME} - ${count(js)}.`),
  );
  console.log(`Wrote ${jsFile}`);

  const nodeFile = writeDataFile(
    'backend-node.generated.js',
    'backendNodeModules',
    node,
    header(`Source: ${SOURCE_NAME} - ${count(node)}.`),
  );
  console.log(`Wrote ${nodeFile}`);

  const inventory = {
    generatedAt: new Date().toISOString(),
    source: SOURCE_NAME,
    repairs: applied,
    modules: modules.map((m) => ({
      id: m.id,
      track: m.track,
      title: m.plainTitle,
      chapters: m.chapters.map((c) => ({
        id: c.id,
        no: c.no,
        title: c.plainTitle,
        priority: c.priority,
        minutes: c.minutes,
        blockCount: c.blocks.length,
      })),
    })),
    totals: {
      modules: modules.length,
      chapters: chapters.length,
      blocks: Object.values(stats.blocks).reduce((a, b) => a + b, 0),
    },
    blockTypes: Object.fromEntries(
      Object.entries(stats.blocks).sort(([a], [b]) => a.localeCompare(b)),
    ),
    unknownTags: Object.fromEntries(stats.unknownTags),
  };

  const invFile = join(ROOT, 'scripts', 'source-inventory.json');
  writeFileSync(invFile, `${JSON.stringify(inventory, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${invFile}`);

  console.log('\n--- summary ---');
  console.log(`modules: ${inventory.totals.modules}`);
  console.log(`chapters: ${inventory.totals.chapters}`);
  console.log(`blocks: ${inventory.totals.blocks}`);
  console.log('block types:', inventory.blockTypes);
  if (stats.unknownTags.size) {
    console.log('\nSkipped nodes (review these):', inventory.unknownTags);
  }
  const empty = chapters.filter((c) => c.blocks.length === 0);
  if (empty.length) console.log('\nChapters with NO blocks:', empty.map((c) => c.id));
}

migrate();