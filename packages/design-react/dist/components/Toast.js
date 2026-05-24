import { jsxs as v, jsx as o } from "react/jsx-runtime";
import * as i from "react";
import { focusRing as h } from "./_internal.js";
const x = i.forwardRef(function({ toastTitle: e, message: s, tone: t = "neutral", duration: r = 5e3, dismissible: d = !0, onDismiss: a, children: m, style: c, ...f }, p) {
  i.useEffect(() => {
    if (r > 0) {
      const u = window.setTimeout(() => a?.(new CustomEvent("vds-dismiss")), r);
      return () => clearTimeout(u);
    }
  }, [r, a]);
  const n = t === "success" ? "var(--vds-theme-status-success)" : t === "warning" ? "var(--vds-theme-status-warning)" : t === "error" ? "var(--vds-theme-status-error)" : t === "info" ? "var(--vds-theme-status-info)" : void 0;
  return /* @__PURE__ */ v("div", { ...f, ref: p, role: t === "error" ? "alert" : "status", "aria-live": t === "error" ? "assertive" : "polite", "aria-atomic": "true", style: { display: "flex", alignItems: "flex-start", gap: "var(--vds-spacing-3)", padding: "var(--vds-spacing-3) var(--vds-spacing-4)", background: "var(--vds-theme-bg-elevated)", color: "var(--vds-theme-text-primary)", border: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", borderLeft: n ? `4px solid ${n}` : void 0, borderRadius: "var(--vds-radius-md)", boxShadow: "var(--vds-shadow-3)", fontFamily: "var(--vds-font-family-sans)", fontSize: "var(--vds-type-role-label-size)", pointerEvents: "auto", maxWidth: "24rem", ...c }, children: [
    /* @__PURE__ */ v("div", { style: { flex: 1, minWidth: 0 }, children: [
      e ? /* @__PURE__ */ o("div", { style: { fontWeight: "var(--vds-font-weight-600)", marginBottom: "var(--vds-spacing-0_5)" }, children: e }) : null,
      s ? /* @__PURE__ */ o("div", { style: { color: "var(--vds-theme-text-secondary)" }, children: s }) : m
    ] }),
    d ? /* @__PURE__ */ o("button", { type: "button", "aria-label": "Dismiss", onClick: () => a?.(new CustomEvent("vds-dismiss")), style: { all: "unset", cursor: "pointer", color: "var(--vds-theme-text-dim)", padding: "var(--vds-spacing-0_5)", borderRadius: "var(--vds-radius-sm)", flexShrink: 0, ...h }, children: "✕" }) : null
  ] });
}), y = i.forwardRef(function({ placement: e = "bottom-right", style: s, ...t }, r) {
  return /* @__PURE__ */ o("div", { ...t, ref: r, role: "region", "aria-label": "Notifications", style: { position: "fixed", zIndex: "var(--vds-zindex-toast)", display: "flex", flexDirection: "column", gap: "var(--vds-spacing-2)", padding: "var(--vds-spacing-4)", pointerEvents: "none", ...{ "top-right": { top: 0, right: 0 }, "top-left": { top: 0, left: 0 }, "bottom-right": { bottom: 0, right: 0 }, "bottom-left": { bottom: 0, left: 0 }, "top-center": { top: 0, left: "50%", transform: "translateX(-50%)" }, "bottom-center": { bottom: 0, left: "50%", transform: "translateX(-50%)" } }[e], ...s } });
});
export {
  x as Toast,
  y as ToastGroup
};
