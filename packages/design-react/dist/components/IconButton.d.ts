import * as React from 'react';
type IconButtonVariant = 'ghost' | 'tonal' | 'soft' | 'outline';
type IconButtonTone = 'neutral' | 'primary' | 'destructive';
type IconButtonSize = 'sm' | 'md' | 'lg';
export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'type'> {
    variant?: IconButtonVariant;
    tone?: IconButtonTone;
    size?: IconButtonSize;
    disabled?: boolean;
    ariaLabelText?: string | null;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
export {};
