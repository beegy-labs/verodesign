import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { setAriaProperty, setRole } from '../../utils/attribute-mirror.js';
import { VdsElement } from '../../base/vds-element.js';

type SettingsTone = 'indigo' | 'emerald' | 'amber' | 'rose' | 'zinc';
type DescriptionTone = 'default' | 'success' | 'warning' | 'destructive';

const DESCRIPTION_COLOR: Record<DescriptionTone, string> = {
  default: 'var(--vds-theme-text-dim)',
  success: 'var(--vds-theme-status-success)',
  warning: 'var(--vds-theme-status-warning)',
  destructive: 'var(--vds-theme-status-destructive)',
};

export class VdsSettingsRow extends VdsElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--vds-font-family-sans);
    }

    button {
      all: unset;
      box-sizing: border-box;
      inline-size: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--vds-spacing-3);
      padding: var(--vds-spacing-4);
      border-radius: var(--vds-radius-xl);
      background: var(--vds-exp-girok-redesign-surface-card);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      cursor: pointer;
    }

    button:focus-visible {
      outline: var(--vds-border-width-2) solid var(--vds-theme-border-focus);
      outline-offset: var(--vds-spacing-0_5);
    }

    .main {
      min-inline-size: 0;
      display: flex;
      align-items: center;
      gap: var(--vds-spacing-3);
      flex: 1;
    }

    .tile {
      inline-size: var(--vds-exp-girok-redesign-settings-row-icon-tile-size);
      block-size: var(--vds-exp-girok-redesign-settings-row-icon-tile-size);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--vds-radius-xl);
      background: var(--_tile-bg);
      color: var(--_tile-fg);
      flex: none;
    }

    .body {
      min-inline-size: 0;
      flex: 1;
    }

    .title {
      color: var(--vds-theme-text-primary);
      font-size: var(--vds-type-role-label-size);
      font-weight: var(--vds-font-weight-bold);
      line-height: var(--vds-font-lineheight-tight);
    }

    .description {
      margin-block-start: var(--vds-spacing-0_5);
      color: var(--_description-color);
      font-size: var(--vds-exp-girok-redesign-font-size-caption);
      font-weight: var(--vds-font-weight-medium);
    }

    .trailing {
      color: var(--vds-theme-text-dim);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
    }

    svg {
      inline-size: 1rem;
      block-size: 1rem;
    }
  `;

  @property({ type: String, reflect: true }) tone: SettingsTone = 'zinc';
  @property({ type: String, attribute: 'row-label' }) rowLabel = '';
  @property({ type: String }) description = '';
  @property({ type: String, attribute: 'description-tone' }) descriptionTone: DescriptionTone = 'default';
  @property({ type: Boolean, reflect: true }) chevron = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'button');
  }

  protected updated(): void {
    setAriaProperty(this, this.internals, 'ariaDisabled', this.disabled);
    const label = [this.rowLabel, this.description].filter(Boolean).join(' ');
    if (label) {
      setAriaProperty(this, this.internals, 'ariaLabel', label);
    }
  }

  private tileVars(): string {
    return [
      `--_tile-bg: var(--vds-exp-girok-redesign-settings-row-icon-tile-bg-${this.tone});`,
      `--_tile-fg: var(--vds-exp-girok-redesign-settings-row-icon-tile-fg-${this.tone});`,
      `--_description-color: ${DESCRIPTION_COLOR[this.descriptionTone]};`,
    ].join(' ');
  }

  private handleClick = (): void => {
    if (!this.disabled) this.emit('click');
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.emit('click');
    }
  };

  render() {
    return html`
      <button
        type="button"
        style=${this.tileVars()}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        @keydown=${this.handleKeydown}
      >
        <span class="main">
          <span class="tile"><slot name="leading"></slot></span>
          <span class="body">
            <span class="title">${this.rowLabel}</span>
            ${this.description ? html`<div class="description">${this.description}</div>` : nothing}
          </span>
        </span>
        <span class="trailing">
          <slot name="trailing">
            ${this.chevron ? html`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" /></svg>` : nothing}
          </slot>
        </span>
      </button>
    `;
  }
}
