import { html, css, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { setRole } from '../../utils/attribute-mirror.js';
import { VdsElement } from '../../base/vds-element.js';

type Placement = 'top' | 'right' | 'bottom' | 'left';

/**
 * <vds-tooltip> — non-interactive descriptive tooltip (WAI-ARIA AP 1.2 § Tooltip).
 *
 * Trigger: focus or hover on the slotted trigger element. Esc dismisses.
 * Renders a tip that is `role=tooltip` and is referenced by `aria-describedby`.
 *
 * @slot trigger - the element that triggers the tooltip
 * @slot - the tooltip content
 */
export class VdsTooltip extends VdsElement {
  static styles = css`
    :host {
      display: inline-flex;
      position: relative;
      vertical-align: middle;
    }

    .tip {
      position: absolute;
      z-index: var(--vds-zindex-tooltip, 600);
      padding: var(--vds-spacing-1_5) var(--vds-spacing-2_5);
      background: var(--vds-theme-bg-inverse);
      color: var(--vds-theme-text-inverse);
      font-family: var(--vds-font-family-sans);
      font-size: var(--vds-font-size-xs);
      border-radius: var(--vds-radius-sm);
      pointer-events: none;
      opacity: 0;
      transform: scale(0.95);
      transition: opacity var(--vds-duration-fast), transform var(--vds-duration-fast);
      white-space: nowrap;
      max-width: 240px;
      box-shadow: var(--vds-shadow-2);
    }
    .tip[data-open] {
      opacity: 1;
      transform: scale(1);
    }
    :host([placement="top"]) .tip { bottom: 100%; left: 50%; transform: translateX(-50%) scale(0.95); margin-bottom: 6px; }
    :host([placement="top"]) .tip[data-open] { transform: translateX(-50%) scale(1); }
    :host([placement="bottom"]) .tip { top: 100%; left: 50%; transform: translateX(-50%) scale(0.95); margin-top: 6px; }
    :host([placement="bottom"]) .tip[data-open] { transform: translateX(-50%) scale(1); }
    :host([placement="left"]) .tip { right: 100%; top: 50%; transform: translateY(-50%) scale(0.95); margin-right: 6px; }
    :host([placement="left"]) .tip[data-open] { transform: translateY(-50%) scale(1); }
    :host([placement="right"]) .tip { left: 100%; top: 50%; transform: translateY(-50%) scale(0.95); margin-left: 6px; }
    :host([placement="right"]) .tip[data-open] { transform: translateY(-50%) scale(1); }
  `;

  @property({ type: String, reflect: true }) placement: Placement = 'top';
  @property({ type: Number }) delay = 200;
  @property({ type: Boolean }) disabled = false;

  @state() private open = false;

  private internals: ElementInternals;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private triggerEl: HTMLElement | null = null;
  private tipId = this.createId('vds-tooltip');

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'presentation');
    this.addEventListener('mouseenter', this.show);
    this.addEventListener('mouseleave', this.hide);
    this.addEventListener('focusin', this.show);
    this.addEventListener('focusout', this.hide);
    this.addEventListener('keydown', this.handleKey);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.timer) clearTimeout(this.timer);
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('open') || changed.has('disabled')) {
      this.syncTrigger();
    }
  }

  private syncTrigger = (): void => {
    this.triggerEl = this.querySelector('[slot="trigger"]') as HTMLElement | null;
    if (this.triggerEl) {
      const existing = this.triggerEl.getAttribute('aria-describedby') ?? '';
      if (!existing.split(' ').includes(this.tipId)) {
        this.triggerEl.setAttribute('aria-describedby', `${existing} ${this.tipId}`.trim());
      }
    }
  };

  private show = (): void => {
    if (this.disabled) return;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => { this.open = true; }, this.delay);
  };

  private hide = (): void => {
    if (this.timer) clearTimeout(this.timer);
    this.open = false;
  };

  private handleKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') this.hide();
  };

  render() {
    return html`
      <slot name="trigger" @slotchange=${this.syncTrigger}></slot>
      <span class="tip" part="tip" id=${this.tipId} role="tooltip" ?data-open=${this.open}>
        <slot></slot>
      </span>
    `;
  }
}
