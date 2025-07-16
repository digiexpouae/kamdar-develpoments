'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import slider from '/assets/aboutimages/slider1.png';
import sliderimg from '/assets/slider2.jpg';
import sliderimg2 from '/assets/projectimages/project-2.jpg';
import khaleejLogo from '/assets/khaleej1.png';
import arabialogo from '../../../public/assets/homeslider/arab.png'
import bayanlogo from '../../../public/assets/homeslider/bayan.png'
import identitylogo from '../../../public/assets/homeslider/identity.png'
import designlogo from '../../../public/assets/homeslider/design.png'
import plumberlogo from '../../../public/assets/homeslider/plumber.png'
import plumberslide from '../../../public/assets/homeslider/hs2.png'
import Link from 'next/link';
import { Link2 } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};

const ClientSlider = ({ heading, buttonheading, href }) => {
    const [current, setCurrent] = useState(1);

    const total = 7; // Since we have 7 slides now
    const extendedSlides = [
        // This is the last slide added at the beginning for infinite loop
        {
            image: plumberslide,
            logo: designlogo,
            heading: 'Kamdar Developments Partners With Luxedesign to Deliver Elevated Residential Design',
            text: 'Kamdar Developments has appointed Luxedesign (LDV) as the General Contractor for the 105 Residences in JVC and an exclusive luxury villa collection in Meydan.',
            buttonHref: 'https://www.arabianbusiness.com/industries/real-estate/dubai-real-estate-kamdar-developments-breaks-ground-on-105-residences-in-jvc',
        },
        // Original slides
        {
            image: sliderimg2,
            logo: khaleejLogo,
            heading: 'Kamdar unveils new residential development in Dubai\'s JVC',
            text: 'Renowned developer launches first UAE project for public sale after four decades of delivering exclusive private developments',
            buttonHref: 'https://www.khaleejtimes.com/business/kamdar-unveils-new-residential-development-in-dubais-jvc',
        },
        {
            image: slider,
            logo: arabialogo,
            heading: 'Kamdar Developments Breaks Ground on 105 Residences in JVC',
            text: 'A 105-unit luxury residential Dubai project starting from $174,000 with completion expected in early 2027',
            buttonHref: 'https://www.albayan.ae/economy/business/real-estate/13347',
        },
        {
            image: sliderimg2,
            logo: bayanlogo,
            heading: 'Launch of Kamdar 105 project in Jumeirah Village Circle',
            text: 'Dubai-based Kamdar Developers has announced the launch of its new Kamdar 105 Residences project in Jumeirah Village Circle,.........',
            buttonHref: 'https://www.arabianbusiness.com/industries/real-estate/dubai-real-estate-kamdar-property-development-announces-new-105-residences-in-jvc',
        },
        {
            image: sliderimg,
            logo: identitylogo,
            heading: 'Unveiling Attainable Luxury',
            text: 'Kamdar Developments has launched 105 Residences, a new high-end development in Jumeirah Village Circle.',
            buttonHref: 'https://identity.ae/105-residences-jvc/',
        },
        {
            image: plumberslide,
            logo: plumberlogo,
            heading: 'Kamdar Developments Appoints Main Contractor for Latest Project',
            text: 'Emphasising on timely delivery and exceptional quality, Luxedesign\'s appointment is expected to support the project\'s completion by early 2027',
            buttonHref: 'https://www.mepmiddleeast.com/people/appointments/kamdar-developments-appoints-main-contractor',
        },
        {
            image: sliderimg2,
            logo: arabialogo,
            heading: 'Kamdar Property Development announces new 105 Residences\' in JVC',
            text: '105 Residences in Dubai\'s JVC features comprehensive amenities, including a rooftop open-air cinema, swimming pool, fitness studio and more',
            buttonHref: 'https://design-middleeast.com/kamdar-developments-partners-with-luxedesign-to-deliver-elevated-residential-design/',
        },
        {
            image: plumberslide,
            logo: designlogo,
            heading: 'Kamdar Developments Partners With Luxedesign to Deliver Elevated Residential Design',
            text: 'Kamdar Developments has appointed Luxedesign (LDV) as the General Contractor for the 105 Residences in JVC and an exclusive luxury villa collection in Meydan.',
            buttonHref: 'https://www.arabianbusiness.com/industries/real-estate/dubai-real-estate-kamdar-developments-breaks-ground-on-105-residences-in-jvc',
        },
        // This is the first slide added at the end for infinite loop
        {
            image: sliderimg2,
            logo: khaleejLogo,
            heading: 'Kamdar unveils new residential development in Dubai\'s JVC',
            text: 'Renowned developer launches first UAE project for public sale after four decades of delivering exclusive private developments',
            buttonHref: 'https://www.khaleejtimes.com/business/kamdar-unveils-new-residential-development-in-dubais-jvc',
        }
    ];
    const extendedTotal = extendedSlides.length;

    const [slideWidth, setSlideWidth] = useState(0);
    const [previewWidth, setPreviewWidth] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const container = Math.min(Math.max(window.innerWidth * 0.85, 280), 900);
            const slide = container * 0.8;
            const preview = container * 0.2;
            setSlideWidth(slide);
            setPreviewWidth(preview);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getTranslateX = () => {
        const totalSlideWidth = slideWidth + previewWidth;
        const containerCenter = (slideWidth + previewWidth) / 2;
        const offset = current * totalSlideWidth + slideWidth / 2 - containerCenter;
        return offset;
    };

    useEffect(() => {
        if (!transitioning) return;

        const timeout = setTimeout(() => {
            if (current === 0) {
                setTransitioning(false);
                setCurrent(total);
            } else if (current === total + 1) {
                setTransitioning(false);
                setCurrent(1);
            } else {
                setTransitioning(false);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [current, transitioning, total]);

    useEffect(() => {
        let interval;
        interval = setInterval(() => {
            if (!transitioning) {
                setTransitioning(true);
                setCurrent((prev) => prev + 1);
            }
        }, 2000);

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [transitioning]);

    const realIndex = (current - 1 + total) % total;
    const containerWidth = slideWidth + previewWidth;
    const containerHeight = Math.min(slideWidth * 0.56, 500);

    // Navigation handlers
    const goToPrev = () => {
        if (!transitioning) {
            setTransitioning(true);
            setCurrent((prev) => prev - 1);
        }
    };
    const goToNext = () => {
        if (!transitioning) {
            setTransitioning(true);
            setCurrent((prev) => prev + 1);
        }
    };

    return (
        <div className="w-full h-screen bg-black px-2 pb-20 pt-10  flex justify-center">
            <div className="w-full max-w-5xl">
                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-col items-center justify-center text-center mb-8 w-full"
                >
                    <h2
                        className="text-4xl sm:text-6xl mt-10  font-light text-white tracking-tight mb-4"
                        style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}
                    >
                        {heading}
                    </h2>

                    <Link href={href}>
                        <button className="bg-white text-black mb-14 cursor-pointer px-6 py-2 rounded-md transition text-sm sm:text-base w-auto">
                            {buttonheading}
                        </button>
                    </Link>
                </motion.div>

                {/* Slider */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative flex flex-col items-center mt-8"
                >
                    {/* Previous Arrow */}
                    <button
                        aria-label="Previous Slide"
                        onClick={goToPrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 cursor-pointer hover:bg-white text-black rounded-full p-2 shadow-lg focus:outline-none transform transition-transform duration-300 hover:scale-110 active:scale-95"
                        style={{ border: '1px solid black', fontSize: 20 }}
                    >
                        &#8592;
                    </button>

                    {/* Next Arrow */}
                    <button
                        aria-label="Next Slide"
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 cursor-pointer hover:bg-white text-black rounded-full p-2 shadow-lg focus:outline-none transform transition-transform duration-300 hover:scale-110 active:scale-95"
                        style={{ border: '1px solid black', fontSize: 20 }}
                    >
                        &#8594;
                    </button>

                    <div
                        className="relative"
                        style={{
                            width: `${containerWidth}px`,
                            height: `${containerHeight}px`,
                            maxHeight: '500px',
                        }}
                    >
                        <div
                            className={`flex ${transitioning
                                ? 'transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]'
                                : ''}`}
                            style={{
                                transform: `translateX(-${getTranslateX()}px)`,
                            }}
                        >
                            {extendedSlides.map((slide, index) => (
                                <div
                                    key={index}
                                    className="flex-1 relative"
                                    style={{
                                        width: `${slideWidth}px`,
                                        height: `${containerHeight}px`,
                                    }}
                                >
                                    <div className="absolute inset-0">
                                        <Image
                                            src={slide.image}
                                            alt={slide.heading}
                                            layout="fill"
                                            objectFit="cover"
                                            priority={index === realIndex}
                                            className="brightness-50"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/0" />
                                    <div className="absolute inset-0 flex flex-col items-start justify-center p-8">
                                        <Image
                                            src={slide.logo}
                                            alt="Logo"
                                            width={50}
                                            height={50}
                                            className="mb-4"
                                        />
                                        <h3 className="text-2xl sm:text-4xl font-light text-white mb-2">
                                            {slide.heading}
                                        </h3>
                                        <p className="text-base sm:text-lg text-white mb-4">
                                            {slide.text}
                                        </p>
                                        <Link href={slide.buttonHref} target="_blank">
                                            <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded text-sm">
                                                Read More
                                                <Link2 size={16} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ClientSlider;
