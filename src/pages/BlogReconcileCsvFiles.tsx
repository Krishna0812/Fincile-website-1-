import GuidePage from '@/components/GuidePage';

export default function BlogReconcileCsvFiles() {
  return (
    <GuidePage
      path="/blog/reconcile-two-csv-files"
      title="How to Reconcile Two CSV Files of Transactions | Fincile"
      headline="How to Reconcile Two CSV Files of Transactions"
      description="A step-by-step method to match two transaction exports (bank statement vs ledger, sales report vs payouts) by reference, amount and date, and what to do with the leftovers."
      eyebrow="Reconciliation basics"
      datePublished="2026-11-14"
      dateLabel="November 2026"
      readTime="6 min read"
      intro={[
        'To reconcile two CSV files of transactions, put both into the same column layout, match rows on a shared reference first, then on amount and a small date window, and review whatever is left as exceptions. The method is the same whether the files are a bank statement and a sales ledger, a marketplace report and your deposits, or a payment processor export and your accounting data.',
        'This guide covers the matching order that works in practice and the traps that cause false matches. You can do it in a spreadsheet; the same steps are what reconciliation software automates.',
      ]}
      sections={[
        {
          heading: 'Step by step',
          steps: [
            { title: 'Normalise both files', body: 'Use one column set: date, amount, currency, reference, description. Convert dates to one format and time zone. Decide one sign convention (money in positive, money out negative). Strip currency symbols and thousands separators so amounts are numbers.' },
            { title: 'Match on a shared reference first', body: 'An order number, invoice number or transaction ID that appears in both files is the strongest match. Match these first and set them aside. Amount alone is unreliable when many transactions have the same value.' },
            { title: 'Match the rest on amount and a date window', body: 'For rows with no shared reference, match equal amounts whose dates are within a few days of each other. Settlement usually lands after the sale, so allow a window instead of requiring the same date. If more than one candidate fits, do not guess; leave the row for review.' },
            { title: 'Check for one-to-many matches', body: 'One bank deposit often equals several sales minus fees, and one sale can be paid in instalments. After one-to-one matching, test whether small groups of leftover rows add up to a single leftover row on the other side.' },
            { title: 'Review the unmatched rows', body: 'Unmatched rows in file A are items with no counterpart in file B, and the reverse. Sort them into causes: timing (not yet settled), fees deducted, refunds, duplicates, or genuinely missing money. Only the last group needs action.' },
          ],
        },
        {
          heading: 'Common traps',
          bullets: [
            { title: 'Fees and net amounts', body: 'A payout is usually the sale total minus processor fees, so the amounts will not be equal. Match on reference, then compare gross, fee and net separately.' },
            { title: 'Duplicates inside one file', body: 'Retried payments or double exports create two rows for one real transaction. Look for repeated reference and amount pairs before matching.' },
            { title: 'Time zones and cut-off dates', body: 'A sale at 11 pm in one time zone can fall on the next day in another. A date window avoids false exceptions around month end.' },
            { title: 'Currency conversion', body: 'If the two files are in different currencies, the converted amounts will differ by the exchange rate used. Reconcile in the original currency where you can.' },
          ],
        },
        {
          heading: 'When a spreadsheet stops being enough',
          paragraphs: [
            'Lookup formulas handle exact reference matches well. They struggle with date windows, grouped matches and files with thousands of rows, and the work has to be repeated every period. At that point a reconciliation tool that applies the same matching order every time, and lists the exceptions with a reason, saves the effort.',
          ],
        },
      ]}
      faq={[
        { q: 'What is the fastest way to reconcile two CSV files?', a: 'Normalise both files to the same columns, match on a shared reference, then match remaining rows on amount within a date window, and review what is left. Software that automates this removes the repeated manual steps.' },
        { q: 'Can I reconcile without a shared reference?', a: 'Yes, by matching on amount and a date window, but treat rows with several possible matches as exceptions for review instead of guessing.' },
        { q: 'Why do my totals not match even when every row matches?', a: 'Usually fees, refunds, timing differences at period end, or currency conversion. Compare gross, fee and net amounts separately.' },
        { q: 'Does Fincile reconcile CSV files?', a: 'Fincile matches Shopify orders against payment gateway payout records. A workspace that reconciles any two CSV exports by amount, date and reference is being rolled out. It reports exceptions for review and does not change your books.' },
      ]}
      cta={{
        heading: 'Fincile finds the rows that do not match',
        body: 'For Shopify stores, Fincile checks every order against its gateway payout and lists missing payments, duplicates and refund mismatches. Read-only access.',
      }}
    />
  );
}
