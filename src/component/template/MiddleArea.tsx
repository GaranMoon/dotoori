import { PaletteList } from 'component/organism';

import styles from './MiddleArea.module.scss';

function MiddleArea() {
  return (
    <div className={styles.container}>
      <PaletteList />
    </div>
  );
}

export default MiddleArea;
