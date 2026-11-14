import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeoMeta, blogPostingSchema, breadcrumbSchema, faqSchema, combineSchemas } from '@/lib/seo';

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: { title: string; body: string }[];
  steps?: { title: string; body: string }[];
}

export interface GuideProps {
  path: string;
  title: string;
  headline: string;
  description: string;
  eyebrow: string;
  datePublished: string;
  dateLabel: string;
  readTime: string;
  intro: string[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  cta: { heading: string; body: string };
}

/** Shared layout for answer-style guides: short direct intro, sectioned body,
 * visible FAQ that matches the FAQPage schema, and one honest call to action. */
export default function GuidePage(p: GuideProps) {
  useSeoMeta({
    title: p.title,
    description: p.description,
    path: p.path,
    structuredData: combineSchemas(
      blogPostingSchema({ headline: p.headline, description: p.description, path: p.path, datePublished: p.datePublished }),
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: p.headline }]),
      faqSchema(p.faq),
    ),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-8">
            <Link to="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-teal transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-navy font-medium">{p.headline}</span>
          </div>

          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-4">{p.eyebrow}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>{p.headline}</h1>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <span>By Krishna Mandala</span><span>·</span><span>{p.dateLabel}</span><span>·</span><span>{p.readTime}</span>
            </div>
          </div>

          <article className="prose-article">
            {p.intro.map((t) => (
              <p key={t} className="text-base leading-relaxed text-text-secondary mb-6">{t}</p>
            ))}

            {p.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-bold text-navy mt-10 mb-4">{s.heading}</h2>
                {s.paragraphs?.map((t) => (
                  <p key={t} className="text-base leading-relaxed text-text-secondary mb-6">{t}</p>
                ))}
                {s.bullets && (
                  <ul className="space-y-3 mb-8">
                    {s.bullets.map((b) => (
                      <li key={b.title} className="flex gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                        <span className="text-base text-text-secondary leading-relaxed"><strong className="text-navy">{b.title}:</strong> {b.body}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.steps && (
                  <div className="space-y-6 mb-8">
                    {s.steps.map((st, i) => (
                      <div key={st.title} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-cta flex items-center justify-center text-primary-foreground text-sm font-bold">{i + 1}</div>
                        <div>
                          <div className="font-semibold text-navy mb-1">{st.title}</div>
                          <div className="text-sm text-text-secondary leading-relaxed">{st.body}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Frequently asked questions</h2>
            <div className="space-y-5 mb-10">
              {p.faq.map((f) => (
                <div key={f.q}>
                  <h3 className="font-semibold text-navy mb-1">{f.q}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-navy rounded-xl p-8 text-center">
              <div className="text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-3">Built for this problem</div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">{p.cta.heading}</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-md mx-auto">{p.cta.body}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://apps.shopify.com/fincile" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 px-7 rounded-md text-sm font-semibold bg-teal text-navy hover:opacity-90 active:scale-[0.98] transition-all">
                  Try Free — Up to 100 Orders →
                </a>
                <Link to="/" className="inline-flex items-center justify-center h-11 px-7 rounded-md text-sm font-semibold border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-all">
                  Learn more
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
