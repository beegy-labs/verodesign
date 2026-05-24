import { jsxs as l, jsx as d } from "react/jsx-runtime";
import * as m from "react";
import { extractSlottedChildren as p, cx as D } from "./_internal.js";
const G = m.forwardRef(function({ value: e = "", name: u, label: n, helper: h, errorMessage: i, placeholder: f, type: y = "text", size: o = "md", disabled: v = !1, required: t = !1, readonly: g = !1, autoComplete: x, minLength: b, maxLength: z, pattern: r, className: w, children: S, style: T, onInput: $, onChange: C, ...R }, E) {
  const [F, W] = m.useState(!1), { slotted: j, rest: k } = p(S, "start"), { slotted: I } = p(k, "end"), s = F && !!i && (t && `${e}`.trim() === "" || (r ? !new RegExp(`^(?:${r})$`).test(`${e}`) : !1)), c = s ? i : h, B = o === "sm" ? "var(--vds-type-role-label-size)" : o === "lg" ? "var(--vds-type-role-title-size)" : "var(--vds-type-role-body-size)";
  return /* @__PURE__ */ l("div", { className: D(w), style: { display: "inline-flex", flexDirection: "column", gap: "var(--vds-spacing-1)", fontFamily: "var(--vds-font-family-sans)", color: "var(--vds-theme-text-primary)", minWidth: "24ch", ...T }, children: [
    n ? /* @__PURE__ */ l("label", { style: { fontSize: "var(--vds-type-role-label-size)", fontWeight: "var(--vds-type-role-label-weight)" }, children: [
      n,
      t ? /* @__PURE__ */ d("span", { style: { color: "var(--vds-theme-destructive)" }, children: " *" }) : null
    ] }) : null,
    /* @__PURE__ */ l("div", { style: { display: "flex", alignItems: "center", gap: "var(--vds-spacing-2)", background: "var(--vds-theme-bg-card)", border: `var(--vds-border-width-1) solid ${s ? "var(--vds-theme-destructive)" : "var(--vds-theme-border-default)"}`, borderRadius: "var(--vds-radius-md)", padding: "var(--vds-spacing-2) var(--vds-spacing-3)", opacity: v ? 0.5 : 1 }, children: [
      j,
      /* @__PURE__ */ d("input", { ...R, ref: E, value: e, name: u, placeholder: f, type: y, disabled: v, required: t, readOnly: g, autoComplete: x, minLength: b, maxLength: z, pattern: r, onInput: (a) => $?.(new CustomEvent("vds-input", { detail: { value: a.currentTarget.value } })), onChange: (a) => C?.(new CustomEvent("vds-change", { detail: { value: a.currentTarget.value } })), onBlur: () => W(!0), style: { all: "unset", flex: 1, minWidth: 0, font: "inherit", fontSize: B, color: "var(--vds-theme-text-primary)", background: "transparent" } }),
      I
    ] }),
    c ? /* @__PURE__ */ d("div", { style: { fontSize: "var(--vds-type-role-caption-size)", color: s ? "var(--vds-theme-destructive)" : "var(--vds-theme-text-dim)" }, children: c }) : null
  ] });
});
export {
  G as TextField
};
