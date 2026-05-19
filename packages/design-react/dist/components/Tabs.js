import { jsx as I, jsxs as z } from "react/jsx-runtime";
import * as s from "react";
const A = s.createContext(null), N = s.forwardRef(function({
  value: t = "",
  activation: i = "auto",
  orientation: o = "horizontal",
  variant: l = "underline",
  onChange: p,
  className: h,
  children: b,
  style: c,
  ...u
}, g) {
  const e = s.useId(), y = s.useRef(/* @__PURE__ */ new Map()), [f, x] = s.useState(t), a = t || f, v = s.Children.toArray(b).filter((r) => s.isValidElement(r) && r.type === C).map((r) => r.props.value ?? "");
  s.useEffect(() => {
    t && x(t);
  }, [t]);
  const m = s.useCallback((r, k, B) => {
    y.current.set(r, { ref: k, disabled: B });
  }, []), n = s.useCallback((r) => v.indexOf(r), [v]), d = s.useCallback(
    (r, k = !0) => {
      x(r), p?.(new CustomEvent("vds-change", { detail: { value: r } })), k && queueMicrotask(() => y.current.get(r)?.ref?.focus());
    },
    [p]
  ), R = s.useMemo(
    () => ({
      value: a,
      orientation: o,
      variant: l,
      setActive: d,
      activation: i,
      registerTab: m,
      activeIndex: n,
      tabId: (r) => `${e}-tab-${r}`,
      panelId: (r) => `${e}-panel-${r}`
    }),
    [i, n, a, e, o, m, d, l]
  ), E = [], w = [];
  return s.Children.forEach(b, (r) => {
    if (!s.isValidElement(r)) {
      w.push(r);
      return;
    }
    r.type === C ? E.push(r) : w.push(r);
  }), /* @__PURE__ */ I(A.Provider, { value: R, children: /* @__PURE__ */ z(
    "div",
    {
      ...u,
      ref: g,
      className: ["vds-block", h].filter(Boolean).join(" "),
      "data-orientation": o,
      "data-variant": l,
      style: {
        display: o === "vertical" ? "grid" : "block",
        gridTemplateColumns: o === "vertical" ? "auto 1fr" : void 0,
        gap: o === "vertical" ? "var(--vds-spacing-4)" : void 0,
        fontFamily: "var(--vds-font-family-sans)",
        color: "var(--vds-theme-text-primary)",
        ...c
      },
      children: [
        /* @__PURE__ */ I(
          "div",
          {
            role: "tablist",
            "aria-orientation": o,
            className: "vds-tabs-list",
            style: {
              display: "flex",
              flexDirection: o === "vertical" ? "column" : "row",
              gap: "var(--vds-spacing-1)",
              padding: l === "segmented" ? "var(--vds-spacing-1)" : "0",
              borderBottom: o === "horizontal" && l === "underline" ? "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)" : void 0,
              borderRight: o === "vertical" && l === "underline" ? "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)" : void 0,
              borderRadius: l === "segmented" ? "var(--vds-radius-lg)" : "0",
              background: l === "segmented" ? "var(--vds-theme-bg-subtle)" : "transparent",
              overflowX: o === "horizontal" ? "auto" : "visible",
              scrollbarWidth: "thin"
            },
            children: E
          }
        ),
        /* @__PURE__ */ I("div", { className: "vds-tabs-panels", children: w })
      ]
    }
  ) });
}), C = s.forwardRef(function({ value: t = "", disabled: i = !1, className: o, children: l, onClick: p, onKeyDown: h, style: b, ...c }, u) {
  const g = s.useContext(A);
  if (!g) throw new Error("Tab must be used within Tabs");
  const e = g, y = s.useRef(null);
  s.useImperativeHandle(u, () => y.current, []), s.useEffect(() => {
    e.registerTab(t, y.current, i);
  }, [i, e, t]);
  const f = e.value === t || !e.value && e.activeIndex(t) === 0;
  function x(a) {
    const v = Array.from(document.getElementById(e.tabId(t))?.closest('[role="tablist"]')?.querySelectorAll('[role="tab"]') ?? []).filter((d) => d instanceof HTMLButtonElement && d.getAttribute("aria-disabled") !== "true"), m = v.findIndex((d) => d.id === e.tabId(t));
    if (m < 0) return;
    const n = v[(m + a + v.length) % v.length];
    n && (e.activation === "auto" && n.dataset.value ? e.setActive(n.dataset.value, !0) : n.focus());
  }
  return /* @__PURE__ */ I(
    "button",
    {
      ...c,
      ref: (a) => {
        y.current = a, typeof u == "function" && u(a);
      },
      id: e.tabId(t),
      type: "button",
      role: "tab",
      "data-value": t,
      "aria-selected": f,
      "aria-controls": e.panelId(t),
      "aria-disabled": i || void 0,
      tabIndex: f ? 0 : -1,
      disabled: i,
      className: ["vds-inline-flex vds-items-center", o].filter(Boolean).join(" "),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--vds-spacing-1_5)",
        padding: "var(--vds-spacing-2) var(--vds-spacing-4)",
        cursor: i ? "not-allowed" : "pointer",
        userSelect: "none",
        color: e.variant === "segmented" ? f ? "var(--vds-theme-text-primary)" : "var(--vds-theme-text-dim)" : f ? "var(--vds-theme-primary)" : "var(--vds-theme-text-dim)",
        border: "none",
        borderBottom: g.orientation === "horizontal" && e.variant !== "segmented" ? `2px solid ${f ? "var(--vds-theme-primary)" : "transparent"}` : "none",
        borderRadius: e.variant === "segmented" ? "var(--vds-radius-md)" : "0",
        background: e.variant === "segmented" && f ? "var(--vds-theme-bg-elevated)" : "transparent",
        fontSize: "var(--vds-type-role-label-size)",
        fontWeight: "var(--vds-type-role-label-weight)",
        opacity: i ? 0.5 : 1,
        transition: "color var(--vds-duration-fast) var(--vds-easing-ease-out), border-color var(--vds-duration-fast) var(--vds-easing-ease-out), background-color var(--vds-duration-fast) var(--vds-easing-ease-out)",
        ...b
      },
      onClick: (a) => {
        i || g.setActive(t), p?.(a);
      },
      onKeyDown: (a) => {
        const v = e.orientation === "horizontal" ? "ArrowLeft" : "ArrowUp", m = e.orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
        if (a.key === v)
          a.preventDefault(), x(-1);
        else if (a.key === m)
          a.preventDefault(), x(1);
        else if (a.key === "Home") {
          a.preventDefault();
          const n = document.getElementById(e.tabId(t))?.closest('[role="tablist"]')?.querySelector('[role="tab"]');
          n?.focus(), e.activation === "auto" && n?.dataset.value && e.setActive(n.dataset.value, !1);
        } else if (a.key === "End") {
          a.preventDefault();
          const n = document.getElementById(e.tabId(t))?.closest('[role="tablist"]')?.querySelectorAll('[role="tab"]'), d = n?.[n.length - 1];
          d?.focus(), e.activation === "auto" && d?.dataset.value && e.setActive(d.dataset.value, !1);
        } else (a.key === "Enter" || a.key === " ") && (a.preventDefault(), i || e.setActive(t));
        h?.(a);
      },
      children: l
    }
  );
}), S = s.forwardRef(function({ value: t = "", className: i, children: o, style: l, ...p }, h) {
  const b = s.useContext(A);
  if (!b) throw new Error("TabPanel must be used within Tabs");
  const c = b, u = c.value === t || !c.value && c.activeIndex(t) === 0;
  return /* @__PURE__ */ I(
    "div",
    {
      ...p,
      ref: h,
      id: c.panelId(t),
      role: "tabpanel",
      "aria-labelledby": c.tabId(t),
      "aria-hidden": !u,
      hidden: !u,
      tabIndex: 0,
      className: ["vds-block", i].filter(Boolean).join(" "),
      style: {
        display: u ? "block" : "none",
        padding: "var(--vds-spacing-4) 0",
        ...l
      },
      children: o
    }
  );
});
export {
  C as Tab,
  S as TabPanel,
  N as Tabs
};
