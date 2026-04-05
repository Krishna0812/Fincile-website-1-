import { useInView } from '@/hooks/use-animations';

const steps = [
  { num: '1', title: 'Export Your Data', time: '5 minutes', desc: 'Download your Shopify orders CSV and your payment processor exports from Stripe, PayPal, or any other gateway. No API access required. No integrations. Simple data exports.' },
  { num: '2', title: 'Fincile Runs the Reconciliation', desc: 'Our engine cross-references every order against every payment record using cent-safe integer math. We detect Ghost Orders, duplicate payments, refund gaps, and transactions that exist in your processor but never hit your bank account.' },
  { num: '3', title: 'Receive Your Audit Report', desc: 'You receive a professional audit report within 24 hours showing exactly which transactions reconciled cleanly and which require attention — complete with order IDs, transaction logs, and specific recovery actions.' },
];

export default function HowItWorks() {
  const { ref, inView } = useInView();
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-navy dot-pattern">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal mb-3 block">How It Works</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground">A simple three-step process. Data in, audit out.</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-8 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-0.5 bg-primary-foreground/10" />

          <div className="grid lg:grid-cols-3 gap-10">
            {steps.map(s => (
              <div key={s.num} className="text-center">
                <div className="w-16 h-16 rounded-full gradient-cta flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-5 relative z-10">
                  {s.num}
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-1">{s.title}</h3>
                {s.time && <span className="text-xs font-mono text-teal mb-3 block">{s.time}</span>}
                <p className="text-sm text-primary-foreground/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <a href="#contact" className="inline-flex items-center justify-center h-12 px-8 rounded-lg text-base font-semibold gradient-cta text-primary-foreground hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg shadow-teal/20">
            Request Free Audit →
          </a>
        </div>
      </div>
    </section>
  );
}
