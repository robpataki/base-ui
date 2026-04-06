// biome-ignore-all lint/style/noNonNullAssertion: This is a test file and we know the input will be present when we query for it, so it's safe to use non-null assertions here.

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  const defaultMockProps = {
    label: 'List of ingredients',
    hint: 'Onions, garlic, peppers...',
    error: "Ingredients can't be empty"
  };

  it('renders', () => {
    render(<TextArea label={defaultMockProps.label} />);
    expect(screen.getByRole('textbox', { name: defaultMockProps.label })).toBeVisible();
    expect(screen.getByText(defaultMockProps.label)).toBeVisible();
  });

  it('renders with non visual label', () => {
    render(<TextArea aria-label={defaultMockProps.label} />);
    expect(screen.getByRole('textbox', { name: defaultMockProps.label })).toBeVisible();
    expect(screen.queryByText(defaultMockProps.label)).toBeNull();
  });

  it('renders with custom id', () => {
    const { container } = render(
      <TextArea
        label={defaultMockProps.label}
        id="custom-id"
        hint={defaultMockProps.hint}
        error={defaultMockProps.error}
      />
    );
    const textarea = screen.getByRole('textbox', { name: defaultMockProps.label });
    const hint = screen.getByText(defaultMockProps.hint);
    const error = screen.getByText(defaultMockProps.error);

    expect(container.firstChild).toHaveAttribute('id', 'custom-id');
    expect(textarea).toHaveAttribute('id', 'custom-id__textarea');
    expect(hint).toHaveAttribute('id', 'custom-id__hint');
    expect(error).toHaveAttribute('id', 'custom-id__error');
  });

  it('renders with custom css class', () => {
    render(<TextArea label={defaultMockProps.label} className="custom-class" />);
    const textarea = screen.getByRole('textbox', { name: defaultMockProps.label });
    expect(textarea.parentElement).toHaveClass(/custom-class/);
  });

  it('disables the textarea when isDisabled prop is true', () => {
    const { container } = render(<TextArea label={defaultMockProps.label} isDisabled />);
    const textarea = screen.getByRole('textbox', { name: defaultMockProps.label });
    expect(container.firstChild).toHaveClass(/is-disabled/);
    expect(textarea).toBeDisabled();
  });

  it('handles input changes', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(<TextArea label={defaultMockProps.label} onChange={mockOnChange} />);
    const textarea = screen.getByRole('textbox', { name: defaultMockProps.label });
    await user.type(textarea, 'John');
    expect(textarea).toHaveValue('John');
    expect(mockOnChange).toHaveBeenCalledTimes(4);
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: 'John' }) })
    );
  });

  it('forwards ref correctly', () => {
    let ref: HTMLTextAreaElement | null = null;
    render(
      <TextArea
        ref={el => {
          ref = el;
        }}
        label={defaultMockProps.label}
      />
    );
    const textarea = screen.getByRole('textbox', { name: defaultMockProps.label });
    ref!.focus();

    expect(ref).toBe(textarea);
    expect(textarea).toHaveFocus();
  });

  it('passes through standard textarea attributes', () => {
    render(
      <TextArea
        label={defaultMockProps.label}
        maxLength={50}
        required={true}
        name="ingredients"
        rows={10}
      />
    );
    const input = screen.getByRole('textbox', {
      name: defaultMockProps.label
    }) as HTMLTextAreaElement;
    expect(input.maxLength).toBe(50);
    expect(input.rows).toBe(10);
    expect(input.name).toBe('ingredients');
    expect(input.required).toBe(true);
  });

  it('generates unique IDs for multiple instances', () => {
    render(
      <>
        <TextArea label={defaultMockProps.label} />
        <TextArea label={defaultMockProps.label} />
      </>
    );
    const textareas = screen.getAllByRole('textbox');
    const firstId = textareas[0].id;
    const secondId = textareas[1].id;
    expect(firstId).not.toBe(secondId);
  });

  describe('CSS class names', () => {
    it('renders elements with correct class names', () => {
      render(
        <TextArea
          label={defaultMockProps.label}
          hint={defaultMockProps.hint}
          error={defaultMockProps.error}
        />
      );
      const textarea = screen.getByRole('textbox', { name: defaultMockProps.label });
      const wrapper = textarea.parentElement;
      const label = screen.getByText(defaultMockProps.label);
      const hint = screen.getByText(defaultMockProps.hint);
      const error = screen.getByText(defaultMockProps.error);

      expect(wrapper).toHaveClass(/a1-text-area/);
      expect(wrapper).toHaveClass(/wrapper/);
      expect(wrapper).toHaveClass(/is-error/);
      expect(textarea).toHaveClass(/textarea/);
      expect(label).toHaveClass(/label/);
      expect(hint).toHaveClass(/hint/);
      expect(error).toHaveClass(/error/);
    });

    it('renders elements with correct class names with custom class', () => {
      render(
        <TextArea
          className="my-custom-class"
          label={defaultMockProps.label}
          hint={defaultMockProps.hint}
          error={defaultMockProps.error}
        />
      );
      const textarea = screen.getByRole('textbox', { name: defaultMockProps.label });
      const wrapper = textarea.parentElement;

      expect(wrapper).toHaveClass(/a1-text-area/);
      expect(wrapper).toHaveClass(/wrapper/);
      expect(wrapper).toHaveClass(/my-custom-class/);
    });
  });

  describe('ARIA description associations', () => {
    it('renders with hint text', () => {
      render(<TextArea label={defaultMockProps.label} hint={defaultMockProps.hint} />);
      const textarea = screen.getByRole('textbox', { name: defaultMockProps.label });
      const hint = screen.getByText(defaultMockProps.hint);
      expect(hint).toBeVisible();
      expect(textarea).toHaveAttribute('aria-describedby', hint.getAttribute('id'));
    });

    it('renders error state', () => {
      const { container } = render(
        <TextArea label={defaultMockProps.label} error={defaultMockProps.error} />
      );
      const textarea = screen.getByRole('textbox', { name: defaultMockProps.label });
      const error = screen.getByText(defaultMockProps.error);

      expect(error).toBeVisible();
      expect(textarea).toHaveAttribute('aria-describedby', error.getAttribute('id'));
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
      expect(container.firstChild).toHaveClass(/is-error/);
    });

    it('renders with hint and error text', () => {
      render(
        <TextArea
          label={defaultMockProps.label}
          hint={defaultMockProps.hint}
          error={defaultMockProps.error}
        />
      );
      const textarea = screen.getByRole('textbox', { name: defaultMockProps.label });
      const hint = screen.getByText(defaultMockProps.hint);
      const error = screen.getByText(defaultMockProps.error);

      expect(textarea).toHaveAttribute(
        'aria-describedby',
        `${hint.getAttribute('id')} ${error.getAttribute('id')}`
      );
    });
  });

  it('uses correct displayName for debugging', () => {
    expect(TextArea.displayName).toBe('TextArea');
  });
});
