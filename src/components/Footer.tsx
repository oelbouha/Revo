import React, { useEffect } from 'react';
import { Copy, Mail, PhoneCallIcon, PhoneIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';



const linkStyle = "text-[16px] md:text-lg lg:text-[20px] font-medium text-white cursor-pointer hover:text-blue-400 transition-colors";

const FaInstagram = () => (
  <svg className="w-3 h-3 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FaLinkedinIn = () => (
  <svg className="w-3 h-3 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();


  return ( 
    <footer className="relative  text-white pt-16 bg-black  ">
      {/* Background Image - Back Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/footer.png')",
        }}
      />
      
      {/*  Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-1"></div>
      
      {/* Footer Content */}
      <div className="relative z-10">
        <LogoSection />      
        <div className="max-w-7xl mx-auto py-16 px-8 md:px-4 lg:px-0 border-b border-[#FFFFFF30]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-16">
            <AddressSection />
            <ContactSection />
            <SocialMediaSection />
          </div>
        </div>
        <CopyrightSection />
      </div>
    </footer>
  );
};

export default Footer;


const ContactSection = () => {
  return (
      <div className="flex flex-col gap-2">
        <h3 className="text-l md:text-lg lg:text-2xl font-semibold text-white mb-2">Contact</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <Mail className="w-3 h-3 md:h-5 md:w-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm md:text-l text-white hover:text-blue-400 transition-colors cursor-pointer">
              contact@revo.ma
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="w-3 h-3 md:h-5 md:w-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm md:text-l text-white hover:text-blue-400 transition-colors cursor-pointer">
              05 29 27 60 40
            </span>
          </div>
        </div>
      </div>
  );
}

const LogoSection = () => {
   const navigate = useNavigate();
    const location = useLocation();

   const handleNavigation = (sectionId: string) => {
    // setIsMenuOpen(false);
    if (location.pathname !== '/') {
      // Navigate to home page with the hash
      navigate('/', { replace: true });
      // After navigation, set the hash and scroll
      setTimeout(() => {
        window.location.hash = sectionId;
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  return (
      <div className=" max-w-7xl mx-auto py-16 px-8 md:px-4 lg:px-0  border-b border-[#FFFFFF30] ">
        <div className="w-full  flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
            <div className="space-y-6">
              <div className="text-3xl font-bold flex items-center gap-4 justify-center md:justify-start">
                <img src="/Group 7.svg" alt="Revo Logo"  className="filter  h-10 md:h-12 lg:h-16" />
              </div>
             
            </div>
            <div className="flex items-center gap-8 md:gap-12 ">
                <div>
                  <h3  onClick={() => handleNavigation('home')} className={linkStyle}>Agence</h3>
                </div>
                <div>
                  <h3  onClick={() => handleNavigation('about')} className={linkStyle}>Expertises</h3>
                </div>
                <div>
                  <h3  onClick={() => handleNavigation('portfolio')} className={linkStyle}>Works</h3>
                </div>
                <div>
                  <h3   onClick={() => handleNavigation('home')} className={linkStyle}>Studio</h3>
                </div>
          </div>
        </div>
      </div>
  );
}


const AddressSection = () => {
  return (
      <div className="flex flex-col gap-2">
        <h3 className='text-l md:text-lg lg:text-2xl font-semibold text-white mb-2'>Adresse</h3>
        <p className="text-gray-300 leading-relaxed text-sm md:text-base font-medium">
          Revo Advertising, 5 eme etg, Espace majorelles, 11 Rue Abou Hayane Attaouhidi، Casablanca 20000
        </p>
      </div>
  );
}

const SocialMediaSection = () => {
  return (
     <div className="flex flex-col gap-2">
        <h3 className="text-l md:text-lg lg:text-2xl font-semibold text-white mb-2">Suivez-nous</h3>
        <div className="flex items-start  ">
          <a 
            href="https://www.linkedin.com/company/revo-advertising-casablanca/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white  hover:text-blue-400 transition-all duration-300 hover:bg-blue-400 hover:bg-opacity-10"
            aria-label="Connect with us on LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
  );
}

const CopyrightSection = () => {
    return (
       <div className=' max-w-7xl mx-auto'>
        <p className="text-center text-white text-[14px] md:text-base py-8">
          Copyright © 2025 Revo
        </p>
      </div>
    ); 
}