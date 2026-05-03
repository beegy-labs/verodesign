import * as e from "react";
import { createComponent as t } from "@lit/react";
import { VdsTextField as o } from "@verobee/design-elements/components/text-field";
import "@verobee/design-elements/define/text-field";
const a = t({
  tagName: "vds-text-field",
  elementClass: o,
  react: e,
  events: {
    onInput: "vds-input",
    onChange: "vds-change"
  }
});
export {
  a as TextField
};
