import * as React from 'react';
import { focusRing } from './_internal.js';

export type SwitchChangeEvent = CustomEvent<{ checked: boolean }>;
type SwitchSize = 'sm' | 'md' | 'lg';
export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  size?: SwitchSize;
  onChange?: ((event: SwitchChangeEvent) => void) | undefined;
}
export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(function Switch({ checked = false, disabled = false, required = false, name, value = 'on', size = 'md', onChange, children, style, ...rest }, ref) {
  const trackWidth = size === 'sm' ? 'calc(var(--vds-spacing-7))' : size === 'lg' ? 'calc(var(--vds-spacing-11))' : 'calc(var(--vds-spacing-9))';
  const trackHeight = size === 'sm' ? 'calc(var(--vds-spacing-4))' : size === 'lg' ? 'calc(var(--vds-spacing-6))' : 'calc(var(--vds-spacing-5))';
  const thumbSize = size === 'sm' ? 'calc(var(--vds-spacing-3))' : size === 'lg' ? 'calc(var(--vds-spacing-5))' : 'calc(var(--vds-spacing-4))';
  const translate = size === 'sm' ? 'calc(var(--vds-spacing-3))' : size === 'lg' ? 'calc(var(--vds-spacing-5))' : 'calc(var(--vds-spacing-4))';
  return <label {...rest} ref={ref} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--vds-spacing-2)', cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none', color: 'var(--vds-theme-text-primary)', fontFamily: 'var(--vds-font-family-sans)', fontSize: size === 'sm' ? 'var(--vds-type-role-label-size)' : size === 'lg' ? 'var(--vds-type-role-title-size)' : 'var(--vds-type-role-body-size)', opacity: disabled ? 0.5 : 1, ...style }}><input type="checkbox" role="switch" checked={checked} disabled={disabled} required={required} name={name} value={value} onChange={(event) => onChange?.(new CustomEvent('change', { detail: { checked: event.currentTarget.checked } }))} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} /><span aria-hidden="true" style={{ position: 'relative', flexShrink: 0, background: checked ? 'var(--vds-theme-primary)' : 'var(--vds-theme-border-default)', borderRadius: '999px', width: trackWidth, height: trackHeight, ...focusRing, outline: 'none' }}><span style={{ position: 'absolute', top: 'calc(var(--vds-spacing-0_5) / 2)', left: 'calc(var(--vds-spacing-0_5) / 2)', background: 'var(--vds-theme-bg-card)', borderRadius: '999px', boxShadow: 'var(--vds-shadow-1)', width: thumbSize, height: thumbSize, transform: checked ? `translateX(${translate})` : undefined }} /></span>{children}</label>;
});
