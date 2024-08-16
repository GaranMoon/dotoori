import { getClass } from 'util/common';

import { DrawingBoard, IndicatorPanel, ConfigPanel } from 'component/organism';
import { useSettingStore } from 'store/SettingStore';
import { LayoutMode } from 'type/common';

import styles from './PanelMain.module.scss';

function PanelMain() {
  const { layoutMode } = useSettingStore((state) => state);

  return layoutMode !== LayoutMode.COLLAPSE ? (
    <div className={styles.container}>
      <IndicatorPanel />
      <DrawingBoard />
      <ConfigPanel />
    </div>
  ) : (
    <div className={getClass(['container', layoutMode], styles)}>
      <DrawingBoard />
      <IndicatorPanel />
    </div>
  );
}

export default PanelMain;
