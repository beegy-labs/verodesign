import { css as i, html as c } from "lit";
import { property as a } from "lit/decorators.js";
import { VdsElement as l } from "../../base/vds-element.js";
var h = Object.defineProperty, o = (r, n, d, g) => {
  for (var e = void 0, t = r.length - 1, v; t >= 0; t--)
    (v = r[t]) && (e = v(n, d, e) || e);
  return e && h(n, d, e), e;
};
class s extends l {
  constructor() {
    super(...arguments), this.variant = "soft", this.tone = "neutral", this.size = "md";
  }
  static {
    this.styles = i`
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
      font-weight: var(--vds-font-weight-500);
      line-height: 1;
      white-space: nowrap;
      border-radius: var(--vds-radius-full);
      border: var(--vds-border-width-1) solid transparent;
    }

    :host([size="sm"]) .badge {
      padding: 2px var(--vds-spacing-2);
      font-size: var(--vds-font-size-xs);
      min-height: 1.125rem;
    }
    :host([size="md"]) .badge {
      padding: var(--vds-spacing-1) var(--vds-spacing-2_5);
      font-size: var(--vds-font-size-sm);
      min-height: 1.5rem;
    }

    :host([tone="primary"][variant="solid"]) .badge { background: var(--vds-theme-primary); color: var(--vds-theme-primary-fg); }
    :host([tone="primary"][variant="soft"]) .badge { background: color-mix(in oklab, var(--vds-theme-primary) 15%, transparent); color: var(--vds-theme-primary); }
    :host([tone="primary"][variant="outline"]) .badge { border-color: var(--vds-theme-primary); color: var(--vds-theme-primary); }

    :host([tone="accent"][variant="solid"]) .badge { background: var(--vds-theme-accent); color: var(--vds-theme-accent-fg); }
    :host([tone="accent"][variant="soft"]) .badge { background: color-mix(in oklab, var(--vds-theme-accent) 15%, transparent); color: var(--vds-theme-accent); }
    :host([tone="accent"][variant="outline"]) .badge { border-color: var(--vds-theme-accent); color: var(--vds-theme-accent); }

    :host([tone="neutral"][variant="solid"]) .badge { background: var(--vds-theme-neutral); color: var(--vds-theme-neutral-fg); }
    :host([tone="neutral"][variant="soft"]) .badge { background: var(--vds-theme-bg-muted); color: var(--vds-theme-text-primary); }
    :host([tone="neutral"][variant="outline"]) .badge { border-color: var(--vds-theme-border-default); color: var(--vds-theme-text-primary); }

    :host([tone="destructive"][variant="solid"]) .badge { background: var(--vds-theme-destructive); color: var(--vds-theme-destructive-fg); }
    :host([tone="destructive"][variant="soft"]) .badge { background: var(--vds-theme-error-bg); color: var(--vds-theme-destructive); }
    :host([tone="destructive"][variant="outline"]) .badge { border-color: var(--vds-theme-destructive); color: var(--vds-theme-destructive); }

    :host([tone="success"][variant="solid"]) .badge { background: var(--vds-theme-success); color: var(--vds-theme-success-fg); }
    :host([tone="success"][variant="soft"]) .badge { background: var(--vds-theme-success-bg); color: var(--vds-theme-success); }
    :host([tone="success"][variant="outline"]) .badge { border-color: var(--vds-theme-success); color: var(--vds-theme-success); }

    :host([tone="warning"][variant="solid"]) .badge { background: var(--vds-theme-warning); color: var(--vds-theme-warning-fg); }
    :host([tone="warning"][variant="soft"]) .badge { background: var(--vds-theme-warning-bg); color: var(--vds-theme-warning); }
    :host([tone="warning"][variant="outline"]) .badge { border-color: var(--vds-theme-warning); color: var(--vds-theme-warning); }

    :host([tone="info"][variant="solid"]) .badge { background: var(--vds-theme-info); color: var(--vds-theme-info-fg); }
    :host([tone="info"][variant="soft"]) .badge { background: var(--vds-theme-info-bg); color: var(--vds-theme-info); }
    :host([tone="info"][variant="outline"]) .badge { border-color: var(--vds-theme-info); color: var(--vds-theme-info); }
  `;
  }
  render() {
    return c`
      <span class="badge" part="badge">
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </span>
    `;
  }
}
o([
  a({ type: String, reflect: !0 })
], s.prototype, "variant");
o([
  a({ type: String, reflect: !0 })
], s.prototype, "tone");
o([
  a({ type: String, reflect: !0 })
], s.prototype, "size");
export {
  s as VdsBadge
};
