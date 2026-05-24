import * as React from 'react';
export interface SettingsRowProps extends React.HTMLAttributes<HTMLElement> {
    tone?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'zinc';
    title: string;
    description?: string;
    descriptionTone?: 'default' | 'success' | 'warning' | 'destructive';
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    chevron?: boolean;
}
export declare const SettingsRow: React.ForwardRefExoticComponent<SettingsRowProps & React.RefAttributes<HTMLElement>>;
