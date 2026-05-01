const FOCUSABLE_SELECTOR = [
  'a[href]:not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]:not([tabindex="-1"])',
  'audio[controls]:not([tabindex="-1"])',
  'video[controls]:not([tabindex="-1"])',
  'details > summary:first-of-type:not([tabindex="-1"])'
].join(",");
function isVisible(el) {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}
function getTabbables(root) {
  const tabbables = [];
  const collect = (node) => {
    const els = node.querySelectorAll(FOCUSABLE_SELECTOR);
    els.forEach((el) => {
      if (isVisible(el)) tabbables.push(el);
      if (el.shadowRoot) collect(el.shadowRoot);
    });
  };
  collect(root);
  return tabbables;
}
class FocusTrap {
  constructor(root) {
    this.previousActive = null;
    this.active = false;
    this.handleKeydown = (e) => {
      if (e.key !== "Tab") return;
      const tabbables = getTabbables(this.root);
      if (tabbables.length === 0) {
        e.preventDefault();
        this.root.focus();
        return;
      }
      const first = tabbables[0];
      const last = tabbables[tabbables.length - 1];
      const active = this.composedActiveElement();
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    this.handleFocusIn = (e) => {
      const target = e.target;
      if (this.root.contains(target)) return;
      const path = e.composedPath();
      if (path.includes(this.root)) return;
      e.stopImmediatePropagation();
      const tabbables = getTabbables(this.root);
      (tabbables[0] ?? this.root).focus();
    };
    this.root = root;
  }
  activate(initialFocus) {
    if (this.active) return;
    this.active = true;
    this.previousActive = document.activeElement ?? null;
    const tabbables = getTabbables(this.root);
    const target = initialFocus ?? tabbables[0] ?? this.root;
    requestAnimationFrame(() => {
      if (target instanceof HTMLElement) target.focus();
    });
    document.addEventListener("keydown", this.handleKeydown, true);
    document.addEventListener("focusin", this.handleFocusIn, true);
  }
  deactivate() {
    if (!this.active) return;
    this.active = false;
    document.removeEventListener("keydown", this.handleKeydown, true);
    document.removeEventListener("focusin", this.handleFocusIn, true);
    requestAnimationFrame(() => {
      this.previousActive?.focus?.();
    });
  }
  composedActiveElement() {
    let node = document;
    let active = null;
    while (node) {
      const el = node.activeElement;
      if (!el) break;
      active = el;
      node = el.shadowRoot;
    }
    return active;
  }
}
export {
  FocusTrap
};
//# sourceMappingURL=focus-trap.js.map
