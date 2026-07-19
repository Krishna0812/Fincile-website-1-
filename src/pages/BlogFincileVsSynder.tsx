import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeoMeta, blogPostingSchema, breadcrumbSchema, combineSchemas } from '@/lib/seo';

const TITLE = 'Fincile vs Synder: Comparing Shopify Payout Reconciliation Options | Fincile';
const DESCRIPTION = 'Synder syncs multi-channel sales and payment data into your books. Fincile focuses specifically on catching Shopify payout errors — missing payments, duplicate charges, and settlement gaps. Here\'s the difference.';
const PATH = '/blog/fincile-vs-synder';

export default function BlogFincileVsSynder() {
  useSeoMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    structuredData: combineSchemas(
      blogPostingSchema({
        headline: 'Fincile vs Synder: Comparing Shopify Payout Reconciliation Options',
        description: DESCRIPTION,
        path: PATH,
        datePublished: '2026-07-18',
      }),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Fincile vs Synder' },
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

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-8">
            <Link to="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-teal transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-navy font-medium">Fincile vs Synder</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-4">
              Comparison
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>
              Fincile vs Synder: Comparing Shopify Payout Reconciliation Options
            </h1>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <span>By Krishna Mandala</span>
              <span>·</span>
              <span>July 2026</span>
              <span>·</span>
              <span>6 min read</span>
            </div>
          </div>

          {/* Article body */}
          <article className="prose-article">

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Synder is a broader multi-channel sync and reconciliation platform used by ecommerce sellers running across several sales channels and payment processors. It's a reasonable tool to compare against Fincile because both touch reconciliation — but they're built for different scopes of problem.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">What Synder is built for</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Synder positions itself as a multi-channel commerce and accounting sync tool — connecting sales channels (Shopify, Amazon, and others), payment processors, and accounting platforms, and offering reconciliation as part of a broader sync workflow. It's aimed at sellers who need one system handling data flow across several platforms at once, not just Shopify.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">What Fincile is built for</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Fincile is deliberately narrower: it's focused specifically on Shopify payout reconciliation — detecting missing payments, duplicate charges, refund mismatches, settlement gaps, and processor fee errors across Shopify Payments and 11+ payment gateways. It doesn't try to be a multi-channel sync platform; it tries to be very good at one specific job.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">The practical difference</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              If your business sells only on Shopify (even with multiple payment gateways), a tool built specifically around Shopify's data model and payout structure can go deeper on that one integration than a platform trying to support many sales channels at once. If you're selling across Shopify, Amazon, and other channels simultaneously, a broader multi-channel tool like Synder may cover more of your overall stack in one place — at the cost of being less specialized on any single channel's edge cases.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Who should use which</h2>

            <ul className="space-y-3 mb-8">
              {[
                { title: 'Synder is likely the better fit if', desc: 'you sell across multiple channels beyond just Shopify and want one tool handling sync and reconciliation across all of them, even if that means less depth on Shopify-specific payout detail.' },
                { title: 'Fincile is likely the better fit if', desc: 'Shopify is your primary or only sales channel, you run multiple payment gateways on it, and you want a tool built specifically around catching Shopify payout discrepancies rather than general multi-channel sync.' },
              ].map(item => (
                <li key={item.title} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                  <span className="text-base text-text-secondary leading-relaxed">
                    <strong className="text-navy">{item.title}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Both are worth trialing directly against your own data — the real test for either tool is whether it catches something in your actual payouts that you didn't already know about.
            </p>

            {/* Fincile CTA */}
            <div className="mt-12 bg-navy rounded-xl p-8 text-center">
              <div className="text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-3">Verify your own payouts</div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                See what Fincile catches in your Shopify data
              </h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-md mx-auto">
                Connect your Shopify store via OAuth, select your gateway, and run your first audit in under 5 minutes.
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
