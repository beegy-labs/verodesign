import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import { ThemeToggle } from '../ThemeToggle.js';

describe('ThemeToggle', () => {
  it('calls onChange on click', () => {
    const onChange = vi.fn();
    const { getByRole } = render(<ThemeToggle value="auto" onChange={onChange} />);
    fireEvent.click(getByRole('radio', { name: /light/i }));
    expect(onChange).toHaveBeenCalledWith('light');
  });

  it('supports arrow key navigation', () => {
    const onChange = vi.fn();
    const { getByRole } = render(<ThemeToggle value="auto" onChange={onChange} />);
    const group = getByRole('radiogroup');
    fireEvent.keyDown(group, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('light');
  });
});

