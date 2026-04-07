import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import logo from '@/assets/fincile-logo.png';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'What We Detect', href: '#what-we-detect' },
  { label: 'Security', href: '#security' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
          scrolled ? 'bg-card/80 backdrop-blur-lg shadow-sm' : 'bg-card'
        } border-b border-border`}
      >
        <div className="container mx-auto flex h-full items-center justify-between px-4 lg:px-8">
          <a href="#" className="flex items-center">
            <img src={logo} alt="Fincile" className="h-12 w-auto" />
    </a>


        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-navy transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center justify-center h-9 px-5 rounded-md text-sm font-semibold gradient-cta text-primary-foreground hover:opacity-90 transition-all hover:-translate-y-0.5"
          >
            Request Free Audit
          </a>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-navy" aria-label="Open menu">
                <Menu size={26} />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[86vw] max-w-[360px] bg-white border-l border-border px-6 pt-10">
              <div className="mb-8">
                <img src={logo} alt="Fincile" style={{ width: '150px', height: 'auto' }} />
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a href={link.href} className="text-xl font-semibold text-navy">
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </div>

              <div className="mt-8">
                <SheetClose asChild>
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center h-12 px-6 rounded-md text-base font-semibold gradient-cta text-primary-foreground"
                  >
                    Request Free Audit Now
                  </a>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
