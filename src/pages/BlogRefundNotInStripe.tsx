import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeoMeta, blogPostingSchema, breadcrumbSchema, combineSchemas } from '@/lib/seo';

const TITLE = 'Shopify Refund Not Showing in Stripe? Here\'s Why | Fincile';
const DESCRIPTION = 'A Shopify refund can look complete while the money never actually leaves your Stripe balance. Here\'s how to verify every refund actually settled — and what to do when one didn\'t.';
const PATH = '/blog/shopify-refund-not-in-stripe';

export default function BlogRefundNotInStripe() {
  useSeoMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    structuredData: combineSchemas(
      blogPostingSchema({
        headline: 'Shopify Refund Not Showing in Stripe? Here\'s Why',
        description: DESCRIPTION,
        path: PATH,
        datePublished: '2026-07-19',
      }),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Shopify Refund Not in Stripe' },
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
            <span className="text-navy font-medium">Shopify Refund Not in Stripe</span>
          </div>

          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-4">
              Payment Reconciliation
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>
              Shopify Refund Not Showing in Stripe? Here's Why
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
              You issue a refund from the Shopify admin, the order updates to "Refunded," and you move on. But the Shopify refund record only reflects Shopify's side of the transaction — it doesn't guarantee that Stripe actually returned the money to the customer. When those two systems disagree, the customer is the one who notices first, usually by emailing to ask where their refund is.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Why a Shopify refund doesn't always reach Stripe</h2>

            <ul className="space-y-3 mb-8">
              {[
                { title: 'The original charge was already refunded', desc: 'If a refund was issued directly in Stripe first — by a support agent, for example — and then someone refunds the same order in Shopify without checking, Stripe will reject the second refund attempt or the app integration will fail silently.' },
                { title: 'The charge is too old to refund', desc: 'Stripe charges typically become non-refundable after a set window tied to the original payment method (commonly around 180 days for cards). Shopify still lets you mark the order as refunded even if the Stripe-side refund silently failed.' },
                { title: 'Partial refund amount mismatch', desc: 'Shopify allows refunding shipping, tax, and line items independently. If the app connecting Shopify to Stripe doesn\'t sum these correctly, the amount sent to Stripe\'s refund API can be less than the amount shown as refunded in Shopify.' },
                { title: 'API or webhook failure', desc: 'The refund request to Stripe\'s API can fail — network timeout, expired API key, rate limiting — while the Shopify-side UI still shows the refund as complete because that update happens independently.' },
              ].map(item => (
                <li key={item.title} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                  <span className="text-base text-text-secondary leading-relaxed">
                    <strong className="text-navy">{item.title}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">How to verify a refund actually settled</h2>

            <div className="space-y-6 mb-8">
              {[
                {
                  step: '1',
                  title: 'Get the Shopify refund record',
                  body: 'Open the order in Shopify and note the refund amount, date, and the transaction ID shown under the refund line.'
                },
                {
                  step: '2',
                  title: 'Find the matching Stripe refund',
                  body: 'In Stripe, search by the original charge ID or customer email. Confirm a refund object exists with a matching amount and a "succeeded" status — not just "pending."'
                },
                {
                  step: '3',
                  title: 'Check the amount, not just existence',
                  body: 'A refund can exist in Stripe but for the wrong amount — especially with partial refunds. Compare the exact figure, not just whether a refund record is present.'
                },
                {
                  step: '4',
                  title: 'Escalate mismatches immediately',
                  body: 'If Shopify shows refunded but Stripe shows no matching refund (or a failed one), issue the refund manually in Stripe and note the discrepancy — this is a case where the customer is owed money that never actually moved.'
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

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Why this matters more than a missing payment</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              A missing payment costs you money silently. A failed refund costs you a customer loudly — they know exactly how much they're owed and exactly when they expected it. Left unresolved, a failed refund very often turns into a chargeback, which adds a dispute fee on top of the refund you already owed.
            </p>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Checking every refund manually doesn't scale past a handful of orders a week. The reliable approach is matching every Shopify refund record against its corresponding Stripe refund automatically, so any mismatch — wrong amount, missing refund, or failed status — surfaces before the customer has to ask.
            </p>

            <div className="mt-12 bg-navy rounded-xl p-8 text-center">
              <div className="text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-3">Built for this problem</div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                Fincile verifies every refund automatically
              </h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-md mx-auto">
                Fincile cross-references every Shopify refund against your Stripe and PayPal records and flags any refund that didn't actually settle — with the order ID and exact variance amount.
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
