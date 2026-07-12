import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogStripeShopify() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Shopify + Stripe Reconciliation: Why Your Payouts Don\'t Match | Fincile';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'A complete guide to reconciling Shopify orders against Stripe payouts. Learn the 6 most common causes of Stripe-Shopify mismatches and how to fix them.');
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
            <span className="text-navy font-medium">Stripe + Shopify Reconciliation</span>
          </div>

          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-4">Payment Reconciliation</span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>
              Shopify + Stripe Reconciliation: Why Your Payouts Don't Match Your Orders
            </h1>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <span>By Krishna Mandala</span>
              <span>·</span>
              <span>July 2026</span>
              <span>·</span>
              <span>7 min read</span>
            </div>
          </div>

          <article>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Stripe is the most popular payment gateway for Shopify merchants — and also the source of the most reconciliation confusion. If you've ever exported your Shopify orders and your Stripe payouts and tried to match them manually, you know the problem: the numbers almost never line up cleanly.
            </p>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              This isn't a Stripe bug or a Shopify bug. It's a structural gap between how the two platforms record transactions. Understanding it is the first step to fixing it.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">How Shopify and Stripe record transactions differently</h2>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Shopify records a transaction at the order level — one line per order, with the total amount the customer paid. Stripe records transactions at the charge level — including authorizations, captures, refunds, disputes, and fees as separate line items.
            </p>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              A single Shopify order can generate up to six separate Stripe records: an authorization, a capture, a Stripe processing fee, a payout batch entry, possibly a refund, and possibly a dispute record. Reconciliation means mapping all of these back to one Shopify order — correctly.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">The 6 most common Stripe-Shopify mismatch causes</h2>
            <div className="space-y-6 mb-8">
              {[
                {
                  num: '1',
                  title: 'Stripe processing fees are deducted from the payout, not shown in Shopify',
                  body: 'Stripe charges 2.9% + $0.30 per transaction (or your negotiated rate). These fees are deducted before your payout lands in your bank. Shopify shows the gross amount the customer paid. If you\'re comparing Shopify totals to Stripe payouts, you\'ll always see a gap equal to your Stripe fees — this is expected, but still needs to be accounted for in your books.'
                },
                {
                  num: '2',
                  title: 'Stripe batches payouts across multiple days',
                  body: 'Stripe\'s default payout schedule is a 2-day rolling basis. Orders from Monday and Tuesday may arrive in a single Wednesday payout. Shopify reports sales by the date of the order; Stripe reports by the date of settlement. Matching on date ranges without accounting for this delay causes apparent mismatches that are actually just timing differences.'
                },
                {
                  num: '3',
                  title: 'Refunds create separate Stripe records not linked to the original charge ID in Shopify',
                  body: 'When you issue a refund in Shopify, Stripe creates a new refund record with its own ID. The original charge record remains in Stripe as a separate entry. Without reconciliation, you may count both the original charge and the refund as revenue, overstating your income.'
                },
                {
                  num: '4',
                  title: 'Chargebacks deduct from future payouts silently',
                  body: 'When a customer disputes a charge, Stripe deducts the disputed amount plus a $15 dispute fee from your next payout. This doesn\'t update the Shopify order status — the order still shows "Paid." Without reconciliation, chargebacks are invisible in your Shopify revenue view.'
                },
                {
                  num: '5',
                  title: 'Partial captures and authorization holds',
                  body: 'Some orders — particularly for pre-orders, subscriptions, or high-risk items — are authorized but not immediately captured. If the capture fails or is never completed, Stripe records no charge, but Shopify may still show the order as "Authorized." These represent revenue Shopify expected but Stripe never collected.'
                },
                {
                  num: '6',
                  title: 'Currency conversion creates systematic rounding differences',
                  body: 'If your Shopify store accepts multiple currencies but your Stripe account settles in a single currency, every cross-currency transaction involves a conversion. Stripe applies its own exchange rate; Shopify reports in the customer\'s currency. The resulting rounding differences accumulate at scale and appear as unexplained gaps in your reconciliation.'
                },
              ].map(item => (
                <div key={item.num} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-cta flex items-center justify-center text-primary-foreground text-sm font-bold">{item.num}</div>
                  <div>
                    <div className="font-semibold text-navy mb-1">{item.title}</div>
                    <div className="text-sm text-text-secondary leading-relaxed">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">How to reconcile Shopify orders with Stripe payouts manually</h2>
            <p className="text-base leading-relaxed text-text-secondary mb-4">
              The correct approach matches on <strong className="text-navy">Stripe charge ID</strong>, not on order amount or date. Here's the process:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Export Shopify orders as CSV (include the "Payment reference" column — this is the Stripe charge ID)',
                'Export Stripe payments as CSV from the Stripe Dashboard → Payments → Export',
                'Join the two datasets on the Stripe charge ID (VLOOKUP in Excel, or MATCH in Google Sheets)',
                'For matched rows, compare: Shopify order total vs. Stripe charge amount (gross, before fees)',
                'Separately, export Stripe fee data and subtract to get net amounts',
                'Flag any Shopify orders with no matching Stripe charge ID — these are potential ghost orders',
                'Export Stripe refunds and disputes separately and reconcile against Shopify refund records',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                  <span className="text-base text-text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">How long does Shopify-Stripe reconciliation take?</h2>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              For a store processing 100 orders per month: 1–2 hours. For 500 orders: half a day. For 2,000+ orders: you need a dedicated process or automated tooling. The manual approach also doesn't scale — every new transaction type (refunds, disputes, multi-currency) adds another layer of joins and transformations to your spreadsheet.
            </p>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              More critically, manual reconciliation happens monthly at best. By the time you catch a discrepancy, the trail for investigating it (Stripe logs, customer emails, gateway records) may be weeks old and harder to trace.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">What to do when you find a Stripe-Shopify discrepancy</h2>
            <ul className="space-y-3 mb-8">
              {[
                'If a Shopify order has no Stripe charge ID: the payment may have failed at authorization. Check the Stripe dashboard for a declined charge on the same date and amount.',
                'If the amounts differ by your Stripe fee rate: this is expected — account for fees separately in your books, don\'t treat it as a discrepancy.',
                'If a charge appears in Stripe with no matching Shopify order: this may be a duplicate charge. Contact Stripe support with both charge IDs.',
                'If a refund appears in Stripe but not in Shopify: the refund may have been issued directly from the Stripe dashboard. Check your Shopify order timeline and update it manually if needed.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                  <span className="text-base text-text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 bg-navy rounded-xl p-8 text-center">
              <div className="text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-3">Automate this entirely</div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">Fincile does this in minutes, not hours</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-md mx-auto">
                Connect Shopify + Stripe via OAuth. Fincile pulls every order, every charge, every refund and dispute, and cross-references them automatically using cent-safe arithmetic. Discrepancies surface immediately with the exact order ID and variance amount.
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
              <p className="text-xs text-primary-foreground/40 mt-4">No credit card required · Read-only Stripe access · Results in minutes</p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
