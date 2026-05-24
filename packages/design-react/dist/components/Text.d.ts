import * as React from 'react';
type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
type Tone = 'default' | 'bright' | 'dim' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
type Weight = '400' | '500' | '600' | '700';
type Align = 'left' | 'center' | 'right';
type AsTag = 'p' | 'span' | 'div';
export interface TextProps extends React.HTMLAttributes<HTMLElement> {
    size?: Size;
    tone?: Tone;
    weight?: Weight;
    align?: Align;
    as?: AsTag;
    truncate?: boolean;
    uppercase?: boolean;
    mono?: boolean;
    tabular?: boolean;
}
export declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLElement>>;
export {};
