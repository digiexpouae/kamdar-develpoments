import '../styles/globals.css';
import StickyIcon from '../common/stickyicon/stickyicon';
import RootLayout from '../components/RootLayout';
import SEO from '../components/seo/SEO';
import { SITE } from '../config/site';

// Default SEO configuration
const defaultSEO = {
  title: SITE.openGraph.title,
  description: SITE.openGraph.description,
  ogTitle: SITE.openGraph.title,
  ogDescription: SITE.openGraph.description,
  ogImage: SITE.logo,
  structuredData: {
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    inLanguage: SITE.locale
  }
};

const App = ({ Component, pageProps }) => {
  // Get page-specific SEO props if available, otherwise use defaults
  const seoProps = {
    ...defaultSEO,
    ...(pageProps.seo || {})
  };
  
  // Add any additional structured data from page props
  if (pageProps.structuredData) {
    seoProps.structuredData = {
      ...seoProps.structuredData,
      ...pageProps.structuredData
    };
  }

  return (
    <>
      <SEO {...seoProps} />
      <RootLayout>
        <Component {...pageProps} />
        <StickyIcon />
      </RootLayout>
    </>
  );
};

export default App;
