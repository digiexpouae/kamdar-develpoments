import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const RootLayout = ({ children }) => {
  const router = useRouter();
  return (
    <div className="root-layout">
      {/* Add global header, nav, or footer here if you want */}
      <AnimatePresence mode="wait">
        <motion.div
          key={router.asPath}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RootLayout;
