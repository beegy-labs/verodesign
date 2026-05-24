import { jsx as e, jsxs as i } from "react/jsx-runtime";
import * as s from "react";
import { createPortal as E } from "react-dom";
import { Button as p } from "./Button.js";
import { GlassSurface as z } from "./GlassSurface.js";
function S({
  open: f,
  onClose: a,
  title: g,
  description: o,
  children: u,
  onConfirm: y,
  confirmLabel: d = "확인",
  cancelLabel: l = "취소",
  confirmDisabled: h = !1,
  destructive: b = !1
}) {
  if (!f) return null;
  const [r, v] = s.useState(!1), x = l?.trim() ? l : "취소", w = d?.trim() ? d : "확인", c = s.useId(), t = typeof window < "u" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  return s.useEffect(() => {
    document.body.style.overflow = "hidden", v(!1);
    const n = requestAnimationFrame(() => v(!0)), m = (k) => {
      k.key === "Escape" && a();
    };
    return window.addEventListener("keydown", m), () => {
      document.body.style.overflow = "", cancelAnimationFrame(n), window.removeEventListener("keydown", m);
    };
  }, [a]), E(
    /* @__PURE__ */ e(
      "div",
      {
        role: "presentation",
        onClick: a,
        style: {
          position: "fixed",
          inset: 0,
          background: "color-mix(in srgb, var(--vds-theme-scrim, var(--vds-theme-text-primary)) 55%, transparent)",
          zIndex: 1e3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--vds-spacing-4)",
          paddingBottom: "calc(var(--vds-spacing-4) + env(safe-area-inset-bottom))",
          opacity: r || t ? 1 : 0,
          transition: t ? "none" : "opacity var(--vds-motion-duration-base) var(--vds-motion-easing-standard)"
        },
        children: /* @__PURE__ */ e(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c,
            onClick: (n) => n.stopPropagation(),
            children: /* @__PURE__ */ i(
              z,
              {
                strength: "base",
                style: {
                  width: "min(28rem, calc(100vw - 2 * var(--vds-spacing-4)))",
                  maxHeight: "calc(100dvh - var(--vds-spacing-8) - env(safe-area-inset-bottom))",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "var(--vds-radius-lg)",
                  opacity: r || t ? 1 : 0,
                  transform: r || t ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 6px, 0) scale(0.98)",
                  transition: t ? "none" : "opacity var(--vds-motion-duration-base) var(--vds-motion-easing-standard), transform var(--vds-motion-duration-base) var(--vds-motion-easing-decelerate)"
                },
                children: [
                  /* @__PURE__ */ i(
                    "header",
                    {
                      style: {
                        padding: "var(--vds-spacing-4) var(--vds-spacing-5)",
                        borderBottom: "var(--vds-border-width-sm, thin) solid var(--vds-theme-border-subtle, var(--vds-theme-border-default))",
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--vds-spacing-1)"
                      },
                      children: [
                        /* @__PURE__ */ e("strong", { id: c, style: { fontSize: "var(--vds-type-role-title-size)", fontWeight: "var(--vds-type-role-title-weight)" }, children: g }),
                        o ? /* @__PURE__ */ e("span", { style: { fontSize: "var(--vds-type-role-label-size)", color: "var(--vds-theme-text-secondary)" }, children: o }) : null
                      ]
                    }
                  ),
                  /* @__PURE__ */ e(
                    "div",
                    {
                      style: {
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        padding: "var(--vds-spacing-4) var(--vds-spacing-5)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--vds-spacing-3)"
                      },
                      children: u
                    }
                  ),
                  /* @__PURE__ */ i(
                    "footer",
                    {
                      style: {
                        padding: "var(--vds-spacing-4) var(--vds-spacing-5)",
                        paddingBottom: "calc(var(--vds-spacing-4) + env(safe-area-inset-bottom))",
                        borderTop: "var(--vds-border-width-sm, thin) solid var(--vds-theme-border-subtle, var(--vds-theme-border-default))",
                        display: "flex",
                        gap: "var(--vds-spacing-2)"
                      },
                      children: [
                        /* @__PURE__ */ e(p, { tone: "neutral", variant: "outline", style: { flex: 1 }, onClick: a, children: x }),
                        /* @__PURE__ */ e(
                          p,
                          {
                            tone: b ? "destructive" : "primary",
                            style: { flex: 2 },
                            disabled: h,
                            onClick: y,
                            children: w
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            )
          }
        )
      }
    ),
    document.body
  );
}
export {
  S as EntryDialog
};
