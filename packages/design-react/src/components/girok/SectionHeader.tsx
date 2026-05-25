import * as React from 'react';

import { cx } from '../_internal.js';

export interface SectionHeaderProps {
  icon: React.ReactNode;
  iconTone?: 'amber' | 'blue' | 'emerald' | 'rose';
  children: React.ReactNode;
}

export function SectionHeader({ icon, iconTone = 'amber', children }: SectionHeaderProps) {
  return (
    <div className="vds-pattern-girok-section-header">
      <span
        aria-hidden="true"
        className={cx(
          'vds-pattern-girok-section-header__icon',
          `vds-pattern-girok-section-header__icon--${iconTone}`,
        )}
      >
        {icon}
      </span>
      <div className="vds-pattern-girok-section-header__title">{children}</div>
    </div>
  );
}
