import { Frame } from 'component/atom';
import { ConfigPanel, GridEditor } from 'component/organism';
import { useSettingStore } from 'store/SettingStore';

import styles from './DrawingBoard.module.scss';

function DrawingBoard() {
  const { isShowConfig } = useSettingStore((state) => state);

  return (
    <div className={styles.container}>
      <Frame width={10}>{!isShowConfig ? <GridEditor /> : <ConfigPanel />}</Frame>
    </div>
  );
}

export default DrawingBoard;
