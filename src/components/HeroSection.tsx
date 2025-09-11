import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/Header';
import ScrollingTextBanner from './scrollingTextBanner';

export const images = [
  {
    image: "/home1.png",
    mobileImage: "/home1.jpg",
    text: "Unlike anything else."
  },
  {
    image: "/home2.png",
    mobileImage: "/home2test.png",
    text: "The future begins with a gesture"
  },
  {
    image: "/home4.png",
    mobileImage: "/home4test.png",
    text: "We reach for meaning"
  },
  {
    image: "/home3.png",
    mobileImage: "/home3test.png",
    text: "We don’t guess. We choose !"
  },
];

const ImageSlider = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6500);

    return () => clearTimeout(interval);
  }, [selectedImageIndex]);

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="sync">
        {/* Desktop Image */}
        <motion.img
          key={`desktop-${selectedImageIndex}`}
          src={images[selectedImageIndex].image}
          className="hidden md:block absolute w-full h-full object-cover top-0 left-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Mobile Image */}
        <motion.img
          key={`mobile-${selectedImageIndex}`}
          src={images[selectedImageIndex].mobileImage}
          className="block md:hidden absolute w-full h-[100dvh] object-cover top-0 left-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>


      {/* Text Overlay */}
      <div className="absolute left-4 sm:left-2 md:left-4 top-[55%] transform -translate-y-1/2 z-10 max-w-[95%] p-4 sm:p-6 md:p-8">
        <div className="font-Montserrat font-bold overflow-hidden py-4">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`text-${selectedImageIndex}`}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0 }}
              className="text-[4rem] md:text-5xl lg:text-7xl xl:text-8xl max-w-7xl leading-tight text-white"
            >
              {images[selectedImageIndex].text}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const HomeScreen = () => {


  return (
    <div className="relative h-screen md:min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      <ImageSlider />
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
      className="w-full overflow-hidden relative flex flex-col"
    >
      <HomeScreen />
      <ScrollingTextBanner />
    </section>
  );
};

export default HeroSection;
