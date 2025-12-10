"use client";

import { useCalendlyContext } from "@/components/CalendlyProvider";

export default function useCalendly() {
  return useCalendlyContext();
}
