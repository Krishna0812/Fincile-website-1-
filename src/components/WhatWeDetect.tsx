import { useInView } from '@/hooks/use-animations';
import { CreditCard, Copy, RotateCcw, FileCheck, Percent, HelpCircle } from 'lucide-react';

const features = [
  { icon: <CreditCard size={22} />, title: 'Missing Payments Detection', desc: 'Orders marked paid in Shopify with no matching charge in your payment processor. Money that appears settled in your dashboard but never actually arrived in your account.' },
  { icon: <Copy size={22} />, title: 'Duplicate Charge Detection', desc: 'The same order charged more than once in Stripe or PayPal — caused by retry logic, webhook failures, or payment sync errors that went completely unnoticed.' },
  { icon: <RotateCcw size={22} />, title: 'Refund Verification', desc: 'Refunds recorded in Shopify that have no confirmed evidence in your processor export. Money that was promised to a customer but may never have been returned.' },
  { icon: <FileCheck size={22} />, title: 'Settlement Reconciliation', desc: 'Line-by-line matching of Shopify order totals against gateway payout records to surface amount drift, rounding errors, and systematic settlement gaps.' },
  { icon: <Percent size={22} />, title: 'Processor Fee Analysis', desc: 'Gateway fee extraction from payout exports so merchants can verify the actual net amount received against the expected settlement value for every order.' },
  { icon: <HelpCircle size={22} />, title: 'Unmatched Payment Detection', desc: 'Payments received in Stripe or PayPal with no corresponding Shopify order — funds the merchant holds but cannot attribute to any fulfillable transaction.' },
];

export default function WhatWeDetect() {
  const { ref, inView } = useInView();
  return (
    <section id="what-we-detect" className="py-20 lg:py-28 bg-surface">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal mb-3 block">What We Detect</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy">Built for fast, clear reconciliation insight.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-teal-light flex items-center justify-center text-teal mb-4">{f.icon}</div>
              <h3 className="text-base font-semibold text-navy mb-2">{f.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
