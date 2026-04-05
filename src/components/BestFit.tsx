import { useInView } from '@/hooks/use-animations';
import { TrendingUp, RotateCcw, Search } from 'lucide-react';

const cards = [
  { icon: <TrendingUp size={22} />, title: 'Growing Stores', desc: 'Brands processing enough monthly orders that manual reconciliation checking is slow, inconsistent, or simply not happening. If you are processing 200+ orders per month, you need automated verification.' },
  { icon: <RotateCcw size={22} />, title: 'Refund-Heavy Operations', desc: 'Teams dealing with frequent charge disputes, partial refunds, Buy Now Pay Later complexity, or multiple payment gateways running simultaneously across the same store.' },
  { icon: <Search size={22} />, title: 'Founders & Finance Leads', desc: 'Operators who want a definitive answer to whether what Shopify shows as collected actually matches what settled in their bank account — before investors or accountants ask.' },
];

export default function BestFit() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal mb-3 block">Best Fit</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy">Designed for Shopify Merchants With Reconciliation Pain</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map(c => (
            <div key={c.title} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-teal-light flex items-center justify-center text-teal mb-4">{c.icon}</div>
              <h3 className="text-base font-semibold text-navy mb-2">{c.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
