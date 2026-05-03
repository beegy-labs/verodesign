import { VdsToast as t, VdsToastGroup as s } from "./vds-toast.js";
customElements.get("vds-toast") || customElements.define("vds-toast", t);
customElements.get("vds-toast-group") || customElements.define("vds-toast-group", s);
