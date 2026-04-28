"use client";

import Script from "next/script";
import useLanguage from "@/hooks/useLanguage";
import TextEffect from "@/components/TextEffect";
import { localizePath } from "@/lib/localeRouting";

/**
 * Breadcrumb component with Schema.org BreadcrumbList structured data
 * Used on subpages for SEO and navigation
 * @param {string} pageName - Current page name
 * @param {string} pageUrl - Current page URL
 * @param {object} parent - Optional parent page { name: string, url: string }
 */
export default function Breadcrumb({ pageName, pageUrl, parent }) {
  const { language } = useLanguage();
  const homeLabel = language === "de" ? "index" : "index";
  const homePath = localizePath("/", language);
  const localizedPageUrl = localizePath(pageUrl, language);
  const homeItemUrl = homePath === "/" ? "https://litkovskyi.de" : `https://litkovskyi.de${homePath}`;

  // Build breadcrumb list with optional parent level
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: homeLabel,
      item: homeItemUrl,
    },
  ];

  if (parent) {
    const localizedParentUrl = localizePath(parent.url, language);
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: parent.name,
      item: `https://litkovskyi.de${localizedParentUrl}`,
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",
    position: parent ? 3 : 2,
    name: pageName,
    item: `https://litkovskyi.de${localizedPageUrl}`,
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <>
      <Script
        id={`breadcrumb-schema-${pageUrl.replace("/", "")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <ol>
          <li>
            <TextEffect
              as="a"
              variant="ellipseAuto"
              href={homePath}
              trigger="hover"
              className="inline-block"
            >
              {homeLabel}
            </TextEffect>
          </li>
          {parent && (
            <li>
              <TextEffect
                as="a"
                variant="ellipseAuto"
                href={localizePath(parent.url, language)}
                trigger="hover"
                className="inline-block"
              >
                {parent.name}
              </TextEffect>
            </li>
          )}
          <li aria-current="page" className="bold">{pageName}</li>
        </ol>
      </nav>
    </>
  );
}
