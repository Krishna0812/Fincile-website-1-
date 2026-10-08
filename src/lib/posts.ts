// Markdown blog posts live in /content/blog, one file per post. They are
// bundled at build time (Vite raw imports), so nothing is read from disk at
// runtime. Frontmatter: title, description, date (YYYY-MM-DD), slug, and an
// optional seoTitle for the HTML <title>.
const files = import.meta.glob('../../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface MarkdownPost {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  body: string;
}

function parse(raw: string): MarkdownPost | null {
  const match = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  if (!meta.title || !meta.slug || !meta.date || !meta.description) return null;
  return {
    slug: meta.slug,
    title: meta.title,
    seoTitle: meta.seoTitle || meta.title,
    description: meta.description,
    date: meta.date,
    body: match[2].trim(),
  };
}

/** All markdown posts, newest first. */
export const markdownPosts: MarkdownPost[] = Object.values(files)
  .map(parse)
  .filter((p): p is MarkdownPost => p !== null)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getMarkdownPost(slug: string) {
  return markdownPosts.find((p) => p.slug === slug);
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
