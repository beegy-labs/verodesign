import * as React from 'react';
export declare const spacing: {
    readonly '0': "0";
    readonly '0_5': "var(--vds-spacing-0_5)";
    readonly '1': "var(--vds-spacing-1)";
    readonly '1_5': "var(--vds-spacing-1_5)";
    readonly '2': "var(--vds-spacing-2)";
    readonly '2_5': "var(--vds-spacing-2_5)";
    readonly '3': "var(--vds-spacing-3)";
    readonly '4': "var(--vds-spacing-4)";
    readonly '5': "var(--vds-spacing-5)";
    readonly '6': "var(--vds-spacing-6)";
    readonly '8': "var(--vds-spacing-8)";
    readonly '10': "var(--vds-spacing-10)";
    readonly '12': "var(--vds-spacing-12)";
    readonly '16': "var(--vds-spacing-16)";
};
export declare function cx(...values: Array<string | undefined | null | false>): string;
export declare function toDataAttr(value: boolean | undefined): "" | undefined;
export declare function mergeRefs<T>(forwarded: React.ForwardedRef<T>, value: T | null): void;
export declare function extractSlottedChildren(children: React.ReactNode, slotName: string): {
    slotted: React.ReactNode[];
    rest: React.ReactNode[];
};
export declare const focusRing: React.CSSProperties;
