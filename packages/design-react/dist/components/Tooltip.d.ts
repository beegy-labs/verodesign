import * as React from 'react';
type Placement = 'top' | 'right' | 'bottom' | 'left';
export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    placement?: Placement;
    delay?: number;
    disabled?: boolean;
}
export declare const Tooltip: React.ForwardRefExoticComponent<TooltipProps & React.RefAttributes<HTMLDivElement>>;
export {};
