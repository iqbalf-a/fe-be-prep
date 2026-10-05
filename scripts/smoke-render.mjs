/**
 * scripts/smoke-render.mjs
 * ---------------------------------------------------------------------------
 * Runs scripts/smoke-body.mjs, which renders every screen with react-dom/server.
 *
 * Node cannot import .jsx files, so the body is bundled with esbuild (already a
 * Vite dependency) into node_modules/.cache and executed from there. Keeping the
 * bundling here means the body stays plain ESM and readable.
 *
 *   node scripts/smoke-render.mjs
 */

import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const outfile = resolve(projectRoot, 'node_modules/.cache/smoke-body.bundle.mjs');

mkdirSync(dirname(outfile), { recursive: true });

await build({
  entryPoints: [resolve(here, 'smoke-body.mjs')],
  outfile,
  bundle: true,
  platform: 'node',
  format: 'esm',
  jsx: 'automatic',
  logLevel: 'error',
  // React stays external so the bundle uses the installed copy.
  external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'],
});

const result = spawnSync(process.execPath, [outfile], {
  stdio: 'inherit',
  cwd: projectRoot,
});

process.exit(result.status ?? 1);
