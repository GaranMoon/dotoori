import { useSettingStore } from 'store/SettingStore';
import { useToolStore } from 'store/ToolStore';
import { BackgroundColor, Tool } from 'type/common';

export function useTool() {
  const { picker, setTool, setPicker } = useToolStore((state) => state);
  const { backgroundColor, setBackgroundColor } = useSettingStore((state) => state);

  const pickTool = (tool: Tool | null, color?: string) => {
    if (!picker && !color) return;
    setTool(tool);
    if (tool === Tool.BRUSH && color) setPicker(color);
  };

  const switchBackgroundColor = () => {
    switch (backgroundColor) {
      case BackgroundColor.WHITE:
        setBackgroundColor(BackgroundColor.BLACK);
        break;
      case BackgroundColor.BLACK:
        setBackgroundColor(BackgroundColor.TRANSPARENT);
        break;
      case BackgroundColor.TRANSPARENT:
        setBackgroundColor(BackgroundColor.WHITE);
        break;
      default:
    }
  };

  return { pickTool, switchBackgroundColor };
}
