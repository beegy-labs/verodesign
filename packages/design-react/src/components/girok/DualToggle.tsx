import * as React from 'react';

import { cx } from '../_internal.js';

export interface DualToggleProps {
  value: 'expense' | 'income';
  expenseLabel: string;
  incomeLabel: string;
  onChange: (value: 'expense' | 'income') => void;
}

export function DualToggle({ value, expenseLabel, incomeLabel, onChange }: DualToggleProps) {
  const options = [
    { value: 'expense' as const, label: expenseLabel },
    { value: 'income' as const, label: incomeLabel },
  ];

  return (
    <div className="vds-pattern-girok-dual-toggle" role="radiogroup" aria-label={`${expenseLabel} or ${incomeLabel}`}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={cx(
              'vds-pattern-girok-dual-toggle__option',
              `vds-pattern-girok-dual-toggle__option--${option.value}`,
              isActive && 'is-active',
            )}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
