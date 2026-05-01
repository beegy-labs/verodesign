const KEY_TO_ATTR = {
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
};
const ELEMENT_REF_KEYS = /* @__PURE__ */ new Set([
  "ariaActiveDescendantElement",
  "ariaControlsElements",
  "ariaOwnsElements"
]);
let _supportsInternalsAriaReflection;
function supportsInternalsAriaReflection() {
  if (_supportsInternalsAriaReflection !== void 0) return _supportsInternalsAriaReflection;
  if (typeof document === "undefined" || typeof HTMLElement === "undefined" || !("attachInternals" in HTMLElement.prototype)) {
    _supportsInternalsAriaReflection = false;
    return false;
  }
  try {
    const probe = document.createElement("div");
    if (!("attachInternals" in probe)) {
      _supportsInternalsAriaReflection = false;
      return false;
    }
    const internals = probe.attachInternals?.();
    _supportsInternalsAriaReflection = internals != null && "role" in internals;
    return _supportsInternalsAriaReflection;
  } catch {
    _supportsInternalsAriaReflection = false;
    return false;
  }
}
function setAriaProperty(host, internals, key, value) {
  const attr = KEY_TO_ATTR[key];
  if (supportsInternalsAriaReflection() && !ELEMENT_REF_KEYS.has(key)) {
    try {
      internals[key] = value;
    } catch {
    }
  }
  if (value == null || value === false) {
    host.removeAttribute(attr);
    return;
  }
  if (Array.isArray(value)) {
    const ids = value.map((el) => el.id).filter(Boolean).join(" ");
    if (ids) host.setAttribute(attr, ids);
    else host.removeAttribute(attr);
    return;
  }
  if (value instanceof Element) {
    if (value.id) host.setAttribute(attr, value.id);
    else host.removeAttribute(attr);
    return;
  }
  if (value === true) {
    host.setAttribute(attr, "true");
    return;
  }
  host.setAttribute(attr, String(value));
}
function setRole(host, internals, role) {
  setAriaProperty(host, internals, "role", role);
}
if (typeof document !== "undefined" && typeof HTMLElement !== "undefined") {
  void supportsInternalsAriaReflection();
}
export {
  setAriaProperty,
  setRole
};
//# sourceMappingURL=attribute-mirror.js.map
