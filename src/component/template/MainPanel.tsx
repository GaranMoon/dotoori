import { DrawingBoard, PanelLeft, PanelRight } from 'component/organism';

import styles from './MainPanel.module.scss';

function MainPanel() {
  return (
    <div className={styles.container}>
      <PanelLeft />
      <DrawingBoard />
      <PanelRight />
    </div>
  );
}

export default MainPanel;
