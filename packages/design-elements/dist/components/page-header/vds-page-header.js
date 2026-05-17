import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as d } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as a } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as p } from "../../base/vds-element.js";
import { css as m } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var v = Object.defineProperty, o = (t, s, l, c) => {
  for (var e = void 0, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (e = n(s, l, e) || e);
  return e && v(s, l, e), e;
};
class r extends p {
  static {
    this.styles = m`
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
      font-size: var(--vds-type-role-title-size);
      font-weight: var(--vds-type-role-title-weight);
      line-height: var(--vds-type-role-title-lineheight);
      color: var(--vds-theme-text-bright);
    }
    .subtitle {
      margin: 0;
      font-size: var(--vds-type-role-label-size);
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
    return d`
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
  a({ type: String })
], r.prototype, "heading");
o([
  a({ type: String })
], r.prototype, "subtitle");
export {
  r as VdsPageHeader
};
