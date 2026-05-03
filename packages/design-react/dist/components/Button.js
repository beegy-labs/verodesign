import * as t from "react";
import { createComponent as o } from "@lit/react";
import { VdsButton as e } from "@verobee/design-elements/components/button";
import "@verobee/design-elements/define/button";
const a = o({
  tagName: "vds-button",
  elementClass: e,
  react: t,
  events: {
    onClick: "click"
  }
});
export {
  a as Button
};
