import * as e from "react";
const w = e.forwardRef(function({
  leading: t,
  label: r,
  meta: o,
  trailing: l,
  onClick: s,
  selected: d = !1,
  className: i,
  as: m,
  href: a,
  tone: v = "neutral",
  disabled: n = !1,
  showChevron: p = !1
}, u) {
  const c = m ?? (a ? "link" : s ? "button" : "div");
  return e.createElement(
    "vds-compact-row",
    {
      ref: u,
      as: c,
      href: a,
      tone: v,
      disabled: n || void 0,
      selected: d || void 0,
      "show-chevron": p || void 0,
      class: i,
      onClick: n || c === "div" ? void 0 : s
    },
    t ? e.createElement("span", { slot: "leading" }, t) : null,
    r,
    o ? e.createElement("span", { slot: "meta" }, o) : null,
    l ? e.createElement("span", { slot: "trailing" }, l) : null
  );
});
export {
  w as CompactRow
};
