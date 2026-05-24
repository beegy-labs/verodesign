import * as React from 'react';
type BadgeVariant = 'solid' | 'soft' | 'outline';
type BadgeTone = 'primary' | 'accent' | 'neutral' | 'destructive' | 'success' | 'warning' | 'info';
type BadgeSize = 'sm' | 'md';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    tone?: BadgeTone;
    size?: BadgeSize;
}
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
export {};
