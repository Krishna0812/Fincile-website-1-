import { Fragment, type ReactNode } from 'react';

// Minimal markdown renderer for blog posts: ## headings, paragraphs,
// ordered/unordered lists, **bold**, *italic* and [links](url). No HTML passthrough.
const INLINE = /\*\*(.+?)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(<strong key={key++} className="font-semibold text-navy">{m[1]}</strong>);
    } else if (m[2] !== undefined) {
      out.push(<em key={key++}>{m[2]}</em>);
    } else {
      const external = /^https?:/.test(m[4]);
      out.push(
        <a
          key={key++}
          href={m[4]}
          className="text-teal-text underline underline-offset-2 hover:text-teal transition-colors"
          {...(external ? { rel: 'noopener noreferrer' } : {})}
        >
          {m[3]}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function MarkdownContent({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, '\n').split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        if (lines.every((l) => /^\d+\.\s/.test(l))) {
          return (
            <ol key={i} className="list-decimal pl-6 mb-6 space-y-2 text-base leading-relaxed text-text-secondary">
              {lines.map((l, j) => <li key={j}>{inline(l.replace(/^\d+\.\s/, ''))}</li>)}
            </ol>
          );
        }
        if (lines.every((l) => /^[-*]\s/.test(l))) {
          return (
            <ul key={i} className="list-disc pl-6 mb-6 space-y-2 text-base leading-relaxed text-text-secondary">
              {lines.map((l, j) => <li key={j}>{inline(l.replace(/^[-*]\s/, ''))}</li>)}
            </ul>
          );
        }
        if (/^##\s/.test(block)) {
          return (
            <h2 key={i} className="text-xl md:text-2xl font-bold text-navy mt-12 mb-4 leading-snug" style={{ textWrap: 'balance' }}>
              {inline(block.replace(/^##\s/, ''))}
            </h2>
          );
        }
        return (
          <p key={i} className="text-base leading-relaxed text-text-secondary mb-6">
            {lines.map((l, j) => <Fragment key={j}>{j > 0 && ' '}{inline(l)}</Fragment>)}
          </p>
        );
      })}
    </>
  );
}
