import { jsx as s } from "react/jsx-runtime";
function o(e) {
  switch (e) {
    case "subtle":
      return { blur: "var(--vds-blur-sm)", elevation: "var(--vds-elevation-2)", alpha: "70%" };
    case "strong":
      return { blur: "var(--vds-blur-lg)", elevation: "var(--vds-elevation-4)", alpha: "55%" };
    case "base":
    default:
      return { blur: "var(--vds-blur-md)", elevation: "var(--vds-elevation-3)", alpha: "62%" };
  }
}
function n({
  children: e,
  strength: a = "base",
  style: t,
  ...l
}) {
  const r = o(a);
  return /* @__PURE__ */ s(
    "div",
    {
      ...l,
      style: {
        background: `color-mix(in srgb, var(--vds-theme-bg-card) ${r.alpha}, transparent)`,
        color: "var(--vds-theme-text-primary)",
        border: "1px solid color-mix(in srgb, var(--vds-theme-border-default) 60%, transparent)",
        boxShadow: r.elevation,
        backdropFilter: `blur(${r.blur})`,
        WebkitBackdropFilter: `blur(${r.blur})`,
        ...t
      },
      children: e
    }
  );
}
export {
  n as GlassSurface
};
