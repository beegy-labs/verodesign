import * as React from 'react';
type EmptyStateSize = 'sm' | 'md' | 'lg';
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: EmptyStateSize;
    heading?: string;
    description?: string;
}
export declare const EmptyState: React.ForwardRefExoticComponent<EmptyStateProps & React.RefAttributes<HTMLDivElement>>;
export {};
