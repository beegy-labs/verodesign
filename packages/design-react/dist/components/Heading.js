import { jsx as n } from "react/jsx-runtime";
import * as d from "react";
const m = d.forwardRef(function({ level: t = "1", as: r, tone: e = "bright", style: a, ...i }, o) {
  const s = r ?? `h${t}`;
  return /* @__PURE__ */ n(
    s,
    {
      ...i,
      ref: o,
      style: {
        margin: 0,
        fontFamily: "var(--vds-font-family-sans)",
        fontWeight: "var(--vds-type-role-title-weight)",
        lineHeight: "var(--vds-font-lineheight-snug)",
        fontSize: t === "4" ? "var(--vds-type-role-label-size)" : t === "3" ? "var(--vds-type-role-body-size)" : "var(--vds-type-role-title-size)",
        color: e === "muted" ? "var(--vds-theme-text-secondary)" : e === "default" ? "var(--vds-theme-text-primary)" : "var(--vds-theme-text-bright)",
        ...a
      }
    }
  );
});
export {
  m as Heading
};
