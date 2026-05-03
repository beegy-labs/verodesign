import * as a from "react";
import { createComponent as e } from "@lit/react";
import { VdsTabs as t, VdsTab as s, VdsTabPanel as n } from "@verobee/design-elements/components/tabs";
import "@verobee/design-elements/define/tabs";
const b = e({
  tagName: "vds-tabs",
  elementClass: t,
  react: a,
  events: {
    onChange: "vds-change"
  }
}), c = e({
  tagName: "vds-tab",
  elementClass: s,
  react: a
}), l = e({
  tagName: "vds-tab-panel",
  elementClass: n,
  react: a
});
export {
  c as Tab,
  l as TabPanel,
  b as Tabs
};
