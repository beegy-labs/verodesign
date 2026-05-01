import * as React from "react";
import { createComponent } from "@lit/react";
import { VdsButton } from "@verobee/design-elements/components/button";
import "@verobee/design-elements/define/button";
const Button = createComponent({
  tagName: "vds-button",
  elementClass: VdsButton,
  react: React,
  events: {
    onClick: "click"
  }
});
export {
  Button
};
//# sourceMappingURL=Button.js.map
