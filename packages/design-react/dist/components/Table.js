import { jsx as o } from "react/jsx-runtime";
import * as s from "react";
const v = s.forwardRef(function({ density: e = "normal", children: r, style: a, ...t }, l) {
  return /* @__PURE__ */ o("div", { ...t, ref: l, style: { display: "block", width: "100%", overflowX: "auto", ...a }, children: /* @__PURE__ */ o("table", { style: { width: "100%", borderCollapse: "collapse", fontFamily: "var(--vds-font-family-sans)", fontSize: e === "compact" ? "var(--vds-type-role-caption-size)" : e === "comfortable" ? "var(--vds-type-role-body-size)" : "var(--vds-type-role-label-size)", color: "var(--vds-theme-text-primary)", background: "var(--vds-theme-bg-card)" }, children: r }) });
});
export {
  v as Table
};
