import { Grid } from 'component/atom';
import { useColorMapStore } from 'store/ColorMapStore';
import { useToolStore } from 'store/ToolStore';

function GridEditor() {
  const { picker, isEraser, isDrawing, setIsDrawing } = useToolStore((state) => state);
  const { colorMap, setColorMap } = useColorMapStore((state) => state);

  const handleDraw = (key: string, isStart?: boolean) => {
    if (!picker || (!isStart && !isDrawing)) return;
    if (!isDrawing) setIsDrawing(true);
    if (isEraser) {
      delete colorMap[key];
      setColorMap(colorMap);
      return;
    }
    colorMap[key] = picker;
    setColorMap(colorMap);
  };

  return (
    <Grid
      mode="edit"
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
