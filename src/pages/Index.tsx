import { Link } from 'react-router-dom';
import { PageShell, SectionTitle, CtaBand, Faqs } from '@/components/PageShell';
import { useSeoMeta, combineSchemas, faqPageSchema, softwareApplicationSchema, organizationSchema } from '@/lib/seo';
import { signupUrl, INTEGRATION_STATUS } from '@/lib/site';
import usecases from '@/data/usecases.json';
import measured from '@/data/measured.json';

const faqs = [
  { q: 'Who is Fincile for first?', a: 'Bookkeepers and accounting firms who reconcile bank statements and supplier statements against the books every month. The same engine also handles invoices against purchase orders, customer payments against invoices, and card spend against expense claims.' },
  { q: 'Do I need to connect my accounting system?', a: 'No. Export a CSV or Excel file from any system and upload it. A read-only QuickBooks Online connection is in beta and is not switched on yet; it has only been tested against a simulated API.' },
  { q: 'Is my data safe?', a: 'Uploaded rows, exceptions, notes and connection tokens are encrypted before they are stored, and the app refuses to store workspace data without its encryption key. Passwords are hashed. Each workspace is private to its members, and you can delete a run or the whole workspace. Fincile has no SOC 2 or similar certification. The security page has the details.' },
  { q: 'How accurate is the matching?', a: 'On our own synthetic test files, bank statement against ledger found 98.7 percent of true pairs with 2 wrong proposals out of 232, none of them auto-accepted. Those files are not customer data and your files will differ. Matches below the review threshold are flagged for a person to confirm.' },
  { q: 'Does it change anything in my other systems?', a: 'No. Fincile reads the files you upload and reports differences. It never posts entries or moves money.' },
];

export default function Index() {
  useSeoMeta({
    title: 'Fincile – Statement Reconciliation for Bookkeepers and Accounting Firms',
    description: 'Find every discrepancy between a bank or supplier statement and the books. Fincile pairs the lines, scores each match and lists what is left, with the amount at stake.',
    path: '/',
    ogTitle: 'Fincile – Statement reconciliation for bookkeepers and accounting firms',
    ogDescription: 'Upload a statement and the ledger export, review only what does not match. Free plan, no integrations required.',
    structuredData: combineSchemas(softwareApplicationSchema(), organizationSchema(), faqPageSchema(faqs)),
  });
  const accountingRows = measured.scenarios.filter((m) => ['bank-vs-ledger', 'vendor-statement-vs-payables', 'ar-invoices-vs-receipts', 'ap-invoices-vs-po'].includes(m.id));
  return (
    <PageShell>
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <section className="text-center pt-6 pb-14">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal mb-3 block">For bookkeepers and accounting firms</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight mb-5">Find every discrepancy between a statement and the books.</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Upload a bank or supplier statement and the ledger export. Fincile pairs the lines that belong together, scores each match, and lists what is left with the amount at stake.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={signupUrl('bank-vs-ledger')} className="gradient-cta text-white font-semibold rounded-lg px-6 py-3">Reconcile your first statement free</a>
            <Link to="/how-matching-works#measured" className="border border-border bg-card text-navy font-semibold rounded-lg px-6 py-3">See measured results</Link>
          </div>
          <p className="text-sm text-text-secondary mt-4">Free plan, no card. Works from CSV or Excel exports, so no integration is needed.</p>
        </section>

        <section className="mb-16">
          <SectionTitle eyebrow="Start here">The two jobs that come back every month</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/use-cases/bank-reconciliation" className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition">
              <h3 className="font-semibold text-navy mb-1">Bank statement vs ledger</h3>
              <p className="text-sm text-text-secondary">Pair every bank line with its ledger entry, including debit and credit columns, European formats and lines booked a few days apart.</p>
            </Link>
            <Link to="/use-cases/vendor-statement-reconciliation" className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition">
              <h3 className="font-semibold text-navy mb-1">Supplier statement vs accounts payable</h3>
              <p className="text-sm text-text-secondary">Find invoices the supplier lists that you never booked, duplicates, credit notes and typos in invoice numbers.</p>
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <SectionTitle eyebrow="Measured">What we measured on test files</SectionTitle>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-text-muted"><th className="p-3">Reconciliation</th><th className="p-3">True pairs found</th><th className="p-3">Wrong proposals</th><th className="p-3">Wrong and auto-accepted</th></tr></thead>
              <tbody>
                {accountingRows.map((m) => (
                  <tr key={m.id} className="border-t border-border"><td className="p-3 font-semibold text-navy">{m.useCase}</td><td className="p-3">{m.matchRatePct}% ({m.pairsFound} of {m.truePairs})</td><td className="p-3">{m.falseMatches} of {m.matchesProposed}</td><td className="p-3">{m.autoAcceptedFalse} of {m.autoAccepted}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-secondary mt-3">Synthetic test files with deliberately messy formats, measured {measured.measuredOn}. They are not customer data and results on your files will differ. <Link to="/how-matching-works#measured" className="text-teal font-semibold">Method and the weaker results</Link>.</p>
        </section>

        <section className="mb-16">
          <SectionTitle eyebrow="How it works">From two files to a list of exceptions</SectionTitle>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              ['1. Pick a template', 'Start from a ready-made reconciliation, or set your own rules.'],
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
          <SectionTitle eyebrow="Use cases">More reconciliations on the same engine</SectionTitle>
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
          <p className="text-text-secondary mb-3">Fincile also has a Shopify app. It finds Shopify orders marked paid with no matching payment, duplicate charges and refund gaps, directly inside Shopify. It is a separate product from the statement reconciliation above.</p>
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
