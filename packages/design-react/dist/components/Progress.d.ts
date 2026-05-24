import * as React from 'react';
export interface ProgressProps extends React.HTMLAttributes<HTMLElement> {
    value?: number;
    max?: number;
    min?: number;
    tone?: 'primary' | 'success' | 'destructive' | 'warning' | 'neutral';
    size?: 'sm' | 'md' | 'lg';
    indeterminate?: boolean;
    label?: string;
}
export declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLElement>>;
