import { css as d, html as p } from "lit";
import { property as o } from "lit/decorators.js";
import { VdsElement as v } from "../../base/vds-element.js";
var c = Object.defineProperty, r = (e, i, n, f) => {
  for (var t = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (t = a(i, n, t) || t);
  return t && c(i, n, t), t;
};
class l extends v {
  static {
    this.styles = d`
    :host {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--vds-spacing-4);
    }
    :host([hidden]) { display: none; }

    .body {
      display: flex;
      flex-direction: column;
      gap: var(--vds-spacing-1);
      min-width: 0;
    }
    .title {
      margin: 0;
      font-size: var(--vds-font-size-2xl);
      font-weight: var(--vds-font-weight-700);
      line-height: var(--vds-font-lineheight-snug);
      color: var(--vds-theme-text-bright);
    }
    .subtitle {
      margin: 0;
      font-size: var(--vds-font-size-sm);
      color: var(--vds-theme-text-secondary);
    }
    .subtitle:empty { display: none; }
    .actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--vds-spacing-2);
      flex-shrink: 0;
    }
    slot[name="actions"]:not(:empty) ~ .actions { display: none; }
  `;
  }
  render() {
    return p`
      <div class="body">
        <h1 class="title">${this.heading ?? ""}</h1>
        <p class="subtitle">${this.subtitle ?? ""}</p>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    `;
  }
}
r([
  o({ type: String })
], l.prototype, "heading");
r([
  o({ type: String })
], l.prototype, "subtitle");
export {
  l as VdsPageHeader
};
