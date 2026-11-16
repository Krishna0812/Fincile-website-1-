import { describe, it, expect, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import usecases from '@/data/usecases.json';
import industries from '@/data/industries.json';
import UseCase from '@/pages/UseCase';
import Industry from '@/pages/Industry';
import Pricing from '@/pages/Pricing';
import Index from '@/pages/Index';
import Security from '@/pages/Security';
import measured from '@/data/measured.json';
import HowMatchingWorks from '@/pages/HowMatchingWorks';

beforeAll(() => {
  if (!('IntersectionObserver' in window)) {
    (window as unknown as Record<string, unknown>).IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } };
  }
  if (!window.matchMedia) {
    window.matchMedia = ((q: string) => ({ matches: false, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false })) as never;
  }
  window.scrollTo = (() => {}) as never;
});

const root = path.resolve(__dirname, '../..');
const page = (route: string, el: JSX.Element, at: string) =>
  render(<MemoryRouter initialEntries={[at]}><Routes><Route path={route} element={el} /></Routes></MemoryRouter>).container.textContent || '';

// Phrases that would claim something that does not exist.
const FORBIDDEN = [/SOC ?2 (certified|compliant|type)/i, /HIPAA[- ]compliant/i, /ISO ?27001 certified/i, /trusted by \d/i, /our customers/i, /live QuickBooks/i, /\bAI-powered\b/i];

describe('data integrity', () => {
  it('has 10 use cases and 3 industries with unique slugs, titles and descriptions', () => {
    expect(usecases).toHaveLength(10);
    expect(industries).toHaveLength(3);
    for (const list of [usecases, industries]) {
      expect(new Set(list.map((x) => x.slug)).size).toBe(list.length);
      expect(new Set(list.map((x) => x.metaTitle)).size).toBe(list.length);
      expect(new Set(list.map((x) => x.metaDescription)).size).toBe(list.length);
    }
  });

  it('use-case body text is unique: no problem or handling paragraph repeats', () => {
    const seen = new Set<string>();
    for (const u of usecases) for (const t of [u.problem, u.whyHard, ...u.handling, ...u.faqs.map((f) => f.a)]) {
      expect(seen.has(t), `${u.slug}: duplicated text`).toBe(false);
      seen.add(t);
    }
  });

  it('related and industry links point at real use cases, and meta lengths are sane', () => {
    const slugs = new Set(usecases.map((u) => u.slug));
    for (const u of usecases) {
      for (const r of u.related) expect(slugs.has(r)).toBe(true);
      expect(u.metaTitle.length).toBeLessThanOrEqual(75);
      expect(u.metaDescription.length).toBeLessThanOrEqual(175);
      expect(u.faqs.length).toBeGreaterThanOrEqual(3);
    }
    for (const i of industries) for (const x of i.uses) expect(slugs.has(x.slug)).toBe(true);
  });
});

