import * as React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLElement> {
  value?: number;
  max?: number;
  min?: number;
  tone?: 'primary' | 'success' | 'destructive' | 'warning' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
  label?: string;
}

export const Progress = React.forwardRef<HTMLElement, ProgressProps>(function Progress(
  {
    value,
    max,
    min,
    tone = 'primary',
    size = 'md',
    indeterminate = false,
    label,
    className,
    ...rest
  },
  ref,
) {
  return React.createElement('vds-progress', {
    ...rest,
    ref,
    value,
    max,
    min,
    tone,
    size,
    indeterminate: indeterminate || undefined,
    'aria-label': label,
    class: className,
  });
});
