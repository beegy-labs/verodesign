import * as React from 'react';
type Direction = 'column' | 'row';
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8';
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: Direction;
    gap?: Gap;
    align?: Align;
    justify?: Justify;
    wrap?: boolean;
}
export declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
export {};
