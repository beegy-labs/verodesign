import * as React from 'react';
type Size = '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';
type Axis = 'horizontal' | 'vertical';
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
    axis?: Axis;
    size?: Size;
    grow?: boolean;
}
export declare const Spacer: React.ForwardRefExoticComponent<SpacerProps & React.RefAttributes<HTMLDivElement>>;
export {};
