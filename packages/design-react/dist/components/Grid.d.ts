import * as React from 'react';
type Cols = '1' | '2' | '3' | '4' | '5' | '6' | '12';
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8';
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    cols?: Cols;
    gap?: Gap;
}
export declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
export {};
