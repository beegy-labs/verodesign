import * as React from "react";
import { createComponent } from "@lit/react";
import { VdsTabs, VdsTab, VdsTabPanel } from "@verobee/design-elements/components/tabs";
import "@verobee/design-elements/define/tabs";
const Tabs = createComponent({
  tagName: "vds-tabs",
  elementClass: VdsTabs,
  react: React,
  events: {
    onChange: "vds-change"
  }
});
const Tab = createComponent({
  tagName: "vds-tab",
  elementClass: VdsTab,
  react: React
});
const TabPanel = createComponent({
  tagName: "vds-tab-panel",
  elementClass: VdsTabPanel,
  react: React
});
export {
  Tab,
  TabPanel,
  Tabs
};
//# sourceMappingURL=Tabs.js.map
