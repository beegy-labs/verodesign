import * as React from 'react';
import { type EventName } from '@lit/react';
import { VdsSwitch } from '@verobee/design-elements/components/switch';
import '@verobee/design-elements/define/switch';
export type SwitchChangeEvent = CustomEvent<{
    checked: boolean;
}>;
export declare const Switch: import("@lit/react").ReactWebComponent<VdsSwitch, {
    onChange: EventName<SwitchChangeEvent>;
}>;
export type SwitchProps = React.ComponentProps<typeof Switch>;
