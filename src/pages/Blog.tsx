import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const posts = [
  {
    slug: 'shopify-payout-discrepancy',
    eyebrow: 'Revenue Reconciliation',
    title: '5 Signs Your Shopify Payouts Are Wrong — And What to Do About Each One',
    excerpt: 'A consistent gap between Shopify revenue and your bank balance is a warning sign. Here are the 5 most common causes — and how to investigate each one.',
    date: 'July 2026',
    readTime: '6 min read',
  },
  {
    slug: 'shopify-stripe-reconciliation',
    eyebrow: 'Payment Reconciliation',
    title: 'Shopify + Stripe Reconciliation: Why Your Payouts Don\'t Match Your Orders',
    excerpt: 'A single Shopify order can generate up to six separate Stripe records. Here\'s how to match them correctly — and the 6 most common causes of Stripe-Shopify mismatches.',
    date: 'July 2026',
    readTime: '7 min read',
  },
  {
    slug: 'ghost-orders-shopify',
    eyebrow: 'Revenue Reconciliation',
    title: 'What Are Ghost Orders on Shopify? How to Detect and Fix Payout Gaps',
    excerpt: 'Shopify marks an order as "Paid" before your gateway confirms the settlement. When the two don\'t align, that\'s a ghost order — and they add up silently over months.',
    date: 'July 2026',
    readTime: '8 min read',
  },
  {
    slug: 'fincile-vs-a2x',
    eyebrow: 'Comparison',
    title: 'Fincile vs A2X: Which Shopify Reconciliation Tool Is Right for You?',
    excerpt: 'A2X and Fincile solve genuinely different problems. Here\'s how to tell which one (or both) you actually need.',
    date: 'July 2026',
    readTime: '6 min read',
  },
  {
    slug: 'fincile-vs-synder',
    eyebrow: 'Comparison',
    title: 'Fincile vs Synder: Comparing Shopify Payout Reconciliation Options',
    excerpt: 'Synder covers multi-channel sync. Fincile goes deep on Shopify payouts specifically. Here\'s how to pick.',
    date: 'July 2026',
    readTime: '6 min read',
  },
];

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog — Shopify Revenue Reconciliation Guides | Fincile';
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">

          <div className="mb-12">
            <span className="text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-3 block">Fincile Blog</span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4" style={{ textWrap: 'balance' }}>
              Shopify Revenue & Reconciliation Guides
            </h1>
            <p className="text-base text-text-secondary leading-relaxed">
              Practical guides for Shopify merchants on payment reconciliation, payout gaps, and keeping your revenue numbers accurate.
            </p>
          </div>

          <div className="space-y-6">
            {posts.map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block bg-card border border-border rounded-xl p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <span className="text-xs font-semibold tracking-[0.12em] uppercase text-teal mb-3 block">
                  {post.eyebrow}
                </span>
                <h2 className="text-lg font-bold text-navy mb-3 group-hover:text-teal transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                  <span className="ml-auto text-teal font-semibold group-hover:translate-x-1 transition-transform">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
