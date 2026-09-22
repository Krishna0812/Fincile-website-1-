import { useInView } from '@/hooks/use-animations';
import { ShieldAlert, Percent, Copy, Workflow, BookOpenText } from 'lucide-react';

const upcoming = [
  {
    icon: <ShieldAlert size={22} />,
    title: 'Chargeback Defense',
    desc: 'Automatically assemble evidence from your real transaction data and submit it directly to Stripe, PayPal, Braintree, Razorpay, Afterpay, and Shopify Payments — no manual dispute paperwork.',
  },
  {
    icon: <Percent size={22} />,
    title: 'Gateway Fee Audits',
    desc: "Catch processor fees that drift from your contracted rate before they quietly eat into your margin, order after order.",
  },
  {
    icon: <Copy size={22} />,
    title: 'Duplicate & Fraud Interception',
    desc: 'Flag suspicious duplicate charges as they happen, using your own store’s transaction patterns — not a one-size-fits-all rule.',
  },
  {
    icon: <Workflow size={22} />,
    title: 'Revenue Recovery Engine',
    desc: 'Review and approve a fix once — a duplicate refund, an order correction — and Fincile executes it safely, then confirms it actually went through with the gateway itself.',
  },
  {
    icon: <BookOpenText size={22} />,
    title: 'No-Ledger UX',
    desc: 'See money earned, money missing, and money cleared in plain English — no spreadsheet, no accounting background required.',
  },
];

export default function ComingSoon() {
  const { ref, inView } = useInView();
  return (
    <section id="coming-soon" className="py-20 lg:py-28 bg-surface">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal mb-3 block">What&apos;s Next</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight mb-4">Beyond Reconciliation — In Active Development</h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            These features are being built right now and are not yet available in the live app. We&apos;re listing them here so you know where Fincile is headed — not as a claim about what it does today.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map(f => (
            <div key={f.title} className="relative bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="absolute top-4 right-4 text-[10px] font-semibold tracking-wide uppercase text-teal-dark bg-teal-light px-2 py-1 rounded-full">
                Coming Soon
              </span>
              <div className="w-10 h-10 rounded-lg bg-teal-light flex items-center justify-center text-teal mb-4">{f.icon}</div>
              <h3 className="text-base font-semibold text-navy mb-2 pr-20">{f.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
