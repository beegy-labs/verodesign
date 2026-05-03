import { LitElement as o, html as a } from "lit";
let r = 0;
class c extends o {
  static {
    this.formAssociated = !1;
  }
  emit(e, t, s = {}) {
    const n = new CustomEvent(e, {
      bubbles: !0,
      composed: !0,
      cancelable: !0,
      ...s,
      detail: t
    });
    return this.dispatchEvent(n);
  }
  updated(e) {
    super.updated(e);
  }
  createId(e) {
    r += 1;
    const t = globalThis.crypto?.randomUUID?.().slice(0, 8) ?? r.toString(36);
    return `${e}-${t}`;
  }
  renderSr(e) {
    return a`<span class="sr-only">${e}</span>`;
  }
}
export {
  c as VdsElement
};
