import { jsx as f } from "react/jsx-runtime";
import * as p from "react";
const x = p.forwardRef(function({ size: r, tone: e, weight: a, align: i, as: s = "p", truncate: t = !1, uppercase: v = !1, mono: o = !1, tabular: d = !1, style: l, ...m }, n) {
  return /* @__PURE__ */ f(s, { ...m, ref: n, style: { margin: 0, display: s === "span" ? "inline" : "block", fontFamily: o ? "var(--vds-font-family-mono)" : "var(--vds-font-family-sans)", color: e === "bright" ? "var(--vds-theme-text-bright)" : e === "dim" ? "var(--vds-theme-text-secondary)" : e === "muted" ? "var(--vds-theme-text-faint)" : e === "primary" ? "var(--vds-theme-primary)" : e === "success" ? "var(--vds-theme-success)" : e === "warning" ? "var(--vds-theme-warning)" : e === "error" ? "var(--vds-theme-destructive)" : "var(--vds-theme-text-primary)", fontSize: r === "xs" ? "var(--vds-type-role-caption-size)" : r === "sm" ? "var(--vds-type-role-label-size)" : r === "lg" ? "var(--vds-type-role-title-size)" : r === "xl" ? "var(--vds-type-role-metric-size)" : r === "base" ? "var(--vds-type-role-body-size)" : void 0, fontWeight: a ? `var(--vds-font-weight-${a})` : void 0, textAlign: i, overflow: t ? "hidden" : void 0, textOverflow: t ? "ellipsis" : void 0, whiteSpace: t ? "nowrap" : void 0, textTransform: v ? "uppercase" : void 0, letterSpacing: v ? "0.05em" : void 0, fontVariantNumeric: d ? "tabular-nums" : void 0, ...l } });
});
export {
  x as Text
};
