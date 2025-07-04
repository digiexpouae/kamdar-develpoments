

import { useState, useEffect } from 'react';
import { Sling as Hamburger } from 'hamburger-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/logo.png';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/project', label: 'Projects' },
  { href: '/news', label: 'News' },
];

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: 0.2 + (i || 0) * 0.1, 
      duration: 0.4 
    },
  })
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const handleScroll = () => setScrolled(window.scrollY > 10);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);


  return (
    
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 
       bg-black/40 backdrop-blur-md
      font-lexend font-light`}
    >
      <nav className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between w-full">
          {/* Left: Desktop Nav */}
          <div className="flex-1 flex justify-start">
            <div className="hidden md:flex space-x-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  <Link
                    href={link.href}
                    className="text-white text-base font-light hover:underline"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Hamburger */}
            <div className="md:hidden flex items-center z-[200]">
              <Hamburger
                toggled={mobileOpen}
                toggle={setMobileOpen}
                size={28}
                color="#fff"
                label="Show menu"
              />
            </div>
          </div>

          {/* Center: Logo */}
          <motion.div
            className="flex-1 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                width={144}
                height={40}
                className="w-36 object-contain"
              />
            </Link>
          </motion.div>

          {/* Right: Contact Button */}
          <motion.div
            className="flex-1 flex justify-end"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link href="/contact">
            <button
              
              className="hidden md:inline-block bg-white text-black rounded-md px-6 py-2 font-light shadow cursor-pointer hover:bg-gray-200 transition focus:outline-none"
              type="button"
            >
              Contact Us
            </button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence mode="wait" initial={false}>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="fixed inset-y-0 left-0 w-64 h-screen z-50 bg-black backdrop-blur-md p-6 flex flex-col gap-8 md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <Image
                  src={logo}
                  alt="Logo"
                  width={96}
                  height={30}
                  className="w-24 object-contain ml-auto"
                />
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                  >
                    <Link
                      href={link.href}
                      className="text-white text-lg font-light hover:underline"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <Link href="/contact">
              <button
                
                className="mt-auto bg-white text-black rounded-md px-6 py-2 font-light shadow cursor-pointer hover:bg-gray-200 transition focus:outline-none"
                type="button"
              >
                Contact Us
              </button>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Page transition overlay */}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            key="contact-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#000',
              zIndex: 9999,
              pointerEvents: 'auto',
            }}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
