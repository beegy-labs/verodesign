import * as React from 'react';
type DeltaTone = 'positive' | 'negative' | 'neutral';
type StatTone = 'default' | 'success' | 'warning' | 'error';
export interface StatTileProps extends React.HTMLAttributes<HTMLElement> {
    label?: string;
    value?: string;
    delta?: string;
    hint?: string;
    deltaTone?: DeltaTone;
    tone?: StatTone;
}
export declare const StatTile: React.ForwardRefExoticComponent<StatTileProps & React.RefAttributes<HTMLElement>>;
export {};
