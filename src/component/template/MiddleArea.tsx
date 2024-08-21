import { GuideBox } from 'component/molecule';
import { PaletteList } from 'component/organism';
import { useSettingStore } from 'store/SettingStore';

import styles from './MiddleArea.module.scss';

function MiddleArea() {
  const { isShowGuide } = useSettingStore((state) => state);

  if (!isShowGuide) {
    return (
      <div className={styles.container}>
        <PaletteList />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <GuideBox guideKey="paletteList" style={{ margin: 0 }}>
        <PaletteList />
      </GuideBox>
    </div>
  );
}

export default MiddleArea;
