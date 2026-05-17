import { jsx as t } from "react/jsx-runtime";
function s({
  children: r,
  colSpan: d = 2,
  rowSpan: a = 1,
  style: e,
  ...o
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      ...o,
      style: {
        gridColumn: `span ${d}`,
        gridRow: `span ${a}`,
        minWidth: 0,
        borderRadius: "var(--vds-radius-lg)",
        background: "var(--vds-theme-bg-card)",
        color: "var(--vds-theme-text-primary)",
        border: "1px solid var(--vds-theme-border-default)",
        boxShadow: "var(--vds-elevation-2)",
        padding: "var(--vds-spacing-4)",
        ...e
      },
      children: r
    }
  );
}
export {
  s as BentoItem
};
