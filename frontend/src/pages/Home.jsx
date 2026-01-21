// File: src/pages/Home.jsx
import { Helmet } from 'react-helmet-async';
import HeroCarousel from '../components/home/HeroCarousel';
import FeaturesSection from '../components/home/FeaturesSection'; 
import ProductHighlights from '../components/home/ProductHighlights';
import ServicesSection from '../components/home/ServicesSection';
import StatsSection from '../components/home/StatsSection'; 
import TestimonialsSection from '../components/home/TestimonialsSection';
import BrandsSection from '../components/home/BrandsSection';
import FaqSection from '../components/home/FaqSection';
import CTASection from '../components/home/CTASection';
import CreditScoreCta from '../components/home/CreditScoreCta'; 

export default function Home() {

  const homepageFaqs = [
    {
      question: "What types of loans does CS Smart Finserve offer?",
      answer: "CS Smart Finserve offers a wide range of financial products, including Home Loans, Car Loans, Personal Loans, and Business Loans to suit your various needs."
    },
    {
      question: "How do I apply for a loan?",
      answer: "Our application process is 100% digital and paperless. You can start your application by clicking on any of the loan products and following the simple on-screen instructions."
    },
    {
      question: "How long does it take to get a loan approved?",
      answer: "Thanks to our streamlined digital process, many of our loans are approved in principle within hours. Final disbursal times may vary, but we strive to be as fast and efficient as possible."
    },
  ];

  return (
    <>
      <Helmet>
        <title>CS Smart Finserve | Simple & Transparent Loans and Insurance</title>
        <meta name="description" content="CS Smart Finserve offers a wide choice of financial products like loans and insurance through a simple, paperless process. Check your free credit score instantly." />
      </Helmet>
      
      <HeroCarousel /> 
      
      {/* <CreditScoreCta />  */}

      <FeaturesSection />
      <ProductHighlights />
      <ServicesSection />
      <StatsSection /> 
      <TestimonialsSection />
      <BrandsSection />
      <FaqSection 
        title="Frequently Asked Questions"
        subtitle="Have questions? We have answers. If you can't find what you're looking for, feel free to contact us."
        faqs={homepageFaqs}
      />
      <CTASection />
    </>
  );
}