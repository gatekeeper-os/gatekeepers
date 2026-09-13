import assert from 'node:assert/strict';
import { readFileSync, realpathSync } from 'node:fs';
for (const name of ['gatekeeper-kit', 'shared']) {
  const pkg = `@gatekeeper-os/${name}`;
  const published = `@clawkeepers/${name}`;
  const version = '0.1.0-beta.1';
  const spec = JSON.parse(readFileSync(new URL('../template/package.json', import.meta.url))).dependencies[pkg];
  assert.equal(spec, `npm:${published}@${version}`);
  const entry = realpathSync(new URL(`../template/node_modules/${pkg}/package.json`, import.meta.url));
  const manifest = JSON.parse(readFileSync(entry));
  assert.equal(manifest.name, published);
  assert.equal(manifest.version, version);
  assert.match(entry, /node_modules\/.pnpm\//);
  console.log(`${pkg} -> ${published}@${manifest.version}: registry alias dependency verified`);
}
const lock = readFileSync(new URL('../pnpm-lock.yaml', import.meta.url), 'utf8');
assert.ok(!/^\s+(?:specifier|version): ['"]?(?:link:|workspace:|file:)/m.test(lock), 'Local dependency reference in lockfile');
assert.match(lock, /integrity: sha512-/);
