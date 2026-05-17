import { jsxs as y, jsx as a } from "react/jsx-runtime";
import * as o from "react";
import { focusRing as b } from "./_internal.js";
const k = o.forwardRef(function({ checked: r = !1, indeterminate: e = !1, disabled: t = !1, required: c = !1, name: v, value: d = "on", size: s = "md", onChange: i, children: p, style: f, ...m }, u) {
  const n = o.useRef(null);
  o.useEffect(() => {
    n.current && (n.current.indeterminate = e);
  }, [e]);
  const l = s === "sm" ? "calc(var(--vds-spacing-3) + var(--vds-spacing-0_5))" : s === "lg" ? "calc(var(--vds-spacing-5) + var(--vds-spacing-0_5))" : "calc(var(--vds-spacing-4) + var(--vds-spacing-0_5))";
  return /* @__PURE__ */ y(
    "label",
    {
      ...m,
      ref: u,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--vds-spacing-2)",
        cursor: t ? "not-allowed" : "pointer",
        userSelect: "none",
        color: "var(--vds-theme-text-primary)",
        fontFamily: "var(--vds-font-family-sans)",
        fontSize: s === "sm" ? "var(--vds-type-role-label-size)" : s === "lg" ? "var(--vds-type-role-title-size)" : "var(--vds-type-role-body-size)",
        opacity: t ? 0.5 : 1,
        ...f
      },
      children: [
        /* @__PURE__ */ a(
          "input",
          {
            ref: n,
            type: "checkbox",
            checked: r,
            disabled: t,
            required: c,
            name: v,
            value: d,
            "aria-checked": e ? "mixed" : r,
            onChange: (g) => {
              const h = new CustomEvent("change", { detail: { checked: g.currentTarget.checked } });
              typeof i == "function" && i(h);
            },
            style: { position: "absolute", opacity: 0, pointerEvents: "none" }
          }
        ),
        /* @__PURE__ */ a(
          "span",
          {
            "aria-hidden": "true",
            style: {
              ...b,
              outline: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: l,
              height: l,
              border: "var(--vds-border-width-1) solid " + (r || e ? "var(--vds-theme-primary)" : "var(--vds-theme-border-default)"),
              borderRadius: "var(--vds-radius-sm)",
              background: r || e ? "var(--vds-theme-primary)" : "var(--vds-theme-bg-card)"
            },
            children: e ? /* @__PURE__ */ a("span", { style: { width: "80%", height: "2px", background: "var(--vds-theme-primary-fg)" } }) : r ? /* @__PURE__ */ a("span", { style: { color: "var(--vds-theme-primary-fg)", fontSize: "0.9em", lineHeight: 1 }, children: "✓" }) : null
          }
        ),
        p
      ]
    }
  );
});
export {
  k as Checkbox
};
