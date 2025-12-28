"use client";

import Script from "next/script";
import Link from "next/link";
import useLanguage from "@/hooks/useLanguage";
import TextEffect from "@/components/TextEffect";

/**
 * Breadcrumb component with Schema.org BreadcrumbList structured data
 * Used on subpages for SEO and navigation
 */
export default function Breadcrumb({ pageName, pageUrl }) {
  const { language } = useLanguage();
  const homeLabel = language === "de" ? "index" : "index";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: "https://litkovskyi.de",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: `https://litkovskyi.de${pageUrl}`,
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
              href="/"
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
