import { jsx as r, jsxs as h } from "react/jsx-runtime";
import * as s from "react";
import { createPortal as F } from "react-dom";
import { extractSlottedChildren as b, focusRing as H, cx as K, mergeRefs as Y } from "./_internal.js";
const $ = { sm: "24rem", md: "32rem", lg: "48rem", xl: "56rem", "2xl": "72rem" }, N = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])', Q = "(prefers-reduced-motion: reduce)", y = "env(safe-area-inset-bottom, var(--vds-spacing-0))", U = s.forwardRef(function({ open: a = !1, size: w = "md", placement: x = "center", closeOnBackdrop: E = !0, "close-on-backdrop": k, closeOnEscape: R = !0, "close-on-escape": C, onOpen: v, onClose: o, className: S, children: D, style: I, ...j }, M) {
  const d = s.useRef(null), u = s.useId(), { slotted: l, rest: z } = b(D, "title"), { slotted: f, rest: A } = b(z, "footer"), B = k ?? E, m = C ?? R, t = x === "bottom", [L, T] = s.useState(!1);
  return s.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const e = window.matchMedia(Q), n = () => T(e.matches);
    return n(), e.addEventListener("change", n), () => e.removeEventListener("change", n);
  }, []), s.useEffect(() => {
    a && v?.(new CustomEvent("vds-open"));
  }, [a, v]), s.useEffect(() => {
    if (!a) return;
    const e = document.body.style.overflow;
    document.body.style.overflow = "hidden", d.current?.focus();
    const n = (i) => {
      if (i.key === "Escape" && m && o?.(new CustomEvent("vds-close")), i.key !== "Tab" || !d.current) return;
      const c = Array.from(d.current.querySelectorAll(N)).filter((W) => !W.hasAttribute("disabled")), g = c[0] ?? d.current, p = c[c.length - 1];
      i.shiftKey && document.activeElement === g && (i.preventDefault(), (p ?? d.current).focus()), !i.shiftKey && document.activeElement === p && (i.preventDefault(), g.focus());
    };
    return window.addEventListener("keydown", n), () => {
      document.body.style.overflow = e, window.removeEventListener("keydown", n);
    };
  }, [m, o, a]), a ? F(
    /* @__PURE__ */ r(
      "div",
      {
        role: "presentation",
        onMouseDown: (e) => {
          e.target === e.currentTarget && B && o?.(new CustomEvent("vds-close"));
        },
        style: {
          position: "fixed",
          inset: 0,
          background: "var(--vds-theme-scrim)",
          backdropFilter: "blur(var(--vds-blur-lg))",
          WebkitBackdropFilter: "blur(var(--vds-blur-lg))",
          display: "flex",
          alignItems: t ? "flex-end" : "center",
          justifyContent: "center",
          padding: t ? `var(--vds-spacing-4) var(--vds-spacing-4) calc(var(--vds-spacing-4) + ${y})` : "var(--vds-spacing-4)",
          zIndex: "var(--vds-zindex-modal)"
        },
        children: /* @__PURE__ */ h(
          "div",
          {
            ...j,
            ref: (e) => {
              d.current = e, Y(M, e);
            },
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": l.length ? u : void 0,
            tabIndex: -1,
            className: K("vds-dialog", S),
            style: {
              background: "var(--vds-theme-bg-elevated)",
              color: "var(--vds-theme-text-primary)",
              borderRadius: t ? "var(--vds-radius-lg) var(--vds-radius-lg) 0 0" : "var(--vds-radius-lg)",
              boxShadow: "var(--vds-shadow-5, var(--vds-elevation-3))",
              maxWidth: t ? "none" : `min(${$[w]}, 100%)`,
              width: "100%",
              maxHeight: t ? "calc(100dvh - var(--vds-spacing-20))" : "calc(100dvh - 2rem)",
              display: "flex",
              flexDirection: "column",
              outline: "none",
              transform: t ? a ? "translateY(0)" : `translateY(calc(var(--vds-spacing-12) + ${y}))` : void 0,
              transition: L ? "none" : t ? "transform var(--vds-duration-medium) var(--vds-easing-ease-out)" : void 0,
              ...I
            },
            children: [
              t ? /* @__PURE__ */ r("div", { "aria-hidden": "true", style: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "var(--vds-spacing-6)", paddingTop: "var(--vds-spacing-2)" }, children: /* @__PURE__ */ r("div", { style: { width: "var(--vds-spacing-12)", height: "var(--vds-spacing-1)", borderRadius: "var(--vds-radius-full)", background: "var(--vds-theme-border-subtle)" } }) }) : null,
              l.length ? /* @__PURE__ */ h("div", { style: { padding: t ? "var(--vds-spacing-2) var(--vds-spacing-5) var(--vds-spacing-4)" : "var(--vds-spacing-4) var(--vds-spacing-5)", borderBottom: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--vds-spacing-3)" }, children: [
                /* @__PURE__ */ r("div", { id: u, style: { margin: 0, fontFamily: "var(--vds-font-family-sans)", fontSize: "var(--vds-type-role-title-size)", fontWeight: "var(--vds-type-role-title-weight)", lineHeight: "var(--vds-font-lineheight-tight)" }, children: l }),
                /* @__PURE__ */ r("button", { type: "button", "aria-label": "Close dialog", onClick: () => o?.(new CustomEvent("vds-close")), style: { all: "unset", cursor: "pointer", padding: "var(--vds-spacing-1)", borderRadius: "var(--vds-radius-sm)", color: "var(--vds-theme-text-dim)", ...H }, children: "×" })
              ] }) : null,
              /* @__PURE__ */ r("div", { style: { padding: "var(--vds-spacing-4) var(--vds-spacing-5)", flex: 1, overflowY: "auto" }, children: A }),
              f.length ? /* @__PURE__ */ r("div", { style: { padding: "var(--vds-spacing-4) var(--vds-spacing-5)", borderTop: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", display: "flex", justifyContent: "flex-end", gap: "var(--vds-spacing-2)" }, children: f }) : null
            ]
          }
        )
      }
    ),
    document.body
  ) : null;
});
export {
  U as Dialog
};
