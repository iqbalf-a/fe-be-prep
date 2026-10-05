/**
 * lib/parser.mjs
 * ---------------------------------------------------------------------------
 * Dependency-free, tolerant HTML parser plus DOM helpers.
 *
 * Shared by migrate-html.mjs (generation) and verify-parity.mjs (verification)
 * so both operate on exactly the same parse of the source document.
 */

/* ==========================================================================
   TOLERANT HTML PARSER
   ========================================================================== */

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

const RAW_TEXT_TAGS = new Set(['script', 'style', 'textarea']);

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  nbsp: ' ', mdash: '—', ndash: '–', hellip: '…',
  middot: '·', rarr: '→', larr: '←', uarr: '↑', darr: '↓',
  harr: '↔', times: '×', divide: '÷', bull: '•',
  copy: '©', reg: '®', trade: '™', deg: '°',
  laquo: '«', raquo: '»', ldquo: '“', rdquo: '”',
  lsquo: '‘', rsquo: '’', check: '✓', star: '★',
  arrowup: '↑', arrowdown: '↓', zwnj: '‌', shy: '­',
};

export function decodeEntities(str) {
  return str.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/g, (match, body) => {
    if (body[0] === '#') {
      const code =
        body[1] === 'x' || body[1] === 'X'
          ? Number.parseInt(body.slice(2), 16)
          : Number.parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    const named = NAMED_ENTITIES[body];
    return named === undefined ? match : named;
  });
}

export function escapeText(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const isSpace = (ch) =>
  ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r' || ch === '\f';

/**
 * Reads an open tag starting at `start` (which must point at "<").
 *
 * Attributes are scanned explicitly rather than with one large regex: the source
 * document stores multi-line code samples inside attributes (the playground's
 * data-q="..."), and those values contain both ">" and '"'. A single-regex tag
 * pattern terminates the tag at the first ">" inside the quoted value and then
 * over-consumes across every following element.
 *
 * @returns {{name: string, attrs: object, selfClose: boolean, end: number}|null}
 */
function readOpenTag(html, start) {
  let i = start + 1;
  if (!/[a-zA-Z]/.test(html[i] ?? '')) return null;

  let name = '';
  while (i < html.length && /[\w:-]/.test(html[i])) name += html[i++];
  name = name.toLowerCase();

  const attrs = {};
  let selfClose = false;

  while (i < html.length) {
    while (i < html.length && isSpace(html[i])) i++;
    if (i >= html.length) break;

    if (html[i] === '>') {
      i++;
      break;
    }
    if (html[i] === '/' && html[i + 1] === '>') {
      selfClose = true;
      i += 2;
      break;
    }
    if (html[i] === '/') {
      i++;
      continue;
    }

    let attrName = '';
    while (i < html.length && !isSpace(html[i]) && !'=/>'.includes(html[i])) {
      attrName += html[i++];
    }
    if (!attrName) {
      i++;
      continue;
    }

    let cursor = i;
    while (cursor < html.length && isSpace(html[cursor])) cursor++;
    if (html[cursor] !== '=') {
      attrs[attrName.toLowerCase()] = '';
      continue;
    }

    cursor++;
    while (cursor < html.length && isSpace(html[cursor])) cursor++;

    let value = '';
    const quote = html[cursor];
    if (quote === '"' || quote === "'") {
      cursor++;
      const end = html.indexOf(quote, cursor);
      if (end === -1) {
        value = html.slice(cursor);
        cursor = html.length;
      } else {
        value = html.slice(cursor, end);
        cursor = end + 1;
      }
    } else {
      while (
        cursor < html.length &&
        !isSpace(html[cursor]) &&
        html[cursor] !== '>'
      ) {
        value += html[cursor++];
      }
    }

    attrs[attrName.toLowerCase()] = decodeEntities(value);
    i = cursor;
  }

  return { name, attrs, selfClose, end: i };
}

/** Builds a lightweight DOM: { tag, attrs, children } | { text } */
export function parseHtml(html) {
  const root = { tag: '#root', attrs: {}, children: [] };
  const stack = [root];
  const lower = html.toLowerCase();

  let i = 0;
  let textStart = 0;

  const appendText = (raw) => {
    if (!raw) return;
    const value = decodeEntities(raw);
    const parent = stack[stack.length - 1];
    const last = parent.children[parent.children.length - 1];
    if (last && last.text !== undefined) last.text += value;
    else parent.children.push({ text: value });
  };

  while (i < html.length) {
    if (html[i] !== '<') {
      i++;
      continue;
    }

    appendText(html.slice(textStart, i));

    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i);
      i = end === -1 ? html.length : end + 3;
      textStart = i;
      continue;
    }
    if (html.startsWith('<!', i) || html.startsWith('<?', i)) {
      const end = html.indexOf('>', i);
      i = end === -1 ? html.length : end + 1;
      textStart = i;
      continue;
    }

    if (html[i + 1] === '/') {
      const end = html.indexOf('>', i);
      const rawName = html.slice(i + 2, end === -1 ? html.length : end).trim();
      const tag = rawName.toLowerCase().split(/\s/)[0];
      const index = stack.findLastIndex((node) => node.tag === tag);
      // Ignore stray closing tags instead of unwinding the whole tree.
      if (index > 0) stack.length = index;
      i = end === -1 ? html.length : end + 1;
      textStart = i;
      continue;
    }

    const open = readOpenTag(html, i);
    if (!open) {
      i++;
      continue;
    }

    const node = { tag: open.name, attrs: open.attrs, children: [] };
    stack[stack.length - 1].children.push(node);

    i = open.end;
    textStart = i;

    if (VOID_TAGS.has(open.name) || open.selfClose) continue;

    if (RAW_TEXT_TAGS.has(open.name)) {
      const end = lower.indexOf(`</${open.name}`, i);
      const stop = end === -1 ? html.length : end;
      node.children.push({ text: decodeEntities(html.slice(i, stop)) });
      const close = html.indexOf('>', stop);
      i = close === -1 ? html.length : close + 1;
      textStart = i;
      continue;
    }

    stack.push(node);
  }

  appendText(html.slice(textStart));
  return root;
}

