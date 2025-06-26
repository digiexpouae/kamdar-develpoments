import React from 'react';
import { motion } from 'framer-motion';

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

      <section className="w-full h-[600px] md:h-[600px] py-16 px-4 md:px-0 flex justify-center items-center bg-white text-white section6-shadow relative">
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
                <option>Are you</option>
                <option>Sales</option>
                <option>Support</option>
                <option>General</option>
              </select>
            </motion.div>

            <motion.div custom={5} variants={fadeUp}>
              <textarea
                placeholder="Your message"
                rows="4"
                className="w-full px-4 py-2 bg-transparent border border-black rounded-md text-black placeholder-black resize-none"
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
