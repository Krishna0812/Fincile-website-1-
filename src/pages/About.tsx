import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeoMeta, SITE_URL } from '@/lib/seo';

const TITLE = 'About Fincile — Shopify Payout Reconciliation, Built for Merchants';
const DESCRIPTION = 'Fincile exists because Shopify payouts shouldn\'t require a spreadsheet and a prayer. Here\'s why we built it and what it actually does.';
const PATH = '/about';

export default function About() {
  useSeoMeta({
    title: `${TITLE} | Fincile`,
    description: DESCRIPTION,
    path: PATH,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: TITLE,
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      mainEntity: {
        '@type': 'Organization',
        name: 'Fincile',
        url: SITE_URL,
      },
    },
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
            <span className="text-navy font-medium">About</span>
          </div>

          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-4">
              About Fincile
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>
              Shopify payouts shouldn't require a spreadsheet and a prayer
            </h1>
          </div>

          <article className="prose-article">

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Every Shopify merchant hits the same moment: the bank deposit doesn't match what Shopify says you sold. Most of the time it's an ordinary combination of fees, refunds, and timing. Sometimes it's a missing payment, a duplicate charge, or a refund that never actually settled — and there's no built-in way to tell the difference without exporting three systems into a spreadsheet and matching every row by hand.
            </p>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Fincile exists to close that gap automatically. It connects to your Shopify orders and your payment gateways — Stripe, PayPal, Shopify Payments, and 11+ others — and matches every transaction line by line, so discrepancies surface within minutes instead of getting discovered three months later during tax prep.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">What Fincile checks</h2>

            <ul className="space-y-3 mb-8">
              {[
                'Missing payments — orders marked paid in Shopify with no matching charge in your processor.',
                'Duplicate charges — the same order charged more than once.',
                'Refund mismatches — refunds recorded in Shopify with no confirmed evidence in the gateway.',
                'Settlement gaps — Shopify order totals that don\'t match gateway payout records.',
                'Processor fee errors — the actual net amount received, verified per order.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                  <span className="text-base text-text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Who's behind it</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Fincile is built and run by Krishna Mandala. It's an early-stage, independently built product — we'd rather say that plainly than dress it up. If you want to know more about how it works, ask us directly at{' '}
              <a href="mailto:support@getfincile.com" className="text-teal hover:underline">support@getfincile.com</a>{' '}
              — we read every email.
            </p>

            <div className="mt-12 bg-navy rounded-xl p-8 text-center">
              <div className="text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-3">See it on your own store</div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                Run a free audit in under 5 minutes
              </h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-md mx-auto">
                Connect your Shopify store and payment gateways — read-only access, no credit card required.
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
            </div>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
