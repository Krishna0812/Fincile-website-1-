import { Link, useParams } from 'react-router-dom';
import { PageShell, Crumbs, SectionTitle, Faqs, CtaBand } from '@/components/PageShell';
import { useSeoMeta, combineSchemas, breadcrumbSchema, faqPageSchema, webPageSchema } from '@/lib/seo';
import industries from '@/data/industries.json';
import usecases from '@/data/usecases.json';
import NotFound from './NotFound';

export default function Industry() {
  const { slug } = useParams();
  const i = industries.find((x) => x.slug === slug);
  const path = `/industries/${slug}`;
  useSeoMeta(
    i
      ? {
          title: i.metaTitle,
          description: i.metaDescription,
          path,
          structuredData: combineSchemas(
            webPageSchema({ name: i.name, description: i.metaDescription, path }),
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }, { name: i.name, path }]),
            faqPageSchema(i.faqs),
          ),
        }
      : { title: 'Not found | Fincile', description: 'Page not found.', path, noindex: true },
  );
  if (!i) return <NotFound />;
  return (
    <PageShell>
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Crumbs items={[{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }, { name: i.name }]} />
        <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">{i.h1}</h1>
        <p className="text-lg text-text-secondary mb-10">{i.intro}</p>

        <section className="mb-12">
          <SectionTitle eyebrow="Common problems">What goes wrong</SectionTitle>
          <ul className="space-y-3">
            {i.pains.map((p) => (
              <li key={p} className="bg-card rounded-lg border border-border px-4 py-3 text-sm text-text-secondary">{p}</li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <SectionTitle eyebrow="Templates">Where to start</SectionTitle>
          <div className="space-y-3">
            {i.uses.map((x) => {
              const u = usecases.find((c) => c.slug === x.slug)!;
              return (
                <Link key={x.slug} to={`/use-cases/${x.slug}`} className="block bg-card rounded-xl border border-border p-5 hover:shadow-lg transition">
                  <h3 className="font-semibold text-navy">{u.name}</h3>
                  <p className="text-sm text-text-secondary">{x.how}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <SectionTitle eyebrow="Good to know">Scope and data</SectionTitle>
          <p className="text-text-secondary leading-relaxed">{i.dataNote}</p>
        </section>

        <section>
          <SectionTitle eyebrow="FAQ">Questions</SectionTitle>
          <Faqs faqs={i.faqs} />
        </section>
        <CtaBand />
      </div>
    </PageShell>
  );
}
