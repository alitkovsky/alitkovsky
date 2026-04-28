import { notFound, redirect } from "next/navigation";
import SolutionDetail from "@/components/SolutionDetail";
import { getAllSystemSlugs, getSystemBySlug } from "@/data/solutions";

// Generate static params for all solutions
export async function generateStaticParams() {
  const slugs = getAllSystemSlugs();
  return slugs.map((slug) => ({ slug }));
}

const LEGACY_MAPPING = {
  "seo": "growth-engine",
  "google-ads": "intelligence-hub",
  "paid-social": "growth-engine",
  "web-analytics": "intelligence-hub",
  "crm-automatisierung": "control-center",
};

// SEO metadata for each solution
const SOLUTION_META = {
  "control-center": {
    title: "The Control Center | Autonomous Sales & Customer Operations",
    description: "Complete automation from lead capture to retention. Autonomous Sales Agent, Lifecycle Guardian, Administration Droid. Zero lost leads, predictable revenue.",
    keywords: "Sales Automation, CRM Automation, n8n Workflows, Lead Scoring, Email Sequences, HubSpot Automation, Pipedrive Automation, Customer Success Automation, Churn Prevention, Invoice Automation",
    ogImage: "/og-images/solutions/control-center.png",
    author: "Andrii Litkovskyi",
    publishedTime: "2025-03-11T00:00:00.000Z",
    modifiedTime: "2025-03-11T00:00:00.000Z",
  },
  "intelligence-hub": {
    title: "The Intelligence Hub | 24/7 Competitive Intelligence & Market Monitoring",
    description: "Automated competitor tracking, customer feedback aggregation, and AI-powered market insights. Detect threats in days, not weeks.",
    keywords: "Competitive Intelligence, Market Monitoring, Competitor Tracking, Web Scraping, AI Insights, Customer Feedback Analysis, Market Research Automation, GPT-4 Analysis, Puppeteer Automation",
    ogImage: "/og-images/solutions/intelligence-hub.png",
    author: "Andrii Litkovskyi",
    publishedTime: "2025-03-11T00:00:00.000Z",
    modifiedTime: "2025-03-11T00:00:00.000Z",
  },
  "growth-engine": {
    title: "The Growth Engine | Automated Content Creation & Distribution",
    description: "3x content output with 80% less time. AI-powered content factory and YouTube automation. Blog, social, video—all automated.",
    keywords: "Content Automation, AI Content Creation, GPT-4 Content, WordPress Automation, YouTube Automation, Social Media Automation, Content Factory, Multi-Platform Publishing, SEO Automation",
    ogImage: "/og-images/solutions/growth-engine.png",
    author: "Andrii Litkovskyi",
    publishedTime: "2025-03-11T00:00:00.000Z",
    modifiedTime: "2025-03-11T00:00:00.000Z",
  },
};

// Generate metadata for each solution
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Handle redirects in metadata? No, just let page redirect.
  // But to avoid 500 error if slug is not found in systems, check legacy mapping.
  if (LEGACY_MAPPING[slug]) {
    return {}; // Return empty or basic meta, redirect will happen in page
  }

  const solutionData = getSystemBySlug(slug, "de");
  const solutionMeta = SOLUTION_META[slug];

  if (!solutionData || !solutionMeta) {
    return {
      title: "Solution nicht gefunden",
    };
  }

  return {
    title: solutionMeta.title,
    description: solutionMeta.description,
    keywords: solutionMeta.keywords,
    authors: [{ name: solutionMeta.author }],
    creator: solutionMeta.author,
    publisher: solutionMeta.author,
    alternates: {
      canonical: `/solutions/${slug}`,
      languages: {
        de: `/solutions/${slug}`,
        en: `/en/solutions/${slug}`,
        "x-default": `/solutions/${slug}`,
      },
    },
    openGraph: {
      title: solutionMeta.title,
      description: solutionMeta.description,
      url: `/solutions/${slug}`,
      siteName: "Andrii Litkovskyi - Workflow Automation",
      locale: "de_DE",
      type: "article",
      publishedTime: solutionMeta.publishedTime,
      modifiedTime: solutionMeta.modifiedTime,
      authors: [solutionMeta.author],
      images: [
        {
          url: solutionMeta.ogImage,
          width: 1200,
          height: 630,
          alt: solutionMeta.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: solutionMeta.title,
      description: solutionMeta.description,
      creator: "@alitkovsky",
      images: [solutionMeta.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function SolutionDetailPage({ params }) {
  const { slug } = await params;

  if (LEGACY_MAPPING[slug]) {
    redirect(`/solutions/${LEGACY_MAPPING[slug]}`);
  }

  const solutionData = getSystemBySlug(slug);

  if (!solutionData) {
    notFound();
  }

  return (
    <main className="app-main">
      <SolutionDetail slug={slug} />
    </main>
  );
}
