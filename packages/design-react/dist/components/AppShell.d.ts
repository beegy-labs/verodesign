import * as React from 'react';
export interface AppShellProps {
    header?: React.ReactNode;
    bottomNav?: React.ReactNode;
    children?: React.ReactNode;
}
export declare function AppShell({ header, bottomNav, children }: AppShellProps): import("react/jsx-runtime").JSX.Element;
