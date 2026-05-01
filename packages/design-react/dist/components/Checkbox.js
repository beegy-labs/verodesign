import * as React from "react";
import { createComponent } from "@lit/react";
import { VdsCheckbox } from "@verobee/design-elements/components/checkbox";
import "@verobee/design-elements/define/checkbox";
const Checkbox = createComponent({
  tagName: "vds-checkbox",
  elementClass: VdsCheckbox,
  react: React,
  events: {
    onChange: "change"
  }
});
export {
  Checkbox
};
//# sourceMappingURL=Checkbox.js.map
