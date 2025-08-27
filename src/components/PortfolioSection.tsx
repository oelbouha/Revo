import React, { useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';
import HeaderWithCircle from './HeaderWithCircle';
import { portfolioItems } from '@/pages/projectsData';
import { Arrow } from '@radix-ui/react-context-menu';
import { RiArrowRightSLine } from "react-icons/ri";




const HoverVideo = ({ src, alt, poster, className }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);


  const handleVideoLoad = () => {
    setIsLoaded(true);
    console.log('Video loaded');
  };

  const handleMouseEnter = async () => {
    console.log('Hover triggered');
    if (videoRef.current && isLoaded) {
      try {
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
        console.log('Video playing');
      } catch (err) {
        console.error('Play failed:', err);
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      preload="auto"
      className={`${className} pointer-events-auto z-10`} 
      onLoadedData={handleVideoLoad}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

function getRandomEven(min, max) {
  let num = Math.floor(Math.random() * ((max - min + 1) / 2)) * 2;
  // Ensure it falls within the range
  if (num + (min % 2) < min) return min + (min % 2);
  return num + (min % 2);
}



type PortfolioItem = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  webImage?: string;
  color?: string;
  categories: string[];
  size: string;
  description?: string;
  photos?: { src: string; width: number; height: number }[];
  type?: string;
  thumbnail?: string;
};

const PortfolioSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filters = [
    'All',
    'Branding',
    'Activation',
    'Direction Créative',
    'Packaging',
    'Web',
    'Print',
    'Production vidéo',
    'Campagne',
  ];

  const getFilteredItems = () => {
    const filtered =
      activeFilter === 'All'
        ? portfolioItems
        : portfolioItems.filter((item) =>
            item.categories.includes(activeFilter)
          );

    return showAll ? filtered : filtered.slice(0, 8);
  };

  const shuffledItems = useMemo(() => {
    const items = getFilteredItems();
    return items
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }, [activeFilter, showAll]);

  const whyChooseUsIndex = shuffledItems.length;
  const finalItems: (PortfolioItem | 'WHY_CHOOSE_US')[] = [
    ...shuffledItems.slice(0, whyChooseUsIndex),
    'WHY_CHOOSE_US',
    ...shuffledItems.slice(whyChooseUsIndex),
  ];

  const hasMoreItems = () => {
    const totalFiltered =
      activeFilter === 'All'
        ? portfolioItems.length
        : portfolioItems.filter((item) =>
            item.categories.includes(activeFilter)
          ).length;
    return totalFiltered > 10 && !showAll;
  };

  return (
    <section id="portfolio" className="mb-24">
      <div className="text-end  mb-16">
        <div className="w-full  h-14 md:h-20 flex items-center justify-center  px-10 mb-24 bg-[#4D4D4D]">
          <div className="max-w-7xl w-full h-full ">
            <HeaderWithCircle title="Our work" titleClassName='text-white uppercase ' circlePostion={"end"}/>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {filters.map((filter, index) => (
            <div key={filter} className="flex items-center ">
            <button
              key={filter}
              onClick={() => {
                setShowAll(false);
                setActiveFilter((prev) =>
                  prev === filter ? 'All' : filter
                );
              }}
              className={`px-2 py-2 text-sm md:text-lg transition-colors lowercase ${
                activeFilter === filter
                  ? 'text-blue '
                  : 'text-gray-600 hover:text-blue'
              }`}
            >
              {filter} 
            </button>
              {filter != 'Campagne'   && <div className='text-gray-600 h-1 w-1 bg-gray-600 rounded-full'></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-12">
        <AnimatePresence>
          {finalItems.map((item, index) => {
            if (item === 'WHY_CHOOSE_US') {
              return (
                <motion.div
                  layout
                  key="why-choose-us"
                  className=" relative flex aspect-[4/3] flex-col cursor-pointer bg-black hover:bg-black/50 p-10 md:p-20"
                >
                 
                
                  {hasMoreItems() && (
                    // <button
                    //   onClick={() => setShowAll(true)}
                    //   className="mt-6 bg-blue text-white px-6 py-2 text-sm font-medium hover:bg-black transition-colors duration-300"
                    // >
                    //   MORE PROJECTS
                    // </button>
                    <div
                      onClick={() => setShowAll(true)} 
                      className="absolute flex items-center justify-between bottom-0  left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white ">
                    <div className="">
                      <h3 className="text-2xl font-semibold mb-1">See more</h3>
                      <h4 className="text-lg">Of our work</h4>
                    </div>
                    <RiArrowRightSLine className="w-16 h-16 inline-block ml-2 text-white" />
                  </div>
                  )}
                </motion.div>
              );
            }

            // Ensure item is a valid PortfolioItem
            if (typeof item !== 'object' || !item.categories) return null;

            return (
              <motion.div
                layout
                key={`${item.id}-${activeFilter}`}
                className="group relative overflow-hidden cursor-pointer aspect-[4/3]"
                onClick={() => {
                  navigate(`/projectDetail?id=${item.id}`);
                }}
              >
                {
                activeFilter === 'Production vidéo' ||
                  item.type === 'video' ? (
                    <HoverVideo
                      src={item.image}
                      alt={item.title}
                      poster={item.thumbnail}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  ) : (
                    <img
                      src={
                        activeFilter === 'Web' && item.webImage
                          ? item.webImage
                          : item.image
                      }
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}

                  <div className="absolute inset-0 bg-black/0 bg-black/50 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                
                  <div className="absolute flex items-center justify-between bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white ">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1">{item.title}</h3>
                      <h4 className="text-lg">{item.categories[0]}</h4>
                    </div>
                    <RiArrowRightSLine className="w-12 h-12 inline-block ml-2 text-white" />
                  </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {showAll && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(false)}
            className="bg-blue text-white px-6 py-2 text-sm font-medium hover:bg-gray-700 transition-colors duration-300"
          >
            SHOW LESS
          </button>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
