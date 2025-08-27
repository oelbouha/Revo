import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Header from '../components/Header';
import ScrollingTextBanner from './scrollingTextBanner';




const HomeScreen = () => {
  return (
    <div
      
      className="relative h-[93dvh] md:min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center overflow-hidden "
        style={{
          backgroundImage: "url('/home.jpg')",
        }}
      />

      <Header />
      
      <div className="absolute bg left-4 sm:left-2 md:left-4 top-[55%]  transform -translate-y-1/2 z-10 max-w-[70%] p-4 sm:p-6 md:p-8 ">
        <div className=' font-bold overflow-hidden py-4'>

        <motion.h1
          // initial={{ y: 0 ,  }}
          // animate={{ y: 0 , }}
          // transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-8xl  xl:text-9xl max-w-5xl"
          >
          Unlike anything else.
        </motion.h1>
          </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 4 }}
          className="flex justify-start items-center gap-4 bg-black"
        >
        </motion.div>
      </div>
          
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-4 h-6 sm:w-5 sm:h-8 md:w-6 md:h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      
    </div>
  );
};


const HeroSection = () => {
  return (
    <section 
      id="home"
      className='w-full  overflow-hidden relative flex flex-col'
      >
      <HomeScreen />
      <ScrollingTextBanner />
    </section>      
  );
};


export default HeroSection;

