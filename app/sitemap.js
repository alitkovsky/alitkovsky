import { getAllSystemSlugs } from "@/data/systems";
import { getAllProjectSlugs } from "@/data/projects";

/**
 * Sitemap configuration
 * Note: Update lastModified dates when content on these pages actually changes.
 * Using static dates allows search engines to detect real content updates.
 */
export default function sitemap() {
  const baseUrl = "https://litkovskyi.de";
  const systemSlugs = getAllSystemSlugs();
  const projectSlugs = getAllProjectSlugs();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date('2025-01-12'),
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
      url: `${baseUrl}/solutions`,
      lastModified: new Date("2025-01-12"),
      changeFrequency: "monthly",
      priority: 0.9,
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
    {
      url: `${baseUrl}/en`,
      lastModified: new Date("2025-01-12"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date('2024-12-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/projects`,
      lastModified: new Date('2024-12-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/solutions`,
      lastModified: new Date("2025-01-12"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/impressum`,
      lastModified: new Date('2024-12-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/en/datenschutz`,
      lastModified: new Date('2024-12-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Solution detail pages
  const systemPages = systemSlugs.map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: new Date("2025-01-12"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const systemPagesEn = systemSlugs.map((slug) => ({
    url: `${baseUrl}/en/solutions/${slug}`,
    lastModified: new Date("2025-01-12"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectPages = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date("2025-01-12"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectPagesEn = projectSlugs.map((slug) => ({
    url: `${baseUrl}/en/projects/${slug}`,
    lastModified: new Date("2025-01-12"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...systemPages, ...systemPagesEn, ...projectPages, ...projectPagesEn];
}
