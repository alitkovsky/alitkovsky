"use client";

import Script from "next/script";
import useLanguage from "@/hooks/useLanguage";
import TextEffect from "@/components/TextEffect";
import { localizePath } from "@/lib/localeRouting";

/**
 * Breadcrumb component with Schema.org BreadcrumbList structured data
 * Used on subpages for SEO and navigation
 */
export default function Breadcrumb({ pageName, pageUrl }) {
  const { language } = useLanguage();
  const homeLabel = language === "de" ? "index" : "index";
  const homePath = localizePath("/", language);
  const localizedPageUrl = localizePath(pageUrl, language);
  const homeItemUrl = homePath === "/" ? "https://litkovskyi.de" : `https://litkovskyi.de${homePath}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: homeItemUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: `https://litkovskyi.de${localizedPageUrl}`,
      },
    ],
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
          <li aria-current="page" className="bold">{pageName}</li>
        </ol>
      </nav>
    </>
  );
}
