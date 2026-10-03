/**
 * Site claims match what the app does: install buttons go to the live App
 * Store listing (apps.shopify.com/fincile), "Log in" goes to the app, prices
 * and trial wording match the app's plans, Shopify Payments is CSV upload, not
 * live sync, and example figures are labelled as examples.
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import type { ReactElement } from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EarlyAccess from '@/components/EarlyAccess';
import HowItWorks from '@/components/HowItWorks';
import Security from '@/components/Security';
import BusinessOutcomes from '@/components/BusinessOutcomes';

beforeAll(() => {
  // jsdom has no IntersectionObserver / matchMedia; the animation hooks need them.
  if (!('IntersectionObserver' in window)) {
    (window as unknown as Record<string, unknown>).IntersectionObserver = class {
      observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
    };
  }
  if (!window.matchMedia) {
    window.matchMedia = ((q: string) => ({ matches: false, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false })) as never;
  }
});

const STORE = 'https://apps.shopify.com/fincile';
const show = (el: ReactElement) => render(<MemoryRouter>{el}</MemoryRouter>).container;
const text = (c: HTMLElement) => (c.textContent || '').replace(/\s+/g, ' ');
const links = (c: HTMLElement) => Array.from(c.querySelectorAll('a')).map((a) => ({ text: (a.textContent || '').trim(), href: a.getAttribute('href') }));

describe('install and log in links', () => {
  it('every install / start button goes to the App Store listing', () => {
    for (const el of [<Hero />, <EarlyAccess />, <HowItWorks />]) {
      const cta = links(show(el)).filter((l) => /install|start|try/i.test(l.text));
      expect(cta.length).toBeGreaterThan(0);
      for (const l of cta) expect(l.href).toBe(STORE);
    }
  });

  it('navbar: Install App -> listing, Log in -> app', () => {
    const nav = links(show(<Navbar />));
    expect(nav).toContainEqual({ text: 'Install App', href: STORE });
    expect(nav).toContainEqual({ text: 'Log in', href: 'https://app.getfincile.com' });
  });

  it('no page links to the old 404 listing, and app.getfincile.com is only the Log in link', () => {
    const root = path.resolve(__dirname, '..');
    const files = [...readdirSync(path.join(root, 'components')).map((f) => path.join(root, 'components', f)), ...readdirSync(path.join(root, 'pages')).map((f) => path.join(root, 'pages', f))]
      .filter((f) => /\.tsx?$/.test(f));
    for (const f of files) {
      const src = readFileSync(f, 'utf8');
      expect(src, f).not.toContain('fincile-revenue-reconciliation');
      expect(src, f).not.toContain('href="https://app.getfincile.com"');
    }
  });
});

describe('prices, trial, sync and example claims', () => {
  it('no founding / old prices; paid plans from $29/month; Free audit plus trial on paid plans', () => {
    const hero = text(show(<Hero />));
    const footer = text(show(<Footer />));
    for (const t of [hero, footer]) {
      expect(t).not.toMatch(/founding|\$39|\$49|\$99|\$249/i);
    }
    expect(hero).toContain('Start with a free audit. Paid plans from $29/month. 14-day free trial on paid plans.');
    expect(footer).toContain('Free audit plan, plus a 14-day free trial on paid plans.');
    expect(footer).toContain('Start with a free audit. Paid plans from $29/month.');
    expect(footer).not.toContain('free trial on all plans');
  });

  it('headline finds, not fixes; no "recover lost revenue"', () => {
    const hero = text(show(<Hero />));
    expect(hero).toContain('Shopify Payout Reconciliation — Find Missing & Mismatched Payouts');
    expect(hero).not.toMatch(/automatically fix|recover lost revenue/i);
  });

  it('Shopify Payments is CSV upload, not live sync', () => {
    const how = text(show(<HowItWorks />));
    expect(how).toContain('Live sync for Stripe and PayPal. Shopify Payments and 11+ other gateways by payout CSV upload.');
    expect(how).not.toMatch(/Shopify Payments, live sync/);
  });

  it('privacy wording names the service providers on the privacy page', () => {
    const sec = text(show(<Security />));
    expect(sec).toContain('Your data is never sold and is only used to run Fincile. We use a few trusted service providers (Cloudflare for hosting, Resend for email) to run the service.');
    expect(sec).not.toContain('No Third-Party Sharing');
  });

  it('example figures are labelled', () => {
    const hero = text(show(<Hero />));
    expect(hero).toContain('Example audit using test data — 30-day dataset: $21,117');
    const outcomes = text(show(<BusinessOutcomes />));
    expect(outcomes).toContain('Illustration');
    expect(outcomes).toContain("For example, if 1% of payments don't match on a $500K/month store, that's $5,000 a month to look into.");
  });

  it('SEO copy: no "fix automatically", trial wording on paid plans only', () => {
    const root = path.resolve(__dirname, '../..');
    const html = readFileSync(path.join(root, 'index.html'), 'utf8');
    const llms = readFileSync(path.join(root, 'public/llms.txt'), 'utf8');
    for (const s of [html, llms]) {
      expect(s).not.toMatch(/Fix Your Shopify Payout Mismatches Automatically|14-day free trial, no credit card required|14-day free trial\."/);
    }
    expect(html).toContain('Free audit plan, plus a 14-day free trial on paid plans.');
    expect(llms).toContain('Live sync for Stripe and PayPal. Shopify Payments and 11+ other gateways by payout CSV upload.');
  });
});
