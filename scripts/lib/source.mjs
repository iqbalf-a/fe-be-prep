/**
 * lib/source.mjs
 * ---------------------------------------------------------------------------
 * Single entry point for reading the source study guide.
 *
 * Both migrate-html.mjs and verify-parity.mjs must parse byte-identical input,
 * otherwise the parity report is meaningless. All repairs to the source document
 * therefore live here and are applied in exactly one place.
 *
 * The document itself is not committed (it is a large machine-generated export);
 * the generated data files are. Restore SOURCE_NAME next to the repository root
 * to re-run the migration or the parity check.
 *
 * The source HTML is machine-generated and contains two markup defects:
 *   1. c102's final <pre> is never closed, swallowing the Playground markup.
 *      The chapter is also missing its closing </div> and </article>, so the
 *      Playground UI would otherwise be parsed as chapter learning content.
 *   2. c5 uses </h2> to close an <h4>, so the heading swallows the rest of the
 *      chapter body until the next real </h4>.
 */

import { existsSync, readFileSync } from 'node:fs';
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
 *
 * The document is not kept in the repository: the generated data files are the
 * artefact that ships. `loadSource()` therefore returns null when the file is
 * absent, and both migrate-html.mjs and verify-parity.mjs skip with a notice
 * instead of crashing.
 *
 * @returns {{ html: string, applied: string[] } | null}
 */
export function loadSource() {
  if (!existsSync(SOURCE_FILE)) return null;

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

/** One-line notice shared by the two entry points that depend on the document. */
export function sourceMissingNotice(script) {
  return [
    `SKIP  ${script}: ${SOURCE_NAME} is not present in the repository.`,
    '      src/data/javascript.generated.js and src/data/backend-node.generated.js',
    '      are the committed result of that migration, so nothing needs regenerating.',
  ].join('\n');
}