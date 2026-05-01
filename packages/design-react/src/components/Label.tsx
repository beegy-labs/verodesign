import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsLabel } from '@verobee/design-elements/components/label';
import '@verobee/design-elements/define/label';

export const Label = createComponent({
  tagName: 'vds-label',
  elementClass: VdsLabel,
  react: React,
});

export type LabelProps = React.ComponentProps<typeof Label>;
