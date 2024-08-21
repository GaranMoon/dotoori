import { getClass } from 'util/common';

import { DrawingBoard, IndicatorPanel, ConfigPanel } from 'component/organism';
import { useSettingStore } from 'store/SettingStore';

import styles from './PanelMain.module.scss';

function PanelMain() {
  const { layoutMode } = useSettingStore((state) => state);

  if (!layoutMode) {
    return (
      <div className={styles.container}>
        <IndicatorPanel />
        <DrawingBoard />
        <ConfigPanel />
      </div>
    );
  }

  return (
    <div className={getClass(['container', layoutMode], styles)}>
      <DrawingBoard />
      <IndicatorPanel />
    </div>
  );
}

export default PanelMain;
