import { VdsCluster } from './vds-cluster.js';

if (!customElements.get('vds-cluster')) {
  customElements.define('vds-cluster', VdsCluster);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-cluster': VdsCluster;
  }
}
