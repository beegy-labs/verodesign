import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import {
  Badge,
  Checkbox,
  Dialog,
  Menu,
  MenuItem,
  Select,
  Option,
  Switch,
  Table,
  Th,
  TextArea,
  TextField,
  Toast,
  ToastGroup,
  Tooltip,
} from '../..';

describe('hand-written primitives', () => {
  it('renders text field and text area labels', () => {
    render(
      <>
        <TextField label="Name" value="Vero" />
        <TextArea label="Memo" value="Hello" />
      </>,
    );
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Memo')).toBeTruthy();
  });

  it('fires checkbox and switch custom events', async () => {
    const user = userEvent.setup();
    const onCheckbox = vi.fn();
    const onSwitch = vi.fn();
    render(
      <>
        <Checkbox checked={false} onChange={onCheckbox}>Accept</Checkbox>
        <Switch checked={false} onChange={onSwitch}>Mode</Switch>
      </>,
    );
    await user.click(screen.getByText('Accept'));
    await user.click(screen.getByText('Mode'));
    expect(onCheckbox).toHaveBeenCalled();
    expect(onSwitch).toHaveBeenCalled();
  });

  it('supports dialog, menu, select, toast, tooltip, and table semantics', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onSelect = vi.fn();
    const onChange = vi.fn();
    const onDismiss = vi.fn();
    render(
      <>
        <Dialog open onClose={onClose}>
          <span slot="title">Dialog title</span>
          Body
          <button slot="footer" type="button">Close</button>
        </Dialog>
        <Menu onSelect={onSelect}>
          <button slot="trigger" type="button">Open menu</button>
          <MenuItem value="alpha">Alpha</MenuItem>
        </Menu>
        <Select value="" onChange={onChange} placeholder="Pick one">
          <Option value="a">Alpha</Option>
        </Select>
        <ToastGroup>
          <Toast toastTitle="Saved" onDismiss={onDismiss} />
        </ToastGroup>
        <Tooltip>
          <button slot="trigger" type="button">Hover me</button>
          Tip copy
        </Tooltip>
        <Table>
          <thead>
            <tr>
              <Th>Head</Th>
            </tr>
          </thead>
        </Table>
        <Badge>Ready</Badge>
      </>,
    );
    expect(screen.getByRole('dialog')).toBeTruthy();
    await user.click(screen.getByText('Open menu'));
    await user.click(screen.getByText('Alpha'));
    expect(onSelect).toHaveBeenCalled();
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Alpha'));
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole('region', { name: 'Notifications' })).toBeTruthy();
    expect(screen.getByRole('tooltip')).toBeTruthy();
    expect(screen.getByRole('table')).toBeTruthy();
    expect(screen.getByText('Ready')).toBeTruthy();
  });
});
