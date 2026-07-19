import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeoMeta, blogPostingSchema, breadcrumbSchema, combineSchemas } from '@/lib/seo';

const TITLE = 'Shopify Duplicate Charges on Stripe: Causes and How to Find Them | Fincile';
const DESCRIPTION = 'Why Stripe sometimes charges a Shopify customer twice for one order, how to find every duplicate charge in your account, and how to stop it happening again.';
const PATH = '/blog/shopify-duplicate-charge-stripe';

export default function BlogDuplicateChargesStripe() {
  useSeoMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    structuredData: combineSchemas(
      blogPostingSchema({
        headline: 'Shopify Duplicate Charges on Stripe: Causes and How to Find Them',
        description: DESCRIPTION,
        path: PATH,
        datePublished: '2026-07-19',
      }),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Shopify Duplicate Charges on Stripe' },
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
            <span className="text-navy font-medium">Shopify Duplicate Charges on Stripe</span>
          </div>

          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-4">
              Payment Reconciliation
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>
              Shopify Duplicate Charges on Stripe: Causes and How to Find Them
            </h1>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <span>By Krishna Mandala</span>
              <span>·</span>
              <span>July 2026</span>
              <span>·</span>
              <span>6 min read</span>
            </div>
          </div>

          <article className="prose-article">

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              A duplicate charge means Stripe successfully collected payment for the same Shopify order more than once. It's not a common failure, but it happens often enough — and quietly enough — that most merchants don't discover it until a customer complains or a bookkeeper flags an odd pattern in the Stripe payout report.
            </p>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              The financial risk cuts both ways: you owe the customer a refund for the second charge, and if you don't catch it first, they'll file a dispute — which costs you a chargeback fee on top of the refund.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Why Stripe double-charges a Shopify order</h2>

            <ul className="space-y-3 mb-8">
              {[
                { title: 'Checkout retry on a slow connection', desc: 'The customer clicks "Pay" and the page appears to hang, so they click again. If the first request actually succeeded server-side but the confirmation was slow to return, both clicks can produce a successful charge.' },
                { title: 'Idempotency key not set (or reused incorrectly)', desc: 'Stripe\'s API is designed to prevent duplicate charges when a request is retried with the same idempotency key. If a checkout integration doesn\'t set one — or generates a new key on every retry instead of reusing it — Stripe has no way to recognize the retry as the same request.' },
                { title: 'Webhook-triggered double fulfillment', desc: 'Some custom checkout flows charge the card directly from a webhook handler. If the webhook fires twice (which Stripe\'s own documentation says can happen and integrations must handle), and the handler isn\'t idempotent, the card gets charged twice.' },
                { title: 'Split payment methods', desc: 'A customer starts checkout with a saved card, the payment appears to fail, they switch to a different card and complete the order — but the first charge actually went through moments later, after the perceived failure.' },
              ].map(item => (
                <li key={item.title} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                  <span className="text-base text-text-secondary leading-relaxed">
                    <strong className="text-navy">{item.title}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">How to find duplicate charges manually</h2>

            <div className="space-y-6 mb-8">
              {[
                {
                  step: '1',
                  title: 'Export Stripe charges for the period',
                  body: 'Stripe Dashboard → Payments → Export. Include customer ID, amount, and the order metadata field if your integration passes the Shopify order number through.'
                },
                {
                  step: '2',
                  title: 'Group by customer and amount',
                  body: 'Sort the export by customer email or ID, then by amount. Two identical charges to the same customer within a short window (minutes, not days) are the clearest signal of a duplicate.'
                },
                {
                  step: '3',
                  title: 'Cross-check against the Shopify order',
                  body: 'Each Shopify order should map to exactly one successful Stripe charge. If a single order ID appears linked to two separate charge IDs in Stripe, that\'s your duplicate.'
                },
                {
                  step: '4',
                  title: 'Confirm before refunding',
                  body: 'Check the charge timestamps and the order\'s edit history in Shopify — occasionally a genuinely separate second order looks like a duplicate at a glance. Confirm the order number, amount, and timing all line up before issuing a refund.'
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

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Why this is hard to catch at scale</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              At low order volumes, an eyeballed scan of the Stripe dashboard can surface obvious duplicates. Past a few hundred orders a month, it stops being realistic — duplicates hide inside a payout report with thousands of line items, and the two charges are often separated by exactly the amount of time it takes a customer to click "Pay" twice, which varies from a few seconds to a few minutes.
            </p>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              The fix isn't a smarter spreadsheet — it's matching every Stripe charge to its Shopify order automatically, so any order with more than one successful charge attached to it gets flagged the moment it happens, not discovered a month later during bookkeeping.
            </p>

            <div className="mt-12 bg-navy rounded-xl p-8 text-center">
              <div className="text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-3">Built for this problem</div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                Fincile flags every duplicate charge automatically
              </h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-md mx-auto">
                Connect Shopify and Stripe, and Fincile matches every order to its charges — surfacing duplicates, missing payments, and refund mismatches with the order ID and variance amount attached.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://app.getfincile.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 px-7 rounded-md text-sm font-semibold bg-teal text-navy hover:opacity-90 active:scale-[0.98] transition-all"
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
