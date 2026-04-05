// biome-ignore-all lint/style/noNonNullAssertion: This is a test file and we know the input will be present when we query for it, so it's safe to use non-null assertions here.

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import TextInput from './TextInput';

describe('TextInput', () => {
  const defaultMockProps = {
    label: 'First name',
    hint: 'What would you like us to call you?',
    error: 'First name cannot be empty'
  };

  it('renders', () => {
    render(<TextInput label={defaultMockProps.label} />);
    expect(screen.getByRole('textbox', { name: defaultMockProps.label })).toBeVisible();
    expect(screen.getByText(defaultMockProps.label)).toBeVisible();
  });

  it('renders with non visual label', () => {
    render(<TextInput aria-label={defaultMockProps.label} />);
    const input = screen.getByRole('textbox', { name: defaultMockProps.label });
    expect(screen.queryByText(defaultMockProps.label)).toBeNull();
  });

  it('renders with custom id', () => {
    const { container } = render(
      <TextInput
        label={defaultMockProps.label}
        id='custom-id'
        hint={defaultMockProps.hint}
        error={defaultMockProps.error}
      />
    );
    const input = screen.getByRole('textbox', { name: defaultMockProps.label });
    const hint = screen.getByText(defaultMockProps.hint);
    const error = screen.getByText(defaultMockProps.error);

    expect(container.firstChild).toHaveAttribute('id', 'custom-id');
    expect(input).toHaveAttribute('id', 'custom-id__input');
    expect(hint).toHaveAttribute('id', 'custom-id__hint');
    expect(error).toHaveAttribute('id', 'custom-id__error');
  });

  it('renders with custom css class', () => {
    render(<TextInput label={defaultMockProps.label} className='custom-class' />);
    const input = screen.getByRole('textbox', { name: defaultMockProps.label });
    expect(input.parentElement).toHaveClass(/custom-class/);
  });

  it('disables the input when disabled prop is true', () => {
    render(<TextInput label={defaultMockProps.label} isDisabled />);
    const input = screen.getByRole('textbox', { name: defaultMockProps.label });
    expect(input).toBeDisabled();
  });

  it('handles input changes', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(<TextInput label={defaultMockProps.label} onChange={mockOnChange} />);
    const input = screen.getByRole('textbox', { name: defaultMockProps.label });
    await user.type(input, 'John');
    expect(input).toHaveValue('John');
    expect(mockOnChange).toHaveBeenCalledTimes(4);
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: 'John' }) })
    );
  });

  it('forwards ref correctly', () => {
    let ref: HTMLInputElement | null = null;
    render(
      <TextInput
        ref={el => {
          ref = el;
        }}
        label={defaultMockProps.label}
      />
    );
    const input = screen.getByRole('textbox', { name: defaultMockProps.label });
    ref!.focus();

    expect(ref).toBe(input);
    expect(input).toHaveFocus();
  });

  it('passes through standard input attributes', () => {
    render(<TextInput label={defaultMockProps.label} maxLength={50} required={true} />);
    const input = screen.getByRole('textbox', {
      name: defaultMockProps.label
    }) as HTMLInputElement;
    expect(input.maxLength).toBe(50);
    expect(input.required).toBe(true);
  });

  it('generates unique IDs for multiple instances', () => {
    render(
      <>
        <TextInput label={defaultMockProps.label} />
        <TextInput label={defaultMockProps.label} />
      </>
    );
    const inputs = screen.getAllByRole('textbox');
    const firstId = inputs[0].id;
    const secondId = inputs[1].id;
    expect(firstId).not.toBe(secondId);
  });

  it('displays displayName for debugging', () => {
    expect(TextInput.displayName).toBe('TextInput');
  });

  describe('CSS class names', () => {
    it('renders elements with correct class names', () => {
      render(
        <TextInput
          label={defaultMockProps.label}
          hint={defaultMockProps.hint}
          error={defaultMockProps.error}
        />
      );
      const input = screen.getByRole('textbox', { name: defaultMockProps.label });
      const wrapper = input.parentElement;
      const label = screen.getByText(defaultMockProps.label);
      const hint = screen.getByText(defaultMockProps.hint);
      const error = screen.getByText(defaultMockProps.error);

      expect(wrapper).toHaveClass(/_wrapper_/);
      expect(wrapper).toHaveClass(/is-error/);
      expect(input).toHaveClass(/_input_/);
      expect(label).toHaveClass(/_label_/);
      expect(hint).toHaveClass(/_hint_/);
      expect(error).toHaveClass(/_error_/);
    });

    it('renders elements with correct class names with custom class', () => {
      render(
        <TextInput
          className='my-custom-class'
          label={defaultMockProps.label}
          hint={defaultMockProps.hint}
          error={defaultMockProps.error}
        />
      );
      const input = screen.getByRole('textbox', { name: defaultMockProps.label });
      const wrapper = input.parentElement;
      const label = screen.getByText(defaultMockProps.label);
      const hint = screen.getByText(defaultMockProps.hint);
      const error = screen.getByText(defaultMockProps.error);

      expect(wrapper).toHaveClass(/_wrapper_/);
      expect(wrapper).toHaveClass(/my-custom-class/);
      expect(wrapper).toHaveClass(/is-error/);
      expect(input).toHaveClass(/_input_/);
      expect(label).toHaveClass(/_label_/);
      expect(hint).toHaveClass(/_hint_/);
      expect(error).toHaveClass(/_error_/);
    });
  });

  describe('ARIA description associations', () => {
    it('renders with hint text', () => {
      render(<TextInput label={defaultMockProps.label} hint={defaultMockProps.hint} />);
      const input = screen.getByRole('textbox', { name: defaultMockProps.label });
      const hint = screen.getByText(defaultMockProps.hint);
      expect(hint).toBeVisible();
      expect(input).toHaveAttribute('aria-describedby', hint.getAttribute('id'));
    });

    it('renders error state', () => {
      const { container } = render(
        <TextInput label={defaultMockProps.label} error={defaultMockProps.error} />
      );
      const input = screen.getByRole('textbox', { name: defaultMockProps.label });
      const error = screen.getByText(defaultMockProps.error);

      expect(error).toBeVisible();
      expect(input).toHaveAttribute('aria-describedby', error.getAttribute('id'));
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(container.firstChild).toHaveClass(/is-error/);
    });

    it('renders with hint and error text', () => {
      render(
        <TextInput
          label={defaultMockProps.label}
          hint={defaultMockProps.hint}
          error={defaultMockProps.error}
        />
      );
      const input = screen.getByRole('textbox', { name: defaultMockProps.label });
      const hint = screen.getByText(defaultMockProps.hint);
      const error = screen.getByText(defaultMockProps.error);

      expect(input).toHaveAttribute(
        'aria-describedby',
        `${hint.getAttribute('id')} ${error.getAttribute('id')}`
      );
    });
  });
});
