import { GuideBox } from 'component/molecule';
import { PaletteList } from 'component/organism';
import { useSettingStore } from 'store/SettingStore';

import styles from './MiddleArea.module.scss';

function MiddleArea() {
  const { isShowGuide } = useSettingStore((state) => state);

  return (
    <div className={styles.container}>
      <PaletteList />
      {isShowGuide && (
        <GuideBox guideKey="paletteList" customStyle>
          <div></div>
        </GuideBox>
      )}
    </div>
  );
}

export default MiddleArea;
