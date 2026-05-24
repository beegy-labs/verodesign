import * as o from "react";
const p = {
  0: "0",
  "0_5": "var(--vds-spacing-0_5)",
  1: "var(--vds-spacing-1)",
  "1_5": "var(--vds-spacing-1_5)",
  2: "var(--vds-spacing-2)",
  "2_5": "var(--vds-spacing-2_5)",
  3: "var(--vds-spacing-3)",
  4: "var(--vds-spacing-4)",
  5: "var(--vds-spacing-5)",
  6: "var(--vds-spacing-6)",
  8: "var(--vds-spacing-8)",
  10: "var(--vds-spacing-10)",
  12: "var(--vds-spacing-12)",
  16: "var(--vds-spacing-16)"
};
function i(...s) {
  return s.filter(Boolean).join(" ");
}
function v(s) {
  return s ? "" : void 0;
}
function e(s, t) {
  typeof s == "function" ? s(t) : s && (s.current = t);
}
function c(s, t) {
  const r = [], a = [];
  return o.Children.forEach(s, (n) => {
    if (o.isValidElement(n) && typeof n.props == "object" && n.props !== null && "slot" in n.props && n.props.slot === t) {
      r.push(n);
      return;
    }
    a.push(n);
  }), { slotted: r, rest: a };
}
const g = {
  outline: "2px solid var(--vds-theme-border-focus)",
  outlineOffset: "2px"
};
export {
  i as cx,
  c as extractSlottedChildren,
  g as focusRing,
  e as mergeRefs,
  p as spacing,
  v as toDataAttr
};
