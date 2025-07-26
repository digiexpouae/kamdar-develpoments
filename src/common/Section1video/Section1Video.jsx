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
 
  
  className,
}) => { 
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  

  useEffect(() => {
    // Defer video load to allow first paint
    const timeout = setTimeout(() => {
      setShowVideo(true);
    }, 300); // can adjust based on your testing
    return () => clearTimeout(timeout);
  }, []);

  const bgVideo =   backgroundImage;

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
        <video
          ref={videoRef}
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          onLoadedData={() => setShowVideo(true)}
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
