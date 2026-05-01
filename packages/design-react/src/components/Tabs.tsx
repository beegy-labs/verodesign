import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsTabs, VdsTab, VdsTabPanel } from '@verobee/design-elements/components/tabs';
import '@verobee/design-elements/define/tabs';

export const Tabs = createComponent({
  tagName: 'vds-tabs',
  elementClass: VdsTabs,
  react: React,
  events: {
    onChange: 'vds-change',
  },
});

export const Tab = createComponent({
  tagName: 'vds-tab',
  elementClass: VdsTab,
  react: React,
});

export const TabPanel = createComponent({
  tagName: 'vds-tab-panel',
  elementClass: VdsTabPanel,
  react: React,
});

export type TabsProps = React.ComponentProps<typeof Tabs>;
export type TabProps = React.ComponentProps<typeof Tab>;
export type TabPanelProps = React.ComponentProps<typeof TabPanel>;
