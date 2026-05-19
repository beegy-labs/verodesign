import "../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as o } from "../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import { LitElement as a } from "../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
let r = 0;
class c extends a {
  static {
    this.formAssociated = !1;
  }
  emit(t, e, s = {}) {
    const n = new CustomEvent(t, {
      bubbles: !0,
      composed: !0,
      cancelable: !0,
      ...s,
      detail: e
    });
    return this.dispatchEvent(n);
  }
  updated(t) {
    super.updated(t);
  }
  createId(t) {
    r += 1;
    const e = globalThis.crypto?.randomUUID?.().slice(0, 8) ?? r.toString(36);
    return `${t}-${e}`;
  }
  renderSr(t) {
    return o`<span class="sr-only">${t}</span>`;
  }
}
export {
  c as VdsElement
};
