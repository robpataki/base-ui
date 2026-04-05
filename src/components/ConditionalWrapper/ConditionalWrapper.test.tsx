import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ConditionalWrapper from './ConditionalWrapper';

describe('ConditionalWrapper', () => {
  it('should render children when condition is false', () => {
    render(
      <ConditionalWrapper
        condition={false}
        wrap={children => <div data-testid='wrapper'>{children}</div>}
      >
        <span>Test</span>
      </ConditionalWrapper>
    );
    expect(screen.queryByTestId('wrapper')).toBeNull();
    expect(screen.getByText('Test')).toBeVisible();
  });

  it('should wrap children when condition is true', () => {
    render(
      <ConditionalWrapper
        condition={true}
        wrap={children => <div data-testid='wrapper'>{children}</div>}
      >
        <span>Test</span>
      </ConditionalWrapper>
    );
    expect(screen.getByTestId('wrapper')).toHaveTextContent('Test');
    expect(screen.getByText('Test')).toBeVisible();
  });
});
