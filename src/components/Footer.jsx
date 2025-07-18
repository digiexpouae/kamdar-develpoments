import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { div } from "framer-motion/client";

const socialIcons = [
  { src: "/assets/instagram.svg", alt: "Instagram", href: "https://www.instagram.com/kamdardevelopments/" },
  { src: "/assets/linkedin.svg", alt: "LinkedIn", href: "https://www.linkedin.com/company/kamdar-developments/posts/?feedView=all" },
  { src: "/assets/fb.svg", alt: "Facebook", href: "https://www.facebook.com/kamdardevelopments/" },

];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "about", label: "About Us" },
  { href: "/project", label: "Projects" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact Us" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: delay * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Footer = () => {
  return (

    <>

<div className="md:hidden block">
      <footer className="bg-black text-white p-6 flex flex-col gap-6 text-sm">

        {/* Row 1: Text Left + Icons Right */}
        <div className="flex justify-between items-start gap-4">
          <p className="font-light leading-snug w-2/3">
            Stay updated with the latest news,<br />
            promotions, and exclusive offers.
          </p>
          <div className="flex gap-3">
          {socialIcons.map((icon, index) => (
                <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
                  <Image className="cursor-pointer" src={icon.src} alt={icon.alt} width={20} height={20} />
                </a>
              ))}
          </div>
        </div>

        {/* Row 2: Subscribe Input */}
        <div className="w-full flex border border-white rounded-sm overflow-hidden">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 px-4 py-2 bg-transparent text-white placeholder-white/60 outline-none text-sm"
          />
          <button className="bg-white text-black px-4 py-2 text-sm font-medium whitespace-nowrap">
            Subscribe
          </button>
        </div>

        {/* Row 3: Centered Logo */}
        <div className="flex justify-center">
          <Image
            src="/assets/logo.png"
            alt="Kamdar Developments"
            width={160}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Dashed Divider */}
        <div className="w-full border-1 border border-white/30" />

        {/* Row 5: Bottom Text */}
        <div className="flex justify-between items-center text-xs text-white/60">
          <p>©2025 Kamdar Development</p>
          <div className="flex gap-2">
          <Link href="/terms">Terms & Conditions</Link>
            <span>|</span>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>




      <div className="md:block hidden">
        <footer className="bg-[#0F0D0D] text-white text-sm px-6 md:px-20 py-10">
          {/* Top Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 pb-6"
          >
            {/* Stay Updated */}
            <motion.div variants={fadeUp} custom={0} className="text-center md:text-left md:w-1/3">
              <p className="font-lexend font-[200] leading-tight">
                Stay updated with the latest news,<br className="hidden md:block" />
                promotions, and exclusive offers.
              </p>
            </motion.div>

            {/* Subscribe */}
            <motion.div variants={fadeUp} custom={1} className="w-full max-w-sm md:w-1/3">
              <div className="flex border border-white rounded-sm overflow-hidden">
                <input
                  type="email"
                  placeholder="Email address"
                  className="px-4 py-2 text-white bg-transparent placeholder-white/60 w-full outline-none font-lexend font-[200]"
                />
                <button className="bg-white px-6 py-2 text-black text-sm font-medium whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex gap-4 md:w-1/3 justify-center md:justify-end"
            >
              {socialIcons.map((icon, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-8 h-8"
                >
                   <a key={idx} href={icon.href} target="_blank" rel="noopener noreferrer">
                  <Image className="cursor-pointer" src={icon.src} alt={icon.alt} width={40} height={40} />
                </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
         

          <hr className="border-gray-600 my-6" />

          {/* Middle Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between gap-8 pt-6"
          >
            {/* Logo & Tagline */}
            <motion.div variants={fadeUp} custom={3} className="md:w-1/2">
              <Link href="/">
                <Image
                  src="/assets/logo.png"
                  alt="Kamdar Logo"
                  width={160}
                  height={40}
                  className="mb-6 h-10 object-contain"
                />
              </Link>
              <p className="text-3xl md:text-4xl font-light leading-8" style={{ fontFamily: "Luxerie" }}>
                BUILT FOR GENERATIONS <br /> CRAFTED WITH PURPOSE
              </p>
            </motion.div>

            {/* Links & Contact */}
            <div className="md:w-1/2 flex flex-col md:flex-row justify-between gap-8 text-sm md:text-base">
              <motion.div
                variants={fadeUp}
                custom={4}
                className="space-y-2 font-lexend font-[200]"
              >
                {footerLinks.map((link, idx) => (
                  <Link key={idx} href={link.href}>
                    <motion.p whileHover={{ x: 5 }} className="cursor-pointer">
                      {link.label}
                    </motion.p>
                  </Link>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={5}
                className="font-lexend text-white/40 font-[200] space-y-2 leading-relaxed"
              >
                <p>Unit No. S03-103, MAG</p>
                <p>AlQuoz Logistic Park, Dubai</p>
                <p className="pt-4">info@kamdardevelopment.com</p>
                <p>+971 4 885 9549</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={6}
            className="pt-8 text-white/40 font-lexend flex justify-between font-[200] text-xs text-left"
          >
            ©2025 Kamdar Development
            <div className="flex gap-2">
            <Link href="/terms">Terms & Conditions</Link>
            <span>|</span>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
          </motion.div>
        </footer>
      </div>
    </>

  );
};

export default Footer;
