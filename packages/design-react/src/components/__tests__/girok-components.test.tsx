import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';

import { ActionRow, DualToggle, PickerButton, SearchField, SectionHeader } from '../..';
import { Calendar } from '../../icons/Calendar.js';

describe('girok components', () => {
  it('opens and clears SearchField with focus handoff', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function ControlledSearchField() {
      const [value, setValue] = React.useState('');
      return (
        <SearchField
          value={value}
          placeholder="Search records"
          toggleAriaLabel="Open search"
          closeAriaLabel="Close search"
          onChange={(nextValue) => {
            setValue(nextValue);
            onChange(nextValue);
          }}
        />
      );
    }

    render(<ControlledSearchField />);

    await user.click(screen.getByRole('button', { name: 'Open search' }));
    expect(screen.getByRole('searchbox')).toBe(document.activeElement);

    await user.type(screen.getByRole('searchbox'), 'rent');
    expect(onChange).toHaveBeenLastCalledWith('rent');

    await user.click(screen.getByRole('button', { name: 'Close search' }));
    expect(onChange).toHaveBeenLastCalledWith('');
    expect(screen.getByRole('button', { name: 'Open search' })).toBe(document.activeElement);
  });

  it('renders Girok composite classes and emits actions', async () => {
    const user = userEvent.setup();
    const onPick = vi.fn();
    const onToggle = vi.fn();
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();

    render(
      <>
        <SectionHeader icon={<Calendar />} iconTone="blue">
          Monthly summary
        </SectionHeader>
        <PickerButton label="May 2026" caret="right" onClick={onPick} />
        <DualToggle
          value="expense"
          expenseLabel="Expense"
          incomeLabel="Income"
          onChange={onToggle}
        />
        <ActionRow
          primaryLabel="Save"
          secondaryLabel="Cancel"
          primaryTone="rose"
          onPrimary={onPrimary}
          onSecondary={onSecondary}
        />
      </>,
    );

    expect(document.querySelector('.vds-pattern-girok-section-header__icon--blue')).toBeTruthy();
    expect(document.querySelector('.vds-pattern-girok-picker-button__caret')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'May 2026' }));
    expect(onPick).toHaveBeenCalled();

    await user.click(screen.getByRole('radio', { name: 'Income' }));
    expect(onToggle).toHaveBeenCalledWith('income');

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSecondary).toHaveBeenCalled();
    expect(onPrimary).toHaveBeenCalled();
  });
});
