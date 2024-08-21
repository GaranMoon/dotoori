import { ReactNode } from 'react';

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
  customStyle?: boolean;
}

function GuideBox({ children, guideKey, customStyle }: Props) {
  const { isShowGuide } = useSettingStore((state) => state);
  const { getGuideToast } = usePopup();
  const containerStyle = isShowGuide ? (guideKey ? 'guideBox' : 'none') : '';

  const handleClick = () => {
    if (!guideKey) return;
    getGuideToast(guideKey);
  };

  return (
    <div
      className={getClass(['container', containerStyle, customStyle ? guideKey : ''], styles)}
      onClick={handleClick}
    >
      <div className={styles.cover} />
      {children}
    </div>
  );
}

export default GuideBox;
