import * as React from 'react';
import { cx, extractSlottedChildren } from './_internal.js';

export type TextFieldInputEvent = CustomEvent<{ value: string }>;
export type TextFieldChangeEvent = CustomEvent<{ value: string }>;
type Size = 'sm' | 'md' | 'lg';
type InputType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number' | 'date' | 'datetime-local' | 'time' | 'month' | 'week' | 'color' | 'range' | 'file' | 'hidden';
export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onInput' | 'onChange'> {
  label?: string;
  helper?: string;
  errorMessage?: string;
  type?: InputType;
  size?: Size;
  readonly?: boolean;
  onInput?: ((event: TextFieldInputEvent) => void) | undefined;
  onChange?: ((event: TextFieldChangeEvent) => void) | undefined;
}
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField({ value = '', name, label, helper, errorMessage, placeholder, type = 'text', size = 'md', disabled = false, required = false, readonly = false, autoComplete, minLength, maxLength, pattern, className, children, style, onInput, onChange, ...rest }, ref) {
  const [touched, setTouched] = React.useState(false);
  const { slotted: start, rest: afterStart } = extractSlottedChildren(children, 'start');
  const { slotted: end } = extractSlottedChildren(afterStart, 'end');
  const invalid = touched && !!errorMessage && ((required && `${value}`.trim() === '') || (pattern ? !new RegExp(`^(?:${pattern})$`).test(`${value}`) : false));
  const helperText = invalid ? errorMessage : helper;
  const fontSize = size === 'sm' ? 'var(--vds-type-role-label-size)' : size === 'lg' ? 'var(--vds-type-role-title-size)' : 'var(--vds-type-role-body-size)';
  return <div className={cx(className)} style={{ display: 'inline-flex', flexDirection: 'column', gap: 'var(--vds-spacing-1)', fontFamily: 'var(--vds-font-family-sans)', color: 'var(--vds-theme-text-primary)', minWidth: '24ch', ...style }}>{label ? <label style={{ fontSize: 'var(--vds-type-role-label-size)', fontWeight: 'var(--vds-type-role-label-weight)' }}>{label}{required ? <span style={{ color: 'var(--vds-theme-destructive)' }}> *</span> : null}</label> : null}<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--vds-spacing-2)', background: 'var(--vds-theme-bg-card)', border: `var(--vds-border-width-1) solid ${invalid ? 'var(--vds-theme-destructive)' : 'var(--vds-theme-border-default)'}`, borderRadius: 'var(--vds-radius-md)', padding: 'var(--vds-spacing-2) var(--vds-spacing-3)', opacity: disabled ? 0.5 : 1 }}>{start}{<input {...rest} ref={ref} value={value} name={name} placeholder={placeholder} type={type} disabled={disabled} required={required} readOnly={readonly} autoComplete={autoComplete} minLength={minLength} maxLength={maxLength} pattern={pattern} onInput={(event) => onInput?.(new CustomEvent('vds-input', { detail: { value: event.currentTarget.value } }))} onChange={(event) => onChange?.(new CustomEvent('vds-change', { detail: { value: event.currentTarget.value } }))} onBlur={() => setTouched(true)} style={{ all: 'unset', flex: 1, minWidth: 0, font: 'inherit', fontSize, color: 'var(--vds-theme-text-primary)', background: 'transparent' }} />}{end}</div>{helperText ? <div style={{ fontSize: 'var(--vds-type-role-caption-size)', color: invalid ? 'var(--vds-theme-destructive)' : 'var(--vds-theme-text-dim)' }}>{helperText}</div> : null}</div>;
});