/* ==========================================================================
   DOM HELPERS
   ========================================================================== */

export const isText = (node) => node.text !== undefined;
export const isEl = (node, tag) =>
  !isText(node) && (tag === undefined || node.tag === tag);

export function classList(node) {
  return (node.attrs?.class ?? '').split(/\s+/).filter(Boolean);
}

export function hasClass(node, name) {
  return classList(node).includes(name);
}

export function findAll(node, predicate, out = []) {
  for (const child of node.children ?? []) {
    if (predicate(child)) out.push(child);
    findAll(child, predicate, out);
  }
  return out;
}

export function findFirst(node, predicate) {
  for (const child of node.children ?? []) {
    if (predicate(child)) return child;
    const found = findFirst(child, predicate);
    if (found) return found;
  }
  return null;
}

export function textOf(node) {
  if (isText(node)) return node.text;
  if (node.tag === 'br') return '\n';
  return (node.children ?? []).map(textOf).join('');
}

/** Collapses authored whitespace but keeps code-sample line breaks intact. */
export function normalizeText(value) {
  return value
    .replace(/\u00a0/g, ' ') // non-breaking space from the source document
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
}

export function textBlock(node) {
  return normalizeText(textOf(node));
}

/**
 * Serializes inline content into a small, safe HTML subset:
 * <code> <strong> <b> <em> <br> plus escaped text.
 * Anything else is reduced to its text so no unknown markup survives.
 */
const INLINE_ALLOW = new Set(['code', 'strong', 'b', 'em', 'br', 'span', 'i']);

export function inlineHtml(node) {
  if (isText(node)) return escapeText(node.text);
  if (node.tag === 'br') return '<br>';
  if (!INLINE_ALLOW.has(node.tag)) {
    return (node.children ?? []).map(inlineHtml).join('');
  }

  const tag = { i: 'em', span: 'code' }[node.tag] ?? node.tag;
  const inner = (node.children ?? []).map(inlineHtml).join('');
  return `<${tag}>${inner}</${tag}>`;
}