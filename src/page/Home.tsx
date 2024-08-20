import { useEffect } from 'react';

import { Modal } from 'component/molecule';
import { BottomArea, MiddleArea, TopArea } from 'component/template';
import { useLoad } from 'hook/useLoad';
import { useMapHistory } from 'hook/useMapHistory';
import useShortcut from 'hook/useShortcut';
import { useColorMapStore } from 'store/ColorMapStore';
import { usePopupStore } from 'store/PopupStore';
import { useToolStore } from 'store/ToolStore';

import styles from './Home.module.scss';

function Home() {
  useShortcut();
  const { load } = useLoad();
  const { modal } = usePopupStore((state) => state);
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
    <div
      className={styles.container}
      style={{ touchAction: 'none' }}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <TopArea />
      <MiddleArea />
      <BottomArea />
      {modal && <Modal />}
    </div>
  );
}

export default Home;
