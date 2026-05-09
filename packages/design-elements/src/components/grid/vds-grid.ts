import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

type Cols = '1' | '2' | '3' | '4' | '5' | '6' | '12';
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8';

/**
 * <vds-grid> — CSS grid layout primitive.
 *
 * @slot - children laid in `cols` columns with `gap`
 */
export class VdsGrid extends VdsElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    :host([hidden]) { display: none; }

    :host([cols="1"])  { grid-template-columns: repeat(1,  minmax(0, 1fr)); }
    :host([cols="2"])  { grid-template-columns: repeat(2,  minmax(0, 1fr)); }
    :host([cols="3"])  { grid-template-columns: repeat(3,  minmax(0, 1fr)); }
    :host([cols="4"])  { grid-template-columns: repeat(4,  minmax(0, 1fr)); }
    :host([cols="5"])  { grid-template-columns: repeat(5,  minmax(0, 1fr)); }
    :host([cols="6"])  { grid-template-columns: repeat(6,  minmax(0, 1fr)); }
    :host([cols="12"]) { grid-template-columns: repeat(12, minmax(0, 1fr)); }

    :host([gap="0"]) { gap: 0; }
    :host([gap="1"]) { gap: var(--vds-spacing-1); }
    :host([gap="2"]) { gap: var(--vds-spacing-2); }
    :host([gap="3"]) { gap: var(--vds-spacing-3); }
    :host([gap="4"]) { gap: var(--vds-spacing-4); }
    :host([gap="5"]) { gap: var(--vds-spacing-5); }
    :host([gap="6"]) { gap: var(--vds-spacing-6); }
    :host([gap="8"]) { gap: var(--vds-spacing-8); }
  `;

  @property({ type: String, reflect: true }) cols: Cols = '1';
  @property({ type: String, reflect: true }) gap: Gap = '0';

  render() {
    return html`<slot></slot>`;
  }
}
