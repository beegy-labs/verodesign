import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as i } from "../../node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as a } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as c } from "../../base/vds-element.js";
import { css as l } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var g = Object.defineProperty, s = (t, n, d, h) => {
  for (var e = void 0, r = t.length - 1, v; r >= 0; r--)
    (v = t[r]) && (e = v(n, d, e) || e);
  return e && g(n, d, e), e;
};
class o extends c {
  constructor() {
    super(...arguments), this.variant = "soft", this.tone = "neutral", this.size = "md";
  }
  static {
    this.styles = l`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }
    :host([hidden]) { display: none; }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-1);
      font-family: var(--vds-font-family-sans);
      font-weight: var(--vds-type-role-label-weight);
      line-height: 1;
      white-space: nowrap;
      border-radius: var(--vds-radius-full);
      border: var(--vds-border-width-1) solid transparent;
    }

    :host([size="sm"]) .badge {
      padding: calc(var(--vds-spacing-0_5) / 2) var(--vds-spacing-2);
      font-size: var(--vds-type-role-caption-size);
      min-height: calc(var(--vds-spacing-4) + var(--vds-spacing-0_5));
    }
    :host([size="md"]) .badge {
      padding: var(--vds-spacing-1) var(--vds-spacing-2_5);
      font-size: var(--vds-type-role-label-size);
      min-height: calc(var(--vds-spacing-6));
    }

    :host([tone="primary"][variant="solid"]) .badge { background: var(--vds-theme-primary); color: var(--vds-theme-primary-foreground); }
    :host([tone="primary"][variant="soft"]) .badge { background: color-mix(in oklab, var(--vds-theme-primary) 15%, transparent); color: var(--vds-theme-primary); }
    :host([tone="primary"][variant="outline"]) .badge { border-color: var(--vds-theme-primary); color: var(--vds-theme-primary); }

    :host([tone="accent"][variant="solid"]) .badge { background: var(--vds-theme-accent); color: var(--vds-theme-accent-foreground); }
    :host([tone="accent"][variant="soft"]) .badge { background: color-mix(in oklab, var(--vds-theme-accent) 15%, transparent); color: var(--vds-theme-accent); }
    :host([tone="accent"][variant="outline"]) .badge { border-color: var(--vds-theme-accent); color: var(--vds-theme-accent); }

    :host([tone="neutral"][variant="solid"]) .badge { background: var(--vds-theme-status-neutral); color: var(--vds-theme-status-neutral-foreground); }
    :host([tone="neutral"][variant="soft"]) .badge { background: var(--vds-theme-bg-muted); color: var(--vds-theme-text-primary); }
    :host([tone="neutral"][variant="outline"]) .badge { border-color: var(--vds-theme-border-default); color: var(--vds-theme-text-primary); }

    :host([tone="destructive"][variant="solid"]) .badge { background: var(--vds-theme-destructive); color: var(--vds-theme-destructive-foreground); }
    :host([tone="destructive"][variant="soft"]) .badge { background: var(--vds-theme-error-bg); color: var(--vds-theme-destructive); }
    :host([tone="destructive"][variant="outline"]) .badge { border-color: var(--vds-theme-destructive); color: var(--vds-theme-destructive); }

    :host([tone="success"][variant="solid"]) .badge { background: var(--vds-theme-status-success); color: var(--vds-theme-status-success-foreground); }
    :host([tone="success"][variant="soft"]) .badge { background: var(--vds-theme-success-bg); color: var(--vds-theme-status-success); }
    :host([tone="success"][variant="outline"]) .badge { border-color: var(--vds-theme-status-success); color: var(--vds-theme-status-success); }

    :host([tone="warning"][variant="solid"]) .badge { background: var(--vds-theme-status-warning); color: var(--vds-theme-status-warning-foreground); }
    :host([tone="warning"][variant="soft"]) .badge { background: var(--vds-theme-warning-bg); color: var(--vds-theme-status-warning); }
    :host([tone="warning"][variant="outline"]) .badge { border-color: var(--vds-theme-status-warning); color: var(--vds-theme-status-warning); }

    :host([tone="info"][variant="solid"]) .badge { background: var(--vds-theme-status-info); color: var(--vds-theme-status-info-foreground); }
    :host([tone="info"][variant="soft"]) .badge { background: var(--vds-theme-info-bg); color: var(--vds-theme-status-info); }
    :host([tone="info"][variant="outline"]) .badge { border-color: var(--vds-theme-status-info); color: var(--vds-theme-status-info); }
  `;
  }
  render() {
    return i`
      <span class="badge" part="badge">
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </span>
    `;
  }
}
s([
  a({ type: String, reflect: !0 })
], o.prototype, "variant");
s([
  a({ type: String, reflect: !0 })
], o.prototype, "tone");
s([
  a({ type: String, reflect: !0 })
], o.prototype, "size");
export {
  o as VdsBadge
};
