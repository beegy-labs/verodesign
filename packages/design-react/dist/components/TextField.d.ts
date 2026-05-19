import * as React from 'react';
export type TextFieldInputEvent = CustomEvent<{
    value: string;
}>;
export type TextFieldChangeEvent = CustomEvent<{
    value: string;
}>;
type Size = 'sm' | 'md' | 'lg';
type InputType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number' | 'date' | 'datetime-local' | 'time' | 'month' | 'week' | 'color' | 'range' | 'file' | 'hidden';
export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onInput' | 'onChange'> {
    label?: string;
    helper?: string;
    errorMessage?: string;
    type?: InputType;
    size?: Size;
    readonly?: boolean;
    onInput?: ((event: TextFieldInputEvent) => void) | undefined;
    onChange?: ((event: TextFieldChangeEvent) => void) | undefined;
}
export declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>>;
export {};
