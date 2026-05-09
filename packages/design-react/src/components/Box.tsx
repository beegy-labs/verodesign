import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsBox } from '@verobee/design-elements/components/box';
import '@verobee/design-elements/define/box';

export const Box = /*#__PURE__*/ createComponent({
  tagName: 'vds-box',
  elementClass: VdsBox,
  react: React,
});

export type BoxProps = React.ComponentProps<typeof Box>;
