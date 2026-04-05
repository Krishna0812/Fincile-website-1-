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

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyMatters />
      <WhatWeDetect />
      <BusinessOutcomes />
      <HowItWorks />
      <EarlyAccess />
      <Security />
      <BestFit />
      <Contact />
      <ServiceTerms />
      <Footer />
    </div>
  );
}
