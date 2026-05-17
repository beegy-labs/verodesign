import { jsx as n } from "react/jsx-runtime";
function m({ children: i, columns: r = 4, style: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      ...e,
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${r}, minmax(0, 1fr))`,
        gap: "var(--vds-spacing-3)",
        alignItems: "stretch",
        minWidth: 0,
        ...t
      },
      children: i
    }
  );
}
export {
  m as BentoGrid
};
