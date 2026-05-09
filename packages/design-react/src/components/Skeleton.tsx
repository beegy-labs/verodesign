import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsSkeleton } from '@verobee/design-elements/components/skeleton';
import '@verobee/design-elements/define/skeleton';

export const Skeleton = /*#__PURE__*/ createComponent({
  tagName: 'vds-skeleton',
  elementClass: VdsSkeleton,
  react: React,
});

export type SkeletonProps = React.ComponentProps<typeof Skeleton>;
