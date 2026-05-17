import * as React from 'react';
export interface CompactRowProps {
    leading?: React.ReactNode;
    label: React.ReactNode;
    meta?: React.ReactNode;
    trailing?: React.ReactNode;
    onClick?: () => void;
    selected?: boolean;
    className?: string;
}
export declare function CompactRow({ leading, label, meta, trailing, onClick, selected, className, }: CompactRowProps): import("react/jsx-runtime").JSX.Element;
