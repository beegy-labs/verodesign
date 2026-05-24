import type { Meta } from "@storybook/react-vite";
import type { ReactNode, SVGProps } from "react";

export function Shell(props: {
  children: ReactNode;
  phone?: boolean;
  className?: string;
}) {
  const className = [
    "girok-story-shell",
    props.phone ? "is-phone" : "",
    props.className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={className}>{props.children}</div>;
}

export function sectionMeta(title: string): Meta {
  return {
    title: `Girok/${title}`,
    parameters: {
      chromatic: { viewports: [390, 768, 1200] },
    },
  };
}

export function Icon(props: SVGProps<SVGSVGElement> & { path: string }) {
  const { path, ...rest } = props;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      <path d={path} />
    </svg>
  );
}

export const paths = {
  plus: "M12 5v14M5 12h14",
  chevronLeft: "m15 18-6-6 6-6",
  chevronRight: "m9 18 6-6-6-6",
  calendar: "M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z",
  bell: "M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0",
  menu: "M4 7h16M4 12h16M4 17h16",
  home: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5",
  wallet: "M3 7h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm0 0V5a2 2 0 0 1 2-2h12",
  chart: "M4 19h16M7 15l3-3 3 2 4-5",
  settings: "M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1 7 17M17 7l2.1-2.1M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  list: "M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",
  close: "M6 6l12 12M18 6 6 18",
  spark: "m12 3 1.8 4.7L18.5 9l-4.7 1.3L12 15l-1.8-4.7L5.5 9l4.7-1.3Z",
};
