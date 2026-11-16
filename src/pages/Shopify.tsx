import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSeoMeta, combineSchemas, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyMatters from '@/components/WhyMatters';
import WhatWeDetect from '@/components/WhatWeDetect';
import BusinessOutcomes from '@/components/BusinessOutcomes';
import HowItWorks from '@/components/HowItWorks';
import ComingSoon from '@/components/ComingSoon';
import EarlyAccess from '@/components/EarlyAccess';
import Security from '@/components/Security';
import BestFit from '@/components/BestFit';
import Contact from '@/components/Contact';
import ServiceTerms from '@/components/ServiceTerms';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';

export default function ShopifyPage() {
  const location = useLocation();

  useSeoMeta({
    title: 'Fincile for Shopify – Payout Reconciliation App',
    description: 'Find Shopify orders marked paid with no matching payment. Fincile checks Stripe, PayPal and payout CSVs for missing payments, duplicate charges and refund gaps.',
    path: '/shopify',
    ogTitle: 'Fincile – Find Your Shopify Payout Mismatches',
    ogDescription: 'Shopify payouts never match your bank? Fincile reconciles Shopify, Stripe, PayPal, and 11+ gateways automatically — catches every missing payment and duplicate charge.',
    structuredData: combineSchemas(
      webPageSchema({ name: 'Fincile for Shopify', description: 'The Fincile Shopify app checks Shopify orders against Stripe, PayPal and payout CSVs for missing payments, duplicate charges and refund gaps.', path: '/shopify' }),
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Shopify app', path: '/shopify' }]),
      { '@type': 'SoftwareApplication', name: 'Fincile for Shopify', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: 'https://www.getfincile.com/shopify', description: 'Shopify app that finds orders marked paid with no matching payment, duplicate charges and refund mismatches.' },
    ),
  });

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    // Wait a tick for all sections to mount before scrolling.
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <p className="bg-teal-light text-navy text-sm text-center px-4 py-2">This page is about the Fincile Shopify app. For bank and supplier statement reconciliation from CSV or Excel files, <Link to="/" className="font-semibold underline">start on the home page</Link>.</p>
        <Hero />
        <WhyMatters />
        <WhatWeDetect />
        <BusinessOutcomes />
        <HowItWorks />
        <ComingSoon />
        <EarlyAccess />
        <Security />
        <BestFit />
        <Contact />
        <FAQ />
        <ServiceTerms />
        <Footer />
      </main>
    </div>
  );
}
