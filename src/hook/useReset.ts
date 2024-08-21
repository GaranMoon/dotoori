import { useColorMapStore } from 'store/ColorMapStore';
import { usePopupStore } from 'store/PopupStore';
import { useSettingStore } from 'store/SettingStore';
import { useToolStore } from 'store/ToolStore';

export function useReset() {
  const { setTool, setPicker } = useToolStore((state) => state);
  const { history, setColorMap, setHistory, setHistoryIndex } = useColorMapStore((state) => state);
  const { setIsShowConfig, setNumOfBoxs } = useSettingStore((state) => state);
  const { setModal } = usePopupStore((state) => state);

  const confirmReset = (boxs?: number) => {
    const action = () => reset(boxs);
    if (history.length > 1) {
      setModal({
        key: 'reset',
        title: 'warning',
        desc: 'The work will be lost. Do you really want to reset?',
        actionBtn: { title: 'OK', onClick: action },
        cancelBtn: { title: 'Cancel' },
      });
      return;
    }
    action();
  };

  const reset = (boxs?: number) => {
    setColorMap({});
    setHistory([{}]);
    setHistoryIndex(0);
    if (boxs) {
      setNumOfBoxs(boxs);
      return;
    }
    setTool(null);
    setPicker('');
    setIsShowConfig(false);
  };

  return { confirmReset, reset };
}
