import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsIconButton } from '@verobee/design-elements/components/icon-button';
import '@verobee/design-elements/define/icon-button';

export const IconButton = /*#__PURE__*/ createComponent({
  tagName: 'vds-icon-button',
  elementClass: VdsIconButton,
  react: React,
  events: {
    onClick: 'click',
  },
});

export type IconButtonProps = React.ComponentProps<typeof IconButton>;
