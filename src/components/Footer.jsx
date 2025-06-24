import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const socialIcons = [
  { src: "/assets/insta.png", alt: "Instagram" },
  { src: "/assets/linkedin.png", alt: "LinkedIn" },
  { src: "/assets/fb.png", alt: "Facebook" },
  { src: "/assets/youtube.png", alt: "YouTube" },
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#projects", label: "Projects" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact Us" },
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
              <Image src={icon.src} alt={icon.alt} fill className="object-contain" />
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
        className="pt-8 text-white/40 font-lexend font-[200] text-xs text-left"
      >
        ©2025 Kamdar Development
      </motion.div>
    </footer>
  );
};

export default Footer;
