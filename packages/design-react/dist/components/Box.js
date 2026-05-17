import { jsx as f } from "react/jsx-runtime";
import * as x from "react";
import { spacing as o } from "./_internal.js";
const u = x.forwardRef(function({ p: d, px: r, py: l, maxWidth: m, "max-width": n, inline: a = !1, style: e, ...t }, s) {
  const i = m ?? n, c = {
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    full: "100%"
  };
  return /* @__PURE__ */ f(
    "div",
    {
      ...t,
      ref: s,
      style: {
        display: a ? "inline-block" : "block",
        padding: d ? o[d] : void 0,
        paddingInline: r ? o[r] : void 0,
        paddingBlock: l ? o[l] : void 0,
        maxWidth: i ? c[i] : void 0,
        marginInline: i && i !== "full" ? "auto" : void 0,
        ...e
      }
    }
  );
});
export {
  u as Box
};
