import * as t from "react";
import { createComponent as e } from "@lit/react";
import { VdsSwitch as o } from "@verobee/design-elements/components/switch";
import "@verobee/design-elements/define/switch";
const c = e({
  tagName: "vds-switch",
  elementClass: o,
  react: t,
  events: {
    onChange: "change"
  }
});
export {
  c as Switch
};
