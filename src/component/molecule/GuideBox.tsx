import { CSSProperties, ReactNode } from 'react';

import { getClass } from 'util/common';

import { usePopup } from 'hook/usePopup';
import { useSettingStore } from 'store/SettingStore';

import styles from './GuideBox.module.scss';

export type GuideKey =
  | 'save'
  | 'share'
  | 'reset'
  | 'boxOption'
  | 'preview'
  | 'picker'
  | 'eraser'
  | 'arrowUp'
  | 'arrowDown'
  | 'arrowLeft'
  | 'arrowRight'
  | 'arrowCenter'
  | 'undo'
  | 'redo'
  | 'paletteList';

interface Props {
  children: ReactNode;
  guideKey?: GuideKey;
  style?: CSSProperties;
}

function GuideBox({ children, guideKey, style }: Props) {
  const { isShowGuide } = useSettingStore((state) => state);
  const { getGuideToast } = usePopup();
  const containerStyle = isShowGuide ? (guideKey ? 'guideBox' : 'none') : '';

  const handleClick = () => {
    if (!guideKey) return;
    getGuideToast(guideKey);
  };

  return (
    <div className={getClass(['container', containerStyle], styles)} style={style} onClick={handleClick}>
      <div className={styles.cover} />
      {children}
    </div>
  );
}

export default GuideBox;
