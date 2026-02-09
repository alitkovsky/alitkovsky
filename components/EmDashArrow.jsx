import Image from "next/image";
import { Children, cloneElement, isValidElement } from "react";

const EM_DASH = "—";
const DEFAULT_ARROW_SRC = "/assets/svg/arrow_short.svg";

export function EmDashArrow({
  className = "inline-arrow",
  width = 14,
  height = 10,
  src = DEFAULT_ARROW_SRC,
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
    />
  );
}

function replaceDashInString(text, keyPrefix = "emd", arrowProps) {
  if (typeof text !== "string" || !text.includes(EM_DASH)) {
    return text;
  }

  const parts = text.split(EM_DASH);
  const nodes = [];

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];

    if (index > 0) {
      nodes.push(
        <EmDashArrow
          key={`${keyPrefix}-arrow-${index}`}
          {...arrowProps}
        />,
      );
    }

    if (part) {
      nodes.push(part);
    }
  }

  return nodes;
}

export function renderWithArrow(node, keyPrefix = "emd", arrowProps) {
  if (typeof node === "string") {
    return replaceDashInString(node, keyPrefix, arrowProps);
  }

  if (Array.isArray(node)) {
    return node.map((child, index) =>
      renderWithArrow(child, `${keyPrefix}-${index}`, arrowProps),
    );
  }

  if (!isValidElement(node) || !node.props?.children) {
    return node;
  }

  return cloneElement(node, {
    children: Children.map(node.props.children, (child, index) =>
      renderWithArrow(child, `${keyPrefix}-${index}`, arrowProps),
    ),
  });
}

export default function EmDashArrowText({ children, arrowProps }) {
  return <>{renderWithArrow(children, "emd", arrowProps)}</>;
}
