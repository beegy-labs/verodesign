import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsTooltip } from '@verobee/design-elements/components/tooltip';
import '@verobee/design-elements/define/tooltip';

export const Tooltip = createComponent({
  tagName: 'vds-tooltip',
  elementClass: VdsTooltip,
  react: React,
});

export type TooltipProps = React.ComponentProps<typeof Tooltip>;
