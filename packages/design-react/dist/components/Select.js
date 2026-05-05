import * as e from "react";
import { createComponent as t } from "@lit/react";
import { VdsOption as o, VdsSelect as a } from "@verobee/design-elements/components/select";
import "@verobee/design-elements/define/select";
const r = /* @__PURE__ */ t({
  tagName: "vds-select",
  elementClass: a,
  react: e,
  events: {
    onChange: "change"
  }
}), c = /* @__PURE__ */ t({
  tagName: "vds-option",
  elementClass: o,
  react: e
});
export {
  c as Option,
  r as Select
};
