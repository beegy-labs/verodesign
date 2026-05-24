import * as e from "react";
const p = e.forwardRef(function({
  tone: n = "zinc",
  title: l,
  description: s,
  descriptionTone: u = "default",
  leading: i,
  trailing: c,
  chevron: o = !1,
  className: f,
  children: R,
  ...b
}, r) {
  const a = e.useRef(null), m = e.useCallback(
    (t) => {
      a.current = t, typeof r == "function" ? r(t) : r && (r.current = t);
    },
    [r]
  );
  return e.useLayoutEffect(() => {
    const t = a.current;
    t && (t.setAttribute("tone", n), t.setAttribute("row-label", l), s ? t.setAttribute("description", s) : t.removeAttribute("description"), t.setAttribute("description-tone", u), o ? t.setAttribute("chevron", "") : t.removeAttribute("chevron"));
  }, [n, l, s, u, o]), e.createElement(
    "vds-settings-row",
    {
      ...b,
      ref: m,
      class: f
    },
    i ? e.createElement("span", { slot: "leading" }, i) : null,
    c ? e.createElement("span", { slot: "trailing" }, c) : null
  );
});
export {
  p as SettingsRow
};
