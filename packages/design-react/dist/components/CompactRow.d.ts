import * as React from 'react';
export interface CompactRowProps {
    leading?: React.ReactNode;
    label: React.ReactNode;
    meta?: React.ReactNode;
    trailing?: React.ReactNode;
    onClick?: () => void;
    selected?: boolean;
    className?: string;
    as?: 'button' | 'link' | 'div';
    href?: string;
    tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
    disabled?: boolean;
    showChevron?: boolean;
}
export declare const CompactRow: React.ForwardRefExoticComponent<CompactRowProps & React.RefAttributes<HTMLElement>>;
