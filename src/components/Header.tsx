import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { url } from 'inspector';
import { IoMdClose } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";


type props = {
  isBlack?: boolean;
}

const Header: React.FC<props> = ({isBlack = false}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  
const linkStyle = "text-left text-xl sm:text-2xl md:text-5xl lg:text-6xl text-white font-bold \
  border-b-[0.5rem] border-transparent hover:border-gray-500 hover:text-gray-500 \
  transition-colors duration-300 leading-none";


  return (
    <header 
      className="bg-transparent w-full z-50 absolute top-[3%] left-0 right-0"
      // style={{ position: 'absolute', top: 30, left: 0, right: 0 }}
    >
      <div className="w-full px-4 sm:px-10 md:px-12 ">
        <div className="flex justify-between w-full min-h-[60px] items-center">
          {/* Logo */}
          <div className="px-4">
            <img 
              src={isBlack ? '/Logo-revo-black.png' : '/Group 7.svg'}
              alt="Revo Logo"
              className='w-20 sm:w-24 md:w-32 lg:w-56 xl:w-64 h-auto'
            />
          </div>
          <button 
            className="block  p-2 transition-colors duration-300 items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 z-99 md:w-15 md:h-15 ${isMenuOpen ? 'hidden' : 'text-black'}`} />
            ) : (
              <div className='flex items-center justify-center z-99 gap-2 sm:gap-4'>
                <span className={`text-sm sm:text-xl md:text-xl lg:text-xl font-semibold ${isBlack ? "text-black" : "text-white"}`}>Menu</span>
                <Menu className={`w-4 h-4 sm:w-8 sm:h-8 md:w-12 md:h-12 ${isBlack ? "text-black" : "text-white"}`} />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 1, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: "-100%" }}
            transition={{
              type: 'tween',
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="w-screen h-screen origin-top bg-black text-white pt-4 pb-10 pl-6 pr-4 md:pr-16 flex flex-col items-end justify-start bg-cover"
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0,
              backgroundImage: "url('/menu.png')",
              backgroundSize: 'cover',
            }}
          >
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-[20vw] h-[20vw] md:w-[30vw] md:h-[30vw]  absolute top-0 right-0  z-0 rounded-full bg-blue flex justify-end">
            </motion.div> */}
            <button 
              className="p-4 z-10 sm:p-8 transition-colors duration-300 px-4 sm:px-8 md:px-16"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen && (
                <div className="flex items-center space-x-3 ">
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white" >Close</span>
                  <div className='flex items-center justify-center z-99'>
                    <X className={`items-end w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${isMenuOpen ? 'text-white' : 'text-black'}`} />
                  </div>
                </div>
              )}
            </button>
            
            <nav className="w-full px-4 sm:px-8 md:px-16 overflow-hidden mt-6 z-10">
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    key="menu-items"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.3, ease: 'easeInOut' }}
                    className="flex flex-col items-end font-bold space-y-4"
                  >
                    <button onClick={() => scrollToSection('home')} className={linkStyle}>Home</button>
                    <button onClick={() => scrollToSection('about')} className={linkStyle}>Who we are</button>
                    {/* <button onClick={() => scrollToSection('services')} className={linkStyle}>Services</button> */}
                    <button onClick={() => scrollToSection('portfolio')} className={linkStyle}>Our work</button>
                    <button onClick={() => scrollToSection('contact')} className={linkStyle}>Contact Us</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


export default Header;


