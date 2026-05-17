import { jsx as o, jsxs as m } from "react/jsx-runtime";
import * as f from "react";
const a = ["auto", "light", "dark"], y = { auto: "Auto", light: "Light", dark: "Dark" }, b = { auto: "◐", light: "☀", dark: "☾" };
function k(n, s) {
  const t = (a.indexOf(n) + s + a.length) % a.length;
  return a[t] ?? "auto";
}
function w({
  value: n,
  onChange: s,
  compact: i = !1,
  size: t = "md",
  className: u
}) {
  const l = f.useRef({
    auto: null,
    light: null,
    dark: null
  }), v = t === "sm" ? "var(--vds-spacing-1)" : "var(--vds-spacing-2)", g = t === "sm" ? "var(--vds-spacing-2)" : "var(--vds-spacing-3)", c = "var(--vds-radius-full)", h = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--vds-spacing-2)",
    padding: `${v} ${g}`,
    borderRadius: c,
    border: "var(--vds-border-width-sm, thin) solid var(--vds-theme-border-default)",
    background: "transparent",
    color: "var(--vds-theme-text-primary)",
    cursor: "pointer",
    userSelect: "none",
    minWidth: i ? "auto" : "8ch"
  };
  function p(r) {
    if (r.key !== "ArrowLeft" && r.key !== "ArrowRight") return;
    r.preventDefault();
    const e = r.key === "ArrowLeft" ? -1 : 1, d = k(n, e);
    s(d), queueMicrotask(() => l.current[d]?.focus());
  }
  return /* @__PURE__ */ o(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Theme mode",
      className: u,
      onKeyDown: p,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--vds-spacing-1)",
        padding: "var(--vds-spacing-1)",
        borderRadius: c,
        background: "var(--vds-theme-bg-card)",
        border: "var(--vds-border-width-sm, thin) solid var(--vds-theme-border-default)"
      },
      children: a.map((r) => {
        const e = n === r;
        return /* @__PURE__ */ m(
          "button",
          {
            ref: (d) => {
              l.current[r] = d;
            },
            type: "button",
            role: "radio",
            "aria-checked": e,
            tabIndex: e ? 0 : -1,
            onClick: () => s(r),
            style: {
              ...h,
              background: e ? "var(--vds-theme-primary)" : "transparent",
              color: e ? "var(--vds-theme-primary-fg)" : "var(--vds-theme-text-primary)",
              borderColor: e ? "var(--vds-theme-primary)" : "var(--vds-theme-border-default)"
            },
            children: [
              /* @__PURE__ */ o("span", { "aria-hidden": "true", style: { fontSize: t === "sm" ? "1rem" : "1.1rem" }, children: b[r] }),
              i ? null : /* @__PURE__ */ o("span", { style: { fontWeight: "var(--vds-type-role-title-weight)" }, children: y[r] })
            ]
          },
          r
        );
      })
    }
  );
}
export {
  w as ThemeToggle
};
