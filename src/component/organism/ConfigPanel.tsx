import { getClass } from 'util/common';

import { BoxRadioSet, ConfigButtonSet } from 'component/organism';
import { useColorMapStore } from 'store/ColorMapStore';
import { useModalStore } from 'store/ModalStore';
import { useSettingStore } from 'store/SettingStore';
import { useToolStore } from 'store/ToolStore';

import styles from './ConfigPanel.module.scss';

function ConfigPanel() {
  const { setTool, setPicker } = useToolStore((state) => state);
  const { history, setColorMap, setHistory, setHistoryIndex } = useColorMapStore((state) => state);
  const { layoutMode, setIsShowConfig, setNumOfBoxs } = useSettingStore((state) => state);
  const { setModal } = useModalStore((state) => state);

  const handleClickReset = (numOfBoxs?: number) => {
    const action = () => handleReset(numOfBoxs);
    if (history.length > 1) {
      setModal({
        key: 'reset',
        title: 'warning',
        desc: 'The work will be lost. Do you really want to reset?',
        actionBtn: { title: 'OK', onClick: action },
        cancelBtn: { title: 'Cancel' },
      });
      return;
    }
    action();
  };

  const handleReset = (numOfBoxs?: number) => {
    setColorMap({});
    setTool(null);
    setPicker('');
    setHistory([{}]);
    setHistoryIndex(0);
    setIsShowConfig(false);
    if (numOfBoxs) setNumOfBoxs(numOfBoxs);
  };

  return (
    <div className={getClass(['container', layoutMode], styles)}>
      <ConfigButtonSet onClickReset={handleClickReset} />
      <BoxRadioSet onChangeBox={handleClickReset} />
    </div>
  );
}

export default ConfigPanel;
