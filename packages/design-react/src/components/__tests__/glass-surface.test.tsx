import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import { GlassSurface } from '../GlassSurface.js';

describe('GlassSurface', () => {
  it('renders children', () => {
    const { getByText } = render(<GlassSurface>Hi</GlassSurface>);
    expect(getByText('Hi')).toBeTruthy();
  });
});

