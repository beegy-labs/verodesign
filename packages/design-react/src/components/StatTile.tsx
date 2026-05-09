import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsStatTile } from '@verobee/design-elements/components/stat-tile';
import '@verobee/design-elements/define/stat-tile';

export const StatTile = /*#__PURE__*/ createComponent({
  tagName: 'vds-stat-tile',
  elementClass: VdsStatTile,
  react: React,
});

export type StatTileProps = React.ComponentProps<typeof StatTile>;
