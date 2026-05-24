import { jsx as d } from "react/jsx-runtime";
import * as i from "react";
const h = i.forwardRef(function({ orientation: r = "horizontal", decorative: o = !0, style: t, ...a }, e) {
  return /* @__PURE__ */ d("div", { ...a, ref: e, role: o ? "presentation" : "separator", "aria-orientation": o ? void 0 : r, style: { display: "block", flexShrink: 0, background: "var(--vds-theme-border-subtle)", width: r === "horizontal" ? "100%" : "var(--vds-border-width-1)", height: r === "horizontal" ? "var(--vds-border-width-1)" : "auto", alignSelf: r === "vertical" ? "stretch" : void 0, ...t } });
});
export {
  h as Separator
};
