import { Link } from 'react-router-dom';
import { PageShell, SectionTitle, CtaBand, Faqs } from '@/components/PageShell';
import { useSeoMeta, combineSchemas, faqPageSchema, softwareApplicationSchema, organizationSchema } from '@/lib/seo';
import { signupUrl, INTEGRATION_STATUS } from '@/lib/site';
import usecases from '@/data/usecases.json';

const faqs = [
  { q: 'What is Fincile?', a: 'Fincile compares two datasets, such as a bank statement and a ledger, matches the lines that belong together, scores each match, and lists what is left over so you can work through it.' },
  { q: 'Do I need to connect my accounting system?', a: 'No. Upload CSV or Excel files from any system. A read-only QuickBooks Online connection is built and launching soon, but file upload is the main route today.' },
  { q: 'Is my data safe?', a: 'Each workspace is private to its members. Uploaded rows are encrypted before storage when the server encryption key is configured, passwords are hashed, and you can delete a run or your whole workspace. Fincile has no SOC 2 or similar certification.' },
  { q: 'Does it change anything in my other systems?', a: 'No. Fincile reads the files you upload and reports differences. It never posts entries or moves money.' },
];

export default function Index() {
  useSeoMeta({
    title: 'Fincile – Reconciliation Software for Finance, Ops and Billing Teams',
    description: 'Match any two datasets: bank vs ledger, payouts vs orders, invoices vs purchase orders. Fincile scores every match and lists the exceptions to review.',
    path: '/',
    ogTitle: 'Fincile – Reconcile any two datasets',
    ogDescription: 'Upload two files, set the matching rules, review the exceptions. Templates for 12 common reconciliations.',
    structuredData: combineSchemas(softwareApplicationSchema(), organizationSchema(), faqPageSchema(faqs)),
  });
  return (
    <PageShell>
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <section className="text-center pt-6 pb-14">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal mb-3 block">Reconciliation software</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight mb-5">Reconcile any two datasets. Review only what does not match.</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Upload a bank statement and a ledger, a payout report and your orders, or invoices and purchase orders. Fincile pairs the lines, shows how sure it is, and lists every exception with the amount at stake.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={signupUrl()} className="gradient-cta text-white font-semibold rounded-lg px-6 py-3">Start free</a>
            <Link to="/use-cases" className="border border-border bg-card text-navy font-semibold rounded-lg px-6 py-3">See use cases</Link>
          </div>
        </section>

        <section className="mb-16">
          <SectionTitle eyebrow="How it works">From two files to a list of exceptions</SectionTitle>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              ['1. Pick a template', 'Start from one of 12 reconciliations, or set your own rules.'],
              ['2. Upload two files', 'CSV, TSV or Excel. Choose the amount, date and reference columns once and save them.'],
              ['3. Match', 'Reference, amount, date window, fuzzy text, and groups of lines that add up.'],
              ['4. Work the exceptions', 'Each has a likely reason, an amount, a status and notes. Export the results.'],
            ].map(([t, d]) => (
              <div key={t} className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-navy mb-2">{t}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionTitle eyebrow="Use cases">Twelve templates to start from</SectionTitle>
          <div className="grid md:grid-cols-3 gap-4">
            {usecases.map((u) => (
              <Link key={u.slug} to={`/use-cases/${u.slug}`} className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition">
                <span className="text-xs text-teal font-semibold uppercase tracking-wide">{u.department}</span>
                <h3 className="font-semibold text-navy mt-1 mb-1">{u.name}</h3>
                <p className="text-sm text-text-secondary">{u.sourceA.label} vs {u.sourceB.label.toLowerCase()}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionTitle eyebrow="Rules">You control how matching works</SectionTitle>
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-text-secondary">
            {['Exact match on a reference such as an invoice, payout or order number','Amount tolerance as a fixed amount, a percentage, or both','Date window in days','Fuzzy matching for references with typos and for descriptions','One-to-many and many-to-one matches, with a size limit','A 0 to 100 confidence score, with the reasons listed for every match'].map((t) => (
              <li key={t} className="bg-card rounded-lg border border-border px-4 py-3">{t}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm"><Link to="/how-matching-works" className="text-teal font-semibold">How matching works →</Link></p>
        </section>

        <section className="mb-16">
          <SectionTitle eyebrow="Sources">What works today</SectionTitle>
          <div className="space-y-3">
            {INTEGRATION_STATUS.map((s) => (
              <div key={s.name} className="bg-card rounded-xl border border-border p-4 flex flex-col md:flex-row md:items-center gap-2">
                <div className="md:w-72 font-semibold text-navy">{s.name}</div>
                <div className="md:w-48 text-xs font-semibold text-teal uppercase tracking-wide">{s.status}</div>
                <div className="text-sm text-text-secondary flex-1">{s.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionTitle eyebrow="Shopify">Running a Shopify store?</SectionTitle>
          <p className="text-text-secondary mb-3">The original Fincile app finds Shopify orders marked paid with no matching payment, duplicate charges and refund gaps, directly inside Shopify.</p>
          <Link to="/shopify" className="text-teal font-semibold">See the Shopify app →</Link>
        </section>

        <section>
          <SectionTitle eyebrow="FAQ">Common questions</SectionTitle>
          <Faqs faqs={faqs} />
        </section>
        <CtaBand />
      </div>
    </PageShell>
  );
}
