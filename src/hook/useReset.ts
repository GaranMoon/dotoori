import { useColorMapStore } from 'store/ColorMapStore';
import { usePopupStore } from 'store/PopupStore';
import { useSettingStore } from 'store/SettingStore';
import { useToolStore } from 'store/ToolStore';

export function useReset() {
  const history = useColorMapStore((state) => state.history);
  const setTool = useToolStore((state) => state.setTool);
  const setPicker = useToolStore((state) => state.setPicker);
  const setColorMap = useColorMapStore((state) => state.setColorMap);
  const setHistory = useColorMapStore((state) => state.setHistory);
  const setHistoryIndex = useColorMapStore((state) => state.setHistoryIndex);
  const setIsShowConfig = useSettingStore((state) => state.setIsShowConfig);
  const setNumOfBoxs = useSettingStore((state) => state.setNumOfBoxs);
  const setModal = usePopupStore((state) => state.setModal);

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
