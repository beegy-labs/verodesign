import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

type Elevation = '0' | '1' | '2' | '3' | '4' | '5';
type Variant = 'surface' | 'outline' | 'ghost';

/**
 * <vds-card> — surface container with optional elevation and structured slots.
 *
 * @slot - main body content
 * @slot header - top header content
 * @slot footer - bottom footer content
 */
export class VdsCard extends VdsElement {
  static styles = css`
    :host {
      display: block;
      background: var(--vds-theme-bg-card);
      color: var(--vds-theme-text-primary);
      border-radius: var(--vds-radius-lg);
      overflow: hidden;
    }

    :host([variant="outline"]) {
      background: transparent;
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
    }
    :host([variant="ghost"]) {
      background: transparent;
    }

    :host([elevation="1"]) { box-shadow: var(--vds-shadow-1); }
    :host([elevation="2"]) { box-shadow: var(--vds-shadow-2); }
    :host([elevation="3"]) { box-shadow: var(--vds-shadow-3); }
    :host([elevation="4"]) { box-shadow: var(--vds-shadow-4); }
    :host([elevation="5"]) { box-shadow: var(--vds-shadow-5); }

    .header,
    .body,
    .footer {
      padding: var(--vds-spacing-4);
    }
    .header {
      border-bottom: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
    }
    .footer {
      border-top: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      background: var(--vds-theme-bg-page);
    }

    slot[name="header"]:not(:empty) ~ .body,
    .body:has(+ slot[name="footer"]:not(:empty)) {
      padding-block: var(--vds-spacing-4);
    }

    .header:empty,
    .footer:empty {
      display: none;
    }
  `;

  @property({ type: String, reflect: true }) variant: Variant = 'surface';
  @property({ type: String, reflect: true }) elevation: Elevation = '1';
  render() {
    return html`
      <div class="header"><slot name="header"></slot></div>
      <div class="body"><slot></slot></div>
      <div class="footer"><slot name="footer"></slot></div>
    `;
  }
}
