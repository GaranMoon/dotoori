import { Frame } from 'component/atom';
import { ConfigPanel, GridEditor } from 'component/organism';
import { useSettingStore } from 'store/SettingStore';

import styles from './DrawingBoard.module.scss';

function DrawingBoard() {
  const { isShowConfig, isSaving } = useSettingStore((state) => state);

  return (
    <div className={styles.container}>
      <Frame width={10}>
        {isSaving && (
          <div className={styles.capture}>
            <GridEditor mode="capture" />
            <div className={styles.cover}></div>
          </div>
        )}
        <GridEditor mode="edit" />
        {isShowConfig && (
          <div className={styles.config}>
            <ConfigPanel />
          </div>
        )}
      </Frame>
    </div>
  );
}

export default DrawingBoard;
