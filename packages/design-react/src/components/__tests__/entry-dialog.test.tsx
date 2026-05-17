import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import { EntryDialog } from '../EntryDialog.js';

describe('EntryDialog', () => {
  it('renders and calls onConfirm', () => {
    const onConfirm = vi.fn();
    const onClose = vi.fn();
    const { getByText } = render(
      <EntryDialog open title="T" onClose={onClose} onConfirm={onConfirm}>
        <div>Body</div>
      </EntryDialog>,
    );
    fireEvent.click(getByText('확인'));
    expect(onConfirm).toHaveBeenCalled();
  });
});

