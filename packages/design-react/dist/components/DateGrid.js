import * as t from "react";
const L = t.forwardRef(function({ year: o, month: i, selectedDate: l, dotDates: f = [], firstDayOfWeek: v = "mon", onSelect: d, onMonthChange: s, className: m, ...u }, E) {
  const n = t.useRef(null);
  return t.useImperativeHandle(E, () => n.current, []), t.useEffect(() => {
    const e = n.current;
    if (!e) return;
    const a = (r) => d?.(r.detail.date), c = (r) => s?.(r.detail);
    return e.addEventListener("vds-date-select", a), e.addEventListener("vds-month-change", c), () => {
      e.removeEventListener("vds-date-select", a), e.removeEventListener("vds-month-change", c);
    };
  }, [s, d]), t.createElement("vds-date-grid", {
    ...u,
    ref: n,
    year: o,
    month: i,
    "selected-date": l,
    "dot-dates": f.join(","),
    "first-day-of-week": v,
    class: m
  });
});
export {
  L as DateGrid
};
