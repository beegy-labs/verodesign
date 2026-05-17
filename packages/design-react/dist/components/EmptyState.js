import { jsxs as m, jsx as t } from "react/jsx-runtime";
import * as h from "react";
import { extractSlottedChildren as n } from "./_internal.js";
const S = h.forwardRef(function({ size: i = "md", heading: l, description: o, children: c, style: d, ...v }, p) {
  const { slotted: g, rest: s } = n(c, "icon"), { slotted: e, rest: r } = n(s, "description"), { slotted: a } = n(e.length ? r : s, "action");
  return /* @__PURE__ */ m(
    "div",
    {
      ...v,
      ref: p,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "var(--vds-spacing-2)",
        paddingBlock: i === "sm" ? "var(--vds-spacing-6)" : i === "lg" ? "var(--vds-spacing-16)" : "var(--vds-spacing-10)",
        ...d
      },
      children: [
        /* @__PURE__ */ t("div", { style: { color: "var(--vds-theme-text-faint)" }, children: g }),
        /* @__PURE__ */ t("p", { style: { margin: 0, fontSize: "var(--vds-type-role-label-size)", fontWeight: "var(--vds-type-role-label-weight)", color: "var(--vds-theme-text-primary)" }, children: r.length ? r : l }),
        /* @__PURE__ */ t("p", { style: { margin: 0, fontSize: "var(--vds-type-role-caption-size)", color: "var(--vds-theme-text-secondary)", maxWidth: "calc(var(--vds-spacing-64) + var(--vds-spacing-48))" }, children: e.length ? e : o }),
        a.length ? /* @__PURE__ */ t("div", { style: { marginTop: "var(--vds-spacing-3)" }, children: a }) : null
      ]
    }
  );
});
export {
  S as EmptyState
};
