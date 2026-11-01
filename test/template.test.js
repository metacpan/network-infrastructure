import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderPage } from '../lib/template.js';

const navItems = [
  { text: 'Playbooks', url: '/playbooks/' },
  { text: 'Servers', url: '/servers/' },
];

test('fills content, title, base-prefixed nav and assets', () => {
  const html = renderPage({
    title: 'MetaCPAN infra',
    base: '/network-infrastructure/',
    navItems,
    toc: [{ level: 2, text: 'Alpha', slug: 'alpha' }],
    content: '<p>hi</p>',
    meta: 'Last updated: 2026-06-16',
    home: false,
  });
  assert.match(html, /<title>MetaCPAN infra<\/title>/);
  assert.match(html, /href="\/network-infrastructure\/assets\/pico\.min\.css"/);
  assert.match(html, /href="\/network-infrastructure\/playbooks\/"/);
  assert.match(html, /<a href="#alpha">Alpha<\/a>/);
  assert.match(html, /<p>hi<\/p>/);
  assert.match(html, /Last updated: 2026-06-16/);
});

test('home page renders no toc sidebar', () => {
  const html = renderPage({
    title: 'X', base: '', navItems, toc: [], content: '<p>home</p>', meta: '', home: true,
  });
  assert.doesNotMatch(html, /<a href="#/);
});

const page = (overrides) => renderPage({
  title: 'X', base: '', navItems, toc: [], content: '<h1>Title</h1><p>body</p>', meta: '', home: false, ...overrides,
});

test('last-updated date sits directly under the page title', () => {
  const html = page({ updated: '2026-06-16' });
  assert.match(html, /<\/h1><p class="page-updated">Last updated: 2026-06-16<\/p><p>body<\/p>/);
});

test('last-updated date leads the article when a page has no title', () => {
  const html = page({ updated: '2026-06-16', content: '<p>body</p>' });
  assert.match(html, /<p class="page-updated">Last updated: 2026-06-16<\/p><p>body<\/p>/);
});

test('no last-updated line without a date', () => {
  assert.doesNotMatch(page({ updated: '' }), /page-updated/);
});

test('contents list is a closed native disclosure', () => {
  const html = page({ toc: [{ level: 2, text: 'Alpha', slug: 'alpha' }] });
  assert.match(html, /<details class="toc"><summary>On this page<\/summary><ul>.*Alpha.*<\/ul><\/details>/);
});
