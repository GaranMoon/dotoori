import { getClass } from 'util/common';

import { Adsense, Button } from 'component/atom';
import { GuideBox } from 'component/molecule';
import { BoxRadioSet, ConfigButtonSet, ArrowButtonSet } from 'component/organism';
import { useMapHistory } from 'hook/useMapHistory';
import { BiRedo } from 'react-icons/bi';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';

import styles from './ConfigPanel.module.scss';

function ConfigPanel() {
  const { redo } = useMapHistory();
  const layoutMode = useSettingStore((state) => state.layoutMode);
  const history = useColorMapStore((state) => state.history);
  const historyIndex = useColorMapStore((state) => state.historyIndex);

  if (!layoutMode) {
    return (
      <div className={styles.container}>
        <div className={styles.config}>
          <div>
            <ConfigButtonSet />
          </div>
          <div>
            <GuideBox guideKey="boxOption">
              <BoxRadioSet />
            </GuideBox>
          </div>
        </div>
        <GuideBox guideKey="redo">
          <Button
            title={<BiRedo />}
            size="md"
            disabled={historyIndex === history.length - 1}
            onClick={redo}
          />
        </GuideBox>
        <div className={styles.ad}>
          <Adsense type="vertical" />
        </div>
      </div>
    );
  }

  return (
    <div className={getClass(['container', layoutMode], styles)}>
      <div className={styles.config}>
        <div>
          <GuideBox guideKey="boxOption">
            <BoxRadioSet />
          </GuideBox>
        </div>
        <div>
          <ConfigButtonSet />
        </div>
      </div>
      <div className={styles.arrow}>
        <ArrowButtonSet size="sm" />
      </div>
    </div>
  );
}

export default ConfigPanel;
