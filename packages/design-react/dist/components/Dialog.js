import { jsx as r, jsxs as c } from "react/jsx-runtime";
import * as s from "react";
import { createPortal as Q } from "react-dom";
import { extractSlottedChildren as m, focusRing as V, cx as q, mergeRefs as G } from "./_internal.js";
const J = { sm: "24rem", md: "32rem", lg: "48rem", xl: "56rem", "2xl": "72rem" }, U = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])', X = "(prefers-reduced-motion: reduce)", k = "env(safe-area-inset-bottom, var(--vds-spacing-0))", te = s.forwardRef(function({ open: n = !1, size: R = "md", placement: S = "center", closeOnBackdrop: C = !0, "close-on-backdrop": D, closeOnEscape: I = !0, "close-on-escape": M, onOpen: p, onClose: l, className: j, children: z, style: F, ...H }, W) {
  const a = s.useRef(null), h = s.useId(), { slotted: v, rest: B } = m(z, "title"), { slotted: i, rest: L } = m(B, "description"), { slotted: b, rest: A } = m(L, "footer"), T = D ?? C, y = M ?? I, e = S === "bottom", [K, Y] = s.useState(!1), [$, w] = s.useState(!1), [N, u] = s.useState(!1), f = s.useRef(!1);
  return s.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const t = window.matchMedia(X), o = () => Y(t.matches);
    return o(), t.addEventListener("change", o), () => t.removeEventListener("change", o);
  }, []), s.useEffect(() => {
    n && p?.(new CustomEvent("vds-open"));
  }, [n, p]), s.useEffect(() => {
    if (!n) return;
    const t = document.body.style.overflow;
    document.body.style.overflow = "hidden", a.current?.focus();
    const o = (d) => {
      if (d.key === "Escape" && y && l?.(new CustomEvent("vds-close")), d.key !== "Tab" || !a.current) return;
      const g = Array.from(a.current.querySelectorAll(U)).filter((P) => !P.hasAttribute("disabled")), x = g[0] ?? a.current, E = g[g.length - 1];
      d.shiftKey && document.activeElement === x && (d.preventDefault(), (E ?? a.current).focus()), !d.shiftKey && document.activeElement === E && (d.preventDefault(), x.focus());
    };
    return window.addEventListener("keydown", o), () => {
      document.body.style.overflow = t, window.removeEventListener("keydown", o);
    };
  }, [y, l, n]), n ? Q(
    /* @__PURE__ */ r(
      "div",
      {
        role: "presentation",
        onMouseDown: (t) => {
          t.target === t.currentTarget && T && l?.(new CustomEvent("vds-close"));
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
          padding: e ? `var(--vds-spacing-4) var(--vds-spacing-4) calc(var(--vds-spacing-4) + ${k})` : "var(--vds-spacing-4)",
          zIndex: "var(--vds-zindex-modal)"
        },
        children: /* @__PURE__ */ c(
          "div",
          {
            ...H,
            ref: (t) => {
              a.current = t, G(W, t);
            },
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": v.length ? h : void 0,
            tabIndex: -1,
            className: q("vds-dialog", j),
            style: {
              background: "var(--vds-theme-bg-elevated)",
              color: "var(--vds-theme-text-primary)",
              borderRadius: e ? "var(--vds-radius-lg) var(--vds-radius-lg) 0 0" : "var(--vds-radius-lg)",
              boxShadow: "var(--vds-shadow-5, var(--vds-elevation-3))",
              maxWidth: e ? "none" : `min(${J[R]}, 100%)`,
              width: "100%",
              maxHeight: e ? "calc(100dvh - var(--vds-spacing-20))" : "calc(100dvh - 2rem)",
              display: "flex",
              flexDirection: "column",
              outline: "none",
              transform: e ? n ? "translateY(0)" : `translateY(calc(var(--vds-spacing-12) + ${k}))` : void 0,
              transition: K ? "none" : e ? "transform var(--vds-duration-medium) var(--vds-easing-ease-out)" : void 0,
              ...F
            },
            children: [
              e ? /* @__PURE__ */ r("div", { "aria-hidden": "true", style: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "var(--vds-spacing-6)", paddingTop: "var(--vds-spacing-2)" }, children: /* @__PURE__ */ r("div", { style: { width: "var(--vds-spacing-12)", height: "var(--vds-spacing-1)", borderRadius: "var(--vds-radius-full)", background: "var(--vds-theme-border-subtle)" } }) }) : null,
              v.length ? /* @__PURE__ */ c("div", { style: { padding: e ? "var(--vds-spacing-2) var(--vds-spacing-5) var(--vds-spacing-5)" : "var(--vds-spacing-4) var(--vds-spacing-5)", borderBottom: e ? "none" : "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--vds-spacing-3)" }, children: [
                /* @__PURE__ */ c("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: i.length && e ? "var(--vds-spacing-1)" : void 0 }, children: [
                  /* @__PURE__ */ r("div", { id: h, style: { margin: 0, fontFamily: "var(--vds-font-family-sans)", fontSize: "var(--vds-type-role-title-size)", fontWeight: "var(--vds-type-role-title-weight)", lineHeight: "var(--vds-font-lineheight-tight)" }, children: v }),
                  i.length && e ? /* @__PURE__ */ r("div", { style: { color: "var(--vds-theme-text-dim)", fontSize: "var(--vds-type-role-label-size)", fontWeight: "var(--vds-type-role-label-weight)", lineHeight: "var(--vds-font-lineheight-normal)" }, children: i }) : null
                ] }),
                /* @__PURE__ */ r("button", { type: "button", "aria-label": "Close dialog", onClick: () => l?.(new CustomEvent("vds-close")), onMouseEnter: () => w(!0), onMouseLeave: () => w(!1), onPointerDown: () => {
                  f.current = !0, u(!1);
                }, onFocus: () => u(!f.current), onBlur: () => {
                  f.current = !1, u(!1);
                }, style: { all: "unset", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "var(--vds-spacing-1)", color: "var(--vds-theme-text-dim)", background: $ ? "var(--vds-theme-bg-hover)" : "transparent", border: "none", boxShadow: "none", ...N ? V : {} }, children: "×" })
              ] }) : null,
              /* @__PURE__ */ c("div", { style: { padding: e ? "0 var(--vds-spacing-5) var(--vds-spacing-6)" : "var(--vds-spacing-4) var(--vds-spacing-5)", flex: 1, overflowY: "auto" }, children: [
                !e && i.length ? i : null,
                A
              ] }),
              b.length ? /* @__PURE__ */ r("div", { style: { padding: e ? "var(--vds-spacing-5) var(--vds-spacing-5) calc(var(--vds-spacing-5) + env(safe-area-inset-bottom))" : "var(--vds-spacing-4) var(--vds-spacing-5)", borderTop: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", display: "flex", justifyContent: "flex-end", gap: "var(--vds-spacing-2)" }, children: b }) : null
            ]
          }
        )
      }
    ),
    document.body
  ) : null;
});
export {
  te as Dialog
};
