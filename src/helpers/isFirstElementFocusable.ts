import React, { Children, isValidElement, type ReactNode } from 'react';

/**
 * Determines if a React element is natively focusable and not explicitly
 * removed from the tab order or disabled.
 */
const isFocusableElement = (
  element: React.DetailedReactHTMLElement<any, HTMLElement>
): boolean => {
  const { type, props } = element;
  const { disabled, tabIndex, 'aria-hidden': ariaHidden } = props;

  if (ariaHidden === 'true' || ariaHidden === true || tabIndex === -1) {
    return false;
  }

  if (disabled === true) {
    return false;
  }

  const focusableTags = ['a', 'button', 'input', 'textarea', 'select', 'details'];

  if (typeof type === 'string' && focusableTags.includes(type.toLowerCase())) {
    return true;
  }

  if (tabIndex !== undefined && tabIndex >= 0) {
    return true;
  }

  return false;
};

/**
 * Recursively checks if the first visible element in the ReactNode tree is focusable.
 */
export const isFirstElementFocusable = (node: ReactNode): boolean => {
  const children = Children.toArray(node);

  if (children.length === 0) return false;

  const firstChild = children[0];

  if (!isValidElement(firstChild)) {
    return false;
  }

  if (
    isFocusableElement(firstChild as React.DetailedReactHTMLElement<any, HTMLElement>)
  ) {
    return true;
  }

  if (firstChild?.props?.children) {
    return isFirstElementFocusable(firstChild?.props?.children);
  }

  return false;
};
