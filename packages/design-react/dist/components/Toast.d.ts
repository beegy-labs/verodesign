import * as React from 'react';
import { VdsToast, VdsToastGroup } from '@verobee/design-elements/components/toast';
import '@verobee/design-elements/define/toast';
export declare const Toast: import("@lit/react").ReactWebComponent<VdsToast, {
    onDismiss: string;
}>;
export declare const ToastGroup: import("@lit/react").ReactWebComponent<VdsToastGroup, {}>;
export type ToastProps = React.ComponentProps<typeof Toast>;
export type ToastGroupProps = React.ComponentProps<typeof ToastGroup>;
