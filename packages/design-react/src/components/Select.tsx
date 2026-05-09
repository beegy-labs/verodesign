import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { VdsSelect, VdsOption } from '@verobee/design-elements/components/select';
import '@verobee/design-elements/define/select';

export type SelectChangeEvent = CustomEvent<{ value: string }>;

export const Select = /*#__PURE__*/ createComponent({
  tagName: 'vds-select',
  elementClass: VdsSelect,
  react: React,
  events: {
    onChange: 'change' as EventName<SelectChangeEvent>,
  },
});

export const Option = /*#__PURE__*/ createComponent({
  tagName: 'vds-option',
  elementClass: VdsOption,
  react: React,
});

export type SelectProps = React.ComponentProps<typeof Select>;
export type OptionProps = React.ComponentProps<typeof Option>;
