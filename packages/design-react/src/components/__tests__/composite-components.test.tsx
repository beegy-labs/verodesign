import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DateGrid, Progress, SettingsRow, Tab, TabPanel, Tabs } from '../..';

describe('composite components', () => {
  it('renders progress semantics and settings row content', async () => {
    const onClick = vi.fn();
    render(
      <>
        <Progress value={50} label="Portfolio progress" />
        <SettingsRow title="KIS credentials" description="API connected" chevron onClick={onClick} />
      </>,
    );

    expect(screen.getByRole('progressbar', { name: 'Portfolio progress' })).toBeTruthy();
    const button = screen.getByRole('button', { name: /KIS credentials/i });
    expect(button).toBeTruthy();
    await userEvent.setup().click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('wires date select and preserves tabs slide prop rendering path', async () => {
    const onSelect = vi.fn();
    render(
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

    await userEvent.setup().click(screen.getByRole('button', { name: '20' }));
    expect(onSelect).toHaveBeenCalledWith('2026-07-20');
    expect(screen.getByRole('tab', { name: 'Analysis' })).toBeTruthy();
  });
});
