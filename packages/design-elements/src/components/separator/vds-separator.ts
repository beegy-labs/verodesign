import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { setRole } from '../../utils/attribute-mirror.js';

type Orientation = 'horizontal' | 'vertical';

/**
 * <vds-separator> — visual divider between sections.
 *
 * WAI-ARIA: when `decorative=true`, role=presentation (no semantic). When false, role=separator.
 */
export class VdsSeparator extends LitElement {
  static styles = css`
    :host {
      display: block;
      flex-shrink: 0;
      background: var(--vds-theme-border-subtle);
    }
    :host([orientation="horizontal"]) {
      width: 100%;
      height: 1px;
    }
    :host([orientation="vertical"]) {
      height: auto;
      align-self: stretch;
      width: 1px;
    }
  `;

  @property({ type: String, reflect: true }) orientation: Orientation = 'horizontal';
  @property({ type: Boolean, reflect: true }) decorative = true;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  connectedCallback(): void {
    super.connectedCallback();
    setRole(this, this.internals, this.decorative ? 'presentation' : 'separator');
    if (!this.decorative) {
      this.setAttribute('aria-orientation', this.orientation);
    }
  }

  protected updated(): void {
    setRole(this, this.internals, this.decorative ? 'presentation' : 'separator');
    if (!this.decorative) {
      this.setAttribute('aria-orientation', this.orientation);
    } else {
      this.removeAttribute('aria-orientation');
    }
  }

  render() {
    return html``;
  }
}
