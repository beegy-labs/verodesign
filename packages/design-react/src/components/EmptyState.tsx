import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsEmptyState } from '@verobee/design-elements/components/empty-state';
import '@verobee/design-elements/define/empty-state';

export const EmptyState = /*#__PURE__*/ createComponent({
  tagName: 'vds-empty-state',
  elementClass: VdsEmptyState,
  react: React,
});

export type EmptyStateProps = React.ComponentProps<typeof EmptyState>;
