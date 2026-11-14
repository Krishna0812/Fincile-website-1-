import GuidePage from '@/components/GuidePage';

export default function BlogQuickBooksDepositReconciliation() {
  return (
    <GuidePage
      path="/blog/quickbooks-deposit-reconciliation"
      title="QuickBooks Deposits Don't Match Payouts: Why and How to Check | Fincile"
      headline="QuickBooks Deposits Don't Match Payouts: Why and How to Check"
      description="Why a QuickBooks bank deposit differs from a Stripe, PayPal or Shopify payout, and a method to find the missing payments, fees, refunds and timing gaps behind the difference."
      eyebrow="QuickBooks reconciliation"
      datePublished="2026-11-14"
      dateLabel="November 2026"
      readTime="6 min read"
      intro={[
        'A QuickBooks deposit usually does not match a payment processor payout because the payout is a net figure: sales minus fees, refunds and adjustments, grouped by the processor\'s own settlement schedule. The books often record gross sales and a bank deposit that arrives days later, so the two numbers differ even when nothing is wrong.',
        'This guide explains the usual causes and a repeatable way to check a payout against the sales behind it. It describes the accounting logic in general terms; the exact screens in QuickBooks Online change over time, so follow Intuit\'s current help pages for menu steps.',
      ]}
      sections={[
        {
          heading: 'Why the numbers differ',
          bullets: [
            { title: 'Fees', body: 'Processors deduct fees before paying out. If fees are not recorded as an expense, the deposit looks short.' },
            { title: 'Batching', body: 'One payout covers many orders. The bank shows one deposit while the books show many sales, so there is no one-to-one row to match.' },
            { title: 'Timing', body: 'A sale on the last day of a month can settle in the next month. The sale and the deposit then fall in different periods.' },
            { title: 'Refunds and chargebacks', body: 'Refunds reduce a later payout. A dispute can hold or reverse funds without a matching entry in the sales records.' },
            { title: 'Missing or duplicate payments', body: 'An order marked paid with no payment behind it, or a charge taken twice, only shows up when the sales records are compared to the processor data.' },
          ],
        },
        {
          heading: 'How to check a payout against the books',
          steps: [
            { title: 'Pick one payout', body: 'Take a single processor payout and its date and net amount, and find the matching bank deposit in QuickBooks.' },
            { title: 'List the transactions inside it', body: 'Export the processor\'s transaction list for that payout: gross sales, fees, refunds and adjustments, each with an order or charge reference.' },
            { title: 'Rebuild the net amount', body: 'Gross sales minus fees minus refunds and adjustments should equal the payout. If it does not, the gap is the first thing to investigate.' },
            { title: 'Match each transaction to a sale', body: 'Compare the processor transactions with the orders or invoices in your books by reference. Anything with no counterpart is an exception: a payment with no sale, or a sale with no payment.' },
            { title: 'Record what is real, flag the rest', body: 'Record fees and refunds that were missing. Investigate unmatched items with the processor before changing the books.' },
          ],
        },
        {
          heading: 'Doing it for every payout',
          paragraphs: [
            'One payout is easy to check by hand. A store with daily payouts across Stripe, PayPal and Shopify Payments has dozens each month. The check is the same each time, which is why it is worth automating: compare each payout\'s transactions with the sales records, and list only the exceptions.',
          ],
        },
      ]}
      faq={[
        { q: 'Why does my QuickBooks deposit not match my Stripe payout?', a: 'Stripe pays out net of fees, refunds and adjustments, in batches. The books usually hold gross sales, so the totals differ until fees and refunds are accounted for and the batch is broken into its transactions.' },
        { q: 'Why does a Shopify payout not match QuickBooks?', a: 'Shopify payouts are net of fees and refunds and cover a set of orders. Compare the transactions inside the payout with the orders in the books, not just the totals.' },
        { q: 'Is there a tool that checks QuickBooks deposits against payouts?', a: 'Several categories of tool exist: accounting sync apps that post sales and fees into QuickBooks, enterprise reconciliation platforms, and audit tools that compare sources and report exceptions. Pick by whether you need entries posted or discrepancies found.' },
        { q: 'Does Fincile connect to QuickBooks?', a: 'A read-only QuickBooks Online connection, to compare QuickBooks deposits and payments against another source, is being rolled out and is not available to everyone yet. Fincile does not post entries to QuickBooks.' },
      ]}
      cta={{
        heading: 'Fincile audits payouts against orders',
        body: 'Fincile compares Shopify orders with Stripe, PayPal and other gateway records and reports missing payments, duplicates and refund mismatches. It does not change your books.',
      }}
    />
  );
}
