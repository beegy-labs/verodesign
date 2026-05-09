import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { VdsSwitch } from '@verobee/design-elements/components/switch';
import '@verobee/design-elements/define/switch';

export type SwitchChangeEvent = CustomEvent<{ checked: boolean }>;

export const Switch = /*#__PURE__*/ createComponent({
  tagName: 'vds-switch',
  elementClass: VdsSwitch,
  react: React,
  events: {
    onChange: 'change' as EventName<SwitchChangeEvent>,
  },
});

export type SwitchProps = React.ComponentProps<typeof Switch>;
