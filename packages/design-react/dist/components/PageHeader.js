import { jsxs as p, jsx as r } from "react/jsx-runtime";
import * as l from "react";
function v(n) {
  const s = [], t = [], a = [];
  return l.Children.forEach(n, (e) => {
    if (l.isValidElement(e) && e.props.slot === "leading") {
      s.push(e);
      return;
    }
    if (l.isValidElement(e) && e.props.slot === "actions") {
      t.push(e);
      return;
    }
    a.push(e);
  }), { leading: s, actions: t, rest: a };
}
const m = l.forwardRef(function({ heading: s, subtitle: t, className: a, children: e, style: c, ...g }, h) {
  const { leading: i, actions: o, rest: d } = v(e);
  return /* @__PURE__ */ p(
    "header",
    {
      ...g,
      ref: h,
      className: ["vds-flex", a].filter(Boolean).join(" "),
      style: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "var(--vds-spacing-4)",
        ...c
      },
      children: [
        i.length > 0 ? i : null,
        /* @__PURE__ */ p(
          "div",
          {
            className: "vds-page-header-body",
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "var(--vds-spacing-1)",
              flex: 1,
              minWidth: 0
            },
            children: [
              /* @__PURE__ */ r(
                "h1",
                {
                  className: "vds-page-header-title",
                  style: {
                    margin: 0,
                    fontSize: "var(--vds-type-role-title-size)",
                    fontWeight: "var(--vds-type-role-title-weight)",
                    lineHeight: "var(--vds-type-role-title-lineheight)",
                    color: "var(--vds-theme-text-bright)"
                  },
                  children: s ?? ""
                }
              ),
              t ? /* @__PURE__ */ r(
                "p",
                {
                  className: "vds-page-header-subtitle",
                  style: { margin: 0, fontSize: "var(--vds-type-role-label-size)", color: "var(--vds-theme-text-secondary)" },
                  children: t
                }
              ) : null,
              d.length > 0 ? d : null
            ]
          }
        ),
        o.length > 0 ? /* @__PURE__ */ r(
          "div",
          {
            className: "vds-page-header-actions",
            style: {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "var(--vds-spacing-2)",
              flexShrink: 0
            },
            children: o
          }
        ) : null
      ]
    }
  );
});
export {
  m as PageHeader
};
