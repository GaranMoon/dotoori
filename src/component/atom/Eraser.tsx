import { Tool } from 'type/common';

import styles from './Eraser.module.scss';

interface Props {
  highlight?: Tool;
  onClick: () => void;
}

function Eraser({ highlight, onClick }: Props) {
  const containerStyle = `${styles.container} ${styles[highlight || '']}`;

  return (
    <div className={containerStyle} onClick={onClick}>
      <div className={styles.line} />
      <div className={`${styles.line} ${styles.reverse}`} />
    </div>
  );
}

export default Eraser;
