import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { VdsTextField } from '@verobee/design-elements/components/text-field';
import '@verobee/design-elements/define/text-field';

export type TextFieldInputEvent = CustomEvent<{ value: string }>;
export type TextFieldChangeEvent = CustomEvent<{ value: string }>;

export const TextField = /*#__PURE__*/ createComponent({
  tagName: 'vds-text-field',
  elementClass: VdsTextField,
  react: React,
  events: {
    onInput: 'vds-input' as EventName<TextFieldInputEvent>,
    onChange: 'vds-change' as EventName<TextFieldChangeEvent>,
  },
});

export type TextFieldProps = React.ComponentProps<typeof TextField>;
