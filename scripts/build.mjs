// Builds whichever site this repo is currently shipping into dist/.
//
//   npm run build                 -> the default site (set below)
//   SITE=iterum npm run build     -> override per build (e.g. a Vercel env var)
//   node scripts/build.mjs iterum -> explicit
//
// Both sites live side by side and neither is modified by the switch:
//   iterum  - the React app in src/, built by Vite from the root index.html
//   dnplay  - a single static page in sites/dnplay/

import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// To switch the live site back to Iterum, change this one word to 'iterum'.
const DEFAULT_SITE = 'dnplay';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = process.argv[2] ?? process.env.SITE ?? DEFAULT_SITE;

function fail(message) {
  console.error(`build: ${message}`);
  process.exit(1);
}

if (site === 'iterum') {
  console.log('build: iterum (React app)');
  const result = spawnSync('npm run build:iterum', { cwd: root, stdio: 'inherit', shell: true });
  process.exit(result.status ?? 1);
}

if (site === 'dnplay') {
  console.log('build: dnplay (static page)');
  const source = join(root, 'sites', 'dnplay');
  if (!existsSync(join(source, 'index.html'))) fail(`missing ${join(source, 'index.html')}`);

  const dist = join(root, 'dist');
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(dist, { recursive: true });
  cpSync(source, dist, { recursive: true });
  console.log(`build: wrote ${dist}`);
  process.exit(0);
}

fail(`unknown site "${site}" (expected "dnplay" or "iterum")`);
