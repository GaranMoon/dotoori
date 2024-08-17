import { getClass } from 'util/common';

import { ToolStatus } from 'type/common';

import styles from './Eraser.module.scss';

interface Props {
  size?: 'md' | 'lg';
  status?: ToolStatus;
  onClick: () => void;
}

function Eraser({ size = 'lg', status, onClick }: Props) {
  return (
    <div className={getClass(['container', size, status], styles)} onClick={onClick}>
      <div className={styles.line} />
      <div className={getClass(['line', 'reverse'], styles)} />
    </div>
  );
}

export default Eraser;
