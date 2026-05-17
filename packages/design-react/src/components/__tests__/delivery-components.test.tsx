import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../Button.js';
import { AppShell } from '../AppShell.js';
import { Card } from '../Card.js';
import { IconButton } from '../IconButton.js';
import { PageHeader } from '../PageHeader.js';
import { StatTile } from '../StatTile.js';
import { Tab, TabPanel, Tabs } from '../Tabs.js';

describe('design-react delivery components', () => {
  it('renders button variants, sizes, and children', () => {
    render(
      <Button variant="ghost" size="lg">
        <span>Save</span>
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('data-variant', 'ghost');
    expect(button).toHaveAttribute('data-size', 'lg');
    expect(button.textContent).toContain('Save');
  });

  it('renders app shell fixed regions without creating a nested scroller', () => {
    render(
      <AppShell header={<div>Header</div>} bottomNav={<div>Bottom</div>}>
        <main>Content</main>
      </AppShell>,
    );

    expect(screen.getByText('Header').parentElement).toHaveAttribute('data-vds-app-shell', 'header');
    expect(screen.getByText('Bottom').parentElement).toHaveAttribute('data-vds-app-shell', 'bottom-nav');
    expect(screen.getByText('Content').parentElement).toHaveAttribute('data-vds-app-shell', 'content');
    expect(screen.getByText('Content').parentElement?.style.overflow).toBe('');
  });

  it('renders icon button with aria-label and child content', () => {
    render(
      <IconButton ariaLabelText="Close">
        <span aria-hidden="true">x</span>
      </IconButton>,
    );

    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
    expect(screen.getByText('x')).toBeTruthy();
  });

  it('renders card slot content without throwing', () => {
    render(
      <Card>
        <div slot="header">Header</div>
        <div>Body</div>
        <div slot="footer">Footer</div>
      </Card>,
    );

    expect(screen.getByText('Header')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
    expect(screen.getByText('Footer')).toBeTruthy();
  });

  it('renders stat tile props and icon slot', () => {
    render(
      <StatTile label="Revenue" value="$100" delta="+8%" hint="vs last week">
        <span slot="icon">i</span>
      </StatTile>,
    );

    expect(screen.getByText('Revenue')).toBeTruthy();
    expect(screen.getByText('$100')).toBeTruthy();
    expect(screen.getByText('+8%')).toBeTruthy();
    expect(screen.getByText('vs last week')).toBeTruthy();
    expect(screen.getByText('i')).toBeTruthy();
  });

  it('renders tabs, panels, and emits change', () => {
    const onChange = vi.fn();
    render(
      <Tabs onChange={onChange}>
        <Tab value="one">One</Tab>
        <Tab value="two">Two</Tab>
        <TabPanel value="one">Panel One</TabPanel>
        <TabPanel value="two">Panel Two</TabPanel>
      </Tabs>,
    );

    expect(screen.getByRole('tablist')).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel One')).toBeTruthy();
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByText('Panel Two')).toBeTruthy();
  });

  it('renders page header heading, subtitle, and slotted actions', () => {
    render(
      <PageHeader heading="Dashboard" subtitle="Overview">
        <button slot="actions">Refresh</button>
      </PageHeader>,
    );

    expect(screen.getByRole('banner')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeTruthy();
    expect(screen.getByText('Overview')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeTruthy();
  });
});
