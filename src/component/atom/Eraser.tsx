import { getClass } from 'util/common';

import { useSettingStore } from 'store/SettingStore';
import { ToolStatus } from 'type/common';

import styles from './Eraser.module.scss';

interface Props {
  highlight?: ToolStatus;
  onClick: () => void;
}

function Eraser({ highlight, onClick }: Props) {
  const { layoutMode } = useSettingStore((state) => state);

  return (
    <div className={getClass(['container', layoutMode, highlight], styles)} onClick={onClick}>
      <div className={styles.line} />
      <div className={getClass(['line', 'reverse'], styles)} />
    </div>
  );
}

export default Eraser;
