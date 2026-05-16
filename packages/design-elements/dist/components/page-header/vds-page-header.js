import { css as d, html as p } from "lit";
import { property as l } from "lit/decorators.js";
import { VdsElement as v } from "../../base/vds-element.js";
var f = Object.defineProperty, o = (e, i, n, c) => {
  for (var t = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (t = a(i, n, t) || t);
  return t && f(i, n, t), t;
};
class r extends v {
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

    slot[name="leading"] {
      flex-shrink: 0;
    }
    slot[name="leading"]:empty {
      display: none;
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: var(--vds-spacing-1);
      flex: 1;
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
      <slot name="leading"></slot>
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
o([
  l({ type: String })
], r.prototype, "heading");
o([
  l({ type: String })
], r.prototype, "subtitle");
export {
  r as VdsPageHeader
};
