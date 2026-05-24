import { jsxs as x, jsx as h } from "react/jsx-runtime";
import * as r from "react";
import { extractSlottedChildren as y } from "./_internal.js";
const E = r.forwardRef(function({ placement: p = "top", delay: a = 200, disabled: i = !1, children: c, style: d, ...f }, m) {
  const [s, n] = r.useState(!1), o = r.useRef(null), l = r.useId(), { slotted: t, rest: u } = y(c, "trigger"), v = { top: { bottom: "100%", left: "50%", transform: `translateX(-50%) ${s ? "scale(1)" : "scale(0.95)"}`, marginBottom: "6px" }, bottom: { top: "100%", left: "50%", transform: `translateX(-50%) ${s ? "scale(1)" : "scale(0.95)"}`, marginTop: "6px" }, left: { right: "100%", top: "50%", transform: `translateY(-50%) ${s ? "scale(1)" : "scale(0.95)"}`, marginRight: "6px" }, right: { left: "100%", top: "50%", transform: `translateY(-50%) ${s ? "scale(1)" : "scale(0.95)"}`, marginLeft: "6px" } }, g = t[0] && r.isValidElement(t[0]) ? r.cloneElement(t[0], { "aria-describedby": l, onMouseEnter: (e) => {
    i || (o.current = setTimeout(() => n(!0), a)), t[0].props.onMouseEnter?.(e);
  }, onMouseLeave: (e) => {
    o.current && clearTimeout(o.current), n(!1), t[0].props.onMouseLeave?.(e);
  }, onFocus: (e) => {
    i || (o.current = setTimeout(() => n(!0), a)), t[0].props.onFocus?.(e);
  }, onBlur: (e) => {
    o.current && clearTimeout(o.current), n(!1), t[0].props.onBlur?.(e);
  } }) : null;
  return /* @__PURE__ */ x("div", { ...f, ref: m, onKeyDown: (e) => {
    e.key === "Escape" && n(!1);
  }, style: { display: "inline-flex", position: "relative", verticalAlign: "middle", ...d }, children: [
    g,
    /* @__PURE__ */ h("span", { id: l, role: "tooltip", style: { position: "absolute", zIndex: "var(--vds-zindex-tooltip, 600)", padding: "var(--vds-spacing-1_5) var(--vds-spacing-2_5)", background: "var(--vds-theme-bg-inverse)", color: "var(--vds-theme-text-inverse)", fontFamily: "var(--vds-font-family-sans)", fontSize: "var(--vds-type-role-caption-size)", borderRadius: "var(--vds-radius-sm)", pointerEvents: "none", opacity: s ? 1 : 0, whiteSpace: "nowrap", maxWidth: "240px", boxShadow: "var(--vds-shadow-2)", ...v[p] }, children: u })
  ] });
});
export {
  E as Tooltip
};
