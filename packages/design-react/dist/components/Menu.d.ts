import * as React from 'react';
import { VdsMenu, VdsMenuItem } from '@verobee/design-elements/components/menu';
import '@verobee/design-elements/define/menu';
export declare const Menu: import("@lit/react").ReactWebComponent<VdsMenu, {
    onSelect: string;
}>;
export declare const MenuItem: import("@lit/react").ReactWebComponent<VdsMenuItem, {}>;
export type MenuProps = React.ComponentProps<typeof Menu>;
export type MenuItemProps = React.ComponentProps<typeof MenuItem>;
