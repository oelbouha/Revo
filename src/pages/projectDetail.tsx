import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ChevronLeft, ChevronRight, ZoomIn, Maximize, Pause, Play } from "lucide-react";
import { useLocation } from "react-router-dom";
import { portfolioItems } from "./projectsData";
import HeaderWithCircle from "@/components/HeaderWithCircle";
import { RiArrowRightSLine } from "react-icons/ri";

import Header from '../components/Header';



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

const ImageProjectDetail = ({ id }) => {
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

  const openModal = (img, index) => {
    setSelectedImage(img);
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (selectedImageIndex + 1) % project.photos.length
      : (selectedImageIndex - 1 + project.photos.length) % project.photos.length;
    
    setSelectedImageIndex(newIndex);
    // setSelectedImage(project.photos[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') navigateImage('next');
    if (e.key === 'ArrowLeft') navigateImage('prev');
  };

  const prevSlide = () => {

  }

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, selectedImageIndex]);


  return (
    <div className="min-h-screen text-black ">
      {/* Simple Header Section */}
      <Header isBlack={true} />
      <section className="relative py-16 bg-white ">
        <div className="h-24"></div>
        <div className="text-center px-6 max-w-7xl mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center items-center gap-16 "
          >
            <HeaderWithCircle title= {project.title} titleClassName="text-black font-bold text-8xl lowercase" circlePostion={"center"}/>
            <p className="text-l md:text-lg lg:text-xl text-black mb-8 max-w-4xl mx-auto ">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg- md:py-16  overflow-hidden ">
        <div className="max-w-7xl mx-auto h-[25rem] md:h-[50rem] px-">
          <div className="h-full md:px-16 w-full overflow-hidden rounded-lg  relative flex items-center justify-center bg-white">
            {/* Image */
            project.photos &&
              <motion.img
                key={selectedImageIndex}
                src={project.photos[selectedImageIndex]}
                alt={`Project image ${selectedImageIndex + 1}`}
                className="max-h-full max-w-full object-contain cursor-pointer"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                onClick={() => openModal(project.photos[selectedImageIndex], selectedImageIndex)}
            />
            }
            {/* Left Arrow */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute top-1/2 left-0 -translate-y-1/2 w-[2rem] h-[2rem] lg:w-[4rem] lg:h-[4rem] "
            >
              <RiArrowRightSLine   className="w-full h-full rotate-180 text-black" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => navigateImage("next")}
              className="absolute top-1/2 right-0 -translate-y-1/2  w-[2rem] h-[2rem] lg:w-[4rem] lg:h-[4rem] text-white "
            >
              <RiArrowRightSLine   className="w-full h-full  text-black" />
            </button>
          </div>
        </div>
      </section>


      {/* Simple Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-60 bg-white rounded-full p-2 text-gray-700 hover:bg-gray-100 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-60 bg-white rounded-full p-2 text-gray-700 hover:bg-gray-100 transition-colors shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-60 bg-white rounded-full p-2 text-gray-700 hover:bg-gray-100 transition-colors shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

           

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl h-[99dvh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
               src={project.photos[selectedImageIndex]}
                alt="Enlarged project image"
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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