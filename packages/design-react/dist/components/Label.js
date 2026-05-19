import { jsxs as i, jsx as n } from "react/jsx-runtime";
import * as o from "react";
const c = o.forwardRef(function({ required: r = !1, size: e = "md", children: t, style: a, ...l }, s) {
  return /* @__PURE__ */ i(
    "label",
    {
      ...l,
      ref: s,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--vds-spacing-1)",
        fontFamily: "var(--vds-font-family-sans)",
        fontWeight: "var(--vds-type-role-label-weight)",
        color: "var(--vds-theme-text-primary)",
        cursor: "pointer",
        userSelect: "none",
        fontSize: e === "sm" ? "var(--vds-type-role-label-size)" : e === "lg" ? "var(--vds-type-role-title-size)" : "var(--vds-type-role-body-size)",
        ...a
      },
      children: [
        t,
        r ? /* @__PURE__ */ n("span", { "aria-hidden": "true", style: { color: "var(--vds-theme-destructive)", marginLeft: "calc(var(--vds-spacing-0_5) / 2)" }, children: "*" }) : null
      ]
    }
  );
});
export {
  c as Label
};
