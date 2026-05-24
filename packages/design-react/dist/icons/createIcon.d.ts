import * as React from 'react';
type IconSize = 'sm' | 'md' | 'lg' | number;
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    size?: IconSize;
    strokeWidth?: number;
}
export declare function createIcon(name: string): React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLElement>>;
export {};
