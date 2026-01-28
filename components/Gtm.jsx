"use client";

import { useEffect } from "react";
import { loadGtm } from "@/lib/scriptLoaders";

export default function Gtm() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV !== "production") return;

    window.setTimeout(loadGtm, 0);
  }, []);

  return null;
}
