// biome-ignore-all lint/style/noNonNullAssertion: This is a test file and we know the input will be present when we query for it, so it's safe to use non-null assertions here.

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('renders without crashing', () => {
    render(<TextInput />);
    expect(screen.getByRole('textbox')).toBeVisible();
  });

  it('renders with a label', () => {
    render(<TextInput label='Email' />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeVisible();
    expect(screen.getByText('Email')).toBeVisible();
  });

  it('renders with placeholder text', () => {
    render(<TextInput placeholder='Enter your email' />);
    const input = screen.getByPlaceholderText('Enter your email');
    expect(input).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    const user = userEvent.setup();
    const { container } = render(<TextInput />);
    const input = container.querySelector('input');

    await user.type(input!, 'test value');
    expect((input as HTMLInputElement).value).toBe('test value');
  });

  it('associates label with input using htmlFor', () => {
    const { container } = render(<TextInput label='Username' />);
    const label = screen.getByText('Username');
    const input = container.querySelector('input');

    expect(label.getAttribute('for')).toBe(input?.id);
  });

  it('displays error message when isError is true', () => {
    render(<TextInput label='Email' error='Invalid email' isError={true} />);
    const errorMessage = screen.getByText('Invalid email');
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<TextInput label='Password' helperText='Must be at least 8 characters' />);
    const helperText = screen.getByText('Must be at least 8 characters');
    expect(helperText).toBeInTheDocument();
  });

  it('sets aria-invalid when in error state', () => {
    const { container } = render(<TextInput error='This field is required' isError={true} />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-invalid to false when not in error state', () => {
    const { container } = render(<TextInput />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('sets aria-describedby when error is present', () => {
    const { container } = render(<TextInput error='This field is required' isError={true} />);
    const input = container.querySelector('input');
    const describedBy = input?.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();

    const messageElement = document.getElementById(describedBy!);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement?.textContent).toBe('This field is required');
  });

  it('sets aria-describedby when helper text is present', () => {
    const { container } = render(<TextInput helperText='Some helpful info' />);
    const input = container.querySelector('input');
    const describedBy = input?.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
  });

  it('disables the input when disabled prop is true', () => {
    const { container } = render(<TextInput disabled={true} />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('forwards ref correctly', () => {
    let ref: HTMLInputElement | null = null;
    const { container } = render(
      <TextInput
        ref={el => {
          ref = el;
        }}
      />
    );
    const input = container.querySelector('input');
    expect(ref).toBe(input);
  });

  it('passes through standard input attributes', () => {
    const { container } = render(<TextInput placeholder='test placeholder' maxLength={50} required={true} />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.placeholder).toBe('test placeholder');
    expect(input.maxLength).toBe(50);
    expect(input.required).toBe(true);
  });

  it('generates unique IDs for multiple instances', () => {
    const { container } = render(
      <>
        <TextInput label='First' />
        <TextInput label='Second' />
      </>
    );
    const inputs = container.querySelectorAll('input');
    const firstId = inputs[0].id;
    const secondId = inputs[1].id;
    expect(firstId).not.toBe(secondId);
  });

  it('displays displayName for debugging', () => {
    expect(TextInput.displayName).toBe('TextInput');
  });
});
