import { jsx as k } from "react/jsx-runtime";
import * as i from "react";
const z = "(prefers-reduced-motion: reduce)";
function M() {
  const [r, t] = i.useState(!1);
  return i.useEffect(() => {
    const a = window.matchMedia?.(z);
    if (!a) return;
    const e = () => t(a.matches);
    return e(), a.addEventListener?.("change", e), () => a.removeEventListener?.("change", e);
  }, []), r;
}
function C(r, t) {
  const a = {
    primary: ["var(--vds-theme-primary)", "var(--vds-theme-primary-fg)"],
    accent: ["var(--vds-theme-accent)", "var(--vds-theme-accent-fg)"],
    neutral: ["var(--vds-theme-neutral)", "var(--vds-theme-neutral-fg)"],
    destructive: ["var(--vds-theme-destructive)", "var(--vds-theme-destructive-fg)"]
  }, e = {
    primary: "var(--vds-theme-primary)",
    accent: "var(--vds-theme-accent)",
    neutral: "var(--vds-theme-text-primary)",
    destructive: "var(--vds-theme-destructive)"
  };
  if (t === "solid") {
    const [n, s] = a[r];
    return { background: n, color: s };
  }
  return t === "tonal" ? r === "neutral" ? {
    background: "var(--vds-theme-bg-selected)",
    color: "var(--vds-theme-text-primary)",
    borderColor: "var(--vds-theme-border-subtle)",
    boxShadow: "var(--vds-elevation-1)"
  } : {
    background: `color-mix(in oklch, ${e[r]} 14%, var(--vds-theme-bg-card))`,
    color: e[r],
    borderColor: `color-mix(in oklch, ${e[r]} 22%, var(--vds-theme-border-subtle))`,
    boxShadow: "var(--vds-elevation-1)"
  } : {
    background: "transparent",
    color: e[r],
    borderColor: "transparent"
  };
}
const j = i.forwardRef(function({
  variant: t = "solid",
  tone: a = "primary",
  size: e = "md",
  type: n = "button",
  disabled: s = !1,
  loading: d = !1,
  name: c,
  value: m,
  ariaLabelText: u = null,
  fullWidth: h,
  "full-width": p,
  className: f,
  children: g,
  style: b,
  onClick: y,
  ...v
}, x) {
  const w = M(), o = t === "soft" || t === "outline" ? "tonal" : t, l = h ?? p ?? !1, S = {
    sm: {
      padding: "var(--vds-spacing-1_5) var(--vds-spacing-3)",
      fontSize: "var(--vds-type-role-label-size)",
      minHeight: "calc(var(--vds-spacing-8))"
    },
    md: {
      padding: "var(--vds-spacing-2) var(--vds-spacing-4)",
      fontSize: "var(--vds-type-role-body-size)",
      minHeight: "calc(var(--vds-spacing-10))"
    },
    lg: {
      padding: "var(--vds-spacing-3) var(--vds-spacing-5)",
      fontSize: "var(--vds-type-role-title-size)",
      minHeight: "calc(var(--vds-spacing-12))"
    }
  };
  return /* @__PURE__ */ k(
    "button",
    {
      ...v,
      ref: x,
      type: n,
      name: c,
      value: m,
      disabled: s || d,
      "aria-label": u ?? v["aria-label"],
      className: ["vds-inline-flex vds-items-center vds-justify-center", f].filter(Boolean).join(" "),
      "data-variant": t,
      "data-visual-variant": o,
      "data-tone": a,
      "data-size": e,
      "data-loading": d || void 0,
      style: {
        all: "unset",
        boxSizing: "border-box",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        gap: "var(--vds-spacing-2)",
        width: l ? "100%" : void 0,
        fontFamily: "var(--vds-font-family-sans)",
        fontWeight: "var(--vds-type-role-body-weight)",
        lineHeight: "var(--vds-type-role-body-lineheight)",
        whiteSpace: "nowrap",
        cursor: s || d ? "not-allowed" : "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        borderRadius: "var(--vds-radius-md)",
        border: "var(--vds-border-width-1) solid transparent",
        boxShadow: o === "solid" || o === "tonal" ? "var(--vds-elevation-1)" : "var(--vds-elevation-0)",
        opacity: s || d ? "var(--vds-opacity-disabled)" : void 0,
        transition: w ? "none" : "background-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), border-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), box-shadow var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), transform var(--vds-motion-duration-fast) var(--vds-motion-easing-standard)",
        transform: d ? "none" : void 0,
        ...S[e],
        ...C(a, o),
        ...o === "ghost" ? { boxShadow: "var(--vds-elevation-0)" } : null,
        ...s || d ? {
          background: o === "ghost" ? "transparent" : "var(--vds-theme-state-disabled)",
          color: "var(--vds-theme-text-dim)",
          borderColor: o === "ghost" ? "transparent" : "var(--vds-theme-border-subtle)",
          boxShadow: "var(--vds-elevation-0)"
        } : null,
        ...b
      },
      onClick: y,
      children: g
    }
  );
});
export {
  j as Button
};
