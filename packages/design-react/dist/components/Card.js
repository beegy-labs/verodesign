import { jsxs as p, jsx as a } from "react/jsx-runtime";
import * as s from "react";
function u(t) {
  const e = [], d = [], o = [];
  return s.Children.forEach(t, (r) => {
    if (s.isValidElement(r) && r.props.slot === "header") {
      e.push(r);
      return;
    }
    if (s.isValidElement(r) && r.props.slot === "footer") {
      o.push(r);
      return;
    }
    d.push(r);
  }), { header: e, body: d, footer: o };
}
const f = s.forwardRef(function({ variant: e = "surface", elevation: d = "0", className: o, children: r, style: i, ...l }, c) {
  const { header: n, body: h, footer: v } = u(r), b = d === "0" ? "var(--vds-elevation-0)" : `var(--vds-elevation-${d})`;
  return /* @__PURE__ */ p(
    "section",
    {
      ...l,
      ref: c,
      className: ["vds-block", o].filter(Boolean).join(" "),
      "data-variant": e,
      "data-elevation": d,
      style: {
        display: "block",
        background: e === "ghost" ? "transparent" : "var(--vds-theme-bg-card)",
        color: "var(--vds-theme-text-primary)",
        borderRadius: "var(--vds-radius-lg)",
        overflow: "hidden",
        border: e === "outline" ? "var(--vds-border-width-1) solid var(--vds-theme-border-default)" : void 0,
        boxShadow: b,
        ...i
      },
      children: [
        n.length > 0 ? /* @__PURE__ */ a(
          "div",
          {
            className: "vds-card-header",
            style: {
              padding: "var(--vds-spacing-4)",
              borderBottom: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)"
            },
            children: n
          }
        ) : null,
        /* @__PURE__ */ a("div", { className: "vds-card-body", style: { padding: "var(--vds-spacing-4)" }, children: h }),
        v.length > 0 ? /* @__PURE__ */ a(
          "div",
          {
            className: "vds-card-footer",
            style: {
              padding: "var(--vds-spacing-4)",
              borderTop: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)",
              background: "var(--vds-theme-bg-page)"
            },
            children: v
          }
        ) : null
      ]
    }
  );
});
export {
  f as Card
};
