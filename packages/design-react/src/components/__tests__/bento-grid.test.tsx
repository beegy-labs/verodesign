import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import { BentoGrid } from '../BentoGrid.js';
import { BentoItem } from '../BentoItem.js';

describe('BentoGrid', () => {
  it('renders items with spans', () => {
    const { getByText } = render(
      <BentoGrid>
        <BentoItem colSpan={4}>A</BentoItem>
        <BentoItem colSpan={2} rowSpan={2}>
          B
        </BentoItem>
      </BentoGrid>,
    );
    expect(getByText('A')).toBeTruthy();
    expect(getByText('B')).toBeTruthy();
  });
});

