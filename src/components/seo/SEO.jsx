import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE } from '../../config/site';

const SEO = ({
  title = SITE.name,
  description = SITE.description,
  keywords = 'real estate, property, dubai, kamdar, developments, construction',
  ogTitle,
  ogDescription,
  ogImage = SITE.logo,
  ogUrl,
  structuredData = {},
  noIndex = !SITE.robots.index,
  noFollow = !SITE.robots.follow,
}) => {
  const router = useRouter();
  const canonicalUrl = ogUrl || `${SITE.url}${router.asPath}`;
  
  // Default structured data if none provided
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: canonicalUrl,
    inLanguage: SITE.locale,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: SITE.logo
      }
    }
  };

  // Merge provided structured data with default
  const mergedStructuredData = {
    ...defaultStructuredData,
    ...structuredData,
  };

  // Add organization schema if not already included
  if (!mergedStructuredData.organization) {
    mergedStructuredData.organization = {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: SITE.logo,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE.contact.phone,
        email: SITE.contact.email,
        contactType: 'customer service',
        areaServed: SITE.contact.address.countryCode,
        availableLanguage: [SITE.defaultLocale]
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.contact.address.street,
        addressLocality: SITE.contact.address.city,
        addressCountry: SITE.contact.address.countryCode
      },
      sameAs: Object.values(SITE.social)
    };
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={ogTitle || title} />
      <meta property="twitter:description" content={ogDescription || description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Robots */}
      <meta name="robots" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mergedStructuredData)
        }}
      />
      
      {/* Add Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Kamdar Developments",
            "url": "https://kamdardevelopments.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://kamdardevelopments.com/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "inLanguage": "en"
          })
        }}
      />
      
      {/* Add Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Kamdar Developments",
            "url": "https://kamdardevelopments.com",
            "logo": "https://kamdardevelopments.com/_next/static/media/logo.48a3960a.png",
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+971 4 885 9549",
              "email": "info@kamdardevelopment.com",
              "contactType": "customer service",
              "availableLanguage": ["English"],
              "areaServed": "AE"
            }],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Unit No. S03-103, MAG AlQuoz Logistic Park",
              "addressLocality": "Dubai",
              "addressCountry": "AE"
            },
            "sameAs": [
              "https://www.facebook.com/kamdardevelopments/",
              "https://www.instagram.com/kamdardevelopments/"
            ]
          })
        }}
      />
    </Head>
  );
};

export default SEO;
