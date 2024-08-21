import { ReactNode } from 'react';

import { getClass } from 'util/common';

import { usePopup } from 'hook/usePopup';
import { useSettingStore } from 'store/SettingStore';

import styles from './GuideBox.module.scss';

export type GuideKey = '';

interface Props {
  children: ReactNode;
  guideKey?: GuideKey;
}

function GuideBox({ children, guideKey }: Props) {
  const { isShowGuide } = useSettingStore((state) => state);
  const { getGuideToast } = usePopup();
  const containerStyle = isShowGuide ? (guideKey ? 'guideBox' : 'none') : '';

  const handleClick = () => {
    if (!guideKey) return;
    getGuideToast(guideKey);
  };

  return (
    <div className={getClass(['container', containerStyle], styles)} onClick={handleClick}>
      <div className={styles.cover} />
      {children}
    </div>
  );
}

export default GuideBox;
