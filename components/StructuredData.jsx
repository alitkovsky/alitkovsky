export default function StructuredData() {
  const baseUrl = 'https://litkovskyi.de';

  // Person Schema - Andrii Litkovskyi
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: 'Andrii Litkovskyi',
    alternateName: 'Андрій Літковський',
    url: baseUrl,
    image: `${baseUrl}/og-image.png`,
    jobTitle: {
      '@language': 'en',
      '@value': 'Digital Marketing Expert',
    },
    description: {
      '@language': 'en',
      '@value': 'Marketing without buzzwords or empty promises. 15+ years of experience in paid social, SEO, and CRM automation.',
    },
    email: 'andrii@litkovskyi.de',
    telephone: '+49 176 58238236',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mindener Straße 87',
      addressLocality: 'Hille',
      postalCode: '32479',
      addressCountry: 'DE',
    },
    sameAs: [
      'https://www.linkedin.com/in/andrii-litkovskyi/',
      'https://www.instagram.com/litkovskyi/',
      'https://www.upwork.com/freelancers/~01fc21565de40bab50',
    ],
    knowsLanguage: ['de', 'en', 'uk'],
  };

  // LocalBusiness Schema - Freelance Services
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#business`,
    name: 'Andrii Litkovskyi - Marketing Services',
    alternateName: 'Andrii Litkovskyi - Marketing Dienstleistungen',
    description: {
      '@language': 'de',
      '@value': 'Marketing ohne Buzzwords und leere Versprechen. Über 15 Jahre Erfahrung in Paid Social, SEO und CRM-Automatisierung.',
    },
    url: baseUrl,
    image: `${baseUrl}/og-image.png`,
    telephone: '+49 176 58238236',
    email: 'andrii@litkovskyi.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mindener Straße 87',
      addressLocality: 'Hille',
      postalCode: '32479',
      addressRegion: 'Nordrhein-Westfalen',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.3333,
      longitude: 8.7500,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '15:00',
      },
    ],
    priceRange: '$$',
    founder: { '@id': `${baseUrl}/#person` },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '3',
      reviewCount: '3',
    },
  };

  // Organization Schema - Business entity
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Andrii Litkovskyi - Marketing Services',
    alternateName: 'litkovskyi.de',
    url: baseUrl,
    logo: `${baseUrl}/og-image.png`,
    image: `${baseUrl}/og-image.png`,
    description: 'Online-Marketing-Beratung in Minden-Lübbecke. SEO, Google Ads & Meta Ads für lokale Unternehmen in OWL.',
    email: 'andrii@litkovskyi.de',
    telephone: '+49 176 58238236',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mindener Straße 87',
      addressLocality: 'Hille',
      postalCode: '32479',
      addressRegion: 'Nordrhein-Westfalen',
      addressCountry: 'DE',
    },
    founder: { '@id': `${baseUrl}/#person` },
    sameAs: [
      'https://www.linkedin.com/in/andrii-litkovskyi/',
      'https://www.instagram.com/litkovskyi/',
      'https://github.com/alitkovsky',
    ],
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Andrii Litkovskyi',
    alternateName: 'litkovskyi.de',
    description: {
      '@language': 'en',
      '@value': 'Digital Marketing Expert - Transparent, Hands-on, Down-to-earth, Locally rooted',
    },
    inLanguage: ['de', 'en'],
    author: { '@id': `${baseUrl}/#person` },
    publisher: { '@id': `${baseUrl}/#person` },
  };

  // ProfessionalService Schema - Services offered
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#services`,
    name: {
      '@language': 'en',
      '@value': 'Digital Marketing Services',
    },
    alternateName: {
      '@language': 'de',
      '@value': 'Digitale Marketing Dienstleistungen',
    },
    provider: { '@id': `${baseUrl}/#person` },
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    serviceType: [
      'SEO Optimization',
      'Paid Social Media Advertising',
      'CRM Automation',
      'Google Analytics',
      'Marketing Strategy',
      'Performance Marketing',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Optimization',
            description: 'Search engine optimization to increase visibility',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Paid Social Advertising',
            description: 'Meta Ads, LinkedIn Campaign Management',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CRM Automation',
            description: 'HubSpot, Mailchimp automation setup',
          },
        },
      ],
    },
  };

  // BreadcrumbList Schema for navigation
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
