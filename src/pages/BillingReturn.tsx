import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeoMeta } from '@/lib/seo';
import { APP_LOGIN_URL } from '@/lib/site';

// Where the payment provider sends customers after checkout, whether they paid or backed out.
export default function BillingReturn() {
  useSeoMeta({ title: 'Back from checkout | Fincile', description: 'Checkout finished. Open your workspace to see your plan.', path: '/billing/return', noindex: true });
  const [params] = useSearchParams();
  const ws = (params.get('ws') || '').replace(/[^A-Za-z0-9_-]/g, '');
  const billingUrl = ws ? `${APP_LOGIN_URL}/w/${ws}/billing?checkout=return` : `${APP_LOGIN_URL}/signin`;
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-xl">
          <h1 className="text-3xl font-bold text-navy mb-4">Back from checkout</h1>
          <p className="text-text-secondary mb-3">If you paid, your plan turns on as soon as the payment provider confirms it. That usually takes a few seconds. Open your workspace to see it, and your receipt is in the billing page.</p>
          <p className="text-text-secondary mb-8">If you closed or cancelled checkout, nothing was charged and your plan is unchanged.</p>
          <a href={billingUrl} className="gradient-cta text-white font-semibold rounded-lg px-5 py-3 inline-block">Open my plan and billing</a>
          <p className="text-sm text-text-secondary mt-8">Questions? <Link to="/refunds" className="text-teal font-semibold">Refund policy</Link> or write to support@getfincile.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
