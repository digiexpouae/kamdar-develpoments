import '../styles/globals.css';
import StickyIcon from '../common/stickyicon/stickyicon';
import RootLayout from '../components/RootLayout';
import SEO from '../components/seo/SEO';
import { SITE } from '../config/site';
import { useEffect } from 'react';
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


  useEffect(() => {
    // Facebook Pixel
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '2307403746375376');
    fbq('track', 'PageView');
  }, []);

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
