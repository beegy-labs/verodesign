import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

type Align = 'left' | 'center' | 'right';

/**
 * <vds-th> — table header cell. Wraps a real <th> with token-based padding,
 * font-weight, alignment, and optional dim/compact styling.
 *
 * Use inside a <thead><tr>... — Lit renders into Light DOM via host display:contents
 * so this cell still participates in table layout.
 *
 * @csspart cell - underlying <th>
 */
export class VdsTh extends VdsElement {
  // Use Light DOM (no shadow) so the <th> is a real table cell child of the parent <tr>.
  protected createRenderRoot() { return this; }

  static styles = css``;

  @property({ type: String, reflect: true }) align: Align = 'left';
  @property({ type: Boolean, reflect: true }) compact = false;
  @property({ type: Boolean, reflect: true }) dim = false;
  @property({ type: Number, reflect: true }) colspan?: number;

  render() {
    const cls = ['vds-th-cell'];
    if (this.align) cls.push(`vds-th-cell--${this.align}`);
    if (this.compact) cls.push('vds-th-cell--compact');
    if (this.dim) cls.push('vds-th-cell--dim');
    return html`<th class="${cls.join(' ')}" part="cell" colspan=${this.colspan ?? 1}><slot></slot></th>`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Inject one-time global CSS so <th> children render correctly in light DOM.
    if (!document.head.querySelector('style[data-vds-th]')) {
      const style = document.createElement('style');
      style.setAttribute('data-vds-th', '');
      style.textContent = `
        .vds-th-cell {
          padding-block: var(--vds-spacing-3);
          padding-inline: var(--vds-spacing-4);
          font-weight: var(--vds-font-weight-500);
          color: var(--vds-theme-text-primary);
        }
        .vds-th-cell--left   { text-align: left; }
        .vds-th-cell--center { text-align: center; }
        .vds-th-cell--right  { text-align: right; }
        .vds-th-cell--compact { padding-block: var(--vds-spacing-2); }
        .vds-th-cell--dim { color: var(--vds-theme-text-secondary); }
      `;
      document.head.appendChild(style);
    }
  }
}
