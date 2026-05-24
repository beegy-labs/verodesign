import { jsx as t } from "react/jsx-runtime";
import * as a from "react";
const s = a.forwardRef(function({ shape: r = "rect", style: e, ...d }, i) {
  return /* @__PURE__ */ t("div", { ...d, ref: i, style: { display: "block", background: "linear-gradient(90deg, var(--vds-theme-bg-muted) 0%, var(--vds-theme-bg-hover) 50%, var(--vds-theme-bg-muted) 100%)", backgroundSize: "200% 100%", borderRadius: r === "circle" ? "var(--vds-radius-full)" : r === "text" ? "var(--vds-radius-sm)" : "var(--vds-radius-md)", width: r === "circle" ? "var(--vds-spacing-10)" : "100%", height: r === "circle" ? "var(--vds-spacing-10)" : "var(--vds-spacing-4)", aspectRatio: r === "circle" ? "1" : void 0, ...e } });
});
export {
  s as Skeleton
};
