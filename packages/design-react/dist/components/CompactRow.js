import { jsxs as i, jsx as r } from "react/jsx-runtime";
function p({
  leading: t,
  label: d,
  meta: l,
  trailing: s,
  onClick: e,
  selected: a = !1,
  className: n
}) {
  return /* @__PURE__ */ i(
    e ? "button" : "div",
    {
      type: e ? "button" : void 0,
      className: n,
      onClick: e,
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "var(--vds-spacing-3)",
        padding: "var(--vds-spacing-3)",
        borderRadius: "var(--vds-radius-lg)",
        border: "var(--vds-border-width-sm, thin) solid var(--vds-theme-border-default)",
        background: a ? "var(--vds-theme-bg-selected, var(--vds-theme-bg-card))" : "var(--vds-theme-bg-card)",
        color: "var(--vds-theme-text-primary)",
        cursor: e ? "pointer" : "default",
        textAlign: "left"
      },
      children: [
        t ? /* @__PURE__ */ r("span", { style: { display: "inline-flex", flexShrink: 0 }, children: t }) : null,
        /* @__PURE__ */ i("span", { style: { minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--vds-spacing-1)", flex: 1 }, children: [
          /* @__PURE__ */ r(
            "span",
            {
              style: {
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: "var(--vds-type-role-title-weight)"
              },
              children: d
            }
          ),
          l ? /* @__PURE__ */ r(
            "span",
            {
              style: {
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: "var(--vds-type-role-label-size)",
                color: "var(--vds-theme-text-secondary)"
              },
              children: l
            }
          ) : null
        ] }),
        s ? /* @__PURE__ */ r("span", { style: { display: "inline-flex", alignItems: "center", gap: "var(--vds-spacing-2)", flexShrink: 0 }, children: s }) : null
      ]
    }
  );
}
export {
  p as CompactRow
};
