import { PageShell, Crumbs, SectionTitle, Faqs, CtaBand } from '@/components/PageShell';
import { useSeoMeta, combineSchemas, breadcrumbSchema, faqPageSchema, webPageSchema } from '@/lib/seo';

const faqs = [
  { q: 'What does the confidence score mean?', a: 'It is a 0 to 100 score for how well a pair or group fits your rules. A shared reference adds the most, then equal amounts, then dates close together, then similar descriptions. It is a ranking aid, not a probability.' },
  { q: 'When is a match flagged for review?', a: 'By default, when confidence is below 75. You can change the threshold per run.' },
  { q: 'Can matching pair the wrong lines?', a: 'Yes. Matches without a shared reference rely on amount and date, and grouped matches rely on sums. Both are scored lower and flagged so a person confirms them.' },
  { q: 'Does it use AI?', a: 'The matcher is rule-based and deterministic. The same files and rules give the same result every time.' },
];
const DESC = 'How Fincile pairs records: reference match, amount tolerance, date window, fuzzy text, grouped matches and a confidence score with reasons.';

export default function HowMatchingWorks() {
  useSeoMeta({
    title: 'How Reconciliation Matching Works: Rules and Confidence Score | Fincile',
    description: DESC,
    path: '/how-matching-works',
    structuredData: combineSchemas(
      webPageSchema({ name: 'How matching works', description: DESC, path: '/how-matching-works' }),
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'How matching works', path: '/how-matching-works' }]),
      faqPageSchema(faqs),
    ),
  });
  const passes = [
    ['1. Reference, exact', 'Lines with the same reference (invoice, payout, order, claim or SKU) are paired when the amount, date and currency rules also pass. References are compared with punctuation and spaces removed, or by digits only if you choose.'],
    ['2. Reference, near match', 'References that differ slightly, such as a typo, are paired when they are at least 82 percent similar by default and the other rules pass.'],
    ['3. Amount and date', 'Lines with no usable reference are paired on equal amount within the date window. Similar descriptions raise the score.'],
    ['4. Groups', 'Leftover lines are tested for one-to-many and many-to-one matches: one payment for several invoices, or one invoice paid in parts. The group size is capped (4 by default, 6 at most) so the search stays fast.'],
  ];
  const rules = [
    ['Amount tolerance', 'A fixed amount, a percentage, or both. The wider applies.'],
    ['Amount sign', 'Signed, absolute (ignore sign), or inverted on one side, for ledgers that record money out as negative.'],
    ['Date window', 'Days apart allowed, 5 by default, or off.'],
    ['Fuzzy matching', 'On or off, with a minimum similarity from 50 to 100 percent.'],
    ['Grouping', 'On or off, with a maximum group size.'],
    ['Currency', 'Match only rows in the same currency, or ignore currency.'],
    ['Review threshold', 'Matches below this confidence are flagged for a person to confirm.'],
    ['Quantities', 'Compare counts instead of money, for inventory.'],
  ];
  return (
    <PageShell>
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Crumbs items={[{ name: 'Home', path: '/' }, { name: 'How matching works' }]} />
        <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">How matching works</h1>
        <p className="text-lg text-text-secondary mb-10">Fincile matches in passes, strongest evidence first. Each line is used once. Whatever is left becomes an exception with a likely reason.</p>

        <section className="mb-12">
          <SectionTitle eyebrow="Passes">In what order lines are paired</SectionTitle>
          <div className="space-y-3">
            {passes.map(([t, d]) => (
              <div key={t} className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-navy mb-1">{t}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SectionTitle eyebrow="Rules">What you can configure</SectionTitle>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <tbody>
                {rules.map(([t, d]) => (
                  <tr key={t} className="border-t first:border-t-0 border-border align-top">
                    <td className="p-3 font-semibold text-navy whitespace-nowrap">{t}</td>
                    <td className="p-3 text-text-secondary">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <SectionTitle eyebrow="Confidence">Reading the score</SectionTitle>
          <p className="text-text-secondary leading-relaxed mb-3">
            Every match carries a score from 0 to 100 and the reasons behind it, for example "Reference matches", "Amounts are equal" and "Dates 2 days apart". A reviewer can sort by score and check the weakest matches first.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Unmatched lines get a likely reason such as missing on the other side, amount differs, possible duplicate or large difference. These are hints to speed up checking. They are not findings of error or fraud.
          </p>
        </section>

        <section className="mb-12">
          <SectionTitle eyebrow="Exceptions">Working the leftovers</SectionTitle>
          <p className="text-text-secondary leading-relaxed">
            Each exception has an amount at stake, a status (open, investigating, resolved or ignored) and notes. Changes are written to an audit trail. You can export matches, exceptions and the audit trail as CSV on paid plans.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="FAQ">Questions</SectionTitle>
          <Faqs faqs={faqs} />
        </section>
        <CtaBand />
      </div>
    </PageShell>
  );
}
