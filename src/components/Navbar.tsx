import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/fincile-logo.png';

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'What We Detect', href: '#what-we-detect' },
  { label: 'Security', href: '#security' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-card/80 backdrop-blur-lg shadow-sm' : 'bg-card'
    } border-b border-border`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <a href="#" className="flex items-center">
          <img src={logo} alt="Fincile" style={{ width: '150px', height: 'auto' }} />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-text-secondary hover:text-navy transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="inline-flex items-center justify-center h-9 px-5 rounded-md text-sm font-semibold gradient-cta text-primary-foreground hover:opacity-90 transition-all hover:-translate-y-0.5">
            Request Free Audit
          </a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-navy">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-card z-40 flex flex-col items-center justify-center gap-8">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-navy">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center h-11 px-8 rounded-md text-base font-semibold gradient-cta text-primary-foreground">
            Request Free Audit
          </a>
        </div>
      )}
    </nav>
  );
}
