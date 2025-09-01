import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ChevronLeft, ChevronRight, ZoomIn, Maximize, Pause, Play } from "lucide-react";
import { useLocation } from "react-router-dom";
import { portfolioItems } from "./projectsData";
import HeaderWithCircle from "@/components/HeaderWithCircle";
import { RiArrowRightSLine } from "react-icons/ri";

import Header from '../components/Header';
import Footer from '../components/Footer';



const ProjectDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const project = portfolioItems[id - 1];
  console.log("Project :", project);
  const type = project.type;
  
  if (type === "video") {
    return (
      <VideoProjectDetail id={id} />
    );
  }
  return (
    <ImageProjectDetail id={id} />
  );
}

export default ProjectDetail
const ImageProjectDetail = ({ id = 1 }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  if (!id || isNaN(Number(id)) || Number(id) < 1 || Number(id) > portfolioItems.length) {
    return <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">Invalid project ID</div>;
  }
  
  const project = portfolioItems[id - 1];
  
  if (!project) {
    return <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">Project not found</div>;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsLoading(false), 800);
  }, []);



  // Function to render images in masonry layout
  const renderMasonryImages = () => {
    if (!project.photos || project.photos.length === 0) return null;

    const rows = [];
    let i = 0;

    while (i < project.photos.length) {
      // First row: One full-width image
      if (project.photos[i]) {
        rows.push(
          <motion.div
            key={`row-${i}`}
            className="w-full mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: rows.length * 0.1 }}
          >
            <img
              src={project.photos[i]}
              alt={`Project image ${i + 1}`}
              className="w-full h-[400px] md:h-[600px] object-cover  cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {
                setSelectedImage(project.photos[i]);
                setSelectedImageIndex(i);
              }}
            />
          </motion.div>
        );
        i++;
      }

      // Second row: Two half-width images side by side
      if (project.photos[i] || project.photos[i + 1]) {
        rows.push(
          <motion.div
            key={`row-${i}`}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: rows.length * 0.1 }}
          >
            {project.photos[i] && (
              <img
                src={project.photos[i]}
                alt={`Project image ${i + 1}`}
                className="w-full h-[300px] md:h-[400px] object-cover  cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => {
                  setSelectedImage(project.photos[i]);
                  setSelectedImageIndex(i);
                }}
              />
            )}
            {project.photos[i + 1] && (
              <img
                src={project.photos[i + 1]}
                alt={`Project image ${i + 2}`}
                className="w-full h-[300px] md:h-[400px] object-cover  cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => {
                  setSelectedImage(project.photos[i + 1]);
                  setSelectedImageIndex(i + 1);
                }}
              />
            )}
          </motion.div>
        );
        i += 2;
      }
    }

    return rows;
  };

  return (
    <div className="min-h-screen text-black">
      {/* Simple Header Section */}
      <section className="py-16 bg-black border- border-gray-200">
        <Header />
      </section>
      
      <div className="h-[351px] w-full bg-black px-8 sm:px-16 md:px-0">
        <div 
          className="bg-white h-[401px] w-full flex items-center justify-center max-w-7xl md:mx-auto relative z-10"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="text-white flex flex-col items-center justify-center z-20 relative text-center px-4">
            <motion.h1
              initial={{ opacity: 0,  }}
              animate={{ opacity: 1,  }}
              transition={{ duration: 0.6, delay: 0.2 }}

              className="text-4xl md:text-5xl font-bold mb-4">
              {project.title}
            </motion.h1>
            <p className="text-lg max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto overflow-hidden">
        <div className="w-full flex flex-col">
          {/* Navigation buttons */}
        
          <p className="mt-[50px] pt-16 self-center text-[20px] font-bold text-red-500">
            Social Media SPOT TV BRANDING WEBSITE CREATION MEDIA
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-16 mt-[50px] w-full px-8 sm:px-16">
            <div className="flex flex-col items-center justify- h-full gap-8 md:gap-8">
              <h3 className="text-2xl font-bold text-[30px]">Challenge</h3>
              <p className="text-gray-700 text-start text-[18px] bg">
                Permettre à cette nouvelle marque d'eau de table de se faire connaître et de gagner rapidement des PDM.
                Challenger les acteurs de la catégorie avec l'objectif de devenir un player majeur des eaux de table et plus largement des eaux en bouteilles.
              </p>
            </div>
            
            <div className="flex flex-col items-center justify- h-full gap-8 md:gap-8">
              <h3 className="text-2xl font-bold text-[30px]">SOLUTIONS</h3>
              <p className="text-gray-700 text-start text-[18px] bg">
                Stratégie de communication pour lancement de produit
                Spot TV – film equity
                Conception et impression des supports de communication
                Stratégie média online & offline
                Stratégie d'influence
                Brand content
                Activation & drive to consumer
              </p>
            </div>
          </div>
        </div>

        {/* Masonry Image Gallery */}
        <div className="px-8 sm:px-16 pb-16">
          {renderMasonryImages()}
        </div>
          <div className="flex justify-between items-center px-8 sm:px-16 mt-8 mb-16">
            <button
              onClick={() => {
                const prevId = (Number(id) - 1) || portfolioItems.length;
                window.location.href = `/project?id=${prevId}`;
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous Project</span>
            </button>
            <button
              onClick={() => {
                const nextId = ((Number(id) + 1) > portfolioItems.length) ? 1 : (Number(id) + 1);
                window.location.href = `/project?id=${nextId}`;
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
            >
              <span>Next Project</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
      </section>
        
          <Footer />
    </div>
  );
};



const VideoProjectDetail = ({id}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [playingVideos, setPlayingVideos] = useState({});

  
  
  if (!id || isNaN(Number(id)) || Number(id) < 1 || Number(id) > portfolioItems.length) {
    return <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">Invalid project ID</div>;
  }
  
  const project = portfolioItems[id - 1];
  
  if (!project) {
    return <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">Project not found</div>;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openVideoModal = (video, index) => {
    setSelectedVideo(video);
    setSelectedVideoIndex(index);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const navigateVideo = (direction) => {
    const newIndex = direction === 'next' 
      ? (selectedVideoIndex + 1) % project.videos.length
      : (selectedVideoIndex - 1 + project.videos.length) % project.videos.length;
    
    setSelectedVideoIndex(newIndex);
    setSelectedVideo(project.videos[newIndex]);
  };

  const togglePlay = (videoId, videoElement) => {
    if (playingVideos[videoId]) {
      videoElement.pause();
      setPlayingVideos(prev => ({ ...prev, [videoId]: false }));
    } else {
      videoElement.play();
      setPlayingVideos(prev => ({ ...prev, [videoId]: true }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeVideoModal();
    if (e.key === 'ArrowRight') navigateVideo('next');
    if (e.key === 'ArrowLeft') navigateVideo('prev');
  };

  useEffect(() => {
    if (selectedVideo) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo, selectedVideoIndex]);


  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header Section */}
        <Header isBlack={true} />
      <section className="relative py-16 bg-white">
       {/* <section className="relative py-16 bg-black "></section> */}
        <div className="h-24"></div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center px-8 sm:px-16 max-w-7xl mx-auto mb-8">
          <button
            onClick={() => {
              const prevId = (Number(id) - 1) || portfolioItems.length;
              window.location.href = `/project?id=${prevId}`;
            }}
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous Project</span>
          </button>
          <button
            onClick={() => {
              const nextId = ((Number(id) + 1) > portfolioItems.length) ? 1 : (Number(id) + 1);
              window.location.href = `/project?id=${nextId}`;
            }}
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
          >
            <span>Next Project</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="text-center px-6 max-w-7xl mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-10"
          >
            <HeaderWithCircle title="Production Video" titleClassName="text-black font-bold " circlePostion={"center"}/>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              {project.title}
            </h1>
            
            <p className="text-lg text-black  max-w-2xl mx-auto">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Simple Video Gallery Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
          </motion.div>

          {/* Simple Video Grid */}
          <div className="space-y-8">
            {project.videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all "
              >
                <div className="relative aspect-video">
                  <video
                    ref={(el) => {
                      if (el) {
                        el.onplay = () => setPlayingVideos(prev => ({ ...prev, [index]: true }));
                        el.onpause = () => setPlayingVideos(prev => ({ ...prev, [index]: false }));
                      }
                    }}
                    className="w-full h-full object-cover"
                    poster={video.thumbnail}
                    preload="metadata"
                    muted
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Simple Play Button */}
                  <button
                    onClick={(e) => {
                      const videoElement = e.currentTarget.parentElement.querySelector('video');
                      togglePlay(index, videoElement);
                    }}
                    className="absolute inset-0 flex items-center justify-center group-hover:bg-black/10 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg transition-all duration-300"
                    >
                      {playingVideos[index] ? (
                        <Pause className="w-6 h-6 text-gray-700" />
                      ) : (
                        <Play className="w-6 h-6 text-gray-700 ml-1" />
                      )}
                    </motion.div>
                  </button>

                  {/* Simple Fullscreen Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openVideoModal(video, index);
                    }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-700 hover:bg-white transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeVideoModal}
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-6 right-6 z-60 bg-white rounded-full p-2 text-gray-700 hover:bg-gray-100 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            {project.videos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateVideo('prev'); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-60 bg-white rounded-full p-2 text-gray-700 hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={(e) => { e.stopPropagation(); navigateVideo('next'); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-60 bg-white rounded-full p-2 text-gray-700 hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Video Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-60 bg-white rounded-full px-4 py-2 text-gray-700 text-sm shadow-lg">
              {selectedVideoIndex + 1} / {project.videos.length}
            </div>

            {/* Video Player */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl max-h-[85vh] w-full aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={selectedVideo.src}
                controls
                autoPlay
                className="w-full h-full object-contain rounded-lg"
                poster={selectedVideo.thumbnail}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};