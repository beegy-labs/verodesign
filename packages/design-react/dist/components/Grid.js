import { jsx as a } from "react/jsx-runtime";
import * as e from "react";
import { spacing as p } from "./_internal.js";
const s = e.forwardRef(function({ cols: r = "1", gap: i = "0", style: o, ...t }, m) {
  return /* @__PURE__ */ a("div", { ...t, ref: m, style: { display: "grid", gridTemplateColumns: `repeat(${r}, minmax(0, 1fr))`, gap: p[i], ...o } });
});
export {
  s as Grid
};
