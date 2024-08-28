import { useEffect } from 'react';

import { Capture, Modal, Toast } from 'component/molecule';
import { BottomArea, MiddleArea, TopArea } from 'component/template';
import { useLoad } from 'hook/useLoad';
import { useMapHistory } from 'hook/useMapHistory';
import { usePopup } from 'hook/usePopup';
import useShortcut from 'hook/useShortcut';
import { useColorMapStore } from 'store/ColorMapStore';
import { usePopupStore } from 'store/PopupStore';
import { useSettingStore } from 'store/SettingStore';
import { useToolStore } from 'store/ToolStore';

import styles from './Home.module.scss';

function Home() {
  useShortcut();
  const { load } = useLoad();
  const { addHistory } = useMapHistory();
  const toast = usePopupStore((state) => state.toast);
  const modal = usePopupStore((state) => state.modal);
  const isOn = useToolStore((state) => state.isOn);
  const setIsOn = useToolStore((state) => state.setIsOn);
  const colorMap = useColorMapStore((state) => state.colorMap);
  const isSaving = useSettingStore((state) => state.isSaving);
  const { closeToast } = usePopup();

  useEffect(() => {
    load();
  }, []);

  const handleMouseUp = () => {
    if (isOn) {
      setIsOn(false);
      addHistory(colorMap);
      return;
    }
    if (toast) {
      closeToast();
      return;
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
      {toast && <Toast />}
      {isSaving && (
        <div className={styles.capture}>
          <Capture />
          <div className={styles.cover}></div>
        </div>
      )}
    </div>
  );
}

export default Home;
