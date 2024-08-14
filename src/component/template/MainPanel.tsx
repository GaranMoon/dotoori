import { DrawingBoard, PanelLeft, PanelRight } from 'component/organism';
import { useSettingStore } from 'store/SettingStore';
import { LayoutMode } from 'type/common';

import styles from './MainPanel.module.scss';

function MainPanel() {
  const { layoutMode } = useSettingStore((state) => state);

  return (
    <div className={styles.container}>
      {layoutMode !== LayoutMode.COLLAPSE && <PanelLeft />}
      <DrawingBoard />
      {layoutMode !== LayoutMode.COLLAPSE && <PanelRight />}
    </div>
  );
}

export default MainPanel;
