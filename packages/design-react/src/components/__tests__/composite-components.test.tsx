import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DateGrid, Progress, SettingsRow, Tab, TabPanel, Tabs } from '../..';

// Progress / SettingsRow / DateGrid are thin React wrappers over the vds-*
// Lit web components. jsdom does not upgrade custom elements, so their shadow
// DOM (progressbar, row button, day buttons) never renders here. These tests
// therefore assert the wrapper CONTRACT — tag, prop→attribute mapping, and the
// event bridge — not the web component's internal accessibility tree (that is
// covered by @verobee/design-elements' in-browser suite).
describe('composite components', () => {
  it('renders progress semantics and settings row content', async () => {
    const onClick = vi.fn();
    const { container } = render(
      <>
        <Progress value={50} label="Portfolio progress" />
        <SettingsRow title="KIS credentials" description="API connected" chevron onClick={onClick} />
      </>,
    );

    const progress = container.querySelector('vds-progress');
    expect(progress).toHaveAttribute('value', '50');
    expect(progress).toHaveAttribute('aria-label', 'Portfolio progress');

    const settingsRow = container.querySelector('vds-settings-row');
    expect(settingsRow).toHaveAttribute('row-label', 'KIS credentials');
    expect(settingsRow).toHaveAttribute('description', 'API connected');
    await userEvent.setup().click(settingsRow as Element);
    expect(onClick).toHaveBeenCalled();
  });

  it('wires date select and preserves tabs slide prop rendering path', async () => {
    const onSelect = vi.fn();
    const { container } = render(
      <>
        <DateGrid year={2026} month={7} selectedDate="2026-07-20" onSelect={onSelect} />
        <Tabs variant="segmented" indicator="slide" value="analysis">
          <Tab value="ledger">Ledger</Tab>
          <Tab value="analysis">Analysis</Tab>
          <TabPanel value="ledger">Ledger panel</TabPanel>
          <TabPanel value="analysis">Analysis panel</TabPanel>
        </Tabs>
      </>,
    );

    // Exercise the wrapper's event bridge: DateGrid forwards the web component's
    // `vds-date-select` CustomEvent detail to onSelect.
    const dateGrid = container.querySelector('vds-date-grid') as Element;
    fireEvent(dateGrid, new CustomEvent('vds-date-select', { detail: { date: '2026-07-20' } }));
    expect(onSelect).toHaveBeenCalledWith('2026-07-20');

    // Tabs is a real React component and renders in jsdom.
    expect(screen.getByRole('tab', { name: 'Analysis' })).toBeTruthy();
  });
});
