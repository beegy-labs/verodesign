import * as React from "react";
import { createComponent } from "@lit/react";
import { VdsTextArea } from "@verobee/design-elements/components/text-area";
import "@verobee/design-elements/define/text-area";
const TextArea = createComponent({
  tagName: "vds-text-area",
  elementClass: VdsTextArea,
  react: React,
  events: {
    onInput: "vds-input",
    onChange: "vds-change"
  }
});
export {
  TextArea
};
//# sourceMappingURL=TextArea.js.map
