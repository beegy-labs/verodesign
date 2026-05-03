const o = {
  role: "role",
  ariaLabel: "aria-label",
  ariaLabelledBy: "aria-labelledby",
  ariaDescribedBy: "aria-describedby",
  ariaPressed: "aria-pressed",
  ariaExpanded: "aria-expanded",
  ariaHasPopup: "aria-haspopup",
  ariaSelected: "aria-selected",
  ariaChecked: "aria-checked",
  ariaCurrent: "aria-current",
  ariaDisabled: "aria-disabled",
  ariaHidden: "aria-hidden",
  ariaInvalid: "aria-invalid",
  ariaRequired: "aria-required",
  ariaModal: "aria-modal",
  ariaOrientation: "aria-orientation",
  ariaLive: "aria-live",
  ariaAtomic: "aria-atomic",
  ariaActiveDescendantElement: "aria-activedescendant",
  ariaControlsElements: "aria-controls",
  ariaOwnsElements: "aria-owns"
}, c = /* @__PURE__ */ new Set([
  "ariaActiveDescendantElement",
  "ariaControlsElements",
  "ariaOwnsElements"
]);
let i;
function l() {
  if (i !== void 0) return i;
  if (typeof document > "u" || typeof HTMLElement > "u" || !("attachInternals" in HTMLElement.prototype))
    return i = !1, !1;
  try {
    const e = document.createElement("div");
    if (!("attachInternals" in e))
      return i = !1, !1;
    const t = e.attachInternals?.();
    return i = t != null && "role" in t, i;
  } catch {
    return i = !1, !1;
  }
}
function f(e, t, n, a) {
  const r = o[n];
  if (l() && !c.has(n))
    try {
      t[n] = a;
    } catch {
    }
  if (a == null || a === !1) {
    e.removeAttribute(r);
    return;
  }
  if (Array.isArray(a)) {
    const s = a.map((d) => d.id).filter(Boolean).join(" ");
    s ? e.setAttribute(r, s) : e.removeAttribute(r);
    return;
  }
  if (a instanceof Element) {
    a.id ? e.setAttribute(r, a.id) : e.removeAttribute(r);
    return;
  }
  if (a === !0) {
    e.setAttribute(r, "true");
    return;
  }
  e.setAttribute(r, String(a));
}
function u(e, t, n) {
  f(e, t, "role", n);
}
typeof document < "u" && typeof HTMLElement < "u" && l();
export {
  f as setAriaProperty,
  u as setRole
};
