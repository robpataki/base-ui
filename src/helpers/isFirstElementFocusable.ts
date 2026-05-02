import React, { Children, isValidElement, type ReactNode } from 'react';

/**
 * Determines if a React element is natively focusable and not explicitly
 * removed from the tab order or disabled.
 */
const isFocusableElement = (
  element: React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>
): boolean => {
  const { type, props } = element;
  const disabled = (props as Record<string, unknown>).disabled;
  const tabIndex = props.tabIndex;
  const ariaHidden = (props as Record<string, unknown>)['aria-hidden'];

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
 * Checks if an element has aria-hidden="true"
 */
const isHiddenByAriaHidden = (
  element: React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>
): boolean => {
  const { 'aria-hidden': ariaHidden } = element.props;
  return ariaHidden === 'true' || ariaHidden === true;
};

/**
 * Recursively checks if the first visible element in the ReactNode tree is focusable.
 * Returns false if the element is hidden by an ancestor's aria-hidden="true".
 */
export const isFirstElementFocusable = (node: ReactNode): boolean => {
  return isFirstElementFocusableInternal(node, false);
};

/**
 * Internal helper that tracks whether we're inside a hidden ancestor.
 */
const isFirstElementFocusableInternal = (node: ReactNode, isHidden: boolean): boolean => {
  const children = Children.toArray(node);

  if (children.length === 0) return false;

  const firstChild = children[0];

  if (!isValidElement(firstChild)) {
    return false;
  }

  const firstChildElement = firstChild as React.DetailedReactHTMLElement<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;

  // Check if this element is hidden by its own aria-hidden
  const currentIsHidden = isHidden || isHiddenByAriaHidden(firstChildElement);

  // If element is focusable and not hidden, return true
  if (!currentIsHidden && isFocusableElement(firstChildElement)) {
    return true;
  }

  // Recurse into children with updated hidden state
  if (firstChildElement?.props?.children) {
    return isFirstElementFocusableInternal(
      firstChildElement?.props?.children,
      currentIsHidden
    );
  }

  return false;
};
