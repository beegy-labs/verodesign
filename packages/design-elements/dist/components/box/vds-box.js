import { css as g, html as e } from "lit";
import { property as a } from "lit/decorators.js";
import { VdsElement as v } from "../../base/vds-element.js";
var h = Object.defineProperty, d = (p, t, o, l) => {
  for (var i = void 0, s = p.length - 1, r; s >= 0; s--)
    (r = p[s]) && (i = r(t, o, i) || i);
  return i && h(t, o, i), i;
};
class n extends v {
  constructor() {
    super(...arguments), this.inline = !1;
  }
  static {
    this.styles = g`
    :host { display: block; }
    :host([hidden]) { display: none; }
    :host([inline]) { display: inline-block; }

    /* padding-x */
    :host([px="0"])  { padding-inline: 0; }
    :host([px="1"])  { padding-inline: var(--vds-spacing-1); }
    :host([px="2"])  { padding-inline: var(--vds-spacing-2); }
    :host([px="3"])  { padding-inline: var(--vds-spacing-3); }
    :host([px="4"])  { padding-inline: var(--vds-spacing-4); }
    :host([px="5"])  { padding-inline: var(--vds-spacing-5); }
    :host([px="6"])  { padding-inline: var(--vds-spacing-6); }
    :host([px="8"])  { padding-inline: var(--vds-spacing-8); }
    :host([px="10"]) { padding-inline: var(--vds-spacing-10); }
    :host([px="12"]) { padding-inline: var(--vds-spacing-12); }
    :host([px="16"]) { padding-inline: var(--vds-spacing-16); }

    /* padding-y */
    :host([py="0"])  { padding-block: 0; }
    :host([py="1"])  { padding-block: var(--vds-spacing-1); }
    :host([py="2"])  { padding-block: var(--vds-spacing-2); }
    :host([py="3"])  { padding-block: var(--vds-spacing-3); }
    :host([py="4"])  { padding-block: var(--vds-spacing-4); }
    :host([py="5"])  { padding-block: var(--vds-spacing-5); }
    :host([py="6"])  { padding-block: var(--vds-spacing-6); }
    :host([py="8"])  { padding-block: var(--vds-spacing-8); }
    :host([py="10"]) { padding-block: var(--vds-spacing-10); }
    :host([py="12"]) { padding-block: var(--vds-spacing-12); }
    :host([py="16"]) { padding-block: var(--vds-spacing-16); }

    /* padding (all sides) */
    :host([p="0"])  { padding: 0; }
    :host([p="1"])  { padding: var(--vds-spacing-1); }
    :host([p="2"])  { padding: var(--vds-spacing-2); }
    :host([p="3"])  { padding: var(--vds-spacing-3); }
    :host([p="4"])  { padding: var(--vds-spacing-4); }
    :host([p="5"])  { padding: var(--vds-spacing-5); }
    :host([p="6"])  { padding: var(--vds-spacing-6); }
    :host([p="8"])  { padding: var(--vds-spacing-8); }
    :host([p="10"]) { padding: var(--vds-spacing-10); }
    :host([p="12"]) { padding: var(--vds-spacing-12); }
    :host([p="16"]) { padding: var(--vds-spacing-16); }

    /* max-width */
    :host([max-width="sm"])   { max-width: 24rem;  margin-inline: auto; }
    :host([max-width="md"])   { max-width: 28rem;  margin-inline: auto; }
    :host([max-width="lg"])   { max-width: 32rem;  margin-inline: auto; }
    :host([max-width="xl"])   { max-width: 36rem;  margin-inline: auto; }
    :host([max-width="2xl"])  { max-width: 42rem;  margin-inline: auto; }
    :host([max-width="full"]) { max-width: 100%; }
  `;
  }
  render() {
    return e`<slot></slot>`;
  }
}
d([
  a({ type: String, reflect: !0 })
], n.prototype, "p");
d([
  a({ type: String, reflect: !0 })
], n.prototype, "px");
d([
  a({ type: String, reflect: !0 })
], n.prototype, "py");
d([
  a({ type: String, reflect: !0, attribute: "max-width" })
], n.prototype, "maxWidth");
d([
  a({ type: Boolean, reflect: !0 })
], n.prototype, "inline");
export {
  n as VdsBox
};
