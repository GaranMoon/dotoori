import { Frame } from 'component/atom';
import { GuideBox } from 'component/molecule';
import { ConfigPanel, GridEditor } from 'component/organism';
import { useSettingStore } from 'store/SettingStore';

import styles from './DrawingBoard.module.scss';

function DrawingBoard() {
  const isShowConfig = useSettingStore((state) => state.isShowConfig);

  return (
    <div className={styles.container}>
      <Frame width={10}>
        <GuideBox>
          <GridEditor mode="edit" />
        </GuideBox>
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
