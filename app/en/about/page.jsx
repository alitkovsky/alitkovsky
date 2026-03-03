import { redirect } from "next/navigation";

export const metadata = {
  title: "About - Digital Operations & System Integration",
  description: "15+ years at the intersection of marketing, operations, and data. I build robust digital processes for growing teams.",
  alternates: {
    canonical: "/en/about",
    languages: {
      de: "/about",
      en: "/en/about",
      "x-default": "/about",
    },
  },
};

export default function AboutPageEn() {
  redirect("/en#expertise");
}
