import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ContactSection = () => {
  return (
    <section className="md:pb-34 py-8 px-6 md:px-15  bg-white">
     
      {/* Contact Info */}
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-20 mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {/* Phone */}
        <div className="flex items-center gap-2 md:gap-5 text-center">
          <Image src="/assets/contact/phone.png" alt="Phone Icon" width={30} height={30} />
          <span className="text-sm md:text-base font-medium text-black">+971 4 885 9549</span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 md:gap-5 text-center">
          <Image src="/assets/contact/msg.png" alt="Mail Icon" width={30} height={30} />
          <span className="text-sm md:text-base font-medium text-black">info@kamdardevelopment.com</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 md:gap-5 text-center md:text-left">
          <Image src="/assets/contact/pin.png" alt="Location Icon" width={20} height={20} />
          <span className="text-sm md:text-base font-medium text-black">
            Unit No. S03-103, MAG AlQuoz <br />
            Logistic Park, Dubai
          </span>
        </div>
      </motion.div>

      {/* Map */}
      <motion.div 
        className="rounded-xl overflow-hidden flex justify-center items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <Image 
          src="/assets/map.png"
          alt="Map Location"
          width={450}
          height={450}
          className="md:w-[1050px] md:h-[500px] "
        />
      </motion.div>
    </section>
  );
};

export default ContactSection;
