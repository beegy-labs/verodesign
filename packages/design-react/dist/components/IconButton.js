import { jsx as h } from "react/jsx-runtime";
import * as s from "react";
const g = "(prefers-reduced-motion: reduce)";
function p() {
  const [a, e] = s.useState(!1);
  return s.useEffect(() => {
    const r = window.matchMedia?.(g);
    if (!r) return;
    const t = () => e(r.matches);
    return t(), r.addEventListener?.("change", t), () => r.removeEventListener?.("change", t);
  }, []), a;
}
function y(a, e) {
  if (a === "tonal") {
    if (e === "neutral")
      return {
        background: "var(--vds-theme-bg-selected)",
        border: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)",
        boxShadow: "var(--vds-elevation-1)"
      };
    const r = e === "primary" ? "var(--vds-theme-primary)" : "var(--vds-theme-destructive)";
    return {
      background: `color-mix(in oklch, ${r} 14%, var(--vds-theme-bg-card))`,
      color: r,
      border: `var(--vds-border-width-1) solid color-mix(in oklch, ${r} 22%, var(--vds-theme-border-subtle))`,
      boxShadow: "var(--vds-elevation-1)"
    };
  }
  return e === "primary" ? { color: "var(--vds-theme-primary)" } : e === "destructive" ? { color: "var(--vds-theme-destructive)" } : {};
}
const w = s.forwardRef(function({
  variant: e = "ghost",
  tone: r = "neutral",
  size: t = "md",
  disabled: d = !1,
  ariaLabelText: i = null,
  className: v,
  children: l,
  style: c,
  onClick: u,
  ...n
}, m) {
  const b = p(), o = e === "soft" || e === "outline" ? "tonal" : e, f = {
    sm: { padding: "var(--vds-spacing-1)", fontSize: "var(--vds-type-role-label-size)" },
    md: { padding: "var(--vds-spacing-1_5)", fontSize: "var(--vds-type-role-body-size)" },
    lg: { padding: "var(--vds-spacing-2)", fontSize: "var(--vds-type-role-title-size)" }
  };
  return /* @__PURE__ */ h(
    "button",
    {
      ...n,
      ref: m,
      type: "button",
      disabled: d,
      "aria-label": i ?? n["aria-label"],
      className: ["vds-inline-flex vds-items-center vds-justify-center", v].filter(Boolean).join(" "),
      "data-variant": e,
      "data-visual-variant": o,
      "data-tone": r,
      "data-size": t,
      style: {
        all: "unset",
        boxSizing: "border-box",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        cursor: d ? "not-allowed" : "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        borderRadius: "var(--vds-radius-md)",
        color: "var(--vds-theme-text-secondary)",
        opacity: d ? "var(--vds-opacity-disabled)" : void 0,
        boxShadow: o === "ghost" ? "var(--vds-elevation-0)" : "var(--vds-elevation-1)",
        transition: b ? "none" : "background-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), border-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), box-shadow var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), transform var(--vds-motion-duration-fast) var(--vds-motion-easing-standard)",
        ...f[t],
        ...y(o, r),
        ...d ? {
          background: o === "ghost" ? "transparent" : "var(--vds-theme-state-disabled)",
          color: "var(--vds-theme-text-dim)",
          border: o === "ghost" ? void 0 : "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)",
          boxShadow: "var(--vds-elevation-0)"
        } : null,
        ...c
      },
      onClick: u,
      children: l
    }
  );
});
export {
  w as IconButton
};
