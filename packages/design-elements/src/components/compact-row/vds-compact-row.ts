import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

type RowAs = 'button' | 'link' | 'div';
type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

const TONE_ACCENT: Record<Tone, string> = {
  neutral: 'var(--vds-theme-border-default)',
  info: 'var(--vds-theme-status-info)',
  success: 'var(--vds-theme-status-success)',
  warning: 'var(--vds-theme-status-warning)',
  danger: 'var(--vds-theme-destructive)',
};

export class VdsCompactRow extends VdsElement {
  static styles = css`
    :host {
      display: block;
      color: var(--vds-theme-text-primary);
      font-family: var(--vds-font-family-sans);
    }
    :host([hidden]) {
      display: none;
    }
    .root {
      all: unset;
      box-sizing: border-box;
      inline-size: 100%;
      display: flex;
      align-items: center;
      gap: var(--vds-spacing-3);
      padding: var(--vds-spacing-3);
      border-radius: var(--vds-radius-lg);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      background: var(--vds-theme-bg-card);
      color: var(--vds-theme-text-primary);
      text-align: left;
      transition:
        border-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard),
        background-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard),
        color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard);
    }
    :host([selected]) .root {
      background: var(--vds-theme-bg-selected);
    }
    :host([interactive]) .root {
      cursor: pointer;
    }
    :host([interactive]) .root:hover {
      border-color: var(--vds-tone-accent, var(--vds-theme-border-default));
      background: var(--vds-theme-bg-elevated-hover);
    }
    :host([disabled]) .root {
      color: var(--vds-theme-text-dim);
      background: var(--vds-theme-state-disabled);
      cursor: not-allowed;
      pointer-events: none;
    }
    :host([interactive]) .root:focus-visible {
      outline: var(--vds-border-width-2) solid var(--vds-theme-border-focus);
      outline-offset: var(--vds-spacing-0_5);
    }
    .leading,
    .trailing {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }
    .content {
      min-inline-size: 0;
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: var(--vds-spacing-1);
    }
    .label,
    .meta {
      min-inline-size: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .label {
      font-size: var(--vds-type-role-title-size);
      font-weight: var(--vds-type-role-title-weight);
      line-height: var(--vds-type-role-title-lineheight);
    }
    .meta {
      color: var(--vds-theme-text-secondary);
      font-size: var(--vds-type-role-label-size);
      font-weight: var(--vds-type-role-label-weight);
      line-height: var(--vds-type-role-label-lineheight);
    }
    .trailing {
      gap: var(--vds-spacing-2);
    }
    .chevron {
      color: var(--vds-theme-text-secondary);
      font-size: var(--vds-type-role-body-size);
      line-height: var(--vds-type-role-body-lineheight);
    }
  `;

  @property({ type: String, reflect: true }) as: RowAs = 'button';
  @property({ type: String }) href: string | null = null;
  @property({ type: String, reflect: true }) tone: Tone = 'neutral';
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true, attribute: 'show-chevron' }) showChevron = false;

  protected updated(): void {
    this.style.setProperty('--vds-tone-accent', TONE_ACCENT[this.tone]);
    this.toggleAttribute('interactive', this.as !== 'div');
  }

  private renderTag() {
    if (this.as === 'link') {
      return html`
        <a
          class="root"
          aria-disabled=${this.disabled ? 'true' : nothing}
          aria-current=${this.selected ? 'true' : nothing}
          href=${this.disabled ? nothing : this.href ?? nothing}
        >
          ${this.renderContent()}
        </a>
      `;
    }
    if (this.as === 'div') {
      return html`<div class="root">${this.renderContent()}</div>`;
    }
    return html`
      <button
        class="root"
        type="button"
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-current=${this.selected ? 'true' : nothing}
      >
        ${this.renderContent()}
      </button>
    `;
  }

  private renderContent() {
    return html`
      <span class="leading"><slot name="leading"></slot></span>
      <span class="content">
        <span class="label"><slot></slot></span>
        <span class="meta"><slot name="meta"></slot></span>
      </span>
      <span class="trailing">
        <slot name="trailing"></slot>
        ${this.showChevron ? html`<span class="chevron" aria-hidden="true">›</span>` : nothing}
      </span>
    `;
  }

  render() {
    return this.renderTag();
  }
}
