import * as React from 'react';
export type SwitchChangeEvent = CustomEvent<{
    checked: boolean;
}>;
type SwitchSize = 'sm' | 'md' | 'lg';
export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    size?: SwitchSize;
    onChange?: ((event: SwitchChangeEvent) => void) | undefined;
}
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLLabelElement>>;
export {};
