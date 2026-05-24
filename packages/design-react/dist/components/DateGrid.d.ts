import * as React from 'react';
export interface DateGridProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    year: number;
    month: number;
    selectedDate?: string;
    dotDates?: string[];
    firstDayOfWeek?: 'mon' | 'sun';
    onSelect?: (date: string) => void;
    onMonthChange?: (detail: {
        year: number;
        month: number;
    }) => void;
}
export declare const DateGrid: React.ForwardRefExoticComponent<DateGridProps & React.RefAttributes<HTMLElement>>;
