import * as React from 'react';
import { type EventName } from '@lit/react';
import { VdsTextArea } from '@verobee/design-elements/components/text-area';
import '@verobee/design-elements/define/text-area';
export type TextAreaInputEvent = CustomEvent<{
    value: string;
}>;
export type TextAreaChangeEvent = CustomEvent<{
    value: string;
}>;
export declare const TextArea: import("@lit/react").ReactWebComponent<VdsTextArea, {
    onInput: EventName<TextAreaInputEvent>;
    onChange: EventName<TextAreaChangeEvent>;
}>;
export type TextAreaProps = React.ComponentProps<typeof TextArea>;
