import { jsx as a, jsxs as p } from "react/jsx-runtime";
import * as r from "react";
import { focusRing as j, cx as H } from "./_internal.js";
const T = r.forwardRef(function(o, v) {
  return /* @__PURE__ */ a("div", { ...o, ref: v });
}), V = r.forwardRef(function({ value: o = "", placeholder: v = "Select…", label: m, helper: k, errorMessage: h, disabled: n = !1, required: S = !1, name: D, onChange: y, className: E, children: z, style: I, ...A }, R) {
  const [d, i] = r.useState(!1), t = r.Children.toArray(z).filter(r.isValidElement), g = t.find((e) => e.props.value === o), [c, l] = r.useState(() => Math.max(0, t.findIndex((e) => e.props.value === o))), b = h ?? k ?? "", x = r.useId();
  return /* @__PURE__ */ p(
    "div",
    {
      ...A,
      ref: R,
      className: H(E),
      onKeyDown: (e) => {
        if (!n) {
          if (!d && (e.key === " " || e.key === "Enter" || e.key === "ArrowDown")) {
            e.preventDefault(), i(!0);
            return;
          }
          if (d) {
            if (e.key === "Escape") {
              e.preventDefault(), i(!1);
              return;
            }
            e.key === "ArrowDown" && (e.preventDefault(), l((s) => Math.min(t.length - 1, s + 1))), e.key === "ArrowUp" && (e.preventDefault(), l((s) => Math.max(0, s - 1))), e.key === "Home" && (e.preventDefault(), l(0)), e.key === "End" && (e.preventDefault(), l(t.length - 1)), (e.key === "Enter" || e.key === " ") && t[c] && (e.preventDefault(), y?.(new CustomEvent("change", { detail: { value: t[c].props.value ?? "" } })), i(!1));
          }
        }
      },
      style: { display: "inline-flex", flexDirection: "column", gap: "var(--vds-spacing-1)", fontFamily: "var(--vds-font-family-sans)", width: "100%", ...I },
      children: [
        m ? /* @__PURE__ */ p("span", { style: { fontSize: "var(--vds-type-role-label-size)", fontWeight: "var(--vds-type-role-label-weight)", color: "var(--vds-theme-text-primary)" }, children: [
          m,
          S ? /* @__PURE__ */ a("span", { style: { color: "var(--vds-theme-destructive)" }, children: " *" }) : null
        ] }) : null,
        /* @__PURE__ */ a("input", { type: "hidden", name: D, value: o }),
        /* @__PURE__ */ p("div", { style: { position: "relative", width: "100%" }, children: [
          /* @__PURE__ */ p("button", { type: "button", role: "combobox", "aria-expanded": d, "aria-haspopup": "listbox", "aria-controls": x, disabled: n, onClick: () => i((e) => !e), style: { display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: "var(--vds-spacing-2)", width: "100%", minHeight: "calc(var(--vds-spacing-10))", padding: "var(--vds-spacing-2) var(--vds-spacing-3)", background: "var(--vds-theme-bg-card)", color: "var(--vds-theme-text-primary)", border: "var(--vds-border-width-1) solid var(--vds-theme-border-default)", borderRadius: "var(--vds-radius-md)", fontSize: "var(--vds-type-role-label-size)", cursor: n ? "not-allowed" : "pointer", userSelect: "none", opacity: n ? 0.5 : 1, ...j, outline: "none" }, children: [
            /* @__PURE__ */ a("span", { style: { color: g ? void 0 : "var(--vds-theme-text-faint)" }, children: g?.props.children ?? v }),
            /* @__PURE__ */ a("span", { "aria-hidden": "true", children: "⌄" })
          ] }),
          d ? /* @__PURE__ */ a("div", { id: x, role: "listbox", style: { position: "absolute", top: "100%", left: 0, right: 0, marginTop: "var(--vds-spacing-1)", background: "var(--vds-theme-bg-card)", border: "var(--vds-border-width-1) solid var(--vds-theme-border-default)", borderRadius: "var(--vds-radius-md)", boxShadow: "var(--vds-shadow-3)", zIndex: "var(--vds-zindex-popover, 500)", maxHeight: "calc(var(--vds-spacing-64) - var(--vds-spacing-4))", overflowY: "auto", padding: "var(--vds-spacing-1) 0" }, children: t.map((e, s) => {
            const u = e.props.value ?? "", f = u === o, C = s === c;
            return r.cloneElement(e, {
              key: u || s,
              role: "option",
              "aria-selected": f,
              onClick: () => {
                e.props.disabled || (y?.(new CustomEvent("change", { detail: { value: u } })), i(!1));
              },
              style: {
                display: "block",
                padding: "var(--vds-spacing-2) var(--vds-spacing-3)",
                cursor: e.props.disabled ? "not-allowed" : "pointer",
                userSelect: "none",
                color: f ? "var(--vds-theme-primary)" : "var(--vds-theme-text-primary)",
                background: f ? "color-mix(in oklab, var(--vds-theme-primary) 12%, transparent)" : C ? "var(--vds-theme-bg-hover)" : "transparent",
                opacity: e.props.disabled ? 0.5 : 1,
                ...e.props.style ?? {}
              }
            });
          }) }) : null
        ] }),
        b ? /* @__PURE__ */ a("span", { style: { fontSize: "var(--vds-type-role-caption-size)", color: h ? "var(--vds-theme-destructive)" : "var(--vds-theme-text-dim)" }, children: b }) : null
      ]
    }
  );
});
export {
  T as Option,
  V as Select
};
