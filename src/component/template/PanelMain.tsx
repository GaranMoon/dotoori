import { DrawingBoard, IndicatorPanel, ConfigPanel } from 'component/organism';
import { useSettingStore } from 'store/SettingStore';
import { LayoutMode } from 'type/common';

import styles from './PanelMain.module.scss';

function PanelMain() {
  const { layoutMode } = useSettingStore((state) => state);

  return (
    <div className={styles.container}>
      {layoutMode !== LayoutMode.COLLAPSE && <IndicatorPanel />}
      <DrawingBoard />
      {layoutMode !== LayoutMode.COLLAPSE && <ConfigPanel />}
    </div>
  );
}

export default PanelMain;
