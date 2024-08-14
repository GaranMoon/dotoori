import { BoxRadioSet, ConfigButtonSet } from 'component/organism';
import { useColorMapStore } from 'store/ColorMapStore';
import { usePickerStore } from 'store/PickerStore';

import styles from './PanelRight.module.scss';

function PanelRight() {
  const { setPicker, setIsEraser } = usePickerStore((state) => state);
  const { setColorMap, setHistory, setHistoryIndex } = useColorMapStore((state) => state);

  const handleReset = () => {
    setColorMap({});
    setPicker('');
    setIsEraser(false);
    setHistory([{}]);
    setHistoryIndex(0);
  };

  return (
    <div className={styles.container}>
      <ConfigButtonSet onReset={handleReset} />
      <BoxRadioSet onReset={handleReset} />
    </div>
  );
}

export default PanelRight;
