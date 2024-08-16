import { getClass } from 'util/common';

import styles from './Radio.module.scss';

export interface RadioProps {
  title: string;
  selected: boolean;
  onClick: () => void;
}

function Radio({ title, selected, onClick }: RadioProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.button}>
        <div className={getClass(['light', selected ? 'on' : ''], styles)}>
          <div className={styles.glow} />
        </div>
      </div>
      <div className={styles.text}>{title}</div>
    </div>
  );
}

export default Radio;
