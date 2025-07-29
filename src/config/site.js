export const SITE = {
  name: 'Kamdar Developments',
  url: 'https://kamdardevelopments.com',
  description: 'Leading real estate development company in Dubai offering premium properties and exceptional living experiences.',
  defaultLocale: 'en',
  locale: 'en',
  author: 'Kamdar Developments',
  logo: 'https://kamdardevelopments.com/_next/static/media/logo.48a3960a.png',
  logoAlt: 'Kamdar Developments Logo',
  themeColor: '#ffffff',
  social: {
    facebook: 'https://www.facebook.com/kamdardevelopments/',
    instagram: 'https://www.instagram.com/kamdardevelopments/'
  },
  contact: {
    phone: '+971 4 885 9549',
    email: 'info@kamdardevelopment.com',
    address: {
      street: 'Unit No. S03-103, MAG AlQuoz Logistic Park',
      city: 'Dubai',
      country: 'United Arab Emirates',
      countryCode: 'AE',
      postalCode: '',
      coordinates: {
        latitude: '',
        longitude: ''
      }
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'Kamdar Developments',
    title: 'Kamdar Developments | Premium Real Estate in Dubai',
    description: 'Leading real estate development company in Dubai offering premium properties and exceptional living experiences.'
  },
  twitter: {
    handle: '@kamdardevelopments',
    site: '@kamdardevelopments',
    cardType: 'summary_large_image'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export const ROUTES = {
  home: '/',
  about: '/about',
  projects: '/projects',
  project: (slug) => `/projects/${slug}`,
  news: '/news',
  blog: (slug) => `/blog/${slug}`,
  contact: '/contact',
  terms: '/terms',
  privacy: '/privacy',
  sitemap: '/sitemap.xml',
  robots: '/robots.txt'
};

export const NAVIGATION = [
  { name: 'Home', href: ROUTES.home },
  { name: 'About', href: ROUTES.about },
  { name: 'Projects', href: ROUTES.projects },
  { name: 'News', href: ROUTES.news },
  { name: 'Contact', href: ROUTES.contact }
];

export const FOOTER_LINKS = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: ROUTES.about },
      { name: 'Projects', href: ROUTES.projects },
      { name: 'News', href: ROUTES.news },
      { name: 'Contact Us', href: ROUTES.contact }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: ROUTES.privacy },
      { name: 'Terms of Service', href: ROUTES.terms },
      { name: 'Sitemap', href: ROUTES.sitemap }
    ]
  }
];
