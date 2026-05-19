import * as React from 'react';
export type GlassStrength = 'subtle' | 'base' | 'strong';
export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    strength?: GlassStrength;
}
export declare function GlassSurface({ children, strength, style, ...props }: GlassSurfaceProps): import("react/jsx-runtime").JSX.Element;
