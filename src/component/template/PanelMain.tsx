import { getClass } from 'util/common';

import { ConfigPanel, DrawingBoard, IndicatorPanel } from 'component/organism';
import { useSettingStore } from 'store/SettingStore';

import styles from './PanelMain.module.scss';

function PanelMain() {
  const layoutMode = useSettingStore((state) => state.layoutMode);

  return (
    <div className={getClass(['container', layoutMode], styles)}>
      {!layoutMode && <IndicatorPanel />}
      <DrawingBoard />
      {!layoutMode && <ConfigPanel />}
      {layoutMode && <IndicatorPanel />}
    </div>
  );
}

export default PanelMain;
