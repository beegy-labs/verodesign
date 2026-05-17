import * as React from 'react';
type Align = 'left' | 'center' | 'right';
export interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    align?: Align;
    compact?: boolean;
    dim?: boolean;
    colspan?: number;
}
export declare const Th: React.ForwardRefExoticComponent<ThProps & React.RefAttributes<HTMLTableCellElement>>;
export {};
