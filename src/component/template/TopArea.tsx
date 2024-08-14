import { Header } from 'component/organism';
import { MainPanel } from 'component/template';

import styles from './TopArea.module.scss';

function TopArea() {
  return (
    <div className={styles.container} style={{ touchAction: 'none' }}>
      <Header />
      <MainPanel />
    </div>
  );
}

export default TopArea;
