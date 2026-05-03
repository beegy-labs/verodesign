import * as s from "react";
import { createComponent as t } from "@lit/react";
import { VdsToast as o, VdsToastGroup as a } from "@verobee/design-elements/components/toast";
import "@verobee/design-elements/define/toast";
const p = t({
  tagName: "vds-toast",
  elementClass: o,
  react: s,
  events: {
    onDismiss: "vds-dismiss"
  }
}), i = t({
  tagName: "vds-toast-group",
  elementClass: a,
  react: s
});
export {
  p as Toast,
  i as ToastGroup
};
