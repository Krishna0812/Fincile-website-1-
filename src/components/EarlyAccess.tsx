import { useInView } from '@/hooks/use-animations';
import { FileText, Clock, Lock } from 'lucide-react';

export default function EarlyAccess() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 lg:py-28 gradient-section">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 text-center max-w-3xl transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase border border-primary-foreground/30 text-primary-foreground px-4 py-1.5 rounded-full mb-6">
          Early Access
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
          Free Revenue Audit — Limited Early Access
        </h2>
        <p className="text-base lg:text-lg text-primary-foreground/80 mb-10 leading-relaxed">
          We are onboarding a limited number of Shopify merchants for complimentary reconciliation audits. If no discrepancies are found, you pay nothing. If we find issues, we show you exactly where they are and what to do about it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
          {[
            { icon: <FileText size={16} />, text: 'No API access required — CSV exports only' },
            { icon: <Clock size={16} />, text: '24-hour turnaround on audit reports' },
            { icon: <Lock size={16} />, text: 'Data processed securely — never stored or shared' },
          ].map(t => (
            <div key={t.text} className="flex items-center gap-2 text-sm text-primary-foreground/90">
              {t.icon} {t.text}
            </div>
          ))}
        </div>

        <a href="#contact" className="inline-flex items-center justify-center h-12 px-8 rounded-lg text-base font-semibold bg-card text-teal hover:bg-card/90 transition-all hover:-translate-y-0.5 shadow-lg mb-4">
          Request Your Free Audit
        </a>
        <p className="text-sm text-primary-foreground/60">support@getfincile.com</p>
      </div>
    </section>
  );
}
