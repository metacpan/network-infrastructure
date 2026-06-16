import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter } from '../lib/frontmatter.js';

test('parses frontmatter block and returns body', () => {
  const raw = '---\nhome: true\nheroText: MetaCPAN docs\nactionText: Play books\nactionLink: ./playbooks/\n---\n\n# Hello\n\nbody text\n';
  const { data, body } = parseFrontmatter(raw);
  assert.equal(data.home, 'true');
  assert.equal(data.heroText, 'MetaCPAN docs');
  assert.equal(data.actionText, 'Play books');
  assert.equal(data.actionLink, './playbooks/');
  assert.equal(body.trim().startsWith('# Hello'), true);
});

test('returns empty data and full body when no frontmatter', () => {
  const raw = '# Title\n\ntext\n';
  const { data, body } = parseFrontmatter(raw);
  assert.deepEqual(data, {});
  assert.equal(body, raw);
});

test('ignores blank lines inside frontmatter', () => {
  const raw = '---\nhome: true\n\nheroText: X\n---\nbody';
  const { data } = parseFrontmatter(raw);
  assert.equal(data.home, 'true');
  assert.equal(data.heroText, 'X');
});
