import { Link } from 'react-router-dom';
import logo from '@/assets/fincile-logo.png';
import { PRICING_LINE, TRIAL_LINE } from '@/lib/site';

const links = [
  { label: 'Use cases', href: '/use-cases', internal: true },
  { label: 'Industries', href: '/industries', internal: true },
  { label: 'How matching works', href: '/how-matching-works', internal: true },
  { label: 'Pricing', href: '/pricing', internal: true },
  { label: 'Shopify app', href: '/shopify', internal: true },
  { label: 'Security', href: '/shopify#security', internal: false },
  { label: 'About', href: '/about', internal: true },
  { label: 'Blog', href: '/blog', internal: true },
  { label: 'Contact', href: '/shopify#contact', internal: false },
  { label: 'Terms', href: '/terms', internal: true },
  { label: 'Privacy', href: '/privacy', internal: true },
  { label: 'Refunds', href: '/refunds', internal: true },
];

export default function Footer() {
  return (
    <footer className="bg-navy py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <img
              src={logo}
              alt="Fincile"
              className="mb-4 block"
              style={{ width: '150px', height: 'auto', objectFit: 'contain' }}
            />
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Reconciliation for finance, operations and billing teams. Match any two datasets and review what does not agree.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4">Links</h4>
            <div className="space-y-2">
              {links.map((link) =>
                link.internal ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block text-sm text-primary-foreground/60 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-primary-foreground/60 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4">Get in Touch</h4>
            <a href="mailto:support@getfincile.com" className="block text-sm text-teal hover:underline mb-2">
              support@getfincile.com
            </a>
            <p className="text-sm text-primary-foreground/60">{TRIAL_LINE}</p>
            <p className="text-sm text-primary-foreground/60">{PRICING_LINE}</p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6">
          <p className="text-xs text-primary-foreground/40 text-center">
            (c) 2026 Fincile. Revenue Audit - Reconciliation - Intelligence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
