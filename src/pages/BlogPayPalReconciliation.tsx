import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeoMeta, blogPostingSchema } from '@/lib/seo';

const TITLE = 'Shopify + PayPal Reconciliation: Why Payments Go Missing | Fincile';
const DESCRIPTION = 'PayPal reconciliation on Shopify has different failure modes than card processors. Learn why PayPal payments go missing and how to reconcile every transaction correctly.';
const PATH = '/blog/shopify-paypal-reconciliation';

export default function BlogPayPalReconciliation() {
  useSeoMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    structuredData: blogPostingSchema({
      headline: 'Shopify + PayPal Reconciliation: Why Payments Go Missing',
      description: DESCRIPTION,
      path: PATH,
      datePublished: '2026-07-19',
    }),
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
            <span className="text-navy font-medium">Shopify + PayPal Reconciliation</span>
          </div>

          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-4">
              Payment Reconciliation
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>
              Shopify + PayPal Reconciliation: Why Payments Go Missing
            </h1>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <span>By Krishna Mandala</span>
              <span>·</span>
              <span>July 2026</span>
              <span>·</span>
              <span>7 min read</span>
            </div>
          </div>

          <article className="prose-article">

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              PayPal reconciliation is a different problem from Stripe reconciliation, even though merchants often treat them the same way. PayPal customers can complete checkout entirely outside Shopify's payment flow — logging into their own PayPal account, sometimes on a different device — which creates more points where the two systems can lose sync with each other.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Why PayPal payments go missing on Shopify</h2>

            <ul className="space-y-3 mb-8">
              {[
                { title: 'IPN (Instant Payment Notification) delays', desc: 'PayPal confirms payment to Shopify via IPN, which can arrive minutes after the customer completes checkout — or fail to arrive at all under PayPal-side outages. Shopify sometimes shows an order as pending indefinitely because the confirmation never landed.' },
                { title: 'eCheck payments clear later', desc: 'When a customer pays via PayPal using a linked bank account rather than a card or PayPal balance, PayPal processes it as an eCheck — which can take 3–5 business days to clear. Shopify may mark the order paid immediately while PayPal shows it as pending until it clears (or fails).' },
                { title: 'Currency conversion mismatches', desc: 'For international orders, PayPal applies its own currency conversion at the time of settlement, which can differ from the rate Shopify displayed at checkout. The order total in Shopify and the amount that actually settles in PayPal won\'t match exactly — this is expected, but it needs to be reconciled, not ignored.' },
                { title: 'PayPal holds and reserves', desc: 'PayPal can place a temporary hold or rolling reserve on payouts for new or high-risk accounts, meaning the money shows as "completed" in the transaction but isn\'t actually available in your PayPal balance yet.' },
              ].map(item => (
                <li key={item.title} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                  <span className="text-base text-text-secondary leading-relaxed">
                    <strong className="text-navy">{item.title}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">How to reconcile Shopify orders against PayPal</h2>

            <div className="space-y-6 mb-8">
              {[
                {
                  step: '1',
                  title: 'Export Shopify orders paid via PayPal',
                  body: 'Filter your Shopify order export by payment gateway = PayPal. This isolates the subset of orders you need to check against PayPal specifically, rather than reconciling your entire order book against one report.'
                },
                {
                  step: '2',
                  title: 'Export the PayPal Activity report',
                  body: 'PayPal → Activity → Statements → Download. Choose a custom date range and include the transaction ID column — this is what you\'ll match against Shopify\'s PayPal transaction reference.'
                },
                {
                  step: '3',
                  title: 'Match on PayPal transaction ID, not order total',
                  body: 'Shopify stores the PayPal transaction ID against each order. Match on this ID rather than the amount — currency conversion and fee deductions mean amounts alone are unreliable for matching.'
                },
                {
                  step: '4',
                  title: 'Flag anything still pending after 5 business days',
                  body: 'Legitimate eCheck clearing takes up to 5 business days. Anything still pending after that window is worth investigating directly with PayPal — it may indicate a failed eCheck that Shopify never got notified about.'
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

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Reconciling PayPal alongside other gateways</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Most Shopify stores running PayPal alongside Stripe or Shopify Payments end up building two separate reconciliation processes — because the two gateways report data in incompatible formats, on different payout schedules, with different failure modes. That doubling of manual work is usually where reconciliation stops happening consistently.
            </p>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              The more reliable approach treats every gateway the same way: match every order to its settlement automatically, regardless of which processor it went through, and surface exceptions — missing payments, pending eChecks past the clearing window, currency mismatches — in one place.
            </p>

            <div className="mt-12 bg-navy rounded-xl p-8 text-center">
              <div className="text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-3">Built for this problem</div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                Fincile reconciles PayPal, Stripe, and Shopify Payments together
              </h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-md mx-auto">
                One audit across all your gateways — Fincile matches every Shopify order to its PayPal, Stripe, or Shopify Payments settlement and flags exactly where they don't line up.
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
