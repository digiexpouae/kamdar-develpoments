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

const Section1Video = ({
  text,
  backgroundImage,
  mobileBackgroundImage,
  placeholderImage,
  className,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Defer video load to allow first paint
    const timeout = setTimeout(() => {
      setShowVideo(true);
    }, 300); // can adjust based on your testing
    return () => clearTimeout(timeout);
  }, []);

  const bgVideo = isMobile && mobileBackgroundImage ? mobileBackgroundImage : backgroundImage;

  return (
    <motion.section
      className={`relative max-w-full h-screen bg-cover bg-center flex items-center justify-center ${className}`}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Placeholder Image */}
      {placeholderImage && (
        <motion.img
          src={placeholderImage}
          alt="video placeholder"
          initial={{ opacity: 1 }}
          animate={{ opacity: videoLoaded ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
          loading="eager"
        />
      )}

      {/* Background Video */}
      {showVideo && (
        <video
          ref={videoRef}
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          onLoadedData={() => setVideoLoaded(true)}
        />
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
