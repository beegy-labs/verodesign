import { VdsMenu as e, VdsMenuItem as m } from "./vds-menu.js";
customElements.get("vds-menu") || customElements.define("vds-menu", e);
customElements.get("vds-menu-item") || customElements.define("vds-menu-item", m);
