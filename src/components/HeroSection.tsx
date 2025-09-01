import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/Header';
import ScrollingTextBanner from './scrollingTextBanner';

const images = [
  {
    image: "/home1.png",
    text: "Unlike anything else."
  },
  {
    image: "/home2.png",
    text: "The future begins with a gesture"
  },
  {
    image: "/home3.png",
    text: "We reach for meaning"
  },
  {
    image: "/home4.png",
    text: "We don’t guess. We choose !"
  },
];

const ImageSlider = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearTimeout(interval);
  }, [selectedImageIndex]);

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.img
          key={selectedImageIndex}
          src={images[selectedImageIndex].image}
          className="absolute w-full h-full object-cover top-0 left-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1 , scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Text Overlay */}
      <div className="absolute left-4 sm:left-2 md:left-4 top-[55%] transform -translate-y-1/2 z-10 max-w-[70%] p-4 sm:p-6 md:p-8">
        <div className="font-Montserrat font-bold overflow-hidden py-4">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`text-${selectedImageIndex}`}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
              className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl max-w-5xl"
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
  useEffect(() => {
    // Preload all slider images
    images.forEach(item => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  return (
    <div
      className="relative h-[93dvh] md:min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden"
    >
      {/* Background Image Slider */}
      <ImageSlider />

      <Header />

      {/* Scroll indicator */}
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
