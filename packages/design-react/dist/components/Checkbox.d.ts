import * as React from 'react';
type CheckboxSize = 'sm' | 'md' | 'lg';
export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    size?: CheckboxSize;
    onChange?: ((event: CustomEvent<{
        checked: boolean;
    }>) => void) | React.ChangeEventHandler<HTMLInputElement>;
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLLabelElement>>;
export {};
