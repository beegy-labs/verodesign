import { jsx as i } from "react/jsx-runtime";
import * as d from "react";
const f = d.forwardRef(function({ align: t = "left", compact: a = !1, dim: e = !1, colspan: r, style: n, ...s }, o) {
  return /* @__PURE__ */ i("th", { ...s, ref: o, colSpan: r ?? 1, style: { paddingBlock: a ? "var(--vds-spacing-2)" : "var(--vds-spacing-3)", paddingInline: "var(--vds-spacing-4)", fontWeight: "var(--vds-font-weight-500)", color: e ? "var(--vds-theme-text-secondary)" : "var(--vds-theme-text-primary)", textAlign: t, ...n } });
});
export {
  f as Th
};
