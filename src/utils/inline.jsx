/**
 * utils/inline.js
 * ---------------------------------------------------------------------------
 * Renders the small, safe HTML subset used by the study content
 * (<code> <strong> <b> <em> <br> plus escaped text) into React elements.
 *
 * Why not dangerouslySetInnerHTML:
 *   - The source document is untrusted input that gets converted to data; keeping
 *     a strict allowlist means a stray tag can never become live markup.
 *   - Search highlighting needs to wrap matches in <mark>. Doing that on real text
 *     nodes is far safer than the alternative the source document used, which
 *     rewrote the DOM in place with TreeWalker + Range-free node replacement.
 */

/** Tags the content layer is allowed to produce, mapped to their React element. */
const ALLOWED = {
  code: 'code',
  strong: 'strong',
  b: 'strong',
  em: 'em',
  br: 'br',
};

const TOKEN =
  /&lt;|&gt;|&quot;|&#39;|&nbsp;|&mdash;|&ndash;|&hellip;|&middot;|&rarr;|&larr;|&times;|&#x?[0-9a-fA-F]+;|<\/?([a-zA-Z][a-zA-Z0-9]*)>|[^<]+/gi;

const ENTITIES = {
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  mdash: '—',
  ndash: '–',
  hellip: '…',
  middot: '·',
  rarr: '→',
  larr: '←',
  times: '×',
};

function decode(text) {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-z]+);/gi, (match, body) => {
    if (body[0] === '#') {
      const code =
        body[1] === 'x' || body[1] === 'X'
          ? Number.parseInt(body.slice(2), 16)
          : Number.parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    const named = ENTITIES[body.toLowerCase()];
    return named === undefined ? match : named;
  });
}

/**
 * Splits a line into alternating text / tag segments.
 * Unknown tags are dropped but their children are kept.
 */
function parseInline(html) {
  const nodes = [];
  const stack = [{ children: nodes }];
  let key = 0;

  TOKEN.lastIndex = 0;
  let match;
  while ((match = TOKEN.exec(html)) !== null) {
    const [raw, tagName] = match;
    const closing = raw.startsWith('</');
    const lowered = (tagName ?? '').toLowerCase();

    if (!tagName) {
      const text = decode(raw);
      stack[stack.length - 1].children.push(text);
      continue;
    }

    if (!ALLOWED[lowered]) continue; // ignore unknown tag, keep its children

    if (closing) {
      // Close the nearest matching open element; unbalanced tags are ignored.
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].type === lowered) {
          const node = stack[i];
          stack.length = i;
          stack[stack.length - 1].children.push({
            type: lowered,
            key: `n${key++}`,
            children: node.children,
          });
          break;
        }
      }
      continue;
    }

    if (lowered === 'br') {
      stack[stack.length - 1].children.push({ type: 'br', key: `n${key++}`, children: [] });
      continue;
    }

    stack.push({ type: lowered, children: [] });
  }

  // Unterminated inline tags still contribute their content.
  for (let i = stack.length - 1; i > 0; i--) {
    const node = stack[i];
    stack.length = i;
    stack[stack.length - 1].children.push({
      type: node.type,
      key: `n${key++}`,
      children: node.children,
    });
  }

  return nodes;
}

function toElements(nodes) {
  return nodes.map((node, index) => {
    if (typeof node === 'string') return <span key={index}>{node}</span>;
    const Tag = ALLOWED[node.type];
    return (
      <Tag key={node.key ?? index}>
        {toElements(node.children)}
      </Tag>
    );
  });
}

/**
 * Splits text on a search term and wraps the matches in <mark>.
 * @param {string} text
 * @param {string} query
 */
export function highlightText(text, query) {
  if (!query || query.length < 2) return text;
  const needle = query.toLowerCase();
  const haystack = text.toLowerCase();
  const parts = [];
  let from = 0;

  for (;;) {
    const at = haystack.indexOf(needle, from);
    if (at === -1) break;
    if (at > from) parts.push(text.slice(from, at));
    parts.push(
      <mark
        key={parts.length}
        className="mark rounded-[3px] bg-star/40 px-0.5 text-inherit"
      >
        {text.slice(at, at + needle.length)}
      </mark>,
    );
    from = at + needle.length;
  }

  if (!parts.length) return text;
  if (from < text.length) parts.push(text.slice(from));
  return parts;
}

/**
 * Applies search highlighting to every text node inside parsed inline content.
 */
function highlightNodes(nodes, query) {
  return nodes.map((node, index) => {
    if (typeof node === 'string') return highlightText(node, query);
    const Tag = ALLOWED[node.type];
    return <Tag key={node.key ?? index}>{highlightNodes(node.children, query)}</Tag>;
  });
}

/**
 * @param {string} html  safe inline subset produced by the migration
 * @param {string} [query] case-insensitive search term to highlight
 */
export default function Inline({ html, query }) {
  if (!html) return null;
  const nodes = parseInline(html);
  if (!query) return toElements(nodes);
  return highlightNodes(nodes, query);
}