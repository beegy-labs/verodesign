import { jsx as p, jsxs as b } from "react/jsx-runtime";
import * as t from "react";
import { extractSlottedChildren as h, focusRing as w } from "./_internal.js";
const g = t.createContext(null), C = t.forwardRef(function({ open: o, placement: n = "bottom-start", onSelect: u, children: c, style: v, ...f }, m) {
  const [s, r] = t.useState(!!o), i = t.useRef(null), d = t.useRef(null);
  t.useEffect(() => {
    o != null && r(o);
  }, [o]), t.useEffect(() => {
    if (!s) return;
    const e = (l) => {
      !d.current?.contains(l.target) && !i.current?.contains(l.target) && r(!1);
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [s]);
  const { slotted: a, rest: x } = h(c, "trigger");
  return /* @__PURE__ */ p(g.Provider, { value: { close: () => r(!1), onSelect: u }, children: /* @__PURE__ */ b("div", { ...f, ref: m, style: { display: "inline-block", position: "relative", fontFamily: "var(--vds-font-family-sans)", ...v }, children: [
    a[0] && t.isValidElement(a[0]) ? t.cloneElement(a[0], {
      ref: (e) => {
        i.current = e;
      },
      "aria-haspopup": "menu",
      "aria-expanded": s,
      onClick: (e) => {
        i.current = e.currentTarget, r((l) => !l), a[0].props.onClick?.(e);
      },
      onKeyDown: (e) => {
        (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), r(!0)), e.key === "ArrowUp" && (e.preventDefault(), r(!0)), a[0].props.onKeyDown?.(e);
      }
    }) : null,
    s ? /* @__PURE__ */ p("div", { ref: d, role: "menu", style: { position: "absolute", top: "100%", left: n === "bottom-start" ? 0 : "auto", right: n === "bottom-end" ? 0 : "auto", marginTop: "var(--vds-spacing-1)", minWidth: "12rem", background: "var(--vds-theme-bg-elevated)", color: "var(--vds-theme-text-primary)", border: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", borderRadius: "var(--vds-radius-md)", boxShadow: "var(--vds-shadow-3)", padding: "var(--vds-spacing-1)", zIndex: "var(--vds-zindex-dropdown)", display: "flex", flexDirection: "column", gap: "var(--vds-spacing-0_5)" }, children: x }) : null
  ] }) });
}), E = t.forwardRef(function({ value: o = "", disabled: n = !1, tone: u, "data-tone": c, style: v, onClick: f, ...m }, s) {
  const r = t.useContext(g);
  return /* @__PURE__ */ p(
    "button",
    {
      ...m,
      ref: s,
      type: "button",
      role: "menuitem",
      disabled: n,
      onClick: (d) => {
        n || (r?.onSelect?.(new CustomEvent("vds-select", { detail: { value: o } })), r?.close(), f?.(d));
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--vds-spacing-2)",
        padding: "var(--vds-spacing-2) var(--vds-spacing-3)",
        cursor: n ? "not-allowed" : "pointer",
        userSelect: "none",
        color: (c ?? u ?? "default") === "destructive" ? "var(--vds-theme-destructive)" : "var(--vds-theme-text-primary)",
        borderRadius: "var(--vds-radius-sm)",
        fontSize: "var(--vds-type-role-label-size)",
        background: "transparent",
        border: "none",
        textAlign: "left",
        opacity: n ? 0.5 : 1,
        ...w,
        outline: "none",
        ...v
      }
    }
  );
});
export {
  C as Menu,
  E as MenuItem
};
