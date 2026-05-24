import * as React from 'react';
export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    columns?: 2 | 4;
}
export declare function BentoGrid({ children, columns, style, ...props }: BentoGridProps): import("react/jsx-runtime").JSX.Element;
