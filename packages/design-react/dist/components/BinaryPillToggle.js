import * as l from "react";
function b({
  value: n,
  options: d,
  emphasis: i = "neutral",
  size: s = "md",
  disabled: v = !1,
  "aria-label": c,
  onValueChange: a
}) {
  const r = l.useRef(null);
  return l.useEffect(() => {
    const e = r.current;
    if (!e || !a) return;
    const t = (u) => a(u.detail.value);
    return e.addEventListener("vds-change", t), () => e.removeEventListener("vds-change", t);
  }, [a]), l.createElement(
    "vds-binary-pill-toggle",
    {
      ref: r,
      value: n,
      emphasis: i,
      size: s,
      disabled: v || void 0,
      "aria-label": c
    },
    ...d.map(
      (e) => l.createElement(
        "vds-binary-pill-toggle-option",
        {
          key: e.value,
          value: e.value,
          disabled: e.disabled || void 0
        },
        e.label
      )
    )
  );
}
export {
  b as BinaryPillToggle
};
