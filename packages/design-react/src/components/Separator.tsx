import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsSeparator } from '@verobee/design-elements/components/separator';
import '@verobee/design-elements/define/separator';

export const Separator = createComponent({
  tagName: 'vds-separator',
  elementClass: VdsSeparator,
  react: React,
});

export type SeparatorProps = React.ComponentProps<typeof Separator>;
