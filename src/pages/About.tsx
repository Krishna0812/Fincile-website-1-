import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeoMeta, SITE_URL } from '@/lib/seo';
import { signupUrl, SHOPIFY_APP_STORE_URL } from '@/lib/site';

const TITLE = 'About Fincile: Statement Reconciliation, Built by One Person';
const DESCRIPTION = 'Fincile matches two files, such as a bank statement and a ledger, and lists what does not agree. It started as a Shopify payout checker. Here is what it is today and who builds it.';
const PATH = '/about';

export default function About() {
  useSeoMeta({
    title: `${TITLE} | Fincile`,
    description: DESCRIPTION,
    path: PATH,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: TITLE,
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      mainEntity: { '@type': 'Organization', name: 'Fincile', url: SITE_URL },
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-8">
            <Link to="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <span className="text-navy font-medium">About</span>
          </div>

          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-teal mb-4">About Fincile</span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>
              Two files go in. A short list of things to check comes out.
            </h1>
          </div>

          <article className="prose-article">
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Reconciling a bank statement against the books, or a supplier statement against accounts payable, is mostly pairing lines that obviously belong together and then chasing the few that do not. Fincile does the pairing, scores how sure it is, and leaves you with the exceptions and the amount at stake in each.
            </p>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              We are focused first on bookkeepers and accounting firms, because the same few reconciliations come back every month and every client sends different exports. It works from CSV and Excel files, so it does not depend on any one accounting system. The same engine also covers <Link to="/use-cases" className="text-teal hover:underline">other reconciliations</Link>, such as invoices against purchase orders and customer payments against invoices.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Where it came from</h2>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Fincile began as a Shopify app that finds orders marked paid with no matching payment, duplicate charges and refund gaps. That app is still available and is one use of the same idea. You can read about it on the <Link to="/shopify" className="text-teal hover:underline">Shopify app page</Link> or in the <a href={SHOPIFY_APP_STORE_URL} className="text-teal hover:underline">Shopify App Store</a>.
            </p>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">What we claim, and what we do not</h2>
            <ul className="space-y-3 mb-8">
              {[
                'Matching accuracy figures on this site come from our own synthetic test files and are labelled that way. See how matching works for the method and the weak spots.',
                'Fincile has no SOC 2, ISO 27001 or HIPAA certification. The security page says what is protected and how.',
                'Paid plans are in test mode. Nothing is charged yet.',
                'The QuickBooks Online connection is in beta and has not been run against a live company.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal mt-2.5"></span>
                  <span className="text-base text-text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-navy mt-10 mb-4">Who is behind it</h2>
            <p className="text-base leading-relaxed text-text-secondary mb-6">
              Fincile is built and run by Krishna Mandala. It is an early-stage, independently built product. If you want to know how something works, email{' '}
              <a href="mailto:support@getfincile.com" className="text-teal hover:underline">support@getfincile.com</a>.
            </p>

            <div className="mt-12 bg-navy rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-primary-foreground mb-3">Try it on one of your own statements</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-md mx-auto">The free plan covers 100 rows per file and one run a month. No card needed.</p>
              <a href={signupUrl('bank-vs-ledger')} className="inline-flex items-center justify-center h-12 px-8 rounded-lg text-base font-semibold gradient-cta text-primary-foreground">Reconcile a statement free</a>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
