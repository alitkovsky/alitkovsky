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
    // E-E-A-T: Education credentials
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Taurida V.I. Vernadsky National University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Simferopol',
        addressCountry: 'UA',
      },
    },
    // E-E-A-T: Professional certifications
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Digital Marketing Professional Certificate',
        credentialCategory: 'certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Content Marketing Institute',
        },
        dateCreated: '2025-03',
        url: 'https://www.linkedin.com/learning/certificates/dd2e4956921f69e82c024361171b6a4364a3b12bf7a8d298f7f8b4d974c69785',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'HubSpot Marketing Hub Software',
        credentialCategory: 'certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'HubSpot Academy',
          url: 'https://academy.hubspot.com',
        },
        dateCreated: '2025-03',
        url: 'https://app.hubspot.com/academy/achievements/41jh50tc/en/1/andrii-litkovskyi/hubspot-marketing-hub-software',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'LinkedIn Certified Marketing Insider',
        credentialCategory: 'certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'LinkedIn',
          url: 'https://www.linkedin.com',
        },
        dateCreated: '2025-03',
        url: 'https://verify.skilljar.com/c/ompyyiw62qyi',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Google Analytics Certification',
        credentialCategory: 'certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Google',
          url: 'https://skillshop.google.com',
        },
        dateCreated: '2025-01',
        url: 'https://skillshop.credential.net/8f0ae8dd-61e4-436b-8def-22f710dc4802',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'German B2 Certificate',
        credentialCategory: 'certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'telc GmbH',
          url: 'https://www.telc.net',
        },
        dateCreated: '2024-09',
        url: 'https://results.telc.net/qr/4DfpYIMoQ3u1skjqxfDgxU3uv472s0sDmrqtjq5D10_SKNDXlANETac3r5mTpnxe',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'English C1 Certificate',
        credentialCategory: 'certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'EF Education First',
          url: 'https://www.efset.org',
        },
        dateCreated: '2023-07',
        url: 'https://cert.efset.org/227RcM',
      },
    ],
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
