import * as o from "react";
import { createComponent as e } from "@lit/react";
import { VdsDialog as t } from "@verobee/design-elements/components/dialog";
import "@verobee/design-elements/define/dialog";
const r = e({
  tagName: "vds-dialog",
  elementClass: t,
  react: o,
  events: {
    onOpen: "vds-open",
    onClose: "vds-close"
  }
});
export {
  r as Dialog
};
