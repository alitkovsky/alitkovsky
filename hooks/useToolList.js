import { useRef, useState } from "react";

/**
 * Lightweight manager for the Tool list interactions:
 * - tracks active item (hover/focus)
 * - stores list refs for hover/focus behaviors
 */
export default function useToolList(_items, { initialActive = null } = {}) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(initialActive);

  return { active, setActive, containerRef, itemRefs };
}
