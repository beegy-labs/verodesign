import { css, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';
import { setAriaProperty, setRole } from '../../utils/attribute-mirror.js';

type Emphasis = 'neutral' | 'success' | 'destructive' | 'brand';
type Size = 'sm' | 'md';

export class VdsBinaryPillToggle extends VdsElement {
  static formAssociated = true;

  static styles = css`
    :host {
      display: inline-flex;
      font-family: var(--vds-font-family-sans);
      color: var(--vds-theme-text-primary);
    }
    :host([hidden]) {
      display: none;
    }
    .group {
      display: inline-flex;
      align-items: stretch;
      gap: var(--vds-spacing-1);
      padding: var(--vds-spacing-1);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      border-radius: var(--vds-radius-full);
      background: var(--vds-theme-bg-card);
    }
    :host([disabled]) .group {
      background: var(--vds-theme-state-disabled);
    }
    :host([size="sm"]) .group {
      gap: var(--vds-spacing-0_5);
      padding: var(--vds-spacing-0_5);
    }
  `;

  @property({ type: String, reflect: true }) value = '';
  @property({ type: String, reflect: true }) emphasis: Emphasis = 'neutral';
  @property({ type: String, reflect: true }) size: Size = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string | null = null;

  private internals: ElementInternals;
  private optionsCache: VdsBinaryPillToggleOption[] = [];

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'radiogroup');
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeydown);
    queueMicrotask(() => this.refreshOptions());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeydown);
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('value') || changed.has('disabled') || changed.has('emphasis') || changed.has('size')) {
      this.syncOptions();
    }
    if (changed.has('value')) {
      this.internals.setFormValue(this.value || null);
    }
    if (changed.has('ariaLabel')) {
      setAriaProperty(this, this.internals, 'ariaLabel', this.ariaLabel);
    }
    if (changed.has('disabled')) {
      setAriaProperty(this, this.internals, 'ariaDisabled', this.disabled);
    }
  }

  private get options(): VdsBinaryPillToggleOption[] {
    return this.optionsCache;
  }

  private refreshOptions = (): void => {
    this.optionsCache = Array.from(this.querySelectorAll('vds-binary-pill-toggle-option')) as VdsBinaryPillToggleOption[];
    this.syncOptions();
  };

  private syncOptions(): void {
    const enabledOptions = this.options.filter((option) => !this.isOptionDisabled(option));
    const fallback = enabledOptions[0] ?? this.options[0];
    const active = this.options.find((option) => option.value === this.value && !this.isOptionDisabled(option)) ?? fallback;

    if (!active) return;
    if (this.value !== active.value) {
      this.value = active.value;
      return;
    }

    for (const option of this.options) {
      const checked = option === active;
      const disabled = this.isOptionDisabled(option);
      option.checked = checked;
      option.emphasis = this.emphasis;
      option.size = this.size;
      option.groupDisabled = this.disabled;
      option.tabIndex = checked && !disabled ? 0 : -1;
      option.setAttribute('aria-checked', String(checked));
      option.setAttribute('aria-disabled', String(disabled));
    }
  }

  private isOptionDisabled(option: VdsBinaryPillToggleOption): boolean {
    return this.disabled || option.disabled;
  }

  private commit(option: VdsBinaryPillToggleOption, focus = true): void {
    if (this.isOptionDisabled(option)) return;
    const changed = this.value !== option.value;
    this.value = option.value;
    if (focus) option.focus();
    if (changed) {
      this.emit('vds-change', { value: this.value });
      this.emit('input', undefined);
      this.emit('change', undefined);
    }
  }

  private move(direction: 1 | -1, focus = true): void {
    const enabled = this.options.filter((option) => !this.isOptionDisabled(option));
    if (enabled.length === 0) return;
    const current = enabled.findIndex((option) => option.value === this.value);
    const next = enabled[(current + direction + enabled.length) % enabled.length] ?? enabled[0];
    this.commit(next, focus);
  }

  private handleClick = (event: MouseEvent): void => {
    const option = (event.target as HTMLElement).closest('vds-binary-pill-toggle-option') as VdsBinaryPillToggleOption | null;
    if (!option) return;
    this.commit(option);
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    const option = (event.target as HTMLElement).closest('vds-binary-pill-toggle-option') as VdsBinaryPillToggleOption | null;
    if (!option) return;

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.move(-1);
      return;
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.move(1);
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      const first = this.options.find((candidate) => !this.isOptionDisabled(candidate));
      if (first) this.commit(first);
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      const enabled = this.options.filter((candidate) => !this.isOptionDisabled(candidate));
      const last = enabled[enabled.length - 1];
      if (last) this.commit(last);
      return;
    }
    if (event.key === ' ') {
      event.preventDefault();
      this.commit(option);
    }
  };

  render() {
    return html`<div class="group" role="presentation"><slot @slotchange=${this.refreshOptions}></slot></div>`;
  }
}

export class VdsBinaryPillToggleOption extends VdsElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-inline-size: 0;
      padding: var(--vds-spacing-2) var(--vds-spacing-4);
      border-radius: var(--vds-radius-full);
      color: var(--vds-theme-text-secondary);
      background: transparent;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
      font-size: var(--vds-type-role-label-size);
      font-weight: var(--vds-type-role-label-weight);
      line-height: var(--vds-type-role-label-lineheight);
      transition:
        background-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard),
        color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard),
        border-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard);
    }
    :host([data-size="sm"]) {
      padding: var(--vds-spacing-1_5) var(--vds-spacing-3);
    }
    :host([data-checked]) {
      background: var(--vds-theme-bg-selected);
      color: var(--vds-theme-text-primary);
    }
    :host([data-emphasis="success"][data-checked]) {
      background: var(--vds-theme-status-success);
      color: var(--vds-theme-status-success-foreground);
    }
    :host([data-emphasis="destructive"][data-checked]) {
      background: var(--vds-theme-destructive);
      color: var(--vds-theme-destructive-foreground);
    }
    :host([data-emphasis="brand"][data-checked]) {
      background: var(--vds-theme-state-selected);
      color: var(--vds-theme-text-primary);
    }
    :host([disabled]),
    :host([data-group-disabled]) {
      cursor: not-allowed;
      color: var(--vds-theme-text-dim);
    }
    :host(:focus-visible) {
      outline: var(--vds-border-width-2) solid var(--vds-theme-border-focus);
      outline-offset: var(--vds-spacing-0_5);
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) checked = false;
  @property({ type: String }) emphasis: Emphasis = 'neutral';
  @property({ type: String }) size: Size = 'md';
  @property({ type: Boolean, attribute: false }) groupDisabled = false;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'radio');
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) this.tabIndex = -1;
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('checked')) {
      this.toggleAttribute('data-checked', this.checked);
      setAriaProperty(this, this.internals, 'ariaChecked', this.checked);
    }
    if (changed.has('disabled') || changed.has('groupDisabled')) {
      const disabled = this.disabled || this.groupDisabled;
      this.toggleAttribute('data-group-disabled', this.groupDisabled);
      setAriaProperty(this, this.internals, 'ariaDisabled', disabled);
    }
    if (changed.has('emphasis')) {
      this.setAttribute('data-emphasis', this.emphasis);
    }
    if (changed.has('size')) {
      this.setAttribute('data-size', this.size);
    }
  }

  render() {
    return html`<slot></slot>${nothing}`;
  }
}
