import * as React from 'react';

import { cx } from '../_internal.js';

export interface ActionRowProps {
  primaryLabel: React.ReactNode;
  secondaryLabel?: React.ReactNode;
  onPrimary: () => void;
  onSecondary?: () => void;
  primaryTone?: 'amber' | 'rose' | 'blue';
  disabled?: boolean;
}

export function ActionRow({
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  primaryTone = 'amber',
  disabled = false,
}: ActionRowProps) {
  return (
    <div className="vds-pattern-girok-action-row">
      {secondaryLabel ? (
        <button
          type="button"
          className={cx('vds-pattern-girok-action-row__secondary', disabled && 'is-disabled')}
          disabled={disabled}
          onClick={onSecondary}
        >
          {secondaryLabel}
        </button>
      ) : null}
      <button
        type="button"
        className={cx(
          'vds-pattern-girok-action-row__primary',
          `vds-pattern-girok-action-row__primary--${primaryTone}`,
          disabled && 'is-disabled',
        )}
        disabled={disabled}
        onClick={onPrimary}
      >
        {primaryLabel}
      </button>
    </div>
  );
}
