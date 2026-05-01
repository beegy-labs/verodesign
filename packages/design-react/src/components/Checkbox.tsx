import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsCheckbox } from '@verobee/design-elements/components/checkbox';
import '@verobee/design-elements/define/checkbox';

export const Checkbox = createComponent({
  tagName: 'vds-checkbox',
  elementClass: VdsCheckbox,
  react: React,
  events: {
    onChange: 'change',
  },
});

export type CheckboxProps = React.ComponentProps<typeof Checkbox>;
