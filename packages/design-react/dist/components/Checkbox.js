import * as e from "react";
import { createComponent as o } from "@lit/react";
import { VdsCheckbox as t } from "@verobee/design-elements/components/checkbox";
import "@verobee/design-elements/define/checkbox";
const c = o({
  tagName: "vds-checkbox",
  elementClass: t,
  react: e,
  events: {
    onChange: "change"
  }
});
export {
  c as Checkbox
};
