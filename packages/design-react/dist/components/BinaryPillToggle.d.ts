import * as React from 'react';
type Emphasis = 'neutral' | 'success' | 'destructive' | 'brand';
type Size = 'sm' | 'md';
export type BinaryPillToggleProps<T extends string> = {
    value: T;
    options: [{
        value: T;
        label: React.ReactNode;
        disabled?: boolean;
    }, {
        value: T;
        label: React.ReactNode;
        disabled?: boolean;
    }];
    emphasis?: Emphasis;
    size?: Size;
    disabled?: boolean;
    'aria-label': string;
    onValueChange?: (value: T) => void;
};
export declare function BinaryPillToggle<T extends string>({ value, options, emphasis, size, disabled, 'aria-label': ariaLabel, onValueChange, }: BinaryPillToggleProps<T>): React.ReactElement<{
    ref: React.RefObject<HTMLElement | null>;
    value: T;
    emphasis: Emphasis;
    size: Size;
    disabled: true | undefined;
    'aria-label': string;
}, string | React.JSXElementConstructor<any>>;
export {};
