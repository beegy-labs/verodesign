import { jsx as x, jsxs as R } from "react/jsx-runtime";
import * as r from "react";
const A = r.createContext(null), N = r.forwardRef(function({
  value: t = "",
  activation: i = "auto",
  orientation: n = "horizontal",
  variant: l = "underline",
  indicator: b = "none",
  onChange: g,
  className: h,
  children: c,
  style: u,
  ...y
}, e) {
  const p = r.useId(), v = r.useRef(/* @__PURE__ */ new Map()), [I, a] = r.useState(t), f = t || I, m = r.Children.toArray(c).filter((s) => r.isValidElement(s) && s.type === B).map((s) => s.props.value ?? "");
  r.useEffect(() => {
    t && a(t);
  }, [t]);
  const o = r.useCallback((s, k, D) => {
    v.current.set(s, { ref: k, disabled: D });
  }, []), d = r.useCallback((s) => m.indexOf(s), [m]), E = r.useCallback(
    (s, k = !0) => {
      a(s), g?.(new CustomEvent("vds-change", { detail: { value: s } })), k && queueMicrotask(() => v.current.get(s)?.ref?.focus());
    },
    [g]
  ), z = r.useMemo(
    () => ({
      value: f,
      orientation: n,
      variant: l,
      indicator: b,
      setActive: E,
      activation: i,
      registerTab: o,
      activeIndex: d,
      tabId: (s) => `${p}-tab-${s}`,
      panelId: (s) => `${p}-panel-${s}`
    }),
    [i, d, f, p, b, n, o, E, l]
  ), C = [], w = [];
  return r.Children.forEach(c, (s) => {
    if (!r.isValidElement(s)) {
      w.push(s);
      return;
    }
    s.type === B ? C.push(s) : w.push(s);
  }), /* @__PURE__ */ x(A.Provider, { value: z, children: /* @__PURE__ */ R(
    "div",
    {
      ...y,
      ref: e,
      className: ["vds-block", h].filter(Boolean).join(" "),
      "data-orientation": n,
      "data-variant": l,
      "data-indicator": b,
      style: {
        display: n === "vertical" ? "grid" : "block",
        gridTemplateColumns: n === "vertical" ? "auto 1fr" : void 0,
        gap: n === "vertical" ? "var(--vds-spacing-4)" : void 0,
        fontFamily: "var(--vds-font-family-sans)",
        color: "var(--vds-theme-text-primary)",
        ...u
      },
      children: [
        /* @__PURE__ */ R(
          "div",
          {
            role: "tablist",
            "aria-orientation": n,
            className: "vds-tabs-list",
            style: {
              display: "flex",
              flexDirection: n === "vertical" ? "column" : "row",
              gap: "var(--vds-spacing-1)",
              padding: l === "segmented" ? "var(--vds-spacing-1)" : "0",
              borderBottom: n === "horizontal" && l === "underline" ? "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)" : void 0,
              borderRight: n === "vertical" && l === "underline" ? "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)" : void 0,
              borderRadius: l === "segmented" ? "var(--vds-radius-lg)" : "0",
              background: l === "segmented" ? "var(--vds-theme-bg-subtle)" : "transparent",
              position: "relative",
              overflowX: n === "horizontal" ? "auto" : "visible",
              scrollbarWidth: "thin"
            },
            children: [
              l === "segmented" && b === "slide" && n === "horizontal" ? /* @__PURE__ */ x(
                "div",
                {
                  "aria-hidden": "true",
                  style: {
                    position: "absolute",
                    insetBlock: "var(--vds-spacing-1)",
                    insetInlineStart: "calc(var(--vds-spacing-1) + (100% / Math.max(1, 1)))"
                  }
                }
              ) : null,
              C
            ]
          }
        ),
        /* @__PURE__ */ x("div", { className: "vds-tabs-panels", children: w })
      ]
    }
  ) });
}), B = r.forwardRef(function({ value: t = "", disabled: i = !1, className: n, children: l, onClick: b, onKeyDown: g, style: h, ...c }, u) {
  const y = r.useContext(A);
  if (!y) throw new Error("Tab must be used within Tabs");
  const e = y, p = r.useRef(null);
  r.useImperativeHandle(u, () => p.current, []), r.useEffect(() => {
    e.registerTab(t, p.current, i);
  }, [i, e, t]);
  const v = e.value === t || !e.value && e.activeIndex(t) === 0;
  function I(a) {
    const f = Array.from(document.getElementById(e.tabId(t))?.closest('[role="tablist"]')?.querySelectorAll('[role="tab"]') ?? []).filter((d) => d instanceof HTMLButtonElement && d.getAttribute("aria-disabled") !== "true"), m = f.findIndex((d) => d.id === e.tabId(t));
    if (m < 0) return;
    const o = f[(m + a + f.length) % f.length];
    o && (e.activation === "auto" && o.dataset.value ? e.setActive(o.dataset.value, !0) : o.focus());
  }
  return /* @__PURE__ */ x(
    "button",
    {
      ...c,
      ref: (a) => {
        p.current = a, typeof u == "function" && u(a);
      },
      id: e.tabId(t),
      type: "button",
      role: "tab",
      "data-value": t,
      "aria-selected": v,
      "aria-controls": e.panelId(t),
      "aria-disabled": i || void 0,
      tabIndex: v ? 0 : -1,
      disabled: i,
      className: ["vds-inline-flex vds-items-center", n].filter(Boolean).join(" "),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--vds-spacing-1_5)",
        padding: "var(--vds-spacing-2) var(--vds-spacing-4)",
        cursor: i ? "not-allowed" : "pointer",
        userSelect: "none",
        color: e.variant === "segmented" ? v ? "var(--vds-theme-text-primary)" : "var(--vds-theme-text-dim)" : v ? "var(--vds-theme-primary)" : "var(--vds-theme-text-dim)",
        border: "none",
        borderBottom: y.orientation === "horizontal" && e.variant !== "segmented" ? `2px solid ${v ? "var(--vds-theme-primary)" : "transparent"}` : "none",
        borderRadius: e.variant === "segmented" ? "var(--vds-radius-md)" : "0",
        background: e.variant === "segmented" && v ? e.indicator === "slide" ? "transparent" : "var(--vds-theme-bg-elevated)" : "transparent",
        fontSize: "var(--vds-type-role-label-size)",
        fontWeight: "var(--vds-type-role-label-weight)",
        opacity: i ? 0.5 : 1,
        transition: "color var(--vds-duration-fast) var(--vds-easing-ease-out), border-color var(--vds-duration-fast) var(--vds-easing-ease-out), background-color var(--vds-duration-fast) var(--vds-easing-ease-out)",
        ...h
      },
      onClick: (a) => {
        i || y.setActive(t), b?.(a);
      },
      onKeyDown: (a) => {
        const f = e.orientation === "horizontal" ? "ArrowLeft" : "ArrowUp", m = e.orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
        if (a.key === f)
          a.preventDefault(), I(-1);
        else if (a.key === m)
          a.preventDefault(), I(1);
        else if (a.key === "Home") {
          a.preventDefault();
          const o = document.getElementById(e.tabId(t))?.closest('[role="tablist"]')?.querySelector('[role="tab"]');
          o?.focus(), e.activation === "auto" && o?.dataset.value && e.setActive(o.dataset.value, !1);
        } else if (a.key === "End") {
          a.preventDefault();
          const o = document.getElementById(e.tabId(t))?.closest('[role="tablist"]')?.querySelectorAll('[role="tab"]'), d = o?.[o.length - 1];
          d?.focus(), e.activation === "auto" && d?.dataset.value && e.setActive(d.dataset.value, !1);
        } else (a.key === "Enter" || a.key === " ") && (a.preventDefault(), i || e.setActive(t));
        g?.(a);
      },
      children: l
    }
  );
}), j = r.forwardRef(function({ value: t = "", className: i, children: n, style: l, ...b }, g) {
  const h = r.useContext(A);
  if (!h) throw new Error("TabPanel must be used within Tabs");
  const c = h, u = c.value === t || !c.value && c.activeIndex(t) === 0;
  return /* @__PURE__ */ x(
    "div",
    {
      ...b,
      ref: g,
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
      children: n
    }
  );
});
export {
  B as Tab,
  j as TabPanel,
  N as Tabs
};
