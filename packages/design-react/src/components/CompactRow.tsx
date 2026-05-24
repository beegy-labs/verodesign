import * as React from 'react';

export interface CompactRowProps {
  leading?: React.ReactNode;
  label: React.ReactNode;
  meta?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  as?: 'button' | 'link' | 'div';
  href?: string;
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  showChevron?: boolean;
}

export const CompactRow = React.forwardRef<HTMLElement, CompactRowProps>(function CompactRow(
  {
    leading,
    label,
    meta,
    trailing,
    onClick,
    selected = false,
    className,
    as,
    href,
    tone = 'neutral',
    disabled = false,
    showChevron = false,
  },
  ref,
) {
  const resolvedAs = as ?? (href ? 'link' : onClick ? 'button' : 'div');

  return React.createElement(
    'vds-compact-row',
    {
      ref,
      as: resolvedAs,
      href,
      tone,
      disabled: disabled || undefined,
      selected: selected || undefined,
      'show-chevron': showChevron || undefined,
      class: className,
      onClick: disabled || resolvedAs === 'div' ? undefined : onClick,
    },
    leading ? React.createElement('span', { slot: 'leading' }, leading) : null,
    label,
    meta ? React.createElement('span', { slot: 'meta' }, meta) : null,
    trailing ? React.createElement('span', { slot: 'trailing' }, trailing) : null,
  );
});
