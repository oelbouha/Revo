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
     
      <div className='h-[20rem] md:h-[40rem] max-w-7xl mx-auto    px-4 lg:px-0 flex items-center justify-start '>
        <h3 className="max-w-[90%]   text-[#000014] font-Montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl leading-tight md:leading-normal text-left">
          Our ideas shape brands at the crossing point of design, strategy and culture.
        </h3>
      </div>
    </section>
  );
};

export default AboutSection;