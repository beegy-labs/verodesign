import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsTh } from '@verobee/design-elements/components/th';
import '@verobee/design-elements/define/th';

export const Th = /*#__PURE__*/ createComponent({
  tagName: 'vds-th',
  elementClass: VdsTh,
  react: React,
});

export type ThProps = React.ComponentProps<typeof Th>;
