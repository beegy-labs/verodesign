import * as React from 'react';
type Orientation = 'horizontal' | 'vertical';
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: Orientation;
    decorative?: boolean;
}
export declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;
export {};
