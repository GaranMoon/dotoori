import { Header } from 'component/organism';
import { PanelMain } from 'component/template';

import styles from './TopArea.module.scss';

function TopArea() {
  return (
    <div className={styles.container}>
      <Header />
      <PanelMain />
    </div>
  );
}

export default TopArea;
