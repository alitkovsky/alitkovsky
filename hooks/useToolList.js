import { useLayoutEffect, useRef, useState } from "react";

/**
 * Lightweight manager for the Tool list interactions:
 * - tracks active item (hover/focus)
 * - reports a y-offset to move the decorative stroke in sync
 */
export default function useToolList(items, { initialActive = null } = {}) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(initialActive);
  const [strokeY, setStrokeY] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const el = itemRefs.current[active];
    if (!container || !el) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setStrokeY(elRect.top - containerRect.top);
  }, [active, items.length]);

  return { active, setActive, strokeY, containerRef, itemRefs };
}
