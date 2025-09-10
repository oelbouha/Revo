import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className=" w-full  flex flex-col overflow-hidden items-center justify-center relative ">
      <div className='max-w-7xl bg-red px-8 h md:h-[40rem]  bg- w-full flex items-center'>
        <HeaderWithCircle />
      </div>
      <ImageSection />
    </section>
  );
};

export default About;

const HeaderWithCircle = () => {
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  const circleRef = useRef<HTMLDivElement | null>(null);
  const [circleWidth, setCircleWidth] = useState(0);

  useEffect(() => {
    if (circleRef.current) {
      setCircleWidth(circleRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (circleRef.current) {
        setCircleWidth(circleRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full flex flex-col  justify-center   py-20">
      <div className='flex flex-col items-center justify-center  gap-[1.5rem] md:gap-[3rem] '>
      <HeaderCircle />

        <div className="relative w-full flex items-center justify-end  ">
          <h3
            style={{ right: circleWidth }} 
            className=" md:absolute  md:-top-10 text-black font-Montserrat font-semibold  pr-4  z-[20] 
              text-[16px] sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl text-left  md:pr-24 lg:pr-36 "
          >
            As an independent voice in strategic design and communication,
            REVO shapes powerful ideas that enable brands to exist differently,
            above the noise and beyond fleeting trends.
          </h3>
        </div>
      </div>
    </div>
  );
};


const ImageSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="relative md:mt-24">
      {/* Mobile Layout - Column */}
      <div className="md:hidden flex flex-col w-full bg-white">
        <motion.div className="w-full">
          <img 
            src="https://static.vecteezy.com/system/resources/previews/039/063/358/large_2x/ai-generated-ai-circuit-board-technology-background-central-computer-processors-cpu-concept-motherboard-digital-chip-tech-science-background-integrated-communication-processor-3d-illustration-photo.jpeg" 
            alt="Studio workspace"
            className="w-full h-50 object-cover"
          />
        </motion.div>
        
        <div className="w-full py-20 px-8 bg-black text-white  font-Montserrat font-bold">
          <h3 className="text-[16px] leading-relaxed text-left ">
            As an independent voice in strategic communication and design, REVO shapes powerful ideas that enable brands to exist differently, above the noise and beyond fleeting trends.
          </h3>
        </div>
      </div>

      {/* Desktop Layout - Row */}
      <div className="hidden md:flex justify-end w-full ">
        <motion.img 
          src="https://static.vecteezy.com/system/resources/previews/039/063/358/large_2x/ai-generated-ai-circuit-board-technology-background-central-computer-processors-cpu-concept-motherboard-digital-chip-tech-science-background-integrated-communication-processor-3d-illustration-photo.jpeg" 
          alt="Studio workspace"
          className="object-cover absolute top-0 left-0 h-[400px] md:h-[300px] lg:h-[444px]  xl:h-[550px] w-[49%]"
        />
       
        <div className="flex justify-end items-center mt-20  h-[628px] w-[73%]  bg-black text-white ">
          <div className="max-w- mx-auto w-full flex justify-end bg-red- px-16 ml-[28%] lg:mr-[1%]   ">
            
            <h3 className="text-lg lg:text-3xl xl:text-3xl leading-relaxed font-Montserrat font-semibold px-8 text-right text-white">
              As an independent voice in strategic design and communication, REVO shapes powerful ideas that enable brands to exist differently, above the noise and beyond fleeting trends.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};



const HeaderCircle = () => {
    const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  const circleRef = useRef<HTMLDivElement | null>(null);
  const [circleWidth, setCircleWidth] = useState(0);

  useEffect(() => {
    if (circleRef.current) {
      setCircleWidth(circleRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (circleRef.current) {
        setCircleWidth(circleRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
     <div className="relative w-full flex bg-red justify-end   md:h-24 lg:h-48 xl:h-60 z-10 ">
          <motion.div
            ref={circleRef}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            exit={{ opacity: 0, scale: 0.8 }}
            whileInView={{ scale: 1.2 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-[6rem] w-[6rem] sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 xl:h-60 xl:w-60 rounded-full bg-blue"
          />

          <motion.h2
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            exit={{ opacity: 0, x: -20 }}
            whileInView={{ x: 20 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-[24%] font-Montserrat font-bold z-10 text-3xl md:text-5xl lg:text-8xl tracking-tight text-primary   "
              style={{ right: circleWidth * 0.6 }} 
          >
            WE ARE REVO
          </motion.h2>
        </div>
  );
}
