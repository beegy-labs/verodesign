import { VdsBinaryPillToggle, VdsBinaryPillToggleOption } from './vds-binary-pill-toggle.js';

if (!customElements.get('vds-binary-pill-toggle')) {
  customElements.define('vds-binary-pill-toggle', VdsBinaryPillToggle);
}

if (!customElements.get('vds-binary-pill-toggle-option')) {
  customElements.define('vds-binary-pill-toggle-option', VdsBinaryPillToggleOption);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-binary-pill-toggle': VdsBinaryPillToggle;
    'vds-binary-pill-toggle-option': VdsBinaryPillToggleOption;
  }
}
