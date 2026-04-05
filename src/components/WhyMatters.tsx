import { useInView } from '@/hooks/use-animations';
import { ShoppingCart, CreditCard, Landmark, Wallet } from 'lucide-react';

const sources = [
  { icon: <ShoppingCart size={20} />, title: 'Shopify Master Orders', desc: 'This is your source of truth. We use it to verify that every single order processed was actually successfully captured.' },
  { icon: <CreditCard size={20} />, title: 'Shopify Payments', desc: 'Essential for detecting Ghost Orders — cases where Shopify says "Paid" but the funds never left the gateway.' },
  { icon: <Landmark size={20} />, title: 'Stripe / Gateway Data', desc: 'This provides actual settlement data. We use it to surface duplicate charges and hidden processor fee leaks.' },
  { icon: <Wallet size={20} />, title: 'PayPal Business', desc: 'PayPal data is notoriously fragmented. This specific export ensures 100% visibility into your actual cash flow.' },
];

export default function WhyMatters() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 max-w-3xl transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal mb-3 block">Why This Matters</span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-12 leading-tight">
          Most merchants see revenue. Very few verify collection integrity.
        </h2>
        <div className="space-y-10">
          {sources.map(s => (
            <div key={s.title} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-light flex items-center justify-center text-teal">{s.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-navy mb-1">{s.title}</h3>
                <p className="text-text-secondary leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
