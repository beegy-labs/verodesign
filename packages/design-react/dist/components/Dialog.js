import { jsx as n, jsxs as c } from "react/jsx-runtime";
import * as r from "react";
import { createPortal as Q } from "react-dom";
import { extractSlottedChildren as m, focusRing as V, cx as q, mergeRefs as G } from "./_internal.js";
const $ = { sm: "24rem", md: "32rem", lg: "48rem", xl: "56rem", "2xl": "72rem" }, J = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])', U = "(prefers-reduced-motion: reduce)", X = {
  borderRadius: "var(--vds-radius-lg) var(--vds-radius-lg) 0 0",
  width: "100%",
  maxWidth: "none"
}, te = r.forwardRef(function({ open: s = !1, size: R = "md", placement: S = "center", closeOnBackdrop: C = !0, "close-on-backdrop": D, closeOnEscape: I = !0, "close-on-escape": M, onOpen: p, onClose: l, className: j, children: W, style: h, ...z }, F) {
  const o = r.useRef(null), b = r.useId(), { slotted: v, rest: H } = m(W, "title"), { slotted: i, rest: L } = m(H, "description"), { slotted: y, rest: Y } = m(L, "footer"), B = D ?? C, w = M ?? I, e = S === "bottom", [T, A] = r.useState(!1), [K, x] = r.useState(!1), [N, u] = r.useState(!1), f = r.useRef(!1);
  return r.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const t = window.matchMedia(U), a = () => A(t.matches);
    return a(), t.addEventListener("change", a), () => t.removeEventListener("change", a);
  }, []), r.useEffect(() => {
    s && p?.(new CustomEvent("vds-open"));
  }, [s, p]), r.useEffect(() => {
    if (!s) return;
    const t = document.body.style.overflow;
    document.body.style.overflow = "hidden", o.current?.focus();
    const a = (d) => {
      if (d.key === "Escape" && w && l?.(new CustomEvent("vds-close")), d.key !== "Tab" || !o.current) return;
      const g = Array.from(o.current.querySelectorAll(J)).filter((P) => !P.hasAttribute("disabled")), E = g[0] ?? o.current, k = g[g.length - 1];
      d.shiftKey && document.activeElement === E && (d.preventDefault(), (k ?? o.current).focus()), !d.shiftKey && document.activeElement === k && (d.preventDefault(), E.focus());
    };
    return window.addEventListener("keydown", a), () => {
      document.body.style.overflow = t, window.removeEventListener("keydown", a);
    };
  }, [w, l, s]), s ? Q(
    /* @__PURE__ */ n(
      "div",
      {
        role: "presentation",
        onMouseDown: (t) => {
          t.target === t.currentTarget && B && l?.(new CustomEvent("vds-close"));
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
        children: /* @__PURE__ */ c(
          "div",
          {
            ...z,
            ref: (t) => {
              o.current = t, G(F, t);
            },
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": v.length ? b : void 0,
            tabIndex: -1,
            className: q("vds-dialog", j),
            style: {
              background: "var(--vds-theme-bg-elevated)",
              color: "var(--vds-theme-text-primary)",
              borderRadius: "var(--vds-radius-lg)",
              boxShadow: "var(--vds-shadow-5, var(--vds-elevation-3))",
              maxWidth: `min(${$[R]}, 100%)`,
              width: "100%",
              maxHeight: e ? "calc(100dvh - var(--vds-spacing-20))" : "calc(100dvh - 2rem)",
              display: "flex",
              flexDirection: "column",
              outline: "none",
              transform: e ? s ? "translateY(0)" : "translateY(100%)" : void 0,
              transition: T ? "none" : e ? "transform var(--vds-duration-medium) var(--vds-easing-ease-out)" : void 0,
              ...e ? h : void 0,
              ...e ? X : void 0,
              ...e ? { transform: s ? "translateY(0)" : "translateY(100%)" } : h
            },
            children: [
              e ? /* @__PURE__ */ n("div", { "aria-hidden": "true", style: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "var(--vds-spacing-6)", paddingTop: "var(--vds-spacing-2)" }, children: /* @__PURE__ */ n("div", { style: { width: "var(--vds-spacing-12)", height: "var(--vds-spacing-1)", borderRadius: "var(--vds-radius-full)", background: "var(--vds-theme-border-subtle)" } }) }) : null,
              v.length ? /* @__PURE__ */ c("div", { style: { padding: e ? "var(--vds-spacing-2) var(--vds-spacing-5) var(--vds-spacing-5)" : "var(--vds-spacing-4) var(--vds-spacing-5)", borderBottom: e ? "none" : "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--vds-spacing-3)" }, children: [
                /* @__PURE__ */ c("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: i.length && e ? "var(--vds-spacing-1)" : void 0 }, children: [
                  /* @__PURE__ */ n("div", { id: b, style: { margin: 0, fontFamily: "var(--vds-font-family-sans)", fontSize: "var(--vds-type-role-title-size)", fontWeight: "var(--vds-type-role-title-weight)", lineHeight: "var(--vds-font-lineheight-tight)" }, children: v }),
                  i.length && e ? /* @__PURE__ */ n("div", { style: { color: "var(--vds-theme-text-dim)", fontSize: "var(--vds-type-role-label-size)", fontWeight: "var(--vds-type-role-label-weight)", lineHeight: "var(--vds-font-lineheight-normal)" }, children: i }) : null
                ] }),
                /* @__PURE__ */ n("button", { type: "button", "aria-label": "Close dialog", onClick: () => l?.(new CustomEvent("vds-close")), onMouseEnter: () => x(!0), onMouseLeave: () => x(!1), onPointerDown: () => {
                  f.current = !0, u(!1);
                }, onFocus: () => u(!f.current), onBlur: () => {
                  f.current = !1, u(!1);
                }, style: { all: "unset", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "var(--vds-spacing-1)", color: "var(--vds-theme-text-dim)", background: K ? "var(--vds-theme-bg-hover)" : "transparent", border: "none", boxShadow: "none", ...N ? V : {} }, children: "×" })
              ] }) : null,
              /* @__PURE__ */ c("div", { style: { padding: e ? "0 var(--vds-spacing-5) var(--vds-spacing-6)" : "var(--vds-spacing-4) var(--vds-spacing-5)", flex: 1, overflowY: "auto" }, children: [
                !e && i.length ? i : null,
                Y
              ] }),
              y.length ? /* @__PURE__ */ n("div", { style: { padding: e ? "var(--vds-spacing-5) var(--vds-spacing-5) calc(var(--vds-spacing-5) + env(safe-area-inset-bottom))" : "var(--vds-spacing-4) var(--vds-spacing-5)", borderTop: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", display: "flex", justifyContent: "flex-end", gap: "var(--vds-spacing-2)" }, children: y }) : null
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
