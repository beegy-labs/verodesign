import * as React from 'react';
type ColSpan = 1 | 2 | 3 | 4;
type RowSpan = 1 | 2 | 3;
export interface BentoItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    colSpan?: ColSpan;
    rowSpan?: RowSpan;
}
export declare function BentoItem({ children, colSpan, rowSpan, style, ...props }: BentoItemProps): import("react/jsx-runtime").JSX.Element;
export {};
