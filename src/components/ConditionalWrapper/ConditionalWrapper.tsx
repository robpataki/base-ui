import type { ConditionalWrapperProps } from './CondfitionalWrapper.type';

const ConditionalWrapper = (props: ConditionalWrapperProps) => {
  const { condition, wrap, children } = props;
  return condition ? wrap(children) : children;
};

ConditionalWrapper.displayName = 'ConditionalWrapper';

export default ConditionalWrapper;
