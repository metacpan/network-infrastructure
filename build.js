// build.js — render all *.md into dist/ as a static site.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync, statSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { parseFrontmatter } from './lib/frontmatter.js';
import { srcToOutputPath, withBase } from './lib/paths.js';
import { renderMarkdown } from './lib/markdown.js';
import { renderPage } from './lib/template.js';

const REPO = 'metacpan/network-infrastructure';
const OUT = 'dist';
const NAV_ITEMS = [
  { text: 'Playbooks', url: '/playbooks/' },
  { text: 'Sites', url: '/sites/' },
  { text: 'Docker', url: '/docker/' },
  { text: 'Servers', url: '/servers/' },
];
const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'docs', 'old_zonefiles', '.github', '.vuepress', 'lib', 'test', 'templates', 'assets']);

const rawBase = process.env.GITHUB_PAGES_BASE || '';
const base = rawBase ? rawBase.replace(/\/?$/, '/') : '';

// Recursively discover markdown files, skipping non-content directories.
function findMarkdown(dir = '.', acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = dir === '.' ? entry.name : `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(rel) || rel.startsWith('.')) continue;
      findMarkdown(rel, acc);
    } else if (entry.name.endsWith('.md')) {
      acc.push(rel);
    }
  }
  return acc;
}

function gitLastUpdated(srcPath) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', srcPath], { encoding: 'utf8' }).trim();
    return out || '';
  } catch {
    console.warn(`warning: no git timestamp for ${srcPath}`);
    return '';
  }
}

function metaHtml(srcPath) {
  const updated = gitLastUpdated(srcPath);
  const editUrl = `https://github.com/${REPO}/edit/master/${srcPath}`;
  const parts = [];
  if (updated) parts.push(`Last updated: ${updated}`);
  parts.push(`<a href="${editUrl}">Edit this page on GitHub</a>`);
  return parts.join(' · ');
}

function heroHtml(data, base) {
  const link = withBase(data.actionLink?.replace(/^\.\//, '/') || '/', base);
  return `<section class="hero">
  <h1>${data.heroText || ''}</h1>
  ${data.actionText ? `<a href="${link}" role="button">${data.actionText}</a>` : ''}
</section>`;
}

function build() {
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  const files = findMarkdown();
  for (const srcPath of files) {
    const raw = readFileSync(srcPath, 'utf8');
    const { data, body } = parseFrontmatter(raw);
    const home = data.home === 'true';
    const { html, toc } = renderMarkdown(body, { srcPath, base });
    const content = home ? heroHtml(data, base) + html : html;

    const page = renderPage({
      title: 'MetaCPAN infra',
      base,
      navItems: NAV_ITEMS,
      toc,
      content,
      meta: metaHtml(srcPath),
      home,
    });

    const outPath = join(OUT, srcToOutputPath(srcPath));
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, page);
  }

  cpSync('assets', join(OUT, 'assets'), { recursive: true });

  // Post-build sanity check: each source wrote a non-empty page containing the navbar.
  for (const srcPath of files) {
    const outPath = join(OUT, srcToOutputPath(srcPath));
    if (!existsSync(outPath) || statSync(outPath).size === 0) {
      throw new Error(`build failed: missing/empty output for ${srcPath} (${outPath})`);
    }
    const produced = readFileSync(outPath, 'utf8');
    if (!produced.includes('topnav')) {
      throw new Error(`build failed: navbar missing in ${outPath}`);
    }
  }

  console.log(`Built ${files.length} pages into ${OUT}/ (base: "${base || '/'}")`);
}

build();
