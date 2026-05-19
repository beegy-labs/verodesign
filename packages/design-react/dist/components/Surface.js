import { jsx as a } from "react/jsx-runtime";
import * as c from "react";
const t = c.forwardRef(function({ variant: d = "default", radius: e = "xl", borderless: o = !1, style: r, ...s }, i) {
  return /* @__PURE__ */ a("div", { ...s, ref: i, style: { display: d === "section" ? "flex" : "block", flexDirection: d === "section" ? "column" : void 0, gap: d === "section" ? "var(--vds-spacing-4)" : void 0, background: "var(--vds-theme-bg-card)", borderRadius: e === "lg" ? "var(--vds-radius-lg)" : "var(--vds-radius-xl)", border: o ? void 0 : "var(--vds-border-width-1) solid var(--vds-theme-border-default)", padding: d === "padded" || d === "section" ? "var(--vds-spacing-5)" : void 0, overflow: d === "inset" ? "hidden" : void 0, ...r } });
});
export {
  t as Surface
};
