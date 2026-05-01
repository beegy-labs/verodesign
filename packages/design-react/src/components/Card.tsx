import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsCard } from '@verobee/design-elements/components/card';
import '@verobee/design-elements/define/card';

export const Card = createComponent({
  tagName: 'vds-card',
  elementClass: VdsCard,
  react: React,
});

export type CardProps = React.ComponentProps<typeof Card>;
