/**
 * Sitemap configuration
 * Note: Update lastModified dates when content on these pages actually changes.
 * Using static dates allows search engines to detect real content updates.
 */
export default function sitemap() {
  const baseUrl = 'https://litkovskyi.de';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2024-12-25'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2024-12-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date('2024-12-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date('2024-12-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date('2024-12-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
