// components/Section2.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 3,
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

const Section2video = ({ text, className, backgroundImage, mobileBackgroundImage }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const bgVideo = isMobile && mobileBackgroundImage ? mobileBackgroundImage : backgroundImage;

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

                {/* Background Video */}
                <video
                    src={bgVideo}
                    autoPlay
                    loop
                    muted
                    preload='auto'
                    playsInline
                    className="absolute top-0 left-0 w-full h-screen object-cover z-0"
                />


                <div className="relative z-0 flex flex-col items-center justify-center w-full h-full">
                    <motion.h1
                        style={{ fontFamily: 'Luxerie' }}
                        className="reveal-on-scroll text-white text-center text-6xl md:text-7xl md:leading-[0.8]"
                        variants={fadeVariants2}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        viewport={{ once: true }}
                    >
                        {text}
                    </motion.h1>
                </div>
            </motion.div>
        </section>
    );
};

export default Section2video;
