import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsDialog } from '@verobee/design-elements/components/dialog';
import '@verobee/design-elements/define/dialog';

export const Dialog = createComponent({
  tagName: 'vds-dialog',
  elementClass: VdsDialog,
  react: React,
  events: {
    onOpen: 'vds-open',
    onClose: 'vds-close',
  },
});

export type DialogProps = React.ComponentProps<typeof Dialog>;
