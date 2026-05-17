import * as React from 'react';
export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
    heading?: string;
    subtitle?: string;
}
export declare const PageHeader: React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLElement>>;
