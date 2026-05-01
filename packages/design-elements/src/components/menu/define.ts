import { VdsMenu, VdsMenuItem } from './vds-menu.js';

if (!customElements.get('vds-menu')) customElements.define('vds-menu', VdsMenu);
if (!customElements.get('vds-menu-item')) customElements.define('vds-menu-item', VdsMenuItem);

declare global {
  interface HTMLElementTagNameMap {
    'vds-menu': VdsMenu;
    'vds-menu-item': VdsMenuItem;
  }
}
