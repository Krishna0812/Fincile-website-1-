import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeoMeta, blogPostingSchema } from '@/lib/seo';

const TITLE = 'Shopify Klarna & Afterpay Reconciliation: Why Payouts Don\'t Match | Fincile';
const DESCRIPTION = 'Klarna and Afterpay settle Shopify orders in installments, not all at once — which makes reconciliation harder than a normal card or PayPal payout. Here\'s how to reconcile BNPL orders correctly.';
const PATH = '/blog/shopify-bnpl-reconciliation';

export default function BlogBNPLReconciliation() {
  useSeoMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    structuredData: blogPostingSchema({
      headline: 'Shopify Klarna & Afterpay Reconciliation: Why Payouts Don\'t Match',
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
            <span className="text-navy font-medium">Klarna & Afterpay Reconciliation</span>
          </div>

          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-4">
              Payment Reconciliation
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>
              Shopify Klarna & Afterpay Reconciliation: Why Payouts Don't Match
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
              Buy-now-pay-later providers like Klarna and Afterpay solve a real conversion problem for Shopify merchants — but they introduce a reconciliation problem most merchants aren't prepared for. Unlike a card charge or a PayPal payment, the store gets paid upfront in full, while the BNPL provider collects from the customer over several installments. That mismatch between "when the order shows as paid" and "when the money actually settles" is where most BNPL reconciliation errors hide.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Why Klarna and Afterpay payouts are hard to reconcile</h2>

            <ul className="space-y-3 mb-8">
              {[
                { title: 'Batched, delayed payouts', desc: 'Both Klarna and Afterpay typically pay merchants on a rolling schedule (often 2–3 business days after the order, sometimes longer), bundling multiple orders into a single payout. One payout deposit can represent dozens of separate Shopify orders, each with its own fee deducted individually.' },
                { title: 'Merchant fees are higher and variable', desc: 'BNPL merchant fees typically run higher than standard card processing (often in the 4–6% range depending on volume and plan), and the fee structure can change based on installment plan or promotional period — making a flat fee assumption in your reconciliation wrong.' },
                { title: 'Order cancellations after settlement', desc: 'If a customer cancels or the order is fraudulent, the BNPL provider handles the customer-facing refund and repayment schedule directly — the deduction from your next payout can arrive weeks after the original order, disconnected from the original transaction date in your books.' },
                { title: 'Partial installment defaults', desc: 'If a customer misses installment payments to Klarna or Afterpay, that\'s the provider\'s credit risk, not yours — you were already paid in full. But some merchants mistakenly try to reconcile installment-level detail against their own books, when only the original lump-sum payout matters.' },
              ].map(item => (
                <li key={item.title} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                  <span className="text-base text-text-secondary leading-relaxed">
                    <strong className="text-navy">{item.title}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">How to reconcile BNPL payouts correctly</h2>

            <div className="space-y-6 mb-8">
              {[
                {
                  step: '1',
                  title: 'Export the BNPL provider\'s settlement report, not just the payout total',
                  body: 'Klarna and Afterpay both provide a merchant portal report breaking each payout down into individual order-level line items. The single deposit amount in your bank account isn\'t enough to reconcile against — you need the per-order breakdown.'
                },
                {
                  step: '2',
                  title: 'Match each Shopify order to its line item',
                  body: 'Use the order reference or Klarna/Afterpay transaction ID (both pass this back to Shopify at checkout) to match each order to its corresponding line in the settlement report.'
                },
                {
                  step: '3',
                  title: 'Verify the fee deducted matches your agreed rate',
                  body: 'Compare the net amount received per order against gross order value minus your contracted merchant fee. Rate discrepancies are common when merchants are moved between pricing tiers without notice.'
                },
                {
                  step: '4',
                  title: 'Track cancellation deductions separately',
                  body: 'When a BNPL order is cancelled or refunded, the deduction shows up in a later payout, not the original one. Keep a running log linking these deductions back to the original order so your books stay accurate across payout periods.'
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

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Why BNPL reconciliation gets skipped</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              BNPL usually represents a smaller share of total order volume than cards or PayPal, so it's the reconciliation work merchants deprioritize first — understandably, but it's also the gateway with the least transparent payout structure of the three, which makes it the one most likely to be hiding real fee or cancellation discrepancies.
            </p>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Treating Klarna, Afterpay, and every other gateway the same way — order matched automatically to its actual settlement, with any variance flagged — closes that gap without adding a separate manual process just for BNPL.
            </p>

            <div className="mt-12 bg-navy rounded-xl p-8 text-center">
              <div className="text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-3">Built for this problem</div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                Fincile reconciles Klarna and Afterpay too
              </h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-md mx-auto">
                Fincile reconciles Shopify orders across Klarna, Afterpay, Stripe, PayPal, and Shopify Payments — one audit, every gateway, exceptions flagged automatically.
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
