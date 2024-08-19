import { getClass } from 'util/common';

import { Button } from 'component/atom';
import { BoxRadioSet, ConfigButtonSet, ArrowButtonSet } from 'component/organism';
import { useMapHistory } from 'hook/useMapHistory';
import { BiRedo } from 'react-icons/bi';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { LayoutMode } from 'type/common';

import styles from './ConfigPanel.module.scss';

function ConfigPanel() {
  const { redo } = useMapHistory();
  const { layoutMode } = useSettingStore((state) => state);
  const { history, historyIndex } = useColorMapStore((state) => state);

  return (
    <div className={getClass(['container', layoutMode], styles)}>
      <div className={styles.config}>
        <ConfigButtonSet />
        <BoxRadioSet />
      </div>
      {layoutMode === LayoutMode.COLLAPSE ? (
        <div className={styles.arrow}>
          <ArrowButtonSet size="sm" />
        </div>
      ) : (
        <Button title={<BiRedo />} size="md" disabled={historyIndex === history.length - 1} onClick={redo} />
      )}
    </div>
  );
}

export default ConfigPanel;
