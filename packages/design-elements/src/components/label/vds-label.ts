import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

type Size = 'sm' | 'md' | 'lg';

/**
 * <vds-label> — accessible form-field label.
 *
 * Mirrors HTML `<label for="">` semantics. When `for=` matches a sibling form
 * control, clicks on the label focus that control (browser default).
 *
 * @slot - label text
 */
export class VdsLabel extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-1);
      font-family: var(--vds-font-family-sans);
      font-weight: var(--vds-font-weight-500);
      color: var(--vds-theme-text-primary);
      cursor: pointer;
      user-select: none;
    }
    :host([data-size="sm"]) { font-size: var(--vds-font-size-sm); }
    :host([data-size="md"]) { font-size: var(--vds-font-size-base); }
    :host([data-size="lg"]) { font-size: var(--vds-font-size-lg); }

    .required {
      color: var(--vds-theme-destructive);
      margin-left: 2px;
    }
  `;

  @property({ type: String, reflect: true }) for?: string;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String, reflect: true }) size: Size = 'md';

  connectedCallback(): void {
    super.connectedCallback();
    this.dataset.size = this.size;
    this.addEventListener('click', this.handleClick);
  }

  protected updated(): void {
    this.dataset.size = this.size;
  }

  private handleClick = (event: Event): void => {
    if (!this.for) return;
    if (event.defaultPrevented) return;
    const target = (this.getRootNode() as Document | ShadowRoot).getElementById(this.for);
    if (target && typeof (target as HTMLElement).focus === 'function') {
      (target as HTMLElement).focus();
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const input = target as HTMLInputElement;
        if (input.type === 'checkbox' || input.type === 'radio') input.click();
      }
    }
  };

  render() {
    return html`
      <slot></slot>
      ${this.required ? html`<span class="required" aria-hidden="true">*</span>` : null}
    `;
  }
}
