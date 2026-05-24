import { VdsProgress } from './vds-progress.js';

if (!customElements.get('vds-progress')) {
  customElements.define('vds-progress', VdsProgress);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-progress': VdsProgress;
  }
}
