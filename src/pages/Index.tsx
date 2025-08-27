
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import WhyChooseSection from '../components/WhyChooseSection';
import PartnersSection from '../components/PartnersSection';
import ContactSection from '../components/ContactSection';
import About from '../components/About';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <HeroSection />
      <About />
      <AboutSection />
      <PortfolioSection />
      {/* <PartnersSection /> */}
      {/* <ContactSection /> */}
      <Footer />
    </div>
  );
};

export default Index;
