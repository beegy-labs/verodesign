import { VdsCard } from './vds-card.js';

if (!customElements.get('vds-card')) {
  customElements.define('vds-card', VdsCard);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-card': VdsCard;
  }
}
