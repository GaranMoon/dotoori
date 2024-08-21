import { GuideBox } from 'component/molecule';
import { PaletteList } from 'component/organism';

import styles from './MiddleArea.module.scss';

function MiddleArea() {
  return (
    <div className={styles.container}>
      <GuideBox guideKey="paletteList" style={{ margin: 0 }}>
        <PaletteList />
      </GuideBox>
    </div>
  );
}

export default MiddleArea;
