import logo from '@/assets/fincile-logo.png';

const links = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'What We Detect', href: '#what-we-detect' },
  { label: 'Security', href: '#security' },
  { label: 'Contact', href: '#contact' },
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
              style={{
                width: '150px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
              }}
            />
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Revenue reconciliation and audit intelligence for Shopify merchants.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4">Links</h4>
            <div className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-primary-foreground/60 hover:text-teal transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4">Get in Touch</h4>
            <a href="mailto:support@getfincile.com" className="block text-sm text-teal hover:underline mb-2">
              support@getfincile.com
            </a>
            <p className="text-sm text-primary-foreground/60">24-hour audit turnaround</p>
            <p className="text-sm text-primary-foreground/60">Limited early access - apply now</p>
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
