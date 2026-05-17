import * as React from 'react';
type LabelSize = 'sm' | 'md' | 'lg';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  size?: LabelSize;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required = false, size = 'md', children, style, ...rest },
  ref,
) {
  return (
    <label
      {...rest}
      ref={ref}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--vds-spacing-1)',
        fontFamily: 'var(--vds-font-family-sans)',
        fontWeight: 'var(--vds-type-role-label-weight)',
        color: 'var(--vds-theme-text-primary)',
        cursor: 'pointer',
        userSelect: 'none',
        fontSize: size === 'sm' ? 'var(--vds-type-role-label-size)' : size === 'lg' ? 'var(--vds-type-role-title-size)' : 'var(--vds-type-role-body-size)',
        ...style,
      }}
    >
      {children}
      {required ? <span aria-hidden="true" style={{ color: 'var(--vds-theme-destructive)', marginLeft: 'calc(var(--vds-spacing-0_5) / 2)' }}>*</span> : null}
    </label>
  );
});
