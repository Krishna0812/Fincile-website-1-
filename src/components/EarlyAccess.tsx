import { useInView } from '@/hooks/use-animations';
import { FileText, Clock, Lock } from 'lucide-react';

export default function EarlyAccess() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 lg:py-28 gradient-section">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 text-center max-w-3xl transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase border border-primary-foreground/30 text-primary-foreground px-4 py-1.5 rounded-full mb-6">
          Get Started
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
          Run Your First Audit Free — No Credit Card Required
        </h2>
        <p className="text-base lg:text-lg text-primary-foreground/80 mb-10 leading-relaxed">
          Install Fincile from the Shopify App Store and run your first full reconciliation audit at no cost. See exactly what your store might be missing before you pay anything.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
          {[
            { icon: <FileText size={16} />, text: 'Free trial — up to 100 orders, no card needed' },
            { icon: <Clock size={16} />, text: 'Results in minutes, not 24 hours' },
            { icon: <Lock size={16} />, text: 'Read-only access — your data is never stored' },
          ].map(t => (
            <div key={t.text} className="flex items-center gap-2 text-sm text-primary-foreground/90">
              {t.icon} {t.text}
            </div>
          ))}
        </div>

        <a href="https://app.getfincile.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-12 px-8 rounded-lg text-base font-semibold bg-card text-teal hover:bg-card/90 active:scale-[0.98] transition-all hover:-translate-y-0.5 shadow-lg mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-teal">
          Start Free Trial →
        </a>
        <p className="text-sm text-primary-foreground/60">Questions? Email support@getfincile.com</p>
      </div>
    </section>
  );
}
