import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ChevronLeft, ChevronRight, ZoomIn, Maximize, Pause, Play } from "lucide-react";
import { useLocation } from "react-router-dom";
import { portfolioItems } from "./projectsData";
import { useNavigate } from 'react-router-dom';

const ProjectDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [isLoading, setIsLoading] = useState(false);

  // Handle invalid ID and redirect
  useEffect(() => {
    if (!id || isNaN(Number(id)) || Number(id) < 1 || Number(id) > portfolioItems.length) {
      navigate(`/project?id=1`, { replace: true });
      return;
    }
  }, [id, navigate]);

  // Early return if invalid ID (while redirect is happening)
  if (!id || isNaN(Number(id)) || Number(id) < 1 || Number(id) > portfolioItems.length) {
    return <div>Redirecting...</div>; // Or a loading spinner
  }
  
  const project = portfolioItems[Number(id) - 1];
  
  // Handle case where project doesn't exist (extra safety)
  if (!project) {
    navigate(`/project?id=1`, { replace: true });
    return <div>Redirecting...</div>;
  }

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        window.location.hash = sectionId;
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };



  return (
    <div className=" text-black">
      <ProjectBanner thumbnail={project.thumbnail} title={project.title} description={project.description} />

      <section className="max-w-7xl mx-auto overflow-hidden ">
        <div className="w-full flex flex-col">
          {/* Navigation buttons */}  
         { project.challenge && project.solutions && <ChallengeAndSolution challenge={project.challenge} solution={project.solutions} />}
        </div>

      {project.photos && (
        <div className="px-8 sm:px-16 md:pb-16">
          <MasonryImages photos={project.photos} />
        </div>
      )}

       
        {/* {videos } */}
        {project.videos && <RenderVideos videos={project.videos} />}


        <div className="flex justify-between items-center px-8 sm:px-16 mt-8 mb-16">
          <div >
             <button
            onClick={() => {
              const prevId = (Number(id) - 1) || portfolioItems.length;
                handleNavigation("portfolio");
            }}
            className="flex items-center gap-1 md:gap-2 text-gray-700 hover:text-black transition-colors"
          >
            <ChevronLeft className="w-3 h-3 md:w-5 md:h-5" />
            <span className="text-[10px] md:text-lg " >Back to our works</span>
          </button>  
          </div>
          <div className="flex  items-center gap-4 md:gap-8">
          <button
            onClick={() => {
              const prevId = (Number(id) - 1) || portfolioItems.length;
                navigate(`/project?id=${prevId}`);
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-1 md:gap-2 text-gray-700 hover:text-black transition-colors"
          >
            <ChevronLeft className="w-3 h-3 md:w-5 md:h-5" />
            <span className="text-[10px] md:text-lg " >Previous Project</span>
          </button>
          <button
            onClick={() => {
              const nextId = ((Number(id) + 1) > portfolioItems.length) ? 1 : (Number(id) + 1);
              navigate(`/project?id=${nextId}`);
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-1 md:gap-2 text-gray-700 hover:text-black transition-colors"
          >
            <span className="text-[10px] md:text-lg ">Next Project</span>
            <ChevronRight className="w-3 h-3 md:w-5 md:h-5" />
          </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;

type Video = {
  src: string;
  thumbnail: string;
};

const RenderVideos = ({videos} : {videos: Video[]}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [playingVideos, setPlayingVideos] = useState({});

  const getVideoType = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('drive.google.com')) return 'gdrive';
    return 'direct';
  };

  const getYouTubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const getGDriveEmbedUrl = (url) => {
    const fileId = url.match(/[-\w]{25,}/);
    return fileId ? `https://drive.google.com/file/d/${fileId[0]}/preview` : null;
  };

  const getVideoEmbedUrl = (video) => {
    const type = getVideoType(video.src);
    switch (type) {
      case 'youtube':
        return getYouTubeEmbedUrl(video.src);
      case 'gdrive':
        return getGDriveEmbedUrl(video.src);
      default:
        return video.src;
    }
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

  return (
    <div className=" bg-white max-w-7xl mx-auto px-8 sm:px-16 md:pb-16 py-16 ">
          <div className="space-y-8 ">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all "
              >
                <div className="relative aspect-video">
                  {getVideoType(video.src) === 'direct' ? (
                    <>
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

                      {/* Simple Play Button for direct videos */}
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
                    </>
                  ) : (
                    <iframe
                      src={getVideoEmbedUrl(video)}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      title={`Video ${index + 1}`}
                    />
                  )}
                </div>
              </motion.div>
            ))}
        </div>
    </div>
  );
};

const MasonryImages = ({ photos }: { photos: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!photos || photos.length === 0) return null;

  const rows = [];
  let i = 0;

  while (i < photos.length) {
    // First row
    if (photos[i]) {
      rows.push(
        <motion.div key={`row-${i}`} className="w-full mb-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: rows.length * 0.1 }}>
          <img
            src={photos[i]}
            alt={`Project image ${i + 1}`}
            loading="lazy"
            className="w-full md:h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => {
              setSelectedImage(photos[i]);
              setSelectedImageIndex(i);
            }}
          />
        </motion.div>
      );
      i++;
    }

    // Second row
    if ((i < photos.length - 1) && (photos[i] || photos[i + 1] && i > 2)) {
      rows.push(
        <motion.div key={`row-${i}`} className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: rows.length * 0.1 }}>
          {photos[i] && (
            <img
              src={photos[i]}
              alt={`Project image ${i + 1}`}
              loading="lazy"
              className="w-full md:h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {
                setSelectedImage(photos[i]);
                setSelectedImageIndex(i);
              }}
            />
          )}
          {photos[i + 1] && (
            <img
              src={photos[i + 1]}
              alt={`Project image ${i + 2}`}
              loading="lazy"
              className="w-full md:h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {
                setSelectedImage(photos[i + 1]);
                setSelectedImageIndex(i + 1);
              }}
            />
          )}
        </motion.div>
      );
      i += 2;
    }
  }

  return <>{rows}</>;
};

