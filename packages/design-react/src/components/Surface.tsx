import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsSurface } from '@verobee/design-elements/components/surface';
import '@verobee/design-elements/define/surface';

export const Surface = /*#__PURE__*/ createComponent({
  tagName: 'vds-surface',
  elementClass: VdsSurface,
  react: React,
});

export type SurfaceProps = React.ComponentProps<typeof Surface>;
