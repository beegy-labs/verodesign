import { jsx as s, jsxs as p } from "react/jsx-runtime";
import * as o from "react";
import { createPortal as K } from "react-dom";
import { extractSlottedChildren as y, focusRing as T, cx as W, mergeRefs as q } from "./_internal.js";
const H = { sm: "24rem", md: "32rem", lg: "48rem", xl: "56rem", "2xl": "72rem" }, b = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])', Y = o.forwardRef(function({ open: r = !1, size: h = "md", closeOnBackdrop: x = !0, "close-on-backdrop": w, closeOnEscape: E = !0, "close-on-escape": k, onOpen: l, onClose: d, className: R, children: S, style: C, ...D }, j) {
  const n = o.useRef(null), c = o.useId(), { slotted: a, rest: I } = y(S, "title"), { slotted: v, rest: z } = y(I, "footer"), A = w ?? x, u = k ?? E;
  return o.useEffect(() => {
    r && l?.(new CustomEvent("vds-open"));
  }, [r, l]), o.useEffect(() => {
    if (!r) return;
    const e = document.body.style.overflow;
    document.body.style.overflow = "hidden", n.current?.querySelector(b)?.focus();
    const f = (t) => {
      if (t.key === "Escape" && u && d?.(new CustomEvent("vds-close")), t.key !== "Tab" || !n.current) return;
      const i = Array.from(n.current.querySelectorAll(b)).filter((F) => !F.hasAttribute("disabled"));
      if (!i.length) return;
      const m = i[0], g = i[i.length - 1];
      t.shiftKey && document.activeElement === m && (t.preventDefault(), g.focus()), !t.shiftKey && document.activeElement === g && (t.preventDefault(), m.focus());
    };
    return window.addEventListener("keydown", f), () => {
      document.body.style.overflow = e, window.removeEventListener("keydown", f);
    };
  }, [u, d, r]), r ? K(
    /* @__PURE__ */ s(
      "div",
      {
        role: "presentation",
        onMouseDown: (e) => {
          e.target === e.currentTarget && A && d?.(new CustomEvent("vds-close"));
        },
        style: {
          position: "fixed",
          inset: 0,
          background: "color-mix(in oklab, var(--vds-theme-text-primary) 50%, transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--vds-spacing-4)",
          zIndex: "var(--vds-zindex-modal)"
        },
        children: /* @__PURE__ */ p(
          "div",
          {
            ...D,
            ref: (e) => {
              n.current = e, q(j, e);
            },
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": a.length ? c : void 0,
            className: W("vds-dialog", R),
            style: {
              background: "var(--vds-theme-bg-elevated)",
              color: "var(--vds-theme-text-primary)",
              borderRadius: "var(--vds-radius-lg)",
              boxShadow: "var(--vds-shadow-5, var(--vds-elevation-3))",
              maxWidth: `min(${H[h]}, 100%)`,
              width: "100%",
              maxHeight: "calc(100dvh - 2rem)",
              display: "flex",
              flexDirection: "column",
              outline: "none",
              ...C
            },
            children: [
              a.length ? /* @__PURE__ */ p("div", { style: { padding: "var(--vds-spacing-4) var(--vds-spacing-5)", borderBottom: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--vds-spacing-3)" }, children: [
                /* @__PURE__ */ s("div", { id: c, style: { margin: 0, fontFamily: "var(--vds-font-family-sans)", fontSize: "var(--vds-type-role-title-size)", fontWeight: "var(--vds-type-role-title-weight)", lineHeight: "var(--vds-font-lineheight-tight)" }, children: a }),
                /* @__PURE__ */ s("button", { type: "button", "aria-label": "Close dialog", onClick: () => d?.(new CustomEvent("vds-close")), style: { all: "unset", cursor: "pointer", padding: "var(--vds-spacing-1)", borderRadius: "var(--vds-radius-sm)", color: "var(--vds-theme-text-dim)", ...T }, children: "×" })
              ] }) : null,
              /* @__PURE__ */ s("div", { style: { padding: "var(--vds-spacing-4) var(--vds-spacing-5)", flex: 1, overflowY: "auto" }, children: z }),
              v.length ? /* @__PURE__ */ s("div", { style: { padding: "var(--vds-spacing-4) var(--vds-spacing-5)", borderTop: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)", display: "flex", justifyContent: "flex-end", gap: "var(--vds-spacing-2)" }, children: v }) : null
            ]
          }
        )
      }
    ),
    document.body
  ) : null;
});
export {
  Y as Dialog
};
