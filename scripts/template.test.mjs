import assert from 'node:assert/strict';
import { test } from 'node:test';

test('built template passes published defineGatekeeper declaration validation', async () => {
  const { default: entry } = await import('../template/dist/index.js');
  assert.equal(entry.id, 'gatekeeper-example');
  assert.equal(typeof entry.register, 'function');
});
