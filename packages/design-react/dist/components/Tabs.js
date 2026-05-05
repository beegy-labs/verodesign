import * as a from "react";
import { createComponent as e } from "@lit/react";
import { VdsTab as t, VdsTabPanel as s, VdsTabs as n } from "@verobee/design-elements/components/tabs";
import "@verobee/design-elements/define/tabs";
const b = /* @__PURE__ */ e({
  tagName: "vds-tabs",
  elementClass: n,
  react: a,
  events: {
    onChange: "vds-change"
  }
}), c = /* @__PURE__ */ e({
  tagName: "vds-tab",
  elementClass: t,
  react: a
}), l = /* @__PURE__ */ e({
  tagName: "vds-tab-panel",
  elementClass: s,
  react: a
});
export {
  c as Tab,
  l as TabPanel,
  b as Tabs
};
