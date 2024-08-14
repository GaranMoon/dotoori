import { ReactNode } from 'react';

import styles from './Frame.module.scss';

interface Props {
  children: ReactNode;
  width: number;
}

function Frame({ children, width }: Props) {
  return (
    <div className={styles.container} style={{ borderWidth: width }}>
      {children}
    </div>
  );
}

export default Frame;
