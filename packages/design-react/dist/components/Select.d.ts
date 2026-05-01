import * as React from 'react';
import { VdsSelect, VdsOption } from '@verobee/design-elements/components/select';
import '@verobee/design-elements/define/select';
export declare const Select: import("@lit/react").ReactWebComponent<VdsSelect, {
    onChange: string;
}>;
export declare const Option: import("@lit/react").ReactWebComponent<VdsOption, {}>;
export type SelectProps = React.ComponentProps<typeof Select>;
export type OptionProps = React.ComponentProps<typeof Option>;
