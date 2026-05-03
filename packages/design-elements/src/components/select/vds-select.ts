import { html, css, type PropertyValues } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { setAriaProperty, setRole } from '../../utils/attribute-mirror.js';
import { VdsOption } from './vds-option.js';
import { VdsElement } from '../../base/vds-element.js';

/**
 * <vds-select> — select-only combobox (WAI-ARIA AP 1.2 § Combobox, select-only).
 *
 * Children: <vds-option value="..."> elements. Form-associated.
 * Keyboard: Enter/Space toggles open. ArrowDown/Up to navigate. Esc closes. Type-ahead supported.
 *
 * @event change - { detail: { value: string } }
 */
export class VdsSelect extends VdsElement {
  static formAssociated = true;

  static styles = css`
    :host {
      display: inline-flex;
      position: relative;
      font-family: var(--vds-font-family-sans);
      width: 100%;
    }

    .trigger {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--vds-spacing-2);
      width: 100%;
      min-height: 2.5rem;
      padding: var(--vds-spacing-2) var(--vds-spacing-3);
      background: var(--vds-theme-bg-card);
      color: var(--vds-theme-text-primary);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      border-radius: var(--vds-radius-md);
      font-size: var(--vds-font-size-sm);
      cursor: pointer;
      user-select: none;
      transition: border-color var(--vds-duration-fast);
    }
    :host([disabled]) .trigger { opacity: 0.5; cursor: not-allowed; }
    :host(:focus-visible) .trigger,
    :host([data-open]) .trigger {
      outline: 2px solid var(--vds-theme-border-focus);
      outline-offset: 1px;
      border-color: var(--vds-theme-border-focus);
    }

    .placeholder { color: var(--vds-theme-text-faint); }
    .chevron { width: 16px; height: 16px; flex-shrink: 0; transition: transform var(--vds-duration-fast); }
    :host([data-open]) .chevron { transform: rotate(180deg); }

    .listbox {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: var(--vds-theme-bg-card);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      border-radius: var(--vds-radius-md);
      box-shadow: var(--vds-shadow-3);
      z-index: var(--vds-zindex-popover, 500);
      max-height: 240px;
      overflow-y: auto;
      padding: var(--vds-spacing-1) 0;
      display: none;
    }
    :host([data-open]) .listbox { display: block; }
  `;

  @property({ type: String, reflect: true }) value = '';
  @property({ type: String }) placeholder = 'Select…';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String }) name?: string;

  @property({ type: Boolean, reflect: true, attribute: 'data-open' }) private open = false;
  @state() private activeIndex = -1;
  @state() private displayLabel = '';

  @query('.trigger') private triggerEl!: HTMLElement;
  @query('.listbox') private listboxEl!: HTMLElement;

  private internals: ElementInternals;
  private typeBuffer = '';
  private typeBufferTimer: ReturnType<typeof setTimeout> | null = null;
  private _options: VdsOption[] = [];

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'combobox');
    this.addEventListener('keydown', this.handleKey);
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) this.tabIndex = this.disabled ? -1 : 0;
    queueMicrotask(() => this.refreshOptions());
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('value')) {
      const opt = this.findOptionByValue(this.value);
      this.displayLabel = opt?.textContent?.trim() ?? '';
      this.refreshSelected();
      this.internals.setFormValue(this.value || null);
    }
    setAriaProperty(this, this.internals, 'ariaExpanded', this.open);
    setAriaProperty(this, this.internals, 'ariaDisabled', this.disabled);
    setAriaProperty(this, this.internals, 'ariaRequired', this.required);
    setAriaProperty(this, this.internals, 'ariaHasPopup', 'listbox');
  }

  private get options(): VdsOption[] {
    return this._options;
  }

  private findOptionByValue(value: string): VdsOption | null {
    return this.options.find((o) => o.value === value) ?? null;
  }

  private refreshOptions(): void {
    this._options = Array.from(this.querySelectorAll('vds-option')) as VdsOption[];
    if (this.value) {
      const opt = this.findOptionByValue(this.value);
      if (opt) this.displayLabel = opt.textContent?.trim() ?? '';
    }
    this.refreshSelected();
  }

  private refreshSelected(): void {
    for (const o of this.options) {
      o.selected = o.value === this.value;
    }
  }

  private setActive(idx: number): void {
    const opts = this.options;
    for (const o of opts) o.removeAttribute('data-active');
    if (idx >= 0 && idx < opts.length) {
      opts[idx].setAttribute('data-active', '');
      opts[idx].scrollIntoView({ block: 'nearest' });
    }
    this.activeIndex = idx;
  }

  private toggle(): void {
    if (this.disabled) return;
    this.open = !this.open;
    if (this.open) {
      const opts = this.options;
      const selectedIdx = opts.findIndex((o) => o.value === this.value);
      this.setActive(selectedIdx >= 0 ? selectedIdx : 0);
    }
  }

  private commit(idx: number): void {
    const opts = this.options;
    const opt = opts[idx];
    if (!opt || opt.disabled) return;
    this.value = opt.value;
    this.displayLabel = opt.textContent?.trim() ?? '';
    this.open = false;
    this.emit('change', { value: this.value });
  }

  private handleKey = (event: KeyboardEvent): void => {
    if (this.disabled) return;
    const opts = this.options;

    if (!this.open) {
      if (event.key === ' ' || event.key === 'Enter' || event.key === 'ArrowDown') {
        event.preventDefault();
        this.toggle();
        return;
      }
    } else {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.open = false;
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.setActive(Math.min(opts.length - 1, this.activeIndex + 1));
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.setActive(Math.max(0, this.activeIndex - 1));
        return;
      }
      if (event.key === 'Home') {
        event.preventDefault();
        this.setActive(0);
        return;
      }
      if (event.key === 'End') {
        event.preventDefault();
        this.setActive(opts.length - 1);
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (this.activeIndex >= 0) this.commit(this.activeIndex);
        return;
      }
      if (event.key.length === 1) {
        this.typeBuffer += event.key.toLowerCase();
        if (this.typeBufferTimer) clearTimeout(this.typeBufferTimer);
        this.typeBufferTimer = setTimeout(() => { this.typeBuffer = ''; }, 500);
        const match = opts.findIndex((o) => (o.textContent ?? '').toLowerCase().startsWith(this.typeBuffer));
        if (match >= 0) this.setActive(match);
      }
    }
  };

  private handleTriggerClick = (): void => {
    this.toggle();
  };

  private handleListClick = (event: Event): void => {
    const target = (event.target as HTMLElement).closest('vds-option') as VdsOption | null;
    if (!target) return;
    const idx = this.options.indexOf(target);
    if (idx >= 0) this.commit(idx);
  };

  render() {
    return html`
      <div class="trigger" part="trigger" @click=${this.handleTriggerClick}>
        <span class=${this.displayLabel ? '' : 'placeholder'}>${this.displayLabel || this.placeholder}</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="listbox" part="listbox" role="listbox" @click=${this.handleListClick}>
        <slot @slotchange=${() => this.refreshOptions()}></slot>
      </div>
    `;
  }
}
