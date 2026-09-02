import { useInView } from '@/hooks/use-animations';
import { Shield, Eye, Ban } from 'lucide-react';

const points = [
  { icon: <Eye size={22} />, title: 'Read-Only Shopify Access', desc: 'Fincile connects via Shopify OAuth with read-only access to your orders — never write access to your store, and no customer or payment-terms data requested. Gateway credentials (Stripe, PayPal) are encrypted with AES-256 before storage and never exposed in responses.' },
  { icon: <Ban size={22} />, title: 'Your Audit History, Your Control', desc: 'Your audit history and findings are retained in your dashboard so you can review them anytime — retention depends on your plan (3 months on Starter, 12 months on Growth, unlimited on Scale+). Request full deletion anytime at support@getfincile.com.' },
  { icon: <Shield size={22} />, title: 'No Third-Party Sharing', desc: 'Your merchant data is never sold, shared, or used for any purpose beyond delivering your reconciliation reports. No exceptions.' },
];

export default function Security() {
  const { ref, inView } = useInView();
  return (
    <section id="security" className="py-20 lg:py-28 bg-card">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 max-w-2xl text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="w-16 h-16 rounded-2xl bg-teal-light flex items-center justify-center text-teal mx-auto mb-6">
          <Shield size={32} />
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-navy mb-3">Your Data Stays Secure</h2>
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
