import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

type Direction = 'column' | 'row';
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8';
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

/**
 * <vds-stack> — flex layout primitive (replaces inline `display:flex` patterns).
 * Default: column direction, gap-0, align-stretch, justify-start.
 *
 * @slot - children flowed in `direction` with `gap`
 */
export class VdsStack extends VdsElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
    :host([hidden]) { display: none; }

    :host([direction="row"])    { flex-direction: row; }
    :host([direction="column"]) { flex-direction: column; }
    :host([wrap])               { flex-wrap: wrap; }

    :host([gap="0"]) { gap: 0; }
    :host([gap="1"]) { gap: var(--vds-spacing-1); }
    :host([gap="2"]) { gap: var(--vds-spacing-2); }
    :host([gap="3"]) { gap: var(--vds-spacing-3); }
    :host([gap="4"]) { gap: var(--vds-spacing-4); }
    :host([gap="5"]) { gap: var(--vds-spacing-5); }
    :host([gap="6"]) { gap: var(--vds-spacing-6); }
    :host([gap="8"]) { gap: var(--vds-spacing-8); }

    :host([align="start"])    { align-items: flex-start; }
    :host([align="center"])   { align-items: center; }
    :host([align="end"])      { align-items: flex-end; }
    :host([align="stretch"])  { align-items: stretch; }
    :host([align="baseline"]) { align-items: baseline; }

    :host([justify="start"])   { justify-content: flex-start; }
    :host([justify="center"])  { justify-content: center; }
    :host([justify="end"])     { justify-content: flex-end; }
    :host([justify="between"]) { justify-content: space-between; }
    :host([justify="around"])  { justify-content: space-around; }
    :host([justify="evenly"])  { justify-content: space-evenly; }
  `;

  @property({ type: String, reflect: true }) direction: Direction = 'column';
  @property({ type: String, reflect: true }) gap: Gap = '0';
  @property({ type: String, reflect: true }) align?: Align;
  @property({ type: String, reflect: true }) justify?: Justify;
  @property({ type: Boolean, reflect: true }) wrap = false;

  render() {
    return html`<slot></slot>`;
  }
}
