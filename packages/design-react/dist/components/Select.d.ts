import * as React from 'react';
export type SelectChangeEvent = CustomEvent<{
    value: string;
}>;
export interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    selected?: boolean;
    disabled?: boolean;
}
export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string;
    placeholder?: string;
    label?: string;
    helper?: string;
    errorMessage?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    onChange?: ((event: SelectChangeEvent) => void) | undefined;
}
export declare const Option: React.ForwardRefExoticComponent<OptionProps & React.RefAttributes<HTMLDivElement>>;
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>>;
