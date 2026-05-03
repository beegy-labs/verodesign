const r = [
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
function d(i) {
  return !!(i.offsetWidth || i.offsetHeight || i.getClientRects().length);
}
function a(i) {
  const n = [], t = (e) => {
    e.querySelectorAll(r).forEach((o) => {
      d(o) && n.push(o), o.shadowRoot && t(o.shadowRoot);
    });
  };
  return t(i), n;
}
class u {
  constructor(n) {
    this.previousActive = null, this.active = !1, this.handleKeydown = (t) => {
      if (t.key !== "Tab") return;
      const e = a(this.root);
      if (e.length === 0) {
        t.preventDefault(), this.root.focus();
        return;
      }
      const s = e[0], o = e[e.length - 1], c = this.composedActiveElement();
      t.shiftKey && c === s ? (t.preventDefault(), o.focus()) : !t.shiftKey && c === o && (t.preventDefault(), s.focus());
    }, this.handleFocusIn = (t) => {
      const e = t.target;
      if (this.root.contains(e) || t.composedPath().includes(this.root)) return;
      t.stopImmediatePropagation(), (a(this.root)[0] ?? this.root).focus();
    }, this.root = n;
  }
  activate(n) {
    if (this.active) return;
    this.active = !0, this.previousActive = document.activeElement ?? null;
    const t = a(this.root), e = n ?? t[0] ?? this.root;
    requestAnimationFrame(() => {
      e instanceof HTMLElement && e.focus();
    }), document.addEventListener("keydown", this.handleKeydown, !0), document.addEventListener("focusin", this.handleFocusIn, !0);
  }
  deactivate() {
    this.active && (this.active = !1, document.removeEventListener("keydown", this.handleKeydown, !0), document.removeEventListener("focusin", this.handleFocusIn, !0), requestAnimationFrame(() => {
      this.previousActive?.focus?.();
    }));
  }
  composedActiveElement() {
    let n = document, t = null;
    for (; n; ) {
      const e = n.activeElement;
      if (!e) break;
      t = e, n = e.shadowRoot;
    }
    return t;
  }
}
export {
  u as FocusTrap
};
