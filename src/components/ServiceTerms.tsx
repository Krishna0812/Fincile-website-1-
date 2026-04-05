import { useInView } from '@/hooks/use-animations';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const terms = [
  { title: '1. Nature of Service', body: 'Fincile provides an automated data reconciliation aid designed to identify potential discrepancies between Shopify store records and third-party payment processor data. Fincile is not a CPA firm, and this report does not constitute a formal financial audit, tax preparation, or legal advice.' },
  { title: '2. Accuracy of Data', body: 'Our reconciliation engine relies entirely on the accuracy and completeness of the CSV exports provided by the user. Fincile is not liable for discrepancies caused by missing files, corrupted data, or non-standard gateway exports.' },
  { title: '3. Merchant Responsibility', body: 'The Recoverable Impact and findings in this report are flags for further investigation. Merchants agree to manually verify all findings within their respective payment processor dashboards before taking action, including issuing refunds, disputing settlements, or adjusting tax filings.' },
  { title: '4. Limitation of Liability', body: 'Fincile shall not be liable for any direct, indirect, or consequential financial losses, bank penalties, or operational costs resulting from actions taken based on this report. Liability is limited to fees paid for the specific audit service rendered.' },
];

export default function ServiceTerms() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-20 bg-card">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 max-w-3xl transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-text-muted mb-6 block">
          Service Terms & Revenue Integrity Disclaimer
        </span>
        <div className="space-y-3">
          {terms.map((t, i) => (
            <div key={i} className="border border-border rounded-lg">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                <span className="text-sm font-semibold text-navy">{t.title}</span>
                <ChevronDown size={16} className={`text-text-muted transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-text-secondary leading-relaxed">{t.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
