import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const requireTemplate = createRequire(new URL('../template/package.json', import.meta.url));

// Records every `openclaw` specifier resolved while importing one module, in a fresh process.
function openclawImports(moduleUrl) {
  const script = `import { registerHooks } from 'node:module';
const seen = [];
registerHooks({ resolve(specifier, context, next) {
  if (/^openclaw(\\/|$)/.test(specifier)) seen.push(specifier);
  return next(specifier, context);
} });
const { default: loaded } = await import(${JSON.stringify(moduleUrl.href)});
console.log(JSON.stringify({ id: loaded.id, seen }));`;
  return JSON.parse(execFileSync(process.execPath, ['--input-type=module', '-e', script], { encoding: 'utf8' }));
}

test('built template passes published defineGatekeeper declaration validation', async () => {
  const { default: entry } = await import('../template/dist/index.js');
  assert.equal(entry.id, 'gkos-gatekeeper-example');
  assert.equal(typeof entry.register, 'function');
});

test('manifest driver is the built driver module and it never loads openclaw', async () => {
  const manifest = JSON.parse(await readFile(new URL('../template/openclaw.plugin.json', import.meta.url), 'utf8'));
  assert.equal(manifest.gkos.gatekeeper.driver, './dist/driver.js');
  const driverUrl = new URL(manifest.gkos.gatekeeper.driver, new URL('../template/', import.meta.url));
  const driver = openclawImports(driverUrl);
  assert.equal(driver.id, manifest.id);
  assert.deepEqual(driver.seen, [], 'the kernel loads the driver directly; it must not import openclaw');
  // Control: the plugin entry does reach openclaw, so an empty driver result is not a broken hook.
  assert.ok(openclawImports(new URL('../template/dist/index.js', import.meta.url)).seen.length > 0);
});

test('template root manifest owns exactly its declared tools and matching plugin id', async () => {
  const manifest = JSON.parse(await readFile(new URL('../template/openclaw.plugin.json', import.meta.url), 'utf8'));
  const { default: entry } = await import('../template/dist/index.js');
  const ts = requireTemplate('typescript');
  const source = ts.createSourceFile('tools.ts',
    await readFile(new URL('../template/src/tools.ts', import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true);
  const declaration = source.statements.flatMap(statement => ts.isVariableStatement(statement)
    ? [...statement.declarationList.declarations] : []).find(node => node.name.getText(source) === 'tools');
  assert.ok(declaration && ts.isArrayLiteralExpression(declaration.initializer), 'tools is a declarative array');
  const names = declaration.initializer.elements.map(element => {
    assert.ok(ts.isObjectLiteralExpression(element));
    const name = element.properties.find(property => ts.isPropertyAssignment(property)
      && property.name.getText(source) === 'name');
    assert.ok(name && ts.isStringLiteral(name.initializer), 'every tool has a literal declared name');
    return name.initializer.text;
  });
  assert.ok(names.length > 0, 'the starter demonstrates a nonempty contract');
  assert.equal(new Set(names).size, names.length, 'definition names are unique');
  assert.equal(new Set(manifest.contracts.tools).size, manifest.contracts.tools.length, 'manifest names are unique');
  assert.deepEqual([...manifest.contracts.tools].sort(), names.sort());
  assert.equal(manifest.id, entry.id);
});
