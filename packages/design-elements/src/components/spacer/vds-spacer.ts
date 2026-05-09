import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

type Size = '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';
type Axis = 'horizontal' | 'vertical';

/**
 * <vds-spacer> — empty space element. Either fixed `size` (token spacing) or
 * `grow` to fill remaining flex space.
 */
export class VdsSpacer extends VdsElement {
  static styles = css`
    :host { display: block; flex-shrink: 0; }
    :host([hidden]) { display: none; }

    :host([grow]) { flex-grow: 1; }

    :host([axis="vertical"][size="1"])  { height: var(--vds-spacing-1); }
    :host([axis="vertical"][size="2"])  { height: var(--vds-spacing-2); }
    :host([axis="vertical"][size="3"])  { height: var(--vds-spacing-3); }
    :host([axis="vertical"][size="4"])  { height: var(--vds-spacing-4); }
    :host([axis="vertical"][size="5"])  { height: var(--vds-spacing-5); }
    :host([axis="vertical"][size="6"])  { height: var(--vds-spacing-6); }
    :host([axis="vertical"][size="8"])  { height: var(--vds-spacing-8); }
    :host([axis="vertical"][size="10"]) { height: var(--vds-spacing-10); }
    :host([axis="vertical"][size="12"]) { height: var(--vds-spacing-12); }
    :host([axis="vertical"][size="16"]) { height: var(--vds-spacing-16); }

    :host([axis="horizontal"][size="1"])  { width: var(--vds-spacing-1); }
    :host([axis="horizontal"][size="2"])  { width: var(--vds-spacing-2); }
    :host([axis="horizontal"][size="3"])  { width: var(--vds-spacing-3); }
    :host([axis="horizontal"][size="4"])  { width: var(--vds-spacing-4); }
    :host([axis="horizontal"][size="5"])  { width: var(--vds-spacing-5); }
    :host([axis="horizontal"][size="6"])  { width: var(--vds-spacing-6); }
    :host([axis="horizontal"][size="8"])  { width: var(--vds-spacing-8); }
    :host([axis="horizontal"][size="10"]) { width: var(--vds-spacing-10); }
    :host([axis="horizontal"][size="12"]) { width: var(--vds-spacing-12); }
    :host([axis="horizontal"][size="16"]) { width: var(--vds-spacing-16); }
  `;

  @property({ type: String, reflect: true }) axis: Axis = 'vertical';
  @property({ type: String, reflect: true }) size?: Size;
  @property({ type: Boolean, reflect: true }) grow = false;

  render() { return html``; }
}
