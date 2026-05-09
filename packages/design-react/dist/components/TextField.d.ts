import * as React from 'react';
import { type EventName } from '@lit/react';
import { VdsTextField } from '@verobee/design-elements/components/text-field';
import '@verobee/design-elements/define/text-field';
export type TextFieldInputEvent = CustomEvent<{
    value: string;
}>;
export type TextFieldChangeEvent = CustomEvent<{
    value: string;
}>;
export declare const TextField: import("@lit/react").ReactWebComponent<VdsTextField, {
    onInput: EventName<TextFieldInputEvent>;
    onChange: EventName<TextFieldChangeEvent>;
}>;
export type TextFieldProps = React.ComponentProps<typeof TextField>;
