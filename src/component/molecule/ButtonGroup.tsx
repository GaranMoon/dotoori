import { ReactNode } from 'react';

import { getClass } from 'util/common';

import styles from './ButtonGroup.module.scss';

interface Props {
  direction?: 'row' | 'column';
  children: ReactNode;
}

function ButtonGroup({ direction = 'row', children }: Props) {
  return <div className={getClass(['container', direction], styles)}>{children}</div>;
}

export default ButtonGroup;
