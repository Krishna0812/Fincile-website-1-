import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
