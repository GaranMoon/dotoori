import { getClass } from 'util/common';

import { Tool } from 'type/common';

import styles from './Eraser.module.scss';

interface Props {
  highlight?: Tool;
  onClick: () => void;
}

function Eraser({ highlight, onClick }: Props) {
  return (
    <div className={getClass(['container', highlight], styles)} onClick={onClick}>
      <div className={styles.line} />
      <div className={getClass(['line', 'reverse'], styles)} />
    </div>
  );
}

export default Eraser;
