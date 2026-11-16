import { Link } from 'react-router-dom';
import { PageShell, Crumbs, CtaBand } from '@/components/PageShell';
import { useSeoMeta, combineSchemas, breadcrumbSchema, itemListSchema, webPageSchema } from '@/lib/seo';
import usecases from '@/data/usecases.json';

const TITLE = 'Reconciliation Use Cases: Bank, Supplier Statements, AP, AR, Payouts | Fincile';
const DESC = 'Ten reconciliation guides, starting with bank and supplier statements. Each shows the two files you need and what Fincile reports.';

export default function UseCases() {
  useSeoMeta({
    title: TITLE,
    description: DESC,
    path: '/use-cases',
    structuredData: combineSchemas(
      webPageSchema({ name: 'Reconciliation use cases', description: DESC, path: '/use-cases' }),
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Use cases', path: '/use-cases' }]),
      itemListSchema(usecases.map((u) => ({ name: u.name, path: `/use-cases/${u.slug}` }))),
    ),
  });
  return (
    <PageShell>
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <Crumbs items={[{ name: 'Home', path: '/' }, { name: 'Use cases' }]} />
        <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">Reconciliation use cases</h1>
        <p className="text-text-secondary max-w-2xl mb-10">Each use case is a template: the two files to bring, sensible matching rules, and a sample you can run before uploading your own data.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {usecases.map((u) => (
            <Link key={u.slug} to={`/use-cases/${u.slug}`} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition">
              <span className="text-xs text-teal font-semibold uppercase tracking-wide">{u.department}</span>
              <h2 className="text-lg font-bold text-navy mt-1 mb-2">{u.name}</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{u.intro}</p>
            </Link>
          ))}
        </div>
        <CtaBand />
      </div>
    </PageShell>
  );
}
