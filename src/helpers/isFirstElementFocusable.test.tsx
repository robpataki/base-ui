// biome-ignore-all lint/a11y/noNoninteractiveTabindex: Testing only
// biome-ignore-all lint/a11y/noPositiveTabindex: Testing only
import { describe, expect, it } from 'vitest';
import { isFirstElementFocusable } from './isFirstElementFocusable';

describe('isFirstElementFocusable', () => {
  describe('native focusable elements', () => {
    it('should return true for a button element', () => {
      const result = isFirstElementFocusable(<button type="button">Click me</button>);
      expect(result).toBe(true);
    });

    it('should return true for an anchor element', () => {
      const result = isFirstElementFocusable(<a href="/hello">Link</a>);
      expect(result).toBe(true);
    });

    it('should return true for an input element', () => {
      const result = isFirstElementFocusable(<input type="text" />);
      expect(result).toBe(true);
    });

    it('should return true for a textarea element', () => {
      const result = isFirstElementFocusable(<textarea />);
      expect(result).toBe(true);
    });

    it('should return true for a select element', () => {
      const result = isFirstElementFocusable(
        <select>
          <option>Option 1</option>
        </select>
      );
      expect(result).toBe(true);
    });

    it('should return true for a details element', () => {
      const result = isFirstElementFocusable(<details>Details</details>);
      expect(result).toBe(true);
    });
  });

  describe('tabIndex attribute', () => {
    it('should return true for an element with tabIndex >= 0', () => {
      const result = isFirstElementFocusable(<div tabIndex={0}>Focusable div</div>);
      expect(result).toBe(true);
    });

    it('should return true for an element with tabIndex > 0', () => {
      const result = isFirstElementFocusable(<div tabIndex={5}>Focusable div</div>);
      expect(result).toBe(true);
    });

    it('should return false for an element with tabIndex = -1', () => {
      const result = isFirstElementFocusable(<div tabIndex={-1}>Not focusable</div>);
      expect(result).toBe(false);
    });

    it('should return false for an element with tabIndex = -2', () => {
      const result = isFirstElementFocusable(<div tabIndex={-2}>Not focusable</div>);
      expect(result).toBe(false);
    });
  });

  describe('disabled attribute', () => {
    it('should return false for a disabled button', () => {
      const result = isFirstElementFocusable(
        <button type="button" disabled>
          Disabled button
        </button>
      );
      expect(result).toBe(false);
    });

    it('should return false for a disabled input', () => {
      const result = isFirstElementFocusable(<input type="text" disabled />);
      expect(result).toBe(false);
    });

    it('should return false for a disabled textarea', () => {
      const result = isFirstElementFocusable(<textarea disabled />);
      expect(result).toBe(false);
    });

    it('should return false for a disabled select', () => {
      const result = isFirstElementFocusable(
        <select disabled>
          <option>Option 1</option>
        </select>
      );
      expect(result).toBe(false);
    });
  });

  describe('aria-hidden attribute', () => {
    it('should return false when aria-hidden is "true" on parent', () => {
      const result = isFirstElementFocusable(
        <div aria-hidden="true">
          <button type="button">Hidden button</button>
        </div>
      );
      expect(result).toBe(false);
    });

    it('should return false when aria-hidden is true (boolean) on parent', () => {
      const result = isFirstElementFocusable(
        <div aria-hidden={true}>
          <button type="button">Hidden button</button>
        </div>
      );
      expect(result).toBe(false);
    });

    it('should return true when aria-hidden is "false"', () => {
      const result = isFirstElementFocusable(
        <div aria-hidden="false">
          <button type="button">Visible button</button>
        </div>
      );
      expect(result).toBe(true);
    });

    it('should return true when aria-hidden is not set', () => {
      const result = isFirstElementFocusable(
        <button type="button">Visible button</button>
      );
      expect(result).toBe(true);
    });
  });

  describe('non-focusable elements', () => {
    it('should return false for a div without tabIndex', () => {
      const result = isFirstElementFocusable(<div>Not focusable</div>);
      expect(result).toBe(false);
    });

    it('should return false for a span', () => {
      const result = isFirstElementFocusable(<span>Text</span>);
      expect(result).toBe(false);
    });

    it('should return false for a paragraph', () => {
      const result = isFirstElementFocusable(<p>Paragraph</p>);
      expect(result).toBe(false);
    });
  });

  describe('non-element children', () => {
    it('should return false for text content only', () => {
      const result = isFirstElementFocusable('Just text');
      expect(result).toBe(false);
    });

    it('should return false for a number', () => {
      const result = isFirstElementFocusable(42);
      expect(result).toBe(false);
    });

    it('should return false for null', () => {
      const result = isFirstElementFocusable(null);
      expect(result).toBe(false);
    });

    it('should return false for undefined', () => {
      const result = isFirstElementFocusable(undefined);
      expect(result).toBe(false);
    });

    it('should return false for an empty array', () => {
      const result = isFirstElementFocusable([]);
      expect(result).toBe(false);
    });

    it('should return false for an empty fragment', () => {
      const result = isFirstElementFocusable(<></>);
      expect(result).toBe(false);
    });
  });

  describe('nested elements (recursion)', () => {
    it('should return true when first focusable element is nested in div', () => {
      const result = isFirstElementFocusable(
        <div>
          <button type="button">Click me</button>
        </div>
      );
      expect(result).toBe(true);
    });

    it('should return true when first focusable element is deeply nested', () => {
      const result = isFirstElementFocusable(
        <div>
          <div>
            <div>
              <button type="button">Click me</button>
            </div>
          </div>
        </div>
      );
      expect(result).toBe(true);
    });

    it('should return false when first element is not focusable but nested element is', () => {
      const result = isFirstElementFocusable(
        <div>
          <span>Not focusable</span>
          <button type="button">Click me</button>
        </div>
      );
      expect(result).toBe(false);
    });

    it('should recurse through fragment children', () => {
      const result = isFirstElementFocusable(
        <>
          <button type="button">Click me</button>
        </>
      );
      expect(result).toBe(true);
    });

    it('should return false for deeply nested non-focusable elements', () => {
      const result = isFirstElementFocusable(
        <div>
          <div>
            <span>Not focusable</span>
          </div>
        </div>
      );
      expect(result).toBe(false);
    });
  });

  describe('complex scenarios', () => {
    it('should return true when button has aria-hidden but is focusable', () => {
      const result = isFirstElementFocusable(
        <div aria-hidden="false">
          <button type="button">Click me</button>
        </div>
      );
      expect(result).toBe(true);
    });

    it('should return false when disabled takes precedence', () => {
      const result = isFirstElementFocusable(
        <button type="button" disabled tabIndex={0}>
          Disabled button
        </button>
      );
      expect(result).toBe(false);
    });

    it('should return false when aria-hidden takes precedence', () => {
      const result = isFirstElementFocusable(
        <div aria-hidden="true">
          <button type="button" tabIndex={0}>
            Hidden button
          </button>
        </div>
      );
      expect(result).toBe(false);
    });

    it('should return false when tabIndex -1 takes precedence', () => {
      const result = isFirstElementFocusable(
        <button type="button" tabIndex={-1}>
          Not in tab order
        </button>
      );
      expect(result).toBe(false);
    });

    it('should handle input with type="button"', () => {
      const result = isFirstElementFocusable(<input type="button" value="Click me" />);
      expect(result).toBe(true);
    });

    it('should handle input with type="checkbox"', () => {
      const result = isFirstElementFocusable(<input type="checkbox" />);
      expect(result).toBe(true);
    });

    it('should handle input with type="radio"', () => {
      const result = isFirstElementFocusable(<input type="radio" />);
      expect(result).toBe(true);
    });
  });

  describe('multiple children', () => {
    it('should check only the first child in an array', () => {
      const result = isFirstElementFocusable(
        <>
          <div>Not focusable</div>
          <button type="button">Click me</button>
        </>
      );
      expect(result).toBe(false);
    });

    it('should return true if first of multiple children is focusable', () => {
      const result = isFirstElementFocusable(
        <>
          <button type="button">Click me</button>
          <div>Not focusable</div>
        </>
      );
      expect(result).toBe(true);
    });
  });
});
