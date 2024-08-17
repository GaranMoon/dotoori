import { useEffect } from 'react';

import { Modal } from 'component/atom';
import { BottomArea, MiddleArea, TopArea } from 'component/template';
import { boxOption } from 'data/palette';
import LZString from 'lz-string';
import { useSearchParams } from 'react-router-dom';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { useToolStore } from 'store/ToolStore';
import { Color } from 'type/common';

import styles from './Home.module.scss';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setNumOfBoxs } = useSettingStore((state) => state);
  const { isOn, setIsOn } = useToolStore((state) => state);
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
        const map = JSON.parse(LZString.decompressFromEncodedURIComponent(shared));
        if (typeof map === 'object') {
          setColorMap(map);
          addHistory(map);
          const numOfBoxs = Number(box);
          setNumOfBoxs(boxOption.includes(numOfBoxs) ? numOfBoxs : boxOption[1]);
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
    if (isOn) {
      setIsOn(false);
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
