
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

import { Wrench, Hammer } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* <HeroSection />
      <About />
      <AboutSection />
      <PortfolioSection /> */}
      {/* <PartnersSection /> */}
      {/* <ContactSection /> */}
      {/* <Footer /> */}
      <UnderConstruction />
    </div>
  );
};

export default Index;



const  UnderConstruction = () => (
  <div className="min-h-screen bg-black flex flex-col  items-center justify-center p-4 gap-16">
    <div className="text-center space-y-8 max-w-md">
      {/* Logo/Icon */}
      
      <div className="flex justify-center space-x-4 mb-8">
        <div className="animate-bounce">
          <Wrench className="w-12 h-12 text-blue" />
        </div>
        <div className="animate-bounce delay-150">
          <Hammer className="w-12 h-12 text-blue" />
        </div>
      </div>

      {/* Main heading */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Under Construction
      </h1>


      {/* Animated progress bar */}
      <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
        <div className="bg-gradient-to-r from-blue to-blue h-2 rounded-full animate-pulse"
          style={{ width: '65%' }}>
        </div>
      </div>
      
    </div>
      {/* <div className='flex items-center justify-center'>
          <img 
              src='/Group 7.svg'
              alt="Revo Logo"
              className='w-20 sm:w-24 md:w-32 lg:w-56 xl:w-64 h-auto'
            />
      </div> */}
  </div>
)