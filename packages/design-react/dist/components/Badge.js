import { jsx as i } from "react/jsx-runtime";
import * as l from "react";
import { cx as m } from "./_internal.js";
const g = l.forwardRef(function({ variant: s = "soft", tone: a = "neutral", size: t = "md", className: r, children: v, style: d, ...o }, n) {
  const e = {
    primary: { solid: ["var(--vds-theme-primary)", "var(--vds-theme-primary-foreground)"], soft: ["color-mix(in oklab, var(--vds-theme-primary) 15%, transparent)", "var(--vds-theme-primary)"], outline: "var(--vds-theme-primary)" },
    accent: { solid: ["var(--vds-theme-accent)", "var(--vds-theme-accent-foreground)"], soft: ["color-mix(in oklab, var(--vds-theme-accent) 15%, transparent)", "var(--vds-theme-accent)"], outline: "var(--vds-theme-accent)" },
    neutral: { solid: ["var(--vds-theme-status-neutral)", "var(--vds-theme-status-neutral-foreground)"], soft: ["var(--vds-theme-bg-muted)", "var(--vds-theme-text-primary)"], outline: "var(--vds-theme-border-default)" },
    destructive: { solid: ["var(--vds-theme-destructive)", "var(--vds-theme-destructive-foreground)"], soft: ["var(--vds-theme-status-error-bg)", "var(--vds-theme-destructive)"], outline: "var(--vds-theme-destructive)" },
    success: { solid: ["var(--vds-theme-status-success)", "var(--vds-theme-status-success-foreground)"], soft: ["var(--vds-theme-status-success-bg)", "var(--vds-theme-status-success)"], outline: "var(--vds-theme-status-success)" },
    warning: { solid: ["var(--vds-theme-status-warning)", "var(--vds-theme-status-warning-foreground)"], soft: ["var(--vds-theme-status-warning-bg)", "var(--vds-theme-status-warning)"], outline: "var(--vds-theme-status-warning)" },
    info: { solid: ["var(--vds-theme-status-info)", "var(--vds-theme-status-info-foreground)"], soft: ["var(--vds-theme-status-info-bg)", "var(--vds-theme-status-info)"], outline: "var(--vds-theme-status-info)" }
  }[a];
  return /* @__PURE__ */ i(
    "span",
    {
      ...o,
      ref: n,
      className: m("vds-inline-flex vds-items-center", r),
      "data-variant": s,
      "data-tone": a,
      "data-size": t,
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
        padding: t === "sm" ? "calc(var(--vds-spacing-0_5) / 2) var(--vds-spacing-2)" : "var(--vds-spacing-1) var(--vds-spacing-2_5)",
        fontSize: t === "sm" ? "var(--vds-type-role-caption-size)" : "var(--vds-type-role-label-size)",
        minHeight: t === "sm" ? "calc(var(--vds-spacing-4) + var(--vds-spacing-0_5))" : "calc(var(--vds-spacing-6))",
        ...s === "solid" ? { background: e.solid[0], color: e.solid[1] } : null,
        ...s === "soft" ? { background: e.soft[0], color: e.soft[1] } : null,
        ...s === "outline" ? { color: a === "neutral" ? "var(--vds-theme-text-primary)" : e.outline, borderColor: e.outline } : null,
        ...d
      },
      children: v
    }
  );
});
export {
  g as Badge
};
