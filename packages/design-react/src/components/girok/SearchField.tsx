import * as React from 'react';

import { cx, mergeRefs } from '../_internal.js';
import { X } from '../../icons/X.js';

export interface SearchFieldProps {
  value: string;
  placeholder: string;
  toggleAriaLabel: string;
  closeAriaLabel: string;
  className?: string;
  onChange: (value: string) => void;
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { value, placeholder, toggleAriaLabel, closeAriaLabel, className, onChange },
  forwardedRef,
) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const toggleRef = React.useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(() => value.trim().length > 0);

  React.useEffect(() => {
    if (value.trim().length > 0) {
      setIsOpen(true);
    }
  }, [value]);

  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isOpen]);

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    onChange('');
    setIsOpen(false);
    toggleRef.current?.focus();
  }, [onChange]);

  return (
    <div className={cx('vds-pattern-girok-search-field', className)}>
      <button
        ref={toggleRef}
        type="button"
        className="vds-pattern-girok-search-field__toggle"
        aria-label={toggleAriaLabel}
        aria-expanded={isOpen}
        onClick={handleOpen}
      >
        <SearchIcon />
      </button>
      <div className={cx('vds-pattern-girok-search-field__panel', isOpen && 'is-open')}>
        <input
          ref={(node) => {
            inputRef.current = node;
            mergeRefs(forwardedRef, node);
          }}
          type="search"
          value={value}
          placeholder={placeholder}
          className="vds-pattern-girok-search-field__input"
          onChange={(event) => onChange(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              handleClose();
            }
          }}
        />
        <button
          type="button"
          className="vds-pattern-girok-search-field__close"
          aria-label={closeAriaLabel}
          onClick={handleClose}
        >
          <X aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});
