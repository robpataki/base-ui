import classNames from 'classnames';
import { createElement } from 'react';
import { COMPONENT_IDS } from '@/constants';
import styles from './VisuallyHidden.module.scss';
import type { VisuallyHiddenProps } from './VisuallyHidden.type';

const VisuallyHidden = (props: VisuallyHiddenProps) => {
  const { children, as = 'span', dataTestId, id, className: _className } = props;

  const className = classNames(COMPONENT_IDS.VisuallyHidden, styles.wrapper, _className);

  return createElement(
    as,
    {
      className,
      id,
      'data-testid': dataTestId
    },
    children
  );
};

VisuallyHidden.displayName = 'VisuallyHidden';

export default VisuallyHidden;
