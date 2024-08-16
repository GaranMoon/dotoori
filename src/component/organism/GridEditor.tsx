import { Grid } from 'component/atom';
import { useColorMapStore } from 'store/ColorMapStore';
import { usePickerStore } from 'store/PickerStore';

function GridEditor() {
  const { picker, isEraser, isDrawing, setIsDrawing } = usePickerStore((state) => state);
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
