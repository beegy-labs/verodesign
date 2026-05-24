import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import { CompactRow } from '../CompactRow.js';

describe('CompactRow', () => {
  it('renders label/meta and supports click', () => {
    const onClick = vi.fn();
    const { container } = render(
      <CompactRow label="Hello" meta="Meta" onClick={onClick} />,
    );
    const row = container.querySelector('vds-compact-row');
    expect(row).toBeTruthy();
    fireEvent.click(row as Element);
    expect(onClick).toHaveBeenCalled();
  });

  it('renders anchor and disabled state with backward-compatible props', () => {
    const { container } = render(
      <CompactRow label="Hello" meta="Meta" as="link" href="/settings" disabled />,
    );
    const row = container.querySelector('vds-compact-row');
    expect(row?.getAttribute('as')).toBe('link');
    expect(row?.getAttribute('disabled')).not.toBeNull();
  });
});
