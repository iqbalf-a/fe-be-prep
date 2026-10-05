/**
 * lib/source.mjs
 * ---------------------------------------------------------------------------
 * Single entry point for reading the source study guide.
 *
 * Both migrate-html.mjs and verify-parity.mjs must parse byte-identical input,
 * otherwise the parity report is meaningless. All repairs to the source document
 * therefore live here and are applied in exactly one place.
 *
 * The source HTML is machine-generated and contains two markup defects:
 *   1. c102's final <pre> is never closed, swallowing the Playground markup.
 *      The chapter is also missing its closing </div> and </article>, so the
 *      Playground UI would otherwise be parsed as chapter learning content.
 *   2. c5 uses </h2> to close an <h4>, so the heading swallows the rest of the
 *      chapter body until the next real </h4>.
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SOURCE_FILE = join(
  ROOT,
  'Materi_Persiapan_Technical_Test_JavaScript_BSI_Interactive.html',
);
export const SOURCE_NAME = 'Materi_Persiapan_Technical_Test_JavaScript_BSI_Interactive.html';

/**
 * @typedef {{ name: string, apply: (html: string) => string }} Repair
 */

/** @type {Repair[]} */
export const REPAIRS = [
  {
    name: 'close the unterminated <pre>, </div> and </article> at the end of chapter c102',
    apply: (html) =>
      html.replace(
        /(<pre><code>-- transfer dana atomik[\s\S]*?COMMIT;[^\n]*)\n(\s*)<header>/,
        '$1\n</code></pre>\n    </div>\n  </article>\n\n$2<header>',
      ),
  },
  {
    // e.g. <h4>Polis dari interview</h2>  ->  <h4>Polis dari interview</h4>
    name: 'fix heading closed by the wrong level (</h2> closing an <h4>)',
    apply: (html) =>
      html.replace(
        /<h([2-6])>([^<]*)<\/h([2-6])>/g,
        (match, open, inner, close) =>
          open === close ? match : `<h${open}>${inner}</h${open}>`,
      ),
  },
];

/**
 * Reads the source document and applies every repair.
 * @returns {{ html: string, applied: string[] }}
 */
export function loadSource() {
  let html = readFileSync(SOURCE_FILE, 'utf8');
  const applied = [];
  for (const repair of REPAIRS) {
    const next = repair.apply(html);
    if (next !== html) {
      html = next;
      applied.push(repair.name);
    }
  }
  return { html, applied };
}