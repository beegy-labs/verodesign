import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsStack } from '@verobee/design-elements/components/stack';
import '@verobee/design-elements/define/stack';

export const Stack = /*#__PURE__*/ createComponent({
  tagName: 'vds-stack',
  elementClass: VdsStack,
  react: React,
});

export type StackProps = React.ComponentProps<typeof Stack>;
