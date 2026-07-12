import { useInView } from '@/hooks/use-animations';

const steps = [
  { num: '1', title: 'Install & Connect', time: '2 minutes', desc: 'Install Fincile from the Shopify App Store. OAuth connects your store automatically — no manual exports needed. For Stripe, PayPal, and Shopify Payments, live sync pulls your payout data directly via API.' },
  { num: '2', title: 'Run an Audit', desc: 'Select your gateway, set a date range, and click Run Audit. Fincile cross-references every Shopify order against every gateway payout using cent-safe integer math — detecting ghost orders, duplicate charges, refund mismatches, and settlement gaps.' },
  { num: '3', title: 'Review Your Findings', desc: 'Results appear instantly in your dashboard. Every exception shows the exact order ID, amount, and variance. Export findings as CSV or download a PDF audit report — then resolve or dismiss each finding as you go.' },
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
          <a href="https://app.getfincile.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-12 px-8 rounded-lg text-base font-semibold gradient-cta text-primary-foreground hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg shadow-teal/20">
            Start Free Trial →
          </a>
        </div>
      </div>
    </section>
  );
}
