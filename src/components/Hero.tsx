import { useCountUp, useInView, useParallax } from '@/hooks/use-animations';
import { CreditCard, Landmark, Wallet } from 'lucide-react';
import { APP_SIGNUP_URL, PRICING_LINE, SHOPIFY_APP_STORE_URL } from '@/lib/site';

function AuditCard() {
  const { ref: cardRef } = useParallax();
  const { ref: inViewRef, inView } = useInView(0.3);
  const audited = useCountUp(184230, 1800, inView);
  const issues = useCountUp(19, 1200, inView);
  const impact = useCountUp(21117, 1800, inView);

  return (
    <div ref={inViewRef}>
      <div
        ref={cardRef}
        className="bg-card rounded-xl border border-border shadow-2xl p-6 lg:p-8 max-w-md mx-auto"
        style={{ transform: 'perspective(1000px) rotate(-2deg)', transition: 'transform 0.15s ease-out' }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-teal">Revenue Integrity Report</span>
          <span className="text-xs font-medium bg-teal-light text-teal px-3 py-1 rounded-full">30 Days</span>
        </div>
        <h3 className="text-lg font-bold text-navy mb-5">Example audit using test data</h3>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Total Audited', value: `$${audited.toLocaleString()}` },
            { label: 'Issues Found', value: issues.toString() },
            { label: 'Identified Impact', value: `$${impact.toLocaleString()}` },
          ].map((m) => (
            <div key={m.label} className="bg-surface rounded-lg p-3 text-center">
              <div className="text-[10px] font-medium text-text-muted uppercase tracking-wide mb-1">{m.label}</div>
              <div className="text-base lg:text-lg font-bold text-navy font-mono">{m.value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-3 bg-surface px-3 py-2">
            {['Issue Type', 'Order ID', 'Variance'].map((h) => (
              <span key={h} className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">
                {h}
              </span>
            ))}
          </div>
          {[
            ['Missing Payment', '#1048', '$5,240'],
            ['Duplicate Charge', '#1121', '$1,880'],
            ['Refund Mismatch', '#1184', '$690'],
          ].map(([type, id, amt], i) => (
            <div key={i} className="grid grid-cols-3 px-3 py-2.5 border-t border-border">
              <span className="text-xs font-medium text-navy">{type}</span>
              <span className="text-xs font-mono text-text-muted">{id}</span>
              <span className="text-xs font-mono font-semibold text-destructive">{amt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-navy dot-pattern pb-0 -mt-px">
      <div className="container mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-teal mb-4">
              Reconciliation for sales, payments and ledgers
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
              Reconciliation Software — Find Missing & Mismatched Payments
            </h1>
            <p className="text-base lg:text-lg text-primary-foreground/70 leading-relaxed mb-8 max-w-xl">
              Fincile compares two sources and shows every missing payment, duplicate charge and mismatch, with a plain-English reason for each. It works with Shopify, Stripe and PayPal, and with any CSV export such as a bank statement or ledger. It reports exceptions for review and never changes your books.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: <CreditCard size={14} />, label: 'Shopify Orders' },
                { icon: <Landmark size={14} />, label: 'Stripe Payouts' },
                { icon: <Wallet size={14} />, label: 'PayPal Transactions' },
                { icon: <Landmark size={14} />, label: 'Bank & ledger CSVs' },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-foreground/20 text-xs font-medium text-primary-foreground/80"
                >
                  {b.icon} {b.label}
                </span>
              ))}
            </div>

            <a
              href={SHOPIFY_APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg text-base font-semibold gradient-cta text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all hover:-translate-y-0.5 shadow-lg shadow-teal/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Install Free on Shopify →
            </a>
            <a
              href={APP_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-6 ml-3 rounded-lg text-base font-semibold border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all"
            >
              Reconcile any CSV: create a free workspace →
            </a>
            <p className="mt-3 text-sm text-primary-foreground/60">
              {PRICING_LINE} 14-day free trial on paid plans.
            </p>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <AuditCard />
          </div>
        </div>
      </div>

      <div className="bg-navy-light py-4">
        <p className="text-center text-sm text-primary-foreground/80 font-medium px-4">
          Example audit using test data — 30-day dataset: <span className="font-mono font-bold text-teal">$21,117</span> in
          identified discrepancies across 3 issue types
        </p>
      </div>
    </section>
  );
}
