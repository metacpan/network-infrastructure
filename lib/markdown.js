// lib/markdown.js
import MarkdownIt from 'markdown-it';
import { posix as pathPosix } from 'node:path';
import { srcToUrl, withBase } from './paths.js';

function headingText(inlineToken) {
  if (!inlineToken.children) return inlineToken.content;
  return inlineToken.children
    .filter((t) => t.type === 'text' || t.type === 'code_inline')
    .map((t) => t.content)
    .join('');
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function rewriteHref(href, srcPath, base) {
  if (/^([a-z]+:|\/\/|#|\/)/i.test(href)) return href; // external/abs/anchor
  const [pathPart, anchor] = href.split('#');
  const srcDir = pathPosix.dirname(srcPath);
  if (/\.md$/.test(pathPart)) {
    const targetSrc = pathPosix.normalize(pathPosix.join(srcDir, pathPart));
    const url = withBase(srcToUrl(targetSrc), base);
    return anchor ? `${url}#${slugify(anchor)}` : url;
  }
  if (pathPart.endsWith('/')) { // relative directory link, e.g. ../sites/
    const targetDir = pathPosix.normalize(pathPosix.join(srcDir, pathPart));
    const url = withBase(`/${targetDir.replace(/\/?$/, '/')}`, base);
    return anchor ? `${url}#${anchor}` : url;
  }
  return href; // other relative links (e.g. assets) left untouched
}

export function renderMarkdown(body, { srcPath, base }) {
  const md = new MarkdownIt({ html: true, linkify: true });
  const toc = [];
  const seen = new Map();

  // Assign unique slug ids to h2/h3/h4 and collect them for the sidebar.
  const defaultHeadingOpen =
    md.renderer.rules.heading_open ||
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const level = Number(token.tag.slice(1));
    if (level >= 2 && level <= 4) {
      const text = headingText(tokens[idx + 1]);
      let slug = slugify(text);
      if (seen.has(slug)) {
        const n = seen.get(slug) + 1;
        seen.set(slug, n);
        slug = `${slug}-${n}`;
      } else {
        seen.set(slug, 0);
      }
      token.attrSet('id', slug);
      toc.push({ level, text, slug });
    }
    return defaultHeadingOpen(tokens, idx, options, env, self);
  };

  const defaultLinkOpen =
    md.renderer.rules.link_open ||
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex('href');
    if (hrefIndex >= 0) {
      const href = token.attrs[hrefIndex][1];
      token.attrs[hrefIndex][1] = rewriteHref(href, srcPath, base);
    }
    return defaultLinkOpen(tokens, idx, options, env, self);
  };

  const html = md.render(body);
  return { html, toc };
}
