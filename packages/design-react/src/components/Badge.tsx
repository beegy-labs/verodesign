import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsBadge } from '@verobee/design-elements/components/badge';
import '@verobee/design-elements/define/badge';

export const Badge = createComponent({
  tagName: 'vds-badge',
  elementClass: VdsBadge,
  react: React,
});

export type BadgeProps = React.ComponentProps<typeof Badge>;
