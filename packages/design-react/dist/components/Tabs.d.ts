import * as React from 'react';
type TabsOrientation = 'horizontal' | 'vertical';
type TabsActivation = 'auto' | 'manual';
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string;
    activation?: TabsActivation;
    orientation?: TabsOrientation;
    onChange?: ((event: CustomEvent<{
        value: string;
    }>) => void) | undefined;
}
export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value?: string;
    disabled?: boolean;
}
export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
}
export declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
export declare const Tab: React.ForwardRefExoticComponent<TabProps & React.RefAttributes<HTMLButtonElement>>;
export declare const TabPanel: React.ForwardRefExoticComponent<TabPanelProps & React.RefAttributes<HTMLDivElement>>;
export {};
