import { jsx as o } from "react/jsx-runtime";
import * as l from "react";
import { cx as m } from "./_internal.js";
const u = l.forwardRef(function({ variant: s = "soft", tone: t = "neutral", size: r = "md", className: a, children: v, style: d, ...i }, n) {
  const e = {
    primary: { solid: ["var(--vds-theme-primary)", "var(--vds-theme-primary-fg)"], soft: ["color-mix(in oklab, var(--vds-theme-primary) 15%, transparent)", "var(--vds-theme-primary)"], outline: "var(--vds-theme-primary)" },
    accent: { solid: ["var(--vds-theme-accent)", "var(--vds-theme-accent-fg)"], soft: ["color-mix(in oklab, var(--vds-theme-accent) 15%, transparent)", "var(--vds-theme-accent)"], outline: "var(--vds-theme-accent)" },
    neutral: { solid: ["var(--vds-theme-neutral)", "var(--vds-theme-neutral-fg)"], soft: ["var(--vds-theme-bg-muted)", "var(--vds-theme-text-primary)"], outline: "var(--vds-theme-border-default)" },
    destructive: { solid: ["var(--vds-theme-destructive)", "var(--vds-theme-destructive-fg)"], soft: ["var(--vds-theme-error-bg)", "var(--vds-theme-destructive)"], outline: "var(--vds-theme-destructive)" },
    success: { solid: ["var(--vds-theme-success)", "var(--vds-theme-success-fg)"], soft: ["var(--vds-theme-success-bg)", "var(--vds-theme-success)"], outline: "var(--vds-theme-success)" },
    warning: { solid: ["var(--vds-theme-warning)", "var(--vds-theme-warning-fg)"], soft: ["var(--vds-theme-warning-bg)", "var(--vds-theme-warning)"], outline: "var(--vds-theme-warning)" },
    info: { solid: ["var(--vds-theme-info)", "var(--vds-theme-info-fg)"], soft: ["var(--vds-theme-info-bg)", "var(--vds-theme-info)"], outline: "var(--vds-theme-info)" }
  }[t];
  return /* @__PURE__ */ o(
    "span",
    {
      ...i,
      ref: n,
      className: m("vds-inline-flex vds-items-center", a),
      "data-variant": s,
      "data-tone": t,
      "data-size": r,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--vds-spacing-1)",
        verticalAlign: "middle",
        fontFamily: "var(--vds-font-family-sans)",
        fontWeight: "var(--vds-type-role-label-weight)",
        lineHeight: "1",
        whiteSpace: "nowrap",
        borderRadius: "var(--vds-radius-full)",
        border: "var(--vds-border-width-1) solid transparent",
        padding: r === "sm" ? "calc(var(--vds-spacing-0_5) / 2) var(--vds-spacing-2)" : "var(--vds-spacing-1) var(--vds-spacing-2_5)",
        fontSize: r === "sm" ? "var(--vds-type-role-caption-size)" : "var(--vds-type-role-label-size)",
        minHeight: r === "sm" ? "calc(var(--vds-spacing-4) + var(--vds-spacing-0_5))" : "calc(var(--vds-spacing-6))",
        ...s === "solid" ? { background: e.solid[0], color: e.solid[1] } : null,
        ...s === "soft" ? { background: e.soft[0], color: e.soft[1] } : null,
        ...s === "outline" ? { color: t === "neutral" ? "var(--vds-theme-text-primary)" : e.outline, borderColor: e.outline } : null,
        ...d
      },
      children: v
    }
  );
});
export {
  u as Badge
};
