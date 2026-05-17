import * as React from 'react';
import { cx } from './_internal.js';

export type TextAreaInputEvent = CustomEvent<{ value: string }>;
export type TextAreaChangeEvent = CustomEvent<{ value: string }>;
type Resize = 'none' | 'vertical' | 'horizontal' | 'both';
export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onInput' | 'onChange'> {
  label?: string;
  helper?: string;
  errorMessage?: string;
  resize?: Resize;
  rows?: number;
  showCount?: boolean;
  'show-count'?: boolean;
  onInput?: ((event: TextAreaInputEvent) => void) | undefined;
  onChange?: ((event: TextAreaChangeEvent) => void) | undefined;
}
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({ value = '', label, helper, errorMessage, placeholder, disabled = false, required = false, readOnly = false, minLength, maxLength, rows = 4, resize = 'vertical', showCount, 'show-count': showCountAttr, className, style, onInput, onChange, ...rest }, ref) {
  const [touched, setTouched] = React.useState(false);
  const hasError = touched && !!errorMessage && required && `${value}`.trim() === '';
  const helperText = hasError ? errorMessage : helper;
  const countVisible = showCountAttr ?? showCount ?? false;
  return <div className={cx(className)} style={{ display: 'inline-flex', flexDirection: 'column', gap: 'var(--vds-spacing-1)', fontFamily: 'var(--vds-font-family-sans)', color: 'var(--vds-theme-text-primary)', minWidth: '24ch', ...style }}>{label ? <label style={{ fontSize: 'var(--vds-type-role-label-size)', fontWeight: 'var(--vds-type-role-label-weight)' }}>{label}{required ? <span style={{ color: 'var(--vds-theme-destructive)' }}> *</span> : null}</label> : null}<div style={{ background: 'var(--vds-theme-bg-card)', border: `var(--vds-border-width-1) solid ${hasError ? 'var(--vds-theme-destructive)' : 'var(--vds-theme-border-default)'}`, borderRadius: 'var(--vds-radius-md)', padding: 'var(--vds-spacing-2) var(--vds-spacing-3)' }}><textarea {...rest} ref={ref} value={value} placeholder={placeholder} disabled={disabled} required={required} readOnly={readOnly} minLength={minLength} maxLength={maxLength} rows={rows} onInput={(event) => onInput?.(new CustomEvent('vds-input', { detail: { value: event.currentTarget.value } }))} onChange={(event) => onChange?.(new CustomEvent('vds-change', { detail: { value: event.currentTarget.value } }))} onBlur={() => setTouched(true)} style={{ all: 'unset', display: 'block', width: '100%', minHeight: 'calc(var(--vds-spacing-24))', font: 'inherit', fontSize: 'var(--vds-type-role-body-size)', lineHeight: 'var(--vds-type-role-body-lineheight)', color: 'var(--vds-theme-text-primary)', background: 'transparent', resize }} /></div><div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--vds-spacing-2)' }}>{helperText ? <div style={{ fontSize: 'var(--vds-type-role-caption-size)', color: hasError ? 'var(--vds-theme-destructive)' : 'var(--vds-theme-text-dim)' }}>{helperText}</div> : <span />}{countVisible ? <div aria-live="polite" style={{ fontSize: 'var(--vds-type-role-caption-size)', color: 'var(--vds-theme-text-dim)', fontVariantNumeric: 'tabular-nums' }}>{maxLength != null ? `${String(value).length} / ${maxLength}` : `${String(value).length}`}</div> : null}</div></div>;
});
