import * as r from "react";
function i(t) {
  return typeof t == "number" ? String(t) : t;
}
function f(t) {
  return r.forwardRef(function({ size: e = "md", strokeWidth: n, ...o }, c) {
    return r.createElement("vds-icon", {
      ...o,
      ref: c,
      name: t,
      size: i(e),
      "stroke-width": n
    });
  });
}
export {
  f as createIcon
};
