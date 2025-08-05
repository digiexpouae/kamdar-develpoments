import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
};

const Section1Video = ({ text, backgroundImage, backgroundImageMobile, poster, className }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const videoSrc = isMobile ? backgroundImageMobile : backgroundImage;
  const posterSrc = isMobile ? '/assets/homevideo-poster.jpg' : '/assets/homevideo-poster-pc.jpg ';

  // Preload critical resources
  useEffect(() => {
    // Preload poster image
    const preloadImage = new Image();
    preloadImage.src = posterSrc;
    
    // Preload video
    const preloadVideo = document.createElement('video');
    preloadVideo.src = videoSrc;
    preloadVideo.preload = 'metadata';
    
    // Set mobile state
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };
    
    const isMobileView = checkMobile();
    
    // Load video after critical content is loaded
    const loadVideo = () => {
      if (document.readyState === 'complete') {
        setShowVideo(true);
      } else {
        window.addEventListener('load', () => setShowVideo(true));
      }
    };
    
    // Small delay to ensure LCP image loads first
    const timeout = setTimeout(loadVideo, 100);
    
    window.addEventListener('resize', checkMobile);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('load', loadVideo);
    };
  }, [videoSrc, posterSrc]);
  
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <motion.section
      className={`relative max-w-full h-screen bg-cover bg-center flex items-center justify-center ${className}`}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background Video */}
      {showVideo && (
        <>
          {/* Poster image that shows while video loads */}
          {!isVideoLoaded && (
            <img
              src={posterSrc}
              alt="Background"
              className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
              loading="eager"
              fetchpriority="high"
            />
          )}
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
            onLoadedData={handleVideoLoaded}
            className={`absolute top-0 left-0 w-full h-full object-cover z-[-1] ${!isVideoLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}
          />
        </>
      )}

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <motion.h1
          style={{ fontFamily: 'Luxerie' }}
          className="text-white text-center text-6xl md:text-7xl md:leading-[0.8]"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {text}
        </motion.h1>
      </div>
    </motion.section>
  );
};

export default Section1Video;
