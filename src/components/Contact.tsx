import { useState } from 'react';
import { useInView } from '@/hooks/use-animations';

export default function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: '', email: '', store: '', volume: '', gateway: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:support@getfincile.com?subject=Audit Request from ${form.name}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nStore: ${form.store}\nVolume: ${form.volume}\nGateway: ${form.gateway}\n\n${form.message}`
    )}`;
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-card">
      <div ref={ref} className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Left */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-3">Request Your Audit</h2>
            <p className="text-text-secondary mb-10">We'll review your situation and confirm whether Fincile is the right fit for your store.</p>

            <div className="space-y-6 mb-10">
              {[
                'Send us your contact details and store context',
                'We confirm scope and provide a secure upload link for your files',
                'Audit report delivered within 24 hours of receiving your data',
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full gradient-cta flex items-center justify-center text-sm font-bold text-primary-foreground">{i + 1}</span>
                  <p className="text-text-secondary pt-1">{step}</p>
                </div>
              ))}
            </div>

            <a href="mailto:support@getfincile.com" className="text-xl font-semibold text-teal hover:underline block mb-2">
              support@getfincile.com
            </a>
            <p className="text-sm text-text-muted">Audit reports delivered within 24 hours of receiving your data</p>
          </div>

          {/* Right - Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border shadow-lg p-6 lg:p-8 space-y-5">
            <input
              type="text" placeholder="Name" required
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
            <input
              type="email" placeholder="Business email" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
            <input
              type="url" placeholder="Shopify store URL"
              value={form.store} onChange={e => setForm({ ...form, store: e.target.value })}
              className="w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
            <select
              value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })}
              className="w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition text-text-muted"
            >
              <option value="">Monthly order volume</option>
              <option>Under 100</option>
              <option>100 to 500</option>
              <option>500 to 2,000</option>
              <option>2,000 and above</option>
            </select>
            <select
              value={form.gateway} onChange={e => setForm({ ...form, gateway: e.target.value })}
              className="w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition text-text-muted"
            >
              <option value="">Primary payment gateway</option>
              <option>Stripe</option>
              <option>PayPal</option>
              <option>Shopify Payments</option>
              <option>Multiple gateways</option>
              <option>Other</option>
            </select>
            <textarea
              rows={4} placeholder="Tell us about your reconciliation pain or what you are trying to verify"
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
            />
            <button type="submit" className="w-full h-12 rounded-lg text-base font-semibold gradient-cta text-primary-foreground hover:opacity-90 transition-all hover:-translate-y-0.5">
              Request Free Audit →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
