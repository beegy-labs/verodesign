import * as React from "react";
import { createComponent } from "@lit/react";
import { VdsMenu, VdsMenuItem } from "@verobee/design-elements/components/menu";
import "@verobee/design-elements/define/menu";
const Menu = createComponent({
  tagName: "vds-menu",
  elementClass: VdsMenu,
  react: React,
  events: {
    onSelect: "vds-select"
  }
});
const MenuItem = createComponent({
  tagName: "vds-menu-item",
  elementClass: VdsMenuItem,
  react: React
});
export {
  Menu,
  MenuItem
};
//# sourceMappingURL=Menu.js.map
