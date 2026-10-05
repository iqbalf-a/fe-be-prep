/**
 * utils/highlight.js
 * ---------------------------------------------------------------------------
 * Zero-dependency syntax highlighter, ported from the offline tokenizer used by
 * the source study guide. Emits React elements rather than HTML strings.
 *
 * The tokenizer is deliberately simple and best-effort: it recognises comments,
 * strings, template literals, numbers, keywords and built-ins. It never throws
 * on malformed input, which matters because code samples are study material, not
 * guaranteed-valid source.
 */

const KEYWORDS = new Set(
  `break case catch class const continue debugger default delete do else enum export
   extends finally for function if implements import in instanceof interface let new
   package private protected public return static super switch this throw try typeof
   var void volatile while with yield async await of as from true false`
    .split(/\s+/)
    .filter(Boolean),
);

const BUILTINS = new Set(
  `console document window process require module exports __dirname __filename JSON
   Math Date Promise Array Object String Number Boolean Error undefined null Symbol
   BigInt Map Set WeakMap WeakSet Reflect Intl fetch setTimeout setInterval
   clearTimeout clearInterval Buffer global globalThis this`
    .split(/\s+/)
    .filter(Boolean),
);

const SPAN = { kw: 'tok-kw', fn: 'tok-func', str: 'tok-str', com: 'tok-com', num: 'tok-num', bn: 'tok-bn', op: 'tok-op' };

/** Returns [{ cls, text }] tokens for one code sample. */
function tokenize(text) {
  const out = [];
  const push = (cls, value) => {
    if (!value) return;
    const last = out[out.length - 1];
    if (last && last.cls === cls) last.text += value;
    else out.push({ cls, text: value });
  };

  let i = 0;
  let lastKind = 'start';
  const n = text.length;

  while (i < n) {
    const rest = text.slice(i);

    let m = rest.match(/^\s+/);
    if (m) {
      push(null, m[0]);
      i += m[0].length;
      if (m[0].includes('\n')) lastKind = 'op';
      continue;
    }

    m = rest.match(/^\/\/[^\n]*/);
    if (m) {
      push(SPAN.com, m[0]);
      i += m[0].length;
      lastKind = 'op';
      continue;
    }

    m = rest.match(/^\/\*[\s\S]*?\*\//);
    if (m) {
      push(SPAN.com, m[0]);
      i += m[0].length;
      lastKind = 'op';
      continue;
    }

    // Regex literal: only valid where an operand is not expected.
    if (rest[0] === '/' && rest[1] !== '/' && rest[1] !== '*' && lastKind !== 'operand') {
      m = rest.match(/^\/(?:[^/\\\n[]|\\.|\[(?:[^\]\\\n]|\\.)*\])+\/[dgimsuvy]*/);
      if (m) {
        push('tok-regex', m[0]);
        i += m[0].length;
        lastKind = 'operand';
        continue;
      }
    }

    if (rest[0] === '"' || rest[0] === "'") {
      m = rest.match(/^(['"])(?:\\.|(?!\1)[^\\])*\1/);
      if (m) {
        push(SPAN.str, m[0]);
        i += m[0].length;
        lastKind = 'operand';
        continue;
      }
    }

    if (rest[0] === '`') {
      const template = readTemplate(rest);
      push(SPAN.str, template);
      i += template.length;
      lastKind = 'operand';
      continue;
    }

    m = rest.match(/^0[xX][0-9a-fA-F]+n?/) || rest.match(/^0[bBoO][0-1a-fA-F]+n?/) || rest.match(/^\d[\d_]*\.?\d*(?:[eE][+-]?\d+)?n?/);
    if (m) {
      push(SPAN.num, m[0]);
      i += m[0].length;
      lastKind = 'operand';
      continue;
    }

    m = rest.match(/^[A-Za-z_$][\w$]*/);
    if (m) {
      const word = m[0];
      let after = i + word.length;
      while (after < n && /\s/.test(text[after])) after++;
      const callNext = text[after] === '(' || text[after] === '!';

      if (KEYWORDS.has(word)) push(SPAN.kw, word);
      else if (BUILTINS.has(word)) push(SPAN.bn, word);
      else if (lastKind === 'prop' || callNext) push(SPAN.fn, word);
      else push(null, word);

      i += word.length;
      lastKind = 'operand';
      continue;
    }

    m = rest.match(/^(=>|===|!==|\*\*=|&&|\|\||[+\-*/%=&|^<>!~?:.,;{}()[\]@#]+)/);
    if (m) {
      push(SPAN.op, m[0]);
      if (m[0].includes('.')) lastKind = 'prop';
      else if (/[)\]}]/.test(m[0])) lastKind = 'operand';
      else lastKind = 'op';
      i += m[0].length;
      continue;
    }

    push(null, rest[0]);
    i++;
    lastKind = 'op';
  }

  return out;
}

/** Reads a template literal, highlighting ${...} interpolations as code. */
function readTemplate(text) {
  let out = '`';
  let i = 1;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '\\') {
      out += text.slice(i, i + 2);
      i += 2;
      continue;
    }
    if (ch === '$' && text[i + 1] === '{') {
      let depth = 1;
      let j = i + 2;
      let inner = '';
      while (j < text.length && depth > 0) {
        if (text[j] === '{') depth++;
        else if (text[j] === '}') {
          depth--;
          if (depth === 0) break;
        }
        inner += text[j];
        j++;
      }
      out += `\u0000${inner}\u0000`;
      i = j + 1;
      continue;
    }
    if (ch === '`') return `${out}\``;
    out += ch;
    i++;
  }
  return out;
}

/**
 * @param {string} code
 * @returns {Array<{cls: string|null, text: string}>}
 */
export function highlightTokens(code) {
  return tokenize(code);
}

export default highlightTokens;