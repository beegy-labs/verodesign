import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Calendar, X } from '..';

describe('icon adapters', () => {
  it('renders the requested icons through vds-icon', () => {
    const { container } = render(
      <>
        <Calendar size={24} aria-label="Calendar" data-testid="calendar" />
        <X size="sm" data-testid="close" />
      </>,
    );

    const icons = Array.from(container.querySelectorAll('vds-icon'));
    expect(icons).toHaveLength(2);
    expect(icons[0]?.getAttribute('name')).toBe('calendar');
    expect(icons[0]?.getAttribute('size')).toBe('24');
    expect(icons[0]?.getAttribute('aria-label')).toBe('Calendar');
    expect(icons[1]?.getAttribute('name')).toBe('x');
    expect(icons[1]?.getAttribute('size')).toBe('sm');
  });
});
