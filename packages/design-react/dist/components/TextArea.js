import * as e from "react";
import { createComponent as t } from "@lit/react";
import { VdsTextArea as a } from "@verobee/design-elements/components/text-area";
import "@verobee/design-elements/define/text-area";
const m = t({
  tagName: "vds-text-area",
  elementClass: a,
  react: e,
  events: {
    onInput: "vds-input",
    onChange: "vds-change"
  }
});
export {
  m as TextArea
};
