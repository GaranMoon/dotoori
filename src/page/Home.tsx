import { Modal } from 'component/atom';
import { BottomArea, MiddleArea, TopArea } from 'component/template';
import { usePickerStore } from 'store/PickerStore';

import styles from './Home.module.scss';

function Home() {
  const { isDrawing, setIsDrawing } = usePickerStore((state) => state);

  const handleStopDraw = () => {
    if (isDrawing) setIsDrawing(false);
  };

  return (
    <div className={styles.container} onMouseUp={handleStopDraw}>
      <TopArea />
      <MiddleArea />
      <BottomArea />
      <Modal />
    </div>
  );
}

export default Home;
