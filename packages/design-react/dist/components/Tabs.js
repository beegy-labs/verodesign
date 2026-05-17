import { jsx as I, jsxs as B } from "react/jsx-runtime";
import * as s from "react";
const k = s.createContext(null), D = s.forwardRef(function({
  value: e = "",
  activation: i = "auto",
  orientation: o = "horizontal",
  onChange: p,
  className: h,
  children: m,
  style: y,
  ...c
}, d) {
  const f = s.useId(), t = s.useRef(/* @__PURE__ */ new Map()), [g, v] = s.useState(e), x = e || g, a = s.Children.toArray(m).filter((r) => s.isValidElement(r) && r.type === C).map((r) => r.props.value ?? "");
  s.useEffect(() => {
    e && v(e);
  }, [e]);
  const u = s.useCallback((r, A, R) => {
    t.current.set(r, { ref: A, disabled: R });
  }, []), b = s.useCallback((r) => a.indexOf(r), [a]), n = s.useCallback(
    (r, A = !0) => {
      v(r), p?.(new CustomEvent("vds-change", { detail: { value: r } })), A && queueMicrotask(() => t.current.get(r)?.ref?.focus());
    },
    [p]
  ), l = s.useMemo(
    () => ({
      value: x,
      orientation: o,
      setActive: n,
      activation: i,
      registerTab: u,
      activeIndex: b,
      tabId: (r) => `${f}-tab-${r}`,
      panelId: (r) => `${f}-panel-${r}`
    }),
    [i, b, x, f, o, u, n]
  ), E = [], w = [];
  return s.Children.forEach(m, (r) => {
    if (!s.isValidElement(r)) {
      w.push(r);
      return;
    }
    r.type === C ? E.push(r) : w.push(r);
  }), /* @__PURE__ */ I(k.Provider, { value: l, children: /* @__PURE__ */ B(
    "div",
    {
      ...c,
      ref: d,
      className: ["vds-block", h].filter(Boolean).join(" "),
      "data-orientation": o,
      style: {
        display: o === "vertical" ? "grid" : "block",
        gridTemplateColumns: o === "vertical" ? "auto 1fr" : void 0,
        gap: o === "vertical" ? "var(--vds-spacing-4)" : void 0,
        fontFamily: "var(--vds-font-family-sans)",
        color: "var(--vds-theme-text-primary)",
        ...y
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
              borderBottom: o === "horizontal" ? "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)" : void 0,
              borderRight: o === "vertical" ? "var(--vds-border-width-1) solid var(--vds-theme-border-subtle)" : void 0,
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
}), C = s.forwardRef(function({ value: e = "", disabled: i = !1, className: o, children: p, onClick: h, onKeyDown: m, style: y, ...c }, d) {
  const f = s.useContext(k);
  if (!f) throw new Error("Tab must be used within Tabs");
  const t = f, g = s.useRef(null);
  s.useImperativeHandle(d, () => g.current, []), s.useEffect(() => {
    t.registerTab(e, g.current, i);
  }, [i, t, e]);
  const v = t.value === e || !t.value && t.activeIndex(e) === 0;
  function x(a) {
    const u = Array.from(document.getElementById(t.tabId(e))?.closest('[role="tablist"]')?.querySelectorAll('[role="tab"]') ?? []).filter((l) => l instanceof HTMLButtonElement && l.getAttribute("aria-disabled") !== "true"), b = u.findIndex((l) => l.id === t.tabId(e));
    if (b < 0) return;
    const n = u[(b + a + u.length) % u.length];
    n && (t.activation === "auto" && n.dataset.value ? t.setActive(n.dataset.value, !0) : n.focus());
  }
  return /* @__PURE__ */ I(
    "button",
    {
      ...c,
      ref: (a) => {
        g.current = a, typeof d == "function" && d(a);
      },
      id: t.tabId(e),
      type: "button",
      role: "tab",
      "data-value": e,
      "aria-selected": v,
      "aria-controls": t.panelId(e),
      "aria-disabled": i || void 0,
      tabIndex: v ? 0 : -1,
      disabled: i,
      className: ["vds-inline-flex vds-items-center", o].filter(Boolean).join(" "),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--vds-spacing-1_5)",
        padding: "var(--vds-spacing-2) var(--vds-spacing-4)",
        cursor: i ? "not-allowed" : "pointer",
        userSelect: "none",
        color: v ? "var(--vds-theme-primary)" : "var(--vds-theme-text-dim)",
        border: "none",
        borderBottom: f.orientation === "horizontal" ? `2px solid ${v ? "var(--vds-theme-primary)" : "transparent"}` : "none",
        background: "transparent",
        fontSize: "var(--vds-type-role-label-size)",
        fontWeight: "var(--vds-type-role-label-weight)",
        opacity: i ? 0.5 : 1,
        transition: "color var(--vds-duration-fast) var(--vds-easing-ease-out), border-color var(--vds-duration-fast) var(--vds-easing-ease-out)",
        ...y
      },
      onClick: (a) => {
        i || f.setActive(e), h?.(a);
      },
      onKeyDown: (a) => {
        const u = t.orientation === "horizontal" ? "ArrowLeft" : "ArrowUp", b = t.orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
        if (a.key === u)
          a.preventDefault(), x(-1);
        else if (a.key === b)
          a.preventDefault(), x(1);
        else if (a.key === "Home") {
          a.preventDefault();
          const n = document.getElementById(t.tabId(e))?.closest('[role="tablist"]')?.querySelector('[role="tab"]');
          n?.focus(), t.activation === "auto" && n?.dataset.value && t.setActive(n.dataset.value, !1);
        } else if (a.key === "End") {
          a.preventDefault();
          const n = document.getElementById(t.tabId(e))?.closest('[role="tablist"]')?.querySelectorAll('[role="tab"]'), l = n?.[n.length - 1];
          l?.focus(), t.activation === "auto" && l?.dataset.value && t.setActive(l.dataset.value, !1);
        } else (a.key === "Enter" || a.key === " ") && (a.preventDefault(), i || t.setActive(e));
        m?.(a);
      },
      children: p
    }
  );
}), N = s.forwardRef(function({ value: e = "", className: i, children: o, style: p, ...h }, m) {
  const y = s.useContext(k);
  if (!y) throw new Error("TabPanel must be used within Tabs");
  const c = y, d = c.value === e || !c.value && c.activeIndex(e) === 0;
  return /* @__PURE__ */ I(
    "div",
    {
      ...h,
      ref: m,
      id: c.panelId(e),
      role: "tabpanel",
      "aria-labelledby": c.tabId(e),
      "aria-hidden": !d,
      hidden: !d,
      tabIndex: 0,
      className: ["vds-block", i].filter(Boolean).join(" "),
      style: {
        display: d ? "block" : "none",
        padding: "var(--vds-spacing-4) 0",
        ...p
      },
      children: o
    }
  );
});
export {
  C as Tab,
  N as TabPanel,
  D as Tabs
};
