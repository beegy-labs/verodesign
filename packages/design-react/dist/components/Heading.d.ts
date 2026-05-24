import * as React from 'react';
type Level = '1' | '2' | '3' | '4';
type AsTag = 'h1' | 'h2' | 'h3' | 'h4';
type Tone = 'bright' | 'default' | 'muted';
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: Level;
    as?: AsTag;
    tone?: Tone;
}
export declare const Heading: React.ForwardRefExoticComponent<HeadingProps & React.RefAttributes<HTMLHeadingElement>>;
export {};
