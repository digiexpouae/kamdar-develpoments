// components/Section3.jsx
import React from 'react';
import { motion } from 'framer-motion';
import bg from "../../../../public/assets/formbg.png";
import Image from 'next/image';
import quote from "../../../../public/assets/this.png";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 2,
      ease: 'easeOut',
    },
  },
};

const Section3 = () => {
  return (
    <section
      className="reveal-on-scroll relative w-full min-h-[700px] px-6 sm:px-10 md:px-20 lg:px-32 xl:px-80 py-16 font-['Lexend']"
      style={{
  backgroundImage: `url('/assets/formbg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top Grid: CEO Message and Quote/Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {/* Left: CEO Message */}
          <div className="flex flex-col gap-4 z-10">
            <motion.h2
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ fontFamily: 'Luxerie' }}
              className="reveal-on-scroll text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-7xl font-normal leading-8 md:leading-14 tracking-tight mb-0"
            >
              CEO MESSAGE
            </motion.h2>
            <motion.p
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="reveal-on-scroll text-lg sm:text-xl font-base mb-4"
            >
              We founded Kamdar with a simple belief; that real estate should stand the test of time, both in design and in trust. Every home we build is a reflection of that legacy.
            </motion.p>
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="reveal-on-scroll mt-4"
            >
              <div style={{ fontFamily: 'Luxerie' }} className="reveal-on-scroll text-4xl font-medium">YUSUF KAMDAR</div>
              <div className="reveal-on-scroll text-base font-base">Chairman of Kamdar Developments</div>
            </motion.div>
            <motion.button
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="reveal-on-scroll mt-5 w-fit px-6 py-2 bg-black text-white rounded-md shadow hover:bg-gray-900 transition"
            >
              Get in Touch
            </motion.button>
          </div>

          {/* Right: Large Quote or Image */}
          <motion.div
            variants={fadeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="reveal-on-scroll md:flex hidden justify-center items-start z-0"
          >
          <Image
  src={quote}
  alt="Quote or CEO"
  width={320}
  height={400} // or whatever you need
  className="w-[320px] h-auto object-contain opacity-90 rounded-xl"
/>

          </motion.div>
        </div>

        {/* Bottom: Stats and Subheading */}
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="reveal-on-scroll flex flex-col gap-8 mt-5 items-start"
        >
          <motion.h2
            variants={fadeVariants}
            className="reveal-on-scroll text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-normal tracking-tight mb-4"
            style={{ fontFamily: 'Luxerie' }}
          >
            GLOBAL LEGACY<br />LOCAL EXPERTISE
          </motion.h2>

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
            <motion.div variants={fadeVariants} className="reveal-on-scroll">
              <h3 className="reveal-on-scroll text-5xl sm:text-6xl font-medium bg-black text-transparent bg-clip-text">
                40+
              </h3>
              <p className="reveal-on-scroll mt-0 text-base sm:text-lg font-base tracking-wide">
                Years
              </p>
            </motion.div>

            <motion.div variants={fadeVariants} className="reveal-on-scroll">
              <h3 className="reveal-on-scroll text-5xl sm:text-6xl font-medium bg-black text-transparent bg-clip-text">
                500+
              </h3>
              <p className="reveal-on-scroll mt-0 text-base sm:text-lg font-base tracking-wide">
                Properties
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Section3;
