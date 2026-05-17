import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import { CompactRow } from '../CompactRow.js';

describe('CompactRow', () => {
  it('renders label/meta and supports click', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <CompactRow label="Hello" meta="Meta" onClick={onClick} />,
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});

