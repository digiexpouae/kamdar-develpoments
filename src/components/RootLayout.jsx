import React from 'react';

const RootLayout = ({ children }) => {
  return (
    <div className="root-layout">
      {/* Add global header, nav, or footer here if you want */}
      {children}
    </div>
  );
};

export default RootLayout;
