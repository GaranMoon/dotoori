import { useEffect } from 'react';

import { Modal } from 'component/atom';
import { boxOptions } from 'component/organism/BoxRadioSet';
import { BottomArea, MiddleArea, TopArea } from 'component/template';
import { useSearchParams } from 'react-router-dom';
import { useColorMapStore } from 'store/ColorMapStore';
import { usePickerStore } from 'store/PickerStore';
import { useSettingStore } from 'store/SettingStore';
import { Color } from 'type/common';

import styles from './Home.module.scss';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setNumOfBoxs } = useSettingStore((state) => state);
  const { isDrawing, setIsDrawing } = usePickerStore((state) => state);
  const { colorMap, history, historyIndex, setColorMap, setHistory, setHistoryIndex } = useColorMapStore(
    (state) => state,
  );

  useEffect(() => {
    loadSharedMap();
  }, []);

  const loadSharedMap = () => {
    const shared = searchParams.get('shared');
    const box = searchParams.get('box');
    if (shared && box) {
      try {
        const map = JSON.parse(decodeURIComponent(shared));
        if (typeof map === 'object') {
          setColorMap(map);
          addHistory(map);
          const numOfBoxs = Number(box);
          setNumOfBoxs(boxOptions.includes(numOfBoxs) ? numOfBoxs : boxOptions[1]);
          searchParams.delete('shared');
          searchParams.delete('box');
          setSearchParams(searchParams);
          return;
        }
      } catch (e) {
        console.error('Invalid JSON:', e);
      }
      return;
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      addHistory(colorMap);
    }
  };

  const addHistory = (colorMap: Color) => {
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
