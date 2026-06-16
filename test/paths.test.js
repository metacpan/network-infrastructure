import { test } from 'node:test';
import assert from 'node:assert/strict';
import { srcToUrl, srcToOutputPath, withBase } from '../lib/paths.js';

test('srcToUrl maps README and index to directory roots', () => {
  assert.equal(srcToUrl('README.md'), '/');
  assert.equal(srcToUrl('playbooks/README.md'), '/playbooks/');
  assert.equal(srcToUrl('servers/index.md'), '/servers/');
});

test('srcToUrl maps named pages to their own directory url', () => {
  assert.equal(srcToUrl('servers/lvm.md'), '/servers/lvm/');
  assert.equal(srcToUrl('playbooks/site_down.md'), '/playbooks/site_down/');
});

test('srcToOutputPath produces index.html files', () => {
  assert.equal(srcToOutputPath('README.md'), 'index.html');
  assert.equal(srcToOutputPath('playbooks/README.md'), 'playbooks/index.html');
  assert.equal(srcToOutputPath('servers/lvm.md'), 'servers/lvm/index.html');
});

test('withBase joins base prefix without doubling slashes', () => {
  assert.equal(withBase('/playbooks/', ''), '/playbooks/');
  assert.equal(withBase('/playbooks/', '/network-infrastructure/'), '/network-infrastructure/playbooks/');
  assert.equal(withBase('/', '/network-infrastructure/'), '/network-infrastructure/');
});
