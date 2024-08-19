import { Grid, GridType } from 'component/atom';
import { useColorMapStore } from 'store/ColorMapStore';
import { useToolStore } from 'store/ToolStore';
import { Tool } from 'type/common';

interface Props {
  mode: GridType;
}

function GridEditor({ mode }: Props) {
  const { tool, picker, isOn, setIsOn } = useToolStore((state) => state);
  const { colorMap, setColorMap } = useColorMapStore((state) => state);

  const handleDraw = (key: string, isStart?: boolean) => {
    if (!tool || (!isStart && !isOn)) return;
    if (!isOn) setIsOn(true);
    if (tool === Tool.ERASER) {
      delete colorMap[key];
      setColorMap(colorMap);
      return;
    }
    colorMap[key] = picker;
    setColorMap(colorMap);
  };

  return (
    <Grid
      mode={mode}
      tdProps={(key) => ({
        onMouseDown: () => handleDraw(key, true),
        onMouseMove: () => handleDraw(key),
        onTouchStart: () => handleDraw(key, true),
        onTouchMove: () => handleDraw(key),
      })}
    />
  );
}

export default GridEditor;
