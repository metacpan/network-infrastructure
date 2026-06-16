// lib/paths.js

// "README.md" / "index.md" act as a directory root; other names get their own dir.
function urlDir(srcPath) {
  const parts = srcPath.split('/');
  const file = parts.pop().replace(/\.md$/, '');
  const dir = parts.join('/');
  if (file === 'README' || file === 'index') {
    return dir ? `/${dir}/` : '/';
  }
  return dir ? `/${dir}/${file}/` : `/${file}/`;
}

export function srcToUrl(srcPath) {
  return urlDir(srcPath);
}

export function srcToOutputPath(srcPath) {
  const url = urlDir(srcPath); // e.g. "/servers/lvm/"
  return `${url.replace(/^\//, '')}index.html`; // "servers/lvm/index.html"
}

// base is "" or "/network-infrastructure/". url always starts with "/".
export function withBase(url, base) {
  if (!base) return url;
  return base.replace(/\/$/, '') + url;
}
