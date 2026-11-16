import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { signupUrl } from '@/lib/site';

export function PageShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">{children}</main>
      <Footer />
    </div>
  );
}

export function Crumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-text-secondary mb-6">
      {items.map((it, i) => (
        <span key={it.name}>
          {i > 0 && <span className="mx-2">/</span>}
          {it.path ? <Link to={it.path} className="hover:text-navy underline-offset-2 hover:underline">{it.name}</Link> : <span>{it.name}</span>}
        </span>
      ))}
    </nav>
  );
}

export function SectionTitle({ eyebrow, children }: { eyebrow?: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      {eyebrow && <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal mb-2 block">{eyebrow}</span>}
      <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">{children}</h2>
    </div>
  );
}

export function Faqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((f) => (
        <div key={f.q} className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-navy mb-2">{f.q}</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{f.a}</p>
        </div>
      ))}
    </div>
  );
}

export function CtaBand({ template, title = 'Try it on your own files' }: { template?: string; title?: string }) {
  return (
    <div className="gradient-section rounded-2xl p-8 md:p-10 text-center text-white mt-14">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{title}</h2>
      <p className="text-white/80 max-w-xl mx-auto mb-6 text-sm md:text-base">
        The free plan needs no card: 1 run a month, up to 100 rows per file. You can delete your data at any time.
      </p>
      <a href={signupUrl(template)} className="inline-block bg-white text-navy font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition">
        Start free
      </a>
    </div>
  );
}
