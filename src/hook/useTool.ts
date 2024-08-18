import { getColorMapIndex, getColorMapKey } from 'util/common';

import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { useToolStore } from 'store/ToolStore';
import { BackgroundColor, Color, Direction, Tool } from 'type/common';

import { useMapHistory } from './useMapHistory';

export function useTool() {
  const { picker, setTool, setPicker } = useToolStore((state) => state);
  const { numOfBoxs, backgroundColor, setBackgroundColor } = useSettingStore((state) => state);
  const { colorMap, setColorMap } = useColorMapStore((state) => state);
  const { addHistory } = useMapHistory();

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

  const moveDrawing = (direction: Direction) => {
    if (JSON.stringify(colorMap) === '{}') return;
    let movedMap: Color = {};
    switch (direction) {
      case 'up':
        movedMap = getMovedMap('y', -1);
        break;
      case 'down':
        movedMap = getMovedMap('y', 1);
        break;
      case 'left':
        movedMap = getMovedMap('x', -1);
        break;
      case 'right':
        movedMap = getMovedMap('x', 1);
        break;
    }
    setColorMap(movedMap);
    addHistory(movedMap);
  };

  const getMovedMap = (target: 'x' | 'y', move: number) => {
    const movedMap: Color = {};
    for (const [key, value] of Object.entries(colorMap)) {
      const index = getColorMapIndex(key);
      index[target] = index[target] + move;
      if (index[target] < 0 || index[target] > numOfBoxs - 1) continue;
      movedMap[getColorMapKey(index.x, index.y)] = value;
    }
    return movedMap;
  };

  return { pickTool, switchBackgroundColor, moveDrawing };
}
