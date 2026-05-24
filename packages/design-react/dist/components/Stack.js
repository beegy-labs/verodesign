import { jsx as f } from "react/jsx-runtime";
import * as p from "react";
import { spacing as d } from "./_internal.js";
const v = p.forwardRef(function({ direction: n = "column", gap: r = "0", align: e, justify: t, wrap: a = !1, style: s, ...o }, c) {
  const i = { start: "flex-start", center: "center", end: "flex-end", stretch: "stretch", baseline: "baseline" }, l = { start: "flex-start", center: "center", end: "flex-end", between: "space-between", around: "space-around", evenly: "space-evenly" };
  return /* @__PURE__ */ f("div", { ...o, ref: c, style: { display: "flex", flexDirection: n, flexWrap: a ? "wrap" : void 0, gap: d[r], alignItems: e ? i[e] : void 0, justifyContent: t ? l[t] : void 0, ...s } });
});
export {
  v as Stack
};
