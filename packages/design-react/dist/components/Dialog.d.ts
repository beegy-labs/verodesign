import * as React from 'react';
type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type DialogPlacement = 'center' | 'bottom';
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    size?: DialogSize;
    placement?: DialogPlacement;
    closeOnBackdrop?: boolean;
    'close-on-backdrop'?: boolean;
    closeOnEscape?: boolean;
    'close-on-escape'?: boolean;
    onOpen?: ((event: CustomEvent<void>) => void) | undefined;
    onClose?: ((event: CustomEvent<void>) => void) | undefined;
}
export declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDivElement>>;
export {};
