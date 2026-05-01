import * as React from "react";
import { createComponent } from "@lit/react";
import { VdsToast, VdsToastGroup } from "@verobee/design-elements/components/toast";
import "@verobee/design-elements/define/toast";
const Toast = createComponent({
  tagName: "vds-toast",
  elementClass: VdsToast,
  react: React,
  events: {
    onDismiss: "vds-dismiss"
  }
});
const ToastGroup = createComponent({
  tagName: "vds-toast-group",
  elementClass: VdsToastGroup,
  react: React
});
export {
  Toast,
  ToastGroup
};
//# sourceMappingURL=Toast.js.map
