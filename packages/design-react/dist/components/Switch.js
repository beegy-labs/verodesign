import { jsxs as u, jsx as t } from "react/jsx-runtime";
import * as y from "react";
import { focusRing as b } from "./_internal.js";
const k = y.forwardRef(function({ checked: s = !1, disabled: r = !1, required: e = !1, name: n, value: o = "on", size: a = "md", onChange: l, children: i, style: v, ...d }, p) {
  const g = a === "sm" ? "calc(var(--vds-spacing-7))" : a === "lg" ? "calc(var(--vds-spacing-11))" : "calc(var(--vds-spacing-9))", h = a === "sm" ? "calc(var(--vds-spacing-4))" : a === "lg" ? "calc(var(--vds-spacing-6))" : "calc(var(--vds-spacing-5))", c = a === "sm" ? "calc(var(--vds-spacing-3))" : a === "lg" ? "calc(var(--vds-spacing-5))" : "calc(var(--vds-spacing-4))", m = a === "sm" ? "calc(var(--vds-spacing-3))" : a === "lg" ? "calc(var(--vds-spacing-5))" : "calc(var(--vds-spacing-4))";
  return /* @__PURE__ */ u("label", { ...d, ref: p, style: { display: "inline-flex", alignItems: "center", gap: "var(--vds-spacing-2)", cursor: r ? "not-allowed" : "pointer", userSelect: "none", color: "var(--vds-theme-text-primary)", fontFamily: "var(--vds-font-family-sans)", fontSize: a === "sm" ? "var(--vds-type-role-label-size)" : a === "lg" ? "var(--vds-type-role-title-size)" : "var(--vds-type-role-body-size)", opacity: r ? 0.5 : 1, ...v }, children: [
    /* @__PURE__ */ t("input", { type: "checkbox", role: "switch", checked: s, disabled: r, required: e, name: n, value: o, onChange: (f) => l?.(new CustomEvent("change", { detail: { checked: f.currentTarget.checked } })), style: { position: "absolute", opacity: 0, pointerEvents: "none" } }),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", style: { position: "relative", flexShrink: 0, background: s ? "var(--vds-theme-primary)" : "var(--vds-theme-border-default)", borderRadius: "999px", width: g, height: h, ...b, outline: "none" }, children: /* @__PURE__ */ t("span", { style: { position: "absolute", top: "calc(var(--vds-spacing-0_5) / 2)", left: "calc(var(--vds-spacing-0_5) / 2)", background: "var(--vds-theme-bg-card)", borderRadius: "999px", boxShadow: "var(--vds-shadow-1)", width: c, height: c, transform: s ? `translateX(${m})` : void 0 } }) }),
    i
  ] });
});
export {
  k as Switch
};
