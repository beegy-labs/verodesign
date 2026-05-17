import { jsxs as n, jsx as s } from "react/jsx-runtime";
import * as d from "react";
function x(o) {
  let t = null;
  const a = [];
  return d.Children.forEach(o, (e) => {
    if (!t && d.isValidElement(e) && e.props.slot === "icon") {
      t = e;
      return;
    }
    a.push(e);
  }), { icon: t, rest: a };
}
const N = d.forwardRef(function({
  label: t = "",
  value: a = "",
  delta: e,
  hint: l,
  deltaTone: i = "neutral",
  tone: r = "default",
  className: p,
  children: m,
  style: h,
  ...u
}, f) {
  const { icon: v, rest: c } = x(m), g = r === "success" ? "var(--vds-theme-success)" : r === "warning" ? "var(--vds-theme-warning)" : r === "error" ? "var(--vds-theme-destructive)" : "var(--vds-theme-text-bright)", y = i === "positive" ? "var(--vds-theme-success)" : i === "negative" ? "var(--vds-theme-destructive)" : "var(--vds-theme-text-secondary)";
  return /* @__PURE__ */ n(
    "section",
    {
      ...u,
      ref: f,
      className: ["vds-flex vds-flex-col", p].filter(Boolean).join(" "),
      "data-tone": r,
      "data-delta-tone": i,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-spacing-1)",
        padding: "var(--vds-spacing-4) var(--vds-spacing-5)",
        background: "var(--vds-theme-bg-card)",
        border: "var(--vds-border-width-1) solid var(--vds-theme-border-default)",
        borderRadius: "var(--vds-radius-lg)",
        ...h
      },
      children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: "vds-stat-tile-header",
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--vds-spacing-2)"
            },
            children: [
              /* @__PURE__ */ s(
                "span",
                {
                  className: "vds-stat-tile-label",
                  style: { fontSize: "var(--vds-type-role-caption-size)", color: "var(--vds-theme-text-secondary)" },
                  children: t
                }
              ),
              v ? /* @__PURE__ */ s("span", { className: "vds-stat-tile-icon", style: { display: "flex", color: "var(--vds-theme-text-faint)" }, children: v }) : null
            ]
          }
        ),
        /* @__PURE__ */ s(
          "span",
          {
            className: "vds-stat-tile-value",
            style: {
              fontSize: "var(--vds-type-role-metric-size)",
              fontWeight: "var(--vds-type-role-metric-weight)",
              color: g,
              lineHeight: "var(--vds-type-role-metric-lineheight)",
              fontVariantNumeric: "tabular-nums"
            },
            children: a
          }
        ),
        (e || l) && /* @__PURE__ */ n(
          "div",
          {
            className: "vds-stat-tile-meta",
            style: {
              display: "flex",
              alignItems: "baseline",
              gap: "var(--vds-spacing-2)",
              flexWrap: "wrap"
            },
            children: [
              e ? /* @__PURE__ */ s(
                "span",
                {
                  className: "vds-stat-tile-delta",
                  style: {
                    fontSize: "var(--vds-type-role-caption-size)",
                    fontWeight: "var(--vds-type-role-label-weight)",
                    color: y
                  },
                  children: e
                }
              ) : null,
              l ? /* @__PURE__ */ s(
                "span",
                {
                  className: "vds-stat-tile-hint",
                  style: { fontSize: "var(--vds-type-role-caption-size)", color: "var(--vds-theme-text-secondary)" },
                  children: l
                }
              ) : null
            ]
          }
        ),
        c.length > 0 ? c : null
      ]
    }
  );
});
export {
  N as StatTile
};
