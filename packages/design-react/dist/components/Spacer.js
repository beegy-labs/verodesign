import { jsx as f } from "react/jsx-runtime";
import * as l from "react";
import { spacing as t } from "./_internal.js";
const m = l.forwardRef(function({ axis: o = "vertical", size: r, grow: i = !1, style: a, ...e }, c) {
  return /* @__PURE__ */ f("div", { ...e, ref: c, style: { display: "block", flexShrink: 0, flexGrow: i ? 1 : void 0, width: o === "horizontal" && r ? t[r] : void 0, height: o === "vertical" && r ? t[r] : void 0, ...a } });
});
export {
  m as Spacer
};
