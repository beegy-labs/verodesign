import { jsxs as v, jsx as s } from "react/jsx-runtime";
import * as a from "react";
import { focusRing as h } from "./_internal.js";
const x = a.forwardRef(function({ toastTitle: e, message: o, tone: t = "neutral", duration: r = 5e3, dismissible: d = !0, onDismiss: i, children: m, style: c, ...f }, p) {
  a.useEffect(() => {
    if (r > 0) {
      const u = window.setTimeout(() => i?.(new CustomEvent("vds-dismiss")), r);
      return () => clearTimeout(u);
    }
  }, [r, i]);
  const n = t === "success" ? "var(--vds-theme-success)" : t === "warning" ? "var(--vds-theme-warning)" : t === "error" ? "var(--vds-theme-error)" : t === "info" ? "var(--vds-theme-info)" : void 0;
  return /* @__PURE__ */ v("div", { ...f, ref: p, role: t === "error" ? "alert" : "status", "aria-live": t === "error" ? "assertive" : "polite", "aria-atomic": "true", style: { display: "flex", alignItems: "flex-start", gap: "var(--vds-spacing-3)", padding: "var(--vds-spacing-3) var(--vds-spacing-4)", background: "var(--vds-theme-bg-elevated)", color: "var(--vds-theme-text-primary)", border: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", borderLeft: n ? `4px solid ${n}` : void 0, borderRadius: "var(--vds-radius-md)", boxShadow: "var(--vds-shadow-3)", fontFamily: "var(--vds-font-family-sans)", fontSize: "var(--vds-type-role-label-size)", pointerEvents: "auto", maxWidth: "24rem", ...c }, children: [
    /* @__PURE__ */ v("div", { style: { flex: 1, minWidth: 0 }, children: [
      e ? /* @__PURE__ */ s("div", { style: { fontWeight: "var(--vds-font-weight-600)", marginBottom: "var(--vds-spacing-0_5)" }, children: e }) : null,
      o ? /* @__PURE__ */ s("div", { style: { color: "var(--vds-theme-text-secondary)" }, children: o }) : m
    ] }),
    d ? /* @__PURE__ */ s("button", { type: "button", "aria-label": "Dismiss", onClick: () => i?.(new CustomEvent("vds-dismiss")), style: { all: "unset", cursor: "pointer", color: "var(--vds-theme-text-dim)", padding: "var(--vds-spacing-0_5)", borderRadius: "var(--vds-radius-sm)", flexShrink: 0, ...h }, children: "✕" }) : null
  ] });
}), y = a.forwardRef(function({ placement: e = "bottom-right", style: o, ...t }, r) {
  return /* @__PURE__ */ s("div", { ...t, ref: r, role: "region", "aria-label": "Notifications", style: { position: "fixed", zIndex: "var(--vds-zindex-toast)", display: "flex", flexDirection: "column", gap: "var(--vds-spacing-2)", padding: "var(--vds-spacing-4)", pointerEvents: "none", ...{ "top-right": { top: 0, right: 0 }, "top-left": { top: 0, left: 0 }, "bottom-right": { bottom: 0, right: 0 }, "bottom-left": { bottom: 0, left: 0 }, "top-center": { top: 0, left: "50%", transform: "translateX(-50%)" }, "bottom-center": { bottom: 0, left: "50%", transform: "translateX(-50%)" } }[e], ...o } });
});
export {
  x as Toast,
  y as ToastGroup
};
