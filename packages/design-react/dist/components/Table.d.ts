import * as React from 'react';
type Density = 'compact' | 'normal' | 'comfortable';
export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
    density?: Density;
}
export declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLDivElement>>;
export {};
