import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { setRole } from '../../utils/attribute-mirror.js';

/**
 * <vds-option> — option for <vds-select>. Slot project the label.
 */
export class VdsOption extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      padding: var(--vds-spacing-1_5) var(--vds-spacing-3);
      cursor: pointer;
      color: var(--vds-theme-text-primary);
      font-size: var(--vds-font-size-sm);
      user-select: none;
    }
    :host([disabled]) { opacity: 0.5; cursor: not-allowed; }
    :host([data-active]) { background: var(--vds-theme-bg-hover); }
    :host([selected]) { background: color-mix(in oklab, var(--vds-theme-primary) 12%, transparent); color: var(--vds-theme-primary); }
  `;

  @property({ type: String, reflect: true }) value = '';
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'option');
  }

  render() {
    return html`<slot></slot>`;
  }
}
