import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsToast, VdsToastGroup } from '@verobee/design-elements/components/toast';
import '@verobee/design-elements/define/toast';

export const Toast = /*#__PURE__*/ createComponent({
  tagName: 'vds-toast',
  elementClass: VdsToast,
  react: React,
  events: {
    onDismiss: 'vds-dismiss',
  },
});

export const ToastGroup = /*#__PURE__*/ createComponent({
  tagName: 'vds-toast-group',
  elementClass: VdsToastGroup,
  react: React,
});

export type ToastProps = React.ComponentProps<typeof Toast>;
export type ToastGroupProps = React.ComponentProps<typeof ToastGroup>;
