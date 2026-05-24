import * as React from 'react';

type Emphasis = 'neutral' | 'success' | 'destructive' | 'brand';
type Size = 'sm' | 'md';

export type BinaryPillToggleProps<T extends string> = {
  value: T;
  options: [{ value: T; label: React.ReactNode; disabled?: boolean }, { value: T; label: React.ReactNode; disabled?: boolean }];
  emphasis?: Emphasis;
  size?: Size;
  disabled?: boolean;
  'aria-label': string;
  onValueChange?: (value: T) => void;
};

export function BinaryPillToggle<T extends string>({
  value,
  options,
  emphasis = 'neutral',
  size = 'md',
  disabled = false,
  'aria-label': ariaLabel,
  onValueChange,
}: BinaryPillToggleProps<T>) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || !onValueChange) return;
    const handler = (event: Event) => onValueChange((event as CustomEvent<{ value: T }>).detail.value);
    element.addEventListener('vds-change', handler as EventListener);
    return () => element.removeEventListener('vds-change', handler as EventListener);
  }, [onValueChange]);

  return React.createElement(
    'vds-binary-pill-toggle',
    {
      ref,
      value,
      emphasis,
      size,
      disabled: disabled || undefined,
      'aria-label': ariaLabel,
    },
    ...options.map((option) =>
      React.createElement(
        'vds-binary-pill-toggle-option',
        {
          key: option.value,
          value: option.value,
          disabled: option.disabled || undefined,
        },
        option.label,
      ),
    ),
  );
}
