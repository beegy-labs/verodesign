import { VdsStack } from './vds-stack.js';

if (!customElements.get('vds-stack')) {
  customElements.define('vds-stack', VdsStack);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-stack': VdsStack;
  }
}
