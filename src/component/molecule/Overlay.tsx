import { ReactNode } from 'react';

import { getClass } from 'util/common';

import styles from './Overlay.module.scss';

interface Props {
  children: ReactNode;
  animation: string;
  onClose: () => void;
}

function Overlay({ children, animation, onClose }: Props) {
  return (
    <div className={getClass(['container', animation], styles)}>
      <div className={styles.main}>
        <div id="overlay" className={styles.overlay} onClick={onClose}></div>
        <div className={styles.children}>{children}</div>
      </div>
      {/* <div className={styles.ad}>
        <Adsense type="overlay" />
      </div> */}
    </div>
  );
}

export default Overlay;
