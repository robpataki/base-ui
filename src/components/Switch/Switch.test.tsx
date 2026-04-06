// biome-ignore-all lint/style/noNonNullAssertion: This is a test file and we know the input will be present when we query for it, so it's safe to use non-null assertions here.

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  const defaultMockProps = {
    label: 'Beast mode',
    statusLabelOn: 'Enabled',
    statusLabelOff: 'Disabled'
  };

  it('renders', () => {
    render(<Switch label={defaultMockProps.label} />);

    expect(screen.getByRole('checkbox', { name: defaultMockProps.label })).toBeVisible();
  });

  describe('Status labels', () => {
    it('renders default status labels', async () => {
      const user = userEvent.setup();
      render(<Switch label={defaultMockProps.label} />);
      const checkbox = screen.getByRole('checkbox', { name: defaultMockProps.label });

      expect(screen.getByText('OFF')).toBeVisible();

      await user.click(checkbox);

      expect(screen.getByText('ON')).toBeVisible();
    });

    it('renders custom status labels', async () => {
      const user = userEvent.setup();
      render(
        <Switch
          label={defaultMockProps.label}
          statusLabelOn={defaultMockProps.statusLabelOn}
          statusLabelOff={defaultMockProps.statusLabelOff}
        />
      );
      const checkbox = screen.getByRole('checkbox', { name: defaultMockProps.label });

      expect(screen.getByText('Disabled')).toBeVisible();

      await user.click(checkbox);

      expect(screen.getByText('Enabled')).toBeVisible();
    });

    it('renders without status labels when isStatusLabelVisible is false', async () => {
      const user = userEvent.setup();
      render(<Switch label={defaultMockProps.label} isStatusLabelVisible={false} />);
      const checkbox = screen.getByRole('checkbox', { name: defaultMockProps.label });

      expect(screen.queryByText('OFF')).toBeNull();

      await user.click(checkbox);

      expect(screen.queryByText('ON')).toBeNull();
    });
  });

  describe('checkbox operations', () => {
    it('functions as a controlled component', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(
        <Switch label={defaultMockProps.label} isSwitched onChange={mockOnChange} />
      );
      const checkbox = screen.getByRole('checkbox', {
        name: defaultMockProps.label
      });
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(false);
    });

    it('functions as an uncontrolled component', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(
        <Switch
          label={defaultMockProps.label}
          isDefaultSwitched
          onChange={mockOnChange}
        />
      );
      const checkbox = screen.getByRole('checkbox', {
        name: defaultMockProps.label
      });
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      expect(mockOnChange).toHaveBeenCalledTimes(2);
      const mockCalls = mockOnChange.mock.calls;
      expect(mockCalls[0]).toEqual([false]);
      expect(mockCalls[1]).toEqual([true]);
    });

    it('disables the checkbox when isDisabled prop is true (uncontrolled mode)', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      const { container } = render(
        <Switch label={defaultMockProps.label} isDisabled onChange={mockOnChange} />
      );
      const checkbox = screen.getByRole('checkbox', { name: defaultMockProps.label });
      expect(container.firstChild).toHaveClass(/is-disabled/);
      expect(checkbox).not.toBeChecked();
      await user.click(checkbox);
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
      expect(mockOnChange).toHaveBeenCalledTimes(0);
    });
  });

  it('renders with custom id', () => {
    const { container } = render(
      <Switch label={defaultMockProps.label} id="my-switch" />
    );
    expect(container.firstChild).toHaveAttribute('id', 'my-switch');

    const checkbox = screen.getByRole('checkbox', { name: defaultMockProps.label });
    expect(checkbox).toHaveAttribute('id', 'my-switch__input');
  });

  it('generates unique IDs when id prop is not set', () => {
    const { container } = render(
      <>
        <Switch label="Outdoor lights" />
        <Switch label="Indoor lights" />
      </>
    );
    const outdoorLightSwitchId = container.children[0].getAttribute('id');
    const indoorLightSwitchId = container.children[1].getAttribute('id');
    expect(outdoorLightSwitchId).not.toBe(indoorLightSwitchId);

    const outdoorLightCheckbox = screen.getByRole('checkbox', { name: 'Outdoor lights' });
    const indoorLightCheckbox = screen.getByRole('checkbox', { name: 'Indoor lights' });

    expect(outdoorLightCheckbox).toHaveAttribute('id', `${outdoorLightSwitchId}__input`);
    expect(indoorLightCheckbox).toHaveAttribute('id', `${indoorLightSwitchId}__input`);
  });

  it('renders with custom data-testid', () => {
    render(<Switch label={defaultMockProps.label} dataTestId="my-switch" />);
    expect(screen.getByTestId('my-switch')).toBeVisible();
  });

  it('forwards ref correctly', () => {
    let ref: HTMLInputElement | null = null;
    render(
      <Switch
        ref={el => {
          ref = el;
        }}
        label={defaultMockProps.label}
      />
    );
    const checkbox = screen.getByRole('checkbox', { name: defaultMockProps.label });
    ref!.focus();

    expect(ref).toBe(checkbox);
    expect(checkbox).toHaveFocus();
  });

  describe('CSS class names', () => {
    it('renders elements with correct class names', () => {
      const { container } = render(<Switch label={defaultMockProps.label} />);
      const wrapper = container.firstChild;
      const checkbox = screen.getByRole('checkbox', { name: defaultMockProps.label });
      const label = screen.getByText(defaultMockProps.label);
      const statusLabel = screen.getByText('OFF');

      expect(wrapper).toHaveClass(/a1-switch/);
      expect(wrapper).toHaveClass(/wrapper/);
      expect(checkbox).toHaveClass(/input/);
      expect(label).toHaveClass(/label/);
      expect(statusLabel).toHaveClass(/status-label/);

      expect(container.querySelector('[class*="toggle"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="toggle-inner"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="indicator"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="indicator-inner"]')).toBeInTheDocument();
    });

    it('renders elements with correct class names with custom class', () => {
      const { container } = render(
        <Switch label={defaultMockProps.label} className="my-switch" />
      );
      const wrapper = container.firstChild;

      expect(wrapper).toHaveClass(/a1-switch/);
      expect(wrapper).toHaveClass(/wrapper/);
      expect(wrapper).toHaveClass('my-switch');
    });
  });

  it('is fully keyboard operable', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(<Switch label={defaultMockProps.label} onChange={mockOnChange} />);
    const checkbox = screen.getByRole('checkbox', { name: defaultMockProps.label });

    await user.tab();
    expect(checkbox).toHaveFocus();
    await user.keyboard('[Space]');
    expect(checkbox).toBeChecked();
    await user.keyboard('[Space]');
    expect(checkbox).not.toBeChecked();
    await user.keyboard('[Enter]');
    expect(checkbox).not.toBeChecked();
    expect(mockOnChange).toHaveBeenCalledTimes(2);
  });

  it('uses correct displayName for debugging', () => {
    expect(Switch.displayName).toBe('Switch');
  });
});
