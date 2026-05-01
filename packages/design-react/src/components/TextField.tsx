import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsTextField } from '@verobee/design-elements/components/text-field';
import '@verobee/design-elements/define/text-field';

export const TextField = createComponent({
  tagName: 'vds-text-field',
  elementClass: VdsTextField,
  react: React,
  events: {
    onInput: 'vds-input',
    onChange: 'vds-change',
  },
});

export type TextFieldProps = React.ComponentProps<typeof TextField>;
