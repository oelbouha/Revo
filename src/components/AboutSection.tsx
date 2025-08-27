import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import HeaderWithCircle from './HeaderWithCircle';

const AboutSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref}  className="mt  relative">
     
      <div className='h-[25rem] md:h-[40rem] max-w-7xl mx-auto    px-8 lg:px-0 flex items-center justify-start '>
        <h3 className="max-w-[90%]   text-white font-Montserrat font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl 2xl:text-7xl leading-tight md:leading-normal text-left">
          Our ideas shape brands at the crossing point of design, strategy and culture.
        </h3>
      </div>
    </section>
  );
};

export default AboutSection;