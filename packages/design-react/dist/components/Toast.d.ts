import * as React from 'react';
type Tone = 'neutral' | 'success' | 'warning' | 'error' | 'info';
type Placement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
    toastTitle?: string;
    message?: string;
    tone?: Tone;
    duration?: number;
    dismissible?: boolean;
    onDismiss?: ((event: CustomEvent<void>) => void) | undefined;
}
export interface ToastGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    placement?: Placement;
    max?: number;
}
export declare const Toast: React.ForwardRefExoticComponent<ToastProps & React.RefAttributes<HTMLDivElement>>;
export declare const ToastGroup: React.ForwardRefExoticComponent<ToastGroupProps & React.RefAttributes<HTMLDivElement>>;
export {};
