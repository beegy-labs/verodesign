import { LitElement, html, css, type PropertyValues } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { setAriaProperty, setRole } from '../../utils/attribute-mirror.js';

/**
 * <vds-tabs> — WAI-ARIA AP 1.2 Tabs pattern.
 *
 * Children: <vds-tab value="x"> and <vds-tab-panel value="x">.
 * Arrow keys navigate. Auto-activation by default; manual via `activation="manual"`.
 *
 * @event vds-change - dispatched on active tab change with detail { value }
 */
export class VdsTabs extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--vds-font-family-sans);
      color: var(--vds-theme-text-primary);
    }
    .tablist {
      display: flex;
      gap: var(--vds-spacing-1);
      border-bottom: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      overflow-x: auto;
      scrollbar-width: thin;
    }
    :host([data-orientation="vertical"]) {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: var(--vds-spacing-4);
    }
    :host([data-orientation="vertical"]) .tablist {
      flex-direction: column;
      border-bottom: none;
      border-right: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      overflow-x: visible;
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: String, reflect: true, attribute: 'data-orientation' }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: String }) activation: 'auto' | 'manual' = 'auto';

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'presentation');
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeydown);
    this.addEventListener('click', this.handleClick);
    queueMicrotask(() => this.syncActive());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeydown);
    this.removeEventListener('click', this.handleClick);
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('value') || changed.has('orientation')) {
      this.syncActive();
    }
    if (changed.has('orientation')) {
      setAriaProperty(this, this.internals, 'ariaOrientation', this.orientation);
    }
  }

  private get tabs(): VdsTab[] {
    return Array.from(this.querySelectorAll('vds-tab')) as VdsTab[];
  }
  private get panels(): VdsTabPanel[] {
    return Array.from(this.querySelectorAll('vds-tab-panel')) as VdsTabPanel[];
  }

  private syncActive(): void {
    const tabs = this.tabs;
    if (tabs.length === 0) return;

    let active = tabs.find((t) => t.value === this.value);
    if (!active) {
      active = tabs[0];
      this.value = active.value;
    }
    for (const tab of tabs) {
      const isActive = tab === active;
      tab.toggleAttribute('data-active', isActive);
      tab.tabIndex = isActive ? 0 : -1;
      tab.setAttribute('aria-selected', String(isActive));
    }
    for (const panel of this.panels) {
      const isActive = panel.value === this.value;
      panel.toggleAttribute('hidden', !isActive);
      panel.setAttribute('aria-hidden', String(!isActive));
    }
  }

  private setActive(tab: VdsTab): void {
    if (!tab || tab.disabled) return;
    if (this.value === tab.value) {
      tab.focus();
      return;
    }
    this.value = tab.value;
    tab.focus();
    this.dispatchEvent(new CustomEvent('vds-change', { bubbles: true, composed: true, detail: { value: this.value } }));
  }

  private handleClick = (e: MouseEvent): void => {
    const target = (e.target as HTMLElement).closest('vds-tab') as VdsTab | null;
    if (target) this.setActive(target);
  };

  private handleKeydown = (e: KeyboardEvent): void => {
    const target = (e.target as HTMLElement).closest('vds-tab') as VdsTab | null;
    if (!target) return;

    const tabs = this.tabs.filter((t) => !t.disabled);
    const idx = tabs.indexOf(target);
    if (idx < 0) return;

    let next: VdsTab | undefined;
    const isHorizontal = this.orientation === 'horizontal';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

    if (e.key === prevKey) next = tabs[(idx - 1 + tabs.length) % tabs.length];
    else if (e.key === nextKey) next = tabs[(idx + 1) % tabs.length];
    else if (e.key === 'Home') next = tabs[0];
    else if (e.key === 'End') next = tabs[tabs.length - 1];
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.setActive(target);
      return;
    }

    if (next) {
      e.preventDefault();
      if (this.activation === 'auto') this.setActive(next);
      else next.focus();
    }
  };

  render() {
    return html`
      <div class="tablist" role="tablist" aria-orientation=${this.orientation}>
        <slot name="tab"></slot>
      </div>
      <div class="panels">
        <slot></slot>
      </div>
    `;
  }
}

export class VdsTab extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-1_5);
      padding: var(--vds-spacing-2) var(--vds-spacing-4);
      cursor: pointer;
      user-select: none;
      color: var(--vds-theme-text-dim);
      border-bottom: 2px solid transparent;
      font-size: var(--vds-font-size-sm);
      font-weight: var(--vds-font-weight-500);
      transition: color var(--vds-duration-fast) var(--vds-easing-ease-out),
                  border-color var(--vds-duration-fast) var(--vds-easing-ease-out);
    }
    :host(:hover) { color: var(--vds-theme-text-primary); }
    :host([data-active]) {
      color: var(--vds-theme-primary);
      border-bottom-color: var(--vds-theme-primary);
    }
    :host([disabled]) { opacity: 0.5; cursor: not-allowed; }
    :host(:focus-visible) {
      outline: 2px solid var(--vds-theme-border-focus);
      outline-offset: 2px;
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'tab');
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.slot = 'tab';
    if (!this.hasAttribute('tabindex')) this.tabIndex = -1;
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('disabled')) {
      setAriaProperty(this, this.internals, 'ariaDisabled', this.disabled);
    }
  }

  render() { return html`<slot></slot>`; }
}

export class VdsTabPanel extends LitElement {
  static styles = css`
    :host { display: block; padding: var(--vds-spacing-4) 0; }
    :host([hidden]) { display: none; }
  `;

  @property({ type: String }) value = '';

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'tabpanel');
    this.tabIndex = 0;
  }

  render() { return html`<slot></slot>`; }
}
