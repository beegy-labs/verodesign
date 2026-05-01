import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsSwitch } from '@verobee/design-elements/components/switch';
import '@verobee/design-elements/define/switch';

export const Switch = createComponent({
  tagName: 'vds-switch',
  elementClass: VdsSwitch,
  react: React,
  events: {
    onChange: 'change',
  },
});

export type SwitchProps = React.ComponentProps<typeof Switch>;
