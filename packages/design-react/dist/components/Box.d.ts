import * as React from 'react';
type Spacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';
type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    p?: Spacing;
    px?: Spacing;
    py?: Spacing;
    maxWidth?: MaxWidth;
    'max-width'?: MaxWidth;
    inline?: boolean;
}
export declare const Box: React.ForwardRefExoticComponent<BoxProps & React.RefAttributes<HTMLDivElement>>;
export {};
