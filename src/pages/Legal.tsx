import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeoMeta } from '@/lib/seo';

type Section = { h: string; p: string[] };
type Doc = { path: string; title: string; description: string; sections: Section[] };

const UPDATED = 'November 2026';
const CONTACT = 'support@getfincile.com';

export const LEGAL: Record<'terms' | 'refunds' | 'privacy', Doc> = {
  terms: {
    path: '/terms',
    title: 'Terms of service',
    description: 'Terms for using Fincile workspaces, including subscription billing, renewal and cancellation.',
    sections: [
      { h: 'The service', p: ['Fincile lets you upload two files, match them and review what does not agree. You are responsible for the files you upload and for having the right to use them.'] },
      { h: 'Plans and billing', p: [
        'Free is free. Starter, Growth and Scale are paid monthly subscriptions. Prices are in US dollars and are shown before you pay. Tax is added at checkout where it applies.',
        'Our payment provider, Dodo Payments, is the merchant of record. It takes payment, handles sales tax, VAT or GST, and sends your receipt.',
        'A paid plan renews automatically every month at the same price until you cancel. We email you before any price change, and a new price applies only from your next renewal after that notice.',
      ] },
      { h: 'Cancelling and plan changes', p: [
        'The workspace owner can cancel at any time on the Plan and billing page. You keep the plan until the end of the period you have paid for, and you are not charged again.',
        'Changing plan is prorated by the payment provider. If a renewal payment fails, the plan stays active for up to 7 days while the provider retries, then the workspace moves to Free. See the cancellation and refund policy for refunds.',
      ] },
      { h: 'Your data', p: ['You own your files and results. You can delete runs, or the whole workspace, at any time. How we handle data is described in the privacy policy.'] },
      { h: 'Limits and liability', p: ['Fincile shows you differences between files; it is not accounting, tax or legal advice, and you should check results before acting on them. The service is provided as is, and to the extent the law allows our liability is limited to the amount you paid in the 12 months before the claim.'] },
      { h: 'Contact', p: [`Questions: ${CONTACT}. This page is general information, not legal advice.`] },
    ],
  },
  refunds: {
    path: '/refunds',
    title: 'Cancellation and refund policy',
    description: 'How to cancel a Fincile subscription, when you can get a refund, and how renewal works.',
    sections: [
      { h: 'How renewal works', p: ['A paid plan is a monthly subscription. The first payment is taken when you subscribe, and the plan renews every month at the same price until you cancel. Prices are in US dollars; tax is added at checkout where it applies. Dodo Payments is the merchant of record and sends your receipt.'] },
      { h: 'Cancelling', p: ['The workspace owner can cancel at any time under Plan and billing. You keep the plan until the end of the period you have paid for, then the workspace moves to Free. You are not charged again. You can undo a scheduled cancellation before the period ends.'] },
      { h: 'Refunds', p: [
        'First payment: ask within 14 days of your first payment and we refund it in full.',
        'Later monthly payments: not refunded, except where the law where you live requires it. Cancel before the renewal date to avoid the next charge.',
        `To ask, email ${CONTACT} from the workspace owner's address and say which payment. Refunds go to the original payment method and can take several business days. A full refund cancels the subscription.`,
      ] },
      { h: 'Failed payments', p: ['If a renewal fails, the provider retries and your plan stays active for up to 7 days. Update your payment method in the billing portal to keep it. If it is not fixed, the workspace moves to Free and no further charges are made.'] },
    ],
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy policy',
    description: 'What Fincile collects, why, who processes it, and how to delete it.',
    sections: [
      { h: 'What we collect', p: ['Your account details (name, email, workspace name), the files you upload and the results we compute from them, and basic usage logs needed to run and secure the service.'] },
      { h: 'How we use it', p: ['Only to run reconciliations for you, keep your account secure, send service emails and bill you. We do not sell your data and do not use your files to advertise.'] },
      { h: 'Payments', p: ['Payments are handled by Dodo Payments as merchant of record. It receives your name, email, billing country and card details at checkout. We never see or store card numbers; we keep only the customer and subscription ids, your plan and the billing status.'] },
      { h: 'Who else processes data', p: ['Cloudflare (hosting, database and file storage) and Resend (service email).'] },
      { h: 'Retention and deletion', p: ['Results are kept for the history window of your plan. You can delete runs or your whole workspace at any time, and email us to have anything else removed.'] },
      { h: 'Contact', p: [`${CONTACT}. This page is general information, not legal advice.`] },
    ],
  },
};

export default function Legal({ doc }: { doc: keyof typeof LEGAL }) {
  const d = LEGAL[doc];
  useSeoMeta({ title: `${d.title} | Fincile`, description: d.description, path: d.path });
  useEffect(() => { window.scrollTo(0, 0); }, [doc]);
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-8">
            <Link to="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <span className="text-navy font-medium">{d.title}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-2">{d.title}</h1>
          <p className="text-sm text-text-secondary mb-10">Last updated: {UPDATED}</p>
          {d.sections.map((s) => (
            <section key={s.h} className="mb-8">
              <h2 className="text-xl font-semibold text-navy mb-3">{s.h}</h2>
              {s.p.map((t) => <p key={t} className="text-base leading-relaxed text-text-secondary mb-3">{t}</p>)}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
