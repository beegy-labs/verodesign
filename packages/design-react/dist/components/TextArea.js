import { jsxs as n, jsx as e } from "react/jsx-runtime";
import * as v from "react";
import { cx as E } from "./_internal.js";
const N = v.forwardRef(function({ value: t = "", label: l, helper: c, errorMessage: d, placeholder: h, disabled: p = !1, required: r = !1, readOnly: u = !1, minLength: m, maxLength: a, rows: f = 4, resize: y = "vertical", showCount: g, "show-count": b, className: x, style: w, onInput: z, onChange: S, ...T }, $) {
  const [C, j] = v.useState(!1), s = C && !!d && r && `${t}`.trim() === "", o = s ? d : c, k = b ?? g ?? !1;
  return /* @__PURE__ */ n("div", { className: E(x), style: { display: "inline-flex", flexDirection: "column", gap: "var(--vds-spacing-1)", fontFamily: "var(--vds-font-family-sans)", color: "var(--vds-theme-text-primary)", minWidth: "24ch", ...w }, children: [
    l ? /* @__PURE__ */ n("label", { style: { fontSize: "var(--vds-type-role-label-size)", fontWeight: "var(--vds-type-role-label-weight)" }, children: [
      l,
      r ? /* @__PURE__ */ e("span", { style: { color: "var(--vds-theme-destructive)" }, children: " *" }) : null
    ] }) : null,
    /* @__PURE__ */ e("div", { style: { background: "var(--vds-theme-bg-card)", border: `var(--vds-border-width-1) solid ${s ? "var(--vds-theme-destructive)" : "var(--vds-theme-border-default)"}`, borderRadius: "var(--vds-radius-md)", padding: "var(--vds-spacing-2) var(--vds-spacing-3)" }, children: /* @__PURE__ */ e("textarea", { ...T, ref: $, value: t, placeholder: h, disabled: p, required: r, readOnly: u, minLength: m, maxLength: a, rows: f, onInput: (i) => z?.(new CustomEvent("vds-input", { detail: { value: i.currentTarget.value } })), onChange: (i) => S?.(new CustomEvent("vds-change", { detail: { value: i.currentTarget.value } })), onBlur: () => j(!0), style: { all: "unset", display: "block", width: "100%", minHeight: "calc(var(--vds-spacing-24))", font: "inherit", fontSize: "var(--vds-type-role-body-size)", lineHeight: "var(--vds-type-role-body-lineheight)", color: "var(--vds-theme-text-primary)", background: "transparent", resize: y } }) }),
    /* @__PURE__ */ n("div", { style: { display: "flex", justifyContent: "space-between", gap: "var(--vds-spacing-2)" }, children: [
      o ? /* @__PURE__ */ e("div", { style: { fontSize: "var(--vds-type-role-caption-size)", color: s ? "var(--vds-theme-destructive)" : "var(--vds-theme-text-dim)" }, children: o }) : /* @__PURE__ */ e("span", {}),
      k ? /* @__PURE__ */ e("div", { "aria-live": "polite", style: { fontSize: "var(--vds-type-role-caption-size)", color: "var(--vds-theme-text-dim)", fontVariantNumeric: "tabular-nums" }, children: a != null ? `${String(t).length} / ${a}` : `${String(t).length}` }) : null
    ] })
  ] });
});
export {
  N as TextArea
};
