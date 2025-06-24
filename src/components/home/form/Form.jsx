import React from 'react';
import { motion } from 'framer-motion';
import bgImage from '../../../../public/assets/bg_5.png';
import formBg from '../../../../public/assets/formbg.png';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 2 },
  }),
};

const Form = () => {
  return (
    <>
      <style>{`
        .section6-shadow {
          position: relative;
        }
        .section6-shadow::before,
        .section6-shadow::after {
          content: '';
          position: absolute;
          top: 0;
          width: 60px;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }
        .section6-shadow::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        .section6-shadow::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }
        .bg-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
        }
        .bg-base {
          background-image: url(${formBg.src});
          z-index: 1;
        }
        .bg-overlay {
          background-image: url(${bgImage.src});
          z-index: 2;
        }
      `}</style>

      <section className="w-full py-16 px-4 md:px-0 flex justify-center items-center bg-black text-white section6-shadow relative">
        <div className="bg-layer bg-base" />
        <motion.div
          className="bg-layer bg-overlay"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 3 }}
        />

        <motion.div
          className="reveal-on-scroll max-w-xl w-full bg-transparent p-6 md:p-10 rounded-lg relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <motion.h2
            className="text-4xl md:text-7xl font-bold text-center text-black"
            style={{ fontFamily: 'Luxerie' }}
            custom={0}
            variants={fadeUp}
          >
            REGISTER NOW
          </motion.h2>

          <motion.p
            className="text-center text-sm mb-8 text-black font-lexend"
            custom={1}
            variants={fadeUp}
          >
            Send an enquiry by filling in the form below
          </motion.p>

          <motion.form
            className="space-y-4 font-lexend font-[300]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <motion.div className="flex gap-4" custom={2} variants={fadeUp}>
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 px-4 py-2 bg-transparent border border-black rounded-md text-black placeholder-black"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 px-4 py-2 bg-transparent border border-black rounded-md text-black placeholder-black"
              />
            </motion.div>

            <motion.div className="flex gap-4" custom={3} variants={fadeUp}>
              <input
                type="text"
                placeholder="Phone number"
                className="w-1/2 px-4 py-2 bg-transparent border border-black rounded-md text-black placeholder-black"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-1/2 px-4 py-2 bg-transparent border border-black rounded-md text-black placeholder-black"
              />
            </motion.div>

            <motion.div custom={4} variants={fadeUp}>
              <select className="w-full px-4 py-2 bg-transparent border border-black rounded-md text-black">
                <option>Enquiry Type</option>
                <option>Sales</option>
                <option>Support</option>
                <option>General</option>
              </select>
            </motion.div>

            <motion.div custom={5} variants={fadeUp}>
              <textarea
                placeholder="Message"
                rows="4"
                className="w-full px-4 py-2 bg-transparent border border-black rounded-md text-black placeholder-black"
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-md bg-black text-white font-[300] shadow-md hover:opacity-90"
              custom={6}
              variants={fadeUp}
            >
              Submit
            </motion.button>
          </motion.form>
        </motion.div>
      </section>
    </>
  );
};

export default Form;
