import * as React from 'react';
import { focusRing } from './_internal.js';

type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  size?: CheckboxSize;
  onChange?: ((event: CustomEvent<{ checked: boolean }>) => void) | React.ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(function Checkbox(
  { checked = false, indeterminate = false, disabled = false, required = false, name, value = 'on', size = 'md', onChange, children, style, ...rest },
  ref,
) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);
  const iconSize = size === 'sm' ? 'calc(var(--vds-spacing-3) + var(--vds-spacing-0_5))' : size === 'lg' ? 'calc(var(--vds-spacing-5) + var(--vds-spacing-0_5))' : 'calc(var(--vds-spacing-4) + var(--vds-spacing-0_5))';
  return (
    <label
      {...rest}
      ref={ref}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--vds-spacing-2)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        color: 'var(--vds-theme-text-primary)',
        fontFamily: 'var(--vds-font-family-sans)',
        fontSize: size === 'sm' ? 'var(--vds-type-role-label-size)' : size === 'lg' ? 'var(--vds-type-role-title-size)' : 'var(--vds-type-role-body-size)',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        aria-checked={indeterminate ? 'mixed' : checked}
        onChange={(event) => {
          const custom = new CustomEvent('change', { detail: { checked: event.currentTarget.checked } });
          if (typeof onChange === 'function') (onChange as any)(custom);
        }}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />
      <span
        aria-hidden="true"
        style={{
          ...focusRing,
          outline: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: iconSize,
          height: iconSize,
          border: 'var(--vds-border-width-1) solid ' + (checked || indeterminate ? 'var(--vds-theme-primary)' : 'var(--vds-theme-border-default)'),
          borderRadius: 'var(--vds-radius-sm)',
          background: checked || indeterminate ? 'var(--vds-theme-primary)' : 'var(--vds-theme-bg-card)',
        }}
      >
        {indeterminate ? <span style={{ width: '80%', height: '2px', background: 'var(--vds-theme-primary-fg)' }} /> : checked ? <span style={{ color: 'var(--vds-theme-primary-fg)', fontSize: '0.9em', lineHeight: 1 }}>✓</span> : null}
      </span>
      {children}
    </label>
  );
});
