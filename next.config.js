const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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
        destination: '/105-RESIDENCES',
      },
      {
        source: '/project1',
        destination: '/105-RESIDENCES',
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

module.exports = withBundleAnalyzer(nextConfig);