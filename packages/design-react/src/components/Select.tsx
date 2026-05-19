import * as React from 'react';
import { cx, focusRing } from './_internal.js';

export type SelectChangeEvent = CustomEvent<{ value: string }>;
export interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  selected?: boolean;
  disabled?: boolean;
}
export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  placeholder?: string;
  label?: string;
  helper?: string;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  onChange?: ((event: SelectChangeEvent) => void) | undefined;
}
export const Option = React.forwardRef<HTMLDivElement, OptionProps>(function Option(props, ref) {
  return <div {...props} ref={ref} />;
});
export const Select = React.forwardRef<HTMLDivElement, SelectProps>(function Select(
  { value = '', placeholder = 'Select…', label, helper, errorMessage, disabled = false, required = false, name, onChange, className, children, style, ...rest },
  ref,
) {
  const [open, setOpen] = React.useState(false);
  const optionElements = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<OptionProps>[];
  const selected = optionElements.find((child) => child.props.value === value);
  const [activeIndex, setActiveIndex] = React.useState(() => Math.max(0, optionElements.findIndex((child) => child.props.value === value)));
  const helperText = errorMessage ?? helper ?? '';
  const listboxId = React.useId();
  return (
    <div
      {...rest}
      ref={ref}
      className={cx(className)}
      onKeyDown={(event) => {
        if (disabled) return;
        if (!open && (event.key === ' ' || event.key === 'Enter' || event.key === 'ArrowDown')) { event.preventDefault(); setOpen(true); return; }
        if (!open) return;
        if (event.key === 'Escape') { event.preventDefault(); setOpen(false); return; }
        if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((idx) => Math.min(optionElements.length - 1, idx + 1)); }
        if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((idx) => Math.max(0, idx - 1)); }
        if (event.key === 'Home') { event.preventDefault(); setActiveIndex(0); }
        if (event.key === 'End') { event.preventDefault(); setActiveIndex(optionElements.length - 1); }
        if ((event.key === 'Enter' || event.key === ' ') && optionElements[activeIndex]) {
          event.preventDefault();
          onChange?.(new CustomEvent('change', { detail: { value: optionElements[activeIndex].props.value ?? '' } }));
          setOpen(false);
        }
      }}
      style={{ display: 'inline-flex', flexDirection: 'column', gap: 'var(--vds-spacing-1)', fontFamily: 'var(--vds-font-family-sans)', width: '100%', ...style }}
    >
      {label ? <span style={{ fontSize: 'var(--vds-type-role-label-size)', fontWeight: 'var(--vds-type-role-label-weight)', color: 'var(--vds-theme-text-primary)' }}>{label}{required ? <span style={{ color: 'var(--vds-theme-destructive)' }}> *</span> : null}</span> : null}
      <input type="hidden" name={name} value={value} />
      <div style={{ position: 'relative', width: '100%' }}>
        <button type="button" role="combobox" aria-expanded={open} aria-haspopup="listbox" aria-controls={listboxId} disabled={disabled} onClick={() => setOpen((v) => !v)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--vds-spacing-2)', width: '100%', minHeight: 'calc(var(--vds-spacing-10))', padding: 'var(--vds-spacing-2) var(--vds-spacing-3)', background: 'var(--vds-theme-bg-card)', color: 'var(--vds-theme-text-primary)', border: 'var(--vds-border-width-1) solid var(--vds-theme-border-default)', borderRadius: 'var(--vds-radius-md)', fontSize: 'var(--vds-type-role-label-size)', cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none', opacity: disabled ? 0.5 : 1, ...focusRing, outline: 'none' }}>
          <span style={{ color: selected ? undefined : 'var(--vds-theme-text-faint)' }}>{selected?.props.children ?? placeholder}</span>
          <span aria-hidden="true">⌄</span>
        </button>
        {open ? <div id={listboxId} role="listbox" style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 'var(--vds-spacing-1)', background: 'var(--vds-theme-bg-card)', border: 'var(--vds-border-width-1) solid var(--vds-theme-border-default)', borderRadius: 'var(--vds-radius-md)', boxShadow: 'var(--vds-shadow-3)', zIndex: 'var(--vds-zindex-popover, 500)', maxHeight: 'calc(var(--vds-spacing-64) - var(--vds-spacing-4))', overflowY: 'auto', padding: 'var(--vds-spacing-1) 0' }}>
          {optionElements.map((child, index) => {
            const optionValue = child.props.value ?? '';
            const isSelected = optionValue === value;
            const isActive = index === activeIndex;
            return React.cloneElement(child, {
              key: optionValue || index,
              role: 'option',
              'aria-selected': isSelected,
              onClick: () => { if (!child.props.disabled) { onChange?.(new CustomEvent('change', { detail: { value: optionValue } })); setOpen(false); } },
              style: {
                display: 'block',
                padding: 'var(--vds-spacing-2) var(--vds-spacing-3)',
                cursor: child.props.disabled ? 'not-allowed' : 'pointer',
                userSelect: 'none',
                color: isSelected ? 'var(--vds-theme-primary)' : 'var(--vds-theme-text-primary)',
                background: isSelected ? 'color-mix(in oklab, var(--vds-theme-primary) 12%, transparent)' : isActive ? 'var(--vds-theme-bg-hover)' : 'transparent',
                opacity: child.props.disabled ? 0.5 : 1,
                ...(child.props.style ?? {}),
              },
            });
          })}
        </div> : null}
      </div>
      {helperText ? <span style={{ fontSize: 'var(--vds-type-role-caption-size)', color: errorMessage ? 'var(--vds-theme-destructive)' : 'var(--vds-theme-text-dim)' }}>{helperText}</span> : null}
    </div>
  );
});
