import * as React from 'react';

import { cx } from '../_internal.js';
import { ChevronRight } from '../../icons/ChevronRight.js';

export interface PickerButtonProps {
  label: React.ReactNode;
  caret?: 'down' | 'right';
  className?: string;
  onClick: () => void;
}

export function PickerButton({ label, caret = 'down', className, onClick }: PickerButtonProps) {
  return (
    <button
      type="button"
      className={cx('vds-pattern-girok-picker-button', className)}
      onClick={onClick}
    >
      <span className="vds-pattern-girok-picker-button__label">{label}</span>
      <ChevronRight
        aria-hidden="true"
        className={cx(
          'vds-pattern-girok-picker-button__caret',
          caret === 'down' && 'is-down',
        )}
      />
    </button>
  );
}
