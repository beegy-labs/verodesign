import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsSelect, VdsOption } from '@verobee/design-elements/components/select';
import '@verobee/design-elements/define/select';

export const Select = createComponent({
  tagName: 'vds-select',
  elementClass: VdsSelect,
  react: React,
  events: {
    onChange: 'change',
  },
});

export const Option = createComponent({
  tagName: 'vds-option',
  elementClass: VdsOption,
  react: React,
});

export type SelectProps = React.ComponentProps<typeof Select>;
export type OptionProps = React.ComponentProps<typeof Option>;
