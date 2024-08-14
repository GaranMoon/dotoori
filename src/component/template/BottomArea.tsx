import { Footer } from 'component/organism';

import styles from './BottomArea.module.scss';

function BottomArea() {
  return (
    <div className={styles.container} style={{ touchAction: 'none' }}>
      <Footer />
    </div>
  );
}

export default BottomArea;
