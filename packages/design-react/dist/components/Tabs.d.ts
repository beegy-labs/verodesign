import * as React from 'react';
import { VdsTabs, VdsTab, VdsTabPanel } from '@verobee/design-elements/components/tabs';
import '@verobee/design-elements/define/tabs';
export declare const Tabs: import("@lit/react").ReactWebComponent<VdsTabs, {
    onChange: string;
}>;
export declare const Tab: import("@lit/react").ReactWebComponent<VdsTab, {}>;
export declare const TabPanel: import("@lit/react").ReactWebComponent<VdsTabPanel, {}>;
export type TabsProps = React.ComponentProps<typeof Tabs>;
export type TabProps = React.ComponentProps<typeof Tab>;
export type TabPanelProps = React.ComponentProps<typeof TabPanel>;
