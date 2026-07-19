import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeoMeta, blogPostingSchema } from '@/lib/seo';

const TITLE = 'Fincile vs A2X: Which Shopify Reconciliation Tool Is Right for You? | Fincile';
const DESCRIPTION = 'A2X posts summarized Shopify sales into your accounting platform. Fincile catches missing payments, duplicate charges, and payout mismatches at the transaction level. Here\'s how they differ.';
const PATH = '/blog/fincile-vs-a2x';

export default function BlogFincileVsA2X() {
  useSeoMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    structuredData: blogPostingSchema({
      headline: 'Fincile vs A2X: Which Shopify Reconciliation Tool Is Right for You?',
      description: DESCRIPTION,
      path: PATH,
      datePublished: '2026-07-18',
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

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-8">
            <Link to="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-teal transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-navy font-medium">Fincile vs A2X</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-4">
              Comparison
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>
              Fincile vs A2X: Which Shopify Reconciliation Tool Is Right for You?
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
              If you're evaluating tools to clean up Shopify payout accounting, A2X is probably the name that comes up most often — it's well-established in the ecommerce accounting space. But A2X and Fincile solve genuinely different problems, and picking the right one depends on what you actually need fixed.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">What A2X is built for</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              A2X's core strength is posting clean, summarized Shopify sales data into accounting platforms like Xero and QuickBooks — turning a messy stream of orders, fees, and payouts into accountant-friendly journal entries that make month-end close faster. It's widely used by ecommerce bookkeepers specifically because it standardizes how ecommerce transactions show up in the general ledger.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">What Fincile is built for</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Fincile's focus is narrower and different: catching discrepancies in the payout itself — missing payments, duplicate charges, refund mismatches, settlement gaps, and processor fee errors — across Shopify Payments and 11+ other gateways, as they happen. It's less about formatting your books for your accountant and more about verifying that the money that should have arrived actually did.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">The practical difference</h2>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Think of it this way: A2X answers "how do I get my Shopify sales into my accounting software correctly?" Fincile answers "is the payout I actually received the payout I should have received?" A store could use A2X and still have a missing payment sitting in its numbers, because A2X's job is to format and post the data it's given — not to independently verify that every order has a matching gateway transaction.
            </p>

            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Some merchants genuinely need both: A2X (or a similar tool) for clean books, and a discrepancy-detection layer like Fincile to catch the errors that clean formatting alone won't surface.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Who should use which</h2>

            <ul className="space-y-3 mb-8">
              {[
                { title: 'A2X is likely the better fit if', desc: 'your primary pain point is manual journal entry work and getting Shopify data into Xero/QuickBooks cleanly, and you\'re not currently seeing evidence of missing payments or duplicate charges.' },
                { title: 'Fincile is likely the better fit if', desc: 'you\'ve had (or suspect you\'ve had) a payout come in short, you run multiple payment gateways and want continuous matching rather than a monthly summary, or your bookkeeper has flagged numbers that don\'t quite tie out and you need to find out why at the transaction level.' },
                { title: 'Using both makes sense if', desc: 'you want clean books and verified payout accuracy — they\'re not mutually exclusive tools, and for higher-volume multi-gateway stores, that combination covers more ground than either alone.' },
              ].map(item => (
                <li key={item.title} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                  <span className="text-base text-text-secondary leading-relaxed">
                    <strong className="text-navy">{item.title}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>

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
