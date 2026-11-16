import { PageShell, Crumbs, Faqs, CtaBand } from '@/components/PageShell';
import { useSeoMeta, combineSchemas, breadcrumbSchema, faqPageSchema, webPageSchema, softwareApplicationSchema } from '@/lib/seo';
import { WORKSPACE_PLANS, signupUrl, SHOPIFY_APP_STORE_URL } from '@/lib/site';

const faqs = [
  { q: 'Can I pay for a plan today?', a: 'Not yet. Billing in the workspace product runs in test mode. You can switch plans to try the limits, and nothing is charged. Live card billing is not built yet, so the paid prices below are the planned prices.' },
  { q: 'What does a row limit mean?', a: 'The limit applies to each file in a run. A run of two files with 400 rows each fits the Starter plan.' },
  { q: 'What happens to my data if I downgrade?', a: 'Runs older than your plan history window are deleted by a scheduled job. You can delete any run or your whole workspace yourself at any time.' },
  { q: 'Is the Shopify app priced the same way?', a: 'No. The Shopify app has its own plans in the Shopify App Store.' },
];

const DESC = 'Free plan with 100 rows per file and 1 run a month. Planned paid plans from $29 a month. Billing is in test mode and nothing is charged yet.';

export default function Pricing() {
  useSeoMeta({
    title: 'Pricing | Fincile Reconciliation',
    description: DESC,
    path: '/pricing',
    structuredData: combineSchemas(
      webPageSchema({ name: 'Fincile pricing', description: DESC, path: '/pricing' }),
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]),
      softwareApplicationSchema(),
      faqPageSchema(faqs),
    ),
  });
  return (
    <PageShell>
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <Crumbs items={[{ name: 'Home', path: '/' }, { name: 'Pricing' }]} />
        <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">Pricing</h1>
        <p className="text-text-secondary max-w-2xl mb-3">Start on the free plan. Paid plans raise the row limit and add export and longer history.</p>
        <p className="text-sm bg-teal-light text-navy rounded-lg px-4 py-3 max-w-2xl mb-10">
          Billing is in test mode. You can pick a paid plan to try its limits, and nothing is charged. Live billing is not available yet.
        </p>
        <div className="grid md:grid-cols-4 gap-4">
          {WORKSPACE_PLANS.map((p) => (
            <div key={p.key} className="bg-card rounded-xl border border-border p-6 flex flex-col">
              <h2 className="text-lg font-bold text-navy">{p.name}</h2>
              <p className="text-3xl font-extrabold text-navy my-2">{p.price}<span className="text-sm font-normal text-text-muted">{p.key === 'free' ? '' : ' / month'}</span></p>
              <ul className="text-sm text-text-secondary space-y-2 mb-6 flex-1">
                <li>{p.rows} rows per file</li>
                <li>{p.runs}</li>
                <li>{p.exports ? 'CSV export of matches, exceptions and audit trail' : 'No CSV export'}</li>
                <li>Results kept {p.history}</li>
                <li>Unlimited workspace members</li>
              </ul>
              <a href={signupUrl()} className="gradient-cta text-white font-semibold rounded-lg px-4 py-2 text-center">{p.key === 'free' ? 'Start free' : 'Try in test mode'}</a>
            </div>
          ))}
        </div>
        <p className="text-sm text-text-secondary mt-6">
          Looking for the Shopify app? <a className="text-teal font-semibold" href={SHOPIFY_APP_STORE_URL}>See it in the Shopify App Store</a>.
        </p>
        <h2 className="text-2xl font-extrabold text-navy mt-14 mb-4">Pricing questions</h2>
        <Faqs faqs={faqs} />
        <CtaBand />
      </div>
    </PageShell>
  );
}
