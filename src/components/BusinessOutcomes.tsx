import { useInView } from '@/hooks/use-animations';
import { CheckSquare, ShieldCheck } from 'lucide-react';

const secondaryOutcomes = [
  { icon: <CheckSquare size={24} />, title: 'Reduce finance clean-up time', desc: 'Give finance teams a cleaner picture of which transactions reconciled cleanly and which require verification — without manually cross-checking exports across multiple platforms.' },
  { icon: <ShieldCheck size={24} />, title: 'Improve merchant confidence', desc: 'Turn scattered gateway exports into one professional audit view that supports real financial decision-making, investor reporting, and preparation for tax season.' },
];

export default function BusinessOutcomes() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal mb-3 block">Business Outcomes</span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-14">Built for operators who need clarity fast.</h2>
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-6 rounded-2xl border-2 border-teal bg-teal-light/40 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-navy mb-3">Recover overlooked revenue</h3>
              <p className="text-text-secondary leading-relaxed mb-6">Surface discrepancies before they compound across hundreds of orders.</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-teal-dark leading-none mb-2">$5,000<span className="text-lg font-semibold text-text-secondary">/mo</span></div>
              <p className="text-sm text-text-secondary">quietly leaving a $500K/month business — from just a 1% reconciliation gap.</p>
            </div>
          </div>
          {secondaryOutcomes.map(o => (
            <div key={o.title} className="md:col-span-3">
              <div className="w-12 h-12 rounded-xl bg-teal-light flex items-center justify-center text-teal mb-4">{o.icon}</div>
              <h3 className="text-lg font-semibold text-navy mb-2">{o.title}</h3>
              <p className="text-text-secondary leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
