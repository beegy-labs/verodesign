import * as e from "react";
import { createComponent as t } from "@lit/react";
import { VdsSelect as o, VdsOption as a } from "@verobee/design-elements/components/select";
import "@verobee/design-elements/define/select";
const r = t({
  tagName: "vds-select",
  elementClass: o,
  react: e,
  events: {
    onChange: "change"
  }
}), c = t({
  tagName: "vds-option",
  elementClass: a,
  react: e
});
export {
  c as Option,
  r as Select
};
