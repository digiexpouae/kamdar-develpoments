'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const content = [
    {
        title: 'DESIGN & INNOVATION',
        description:
            'At Kamdar Developments, Design & Innovation are at the forefront of our services. We embrace cutting-edge design principles and creative solutions to craft spaces that inspire and engage. Our collaborative approach ensures that every project reflects unique visions and integrates functionality with aesthetics, creating exceptional environments that enhance quality of life.',
        image: '/assets/3.jpg',
    },
    {
        title: 'ARCHITECTURE & ENGINEERING',
        description:
            'We combine modern architectural techniques with engineering precision to deliver structurally sound and visually striking developments.',
        image: '/assets/2.png',
    },
    {
        title: 'SUSTAINABLE DEVELOPMENT',
        description:
            'Kamdar integrates eco-friendly practices to create sustainable living spaces that reduce environmental impact and promote well-being.',
        image: '/assets/2.png',
    },
    {
        title: 'URBAN PLANNING',
        description:
            'From infrastructure to green spaces, our urban planning team designs cohesive communities with long-term vision and value.',
        image: '/assets/1.png',
    },
];

const Section3 = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="min-h-screen font-lexend bg-[url('/assets/aboutimages/slider_bg.jpg')] bg-cover bg-center flex flex-col items-center px-4 py-12">
            {/* Heading and Description */}
            <div className="text-center mt-10 mb-10">
                <h2
                    className="text-5xl md:text-7xl font-bold text-white"
                    style={{
                        fontFamily: 'Luxerie, sans-serif',
                    }}
                >
                YEARS OF SERVICE
                </h2>
                <p className="text-white text-sm md:text-md font-base font-lexend mt-4 max-w-xl mx-auto">
                    Established over 40 years ago, Kamdar boasts a diverse portfolio spanning three continents and encompassing numerous subsidiaries across various sectors. Our company is overseen by a skilled board of directors, ensuring strategic governance. Among our subsidiaries are Kamdar Developments and several other entities worldwide.
                </p>
            </div>

            {/* Desktop View */}
            <div className="hidden md:grid bg-white rounded-xl shadow-xl w-[800px] mb-10 h-[500px] grid-cols-1 md:grid-cols-2 overflow-hidden">
                {/* Image */}
                <div className="relative w-full h-full">
                    <Image
                        src={content[activeIndex].image}
                        alt={content[activeIndex].title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-l-xl"
                    />
                </div>

                {/* Text */}
                <div className="p-10 flex flex-col justify-between h-full">
                    <div>
                        <h3
                            className="text-4xl font-semibold mb-4"
                            style={{ fontFamily: 'Luxerie, sans-serif' }}
                        >
                            {content[activeIndex].title}
                        </h3>
                        <p className="text-black font-lexend text-base leading-relaxed">
                            {content[activeIndex].description}
                        </p>
                    </div>
                    <div className="mt-6 flex space-x-2">
                        {content.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`px-2 py-1 border rounded-[5px] text-sm transition ${idx === activeIndex ? 'bg-black text-white' : 'bg-white text-black'
                                    }`}
                            >
                                {`0${idx + 1}`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden w-full max-w-sm bg-white rounded-xl shadow-xl text-center h-[550px] flex flex-col">
                {/* Top Content */}
                <div className="flex-grow px-6 pt-6">
                    <h3
                        className="text-3xl font-semibold mb-2"
                        style={{ fontFamily: 'Luxerie, sans-serif' }}
                    >
                        {content[activeIndex].title}
                    </h3>
                    <p className="text-black font-lexend text-sm mb-4 line-clamp-[6]">
                        {content[activeIndex].description}
                    </p>

                    {/* Navigation Above Image */}
                    <div className="flex justify-center space-x-2">
                        {content.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`px-2 py-1 border rounded-[5px] text-xs transition ${idx === activeIndex ? 'bg-black text-white' : 'bg-white text-black'
                                    }`}
                            >
                                {`0${idx + 1}`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Image - flush at bottom */}
                <div className="relative w-full h-72 rounded-b-xl overflow-hidden">
                    <Image
                        src={content[activeIndex].image}
                        alt={content[activeIndex].title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-b-xl"
                    />
                </div>
            </div>


        </div>
    );
};

export default Section3;
