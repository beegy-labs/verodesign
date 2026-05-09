import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { VdsTextArea } from '@verobee/design-elements/components/text-area';
import '@verobee/design-elements/define/text-area';

export type TextAreaInputEvent = CustomEvent<{ value: string }>;
export type TextAreaChangeEvent = CustomEvent<{ value: string }>;

export const TextArea = /*#__PURE__*/ createComponent({
  tagName: 'vds-text-area',
  elementClass: VdsTextArea,
  react: React,
  events: {
    onInput: 'vds-input' as EventName<TextAreaInputEvent>,
    onChange: 'vds-change' as EventName<TextAreaChangeEvent>,
  },
});

export type TextAreaProps = React.ComponentProps<typeof TextArea>;
