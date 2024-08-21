import { GuideKey } from 'component/molecule/GuideBox';
import { usePopupStore } from 'store/PopupStore';
import { useSettingStore } from 'store/SettingStore';

export function usePopup() {
  const { isShowGuide } = useSettingStore((state) => state);
  const { setToast } = usePopupStore((state) => state);

  const getGuideToast = (key: GuideKey): boolean => {
    if (!isShowGuide) return false;
    switch (key) {
      case '':
        showGuideToast('');
        return true;
      default:
        return false;
    }
  };

  const showGuideToast = (message: string) => {
    const guideMessage = `${message}\n\n* To disable guide mode, press the '?' icon in the upper left corner.`;
    setToast({ message: guideMessage });
  };

  return { getGuideToast };
}
