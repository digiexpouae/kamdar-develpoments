

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Head from 'next/head';

const LAND_VIDEO_PATH = "/assets/homevideo.mp4";
const PORT_VIDEO_PATH = "/assets/homevideo-mobile.mp4";
const POSTER_IMAGE_PATH = "/assets/homevideo-poster-pc.jpg";

export default function Section1() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobileCheck = window.innerWidth < 768;
      setIsMobile(mobileCheck);
      setVideoSrc(mobileCheck ? PORT_VIDEO_PATH : LAND_VIDEO_PATH);
    };

    // Initial check
    checkMobile();

    // Debounce resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const handleVideoLoad = () => {
    setIsLoaded(true);
    // Start playback if it's not already playing
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  };

  <Head>
    <link
      src={POSTER_IMAGE_PATH}
      alt="Background"
      className="object-cover"
      fill
      priority
      fetchPriority="high"
      sizes="110vw"
    />

    <video
      ref={videoRef}

      key={videoSrc}
      className={`absolute inset-0   w-full h-[120vh] object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      playsInline
      autoPlay
      muted
      loop
      preload="auto"
      onCanPlayThrough={handleVideoLoad}
      onError={() => console.error("Video loading failed")}
    >
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>

  </Head>

  return (

    <section className="w-full   h-screen relative overflow-hidden">
      {/* Fallback image - shows immediately and fades out when video loads */}
      <div className={`absolute  inset-0 transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src={POSTER_IMAGE_PATH}
          alt="Background"
          className="object-cover"
          fill
          priority
          fetchPriority="high"
          sizes="110vw"

        />
      </div>

      {/* Video element - only rendered when we know which source to use */}
      {videoSrc && (
        <video
          ref={videoRef}

          key={videoSrc}
          className={`absolute inset-0   w-full h-[120vh] object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          playsInline
          autoPlay
          muted
          loop
          preload="auto"
          onCanPlayThrough={handleVideoLoad}
          onError={() => console.error("Video loading failed")}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {/* Text Content */}
      <div className="relative z-0 flex flex-col items-center justify-center w-full h-full">
        <motion.h1
          style={{ fontFamily: 'Luxerie' }}
          className="text-white z-0 text-center text-6xl md:text-7xl md:leading-[0.8]"

          initial="hidden"
          animate="visible"
          exit="exit"
        >
          BUILT FOR GENERATIONS<br />
          CRAFTED WITH PURPOSE
        </motion.h1>
      </div>
    </section>
  );
}