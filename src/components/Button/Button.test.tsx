// biome-ignore-all lint/style/noNonNullAssertion: This is a test file and we know the input will be present when we query for it, so it's safe to use non-null assertions here.

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  const defaultMockProps = {
    label: 'Click me'
  };

  it('renders', () => {
    render(<Button>{defaultMockProps.label}</Button>);
    expect(screen.getByRole('button', { name: defaultMockProps.label })).toBeVisible();
  });

  it('renders with custom id', () => {
    render(<Button id="custom-id">{defaultMockProps.label}</Button>);
    expect(screen.getByRole('button', { name: defaultMockProps.label })).toHaveAttribute(
      'id',
      'custom-id'
    );
  });

  it('renders with custom data-testid', () => {
    render(<Button dataTestId="custom-id">{defaultMockProps.label}</Button>);
    expect(screen.getByRole('button', { name: defaultMockProps.label })).toHaveAttribute(
      'data-testid',
      'custom-id'
    );
  });

  it('renders correct CSS class names', () => {
    render(<Button>{defaultMockProps.label}</Button>);
    const button = screen.getByRole('button', { name: defaultMockProps.label });

    expect(button).toHaveClass(/a1-button/);
    expect(button).toHaveClass(/wrapper/);
  });

  it('renders correct CSS class names with custom class', () => {
    render(<Button className="custom-button">{defaultMockProps.label}</Button>);
    const button = screen.getByRole('button', { name: defaultMockProps.label });

    expect(button).toHaveClass(/a1-button/);
    expect(button).toHaveClass(/wrapper/);
    expect(button).toHaveClass(/custom-button/);
  });

  it('is disabled when isDisabled is true', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    render(
      <Button onClick={mockOnClick} isDisabled>
        {defaultMockProps.label}
      </Button>
    );
    const button = screen.getByRole('button', { name: defaultMockProps.label });
    expect(button).toHaveClass(/is-disabled/);

    await user.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });

  it('calls onClick', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    render(<Button onClick={mockOnClick}>{defaultMockProps.label}</Button>);

    await user.click(screen.getByRole('button', { name: defaultMockProps.label }));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref', () => {
    let ref: HTMLButtonElement | null = null;
    render(
      <Button
        ref={el => {
          ref = el;
        }}
      >
        {defaultMockProps.label}
      </Button>
    );
    const button = screen.getByRole('button', { name: defaultMockProps.label });
    ref!.focus();

    expect(ref).toBe(button);
    expect(button).toHaveFocus();
  });

  it('passes through standard button element attributes', () => {
    render(
      <Button name="my-button" popoverTarget="target-id" value={20}>
        {defaultMockProps.label}
      </Button>
    );
    const button = screen.getByRole('button', { name: defaultMockProps.label });

    expect(button).toHaveValue('20');
    expect(button).toHaveAttribute('name', 'my-button');
    expect(button).toHaveAttribute('popoverTarget', 'target-id');
  });

  describe('Keyboard navigation', () => {
    it('is fully keyboard operable', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();
      render(<Button onClick={mockOnClick}>{defaultMockProps.label}</Button>);
      const button = screen.getByRole('button', { name: defaultMockProps.label });

      await user.tab();
      expect(button).toHaveFocus();
      await user.keyboard('[Space]');
      await user.keyboard('[Enter]');
      expect(mockOnClick).toHaveBeenCalledTimes(2);
    });
  });

  it('uses correct displayName for debugging', () => {
    expect(Button.displayName).toBe('Button');
  });
});
