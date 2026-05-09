import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsGrid } from '@verobee/design-elements/components/grid';
import '@verobee/design-elements/define/grid';

export const Grid = /*#__PURE__*/ createComponent({
  tagName: 'vds-grid',
  elementClass: VdsGrid,
  react: React,
});

export type GridProps = React.ComponentProps<typeof Grid>;
