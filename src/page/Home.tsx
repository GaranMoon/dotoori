import { Modal } from 'component/atom';
import { BottomArea, MiddleArea, TopArea } from 'component/template';
import { useColorMapStore } from 'store/ColorMapStore';
import { usePickerStore } from 'store/PickerStore';
import { Color } from 'type/common';

import styles from './Home.module.scss';

function Home() {
  const { isDrawing, setIsDrawing } = usePickerStore((state) => state);
  const { colorMap, history, historyIndex, setHistory, setHistoryIndex } = useColorMapStore((state) => state);

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      addHistory();
    }
  };

  const addHistory = () => {
    let newHistory: Color[] = [...history];
    const newIndex = historyIndex + 1;
    const lastIndex = newHistory.length - 1;
    if (newIndex <= lastIndex) {
      newHistory = newHistory.slice(0, newIndex);
    }
    newHistory.push({ ...colorMap });
    setHistory(newHistory);
    setHistoryIndex(newIndex);
  };

  return (
    <div className={styles.container} style={{ touchAction: 'none' }} onMouseUp={handleMouseUp}>
      <TopArea />
      <MiddleArea />
      <BottomArea />
      <Modal />
    </div>
  );
}

export default Home;
