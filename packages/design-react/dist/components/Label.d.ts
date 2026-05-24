import * as React from 'react';
type LabelSize = 'sm' | 'md' | 'lg';
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    size?: LabelSize;
}
export declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;
export {};
