import * as React from 'react';
type Variant = 'default' | 'padded' | 'section' | 'inset' | 'divided';
type Radius = 'lg' | 'xl';
export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: Variant;
    radius?: Radius;
    borderless?: boolean;
}
export declare const Surface: React.ForwardRefExoticComponent<SurfaceProps & React.RefAttributes<HTMLDivElement>>;
export {};
