import { VdsHeading } from './vds-heading.js';

if (!customElements.get('vds-heading')) {
  customElements.define('vds-heading', VdsHeading);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-heading': VdsHeading;
  }
}
