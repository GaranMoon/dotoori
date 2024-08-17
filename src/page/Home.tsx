import { useEffect } from 'react';

import { Modal } from 'component/atom';
import { BottomArea, MiddleArea, TopArea } from 'component/template';
import { useLoad } from 'hook/useLoad';
import { useMapHistory } from 'hook/useMapHistory';
import useShortcut from 'hook/useShortcut';
import { useColorMapStore } from 'store/ColorMapStore';
import { useToolStore } from 'store/ToolStore';

import styles from './Home.module.scss';

function Home() {
  useShortcut();
  const { load } = useLoad();
  const { addHistory } = useMapHistory();
  const { isOn, setIsOn } = useToolStore((state) => state);
  const { colorMap } = useColorMapStore((state) => state);

  useEffect(() => {
    load();
  }, []);

  const handleMouseUp = () => {
    if (isOn) {
      setIsOn(false);
      addHistory(colorMap);
    }
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
