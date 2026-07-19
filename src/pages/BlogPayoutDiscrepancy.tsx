import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeoMeta, blogPostingSchema, breadcrumbSchema, combineSchemas } from '@/lib/seo';

const TITLE = '5 Signs Your Shopify Payouts Are Wrong (And What to Do) | Fincile';
const DESCRIPTION = '5 warning signs that your Shopify store has a payout discrepancy — and the exact steps to investigate and fix each one.';
const PATH = '/blog/shopify-payout-discrepancy';

export default function BlogPayoutDiscrepancy() {
  useSeoMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    structuredData: combineSchemas(
      blogPostingSchema({
        headline: '5 Signs Your Shopify Payouts Are Wrong — And What to Do About Each One',
        description: DESCRIPTION,
        path: PATH,
        datePublished: '2026-07-12',
      }),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: '5 Signs Your Payouts Are Wrong' },
      ]),
    ),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">

          <div className="flex items-center gap-2 text-xs text-text-secondary mb-8">
            <Link to="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-teal transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-navy font-medium">5 Signs Your Payouts Are Wrong</span>
          </div>

          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-4">Revenue Reconciliation</span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>
              5 Signs Your Shopify Payouts Are Wrong — And What to Do About Each One
            </h1>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <span>By Krishna Mandala</span>
              <span>·</span>
              <span>July 2026</span>
              <span>·</span>
              <span>6 min read</span>
            </div>
          </div>

          <article>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Most Shopify merchants never actively verify that the revenue Shopify reports actually matches what lands in their bank account. The assumption is that the numbers are right — and most of the time, they roughly are. But "roughly" isn't good enough when you're making hiring decisions, negotiating supplier contracts, or talking to investors based on those numbers.
            </p>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Here are five warning signs that your Shopify payout doesn't match your bank balance for a real, fixable reason — and the exact steps to investigate each one.
            </p>

            {[
              {
                sign: '1',
                title: 'Your Shopify revenue and bank deposits never match exactly',
                body: 'If you\'ve accepted this as normal, it isn\'t. A consistent gap between Shopify-reported revenue and actual bank deposits — even a small one — usually means one of: Stripe or PayPal fees aren\'t being accounted for, a recurring refund or chargeback pattern isn\'t surfacing in your reports, or currency conversion rates are applied inconsistently.',
                fix: 'Export your Shopify financial summary for the last 30 days. Export your bank statement for the same period. The difference should equal exactly: gateway processing fees + any outstanding refunds in transit. If it doesn\'t, you have an unaccounted variance worth investigating.',
              },
              {
                sign: '2',
                title: 'You\'ve ever issued a refund and couldn\'t confirm it went through',
                body: 'Refunds in Shopify generate a refund record in Shopify. But the actual reversal of funds depends on your payment gateway processing it correctly. In high-volume stores, refunds occasionally fail silently — the customer doesn\'t receive their money, and the merchant\'s Shopify dashboard shows the refund as processed.',
                fix: 'For any refund over $50, confirm the refund record in your gateway dashboard (Stripe → Refunds, PayPal → Activity) matches the Shopify refund record. Check that the refund ID exists in both systems and that the status shows "succeeded" in the gateway — not just "refunded" in Shopify.',
              },
              {
                sign: '3',
                title: 'Your accountant finds unexplained entries in your bank reconciliation every month',
                body: 'If your bookkeeper or accountant regularly flags "unmatched deposits" or "unexplained debits" in your monthly close, these are almost always gateway-level discrepancies that didn\'t surface in your Shopify reports. Common culprits: dispute fees deducted directly from payouts, reserve amounts held by gateways, and rolling payout batches that split across accounting periods.',
                fix: 'Ask your accountant for a list of the specific unmatched amounts and dates. Cross-reference each one against your Stripe or PayPal payout reports for the same date range. Dispute fees, reserves, and adjustment entries will show up in the gateway\'s payout detail report but not in Shopify.',
              },
              {
                sign: '4',
                title: 'You use more than one payment gateway simultaneously',
                body: 'Stores that accept both Stripe and PayPal (or Shopify Payments and an alternative gateway) have a fundamentally harder reconciliation problem. Each gateway has its own reporting format, its own payout schedule, and its own fee structure. Orders don\'t always route to the same gateway — customer choice and retry logic can split a single day\'s sales across both.',
                fix: 'Map every Shopify order to its payment method (visible in the Order detail view under Payment). Group orders by gateway. Reconcile each gateway separately against its own payout export. Never mix gateway payout data across providers — the IDs and formats aren\'t compatible.',
              },
              {
                sign: '5',
                title: 'Your revenue growth looks smoother in Shopify than in your bank account',
                body: 'This is the subtlest sign and the most telling. If your Shopify sales chart shows consistent upward growth but your bank balance tells a bumpier story, the smoothing effect is usually caused by phantom revenue — orders Shopify counts as collected that your gateway is still processing, or that were actually declined after the order was recorded. Over time, this creates a systematic gap between reported and actual revenue.',
                fix: 'Run a cohort comparison: take all orders from 60 days ago (old enough for all settlements to have completed) and compare the total Shopify reported revenue for that cohort against the total amount that actually appeared in your bank for the same orders. Any difference is your real discrepancy rate.',
              },
            ].map(item => (
              <div key={item.sign} className="mb-10">
                <div className="flex gap-4 items-start mb-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full gradient-cta flex items-center justify-center text-primary-foreground text-sm font-bold">{item.sign}</div>
                  <h2 className="text-lg font-bold text-navy leading-snug pt-1">{item.title}</h2>
                </div>
                <p className="text-base text-text-secondary leading-relaxed mb-4 pl-13">{item.body}</p>
                <div className="ml-13 bg-teal-light border border-teal/20 rounded-lg p-4" style={{ marginLeft: '52px' }}>
                  <div className="text-xs font-bold text-teal-text uppercase tracking-wider mb-2">What to do</div>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.fix}</p>
                </div>
              </div>
            ))}

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">How many of these apply to your store?</h2>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              If even one of these signs matches your situation, it's worth running a proper reconciliation. For most merchants, the first audit uncovers discrepancies they had no idea existed — ranging from small fee accounting gaps to genuine missing settlements worth hundreds or thousands of dollars.
            </p>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              The earlier you catch them, the easier they are to investigate and recover. Gateway support teams can re-investigate settlements up to 90–180 days old in most cases. After that window, the trail goes cold.
            </p>

            <div className="mt-12 bg-navy rounded-xl p-8 text-center">
              <div className="text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-3">Run your first audit free</div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">Find out in 5 minutes if your payouts are accurate</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-md mx-auto">
                Fincile connects to your Shopify store and payment gateways, cross-references every order, and shows you exactly where the numbers don't match — including the order ID, the variance amount, and the likely cause.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://app.getfincile.com" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 px-7 rounded-md text-sm font-semibold bg-teal text-navy hover:opacity-90 transition-all">
                  Try Free — Up to 100 Orders →
                </a>
                <Link to="/" className="inline-flex items-center justify-center h-11 px-7 rounded-md text-sm font-semibold border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-all">
                  Learn more
                </Link>
              </div>
              <p className="text-xs text-primary-foreground/40 mt-4">No credit card required · Read-only access · Results in minutes</p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
