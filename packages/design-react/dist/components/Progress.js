import * as r from "react";
const l = r.forwardRef(function({
  value: e,
  max: s,
  min: a,
  tone: o = "primary",
  size: t = "md",
  indeterminate: i = !1,
  label: n,
  className: m,
  ...c
}, d) {
  return r.createElement("vds-progress", {
    ...c,
    ref: d,
    value: e,
    max: s,
    min: a,
    tone: o,
    size: t,
    indeterminate: i || void 0,
    "aria-label": n,
    class: m
  });
});
export {
  l as Progress
};
