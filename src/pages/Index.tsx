import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSeoMeta } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyMatters from '@/components/WhyMatters';
import WhatWeDetect from '@/components/WhatWeDetect';
import BusinessOutcomes from '@/components/BusinessOutcomes';
import HowItWorks from '@/components/HowItWorks';
import EarlyAccess from '@/components/EarlyAccess';
import Security from '@/components/Security';
import BestFit from '@/components/BestFit';
import Contact from '@/components/Contact';
import ServiceTerms from '@/components/ServiceTerms';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';

export default function Index() {
  const location = useLocation();

  useSeoMeta({
    title: 'Fincile – Shopify Payout Reconciliation Tool | Fix Missing & Mismatched Payouts',
    description: 'Fincile automatically reconciles Shopify payouts against Stripe, PayPal, Shopify Payments, and 11+ gateways. Catch missing payments, duplicate charges, and refund mismatches in minutes. 14-day free trial.',
    path: '/',
    ogTitle: 'Fincile – Fix Your Shopify Payout Mismatches Automatically',
    ogDescription: 'Shopify payouts never match your bank? Fincile reconciles Shopify, Stripe, PayPal, and 11+ gateways automatically — catches every missing payment and duplicate charge.',
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
        <Hero />
        <WhyMatters />
        <WhatWeDetect />
        <BusinessOutcomes />
        <HowItWorks />
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
