import { BoxRadioSet, ConfigButtonSet } from 'component/organism';
import { useColorMapStore } from 'store/ColorMapStore';
import { useModalStore } from 'store/ModalStore';
import { usePickerStore } from 'store/PickerStore';
import { useSettingStore } from 'store/SettingStore';

import styles from './ConfigPanel.module.scss';

function ConfigPanel() {
  const { setPicker, setIsEraser } = usePickerStore((state) => state);
  const { history, setColorMap, setHistory, setHistoryIndex } = useColorMapStore((state) => state);
  const { setNumOfBoxs } = useSettingStore((state) => state);
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
    setPicker('');
    setIsEraser(false);
    setHistory([{}]);
    setHistoryIndex(0);
    if (numOfBoxs) setNumOfBoxs(numOfBoxs);
  };

  return (
    <div className={styles.container}>
      <ConfigButtonSet onClickReset={handleClickReset} />
      <BoxRadioSet onChangeBox={handleClickReset} />
    </div>
  );
}

export default ConfigPanel;
