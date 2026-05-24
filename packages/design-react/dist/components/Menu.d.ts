import * as React from 'react';
export interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    open?: boolean;
    placement?: 'bottom-start' | 'bottom-end';
    onSelect?: ((event: CustomEvent<{
        value: string;
    }>) => void) | undefined;
}
export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value?: string;
    disabled?: boolean;
    tone?: 'default' | 'destructive';
    'data-tone'?: 'default' | 'destructive';
}
export declare const Menu: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLDivElement>>;
export declare const MenuItem: React.ForwardRefExoticComponent<MenuItemProps & React.RefAttributes<HTMLButtonElement>>;
