import * as React from 'react';
type CardElevation = '0' | '1' | '2' | '3' | '4' | '5';
type CardVariant = 'surface' | 'outline' | 'ghost';
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
    variant?: CardVariant;
    elevation?: CardElevation;
}
export declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLElement>>;
export {};
