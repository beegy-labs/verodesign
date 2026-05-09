import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

type Variant = 'default' | 'padded' | 'section' | 'inset' | 'divided';
type Radius = 'lg' | 'xl';

/**
 * <vds-surface> — bordered container primitive. Replaces inline
 * `rounded + border + bg-card` patterns. Variants:
 *
 *   - default:  border + radius, no padding (caller controls inner spacing)
 *   - padded:   default + spacing-5 padding
 *   - section:  default + spacing-5 padding + spacing-4 vertical gap between children
 *   - inset:    default + overflow-hidden (lists / tables flush with border radius)
 *   - divided:  default + horizontal divider between children
 */
export class VdsSurface extends VdsElement {
  static styles = css`
    :host {
      display: block;
      background: var(--vds-theme-bg-card);
      border-radius: var(--vds-radius-xl);
    }
    :host([hidden]) { display: none; }

    :host(:not([borderless])) {
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
    }

    :host([radius="lg"]) { border-radius: var(--vds-radius-lg); }

    :host([variant="padded"])  { padding: var(--vds-spacing-5); }
    :host([variant="section"]) {
      padding: var(--vds-spacing-5);
      display: flex;
      flex-direction: column;
      gap: var(--vds-spacing-4);
    }
    :host([variant="inset"])   { overflow: hidden; }
    :host([variant="divided"]) ::slotted(* + *) {
      border-top: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
    }
  `;

  @property({ type: String, reflect: true }) variant: Variant = 'default';
  @property({ type: String, reflect: true }) radius: Radius = 'xl';
  @property({ type: Boolean, reflect: true }) borderless = false;

  render() { return html`<slot></slot>`; }
}
