import { motion } from "framer-motion";

import React from 'react';
import { useInView } from 'react-intersection-observer';

type HeaderWithCircleProps = {
    title?: string;
    circleClassName?: string;
    circlePostion?: String;
    titleClassName?: string
  };


const HeaderWithCircle: React.FC<HeaderWithCircleProps> = ({title, circleClassName, circlePostion = 'end', titleClassName}) => {

  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true
  });

  return (
     <div className={`relative w-full flex flex-col items-${circlePostion} justify-end `}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          exit={{ opacity: 0, scale: 0.8 }}
          whileInView={{ scale: 1.2 }} 
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className={`h-16 w-16 md:w-24 md:h-24 lg:w-[10rem] lg:h-[10rem] rounded-full bg-blue  ${circleClassName}`}>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          exit={{ opacity: 0, x: -20 }}
          whileInView={{ x: 20 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          ref={ref}
          className={`absolute top-[15%] font-Montserrat font-bold z-10 text-xl md:text-4xl lg:text-5xl xl:text-5xl text-urok-gray-800 mb-4 
            ${circlePostion === 'end' ? 'right-12' : ''} 
            ${circlePostion === 'center' ? 'top-[40%] -translate-x-1/2' : ''}
            ${titleClassName}`}>
          {title || 'About studio'}
        </motion.h2>
  </div>
  );
}

export default HeaderWithCircle;

