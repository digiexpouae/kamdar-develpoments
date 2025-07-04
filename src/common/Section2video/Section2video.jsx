// components/Section2.jsx
import React from 'react';
import { motion } from 'framer-motion';

const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: 'easeOut',
        },
    },
};

const fadeVariants2 = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay: 5,
            ease: 'easeOut',
        },
    },
};

const Section2video = ({ text, className }) => {

    return (
        <section
            className={`reveal-on-scroll max-w-full h-screen bg-cover bg-center flex  items-center justify-center ${className}`}
            style={{
                backgroundImage: `url('/assets/2.png')`,
            }}    >
            <motion.div
                className="reveal-on-scroll relative z-10 flex flex-col items-center justify-center  w-full h-full"
                variants={fadeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >

                <video
                    src="/assets/105video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/assets/2.png"
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    aria-hidden="true"
                />
<div className="relative z-0 flex flex-col items-center justify-center w-full h-full">
        <motion.h1
          style={{ fontFamily: 'Luxerie' }}
          className="reveal-on-scroll text-white text-center text-6xl md:text-7xl md:leading-[0.8]"
          variants={fadeVariants2}
          initial="hidden"
          animate="visible"
          exit="exit"
          viewport={{ once: true}}
        >
       {text}
        </motion.h1>
      </div>
            </motion.div>
        </section>
    );
};

export default Section2video;
