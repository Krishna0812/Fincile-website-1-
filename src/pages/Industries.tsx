import { Link } from 'react-router-dom';
import { PageShell, Crumbs, CtaBand } from '@/components/PageShell';
import { useSeoMeta, combineSchemas, breadcrumbSchema, itemListSchema, webPageSchema } from '@/lib/seo';
import industries from '@/data/industries.json';

const DESC = 'How e-commerce, healthcare billing, property management and agency teams use Fincile to reconcile the systems they already have.';

export default function Industries() {
  useSeoMeta({
    title: 'Reconciliation by Industry | Fincile',
    description: DESC,
    path: '/industries',
    structuredData: combineSchemas(
      webPageSchema({ name: 'Reconciliation by industry', description: DESC, path: '/industries' }),
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }]),
      itemListSchema(industries.map((i) => ({ name: i.name, path: `/industries/${i.slug}` }))),
    ),
  });
  return (
    <PageShell>
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <Crumbs items={[{ name: 'Home', path: '/' }, { name: 'Industries' }]} />
        <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">Reconciliation by industry</h1>
        <p className="text-text-secondary max-w-2xl mb-10">The templates are the same. What changes is which two systems you compare and which exceptions matter most.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {industries.map((i) => (
            <Link key={i.slug} to={`/industries/${i.slug}`} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition">
              <h2 className="text-lg font-bold text-navy mb-2">{i.name}</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{i.intro}</p>
            </Link>
          ))}
        </div>
        <CtaBand />
      </div>
    </PageShell>
  );
}
