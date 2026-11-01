// lib/frontmatter.js

// Parse a leading `---` fenced block of simple `key: value` lines.
// Only flat string values are supported (all this site needs).
export function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) {
    return { data: {}, body: raw };
  }
  const end = raw.indexOf('\n---', 3);
  if (end === -1) {
    return { data: {}, body: raw };
  }
  const block = raw.slice(3, end);
  const rest = raw.slice(end + 4); // skip "\n---"
  const data = {};
  for (const line of block.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const colon = trimmed.indexOf(':');
    if (colon === -1) {
      throw new Error(`Malformed frontmatter line: "${line}"`);
    }
    const key = trimmed.slice(0, colon).trim();
    const value = trimmed.slice(colon + 1).trim();
    data[key] = value;
  }
  const body = rest.replace(/^\n+/, '\n').replace(/^\n/, '');
  return { data, body };
}
