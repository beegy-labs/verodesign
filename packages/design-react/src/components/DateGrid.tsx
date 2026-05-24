import * as React from 'react';

export interface DateGridProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  year: number;
  month: number;
  selectedDate?: string;
  dotDates?: string[];
  firstDayOfWeek?: 'mon' | 'sun';
  onSelect?: (date: string) => void;
  onMonthChange?: (detail: { year: number; month: number }) => void;
}

export const DateGrid = React.forwardRef<HTMLElement, DateGridProps>(function DateGrid(
  { year, month, selectedDate, dotDates = [], firstDayOfWeek = 'mon', onSelect, onMonthChange, className, ...rest },
  ref,
) {
  const localRef = React.useRef<HTMLElement | null>(null);
  React.useImperativeHandle(ref, () => localRef.current as HTMLElement, []);

  React.useEffect(() => {
    const element = localRef.current;
    if (!element) return;
    const handleSelect = (event: Event) => onSelect?.((event as CustomEvent<{ date: string }>).detail.date);
    const handleMonth = (event: Event) => onMonthChange?.((event as CustomEvent<{ year: number; month: number }>).detail);
    element.addEventListener('vds-date-select', handleSelect as EventListener);
    element.addEventListener('vds-month-change', handleMonth as EventListener);
    return () => {
      element.removeEventListener('vds-date-select', handleSelect as EventListener);
      element.removeEventListener('vds-month-change', handleMonth as EventListener);
    };
  }, [onMonthChange, onSelect]);

  return React.createElement('vds-date-grid', {
    ...rest,
    ref: localRef,
    year,
    month,
    'selected-date': selectedDate,
    'dot-dates': dotDates.join(','),
    'first-day-of-week': firstDayOfWeek,
    class: className,
  });
});
