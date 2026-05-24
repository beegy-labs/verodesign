import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

type Size = 'sm' | 'md' | 'lg';

/**
 * <vds-empty-state> — generic "no data" placeholder. Stack of icon + title +
 * description + action (all optional via slots).
 *
 * @slot icon - optional leading icon
 * @slot - default slot: title text (also accepts `heading` prop)
 * @slot description - optional description text
 * @slot action - optional action button
 */
export class VdsEmptyState extends VdsElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: var(--vds-spacing-2);
    }
    :host([hidden]) { display: none; }

    :host([size="sm"]) { padding-block: var(--vds-spacing-6); }
    :host([size="md"]) { padding-block: var(--vds-spacing-10); }
    :host([size="lg"]) { padding-block: var(--vds-spacing-16); }

    .icon {
      color: var(--vds-theme-text-faint);
    }
    :host([size="sm"]) .icon ::slotted(*) { width: var(--vds-spacing-6); height: var(--vds-spacing-6); }
    :host([size="md"]) .icon ::slotted(*) { width: var(--vds-spacing-8); height: var(--vds-spacing-8); }
    :host([size="lg"]) .icon ::slotted(*) { width: var(--vds-spacing-10); height: var(--vds-spacing-10); }

    .title {
      font-size: var(--vds-type-role-label-size);
      font-weight: var(--vds-type-role-label-weight);
      color: var(--vds-theme-text-primary);
      margin: 0;
    }
    .description {
      font-size: var(--vds-type-role-caption-size);
      color: var(--vds-theme-text-secondary);
      max-width: calc(var(--vds-spacing-64) + var(--vds-spacing-48));
      margin: 0;
    }
    .action { margin-top: var(--vds-spacing-3); }

    slot[name="description"]:not(:empty) ~ .description-fallback,
    slot:not([name]):not(:empty) ~ .title-fallback {
      display: none;
    }
  `;

  @property({ type: String, reflect: true }) size: Size = 'md';
  @property({ type: String }) heading?: string;
  @property({ type: String }) description?: string;

  render() {
    return html`
      <div class="icon"><slot name="icon"></slot></div>
      <p class="title"><slot>${this.heading ?? ''}</slot></p>
      <p class="description"><slot name="description">${this.description ?? ''}</slot></p>
      <div class="action"><slot name="action"></slot></div>
    `;
  }
}
