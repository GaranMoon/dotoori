import { getClass } from 'util/common';

import { BoxRadioSet, ConfigButtonSet } from 'component/organism';
import { useSettingStore } from 'store/SettingStore';

import styles from './ConfigPanel.module.scss';

function ConfigPanel() {
  const { layoutMode } = useSettingStore((state) => state);

  return (
    <div className={getClass(['container', layoutMode], styles)}>
      <ConfigButtonSet />
      <BoxRadioSet />
    </div>
  );
}

export default ConfigPanel;
