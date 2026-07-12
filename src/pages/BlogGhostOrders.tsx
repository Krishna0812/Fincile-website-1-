import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogGhostOrders() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'What Are Ghost Orders on Shopify? How to Detect and Fix Payout Gaps | Fincile';
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-8">
            <Link to="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-teal transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-navy font-medium">Ghost Orders on Shopify</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-4">
              Revenue Reconciliation
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>
              What Are Ghost Orders on Shopify? How to Detect and Fix Payout Gaps
            </h1>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <span>By Krishna Mandala</span>
              <span>·</span>
              <span>July 2026</span>
              <span>·</span>
              <span>8 min read</span>
            </div>
          </div>

          {/* Article body */}
          <article className="prose-article">

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              If you run a Shopify store, there's a good chance your revenue numbers are wrong — and not because of a reporting bug. The discrepancy is usually caused by what payment reconciliation professionals call <strong className="text-navy">ghost orders</strong>: transactions that Shopify recorded as successfully paid, but that your payment gateway never actually settled.
            </p>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Most merchants never notice. Shopify's dashboard shows a clean "Paid" status. The gateway account shows a slightly different total. The difference gets attributed to fees, timing, or a vague sense that "the numbers are always a bit off." Over months, this gap can represent thousands of dollars in unrecovered revenue.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Why ghost orders happen</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Shopify marks an order as "Paid" the moment the customer completes checkout — before the payment gateway has confirmed that the funds actually transferred. In most cases, the gateway confirms immediately and everything lines up. But several scenarios can break this flow:
            </p>

            <ul className="space-y-3 mb-8">
              {[
                { title: 'Gateway timeouts', desc: 'The customer\'s bank authorises the charge, but a network timeout means the gateway never receives the confirmation. Shopify marks the order paid; the settlement never arrives.' },
                { title: 'Webhook failures', desc: 'Shopify notifies your gateway via webhook when an order completes. If that webhook fails silently, the payout is never triggered.' },
                { title: 'Retry logic errors', desc: 'Some gateways retry failed charges and record both the failure and the eventual success. Without reconciliation, you may count revenue that was charged twice but settled once — or vice versa.' },
                { title: 'Partial refunds', desc: 'A refund processes on one side (Shopify or the gateway) but not the other. The order still shows as paid in full on Shopify, while the gateway shows a different net amount.' },
                { title: 'Chargeback settlements', desc: 'Chargebacks reduce your gateway payout without updating the Shopify order status. The order stays "Paid" in Shopify; the money is gone from your bank.' },
              ].map(item => (
                <li key={item.title} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                  <span className="text-base text-text-secondary leading-relaxed">
                    <strong className="text-navy">{item.title}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">How to detect ghost orders manually</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              The manual process requires exporting data from both Shopify and your gateway, then matching every order to its corresponding payout. Here's how to do it:
            </p>

            <div className="space-y-6 mb-8">
              {[
                {
                  step: '1',
                  title: 'Export your Shopify orders',
                  body: 'Go to Orders → Export → select your date range and choose "All orders". You\'ll get a CSV with order IDs, amounts, payment status, and gateway used.'
                },
                {
                  step: '2',
                  title: 'Export your gateway settlement report',
                  body: 'In Stripe: Payments → Export → Payouts. In PayPal: Activity → Statements. In Shopify Payments: Finances → Payouts. Export the same date range as your Shopify orders.'
                },
                {
                  step: '3',
                  title: 'Match on order ID',
                  body: 'Each Shopify order should correspond to a gateway transaction. Use VLOOKUP (Excel) or MATCH (Google Sheets) to join on the order ID or reference number. Orders that appear in Shopify but have no matching gateway transaction are your ghost orders.'
                },
                {
                  step: '4',
                  title: 'Check the amounts',
                  body: 'For matched orders, compare the Shopify order total against the gateway settlement amount. Differences may indicate partial refunds, fees applied incorrectly, or rounding errors in the gateway\'s currency conversion.'
                },
                {
                  step: '5',
                  title: 'Investigate each exception',
                  body: 'For each unmatched or mismatched order, check the order timeline in Shopify and the transaction history in your gateway dashboard. Look for failed webhooks, duplicate charges, or chargeback records.'
                },
              ].map(item => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-cta flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-semibold text-navy mb-1">{item.title}</div>
                    <div className="text-sm text-text-secondary leading-relaxed">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">The problem with manual reconciliation</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              For a store processing 200 orders per month, this manual process takes 3–5 hours. For 1,000 orders, it's a part-time job. And it needs to be done every month — because ghost orders don't stop accumulating.
            </p>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              The other issue is precision. Spreadsheet formulas use floating-point arithmetic, which introduces rounding errors when comparing currency amounts. A $0.01 discrepancy looks like a rounding error; it may actually be a systematic fee miscalculation applied to hundreds of orders.
            </p>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Proper reconciliation requires cent-safe integer arithmetic — comparing amounts in the smallest currency unit (cents, pence, paisa) rather than decimals. Most manual spreadsheet approaches don't do this, which means small discrepancies get dismissed rather than investigated.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">What to do when you find ghost orders</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Once you've identified orders that settled in Shopify but not in your gateway, you have a few options:
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Contact your payment gateway with the order reference number and request they investigate the missing settlement.',
                'Check if the payment was captured vs. only authorised — some gateways require a separate capture step that may have been missed.',
                'If the order is recent (under 90 days), you can request a manual re-settlement from most major gateways.',
                'For older orders, document the discrepancy for your accountant — it may be deductible as a business loss or adjustable against future tax liability.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                  <span className="text-base text-text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">How often should you reconcile?</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Monthly is the minimum for most merchants. If you're processing more than 500 orders per month or using multiple gateways simultaneously, weekly reconciliation is worth the investment — discrepancies are easier to investigate when they're fresh, and the compounding effect of undetected ghost orders grows quickly at higher volumes.
            </p>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              The right answer for most growing Shopify stores is automated reconciliation: a system that continuously cross-references Shopify orders against gateway payouts and surfaces exceptions immediately, rather than letting them accumulate for a monthly review.
            </p>

            {/* Fincile CTA */}
            <div className="mt-12 bg-navy rounded-xl p-8 text-center">
              <div className="text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-3">Built for this problem</div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                Fincile automates everything above
              </h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-md mx-auto">
                Connect your Shopify store via OAuth, select your gateway, and run your first audit in under 5 minutes. Stripe, PayPal, and Shopify Payments sync live via API. Results in minutes, not hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://app.getfincile.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 px-7 rounded-md text-sm font-semibold bg-teal text-navy hover:opacity-90 transition-all"
                >
                  Try Free — Up to 100 Orders →
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center h-11 px-7 rounded-md text-sm font-semibold border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-all"
                >
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
