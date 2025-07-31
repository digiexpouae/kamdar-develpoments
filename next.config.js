const { source } = require("framer-motion/m");

const nextConfig = {
  // config options here
  reactStrictMode: true,
  async rewrites() {
    return [
      // Project routes
      {
        source: '/projects',
        destination: '/project',
      },
      {
        source: '/portfolio/105-residences-by-kamdar',
        destination: '/project1',
      },
      {
        source: '/projects/:path*',
        destination: '/project/:path*',
      },
      {
        source: '/why-choose-us',
        destination: '/',
      },  {
        source: '/faq',
        destination: '/',
      },
      // About routes
      {
        source: '/about-us',
        destination: '/about',
      },
      {
        source: '/about-us/:path*',
        destination: '/about/:path*',
      },
      // Contact routes
      {
        source: '/contact-us',
        destination: '/contact',
      },
      {
        source: '/contact-us/:path*',
        destination: '/contact/:path*',
      },
    ];
  },
};

module.exports = nextConfig;