import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown } from '../lib/markdown.js';

test('renders headings with id slugs', () => {
  const { html } = renderMarkdown('## Site down\n\ntext\n', { srcPath: 'playbooks/README.md', base: '' });
  assert.match(html, /<h2 id="site-down">Site down<\/h2>/);
});

test('builds a toc of h2, h3 and h4 headings (excludes h1 and h5)', () => {
  const md = '# H1 ignored\n\n## Alpha\n\n### Beta\n\n#### Gamma\n\n##### H5 ignored\n';
  const { toc } = renderMarkdown(md, { srcPath: 'x.md', base: '' });
  assert.deepEqual(toc, [
    { level: 2, text: 'Alpha', slug: 'alpha' },
    { level: 3, text: 'Beta', slug: 'beta' },
    { level: 4, text: 'Gamma', slug: 'gamma' },
  ]);
});

test('slugs are unique when headings repeat', () => {
  const { toc } = renderMarkdown('## Dup\n\n## Dup\n', { srcPath: 'x.md', base: '' });
  assert.deepEqual(toc.map((t) => t.slug), ['dup', 'dup-1']);
});

test('toc text strips inline markdown markup', () => {
  const { toc } = renderMarkdown('## Use `vgdisplay` to inspect\n', { srcPath: 'x.md', base: '' });
  assert.equal(toc[0].text, 'Use vgdisplay to inspect');
  assert.equal(toc[0].slug, 'use-vgdisplay-to-inspect');
});

test('rewrites relative .md links to clean base-prefixed urls', () => {
  const { html } = renderMarkdown('[x](./site_down.md)', {
    srcPath: 'playbooks/README.md',
    base: '/network-infrastructure/',
  });
  assert.match(html, /href="\/network-infrastructure\/playbooks\/site_down\/"/);
});

test('rewrites .md link with anchor and bare filename', () => {
  const { html } = renderMarkdown('[a](lvm.md#disks) [b](./puppet.md)', {
    srcPath: 'servers/index.md',
    base: '',
  });
  assert.match(html, /href="\/servers\/lvm\/#disks"/);
  assert.match(html, /href="\/servers\/puppet\/"/);
});

test('leaves external and anchor links untouched', () => {
  const { html } = renderMarkdown('[x](https://metacpan.org/) [y](#notes)', {
    srcPath: 'x.md',
    base: '/base/',
  });
  assert.match(html, /href="https:\/\/metacpan.org\/"/);
  assert.match(html, /href="#notes"/);
});

test('slugifies anchor on internal .md links', () => {
  const { html } = renderMarkdown('[x](README.md#Elasticsearch)', {
    srcPath: 'playbooks/site_down.md',
    base: '',
  });
  assert.match(html, /href="\/playbooks\/#elasticsearch"/);
});

test('rewrites relative directory links with base', () => {
  const { html } = renderMarkdown('[s](../sites/)', {
    srcPath: 'playbooks/site_down.md',
    base: '/network-infrastructure/',
  });
  assert.match(html, /href="\/network-infrastructure\/sites\/"/);
});
