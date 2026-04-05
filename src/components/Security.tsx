import { useInView } from '@/hooks/use-animations';
import { Shield, Eye, Ban } from 'lucide-react';

const points = [
  { icon: <Eye size={22} />, title: 'Read-Only Processing', desc: 'Your uploaded files are used only for reconciliation analysis. No write access, no API connections, and no persistent storage of your financial data at any point.' },
  { icon: <Ban size={22} />, title: 'No Storage Policy', desc: 'Submitted data files are not retained after audit completion. We do not maintain a copy of your Shopify orders or payment records after your report is delivered.' },
  { icon: <Shield size={22} />, title: 'No Third-Party Sharing', desc: 'Your merchant data is never sold, shared, or used for any purpose beyond delivering your audit report. No exceptions.' },
];

export default function Security() {
  const { ref, inView } = useInView();
  return (
    <section id="security" className="py-20 lg:py-28 bg-card">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 max-w-2xl text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="w-16 h-16 rounded-2xl bg-teal-light flex items-center justify-center text-teal mx-auto mb-6">
          <Shield size={32} />
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-3">Your Data Stays Secure</h2>
        <p className="text-text-secondary mb-12">We take data handling seriously, especially for financial data.</p>

        <div className="grid sm:grid-cols-3 gap-8 text-left">
          {points.map(p => (
            <div key={p.title}>
              <div className="w-10 h-10 rounded-lg bg-teal-light flex items-center justify-center text-teal mb-3">{p.icon}</div>
              <h3 className="text-base font-semibold text-navy mb-1">{p.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