describe('page rendering and honest claims', () => {
  it('every use-case page renders its heading, sample label and a template sign-up link', () => {
    for (const u of usecases) {
      const c = render(<MemoryRouter initialEntries={[`/use-cases/${u.slug}`]}><Routes><Route path="/use-cases/:slug" element={<UseCase />} /></Routes></MemoryRouter>).container;
      const t = c.textContent || '';
      expect(t).toContain(u.h1);
      expect(t).toContain('Built-in sample data, not customer data');
      const hrefs = Array.from(c.querySelectorAll('a')).map((a) => a.getAttribute('href'));
      expect(hrefs).toContain(`https://app.getfincile.com/signup?template=${encodeURIComponent(u.templateId)}`);
      for (const f of FORBIDDEN) expect(t).not.toMatch(f);
      c.remove();
    }
  });

  it('every industry page renders and makes no certification claims', () => {
    for (const i of industries) {
      const t = page('/industries/:slug', <Industry />, `/industries/${i.slug}`);
      expect(t).toContain(i.h1);
      for (const f of FORBIDDEN) expect(t).not.toMatch(f);
    }
  });

  it('healthcare billing and payroll are not promoted: no pages, redirects in place, security page warns', () => {
    const slugs = [...usecases.map((u) => u.slug), ...industries.map((i) => i.slug)];
    for (const s of ['payroll-reconciliation', 'insurance-claims-reconciliation', 'healthcare-billing']) expect(slugs).not.toContain(s);
    const redirects = readFileSync(path.join(root, 'public/_redirects'), 'utf8');
    for (const r of ['/use-cases/payroll-reconciliation /use-cases 301', '/use-cases/insurance-claims-reconciliation /use-cases 301', '/industries/healthcare-billing /industries 301']) expect(redirects).toContain(r);
    const t = page('/security', <Security />, '/security');
    expect(t).toContain('do not upload protected health information');
    expect(t).toContain('no SOC 2, ISO 27001 or HIPAA certification');
  });

  it('security page: states real controls and denies certifications', () => {
    const t = page('/security', <Security />, '/security');
    expect(t).toContain('AES-256-GCM');
    expect(t).toContain('will not start storing workspace data without its encryption key');
    expect(t).toContain('no SOC 2, ISO 27001 or HIPAA certification');
    expect(t).toContain('not end-to-end encryption');
    for (const f of FORBIDDEN) expect(t).not.toMatch(f);
  });

  it('measured figures quoted on the site equal the measured data file', () => {
    const m = Object.fromEntries(measured.scenarios.map((s) => [s.id, s]));
    expect(m['bank-vs-ledger'].matchRatePct).toBe(98.7);
    expect(m['bank-vs-ledger'].falseMatches).toBe(2);
    expect(m['bank-vs-ledger'].matchesProposed).toBe(232);
    expect(m['bank-vs-ledger'].autoAcceptedFalse).toBe(0);
    expect(m['expenses-vs-card'].matchRatePct).toBe(62.2);
    expect(m['expenses-vs-card'].falseMatches).toBe(45);
    expect(m['expenses-vs-card'].matchesProposed).toBe(119);
    expect(m['ap-invoices-vs-po'].falseMatches).toBe(4);
    expect(m['ap-invoices-vs-po'].matchesProposed).toBe(142);
    const home = page('/', <Index />, '/');
    expect(home).toContain('98.7 percent of true pairs with 2 wrong proposals out of 232, none of them auto-accepted');
    const how = page('/how-matching-works', <HowMatchingWorks />, '/how-matching-works');
    expect(how).toContain('Only 62.2 percent of true pairs were found, and 45 of 119 proposals were wrong');
    expect(how).toContain('proposed 4 wrong matches among 142');
    expect(how).toContain('not customer data');
    for (const s of measured.scenarios) expect(s.autoAcceptedFalse).toBe(0);
  });

  it('home leads with one segment and one primary action', () => {
    const t = page('/', <Index />, '/');
    expect(t).toContain('Find every discrepancy between a statement and the books.');
    expect(t).toContain('Reconcile your first statement free');
    expect(t).toContain('For bookkeepers and accounting firms');
    expect(t).not.toMatch(/healthcare|payroll/i);
  });

  it('pricing: shows the app plan table and says billing is test mode', () => {
    const t = page('/pricing', <Pricing />, '/pricing');
    for (const p of ['$0', '$29', '$79', '$179']) expect(t).toContain(p);
    expect(t).toContain('Billing is in test mode');
    expect(t).toContain('nothing is charged');
    expect(t).toContain('failed-payment handling');
  });

  it('home: lists QuickBooks as launching soon, Shopify sync as not built, and no certifications', () => {
    const t = page('/', <Index />, '/');
    expect(t).toContain('Beta, not switched on');
    expect(t).toContain('Not built');
    expect(t).toContain('no SOC 2');
    for (const f of FORBIDDEN) expect(t).not.toMatch(f);
  });

  it('matching page states the real defaults', () => {
    const t = page('/how-matching-works', <HowMatchingWorks />, '/how-matching-works');
    expect(t).toContain('82 percent');
    expect(t).toContain('below 75');
  });
});

describe('crawl files', () => {
  const sitemap = readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
  const llms = readFileSync(path.join(root, 'public/llms.txt'), 'utf8');
  const prerender = readFileSync(path.join(root, 'scripts/prerender.mjs'), 'utf8');

  it('sitemap and llms.txt list every new page', () => {
    const paths = ['/shopify', '/use-cases', '/industries', '/pricing', '/how-matching-works', '/security', '/about', ...usecases.map((u) => `/use-cases/${u.slug}`), ...industries.map((i) => `/industries/${i.slug}`)];
    for (const p of paths) {
      expect(sitemap).toContain(`<loc>https://www.getfincile.com${p}</loc>`);
      expect(llms).toContain(`https://www.getfincile.com${p}`);
    }
  });

  it('prerender builds the new pages from the same data files', () => {
    expect(prerender).toContain('usecases.json');
    expect(prerender).toContain('industries.json');
    for (const p of ['"/shopify"', '"/security"', '"/pricing"', '"/how-matching-works"', '"/use-cases"', '"/industries"']) expect(prerender).toContain(p);
  });

  it('llms.txt no longer says Fincile does not sync, and does not overclaim QuickBooks', () => {
    expect(llms).not.toContain('It does not sync to accounting software');
    expect(llms).toContain('simulated API only');
    expect(llms).toContain('nothing is charged yet');
    expect(llms).not.toMatch(/SOC 2 (certified|compliant)/i);
    expect(llms).not.toMatch(/payroll-reconciliation|healthcare-billing|insurance-claims/);
    expect(sitemap).not.toMatch(/payroll-reconciliation|healthcare-billing|insurance-claims/);
  });
});
