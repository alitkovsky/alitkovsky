"use client";

import dynamic from "next/dynamic";

import LazySection from "@/components/LazySection";

const LazyValues = dynamic(() => import("@/components/Values"));
const LazyProcess = dynamic(() => import("@/components/Process"));
const LazyBackground = dynamic(() => import("@/components/Background"));
const LazyProjectsPreview = dynamic(() => import("@/components/ProjectsPreview"));
const LazyReferences = dynamic(() => import("@/components/References"));
const LazyFaq = dynamic(() => import("@/components/Faq"));
const LazyExpertise = dynamic(() => import("@/components/Expertise"));
const LazyContact = dynamic(() => import("@/components/Contact"));

export default function HomeLazySections() {
  return (
    <>
      <LazySection>
        <LazyValues />
      </LazySection>
      <LazySection>
        <LazyProcess />
      </LazySection>
      <LazySection>
        <LazyBackground />
      </LazySection>
      <LazySection>
        <LazyProjectsPreview />
      </LazySection>
      <LazySection>
        <LazyReferences />
      </LazySection>
      <LazySection>
        <LazyFaq />
      </LazySection>
      <LazySection>
        <LazyExpertise />
      </LazySection>
      <LazySection>
        <LazyContact />
      </LazySection>
    </>
  );
}
