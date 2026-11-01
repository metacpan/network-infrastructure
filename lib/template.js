// lib/template.js
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { withBase } from './paths.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE = readFileSync(join(__dirname, '..', 'templates', 'page.html'), 'utf8');

function navbarHtml(navItems, base) {
  return navItems
    .map((n) => `<li><a href="${withBase(n.url, base)}">${n.text}</a></li>`)
    .join('');
}

function sidebarHtml(toc, home) {
  if (home || toc.length === 0) return '';
  const items = toc
    .map((t) => `<li class="lvl-${t.level}"><a href="#${t.slug}">${t.text}</a></li>`)
    .join('');
  return `<details class="toc"><summary>On this page</summary><ul>${items}</ul></details>`;
}

// The title comes from the page's markdown, so the date is spliced in after it.
function withUpdatedDate(content, updated) {
  if (!updated) return content;
  const stamp = `<p class="page-updated">Last updated: ${updated}</p>`;
  return content.includes('</h1>') ? content.replace('</h1>', `</h1>${stamp}`) : stamp + content;
}

export function renderPage({ title, base, navItems, toc, content, updated, meta, home }) {
  const assetBase = base || '/';
  return TEMPLATE.replaceAll('{{title}}', title)
    .replaceAll('{{assetBase}}', assetBase)
    .replaceAll('{{homeHref}}', withBase('/', base))
    .replaceAll('{{navbar}}', navbarHtml(navItems, base))
    .replaceAll('{{sidebar}}', sidebarHtml(toc, home))
    .replaceAll('{{content}}', withUpdatedDate(content, updated))
    .replaceAll('{{meta}}', meta);
}
