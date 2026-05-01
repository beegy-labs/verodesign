import { VdsSelect } from "./vds-select.js";
import { VdsOption } from "./vds-option.js";
if (!customElements.get("vds-select")) {
  customElements.define("vds-select", VdsSelect);
}
if (!customElements.get("vds-option")) {
  customElements.define("vds-option", VdsOption);
}
//# sourceMappingURL=define.js.map
