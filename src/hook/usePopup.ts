import { GuideKey } from 'component/molecule/GuideBox';
import { usePopupStore } from 'store/PopupStore';
import { useSettingStore } from 'store/SettingStore';

export function usePopup() {
  const isShowGuide = useSettingStore((state) => state.isShowGuide);
  const toast = usePopupStore((state) => state.toast);
  const modal = usePopupStore((state) => state.modal);
  const setToast = usePopupStore((state) => state.setToast);

  const closeToast = () => {
    if (toast) document.getElementById('toast')?.click();
  };

  const closeModal = () => {
    if (modal) document.getElementById('overlay')?.click();
  };

  const getGuideToast = (key: GuideKey) => {
    if (!isShowGuide) return false;
    let message = '';
    switch (key) {
      case 'save':
        message = 'You can download your work as a PNG file.';
        break;
      case 'share':
        message =
          'You can share your work in progress with friends via a URL, so you can collaborate together.\nYou can also save your ongoing work using sharing.';
        break;
      case 'reset':
        message = 'All work will be reset and cannot be undone.';
        break;
      case 'boxOption':
        message =
          'You can choose how many boxes to place per row on the drawing board.\nPlease note that your current work will be lost and not preserved.';
        break;
      case 'preview':
        message =
          'It shows a preview of your work.\nIf your screen is in portrait mode, you can click here to change the background color.';
        break;
      case 'picker':
        message =
          'This shows the brush color you have selected.\nYou can change the color picker by clicking on a color from the list below.\nIf the eraser is selected, you can click here to switch back to the brush.\nAdditionally, in PC mode, you can switch to the brush tool using the shortcut key <B>.';
        break;
      case 'eraser':
        message =
          'Click here to use the eraser and remove parts of your work.\nIf the brush is selected, you can click here to switch back to the eraser.\nAdditionally, in PC mode, you can use the shortcut key <E> to switch to the eraser tool.';
        break;
      case 'arrowUp':
        message =
          'Click here or press the <arrow up> key in PC mode to move your work one row up.\nIf the work moves out of range, it will be erased.\nIf you want to undo this action, press the undo button.';
        break;
      case 'arrowDown':
        message =
          'Click here or press the <arrow down> key in PC mode to move your work one row down.\nIf the work moves out of range, it will be erased.\nIf you want to undo this action, press the undo button.';
        break;
      case 'arrowLeft':
        message =
          'Click here or press the <arrow left> key in PC mode to move your work one column to the left side.\nIf the work moves out of range, it will be erased.\nIf you want to undo this action, press the undo button.';
        break;
      case 'arrowRight':
        message =
          'Click here or press the <arrow right> key in PC mode to move your work one column to the right side.\nIf the work moves out of range, it will be erased.\nIf you want to undo this action, press the undo button.';
        break;
      case 'arrowCenter':
        message = 'You can switch the background color between white, black, or transparent.';
        break;
      case 'undo':
        message = 'This will undo the last step of your work.\nIn PC mode, you can use <Ctrl+Z> to undo.';
        break;
      case 'redo':
        message =
          'This will redo the last undone action in your work.\nIn PC mode, you can use <Shift+Ctrl+Z> or <Ctrl+Y> to redo.';
        break;
      case 'paletteList':
        message =
          'You can choose a color for the brush.\nThe selected color will be highlighted in red, while the colors used in your work will be shown in yellow, making it easy to recognize which colors are in use.';
        break;
      default:
    }
    showGuideToast(message);
  };

  const showGuideToast = (message: string) => {
    const guideMessage = `${message}\n\n(To disable guide mode, press the '?' icon in the upper left corner.)`;
    setToast({ message: guideMessage });
  };

  return { closeToast, closeModal, getGuideToast };
}
