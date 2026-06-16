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
