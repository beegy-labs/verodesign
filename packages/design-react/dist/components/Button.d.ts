import * as React from 'react';
type ButtonVariant = 'solid' | 'tonal' | 'ghost' | 'soft' | 'outline';
type ButtonTone = 'primary' | 'accent' | 'neutral' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'type'> {
    variant?: ButtonVariant;
    tone?: ButtonTone;
    size?: ButtonSize;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    name?: string;
    value?: string;
    ariaLabelText?: string | null;
    fullWidth?: boolean;
    'full-width'?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export {};
