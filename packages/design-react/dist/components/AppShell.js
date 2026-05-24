import { jsxs as p, Fragment as c, jsx as s } from "react/jsx-runtime";
import * as a from "react";
const m = "(prefers-reduced-motion: reduce)", i = "var(--vds-safe-area-top, env(safe-area-inset-top))", o = "var(--vds-safe-area-bottom, env(safe-area-inset-bottom))";
function u() {
  const [e, t] = a.useState(!1);
  return a.useEffect(() => {
    const n = window.matchMedia?.(m);
    if (!n) return;
    const d = () => t(n.matches);
    return d(), n.addEventListener?.("change", d), () => n.removeEventListener?.("change", d);
  }, []), e;
}
function v(e, t) {
  return {
    ...e,
    ...t
  };
}
function g(e) {
  if (!a.isValidElement(e)) return e;
  const t = e, n = t.props, d = a.Children.map(n.children, (r) => {
    if (!a.isValidElement(r)) return r;
    const l = r, h = l.props;
    return a.cloneElement(l, {
      style: v(h.style, {
        flex: "1 1 0",
        minWidth: "0",
        display: "flex",
        justifyContent: "center"
      })
    });
  });
  return a.cloneElement(t, {
    style: v(n.style, {
      display: "flex",
      alignItems: "stretch",
      justifyContent: "space-between",
      gap: "var(--vds-spacing-1)",
      width: "100%",
      minWidth: "0",
      minHeight: "var(--vds-app-shell-bottom-nav-height)"
    }),
    children: d
  });
}
function b({ header: e, bottomNav: t, children: n }) {
  const d = u();
  return /* @__PURE__ */ p(c, { children: [
    e ? /* @__PURE__ */ s(
      "div",
      {
        "data-vds-app-shell": "header",
        style: {
          position: "fixed",
          insetInline: "0",
          top: "0",
          zIndex: "var(--vds-zindex-app-shell)",
          minHeight: `calc(var(--vds-app-shell-header-height) + ${i})`,
          paddingTop: i,
          background: "var(--vds-theme-bg-elevated)",
          borderBottom: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)",
          boxShadow: "var(--vds-elevation-1)"
        },
        children: e
      }
    ) : null,
    t ? /* @__PURE__ */ s(
      "div",
      {
        "data-vds-app-shell": "bottom-nav",
        style: {
          position: "fixed",
          insetInline: "0",
          bottom: "0",
          zIndex: "var(--vds-zindex-app-shell)",
          minHeight: `calc(var(--vds-app-shell-bottom-nav-height) + ${o})`,
          paddingBottom: o,
          background: "var(--vds-theme-bg-elevated)",
          borderTop: "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)",
          boxShadow: "var(--vds-elevation-1)",
          transition: d ? "none" : "transform var(--vds-motion-duration-fast) var(--vds-motion-easing-standard)"
        },
        children: /* @__PURE__ */ s(
          "div",
          {
            style: {
              minHeight: "var(--vds-app-shell-bottom-nav-height)",
              paddingInline: "var(--vds-spacing-2)",
              width: "100%",
              minWidth: "0"
            },
            children: g(t)
          }
        )
      }
    ) : null,
    /* @__PURE__ */ s(
      "div",
      {
        "data-vds-app-shell": "content",
        style: {
          minHeight: "100dvh",
          paddingTop: e ? `calc(var(--vds-app-shell-header-height) + ${i})` : void 0,
          paddingBottom: t ? `calc(var(--vds-app-shell-bottom-nav-height) + ${o})` : void 0
        },
        children: n
      }
    )
  ] });
}
export {
  b as AppShell
};
