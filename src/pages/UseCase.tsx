import { Link, useParams } from 'react-router-dom';
import { PageShell, Crumbs, SectionTitle, Faqs, CtaBand } from '@/components/PageShell';
import { useSeoMeta, combineSchemas, breadcrumbSchema, faqPageSchema, webPageSchema } from '@/lib/seo';
import usecases from '@/data/usecases.json';
import NotFound from './NotFound';

export default function UseCase() {
  const { slug } = useParams();
  const u = usecases.find((x) => x.slug === slug);
  const path = `/use-cases/${slug}`;
  useSeoMeta(
    u
      ? {
          title: u.metaTitle,
          description: u.metaDescription,
          path,
          structuredData: combineSchemas(
            webPageSchema({ name: u.name, description: u.metaDescription, path }),
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Use cases', path: '/use-cases' }, { name: u.name, path }]),
            faqPageSchema(u.faqs),
          ),
        }
      : { title: 'Not found | Fincile', description: 'Page not found.', path, noindex: true },
  );
  if (!u) return <NotFound />;
  const related = u.related.map((r) => usecases.find((x) => x.slug === r)!).filter(Boolean);
  return (
    <PageShell>
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Crumbs items={[{ name: 'Home', path: '/' }, { name: 'Use cases', path: '/use-cases' }, { name: u.name }]} />
        <span className="text-xs text-teal font-semibold uppercase tracking-wide">{u.department}</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight mt-1 mb-4">{u.h1}</h1>
        <p className="text-lg text-text-secondary mb-8">{u.intro}</p>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {[u.sourceA, u.sourceB].map((s, i) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-5">
              <span className="text-xs font-semibold text-text-muted uppercase">File {i === 0 ? 'A' : 'B'}</span>
              <h3 className="font-semibold text-navy">{s.label}</h3>
              <p className="text-sm text-text-secondary">{s.hint}</p>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <SectionTitle eyebrow="The problem">Why this reconciliation takes time</SectionTitle>
          <p className="text-text-secondary leading-relaxed mb-3">{u.problem}</p>
          <p className="text-text-secondary leading-relaxed">{u.whyHard}</p>
        </section>

        <section className="mb-12">
          <SectionTitle eyebrow="How Fincile handles it">What the template does</SectionTitle>
          <ul className="space-y-3">
            {u.handling.map((h) => (
              <li key={h} className="bg-card rounded-lg border border-border px-4 py-3 text-sm text-text-secondary">{h}</li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <SectionTitle eyebrow="Example output">What a result looks like</SectionTitle>
          <p className="text-sm text-text-secondary mb-4">
            Built-in sample data, not customer data: {u.sample.rowsA} rows in {u.sample.fileA}, {u.sample.rowsB} rows in {u.sample.fileB}. Fincile matched {u.sample.matched} pairs or groups and listed the rest.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-surface text-left text-text-muted">
                <tr><th className="p-3">Finding</th><th className="p-3">Detail</th><th className="p-3 text-right">Amount</th></tr>
              </thead>
              <tbody>
                {u.sample.findings.map((f) => (
                  <tr key={f.label} className="border-t border-border align-top">
                    <td className="p-3 font-semibold text-navy whitespace-nowrap">{f.label}</td>
                    <td className="p-3 text-text-secondary">{f.detail}</td>
                    <td className="p-3 text-right text-navy whitespace-nowrap">{f.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <SectionTitle eyebrow="Exceptions">Typical causes Fincile surfaces</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {u.exceptions.map((e) => (
              <span key={e} className="bg-teal-light text-navy text-sm rounded-full px-3 py-1">{e}</span>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SectionTitle eyebrow="FAQ">Questions about this reconciliation</SectionTitle>
          <Faqs faqs={u.faqs} />
        </section>

        <section>
          <SectionTitle eyebrow="Related">Other reconciliations</SectionTitle>
          <div className="grid md:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.slug} to={`/use-cases/${r.slug}`} className="bg-card rounded-xl border border-border p-4 hover:shadow-lg transition">
                <h3 className="font-semibold text-navy">{r.name}</h3>
              </Link>
            ))}
          </div>
        </section>
        <CtaBand template={u.templateId} title={`Run the ${u.name.toLowerCase()} template`} />
      </div>
    </PageShell>
  );
}
