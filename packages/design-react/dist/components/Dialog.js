import { jsx as n, jsxs as u } from "react/jsx-runtime";
import * as r from "react";
import { createPortal as G } from "react-dom";
import { extractSlottedChildren as h, focusRing as $, cx as J, mergeRefs as U } from "./_internal.js";
const X = { sm: "24rem", md: "32rem", lg: "48rem", xl: "56rem", "2xl": "72rem" }, Z = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])', _ = "(prefers-reduced-motion: reduce)", O = {
  borderRadius: "var(--vds-radius-lg) var(--vds-radius-lg) 0 0",
  width: "100%",
  maxWidth: "none"
}, ne = r.forwardRef(function({ open: s = !1, size: C = "md", placement: D = "center", closeOnBackdrop: F = !0, "close-on-backdrop": I, closeOnEscape: M = !0, "close-on-escape": j, onOpen: b, onClose: l, className: H, children: W, style: y, ...z }, L) {
  const o = r.useRef(null), w = r.useId(), { slotted: f, rest: A } = h(W, "title"), { slotted: d, rest: T } = h(A, "description"), { slotted: x, rest: B } = h(T, "footer"), K = I ?? F, E = j ?? M, e = D === "bottom", [Y, c] = r.useState(!1), [v, q] = r.useState(!1), [N, S] = r.useState(!1), [P, m] = r.useState(!1), g = r.useRef(!1);
  if (r.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const t = window.matchMedia(_), a = () => q(t.matches);
    return a(), t.addEventListener("change", a), () => t.removeEventListener("change", a);
  }, []), r.useLayoutEffect(() => {
    if (!s || !e) {
      c(!1);
      return;
    }
    if (v) {
      c(!0);
      return;
    }
    c(!1);
    const t = window.requestAnimationFrame(() => c(!0));
    return () => window.cancelAnimationFrame(t);
  }, [e, s, v]), r.useEffect(() => {
    s && b?.(new CustomEvent("vds-open"));
  }, [s, b]), r.useEffect(() => {
    if (!s) return;
    const t = document.body.style.overflow;
    document.body.style.overflow = "hidden", o.current?.focus();
    const a = (i) => {
      if (i.key === "Escape" && E && l?.(new CustomEvent("vds-close")), i.key !== "Tab" || !o.current) return;
      const p = Array.from(o.current.querySelectorAll(Z)).filter((V) => !V.hasAttribute("disabled")), k = p[0] ?? o.current, R = p[p.length - 1];
      i.shiftKey && document.activeElement === k && (i.preventDefault(), (R ?? o.current).focus()), !i.shiftKey && document.activeElement === R && (i.preventDefault(), k.focus());
    };
    return window.addEventListener("keydown", a), () => {
      document.body.style.overflow = t, window.removeEventListener("keydown", a);
    };
  }, [E, l, s]), !s) return null;
  const Q = e ? v || Y ? "translateY(0)" : "translateY(100%)" : void 0;
  return G(
    /* @__PURE__ */ n(
      "div",
      {
        role: "presentation",
        onMouseDown: (t) => {
          t.target === t.currentTarget && K && l?.(new CustomEvent("vds-close"));
        },
        style: {
          position: "fixed",
          inset: 0,
          background: "var(--vds-theme-scrim)",
          backdropFilter: "blur(var(--vds-blur-lg))",
          WebkitBackdropFilter: "blur(var(--vds-blur-lg))",
          display: "flex",
          alignItems: e ? "flex-end" : "center",
          justifyContent: "center",
          padding: e ? "0" : "var(--vds-spacing-4)",
          zIndex: "var(--vds-zindex-modal)"
        },
        children: /* @__PURE__ */ u(
          "div",
          {
            ...z,
            ref: (t) => {
              o.current = t, U(L, t);
            },
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": f.length ? w : void 0,
            tabIndex: -1,
            className: J("vds-dialog", H),
            style: {
              background: "var(--vds-theme-bg-elevated)",
              color: "var(--vds-theme-text-primary)",
              borderRadius: "var(--vds-radius-lg)",
              boxShadow: "var(--vds-shadow-5, var(--vds-elevation-3))",
              maxWidth: `min(${X[C]}, 100%)`,
              width: "100%",
              maxHeight: e ? "calc(100dvh - var(--vds-spacing-8))" : "calc(100dvh - 2rem)",
              minHeight: e ? "60dvh" : void 0,
              display: "flex",
              flexDirection: "column",
              outline: "none",
              transition: v ? "none" : e ? "transform var(--vds-duration-medium) var(--vds-easing-ease-out)" : void 0,
              ...e ? y : void 0,
              ...e ? O : void 0,
              ...e ? { transform: Q } : y
            },
            children: [
              e ? /* @__PURE__ */ n("div", { "aria-hidden": "true", style: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "var(--vds-spacing-6)", paddingTop: "var(--vds-spacing-2)" }, children: /* @__PURE__ */ n("div", { style: { width: "var(--vds-spacing-12)", height: "var(--vds-spacing-1)", borderRadius: "var(--vds-radius-full)", background: "var(--vds-theme-border-subtle)" } }) }) : null,
              f.length ? /* @__PURE__ */ u("div", { style: { padding: e ? "var(--vds-spacing-2) var(--vds-spacing-5) var(--vds-spacing-5)" : "var(--vds-spacing-4) var(--vds-spacing-5)", borderBottom: e ? "none" : "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--vds-spacing-3)" }, children: [
                /* @__PURE__ */ u("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: d.length && e ? "var(--vds-spacing-1)" : void 0 }, children: [
                  /* @__PURE__ */ n("div", { id: w, style: { margin: 0, fontFamily: "var(--vds-font-family-sans)", fontSize: "var(--vds-type-role-title-size)", fontWeight: "var(--vds-type-role-title-weight)", lineHeight: "var(--vds-font-lineheight-tight)" }, children: f }),
                  d.length && e ? /* @__PURE__ */ n("div", { style: { color: "var(--vds-theme-text-dim)", fontSize: "var(--vds-type-role-label-size)", fontWeight: "var(--vds-type-role-label-weight)", lineHeight: "var(--vds-font-lineheight-normal)" }, children: d }) : null
                ] }),
                /* @__PURE__ */ n("button", { type: "button", "aria-label": "Close dialog", onClick: () => l?.(new CustomEvent("vds-close")), onMouseEnter: () => S(!0), onMouseLeave: () => S(!1), onPointerDown: () => {
                  g.current = !0, m(!1);
                }, onFocus: () => m(!g.current), onBlur: () => {
                  g.current = !1, m(!1);
                }, style: { all: "unset", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "var(--vds-spacing-1)", color: "var(--vds-theme-text-dim)", background: N ? "var(--vds-theme-bg-hover)" : "transparent", border: "none", boxShadow: "none", ...P ? $ : {} }, children: "×" })
              ] }) : null,
              /* @__PURE__ */ u("div", { style: { padding: e ? "0 var(--vds-spacing-5) var(--vds-spacing-6)" : "var(--vds-spacing-4) var(--vds-spacing-5)", flex: 1, overflowY: "auto" }, children: [
                !e && d.length ? d : null,
                B
              ] }),
              x.length ? /* @__PURE__ */ n("div", { style: { padding: e ? "var(--vds-spacing-5) var(--vds-spacing-5) calc(var(--vds-spacing-5) + env(safe-area-inset-bottom))" : "var(--vds-spacing-4) var(--vds-spacing-5)", borderTop: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", display: "flex", justifyContent: "flex-end", gap: "var(--vds-spacing-2)" }, children: x }) : null
            ]
          }
        )
      }
    ),
    document.body
  );
});
export {
  ne as Dialog
};
