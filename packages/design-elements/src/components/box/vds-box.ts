import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

type Spacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';
type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/**
 * <vds-box> — generic spacing wrapper. Replaces inline `padding/margin/max-width`
 * className patterns with token-bound props.
 *
 * @slot - content
 */
export class VdsBox extends VdsElement {
  static styles = css`
    :host { display: block; }
    :host([hidden]) { display: none; }
    :host([inline]) { display: inline-block; }

    /* padding-x */
    :host([px="0"])  { padding-inline: 0; }
    :host([px="1"])  { padding-inline: var(--vds-spacing-1); }
    :host([px="2"])  { padding-inline: var(--vds-spacing-2); }
    :host([px="3"])  { padding-inline: var(--vds-spacing-3); }
    :host([px="4"])  { padding-inline: var(--vds-spacing-4); }
    :host([px="5"])  { padding-inline: var(--vds-spacing-5); }
    :host([px="6"])  { padding-inline: var(--vds-spacing-6); }
    :host([px="8"])  { padding-inline: var(--vds-spacing-8); }
    :host([px="10"]) { padding-inline: var(--vds-spacing-10); }
    :host([px="12"]) { padding-inline: var(--vds-spacing-12); }
    :host([px="16"]) { padding-inline: var(--vds-spacing-16); }

    /* padding-y */
    :host([py="0"])  { padding-block: 0; }
    :host([py="1"])  { padding-block: var(--vds-spacing-1); }
    :host([py="2"])  { padding-block: var(--vds-spacing-2); }
    :host([py="3"])  { padding-block: var(--vds-spacing-3); }
    :host([py="4"])  { padding-block: var(--vds-spacing-4); }
    :host([py="5"])  { padding-block: var(--vds-spacing-5); }
    :host([py="6"])  { padding-block: var(--vds-spacing-6); }
    :host([py="8"])  { padding-block: var(--vds-spacing-8); }
    :host([py="10"]) { padding-block: var(--vds-spacing-10); }
    :host([py="12"]) { padding-block: var(--vds-spacing-12); }
    :host([py="16"]) { padding-block: var(--vds-spacing-16); }

    /* padding (all sides) */
    :host([p="0"])  { padding: 0; }
    :host([p="1"])  { padding: var(--vds-spacing-1); }
    :host([p="2"])  { padding: var(--vds-spacing-2); }
    :host([p="3"])  { padding: var(--vds-spacing-3); }
    :host([p="4"])  { padding: var(--vds-spacing-4); }
    :host([p="5"])  { padding: var(--vds-spacing-5); }
    :host([p="6"])  { padding: var(--vds-spacing-6); }
    :host([p="8"])  { padding: var(--vds-spacing-8); }
    :host([p="10"]) { padding: var(--vds-spacing-10); }
    :host([p="12"]) { padding: var(--vds-spacing-12); }
    :host([p="16"]) { padding: var(--vds-spacing-16); }

    /* max-width */
    :host([max-width="sm"])   { max-width: 24rem;  margin-inline: auto; }
    :host([max-width="md"])   { max-width: 28rem;  margin-inline: auto; }
    :host([max-width="lg"])   { max-width: 32rem;  margin-inline: auto; }
    :host([max-width="xl"])   { max-width: 36rem;  margin-inline: auto; }
    :host([max-width="2xl"])  { max-width: 42rem;  margin-inline: auto; }
    :host([max-width="full"]) { max-width: 100%; }
  `;

  @property({ type: String, reflect: true }) p?: Spacing;
  @property({ type: String, reflect: true }) px?: Spacing;
  @property({ type: String, reflect: true }) py?: Spacing;
  @property({ type: String, reflect: true, attribute: 'max-width' }) maxWidth?: MaxWidth;
  @property({ type: Boolean, reflect: true }) inline = false;

  render() {
    return html`<slot></slot>`;
  }
}
