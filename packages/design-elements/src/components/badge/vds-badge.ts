import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

type Variant = 'solid' | 'soft' | 'outline';
type Tone = 'primary' | 'accent' | 'neutral' | 'destructive' | 'success' | 'warning' | 'info';
type Size = 'sm' | 'md';

/**
 * <vds-badge> — small inline status / count indicator.
 *
 * @slot - badge label
 * @slot start - leading icon
 * @slot end - trailing icon
 */
export class VdsBadge extends LitElement {
  static styles = css`
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

    :host([data-size="sm"]) .badge {
      padding: 2px var(--vds-spacing-2);
      font-size: var(--vds-font-size-xs);
      min-height: 1.125rem;
    }
    :host([data-size="md"]) .badge {
      padding: var(--vds-spacing-1) var(--vds-spacing-2_5);
      font-size: var(--vds-font-size-sm);
      min-height: 1.5rem;
    }

    :host([data-tone="primary"][data-variant="solid"]) .badge { background: var(--vds-theme-primary); color: var(--vds-theme-primary-fg); }
    :host([data-tone="primary"][data-variant="soft"]) .badge { background: color-mix(in oklab, var(--vds-theme-primary) 15%, transparent); color: var(--vds-theme-primary); }
    :host([data-tone="primary"][data-variant="outline"]) .badge { border-color: var(--vds-theme-primary); color: var(--vds-theme-primary); }

    :host([data-tone="accent"][data-variant="solid"]) .badge { background: var(--vds-theme-accent); color: var(--vds-theme-accent-fg); }
    :host([data-tone="accent"][data-variant="soft"]) .badge { background: color-mix(in oklab, var(--vds-theme-accent) 15%, transparent); color: var(--vds-theme-accent); }
    :host([data-tone="accent"][data-variant="outline"]) .badge { border-color: var(--vds-theme-accent); color: var(--vds-theme-accent); }

    :host([data-tone="neutral"][data-variant="solid"]) .badge { background: var(--vds-theme-neutral); color: var(--vds-theme-neutral-fg); }
    :host([data-tone="neutral"][data-variant="soft"]) .badge { background: var(--vds-theme-bg-muted); color: var(--vds-theme-text-primary); }
    :host([data-tone="neutral"][data-variant="outline"]) .badge { border-color: var(--vds-theme-border-default); color: var(--vds-theme-text-primary); }

    :host([data-tone="destructive"][data-variant="solid"]) .badge { background: var(--vds-theme-destructive); color: var(--vds-theme-destructive-fg); }
    :host([data-tone="destructive"][data-variant="soft"]) .badge { background: var(--vds-theme-error-bg); color: var(--vds-theme-destructive); }
    :host([data-tone="destructive"][data-variant="outline"]) .badge { border-color: var(--vds-theme-destructive); color: var(--vds-theme-destructive); }

    :host([data-tone="success"][data-variant="solid"]) .badge { background: var(--vds-theme-success); color: var(--vds-theme-success-fg); }
    :host([data-tone="success"][data-variant="soft"]) .badge { background: var(--vds-theme-success-bg); color: var(--vds-theme-success); }
    :host([data-tone="success"][data-variant="outline"]) .badge { border-color: var(--vds-theme-success); color: var(--vds-theme-success); }

    :host([data-tone="warning"][data-variant="solid"]) .badge { background: var(--vds-theme-warning); color: var(--vds-theme-warning-fg); }
    :host([data-tone="warning"][data-variant="soft"]) .badge { background: var(--vds-theme-warning-bg); color: var(--vds-theme-warning); }
    :host([data-tone="warning"][data-variant="outline"]) .badge { border-color: var(--vds-theme-warning); color: var(--vds-theme-warning); }

    :host([data-tone="info"][data-variant="solid"]) .badge { background: var(--vds-theme-info); color: var(--vds-theme-info-fg); }
    :host([data-tone="info"][data-variant="soft"]) .badge { background: var(--vds-theme-info-bg); color: var(--vds-theme-info); }
    :host([data-tone="info"][data-variant="outline"]) .badge { border-color: var(--vds-theme-info); color: var(--vds-theme-info); }
  `;

  @property({ type: String, reflect: true }) variant: Variant = 'soft';
  @property({ type: String, reflect: true }) tone: Tone = 'neutral';
  @property({ type: String, reflect: true }) size: Size = 'md';

  connectedCallback(): void {
    super.connectedCallback();
    this.dataset.variant = this.variant;
    this.dataset.tone = this.tone;
    this.dataset.size = this.size;
  }

  protected updated(): void {
    this.dataset.variant = this.variant;
    this.dataset.tone = this.tone;
    this.dataset.size = this.size;
  }

  render() {
    return html`
      <span class="badge" part="badge">
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </span>
    `;
  }
}
