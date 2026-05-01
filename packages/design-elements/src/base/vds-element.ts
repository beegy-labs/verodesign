import { LitElement, html, type PropertyValues } from 'lit';

export class VdsElement extends LitElement {
  static formAssociated = false;

  protected emit<T>(name: string, detail?: T, options: EventInit = {}): boolean {
    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      cancelable: true,
      ...options,
      detail,
    } as CustomEventInit<T>);
    return this.dispatchEvent(event);
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
  }

  protected renderSr(text: string) {
    return html`<span class="sr-only">${text}</span>`;
  }
}
