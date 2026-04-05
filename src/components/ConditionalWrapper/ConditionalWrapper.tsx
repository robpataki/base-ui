import type { ConditionalWrapperProps } from './ConditionalWrapper.type';

export const ConditionalWrapper = (props: ConditionalWrapperProps) => {
  const { condition, wrap, children } = props;
  return condition ? wrap(children) : children;
};

ConditionalWrapper.displayName = 'ConditionalWrapper';
