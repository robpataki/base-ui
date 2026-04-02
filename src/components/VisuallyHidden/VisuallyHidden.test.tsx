import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import VisuallyHidden from './VisuallyHidden';
import type { VisuallyHiddenElementTagName } from './VisuallyHidden.type';

describe('VisuallyHidden', () => {
  it('renders', () => {
    render(<VisuallyHidden>Hello world</VisuallyHidden>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders a span element by default', () => {
    render(<VisuallyHidden>Hello world</VisuallyHidden>);
    expect(screen.getByText('Hello world').tagName).toBe('SPAN');
  });

  (
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'] as VisuallyHiddenElementTagName[]
  ).forEach(as => {
    it(`renders as ${as}`, () => {
      render(<VisuallyHidden as={as}>{`Hello as ${as}`}</VisuallyHidden>);
      if (as === 'div' || as === 'span') {
        expect(screen.getByText(`Hello as ${as}`)).toBeInTheDocument();
      } else {
        const level = parseInt(as.substring(1), 10);
        expect(
          screen.getByRole('heading', { level, name: `Hello as ${as}` })
        ).toBeInTheDocument();
      }
    });
  });

  it('renders with custom id', () => {
    render(<VisuallyHidden id='custom-id'>You can't see me</VisuallyHidden>);
    expect(screen.getByText("You can't see me")).toHaveAttribute('id', 'custom-id');
  });

  it('renders with custom className', () => {
    render(<VisuallyHidden className='custom-class'>You can't see me</VisuallyHidden>);
    expect(screen.getByText("You can't see me")).toHaveClass('custom-class');
  });

  it('renders with custom data-testid', () => {
    render(<VisuallyHidden dataTestId='test-id'>You can't see me</VisuallyHidden>);
    expect(screen.getByTestId('test-id')).toBeInTheDocument();
  });
});
