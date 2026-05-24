import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { BinaryPillToggle } from '../BinaryPillToggle.js';

describe('BinaryPillToggle', () => {
  it('renders radiogroup semantics and notifies on arrow navigation', () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <BinaryPillToggle
        aria-label="Type"
        value="income"
        options={[
          { value: 'income', label: 'Income' },
          { value: 'expense', label: 'Expense' },
        ]}
        onValueChange={onValueChange}
      />,
    );

    const root = container.querySelector('vds-binary-pill-toggle')!;
    const first = container.querySelector('vds-binary-pill-toggle-option')!;
    expect(root.getAttribute('aria-label')).toBe('Type');
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    root.dispatchEvent(new CustomEvent('vds-change', { detail: { value: 'expense' } }));
    expect(onValueChange).toHaveBeenCalledWith('expense');
  });
});
