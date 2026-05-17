import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

/**
 * <vds-page-header> — page-level title row.
 * Renders leading slot + title (h1) + optional subtitle, with right-aligned
 * `actions` slot.
 *
 * @slot leading - optional leading content (back button, brand, etc.)
 * @slot actions - right-aligned action elements (buttons, etc.)
 */
export class VdsPageHeader extends VdsElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--vds-spacing-4);
    }
    :host([hidden]) { display: none; }

    slot[name="leading"] {
      flex-shrink: 0;
    }
    slot[name="leading"]:empty {
      display: none;
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: var(--vds-spacing-1);
      flex: 1;
      min-width: 0;
    }
    .title {
      margin: 0;
      font-size: var(--vds-type-role-title-size);
      font-weight: var(--vds-type-role-title-weight);
      line-height: var(--vds-type-role-title-lineheight);
      color: var(--vds-theme-text-bright);
    }
    .subtitle {
      margin: 0;
      font-size: var(--vds-type-role-label-size);
      color: var(--vds-theme-text-secondary);
    }
    .subtitle:empty { display: none; }
    .actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--vds-spacing-2);
      flex-shrink: 0;
    }
    slot[name="actions"]:not(:empty) ~ .actions { display: none; }
  `;

  @property({ type: String }) heading?: string;
  @property({ type: String }) subtitle?: string;

  render() {
    return html`
      <slot name="leading"></slot>
      <div class="body">
        <h1 class="title">${this.heading ?? ''}</h1>
        <p class="subtitle">${this.subtitle ?? ''}</p>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    `;
  }
}
