import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { useToolStore } from 'store/ToolStore';
import { BackgroundColor, Tool } from 'type/common';

export function useTool() {
  const { picker, setTool, setPicker } = useToolStore((state) => state);
  const { backgroundColor, setBackgroundColor } = useSettingStore((state) => state);
  const { colorMap } = useColorMapStore((state) => state);

  const pickTool = (tool: Tool | null, color?: string) => {
    switch (tool) {
      case Tool.BRUSH:
        if (picker || color) {
          setTool(tool);
          if (color) setPicker(color);
          return;
        }
        break;
      case Tool.ERASER:
        if (picker || JSON.stringify(colorMap) !== '{}') {
          setTool(tool);
          return;
        }
        break;
      default:
        setTool(null);
    }
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
