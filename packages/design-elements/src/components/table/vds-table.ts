import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

type Density = 'compact' | 'normal' | 'comfortable';

/**
 * <vds-table> — semantic table wrapper. Renders inside a `<table>` and applies
 * theme-token styling. Use standard `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
 * inside.
 *
 * @slot caption - <caption>
 * @slot - table contents (thead/tbody/tfoot)
 */
export class VdsTable extends LitElement {
  static styles = css`
    :host { display: block; width: 100%; overflow-x: auto; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--vds-font-family-sans);
      font-size: var(--vds-font-size-sm);
      color: var(--vds-theme-text-primary);
      background: var(--vds-theme-bg-card);
    }
    ::slotted(thead),
    .head ::slotted(*) { background: var(--vds-theme-bg-elevated); }

    /* style projected table rows via ::part / standard cascade */
    :host([data-density="compact"]) table { font-size: var(--vds-font-size-xs); }
    :host([data-density="comfortable"]) table { font-size: var(--vds-font-size-base); }
  `;

  @property({ type: String, reflect: true }) density: Density = 'normal';

  connectedCallback(): void {
    super.connectedCallback();
    this.dataset.density = this.density;
  }
  protected updated(): void {
    this.dataset.density = this.density;
  }

  render() {
    return html`
      <table part="table">
        <slot name="caption"></slot>
        <slot></slot>
      </table>
    `;
  }
}
