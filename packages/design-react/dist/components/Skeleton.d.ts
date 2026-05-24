import * as React from 'react';
type Shape = 'rect' | 'circle' | 'text';
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    shape?: Shape;
}
export declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
export {};
