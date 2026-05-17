import { jsx as f } from "react/jsx-runtime";
import * as p from "react";
import { spacing as i } from "./_internal.js";
const u = p.forwardRef(function({ gap: r = "2", align: e, justify: t, nowrap: n = !1, style: a, ...s }, o) {
  const c = { start: "flex-start", center: "center", end: "flex-end", stretch: "stretch", baseline: "baseline" }, l = { start: "flex-start", center: "center", end: "flex-end", between: "space-between", around: "space-around", evenly: "space-evenly" };
  return /* @__PURE__ */ f("div", { ...s, ref: o, style: { display: "flex", flexDirection: "row", flexWrap: n ? "nowrap" : "wrap", alignItems: e ? c[e] : "center", justifyContent: t ? l[t] : void 0, gap: i[r], ...a } });
});
export {
  u as Cluster
};
