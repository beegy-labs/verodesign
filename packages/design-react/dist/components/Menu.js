import * as e from "react";
import { createComponent as t } from "@lit/react";
import { VdsMenu as m, VdsMenuItem as n } from "@verobee/design-elements/components/menu";
import "@verobee/design-elements/define/menu";
const r = t({
  tagName: "vds-menu",
  elementClass: m,
  react: e,
  events: {
    onSelect: "vds-select"
  }
}), c = t({
  tagName: "vds-menu-item",
  elementClass: n,
  react: e
});
export {
  r as Menu,
  c as MenuItem
};
