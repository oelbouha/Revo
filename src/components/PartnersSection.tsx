

import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { motion } from "framer-motion";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import HeaderWithCircle from './HeaderWithCircle';




// const PartnersSection = () => {
//   const { ref, inView } = useInView({
//     threshold: 0.3,
//     triggerOnce: true
//   });

//   const partners = [
//     "logo/h.svg",
//     "logo/20.png",
//     "logo/22.png",
//     "logo/23.png",
//     "logo/21.png",
//     "logo/23.png",
//   ];

//   return (
//     <section className="py-20 bg-black">
//       <div className="max-w-7xl mx-auto px-6">
//         <div ref={ref} className={`text-center mb-16 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
//          <HeaderWithCircle title="Our Network" titleClassName='text-white' circlePostion={"center"}/>
//           {/* <p className="text-urok-gray-500 text-lg md:mt-4">
//             Some Revo professional clients
//           </p> */}
//         </div>

//         {/* Partners Logos */}
//         <div className='flex justify-center items-center '>
//          <Swiper
//             breakpoints={{
//             0: { slidesPerView: 3 },
//             640: { slidesPerView: 4 },
//             1024: { slidesPerView: 5 },
//           }}
//           spaceBetween={30}
//           freeMode={true}
//           loop={true}

//           autoplay={{
//             delay: 1200, // 1 second
//             disableOnInteraction: false,
//           }}
//           modules={[Autoplay, FreeMode]}
//                     className="mySwiper"
//           >
//           {partners.map((partner, index) => (
//             <SwiperSlide>
            
//               <img src={partner} alt={`Partner ${index}`}  className=''/>
            
//             </SwiperSlide>
//           ))}
//           </Swiper>
//         </div>

       
//       </div>
//     </section>
//   );
// };




const partners = [
    "logo/image1.png",
    "logo/image2.png",
    "logo/image3.png",
    "logo/image4.png",
    "logo/image5.png",
];

export const PartnersSection = () => {
  const extendedPartners = [...partners, ...partners];

  return (
    <section className="flex flex-col items-center justify-center lg:gap-y-4 mt-24 mb-24 md:gap-y-3 gap-y-2 w-full ">
      {/* <Typography as="h2" variant="h2">
        Ils nous ont Fait confiance
      </Typography> */}

      <div className="w-full max-w-container mx-auto overflow-hidden bg-gray-100 rounded-lg lg:py-4 md:py-6" dir="ltr">
        <motion.div
          className="flex lg:gap-16 md:gap-12 gap-8 items-center whitespace-nowrap"
          animate={{
            x: [0, -extendedPartners.length * 150],
          }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          {extendedPartners.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <div className="text-center">
                <img
                  src={partner}
                  alt={partner}
                  draggable="false"
                  width={230}
                  height={149}
                  className="lg:w-[230px] md:w-[190px] w-[150px] object-contain select-none transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;