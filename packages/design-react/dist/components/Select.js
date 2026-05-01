import * as React from "react";
import { createComponent } from "@lit/react";
import { VdsSelect, VdsOption } from "@verobee/design-elements/components/select";
import "@verobee/design-elements/define/select";
const Select = createComponent({
  tagName: "vds-select",
  elementClass: VdsSelect,
  react: React,
  events: {
    onChange: "change"
  }
});
const Option = createComponent({
  tagName: "vds-option",
  elementClass: VdsOption,
  react: React
});
export {
  Option,
  Select
};
//# sourceMappingURL=Select.js.map
