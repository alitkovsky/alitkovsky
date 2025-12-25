/**
 * Image Sitemap for enhanced image SEO
 * Helps search engines discover and index images
 */
export default function imageSitemap() {
  const baseUrl = 'https://litkovskyi.de';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2024-12-25'),
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          title: 'Andrii Litkovskyi - Marketing Berater',
          caption: 'Andrii Litkovskyi - Online Marketing Experte aus Hille, OWL',
        },
        {
          url: `${baseUrl}/og-image.webp`,
          title: 'Andrii Litkovskyi Portrait',
          caption: 'Marketing Berater für Praxen, Handwerker und lokale Unternehmen',
        },
      ],
    },
  ];
}
