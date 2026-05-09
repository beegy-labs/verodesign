import { VdsIconButton } from './vds-icon-button.js';

if (!customElements.get('vds-icon-button')) {
  customElements.define('vds-icon-button', VdsIconButton);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-icon-button': VdsIconButton;
  }
}