type ChallengeAndSolutionProps = {
  challenge: string;
  solution: string;
};

const ChallengeAndSolution = ({ challenge, solution }: ChallengeAndSolutionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-16  w-full px-8 sm:px-16">
        {  challenge &&  <div className="flex flex-col items-center justify- h-full gap-8 md:gap-8">
            <h3 className="text-2xl font-bold text-[30px]">CHALLENGE</h3>
            <p className="text-gray-700 text-center md:text-start text-[18px] ">
              {challenge}
            </p>
          </div>}
          
         {  solution && <div className="flex flex-col items-center justify- h-full gap-8 md:gap-8">
            <h3 className="text-2xl font-bold text-[30px]">SOLUTIONS</h3>
            <p className="text-gray-700 text-center md:text-start text-[18px] bg">
              {solution}
            </p>
          </div>
          }
    </div>
  );
}

type ProjectBannerProps = {
  thumbnail: string;
  title: string;
  description: string;
};

const ProjectBanner = ({ thumbnail, title, description }: ProjectBannerProps) => {
    return (
          <section className="relative h-[350px] bg-black border- border-gray-200 flex items-center justify-center">
       <img 
          src={thumbnail} 
          alt={title} 
          className="absolute  w-full h-full object-cover"
          loading="lazy"
        />
         <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="text-white flex flex-col items-center justify-center z-20 relative text-center px-4">
          <motion.h1
            initial={{ opacity: 0,  }}
            animate={{ opacity: 1,  }}
            transition={{ duration: 0.6, delay: 0.2 }}

            className="text-2xl md:text-4xl font-bold mb-4">
            {title}
          </motion.h1>
          <p className=" text-sm md:text-lg max-w-2xl " >
            {description}
          </p>
        </div>
    </section>
    );
}