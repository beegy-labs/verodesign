import * as React from 'react';
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8';
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
    gap?: Gap;
    align?: Align;
    justify?: Justify;
    nowrap?: boolean;
}
export declare const Cluster: React.ForwardRefExoticComponent<ClusterProps & React.RefAttributes<HTMLDivElement>>;
export {};
