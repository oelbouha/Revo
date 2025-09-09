import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";



const Header = ()  => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


    const handleNavigation = (sectionId: string) => {
    setIsMenuOpen(false);
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

  
const linkStyle = "text-left text-[24px] sm:text-2xl md:text-5xl lg:text-6xl text-white font-bold \
  border-b-[0.5rem] border-transparent hover:border-gray-500 hover:text-gray-500 \
  transition-colors duration-300 leading-none";


  return (
    <header className="w-full bg-transparent py-4 md:py-8  z-[990] absolute top-0 left-0 ">
      <div className="w-full px-4 sm:px-10 md:px-12 ">
        <div className="flex justify-between w-full min-h-[60px] items-center">
          
          {/* Logo */}
          <div className="px-4 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src='/Group 7.svg'
              alt="Revo Logo"
              className='w-[7rem] sm:w-24 md:w-32 lg:w-48 xl:w-56 '
            />
          </div>
          <button 
            className="block  p-2  items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
           <MenuButton />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {/* <AnimatePresence> */}
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{  y: "-100%", zIndex: 9999 }}
            animate={{  y: 0, zIndex: 9999 }}
            exit={{ opacity: 1, y: "-100%", zIndex: 9999 }}
            transition={{
              type: 'tween',
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="origin-top bg-black object-cover pt-4 pb-10 pl-6 pr-4 md:pr-16 flex flex-col items-end justify-start h-screen w-screen fixed top-0 left-0 z-[9999]">
            <img 
              src='/menu.png'
              alt="Revo Logo"
              className=' absolute w-   100 h-100     object-cover top-0 left-0   z-[998]'
            />
             
            <div className='relative z-[9999] flex flex-col items-end'>
                <button 
                  className="p-4  sm:p-8  px-4 sm:px-8 md:px-16"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen  && <CloseButton />}
                </button>
                
                <nav className="w-full px-4 sm:px-8 md:px-16 overflow-hidden mt-6 ">
                  {/* <AnimatePresence> */}
                    {isMenuOpen && (
                      <motion.div
                        key="menu-items"
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.3, ease: 'easeInOut' }}
                        className="flex flex-col items-end font-bold space-y-4"
                      >
                        <button onClick={() => handleNavigation('home')} className={linkStyle}>Home</button>
                        <button onClick={() => handleNavigation('about')} className={linkStyle}>Who we are</button>
                        <button onClick={() => handleNavigation('portfolio')} className={linkStyle}>Our work</button>
                        <button onClick={() => handleNavigation('footer')} className={linkStyle}>Contact Us</button>
                      </motion.div>
                    )}
                  {/* </AnimatePresence> */}
                </nav>
            </div>
          </motion.div>
        )}
      {/* </AnimatePresence> */}
    </header>
  );
};


export default Header;




const CloseButton = () => {
  return (
     <div className="flex items-center space-x-3 ">
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white" >Close</span>
        <div className='flex items-center justify-center '>
          <X className={`items-end w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white }`} />
        </div>
      </div>
  );
}

const MenuButton = () => {
  return (
     <div className='flex items-center justify-center  gap-2 sm:gap-4'>
        <span className={`hidden md:block text-[1rem] sm:text-xl md:text-xl lg:text-xl font-semibold text-white }`}>Menu</span>
        <Menu className={`w-[30px] h-[30PX] sm:w-8 sm:h-8 md:w-12 md:h-12 text-white }`} />
      </div>
  );
}